import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Fa6Icon from "react-native-vector-icons/FontAwesome6";
import IonIcon from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";
import dayjs from "dayjs";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "firebase-config";

import {
  AlertSheet,
  Button,
  DatePicker,
  Input,
  Loader,
  Select,
  Typography,
} from "@/common/components";
import type { LoaderProps } from "@/common/components/Loader";
import { useDisclosure, useFetchState } from "@/common/hooks";
import { opacityColor } from "@/common/utils/colors";
import { thousandsFormat } from "@/common/utils/number-format";
import { useUserAuth } from "@/modules/auth/contexts";

import { useGetCategories } from "../../hooks";
import type {
  ITransaction,
  ITransactionForm,
  TransactionType,
} from "../../interfaces";

type TransactionFormProps = {
  isReadOnly?: boolean;
  transaction?: ITransaction;
  loaderProps?: Omit<LoaderProps, "children">;
};

const TransactionForm: React.FC<TransactionFormProps> = ({
  isReadOnly,
  transaction,
  loaderProps,
}) => {
  const { dismissTo } = useRouter();
  const { transType: transTypeParams } = useLocalSearchParams<{
    transType?: string;
  }>();
  const [transType, setTransType] = useState(transTypeParams);

  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const { user } = useUserAuth();

  const { categories } = useGetCategories({
    transType: (transType ?? "expense") as TransactionType,
  });
  const categoryOptions = useMemo(() => {
    return categories.map((c) => ({ label: c?.name, value: c?.id }));
  }, [categories]);

  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ITransactionForm>({
    defaultValues: {
      date: new Date().toISOString(),
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const isReadOnlyField = useMemo(() => {
    return isReadOnly && !isEditing;
  }, [isEditing, isReadOnly]);

  const [isOpenDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure();
  const {
    isLoading: isLoadingDelete,
    startLoading: startLoadingDelete,
    endLoading: endLoadingDelete,
  } = useFetchState();

  const submitHandler = async (values: ITransactionForm) => {
    setIsLoading(true);

    try {
      const { category, ...formValues } = values;

      formValues.type = (transType ?? "expense") as TransactionType;
      formValues.time = dayjs(formValues.date).format("HH:mm");
      formValues.date = dayjs(formValues.date).format("YYYY-MM-DD");
      formValues.note = formValues.note ?? "";

      const categoryColName =
        transType === "income" ? "income_categories" : "categories";

      if (isEditing && transaction?.id) {
        await updateDoc(
          doc(
            db,
            "transactions",
            user?.uid ?? "",
            "user_transactions",
            transaction?.id
          ),
          {
            ...formValues,
            category: doc(db, categoryColName, category),
          }
        );
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: "Catatan transaksi berhasil diperbarui",
        });
      } else {
        await addDoc(
          collection(db, "transactions", user?.uid ?? "", "user_transactions"),
          {
            ...formValues,
            category: doc(db, categoryColName, category),
          }
        );
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: "Catatan transaksi berhasil dibuat",
        });
      }

      setIsLoading(false);
      dismissTo("/transactions");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("🚀 ~ submitHandler ~ error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: (error as any)?.message ?? "Terjadi kesalahan",
      });
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    startLoadingDelete();
    if (transaction) {
      try {
        await deleteDoc(
          doc(
            db,
            "transactions",
            user?.uid ?? "",
            "user_transactions",
            transaction.id
          )
        );
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: "Catatan transaksi berhasil dihapus",
        });
        closeDelete();
        dismissTo("/transactions");
        endLoadingDelete();
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: (error as any)?.message ?? "Terjadi kesalahan",
        });
        endLoadingDelete();
      }
    }
  };

  useEffect(() => {
    if (transaction) {
      const { title, note, category, amount, type, date, time } = transaction;
      const [hour, minute] = time.split(":");
      const dateTime = dayjs(date)
        .set("hours", Number(hour))
        .set("minutes", Number(minute))
        .toISOString();
      reset({
        title,
        note,
        category: category.id,
        amount,
        type,
        date: dateTime,
      });
    }
  }, [reset, transaction]);

  return (
    <View style={{ minHeight: "100%" }}>
      <View
        style={{
          height: "36%",
          backgroundColor:
            theme.colors[transType === "income" ? "primary" : "red"],
          paddingTop: insets.top,
          position: "relative",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 16,
            position: "relative",
            zIndex: 3,
          }}
        >
          <TouchableOpacity onPress={() => dismissTo("/transactions")}>
            <IonIcon name="arrow-back" color={theme.colors.white} size={24} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              style={{ color: theme.colors.white, fontSize: 20 }}
              fontWeight="600"
            >
              {isReadOnly ? (isEditing ? "Edit" : "Detail") : "Tambah"}{" "}
              {transType === "income" ? "Pemasukan" : "Pengeluaran"}
            </Typography>
          </View>
          {isReadOnly ? (
            isEditing ? (
              <TouchableOpacity onPress={() => setIsEditing(false)}>
                <IonIcon name="close" color={theme.colors.white} size={24} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={openDelete}>
                <IonIcon
                  name="trash-outline"
                  color={theme.colors.white}
                  size={24}
                />
              </TouchableOpacity>
            )
          ) : (
            <TouchableOpacity
              onPress={() =>
                setTransType((prev) =>
                  prev === "income" ? "expense" : "income"
                )
              }
            >
              <IonIcon name="refresh" color={theme.colors.white} size={24} />
            </TouchableOpacity>
          )}
        </View>
        <Fa6Icon
          name={
            transType === "income" ? "money-bill-trend-up" : "money-bill-wave"
          }
          color={opacityColor(theme.colors.black, 20)}
          style={{ position: "absolute", right: 0, bottom: 50 }}
          size={140}
        />
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.white,
          transform: [{ translateY: -60 }],
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          marginBottom: -60,
          padding: 24,
        }}
      >
        <Loader isLoading={false} {...loaderProps}>
          <ScrollView>
            <View style={{ gap: 16 }}>
              <Controller
                control={control}
                name="amount"
                rules={{
                  required: "Nominal harus diisi",
                }}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      value={thousandsFormat(field.value, ".")}
                      onChangeText={(e) =>
                        field.onChange(Number(e.replaceAll(".", "")))
                      }
                      label="Nominal"
                      keyboardType="numeric"
                      isRequired={!isReadOnly}
                      placeholder="Masukkan nominal"
                      errorMessage={errors.amount?.message}
                      readOnly={isReadOnlyField}
                      leftContent={
                        <Typography
                          style={{
                            paddingLeft: 6,
                            transform: [{ translateY: -1 }],
                          }}
                        >
                          Rp
                        </Typography>
                      }
                    />
                  );
                }}
              />

              <Controller
                control={control}
                name="title"
                rules={{
                  required: "Berita harus diisi",
                }}
                render={({ field }) => {
                  return (
                    <Input
                      label="Berita"
                      placeholder="Berita..."
                      errorMessage={errors.title?.message}
                      readOnly={isReadOnlyField}
                      isRequired={!isReadOnly}
                      {...field}
                      onChangeText={field.onChange}
                    />
                  );
                }}
              />

              <Controller
                control={control}
                name="date"
                rules={{
                  required: "Tanggal harus dipilih",
                }}
                render={({ field }) => {
                  return (
                    <DatePicker
                      {...field}
                      isRequired={!isReadOnly}
                      value={field.value ? new Date(field.value) : undefined}
                      onChange={(v) => field.onChange(v.toISOString())}
                      label="Tanggal"
                      errorMessage={errors.date?.message}
                      placeholder="Pilih tanggal"
                      pickerProps={{ mode: "datetime" }}
                      readOnly={isReadOnlyField}
                      displayValueFormat="DD MMM YYYY HH:mm"
                    />
                  );
                }}
              />

              <Controller
                control={control}
                name="category"
                rules={{
                  required: "Kategori harus dipilih",
                }}
                render={({ field }) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 8,
                        alignItems: "center",
                      }}
                    >
                      <Select
                        isRequired={!isReadOnly}
                        options={categoryOptions}
                        label="Kategori"
                        placeholder="Pilih kategori"
                        style={{ flex: 1 }}
                        errorMessage={errors.category?.message}
                        readOnly={isReadOnlyField}
                        {...field}
                      />
                      {!isReadOnlyField ? (
                        <Button isCompact style={{ marginTop: 24 }}>
                          <IonIcon name="add" size={16} />
                        </Button>
                      ) : null}
                    </View>
                  );
                }}
              />

              <Controller
                control={control}
                name="note"
                render={({ field }) => {
                  return (
                    <Input
                      label="Catatan"
                      multiline
                      style={{ height: 120, textAlignVertical: "top" }}
                      placeholder="Masukkan catatan"
                      readOnly={isReadOnlyField}
                      {...field}
                      onChangeText={(e) => field.onChange(e)}
                    />
                  );
                }}
              />
            </View>
          </ScrollView>
          <View style={{ marginTop: 20 }}>
            {isReadOnly && !isEditing ? (
              <>
                <Button variant="light" onPress={() => setIsEditing(true)}>
                  Edit
                </Button>
              </>
            ) : (
              <Button
                isLoading={isLoading}
                onPress={handleSubmit(submitHandler)}
              >
                Simpan
              </Button>
            )}
          </View>
        </Loader>
        <AlertSheet
          isOpen={isOpenDelete}
          title="Hapus Catatan"
          description="Apakah Anda yakin untuk menghapus catatan ini?"
          action={
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Button
                style={{ flex: 1 }}
                variant="light"
                onPress={handleDelete}
                isLoading={isLoadingDelete}
              >
                Hapus
              </Button>
              <Button
                style={{ flex: 1 }}
                onPress={closeDelete}
                disabled={isLoadingDelete}
              >
                Batal
              </Button>
            </View>
          }
          onClose={closeDelete}
        />
      </View>
    </View>
  );
};

export default TransactionForm;
