import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { SettingsContainer } from "@/modules/settings/components";

const SettingsScreen = () => {
  return (
    <SafeAreaView>
      <SettingsContainer />
    </SafeAreaView>
  );
};

export default SettingsScreen;
