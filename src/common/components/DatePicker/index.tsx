import React, { forwardRef, useState } from "react";

import type { StyleProp, TextInput, ViewStyle } from "react-native";
import { Pressable, View } from "react-native";
import type { ReactNativeModalDateTimePickerProps } from "react-native-modal-datetime-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import IonIcon from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";
import dayjs from "dayjs";

import type { InputProps } from "../Input";
import Input from "../Input";

type DatePickerProps = {
  datePickerRef?: React.LegacyRef<DateTimePickerModal>;
  style?: StyleProp<ViewStyle>;
  value?: Date;
  onChange?: (value: Date) => void;
  displayValueFormat?: string;
  pickerProps?: Partial<ReactNativeModalDateTimePickerProps>;
} & Omit<InputProps, "value" | "onChange" | "style">;

const DatePicker = forwardRef<TextInput, DatePickerProps>(
  (
    {
      style,
      value,
      onChange,
      displayValueFormat = "YYYY-MM-DD",
      pickerProps,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
      <View style={style}>
        <Pressable onPress={() => setIsOpen(true)}>
          <Input
            {...props}
            onChange={() => {}}
            onChangeText={() => {}}
            ref={ref}
            readOnly
            rightContent={
              <IonIcon
                name="calendar-outline"
                size={18}
                style={{
                  marginRight: 4,
                }}
              />
            }
            value={dayjs(value).format(displayValueFormat)}
          />
        </Pressable>
        <DateTimePickerModal
          isVisible={isOpen}
          accentColor={theme.colors.primary}
          {...pickerProps}
          locale="id-ID"
          date={value ?? new Date()}
          onConfirm={(date) => {
            setIsOpen(false);
            onChange?.(date);
          }}
          onCancel={() => {
            setIsOpen(false);
          }}
        />
      </View>
    );
  }
);

export default DatePicker;
