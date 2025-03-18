import React from "react";

import { Stack } from "expo-router";

const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="account"
        options={{
          title: "Akun Saya",
          headerBackTitle: "Pengaturan",
        }}
      />
      <Stack.Screen
        name="categories"
        options={{
          title: "Kategori",
          headerBackTitle: "Pengaturan",
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: "Tentang Aplikasi",
          headerBackTitle: "Pengaturan",
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
