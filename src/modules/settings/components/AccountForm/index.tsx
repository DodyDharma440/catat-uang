import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { StyleSheet, View } from "react-native";

import { Avatar, Button, Input } from "@/common/components";
import { useUserAuth } from "@/modules/auth/contexts";

import type { IUpdateProfileForm } from "../../interfaces";

const AccountForm = () => {
  const { user } = useUserAuth();
  const {
    control,
    formState: { errors },
    reset,
  } = useForm<IUpdateProfileForm>();

  useEffect(() => {
    if (user) {
      const { displayName, email } = user;
      reset({ displayName: displayName ?? "", email: email ?? "" });
    }
  }, [reset, user]);

  return (
    <View style={styles.root}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Avatar size={60} name={user?.displayName} />
      </View>

      <Controller
        control={control}
        name="displayName"
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
              errorMessage={errors.displayName?.message}
              style={{ width: "100%" }}
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
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) {
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
      <Button>Perbarui Informasi</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 16,
  },
});

export default AccountForm;
