import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { useTranslation } from "react-i18next";
import useCalendarType from "../store/CalendarTypeStore";
import { useState } from "react";
import useThemeStore from "../store/ThemeStore";

const screenHeight = Dimensions.get("window").height;

const screenSize: number = screenHeight / 800;

export const SwitchCalnedarType = () => {
  const { theme } = useThemeStore();

  const Color = theme === "light" ? "#000000" : "#ffffff";
  const ButtonColor = theme === "light" ? "#ffffff" : "#272727";

  const { t } = useTranslation();
  const { calendarType, setCalendarType } = useCalendarType();

  const [pressed, setPressed] = useState({
    leftButton: calendarType === "Ethiopian",
    rightButton: calendarType === "Gregorian",
  });

  return (
    <View style={{ ...styles.container }}>
      <TouchableOpacity
        onPress={() => {
          if (pressed.leftButton) {
            setPressed({
              leftButton: false,
              rightButton: false,
            });
            setCalendarType("None");
          } else {
            setPressed({
              leftButton: true,
              rightButton: false,
            });
            setCalendarType("Ethiopian");
          }
        }}
      >
        <View
          style={{
            ...styles.buttonLeft,
            backgroundColor: calendarType === "Ethiopian" ? Color : ButtonColor,
          }}
        >
          <Text
            style={{
              ...styles.text,
              color: calendarType === "Ethiopian" ? ButtonColor : Color,
            }}
          >
            {t("ethio C.")}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (pressed.rightButton) {
            setCalendarType("None");
            setPressed({
              leftButton: false,
              rightButton: false,
            });
          } else {
            setCalendarType("Gregorian");
            setPressed({
              leftButton: false,
              rightButton: true,
            });
          }
        }}
      >
        <View
          style={{
            ...styles.buttonRight,
            backgroundColor: calendarType === "Gregorian" ? Color : ButtonColor,
          }}
        >
          <Text
            style={{
              ...styles.text,
              color: calendarType === "Gregorian" ? ButtonColor : Color,
            }}
          >
            {t("grego C.")}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12 * screenSize,
  },
  buttonLeft: {
    marginLeft: 2 * screenSize,
    padding: 4 * screenSize,
    borderWidth: 0.5,
    borderColor: "gray",
    borderTopLeftRadius: 10 * screenSize,
    borderBottomLeftRadius: 10 * screenSize,
  },
  buttonRight: {
    marginRight: 2 * screenSize,
    padding: 4 * screenSize,
    borderWidth: 0.5,
    borderColor: "gray",
    borderTopRightRadius: 10 * screenSize,
    borderBottomRightRadius: 10 * screenSize,
  },
  text: {
    fontSize: 10 * screenSize,
  },
});
