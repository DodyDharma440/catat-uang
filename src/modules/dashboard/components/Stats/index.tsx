import React, { useEffect, useState } from "react";

import { View } from "react-native";
import Fa6icons from "react-native-vector-icons/FontAwesome6";

import { useTheme } from "@react-navigation/native";
import {
  collection,
  getAggregateFromServer,
  query,
  sum,
  where,
} from "firebase/firestore";
import { db } from "firebase-config";

import { Loader } from "@/common/components";
import { useFetchState } from "@/common/hooks";
import { compactNumber } from "@/common/utils/number-format";
import { useUserAuth } from "@/modules/auth/contexts";

import StatCard from "../StatCard";

const Stats = () => {
  const theme = useTheme();
  const { user } = useUserAuth();

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const { isLoading, startLoading, endLoading, setError } = useFetchState();

  useEffect(() => {
    const handleGetSummary = async () => {
      startLoading();
      try {
        const startDate = "2025-03-01";
        const endDate = "2025-03-31";

        const coll = collection(
          db,
          "transactions",
          user?.uid ?? "",
          "user_transactions"
        );
        const qIncome = query(
          coll,
          where("type", "==", "income"),
          where("date", ">=", startDate),
          where("date", "<=", endDate)
        );
        const qExpense = query(
          coll,
          where("type", "==", "expense"),
          where("date", ">=", startDate),
          where("date", "<=", endDate)
        );

        const snapshotIncome = await getAggregateFromServer(qIncome, {
          total: sum("amount"),
        });
        const snapshotExpense = await getAggregateFromServer(qExpense, {
          total: sum("amount"),
        });

        setIncome(snapshotIncome.data().total);
        setExpense(snapshotExpense.data().total);

        endLoading();
      } catch (error) {
        setError(error);
        endLoading();
      }
    };

    handleGetSummary();
  }, [endLoading, setError, startLoading, user?.uid]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        maxWidth: "100%",
        gap: 18,
      }}
    >
      <Loader
        isLoading={isLoading}
        loaderElement={
          <>
            <StatCard.Skeleton />
            <StatCard.Skeleton />
          </>
        }
      >
        <StatCard
          isHighlight
          label="Pemasukan"
          value={`Rp ${compactNumber(income)}`}
          icon={
            <Fa6icons
              name="money-bill-trend-up"
              size={16}
              color={theme.colors.primary}
            />
          }
        />
        <StatCard
          label="Pengeluaran"
          value={`Rp ${compactNumber(expense)}`}
          icon={
            <Fa6icons
              name="money-bill-wave"
              size={16}
              color={theme.colors.primary}
            />
          }
        />
      </Loader>
    </View>
  );
};

export default Stats;
