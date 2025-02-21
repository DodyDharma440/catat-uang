import React from "react";
import { Controller, useForm } from "react-hook-form";

import { StyleSheet, View } from "react-native";

import { Link } from "expo-router";

import { Button, Input, Typography } from "@/common/components";
import theme from "@/common/configs/theme";

import type { ISignInForm } from "../../interfaces";

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>();

  const submitHandler = (values: ISignInForm) => {};

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
        <Link href="/sign-up">
          <Typography fontWeight="700" style={{ color: theme.colors.primary }}>
            Daftar
          </Typography>
        </Link>
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
