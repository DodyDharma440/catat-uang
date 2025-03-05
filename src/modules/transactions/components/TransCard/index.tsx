import React from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";
import { Link } from "expo-router";

import { Typography } from "@/common/components";
import { currencyFormat } from "@/common/utils/number-format";

import type { ITransaction } from "../../interfaces";

type TransCardProps = {
  transaction: ITransaction;
};

const TransCard: React.FC<TransCardProps> = ({ transaction }) => {
  const theme = useTheme();
  const isPlus = transaction.type === "income";

  return (
    <Link href={`/transactions/detail/${transaction.id}`} asChild>
      <TouchableOpacity>
        <View
          style={[
            styles.card,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.card,
            },
          ]}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 50,
              backgroundColor: transaction.category.color,
              borderRadius: 12,
            }}
          >
            <IonIcon
              name={transaction.category.iconName}
              color={theme.colors.white}
              size={26}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Typography fontWeight="700" style={styles.cardTitle}>
              {transaction.title}
            </Typography>

            <Typography style={{ color: theme.colors.gray }}>
              {transaction.category.name}
            </Typography>
          </View>
          <View>
            <Typography
              fontWeight="700"
              style={[
                styles.valueText,
                {
                  color: theme.colors[isPlus ? "green" : "red"],
                },
              ]}
            >
              {isPlus ? "+" : "-"} {currencyFormat(transaction.amount)}
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  valueText: {
    fontSize: 16,
    marginBottom: 2,
  },
});

export default TransCard;
