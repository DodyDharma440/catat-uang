import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { withAuth } from "@/common/hocs";
import { DashboardContainer } from "@/modules/dashboard/components";

const DashboardScreen = () => {
  return (
    <SafeAreaView>
      <DashboardContainer />
    </SafeAreaView>
  );
};

export default withAuth(DashboardScreen);
