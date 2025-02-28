import React from "react";

import { View } from "react-native";
import Fa6icons from "react-native-vector-icons/FontAwesome6";

import StatCard from "../StatCard";

const Stats = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        maxWidth: "100%",
        gap: 18,
      }}
    >
      <StatCard
        color="primary"
        label="Pemasukan"
        value="Rp 3jt"
        icon={(color) => (
          <Fa6icons name="money-bill-trend-up" size={16} color={color} />
        )}
      />
      <StatCard
        color="secondary"
        label="Pengeluaran"
        value="Rp 3jt"
        icon={(color) => (
          <Fa6icons name="money-bill-wave" size={16} color={color} />
        )}
      />
    </View>
  );
};

export default Stats;
