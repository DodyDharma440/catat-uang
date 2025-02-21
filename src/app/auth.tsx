import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { SignIn, SignUp } from "@/modules/auth/components";
import {
  AuthScreenContext,
  AuthScreenProvider,
} from "@/modules/auth/contexts/AuthScreenContext";

const AuthScreen = () => {
  return (
    <SafeAreaView>
      <AuthScreenProvider>
        <AuthScreenContext.Consumer>
          {({ mode }) => {
            return mode === "sign-in" ? <SignIn /> : <SignUp />;
          }}
        </AuthScreenContext.Consumer>
      </AuthScreenProvider>
    </SafeAreaView>
  );
};

export default AuthScreen;
