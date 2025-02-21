import React from "react";

import Icon from "react-native-vector-icons/Ionicons";

import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="dashboard"
        options={{
          headerShown: false,
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Icon name="eye-off" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
