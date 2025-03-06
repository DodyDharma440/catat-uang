import React, { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Fa6Icon from "react-native-vector-icons/FontAwesome6";
import IonIcon from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";
import dayjs from "dayjs";
import { useLocalSearchParams, useRouter } from "expo-router";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "firebase-config";

import {
  Button,
  DatePicker,
  Input,
  Select,
  Typography,
} from "@/common/components";
import { opacityColor } from "@/common/utils/colors";
import { thousandsFormat } from "@/common/utils/number-format";
import { useUserAuth } from "@/modules/auth/contexts";

import { useGetCategories } from "../../hooks";
import type { ITransactionForm, TransactionType } from "../../interfaces";

const TransactionForm = () => {
  const { push, dismissTo } = useRouter();
  const { transType } = useLocalSearchParams<{ transType?: string }>();

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
  } = useForm<ITransactionForm>({
    defaultValues: {
      date: new Date().toISOString(),
    },
  });

  const submitHandler = async (values: ITransactionForm) => {
    setIsLoading(true);

    try {
      const { category, ...formValues } = values;

      formValues.type = (transType ?? "expense") as TransactionType;
      formValues.date = dayjs(formValues.date).format("YYYY-MM-DD");
      formValues.time = dayjs(formValues.date).format("HH:mm");

      const categoryColName =
        transType === "income" ? "income_categories" : "categories";

      await addDoc(
        collection(db, "transactions", user?.uid ?? "", "user_transactions"),
        {
          ...formValues,
          category: doc(db, categoryColName, category),
        }
      );

      setIsLoading(false);
      push("/transactions");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("🚀 ~ submitHandler ~ error:", error);
      setIsLoading(false);
    }
  };

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
        <View style={{ flexDirection: "row", padding: 16 }}>
          <TouchableOpacity onPress={() => dismissTo("/transactions")}>
            <IonIcon name="arrow-back" color={theme.colors.white} size={24} />
          </TouchableOpacity>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Typography
              style={{ color: theme.colors.white, fontSize: 20 }}
              fontWeight="600"
            >
              Tambah {transType === "income" ? "Pemasukan" : "Pengeluaran"}
            </Typography>
          </View>
          <View style={{ width: 24 }}></View>
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
                    isRequired
                    placeholder="Masukkan nominal"
                    errorMessage={errors.amount?.message}
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
                    isRequired
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(v) => field.onChange(v.toISOString())}
                    label="Tanggal"
                    errorMessage={errors.date?.message}
                    placeholder="Pilih tanggal"
                    pickerProps={{ mode: "datetime" }}
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
                      isRequired
                      options={categoryOptions}
                      label="Kategori"
                      placeholder="Pilih kategori"
                      style={{ flex: 1 }}
                      errorMessage={errors.category?.message}
                      {...field}
                    />
                    <Button isCompact style={{ marginTop: 24 }}>
                      <IonIcon name="add" size={16} />
                    </Button>
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
                    {...field}
                    onChangeText={(e) => field.onChange(e)}
                  />
                );
              }}
            />
          </View>
        </ScrollView>
        <Button
          isLoading={isLoading}
          style={{ marginTop: 20 }}
          onPress={handleSubmit(submitHandler)}
        >
          Simpan
        </Button>
      </View>
    </View>
  );
};

export default TransactionForm;
