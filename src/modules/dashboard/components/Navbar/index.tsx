import React from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";
import { Link } from "expo-router";

import { Avatar, Typography } from "@/common/components";
import { opacityColor } from "@/common/utils/colors";
import { useUserAuth } from "@/modules/auth/contexts";

const Navbar = () => {
  const { user } = useUserAuth();
  const theme = useTheme();

  return (
    <View style={styles.root}>
      <Avatar name={user?.displayName} />

      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          style={[
            styles.monthFilter,
            { borderColor: opacityColor(theme.colors.primary, 10) },
          ]}
        >
          <Typography fontWeight="600">Februari 2025</Typography>
          <Ionicons
            name="chevron-down"
            color={theme.colors.primary}
            size={16}
            style={{ marginTop: 2 }}
          />
        </TouchableOpacity>
      </View>

      <Link href="/settings" asChild>
        <TouchableOpacity style={{ borderRadius: "50%" }}>
          <Icon name="cog" size={24} color={theme.colors.gray} />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  monthFilter: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 8,
    alignItems: "center",
    gap: 6,
  },
});

export default Navbar;
