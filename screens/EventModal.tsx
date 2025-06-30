import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Event } from "../components/Event";
import { useTranslation } from "react-i18next";
import { dayAmharic, dayEnglish } from "../utilities/Constats";
import useCalendarType from "../store/CalendarTypeStore";
import { FontAwesome6 } from "@expo/vector-icons";
import useThemeStore from "../store/ThemeStore";
import useEventStore from "../store/EventStore";
import { getFormattedAwudDate } from "../utilities/getFunctions/getFormattedAwudDate";
import { getUnformattedDay } from "../utilities/getFunctions/getUnformattedDay";

const screenWidth = Dimensions.get("window").width;

const screenRatio: number = screenWidth / 450;

export const EventModal = ({ route }: { route: any }) => {
  const { awudDate, ethiopianDate, gregorianDate, dayIndex } = route.params;

  const { theme } = useThemeStore();

  const BackgroundColor = theme === "light" ? "#ebebeb" : "#181a1a";
  const Color = theme === "light" ? "#000000" : "#ffffff";
  const ButtonColor = theme === "light" ? "#ffffff" : "#272727";
  const activeIconColor = "#9955ffff";
  const placeholderTextColor = theme === "light" ? "#00000055" : "#ffffff55";

  const { t } = useTranslation();
  const { calendarType } = useCalendarType();

  const inputRef = useRef<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState<string>("");

  const [eventList, setEventList] = useState<string[]>([]);
  const eventID = `${ethiopianDate} - ${gregorianDate}`;
  const { eventStore, addEvent, removeEvent } = useEventStore();

  useEffect(() => {
    if (eventStore[eventID]) setEventList([...eventStore[eventID]]);
  }, [eventStore]);

  const replaceAwudMonths = (awudDay: string, day?: "ሰንበት" | "ሰንበተ ሰንበታት") => {
    awudDay = getFormattedAwudDate(awudDay);
    const { month } = getUnformattedDay({ formattedDay: awudDay });
    awudDay = awudDay.replace(month, t(month));

    if (day === "ሰንበት") {
      awudDay = awudDay.replace("ሰንበት", t("ሰንበት"));
    } else {
      console.log(awudDay);
      awudDay = awudDay.replace("ሰንበተ\nሰንበታት", t("ሰንበተ\nሰንበታት"));
      awudDay = awudDay.replace("\n", " ");
    }

    return awudDay;
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: BackgroundColor,
        }}
      >
        <Text style={{ ...styles.text, color: Color }}>{t("waiting")}...</Text>
      </View>
    );
  }

  const handleAdd = () => {
    if (input === "") return;
    setEventList((prev) => [...prev, input]);
    addEvent(eventID, [...eventList, input]);
    inputRef.current.clear();
    setInput("");
  };
  const handleEdit = (event: string) => {
    setInput(() => event);
    inputRef.current.focus();
    handleRemove(event);
  };
  const handleRemove = (event: string) => {
    setEventList((prev) => prev.filter((eventName) => eventName !== event));
    removeEvent(eventID, event);
  };

  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: BackgroundColor }}
    >
      <View style={styles.days}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              marginVertical: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ ...styles.text, color: Color, marginVertical: 5 }}>
              {t("awud day")}
            </Text>
            <Text style={{ ...styles.text, color: Color, marginVertical: 5 }}>
              {calendarType === "Ethiopian"
                ? getFormattedAwudDate(awudDate.replace("\n", " "), "Ethiopian")
                : calendarType === "Gregorian"
                ? awudDate.includes("ሰንበት")
                  ? getFormattedAwudDate(
                      awudDate.replace("ሰንበት", "Senbet"),
                      "Gregorian"
                    )
                  : getFormattedAwudDate(
                      awudDate.replace("ሰንበተ\nሰንበታት", "Senbete Senbetat"),
                      "Gregorian"
                    )
                : !awudDate.includes("ሰንበት")
                ? replaceAwudMonths(awudDate)
                : awudDate.includes("ሰንበት")
                ? replaceAwudMonths(awudDate, "ሰንበት")
                : replaceAwudMonths(awudDate, "ሰንበተ ሰንበታት")}
            </Text>
            <View
              style={{
                backgroundColor: Color,
                minWidth: 80,
                padding: 5 * screenRatio,
                margin: 5 * screenRatio,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ ...styles.text, color: ButtonColor }}>
                {calendarType === "Ethiopian"
                  ? dayAmharic[parseInt(dayIndex.slice(4, 5))]
                  : calendarType === "Gregorian"
                  ? dayEnglish[parseInt(dayIndex.slice(4, 5))]
                  : t(dayEnglish[parseInt(dayIndex.slice(4, 5))])}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              marginVertical: 10,
              justifyContent: "center",
              alignItems: "center",
              display: calendarType === "None" ? "none" : "flex",
            }}
          >
            <Text style={{ ...styles.text, color: Color, marginVertical: 5 }}>
              {calendarType === "Ethiopian"
                ? t("ethiopian day")
                : t("gregorian day")}
            </Text>
            <Text style={{ ...styles.text, color: Color, marginVertical: 5 }}>
              {calendarType === "Ethiopian" ? ethiopianDate : gregorianDate}
            </Text>
            <View
              style={{
                backgroundColor: Color,
                minWidth: 80,
                padding: 5 * screenRatio,
                margin: 5 * screenRatio,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ ...styles.text, color: ButtonColor }}>
                {calendarType === "Ethiopian"
                  ? dayAmharic[parseInt(dayIndex.slice(0, 1))]
                  : dayEnglish[parseInt(dayIndex.slice(0, 1))]}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: 100,
          marginVertical: 30,
        }}
      >
        <TextInput
          ref={inputRef}
          style={{ ...styles.eventInput, color: Color }}
          placeholder={t("add") + " " + t("event")}
          placeholderTextColor={placeholderTextColor}
          value={input}
          onChangeText={(text: any) => {
            setInput(text);
          }}
          onSubmitEditing={handleAdd}
        />
        <TouchableOpacity onPress={handleAdd} style={{ padding: 10 }}>
          <FontAwesome6
            name="plus"
            size={22 * screenRatio}
            color={activeIconColor}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 40,
        }}
      >
        <View style={{ display: eventList.length > 0 ? "flex" : "none" }}>
          <Text style={{ fontSize: 20 * screenRatio, color: Color }}>
            {t("events")}
          </Text>
        </View>
        <ScrollView>
          {eventList?.map((event: string, index: number) => {
            return (
              <View key={index}>
                <Event
                  event={event}
                  handleRemove={() => handleRemove(event)}
                  handleEdit={() => handleEdit(event)}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  days: {
    alignItems: "center",
    marginVertical: 20,
  },
  text: {
    fontSize: 16 * screenRatio,
  },
  eventInput: {
    fontSize: 16 * screenRatio,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 300,
    marginHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 25,
    borderColor: "#808080ff",
  },
});
