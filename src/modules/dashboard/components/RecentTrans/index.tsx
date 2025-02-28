import React from "react";

import { StyleSheet, View } from "react-native";

import { useTheme } from "@react-navigation/native";

import { Button, Typography } from "@/common/components";

const RecentTrans = () => {
  const theme = useTheme();

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

      <View style={{ gap: 16 }}>
        {[...Array(10)].map((_, i) => {
          const isPlus = i % 2 === 1;

          return (
            <View
              key={i}
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
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
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

export default RecentTrans;
