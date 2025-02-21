import "@react-navigation/native";

declare module "@react-navigation/native" {
  interface NativeTheme {
    dark: boolean;
    colors: {
      primary: string;
      secondary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
    };
    fonts: {
      regular: FontStyle;
      medium: FontStyle;
      bold: FontStyle;
      heavy: FontStyle;
    };
  }

  export type Theme = NativeTheme;

  export function useTheme(): Theme;
}
