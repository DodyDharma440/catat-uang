import React, { useCallback, useEffect, useState } from "react";

import { View } from "react-native";

import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "firebase-config";

import {
  Container,
  Loader,
  RefreshableScrollView,
  Typography,
} from "@/common/components";
import { useFetchState } from "@/common/hooks";
import { useUserAuth } from "@/modules/auth/contexts";

import type { ICategory, ITransaction } from "../../interfaces";
import TransCard from "../TransCard";

const headings = ["Hari Ini", "Kemarin", "Lebih Awal"];

const TransList = () => {
  const { user } = useUserAuth();

  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const { isLoading, errorMessage, setError, startLoading, endLoading } =
    useFetchState();

  const handleGetTransactions = useCallback(async () => {
    startLoading();
    const q = query(
      collection(db, "transactions", user?.uid ?? "", "user_transactions"),
      orderBy("date", "asc")
    );

    try {
      const querySnapshot = await getDocs(q);
      const _trans: ITransaction[] = [];

      await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const categoryDoc = await getDoc(data.category);
          _trans.push({
            ...(data as ITransaction),
            category: categoryDoc.data() as ICategory,
            id: doc.id,
          });
        })
      );

      setTransactions(_trans);
      endLoading();
    } catch (error) {
      endLoading();
      setError(error);
    }
  }, [endLoading, setError, startLoading, user?.uid]);

  useEffect(() => {
    handleGetTransactions();
  }, [handleGetTransactions]);

  return (
    <RefreshableScrollView refresher={handleGetTransactions}>
      <Container>
        <Loader
          isLoading={isLoading}
          error={errorMessage}
          isEmpty={!transactions.length}
          emptyMessage="Tidak ada transaksi"
        >
          <View style={{ gap: 16, paddingBottom: 200 }}>
            {headings.map((heading) => {
              return (
                <View key={heading} style={{ gap: 12 }}>
                  <Typography fontWeight="700" style={{ fontSize: 18 }}>
                    {heading}
                  </Typography>
                  {transactions.map((trans, i) => {
                    return <TransCard key={i} transaction={trans} />;
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
