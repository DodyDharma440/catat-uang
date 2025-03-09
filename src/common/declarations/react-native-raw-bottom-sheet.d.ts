declare module "react-native-raw-bottom-sheet" {
  export interface RBSheetRef {
    /**
     * The method to open bottom sheet.
     */
    open: () => void;

    /**
     * The method to close bottom sheet.
     */
    close: () => void;
  }
}

export {};
