import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";

import { View } from "react-native";
import type { RBSheetRef } from "react-native-raw-bottom-sheet";
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from "react-native-toast-message";

import { addDoc, collection } from "firebase/firestore";
import { db } from "firebase-config";

import { Button, Container, Input, Typography } from "@/common/components";
import { useFetchState } from "@/common/hooks";
import { useUserAuth } from "@/modules/auth/contexts";

import type { ICategoryForm } from "../../interfaces";

type CategoryFormProps = {
  isOpen: boolean;
  onClose: () => void;
  transType: string;
  onCompleted: () => void;
};

const CategoryForm: React.FC<CategoryFormProps> = ({
  isOpen,
  onClose,
  transType,
  onCompleted,
}) => {
  const { user } = useUserAuth();
  const sheetRef = useRef<RBSheetRef>(null);

  const { isLoading, startLoading, endLoading } = useFetchState();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICategoryForm>();

  const submitHandler = async (values: ICategoryForm) => {
    startLoading();
    values.userId = user?.uid ?? "";

    try {
      const categoryColName =
        transType === "income" ? "income_categories" : "categories";
      await addDoc(collection(db, categoryColName), {
        ...values,
        iconName: "add",
        color: "#5C677D",
      });
      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Kategori baru berhasil ditambahkan",
      });
      onClose();
      onCompleted();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: (error as any)?.message ?? "Terjadi kesalahan",
      });
      endLoading();
    }
  };

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.open();
      reset();
    } else {
      sheetRef.current?.close();
    }
  }, [isOpen, onClose, reset]);

  return (
    <RBSheet ref={sheetRef} onClose={onClose} height={224}>
      <Container>
        <Typography style={{ fontSize: 18, marginBottom: 16 }} fontWeight="700">
          Tambah Kategori
        </Typography>
        <View style={{ gap: 16 }}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Nama kategori harus diisi",
            }}
            render={({ field }) => {
              return (
                <Input
                  label="Nama Kategori"
                  {...field}
                  placeholder="Nama Kategori"
                  onChangeText={field.onChange}
                  errorMessage={errors.name?.message}
                  isRequired
                />
              );
            }}
          />
          <Button isLoading={isLoading} onPress={handleSubmit(submitHandler)}>
            Tambahkan
          </Button>
        </View>
      </Container>
    </RBSheet>
  );
};

export default CategoryForm;
