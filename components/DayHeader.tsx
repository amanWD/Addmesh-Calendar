import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import useCalendarType from "../store/CalendarTypeStore";
import useThemeStore from "../store/ThemeStore";

const screenHeight = Dimensions.get("window").height;

const fontRation: number = screenHeight / 800;

export const DayHeader = () => {
  const { theme } = useThemeStore();

  const tabBarColor = theme === "light" ? "#ffffff" : "#090a0a";
  const Color = theme === "light" ? "#000000" : "#ffffff";

  const { calendarType } = useCalendarType();
  const { t } = useTranslation();

  const ethiopianDay = ["እ", "ሰ", "ማ", "ረ", "ሐ", "አ", "ቅ"];
  const gregorianDay = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <View style={{ backgroundColor: tabBarColor }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 5,
          opacity: 0.5,
          borderBottomWidth: 1,
          borderBottomColor: "white",
          display: calendarType === "Ethiopian" ? "flex" : "none",
          width: "100%",
        }}
      >
        {ethiopianDay.map((day, index) => {
          return (
            <View key={index} style={styles.day}>
              <Text style={{ ...styles.text, color: Color }}>{day}</Text>
            </View>
          );
        })}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 5,
          opacity: 0.5,
          borderBottomWidth: 1,
          borderBottomColor: "white",
          display: calendarType === "Gregorian" ? "flex" : "none",
          width: "100%",
        }}
      >
        {gregorianDay.map((day, index) => {
          return (
            <View key={index} style={styles.day}>
              <Text style={{ ...styles.text, color: Color }}>{day[0]}</Text>
            </View>
          );
        })}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 5,
          opacity: 0.5,
          borderBottomWidth: 1,
          borderBottomColor: "white",
          display: calendarType === "None" ? "flex" : "none",
          width: "100%",
        }}
      >
        {gregorianDay.map((day, index) => {
          return (
            <View key={index} style={styles.day}>
              <Text style={{ ...styles.text, color: Color }}>{t(day)[0]}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  day: {
    width: 50,
    alignItems: "center",
  },
  text: {
    fontSize: 10 * fontRation,
    fontWeight: 900,
  },
});
