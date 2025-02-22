import React from "react";
import { Controller, useForm } from "react-hook-form";

import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

import { StackActions } from "@react-navigation/native";
import { useNavigationContainerRef, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-config";

import { Button, Input, Typography } from "@/common/components";
import theme from "@/common/configs/theme";

import { useAuthScreen, useUserAuth } from "../../contexts";
import type { ISignInForm } from "../../interfaces";

const SignIn = () => {
  const router = useRouter();
  const rootNavigation = useNavigationContainerRef();

  const { setUser } = useUserAuth();
  const { setMode } = useAuthScreen();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>();

  const submitHandler = async (values: ISignInForm) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      setUser(user);
      rootNavigation.dispatch(StackActions.popToTop());
      router.replace("/dashboard");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.root}>
      <Typography fontWeight="700" style={styles.title}>
        Selamat Datang!
      </Typography>
      <Typography fontWeight="500" style={styles.subtitle}>
        Silahkan login untuk melanjutkan
      </Typography>

      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email harus diisi",
            validate: (val) => {
              if (
                !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)
              ) {
                return "Email tidak valid";
              }
            },
          }}
          render={({ field }) => {
            return (
              <Input
                {...field}
                onChangeText={field.onChange}
                label="Email"
                placeholder="Masukkan Email"
                isRequired
                errorMessage={errors.email?.message}
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
            );
          }}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password harus diisi",
          }}
          render={({ field }) => {
            return (
              <Input
                {...field}
                onChangeText={field.onChange}
                label="Password"
                placeholder="Password"
                isRequired
                secureTextEntry
                errorMessage={errors.password?.message}
              />
            );
          }}
        />
      </View>

      <Button
        onPress={handleSubmit(submitHandler)}
        fullWidth
        style={{ marginBottom: 6 }}
      >
        Login
      </Button>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Typography>Belum punya akun? </Typography>
        <TouchableOpacity onPress={() => setMode("sign-up")}>
          <Typography fontWeight="700" style={{ color: theme.colors.primary }}>
            Daftar
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    position: "relative",
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    marginBottom: 4,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#999999",
  },
  form: {
    marginVertical: 16,
    gap: 12,
    width: "100%",
  },
});

export default SignIn;
