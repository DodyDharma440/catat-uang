import { useCallback, useEffect, useState } from "react";

import dayjs from "dayjs";
import type { Unsubscribe } from "firebase/firestore";
import {
  collection,
  doc,
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

import type { TransListFilter } from "../../contexts";
import type {
  ICategory,
  ITransaction,
  TransactionState,
} from "../../interfaces";

type UseGetTransactionsOptions = {
  monthYear?: string;
  limit?: number;
  filters?: TransListFilter;
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

    if (options?.filters) {
      const { category, transType } = options.filters;
      if (category && category !== "all") {
        const [collName, categoryId] = category.split("/");
        const categoryDocRef = doc(db, collName, categoryId);
        q = query(q, where("category", "==", categoryDocRef));
      }

      if (transType !== "all") {
        q = query(q, where("type", "==", transType));
      }
    }

    if (options?.limit) {
      q = query(q, limit(options?.limit));
    }

    try {
      const _unsub = onSnapshot(q, async (querySnapshot) => {
        const grouped: Record<string, ITransaction[]> = {};

        await Promise.all(
          // eslint-disable-next-line @typescript-eslint/no-shadow
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
    options?.filters,
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
