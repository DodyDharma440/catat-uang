import React, { forwardRef } from "react";

import type { TouchableOpacityProps } from "react-native";
import { ActivityIndicator, View } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";

import { useTheme } from "@react-navigation/native";

import Typography from "../Typography";

type ButtonVariant = "filled" | "outlined";

type ButtonColor = "primary" | "secondary";

type ButtonProps = {
  variant?: ButtonVariant;
  color?: ButtonColor;
  fullWidth?: boolean;
  isLoading?: boolean;
} & TouchableOpacityProps;

const Button = forwardRef<View, ButtonProps>(
  (
    {
      style,
      // variant = "filled",
      color = "primary",
      isLoading,
      fullWidth,
      children,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <TouchableOpacity
        {...props}
        style={[
          style,
          fullWidth ? { width: "100%" } : {},
          { opacity: isLoading ? 0.6 : 1 },
        ]}
        ref={ref}
        disabled={props.disabled || isLoading}
      >
        <View
          style={[
            styles.inner,
            {
              backgroundColor: theme.colors[color],
            },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Typography fontWeight="700" style={styles.text}>
              {children}
            </Typography>
          )}
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
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default Button;
