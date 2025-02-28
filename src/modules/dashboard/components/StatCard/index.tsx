import React, { forwardRef } from "react";

import type { ViewProps } from "react-native";
import { StyleSheet, View } from "react-native";

import type { ColorsKey } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";

import { Typography } from "@/common/components";

type StatCardProps = {
  color: ColorsKey;
  icon: (color: string) => React.ReactNode;
  label: string;
  value: string;
} & ViewProps;

const StatCard = forwardRef<View, StatCardProps>(
  ({ style, color, icon, label, value, ...props }, ref) => {
    const theme = useTheme();

    return (
      <View
        style={[
          styles.root,
          { backgroundColor: theme.colors[color ?? "gray"] },
          style,
        ]}
        {...props}
        ref={ref}
      >
        <View
          style={[styles.iconWrapper, { backgroundColor: theme.colors.white }]}
        >
          {icon(theme.colors[color])}
        </View>

        <View style={{ flex: 1 }}>
          <Typography style={{ color: theme.colors.white }} fontWeight="500">
            {label}
          </Typography>
          <Typography
            style={{ color: theme.colors.white, fontSize: 22 }}
            fontWeight="600"
          >
            {value}
          </Typography>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    borderRadius: 16,
    flexDirection: "row",
    padding: 16,
    gap: 12,
    alignItems: "center",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: 36,
    height: 36,
  },
});

export default StatCard;
