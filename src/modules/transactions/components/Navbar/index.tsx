import React from "react";

import { TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";
import { Link } from "expo-router";

import { opacityColor } from "@/common/utils/colors";

import MonthSelector from "../MonthSelector";

const Navbar = () => {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: theme.colors.white,
            padding: 12,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: opacityColor(theme.colors.gray, 20),
          }}
        >
          <Ionicons name="filter" size={18} />
        </View>
      </TouchableOpacity>
      <View>
        <MonthSelector />
      </View>
      <Link href="/transactions/add" asChild>
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
            <Ionicons name="add" size={18} color={theme.colors.white} />
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Navbar;
