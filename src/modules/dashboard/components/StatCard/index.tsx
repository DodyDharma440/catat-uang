import React, { forwardRef } from "react";

import type { ViewProps } from "react-native";
import { View } from "react-native";

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
          {
            flex: 1,
            backgroundColor: theme.colors[color ?? "gray"],
            borderRadius: 16,
            flexDirection: "row",
            padding: 16,
            gap: 12,
            alignItems: "center",
          },
          style,
        ]}
        {...props}
        ref={ref}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.white,
            borderRadius: 8,
            width: 36,
            height: 36,
          }}
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

export default StatCard;
