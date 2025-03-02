import React from "react";

import { StyleSheet, View } from "react-native";

import { useTheme } from "@react-navigation/native";

import { Button, Typography } from "@/common/components";

type TransCardProps = {
  isPlus: boolean;
};

const TransCard: React.FC<TransCardProps> = ({ isPlus }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.card,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Typography fontWeight="700" style={styles.cardTitle}>
          Title Pengeluaran
        </Typography>
        <Typography
          fontWeight="700"
          style={[
            styles.valueText,
            {
              color: theme.colors[isPlus ? "green" : "red"],
            },
          ]}
        >
          {isPlus ? "+" : "-"} Rp 10.000
        </Typography>
        <Typography style={{ color: theme.colors.gray }}>
          Nama kategori
        </Typography>
      </View>
      <Button variant="subtle" isCompact innerStyle={{ paddingHorizontal: 8 }}>
        Detail
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 2,
  },
  valueText: {
    fontSize: 16,
    marginBottom: 2,
  },
});

export default TransCard;
