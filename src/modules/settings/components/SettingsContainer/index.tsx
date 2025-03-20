import React from "react";

import { StyleSheet, View } from "react-native";

import { useTheme } from "@react-navigation/native";
import { Link, useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "firebase-config";

import { AlertSheet, Button, Typography } from "@/common/components";
import { useDisclosure } from "@/common/hooks";
import { useUserAuth } from "@/modules/auth/contexts";

import { settingItems } from "../../constants";
import SettingItem from "../SettingItem";

const SettingsContainer = () => {
  const theme = useTheme();
  const { dismissTo } = useRouter();

  const { setUser } = useUserAuth();

  const [isOpenLogout, { open: openLogout, close: closeLogout }] =
    useDisclosure();

  const handleSignOut = async () => {
    await signOut(auth);
    dismissTo("/auth");
    setUser(null);
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.titleWrapper}>
          <Typography fontWeight="700" style={styles.title}>
            Catat
          </Typography>
          <Typography
            fontWeight="700"
            style={[styles.title, { color: theme.colors.primary }]}
          >
            Uang
          </Typography>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Typography style={styles.listTitle} fontWeight="700">
          Pengaturan
        </Typography>

        <View style={{ gap: 30 }}>
          {settingItems.map((item, index) => {
            const isSignOut = item.title === "Sign Out";

            return (
              <React.Fragment key={index}>
                {isSignOut ? (
                  <SettingItem
                    {...item}
                    action={item.title === "Sign Out" ? openLogout : undefined}
                  />
                ) : (
                  <Link asChild href={item.path ?? "/"}>
                    <SettingItem {...item} />
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </View>
      </View>

      <AlertSheet
        isOpen={isOpenLogout}
        title="Logout Akun"
        description="Apakah Anda yakin untuk logout? Anda harus login kembali."
        action={
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button style={{ flex: 1 }} variant="light" onPress={handleSignOut}>
              Logout
            </Button>
            <Button style={{ flex: 1 }} onPress={closeLogout}>
              Batal
            </Button>
          </View>
        }
        onClose={closeLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 24,
    minHeight: "100%",
  },
  header: {
    justifyContent: "center",
    paddingVertical: 16,
    width: "100%",
  },
  titleWrapper: {
    flexDirection: "row",
    marginBottom: 14,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
  },
  listTitle: {
    fontSize: 30,
    marginBottom: 28,
  },
});

export default SettingsContainer;
