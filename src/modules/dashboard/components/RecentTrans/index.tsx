import React from "react";

import { View } from "react-native";

import { useTheme } from "@react-navigation/native";

import { Button, Typography } from "@/common/components";

const RecentTrans = () => {
  const theme = useTheme();

  return (
    <View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}
      >
        <Typography fontWeight="700" style={{ fontSize: 20, flex: 1 }}>
          Transaksi Terbaru
        </Typography>
        <Button isCompact variant="subtle" color="secondary">
          Lihat Semua
        </Button>
      </View>

      <View style={{ gap: 16 }}>
        {[...Array(10)].map((_, i) => {
          const isPlus = i % 2 === 1;

          return (
            <View
              key={i}
              style={{
                borderRadius: 8,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: theme.colors.border,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <Typography
                  fontWeight="700"
                  style={{ fontSize: 18, marginBottom: 2 }}
                >
                  Title Pengeluaran
                </Typography>
                <Typography
                  fontWeight="700"
                  style={{
                    fontSize: 16,
                    color: theme.colors[isPlus ? "red" : "green"],
                    marginBottom: 2,
                  }}
                >
                  {isPlus ? "+" : "-"} Rp 10.000
                </Typography>
                <Typography style={{ color: theme.colors.gray }}>
                  Nama kategori
                </Typography>
              </View>
              <Button
                variant="subtle"
                isCompact
                innerStyle={{ paddingHorizontal: 8 }}
              >
                Detail
              </Button>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default RecentTrans;
