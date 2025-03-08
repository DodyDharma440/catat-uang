import { useCallback, useEffect, useState } from "react";

import dayjs from "dayjs";
import type { Unsubscribe } from "firebase/firestore";
import {
  collection,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebase-config";

import { useFetchState } from "@/common/hooks";
import { useUserAuth } from "@/modules/auth/contexts";

import type {
  ICategory,
  ITransaction,
  TransactionState,
} from "../../interfaces";

type UseGetTransactionsOptions = {
  monthYear?: string;
  limit?: number;
};

export const useGetTransactions = (options?: UseGetTransactionsOptions) => {
  const { user } = useUserAuth();

  const [transactions, setTransactions] = useState<TransactionState>([]);

  const [unsub, setUnsub] = useState<Unsubscribe>();

  const { isLoading, errorMessage, setError, startLoading, endLoading } =
    useFetchState();

  const handleGetTransactions = useCallback(async () => {
    startLoading();

    let q = query(
      collection(db, "transactions", user?.uid ?? "", "user_transactions"),

      orderBy("date", "desc")
    );

    if (options?.monthYear) {
      const startDate = dayjs(`${options?.monthYear}-01`)
        .startOf("month")
        .format("YYYY-MM-DD");
      const endDate = dayjs(`${options?.monthYear}-01`)
        .endOf("month")
        .format("YYYY-MM-DD");
      q = query(
        q,
        where("date", ">=", startDate),
        where("date", "<=", endDate)
      );
    }

    if (options?.limit) {
      q = query(q, limit(options?.limit));
    }

    try {
      const _unsub = onSnapshot(q, async (querySnapshot) => {
        const grouped: Record<string, ITransaction[]> = {};

        await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const categoryDoc = await getDoc(data.category);

            const isToday = dayjs(data.date).isSame(
              dayjs().format("YYYY-MM-DD")
            );
            const isYesterday = dayjs(data.date).isSame(
              dayjs().add(-1, "day").format("YYYY-MM-DD")
            );

            const label = isToday
              ? "Hari ini"
              : isYesterday
              ? "Kemarin"
              : dayjs(data.date).format("DD MMM YYYY");

            if (!grouped[label]) grouped[label] = [];
            grouped[label].push({
              ...(data as ITransaction),
              category: categoryDoc.data() as ICategory,
              id: doc.id,
            });
          })
        );

        setTransactions(
          Object.entries(grouped)
            .map(([key, value]) => ({ title: key, items: value }))
            .filter((g) => g.items.length)
        );
        endLoading();
      });
      setUnsub((prev) => {
        prev?.();
        return _unsub;
      });
    } catch (error) {
      endLoading();
      setError(error);
    }
  }, [
    endLoading,
    options?.limit,
    options?.monthYear,
    setError,
    startLoading,
    user?.uid,
  ]);

  useEffect(() => {
    handleGetTransactions();
  }, [handleGetTransactions]);

  useEffect(() => {
    return () => {
      unsub?.();
    };
  }, [unsub]);

  return { transactions, isLoading, errorMessage, handleGetTransactions };
};
