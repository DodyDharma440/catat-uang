import React from "react";

import { StyleSheet, View } from "react-native";

import { Link } from "expo-router";

import { Button, Loader, Typography } from "@/common/components";
import { TransCard } from "@/modules/transactions/components";
import { useGetTransactions } from "@/modules/transactions/hooks";

const RecentTrans = () => {
  const { transactions, isLoading, errorMessage } = useGetTransactions({
    limit: 8,
  });

  return (
    <View>
      <View style={styles.header}>
        <Typography fontWeight="700" style={styles.title}>
          Transaksi Terbaru
        </Typography>
        <Link href="/transactions" asChild>
          <Button isCompact variant="subtle">
            Lihat Semua
          </Button>
        </Link>
      </View>

      <Loader
        isLoading={isLoading}
        error={errorMessage}
        isEmpty={!transactions.length}
        emptyMessage="Tidak ada transaksi"
        loaderElement={
          <View style={styles.listWrapper}>
            {[...Array(6)].map((_, i) => {
              return <TransCard.Skeleton key={i} />;
            })}
          </View>
        }
      >
        <View style={styles.listWrapper}>
          {transactions.map((trans) => {
            return (
              <View key={trans.title} style={{ gap: 12 }}>
                <Typography fontWeight="700" style={{ fontSize: 16 }}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    flex: 1,
  },
  listWrapper: {
    gap: 16,
  },
});

export default RecentTrans;
