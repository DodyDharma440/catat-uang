import type { Theme } from "@react-navigation/native";
import { DefaultTheme } from "@react-navigation/native";

const theme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "#BA53DE",
    secondary: "#F469A9",
  },
};

export default theme;
