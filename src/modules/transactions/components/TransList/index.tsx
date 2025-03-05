import React, { useEffect, useState } from "react";

import { View } from "react-native";

import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "firebase-config";

import { Typography } from "@/common/components";
import { useUserAuth } from "@/modules/auth/contexts";

import type { ICategory, ITransaction } from "../../interfaces";
import TransCard from "../TransCard";

const headings = ["Hari Ini", "Kemarin", "Lebih Awal"];

const TransList = () => {
  const { user } = useUserAuth();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    const handleGetTransactions = async () => {
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
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("🚀 ~ handleGetTransactions ~ error:", error);
      }
    };

    handleGetTransactions();
  }, [user?.uid]);

  return (
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
  );
};

export default TransList;
