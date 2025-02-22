import React from "react";

import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { withAuth } from "@/common/hocs";
import { useUserAuth } from "@/modules/auth/contexts";

const DashboardScreen = () => {
  const { user } = useUserAuth();

  return (
    <SafeAreaView>
      <Text>{user?.displayName}</Text>
    </SafeAreaView>
  );
};

export default withAuth(DashboardScreen);
