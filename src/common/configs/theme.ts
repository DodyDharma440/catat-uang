import type { Theme } from "@react-navigation/native";
import { DefaultTheme } from "@react-navigation/native";

const theme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "#803dff",
    secondary: "#F469A9",
    blue: "#2D77F1",
    white: "#FFFFFF",
    green: "#00bc7d",
    yellow: "#eba222",
    red: "#fd3c4a",
    gray: "#637481",
    black: "#000000",
  },
};

export default theme;
