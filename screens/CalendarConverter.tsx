import { useState } from "react";
import { useTranslation } from "react-i18next";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { getFormattedDay } from "../utilities/getFunctions/getFormattedDay";
import { Search } from "../utilities/search";
import {
  getEthiopianNumberOfDays,
  getGregorianNumberOfDays,
} from "../utilities/getFunctions/getNumberOfDays";
import { ethiopianMonths, gregorianMonths } from "../utilities/Constats";
import {
  getTotalEthiopianCalendarYear,
  getTotalGregorianCalendarYear,
} from "../utilities/getFunctions/getTotalNumberOfYear";
import {
  getEthiopianMonth,
  getGregorianMonth,
} from "../utilities/getFunctions/getMonth";

var ethiopianDate = require("ethiopian-date");

import useThemeStore from "../store/ThemeStore";
import { getFormattedAwudDate } from "../utilities/getFunctions/getFormattedAwudDate";
import { getUnformattedDay } from "../utilities/getFunctions/getUnformattedDay";

const screenHeight = Dimensions.get("window").height;
const fontRatio: number = screenHeight / 800;

export const CalnedarConverter = () => {
  const { theme } = useThemeStore();

  const BackgroundColor = theme === "light" ? "#ebebeb" : "#181a1a";
  const Color = theme === "light" ? "#000000" : "#ffffff";
  const activeIconColor = "#9955ffff";

  const { t } = useTranslation();

  const [ethiopianCalendar, setEthiopianCalendar] = useState({
    day: "day",
    month: "month",
    year: "year",
  });

  const [gregorianCalendar, setGregorianCalendar] = useState({
    day: "day",
    month: "month",
    year: "year",
  });

  const [convertedEDay, setConvertedEDay] = useState("");
  const [convertedGDay, setConvertedGDay] = useState("");

  const replaceAwudMonths = (awudDay: string) => {
    awudDay = getFormattedAwudDate(awudDay);
    const { month } = getUnformattedDay({ formattedDay: awudDay });
    awudDay = awudDay.replace(month, t(month));

    if (awudDay.includes("ሰንበት")) {
      awudDay = awudDay.replace("ሰንበት", t("ሰንበት"));
    } else if (awudDay.includes("ሰንበተ\nሰንበታት")) {
      console.log(awudDay);
      awudDay = awudDay.replace("ሰንበተ\nሰንበታት", t("ሰንበተ\nሰንበታት"));
      awudDay = awudDay.replace("\n", " ");
    }

    return awudDay;
  };

  const handleConvert = (isEthiopianToAwd: boolean) => {
    if (
      isEthiopianToAwd &&
      ethiopianCalendar.day !== "day" &&
      ethiopianCalendar.month !== "month" &&
      ethiopianCalendar.year !== "year"
    ) {
      const convertedDay = Search(
        getFormattedDay({
          day: ethiopianCalendar.day,
          month: ethiopianCalendar.month,
          year: ethiopianCalendar.year,
        })
      );
      setConvertedEDay(convertedDay);
    } else if (
      !isEthiopianToAwd &&
      gregorianCalendar.day !== "day" &&
      gregorianCalendar.month !== "month" &&
      gregorianCalendar.year !== "year"
    ) {
      const [year, month, day] = ethiopianDate.toEthiopian(
        parseInt(gregorianCalendar.year),
        parseInt(gregorianCalendar.month),
        parseInt(gregorianCalendar.day)
      );

      const convertedDay = Search(
        getFormattedDay({
          day: day,
          month: month,
          year: year,
        })
      );
      setConvertedGDay(convertedDay);
    }
  };

  return (
    <View style={{ ...styles.container, backgroundColor: BackgroundColor }}>
      <View style={styles.converterContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...styles.text, color: Color }}>
            {t("EthiopianToAwud")}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <SelectDropdown
            disableAutoScroll
            search
            searchInputStyle={{
              backgroundColor: "#b5b5b3",
            }}
            searchPlaceHolder={t("type") + "..."}
            searchPlaceHolderColor="#636363"
            searchInputTxtStyle={{ ...styles.text }}
            dropdownStyle={{ height: 235 }}
            onSelect={(selectedItem, index) => {
              setEthiopianCalendar({
                ...ethiopianCalendar,
                day: selectedItem.value,
              });
            }}
            data={getEthiopianNumberOfDays(
              ethiopianMonths[parseInt(ethiopianCalendar.month) - 1]
            )}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View
                  style={{
                    ...styles.dropDown,
                    width: 95,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14 * fontRatio,
                      margin: 5,
                      color: Color,
                    }}
                  >
                    {t(ethiopianCalendar.day)}
                  </Text>
                  <FontAwesome name="chevron-down" color={Color} />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10,
                  }}
                >
                  <Text style={{ ...styles.text }}>{item.title}</Text>
                </View>
              );
            }}
          />
          <SelectDropdown
            disableAutoScroll
            search
            searchInputStyle={{ backgroundColor: "#b5b5b3" }}
            searchPlaceHolder={t("type") + "..."}
            searchPlaceHolderColor="#636363"
            searchInputTxtStyle={{ ...styles.text }}
            dropdownStyle={{ height: 235 }}
            onSelect={(selectedItem, index) => {
              setEthiopianCalendar({
                ...ethiopianCalendar,
                month: selectedItem.value,
              });
            }}
            data={getEthiopianMonth()}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={{ ...styles.dropDown, width: 132 }}>
                  <Text
                    style={{
                      fontSize: 14 * fontRatio,
                      marginHorizontal: 20,
                      marginVertical: 5,
                      color: Color,
                    }}
                  >
                    {t(ethiopianCalendar.month)}
                  </Text>
                  <FontAwesome name="chevron-down" color={Color} />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10,
                  }}
                >
                  <Text style={{ ...styles.text }}>{item.title}</Text>
                </View>
              );
            }}
          />
          <SelectDropdown
            disableAutoScroll
            search
            searchInputStyle={{ backgroundColor: "#b5b5b3" }}
            searchPlaceHolder={t("type") + "..."}
            searchPlaceHolderColor="#636363"
            searchInputTxtStyle={{ ...styles.text }}
            dropdownStyle={{ height: 235 }}
            onSelect={(selectedItem, index) => {
              setEthiopianCalendar({
                ...ethiopianCalendar,
                year: selectedItem.value,
              });
            }}
            data={getTotalEthiopianCalendarYear()}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={{ ...styles.dropDown, width: 95 }}>
                  <Text
                    style={{
                      fontSize: 14 * fontRatio,
                      margin: 5,
                      color: Color,
                    }}
                  >
                    {t(ethiopianCalendar.year)}
                  </Text>
                  <FontAwesome name="chevron-down" color={Color} />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10,
                  }}
                >
                  <Text style={{ ...styles.text }}>{item.title}</Text>
                </View>
              );
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ ...styles.text, color: Color, margin: 20 }}>
            {t("awud day")}:{" "}
            {convertedEDay ? replaceAwudMonths(convertedEDay) : null}
          </Text>
          <TouchableOpacity
            onPress={() => handleConvert(true)}
            style={{ alignItems: "center" }}
          >
            <Text style={{ ...styles.text, color: activeIconColor }}>
              {t("convert")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.converterContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...styles.text, color: Color }}>
            {t("GregorianToAwud")}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <SelectDropdown
            disableAutoScroll
            search
            searchInputStyle={{ backgroundColor: "#b5b5b3" }}
            searchPlaceHolder={t("type") + "..."}
            searchPlaceHolderColor="#636363"
            searchInputTxtStyle={{ ...styles.text }}
            dropdownStyle={{ height: 235 }}
            onSelect={(selectedItem, index) => {
              setGregorianCalendar({
                ...gregorianCalendar,
                day: selectedItem.value,
              });
            }}
            data={getGregorianNumberOfDays(
              gregorianMonths[parseInt(gregorianCalendar.month) - 1]
            )}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={{ ...styles.dropDown, width: 95 }}>
                  <Text
                    style={{
                      fontSize: 14 * fontRatio,
                      margin: 5,
                      color: Color,
                    }}
                  >
                    {t(gregorianCalendar.day)}
                  </Text>
                  <FontAwesome name="chevron-down" color={Color} />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10,
                  }}
                >
                  <Text style={{ ...styles.text }}>{item.title}</Text>
                </View>
              );
            }}
          />
          <SelectDropdown
            disableAutoScroll
            search
            searchInputStyle={{ backgroundColor: "#b5b5b3" }}
            searchPlaceHolder={t("type") + "..."}
            searchPlaceHolderColor="#636363"
            searchInputTxtStyle={{ ...styles.text }}
            dropdownStyle={{ height: 235 }}
            onSelect={(selectedItem, index) => {
              setGregorianCalendar({
                ...gregorianCalendar,
                month: selectedItem.value,
              });
            }}
            data={getGregorianMonth()}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={{ ...styles.dropDown, width: 132 }}>
                  <Text
                    style={{
                      fontSize: 14 * fontRatio,
                      marginHorizontal: 20,
                      marginVertical: 5,
                      color: Color,
                    }}
                  >
                    {t(gregorianCalendar.month)}
                  </Text>
                  <FontAwesome name="chevron-down" color={Color} />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10,
                  }}
                >
                  <Text style={{ ...styles.text }}>{item.title}</Text>
                </View>
              );
            }}
          />
          <SelectDropdown
            disableAutoScroll
            search
            searchInputStyle={{ backgroundColor: "#b5b5b3" }}
            searchPlaceHolder={t("type") + "..."}
            searchPlaceHolderColor="#636363"
            searchInputTxtStyle={{ ...styles.text }}
            dropdownStyle={{ height: 235 }}
            onSelect={(selectedItem, index) => {
              setGregorianCalendar({
                ...gregorianCalendar,
                year: selectedItem.value,
              });
            }}
            data={getTotalGregorianCalendarYear()}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={{ ...styles.dropDown, width: 95 }}>
                  <Text
                    style={{
                      fontSize: 14 * fontRatio,
                      margin: 5,
                      color: Color,
                    }}
                  >
                    {t(gregorianCalendar.year)}
                  </Text>
                  <FontAwesome name="chevron-down" color={Color} />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10,
                  }}
                >
                  <Text style={{ ...styles.text }}>{item.title}</Text>
                </View>
              );
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ ...styles.text, color: Color, margin: 20 }}>
            {t("awud day")}:{" "}
            {convertedGDay ? replaceAwudMonths(convertedGDay) : null}
          </Text>
          <TouchableOpacity
            onPress={() => handleConvert(false)}
            style={{ alignItems: "center" }}
          >
            <Text style={{ ...styles.text, color: activeIconColor }}>
              {t("convert")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  converterContainer: {
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 20,
    margin: 25,
    borderColor: "gray",
  },
  input: {
    width: 80,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#80808033",
  },
  dropDown: {
    backgroundColor: "#80808033",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 25,
    padding: 15,
    borderRadius: 20,
  },
  text: {
    fontSize: 16 * fontRatio,
  },
});
