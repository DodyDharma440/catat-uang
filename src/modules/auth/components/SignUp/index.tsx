import React, { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "firebase-config";

import { Button, Input, Typography } from "@/common/components";
import theme from "@/common/configs/theme";
import { useRemoveAndReplace } from "@/common/hooks";

import { useAuthScreen, useUserAuth } from "../../contexts";
import type { ISignUpForm } from "../../interfaces";

const SignUp = () => {
  const { removeAndReplace } = useRemoveAndReplace();

  const { setUser } = useUserAuth();
  const { setMode } = useAuthScreen();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpForm>();
  const passwordValue = useWatch({ control, name: "password" });

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (values: ISignUpForm) => {
    setIsLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateProfile(user, { displayName: values.name });
      setUser({ ...user, displayName: values.name });
      removeAndReplace("/dashboard");
      setIsLoading(false);
    } catch (err: any) {
      Alert.alert("Error", err.message);
      setIsLoading(false);
    }
  };

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
                : undefined;
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
        isLoading={isLoading}
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
