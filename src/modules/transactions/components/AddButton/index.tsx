import React, { useRef } from "react";

import { TouchableOpacity, View } from "react-native";
import Popover from "react-native-popover-view";
import IonIcon from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";
import { Link } from "expo-router";

import { Typography } from "@/common/components";
import { opacityColor } from "@/common/utils/colors";

const items = [
  { label: "Pemasukan", value: "income" },
  { label: "Pengeluaran", value: "expense" },
];

type AddButtonProps = {
  customButton?: React.ReactNode;
};

const AddButton: React.FC<AddButtonProps> = ({ customButton }) => {
  const theme = useTheme();
  const ref = useRef<Popover>(null);

  return (
    <Popover
      ref={ref}
      popoverStyle={{ borderRadius: 12 }}
      backgroundStyle={{
        backgroundColor: opacityColor(theme.colors.black, 10),
      }}
      from={
        customButton ?? (
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: theme.colors.primary,
                padding: 12,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: opacityColor(theme.colors.gray, 20),
              }}
            >
              <IonIcon name="add" size={18} color={theme.colors.white} />
            </View>
          </TouchableOpacity>
        )
      }
    >
      <View style={{ paddingVertical: 8, width: 160 }}>
        {items.map((item) => {
          return (
            <Link
              href={`/transactions/add?transType=${item.value}`}
              asChild
              key={item.value}
            >
              <TouchableOpacity
                onPress={() => ref.current?.requestClose()}
                style={{
                  flexDirection: "row",
                  gap: 16,
                  alignItems: "center",
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                }}
              >
                <Typography>{item.label}</Typography>
              </TouchableOpacity>
            </Link>
          );
        })}
      </View>
    </Popover>
  );
};

export default AddButton;
