import React from "react";

import { StyleSheet, View } from "react-native";

import { Button, Typography } from "@/common/components";
// import { TransCard } from "@/modules/transactions/components";

const RecentTrans = () => {
  return (
    <View>
      <View style={styles.header}>
        <Typography fontWeight="700" style={styles.title}>
          Transaksi Terbaru
        </Typography>
        <Button isCompact variant="subtle" color="secondary">
          Lihat Semua
        </Button>
      </View>

      {/* <View style={{ gap: 16 }}>
        {[...Array(10)].map((_, i) => {
          const isPlus = i % 2 === 1;

          return <TransCard key={i} isPlus={isPlus} />;
        })}
      </View> */}
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
});

export default RecentTrans;
