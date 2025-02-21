import React, { forwardRef } from "react";

import type { TouchableOpacityProps } from "react-native";
import { View } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";

import { useTheme } from "@react-navigation/native";

import Typography from "../Typography";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  variant?: ButtonVariant;
  fullWidth?: boolean;
} & TouchableOpacityProps;

const Button = forwardRef<View, ButtonProps>(
  ({ style, variant = "primary", fullWidth, children, ...props }, ref) => {
    const theme = useTheme();

    return (
      <TouchableOpacity
        {...props}
        style={[style, fullWidth ? { width: "100%" } : {}]}
        ref={ref}
      >
        <View
          style={[
            styles.inner,
            {
              backgroundColor: theme.colors[variant],
            },
          ]}
        >
          <Typography fontWeight="700" style={styles.text}>
            {children}
          </Typography>
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  inner: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 10,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default Button;
