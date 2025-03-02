import React from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";

import { Typography } from "@/common/components";
import { opacityColor } from "@/common/utils/colors";

const MonthSelector = () => {
  const theme = useTheme();

  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={[
          styles.monthFilter,
          { borderColor: opacityColor(theme.colors.primary, 10) },
        ]}
      >
        <Typography fontWeight="600">Februari 2025</Typography>
        <Ionicons
          name="chevron-down"
          color={theme.colors.primary}
          size={16}
          style={{ marginTop: 2 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "center",
  },
  monthFilter: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 8,
    alignItems: "center",
    gap: 6,
  },
});

export default MonthSelector;
