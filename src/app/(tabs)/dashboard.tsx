import React from "react";

import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { signOut } from "firebase/auth";
import { auth } from "firebase-config";

import { Button } from "@/common/components";
import { withAuth } from "@/common/hocs";
import { useRemoveAndReplace } from "@/common/hooks";
import { useUserAuth } from "@/modules/auth/contexts";

const DashboardScreen = () => {
  const { removeAndReplace } = useRemoveAndReplace();
  const { user, setUser } = useUserAuth();

  const handleSignOut = async () => {
    await signOut(auth);
    removeAndReplace("/auth");
    setUser(null);
  };

  return (
    <SafeAreaView>
      <Text>{user?.displayName}</Text>
      <Button onPress={handleSignOut}>SIGN OUT</Button>
    </SafeAreaView>
  );
};

export default withAuth(DashboardScreen);
