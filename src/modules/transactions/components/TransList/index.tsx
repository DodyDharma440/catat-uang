import React from "react";

import { View } from "react-native";

import { Typography } from "@/common/components";

import TransCard from "../TransCard";

const headings = ["Hari Ini", "Kemarin", "Lebih Awal"];

const TransList = () => {
  return (
    <View style={{ gap: 16, paddingBottom: 200 }}>
      {headings.map((heading) => {
        return (
          <View key={heading} style={{ gap: 12 }}>
            <Typography fontWeight="700" style={{ fontSize: 18 }}>
              {heading}
            </Typography>
            {[...Array(10)].map((_, i) => {
              const isPlus = i % 2 === 1;

              return <TransCard key={i} isPlus={isPlus} />;
            })}
          </View>
        );
      })}
    </View>
  );
};

export default TransList;
