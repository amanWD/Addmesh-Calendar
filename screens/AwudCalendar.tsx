import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  VirtualizedList,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTranslation } from "react-i18next";

import { AwudWeek } from "../components/AwudWeek";
import { DayHeader } from "../components/DayHeader";

import useCalendarType from "../store/CalendarTypeStore";
import useThemeStore from "../store/ThemeStore";

import { getCurrentDay } from "../utilities/getFunctions/getCurrentDay";
import {
  awudMonthsAmharic,
  awudMonthsEnglish,
  ethiopianMonths,
  gregorianMonths,
  startingYear,
  yearLength,
} from "../utilities/Constats";
import { getCalendar } from "../utilities/getFunctions/getCalendar";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const fontRatio: number = screenHeight / 800;
const screenRatio: number = screenWidth / 350;
const diamondRatio: number = screenWidth / 430;

const currentDay = getCurrentDay();

const awudYear = parseInt(currentDay.awudDay.slice(-4));
const awudMonth = parseInt(currentDay.awudDay.slice(4, 5));
const awudDay = parseInt(currentDay.awudDay.slice(0, 2));

var calendar: any = getCalendar();

export const AwudCalendar = () => {
  const { theme } = useThemeStore();

  const BackgroundColor = theme === "light" ? "#ebebeb" : "#181a1a";
  const tabBarColor = theme === "light" ? "#ffffff" : "#090a0a";
  const Color = theme === "light" ? "#000000" : "#ffffff";
  const ButtonColor = theme === "light" ? "#ffffff" : "#272727";

  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<TextInput | null>(null);
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  const [monthAndYear, setMonthAndYear] = useState("");
  const [displayMonthAndYear, setDisplayMonthAndYear] = useState(true);

  const [yearIndex, setYearIndex] = useState(awudYear - startingYear);

  const [awudWeekIndex, setAwudWeekIndex] = useState(
    (awudMonth - 1) * 15 + Math.floor((awudDay - 1) / 7)
  );
  const [awudMonthIndex, setAwudMonthIndex] = useState(awudMonth - 1);
  const [awudYearIndex, setAwudYearIndex] = useState(awudYear - startingYear);

  const [awudMonthList1, setAwudMonthList1] = useState<any>([]);
  const [awudMonthList2, setAwudMonthList2] = useState<any>([]);
  const [awudMonthList3, setAwudMonthList3] = useState<any>([]);
  const [awudMonthList4, setAwudMonthList4] = useState<any>([]);
  const [awudMonthList5, setAwudMonthList5] = useState<any>([]);

  const loopedAwudWeek = [
    ...awudMonthList1,
    ...awudMonthList2,
    ...awudMonthList3,
    ...awudMonthList4,
    ...awudMonthList5,
  ];

  const virtualizedListRef = useRef<any>(null);

  const { calendarType, setCalendarType } = useCalendarType();

  const { t } = useTranslation();

  useEffect(() => {
    setAwudMonthList1([
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 0`]["0"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 0`]["1"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 0`]["2"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 0`]["3"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 0`]["4"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 0`]["5"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 0`]["6"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 0`]["7"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 0`]["8"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 0`]["9"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 0`]["10"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 0`]["11"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 0`]["12"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 0`]["13"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 0`]["14"] }} />,
    ]);
    setAwudMonthList2([
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 1`]["0"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 1`]["1"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 1`]["2"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 1`]["3"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 1`]["4"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 1`]["5"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 1`]["6"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 1`]["7"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 1`]["8"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 1`]["9"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 1`]["10"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 1`]["11"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 1`]["12"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 1`]["13"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 1`]["14"] }} />,
    ]);
    setAwudMonthList3([
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 2`]["0"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 2`]["1"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 2`]["2"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 2`]["3"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 2`]["4"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 2`]["5"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 2`]["6"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 2`]["7"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 2`]["8"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 2`]["9"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 2`]["10"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 2`]["11"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 2`]["12"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 2`]["13"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 2`]["14"] }} />,
    ]);
    setAwudMonthList4([
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 3`]["0"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 3`]["1"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 3`]["2"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 3`]["3"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 3`]["4"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 3`]["5"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 3`]["6"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 3`]["7"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 3`]["8"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 3`]["9"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 3`]["10"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 3`]["11"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 3`]["12"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 3`]["13"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex} - 3`]["14"] }} />,
    ]);
    setAwudMonthList5([
      <AwudWeek weekData={{ ...calendar[`${yearIndex + 1} - 0`]["0"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex + 1} - 0`]["1"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex + 1} - 0`]["2"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex + 1} - 0`]["3"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex + 1} - 0`]["4"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex + 1} - 0`]["5"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex + 1} - 0`]["6"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex + 1} - 0`]["7"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex + 1} - 0`]["8"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex + 1} - 0`]["9"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex + 1} - 0`]["10"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex + 1} - 0`]["11"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex + 1} - 0`]["12"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex + 1} - 0`]["13"] }} />,
      <AwudWeek weekData={{ ...calendar[`${yearIndex + 1} - 0`]["14"] }} />,
    ]);
  }, [yearIndex]);

  const searchYear = () => {
    if (searchQuery === "") {
      setDisplaySearchBar(false);
      setSearchQuery("");
      return;
    }

    try {
      const year = parseInt(searchQuery);
      if (isNaN(year)) {
        throw new Error("Input is not a number");
      }
      if (parseInt(searchQuery) - startingYear < 0) setYearIndex(0);
      else if (parseInt(searchQuery) - startingYear > yearLength)
        setYearIndex(yearLength);
      else setYearIndex(parseInt(searchQuery) - startingYear);

      const dayIndex = 0;
      const wait = new Promise((resolve) => setTimeout(resolve, 200));
      wait.then(() => {
        virtualizedListRef?.current?.scrollToIndex({
          index: dayIndex,
        });
      });
      setSearchQuery("");
      setDisplaySearchBar(false);
    } catch (err) {
      Alert.alert("Invalid Input", "Input is not number", [
        {
          text: "Ok",
          onPress: () => setSearchQuery(""),
        },
      ]);
    }
  };

  const scrollToCurrentDay = () => {
    setYearIndex(awudYear - startingYear);
    const currentDayIndex =
      (awudMonth - 1) * 15 + Math.floor((awudDay - 1) / 7);
    const wait = new Promise((resolve) => setTimeout(resolve, 200));
    wait.then(() => {
      virtualizedListRef?.current?.scrollToIndex({
        index: currentDayIndex - 1,
      });
    });
  };

  useEffect(() => {
    scrollToCurrentDay();
  }, []);

  const scroll = (direction: null | "up" | "down") => {
    if (virtualizedListRef.current && direction === "up") {
      if (yearIndex - 1 < 0) return;
      const wait = new Promise((resolve) => setTimeout(resolve, 300));
      wait.then(() => {
        setYearIndex(yearIndex - 1);
      });
      const bottomIndex = 60;
      virtualizedListRef?.current?.scrollToIndex({
        index: bottomIndex - 1,
        animated: false,
      });
    } else if (virtualizedListRef.current) {
      if (yearIndex === yearLength) return;
      const wait = new Promise((resolve) => setTimeout(resolve, 300));
      wait.then(() => {
        setYearIndex(yearIndex + 1);
      });
      const topIndex = 8;
      virtualizedListRef?.current?.scrollToIndex({
        index: topIndex - 1,
        animated: false,
      });
    }
  };

  const getItemCount = (_data: unknown) => {
    return loopedAwudWeek.length;
  };

  const getItem = (_data: unknown, index: number) => ({
    index: index,
    item: loopedAwudWeek[index],
  });

  return (
    <View
      style={{
        backgroundColor: BackgroundColor,
      }}
    >
      {!displaySearchBar ? <DayHeader /> : null}
      <View
        style={{
          display: displaySearchBar ? "flex" : "none",
          flexDirection: "row",
          backgroundColor: tabBarColor,
          width: "100%",
          height: 70 * fontRatio,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 25,
        }}
      >
        <TextInput
          ref={searchInputRef}
          style={{
            ...styles.input,
            backgroundColor: tabBarColor,
            color: Color,
            borderColor: Color,
          }}
          placeholder="Year"
          placeholderTextColor={"gray"}
          value={searchQuery}
          onChangeText={(text: string) => setSearchQuery(text)}
          inputMode="numeric"
          enterKeyHint="done"
          onSubmitEditing={searchYear}
          keyboardAppearance={theme}
        />
      </View>
      <View style={{ position: "relative" }}>
        <View
          style={{
            display:
              displayMonthAndYear && calendarType !== "None" ? "flex" : "none",
            shadowColor: BackgroundColor,
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 1,
            shadowRadius: 10,
            zIndex: 100,
            position: "absolute",
            justifyContent: "center",
            backgroundColor: BackgroundColor,
            height: 60 * fontRatio,
            width: "100%",
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18 * fontRatio,
                fontWeight: 700,
                color: Color,
                display: calendarType === "Gregorian" ? "flex" : "none",
              }}
            >
              {monthAndYear}
            </Text>
            <Text
              style={{
                fontSize: 18 * fontRatio,
                fontWeight: 700,
                color: Color,
                display: calendarType === "Ethiopian" ? "flex" : "none",
              }}
            >
              {monthAndYear}
            </Text>
          </View>
        </View>
        <View
          style={{
            zIndex: 100,
            position: "absolute",
            bottom: 80 * fontRatio,
            flexDirection: "row",
            right: 5,
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: ButtonColor,
              borderTopLeftRadius: 50 * fontRatio,
              borderBottomLeftRadius: 50 * fontRatio,
            }}
            onPress={() => {
              setDisplaySearchBar(true);
            }}
          >
            <AntDesign name="search1" size={14 * fontRatio} color={Color} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: ButtonColor,
              borderTopRightRadius: 50 * fontRatio,
              borderBottomRightRadius: 50 * fontRatio,
              width: 90 * fontRatio,
            }}
            onPress={scrollToCurrentDay}
          >
            <Text style={{ color: Color, fontSize: 14 * fontRatio }}>
              {calendarType === "Ethiopian"
                ? "የዛሬ ቀን"
                : calendarType === "Gregorian"
                ? "Today"
                : t("today")}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <VirtualizedList
            getItem={getItem}
            getItemCount={getItemCount}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ref={virtualizedListRef}
            decelerationRate={0.8}
            data={loopedAwudWeek}
            renderItem={({ item, index }: { item: any; index: number }) => {
              return (
                <View
                  style={{ paddingTop: index === 0 ? 115 * diamondRatio : 0 }}
                >
                  <View
                    style={{
                      position: "absolute",
                      right: 0,
                      top: index === 0 ? 5 * diamondRatio : -100 * diamondRatio,
                      height: 115 * diamondRatio,
                      display: index % 15 === 0 ? "flex" : "none",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 26 * fontRatio,
                        marginHorizontal: 10,
                        marginVertical: 15,
                        fontWeight: 800,
                        color: "gray",
                      }}
                    >
                      {yearIndex + Math.floor(index / 60) + startingYear < 2501
                        ? calendarType === "Gregorian"
                          ? awudMonthsEnglish[Math.floor((index / 15) % 4)]
                          : calendarType === "Ethiopian"
                          ? awudMonthsAmharic[Math.floor((index / 15) % 4)]
                          : t(awudMonthsAmharic[Math.floor((index / 15) % 4)])
                        : "END"}{" "}
                      {yearIndex + Math.floor(index / 60) + startingYear < 2501
                        ? yearIndex + Math.floor(index / 60) + startingYear
                        : ""}
                    </Text>
                  </View>
                  <View>{item.item}</View>
                </View>
              );
            }}
            onScroll={({ nativeEvent }) => {
              setDisplaySearchBar(false);
              Keyboard.dismiss();

              const { contentOffset, layoutMeasurement, contentSize } =
                nativeEvent;

              if (contentOffset.y > 100 * diamondRatio)
                setDisplayMonthAndYear(true);

              if (contentOffset.y === 0 && yearIndex === 0)
                setDisplayMonthAndYear(false);

              if (
                awudWeekIndex !==
                Math.floor(contentOffset.y / (115 * diamondRatio))
              ) {
                if (
                  Math.floor(contentOffset.y / (115 * diamondRatio)) % 15 >=
                  0
                )
                  setAwudWeekIndex(
                    Math.floor(contentOffset.y / (115 * diamondRatio)) % 15
                  );
                if ((contentOffset.y / (115 * diamondRatio * 15)) % 4 >= 0)
                  setAwudMonthIndex(
                    Math.floor(
                      (contentOffset.y / (115 * diamondRatio * 15)) % 4
                    )
                  );
                if (contentOffset.y <= 115 * 15 * diamondRatio * 4)
                  setAwudYearIndex(yearIndex);
                else setAwudYearIndex(yearIndex + 1);
              }

              if (
                calendarType === "Ethiopian" &&
                calendar[`${awudYearIndex} - ${awudMonthIndex}`][awudWeekIndex][
                  "3"
                ].awudDay !== "empty"
              ) {
                setMonthAndYear(
                  `${
                    ethiopianMonths[
                      parseInt(
                        calendar[`${awudYearIndex} - ${awudMonthIndex}`][
                          awudWeekIndex
                        ]["3"].ethiopianDay.slice(3, 5)
                      ) - 1
                    ]
                  }, ${calendar[`${awudYearIndex} - ${awudMonthIndex}`][
                    awudWeekIndex
                  ]["3"].ethiopianDay.slice(-4)}`
                );
              } else if (
                calendarType === "Gregorian" &&
                calendar[`${awudYearIndex} - ${awudMonthIndex}`][awudWeekIndex][
                  "3"
                ].awudDay !== "empty"
              ) {
                setMonthAndYear(
                  `${
                    gregorianMonths[
                      parseInt(
                        calendar[`${awudYearIndex} - ${awudMonthIndex}`][
                          awudWeekIndex
                        ]["3"].gregorianDay.slice(3, 5)
                      ) - 1
                    ]
                  }, ${calendar[`${awudYearIndex} - ${awudMonthIndex}`][
                    awudWeekIndex
                  ]["3"].gregorianDay.slice(-4)}`
                );
              }

              if (contentOffset.y <= 0) {
                scroll("up");
              } else if (
                Math.floor(contentOffset.y) >=
                Math.floor(contentSize.height - layoutMeasurement.height)
              ) {
                scroll("down");
              }
            }}
            onScrollToIndexFailed={(info) => {
              const wait = new Promise((resolve) => setTimeout(resolve, 300));
              wait.then(() => {
                virtualizedListRef.current?.scrollToIndex({
                  index: info.index,
                  animated: true,
                });
              });
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  yearInput: {
    marginHorizontal: 15,
    fontSize: 15 * screenRatio,
    borderRadius: 25 * screenRatio,
    paddingVertical: 10 * screenRatio,
    paddingHorizontal: 20 * screenRatio,
    borderWidth: 0.5,
    borderColor: "#808080ff",
  },
  button: {
    width: 90 * fontRatio,
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 0.5,
    paddingVertical: 7,
    margin: 0.4,
  },
  input: {
    height: 40 * fontRatio,
    width: 250 * fontRatio,
    margin: 12 * fontRatio,
    borderWidth: 0.3,
    borderRadius: 25,
    paddingHorizontal: 20 * fontRatio,
    fontSize: 16 * fontRatio,
  },
});
