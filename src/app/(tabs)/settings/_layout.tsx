import React from "react";

import { Stack } from "expo-router";

const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="account" options={{ title: "Akun Saya" }} />
      <Stack.Screen name="categories" options={{ title: "Kategori" }} />
      <Stack.Screen name="about" options={{ title: "Tentang Aplikasi" }} />
    </Stack>
  );
};

export default SettingsLayout;
