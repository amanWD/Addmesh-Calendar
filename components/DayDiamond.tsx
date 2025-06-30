import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { useEffect, useState, useTransition } from "react";
import useCalendarType from "../store/CalendarTypeStore";
import { getCurrentDay } from "../utilities/getFunctions/getCurrentDay";
import { useNavigation } from "@react-navigation/native";
import useEventStore from "../store/EventStore";
import { darkColors, dayAmharic, dayEnglish } from "../utilities/Constats";
import { colors } from "../utilities/Constats";
import { useTranslation } from "react-i18next";

const screenWidth = Dimensions.get("window").width;

const fontRatio: number = screenWidth / 350;

const diamondRatio: number = screenWidth / 430;

const currentDay = getCurrentDay();

export const DayDiamond = ({
  day,
}: {
  day: {
    awudDay: string;
    ethiopianDay: string;
    gregorianDay: string;
    dayIndex: string;
  };
}) => {
  const isCurrentDay = day.ethiopianDay === currentDay.ethiopianDay;
  const navigation: any = useNavigation();
  const { calendarType } = useCalendarType();

  const { t } = useTranslation();

  const { eventStore } = useEventStore();
  const eventID = `${day.ethiopianDay} - ${day.gregorianDay}`;

  const sendNotification = () => {
    if (isCurrentDay && eventStore[eventID]?.length > 0) {
    }
  };

  useEffect(() => {
    sendNotification();
  }, []);

  var backgroundColor =
    day.awudDay !== "empty"
      ? day.awudDay.slice(0, 2) === "91"
        ? darkColors[parseInt(day.awudDay.slice(4, 5)) - 1]
        : day.awudDay.includes("ሰ")
        ? "purple"
        : colors[parseInt(day.awudDay.slice(4, 5)) - 1]
      : "transparent";

  return (
    <TouchableOpacity
      style={{
        height: 115 * diamondRatio,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => {
        if (day.awudDay !== "empty") {
          navigation.navigate("EventModal", {
            awudDate: day.awudDay,
            ethiopianDate: day.ethiopianDay,
            gregorianDate: day.gregorianDay,
            dayIndex: day.dayIndex,
          });
        }
      }}
    >
      <View>
        <View
          style={{
            ...styles.diamondNarrowTop,
            borderBottomColor: backgroundColor,
          }}
        ></View>
        <View
          style={{
            ...styles.diamondNarrowBottom,
            borderTopColor: backgroundColor,
          }}
        ></View>
      </View>

      <View
        style={{
          ...styles.currentDay,
          backgroundColor: isCurrentDay ? "white" : backgroundColor,
          opacity: isCurrentDay ? 0.75 : day.awudDay === "empty" ? 0 : 1,
        }}
      >
        <View
          style={{
            ...styles.dot,
            display: eventStore[eventID]?.length > 0 ? "flex" : "none",
          }}
        ></View>
        <Text
          style={{
            fontSize: 8 * fontRatio,
            fontWeight: 700,
            textAlign: "center",
            color: isCurrentDay ? "black" : "white",
            display:
              day.awudDay.includes("ሰንበት") ||
              day.awudDay.includes("ሰንበተ\nሰንበታት") ||
              day.awudDay.includes("Senbet") ||
              day.awudDay.includes("Senbete\nSenbetat")
                ? "flex"
                : "none",
          }}
        >
          {calendarType === "Ethiopian"
            ? day.awudDay.includes("ሰንበት")
              ? "ሰንበት"
              : "ሰንበተ\nሰንበታት"
            : calendarType === "Gregorian"
            ? day.awudDay.includes("ሰንበት")
              ? "Senbet"
              : "Senbete\nSenbetat"
            : day.awudDay.includes("ሰንበት")
            ? t("ሰንበት")
            : t("ሰንበተ\nሰንበታት")}
        </Text>
        <Text
          style={{
            fontSize: 20 * fontRatio,
            fontWeight: 700,
            textAlign: "center",
            color: isCurrentDay ? "black" : "white",
            display:
              day.awudDay.includes("ሰንበት") ||
              day.awudDay.includes("ሰንበተ\nሰንበታት") ||
              day.awudDay.includes("Senbet") ||
              day.awudDay.includes("Senbete\nSenbetat")
                ? "none"
                : "flex",
          }}
        >
          {day.awudDay.slice(0, 2)}
        </Text>
        <Text
          style={{
            fontSize: 10 * fontRatio,
            padding: 2,
            fontWeight: 700,
            display: calendarType === "Ethiopian" ? "flex" : "none",
            color: isCurrentDay ? "black" : "white",
          }}
        >
          {day.ethiopianDay.slice(0, 2)}
        </Text>
        <Text
          style={{
            fontSize: 10 * fontRatio,
            padding: 2,
            fontWeight: 700,
            display: calendarType === "Gregorian" ? "flex" : "none",
            color: isCurrentDay ? "black" : "white",
          }}
        >
          {day.gregorianDay.slice(0, 2)}
        </Text>
        <View
          style={{
            position: "absolute",
            bottom: -9 * fontRatio,
            display: calendarType !== "None" ? "flex" : "none",
          }}
        >
          <Text style={{ fontSize: 8 * fontRatio, color: "white" }}>
            {calendarType === "Ethiopian"
              ? dayAmharic[parseInt(day.dayIndex.slice(0, 1))][0]
              : dayEnglish[parseInt(day.dayIndex.slice(0, 1))][0]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  day: {
    justifyContent: "center",
    alignItems: "center",
  },
  currentDay: {
    position: "absolute",
    width: 40 * fontRatio,
    height: 40 * fontRatio,
    borderRadius: 20 * fontRatio,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    position: "absolute",
    top: -8 * diamondRatio,
    width: 8.4 * fontRatio,
    height: 8.4 * fontRatio,
    borderRadius: 4.2 * fontRatio,
    alignSelf: "center",
    backgroundColor: "black",
    opacity: 0.5,
  },
  text: {
    textAlign: "center",
    fontSize: 9 * fontRatio,
    color: "white",
  },
  diamondNarrowTop: {
    width: 0,
    height: 0,
    borderTopWidth: 30 * diamondRatio,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderLeftWidth: 30 * diamondRatio,
    borderRightColor: "transparent",
    borderRightWidth: 30 * diamondRatio,
    borderBottomWidth: 45 * diamondRatio,
  },
  diamondNarrowBottom: {
    width: 0,
    height: 0,
    borderTopWidth: 45 * diamondRatio,
    borderLeftColor: "transparent",
    borderLeftWidth: 30 * diamondRatio,
    borderRightColor: "transparent",
    borderRightWidth: 30 * diamondRatio,
    borderBottomColor: "transparent",
    borderBottomWidth: 30 * diamondRatio,
  },
});
