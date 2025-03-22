import React, { useMemo, useState } from "react";

import { FlatList, TouchableOpacity, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";
import dayjs from "dayjs";

import { Button, Typography } from "@/common/components";
import { opacityColor } from "@/common/utils/colors";
import { MonthSelector } from "@/modules/transactions/components";

type CalendarProps = {
  value: string;
  onChange: (val: string) => void;
};

const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const Calendar: React.FC<CalendarProps> = ({ value, onChange }) => {
  const theme = useTheme();
  const [monthYear, setMonthYear] = useState(dayjs(value).format("YYYY-MM"));

  const daysArray = useMemo(() => {
    const startDate = `${monthYear}-01`;
    const firstDayIndex = dayjs(startDate).get("day");
    const endDayIndex = dayjs(startDate).endOf("month").get("day");
    const daysInMonth = dayjs(startDate).daysInMonth();
    return [
      ...[...Array(firstDayIndex)].map(() => null),
      ...[...Array(daysInMonth)].map((_, i) => i + 1),
      ...[...Array(endDayIndex + 7)].map(() => null),
    ];
  }, [monthYear]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginBottom: 16,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View>
          <MonthSelector
            value={monthYear}
            onSelect={setMonthYear}
            customButton={({ onOpen }) => (
              <TouchableOpacity onPress={onOpen}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Typography
                    style={{ color: theme.colors.white, fontSize: 20 }}
                    fontWeight="700"
                  >
                    {dayjs(`${monthYear}-01`).format("MMMM YYYY")}
                  </Typography>
                  <IonIcon
                    name="chevron-down"
                    size={18}
                    color={theme.colors.white}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View
          style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}
        >
          <Button isCompact>
            <IonIcon name="chevron-back" size={18} />
          </Button>
          <Button isCompact>
            <IonIcon name="chevron-forward" size={18} />
          </Button>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ flexDirection: "row" }}>
          {days.map((day) => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={day}
              >
                <Typography
                  style={{ color: opacityColor(theme.colors.white, 60) }}
                  fontWeight="600"
                >
                  {day}
                </Typography>
              </View>
            );
          })}
        </View>
        <View>
          <FlatList
            data={daysArray}
            numColumns={7}
            renderItem={({ item }) => {
              const date = dayjs(`${monthYear}-${item}`).format("YYYY-MM-DD");
              const isSelected = value === date;
              return (
                <TouchableOpacity
                  onPress={() => onChange(date)}
                  style={{
                    flex: 1,
                    height: item ? 38 : 0,
                    marginVertical: item ? 4 : 0,
                    marginHorizontal: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 8,
                    backgroundColor: isSelected
                      ? theme.colors.white
                      : "transparent",
                  }}
                >
                  <Typography
                    style={{
                      color: isSelected
                        ? theme.colors.primary
                        : theme.colors.white,
                    }}
                    fontWeight="500"
                  >
                    {item}
                  </Typography>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(_, index) => `${index}`}
          />
        </View>
      </View>
    </View>
  );
};

export default Calendar;
