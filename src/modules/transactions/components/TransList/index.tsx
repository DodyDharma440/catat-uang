import React, { useCallback, useEffect, useMemo, useState } from "react";

import { View } from "react-native";

import dayjs from "dayjs";
import type { Unsubscribe } from "firebase/firestore";
import { collection, getDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "firebase-config";

import {
  Container,
  Loader,
  RefreshableScrollView,
  Typography,
} from "@/common/components";
import { useFetchState } from "@/common/hooks";
import { useUserAuth } from "@/modules/auth/contexts";

import { useTransListContext } from "../../contexts";
import type { ICategory, ITransaction } from "../../interfaces";
import TransCard from "../TransCard";

const headings = ["Hari ini", "Kemarin", "Lebih awal"];

type TransactionState = Array<{
  title: string;
  items: ITransaction[];
}>;

const TransList = () => {
  const { user } = useUserAuth();

  const { searchValue } = useTransListContext();

  const [transactions, setTransactions] = useState<TransactionState>([]);
  const filteredTrans = useMemo(() => {
    return transactions
      .map((t) => {
        return {
          ...t,
          items: t.items
            .filter((item) => {
              if (!searchValue) {
                return true;
              }

              return item.title
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })
            .sort(
              (a, b) =>
                Number(b.time.split(":").join("")) -
                Number(a.time.split(":").join(""))
            ),
        };
      })
      .filter((t) => t.items.length);
  }, [searchValue, transactions]);

  const [unsub, setUnsub] = useState<Unsubscribe>();

  const { isLoading, errorMessage, setError, startLoading, endLoading } =
    useFetchState();

  const handleGetTransactions = useCallback(async () => {
    startLoading();
    const q = query(
      collection(db, "transactions", user?.uid ?? "", "user_transactions")
    );

    try {
      const _unsub = onSnapshot(q, async (querySnapshot) => {
        const grouped: TransactionState = headings.map((h) => ({
          title: h,
          items: [],
        }));

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

            const index: number = isToday ? 0 : isYesterday ? 1 : 2;

            grouped[index].items.push({
              ...(data as ITransaction),
              category: categoryDoc.data() as ICategory,
              id: doc.id,
            });
          })
        );

        setTransactions(grouped.filter((g) => g.items.length));
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
  }, [endLoading, setError, startLoading, user?.uid]);

  useEffect(() => {
    handleGetTransactions();
  }, [handleGetTransactions]);

  useEffect(() => {
    return () => {
      unsub?.();
    };
  }, [unsub]);

  return (
    <RefreshableScrollView refresher={handleGetTransactions}>
      <Container>
        <Loader
          isLoading={isLoading}
          error={errorMessage}
          isEmpty={!filteredTrans.length}
          emptyMessage="Tidak ada transaksi"
        >
          <View style={{ gap: 16, paddingBottom: 200 }}>
            {filteredTrans.map((trans) => {
              return (
                <View key={trans.title} style={{ gap: 12 }}>
                  <Typography fontWeight="700" style={{ fontSize: 18 }}>
                    {trans.title}
                  </Typography>
                  {trans.items.map((item, i) => {
                    return <TransCard key={i} transaction={item} />;
                  })}
                </View>
              );
            })}
          </View>
        </Loader>
      </Container>
    </RefreshableScrollView>
  );
};

export default TransList;
