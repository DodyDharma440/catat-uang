import React, { useMemo } from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";
import dayjs from "dayjs";

import { Typography } from "@/common/components";
import { opacityColor } from "@/common/utils/colors";

type MonthSelectorProps = {
  value: string;
};

const MonthSelector: React.FC<MonthSelectorProps> = ({ value }) => {
  const theme = useTheme();
  const dateLabel = useMemo(() => {
    return dayjs(`${value}-01`).format("MMMM YYYY");
  }, [value]);

  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={[
          styles.monthFilter,
          { borderColor: opacityColor(theme.colors.primary, 10) },
        ]}
      >
        <Typography fontWeight="600">{dateLabel}</Typography>
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
