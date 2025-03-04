import React from "react";

import { ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Fa6Icon from "react-native-vector-icons/FontAwesome6";
import IonIcon from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";

import {
  Button,
  DatePicker,
  Input,
  Select,
  Typography,
} from "@/common/components";
import { opacityColor } from "@/common/utils/colors";

const TransactionForm = () => {
  const router = useRouter();
  const { transType } = useLocalSearchParams<{ transType?: string }>();

  const theme = useTheme();
  const insets = useSafeAreaInsets();

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
          <TouchableOpacity onPress={() => router.dismissTo("/transactions")}>
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
            <Input
              label="Nominal"
              keyboardType="numeric"
              isRequired
              placeholder="Masukkan nominal"
              leftContent={
                <Typography
                  style={{ paddingLeft: 6, transform: [{ translateY: -1 }] }}
                >
                  Rp
                </Typography>
              }
            />

            <DatePicker
              label="Tanggal"
              placeholder="Pilih tanggal"
              pickerProps={{ mode: "datetime" }}
            />

            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Select
                options={[
                  { label: "Makanan", value: "makanan" },
                  { label: "Minuman", value: "minuman" },
                ]}
                label="Kategori"
                placeholder="Pilih kategori"
                style={{ flex: 1 }}
              />
              <Button isCompact style={{ marginTop: 24 }}>
                <IonIcon name="add" size={16} />
              </Button>
            </View>

            <Input
              label="Catatan"
              multiline
              style={{ height: 120, textAlignVertical: "top" }}
              placeholder="Masukkan catatan"
            />
          </View>
        </ScrollView>
        <Button
          style={{ marginTop: 20 }}
          // color={transType === "income" ? "primary" : "secondary"}
        >
          Simpan
        </Button>
      </View>
    </View>
  );
};

export default TransactionForm;
