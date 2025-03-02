import React from "react";

import { Text } from "react-native";

import { withAuth } from "@/common/hocs";

const CalendarScreen = () => {
  return <Text>CalendarScreen</Text>;
};

export default withAuth(CalendarScreen);
