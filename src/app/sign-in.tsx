import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { SignIn } from "@/modules/auth/components";

const SignInScreen = () => {
  return (
    <SafeAreaView>
      <SignIn />
    </SafeAreaView>
  );
};

export default SignInScreen;
