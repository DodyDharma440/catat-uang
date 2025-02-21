import React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Button, Input, Typography } from "@/common/components";
import theme from "@/common/configs/theme";

import { useAuthScreen } from "../../contexts";
import type { ISignUpForm } from "../../interfaces";

const SignUp = () => {
  const { setMode } = useAuthScreen();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpForm>();
  const passwordValue = useWatch({ control, name: "password" });

  const submitHandler = (values: ISignUpForm) => {};

  return (
    <View style={styles.root}>
      <Typography fontWeight="700" style={styles.title}>
        Buat Akun Baru
      </Typography>
      <Typography fontWeight="500" style={styles.subtitle}>
        Isi semua form field untuk melanjutkan
      </Typography>

      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          rules={{
            required: "Nama harus diisi",
          }}
          render={({ field }) => {
            return (
              <Input
                {...field}
                onChangeText={field.onChange}
                label="Nama"
                placeholder="Nama"
                isRequired
                errorMessage={errors.name?.message}
              />
            );
          }}
        />
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
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Konfirmasi Password harus diisi",
            validate: (val) => {
              return passwordValue !== val
                ? "Konfirmasi Password tidak cocok"
                : false;
            },
          }}
          render={({ field }) => {
            return (
              <Input
                {...field}
                onChangeText={field.onChange}
                label="Konfirmasi Password"
                placeholder="Konfirmasi Password"
                isRequired
                secureTextEntry
                errorMessage={errors.confirmPassword?.message}
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
        Daftar
      </Button>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Typography>Sudah punya akun? </Typography>
        <TouchableOpacity onPress={() => setMode("sign-in")}>
          <Typography fontWeight="700" style={{ color: theme.colors.primary }}>
            Login
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

export default SignUp;
