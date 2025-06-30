import { View, Text, StyleSheet, Dimensions } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";

import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import useThemeStore from "../store/ThemeStore";

const screenHeight = Dimensions.get("window").height;

const fontRatio: number = screenHeight / 800;

export const Help = () => {
  const { theme } = useThemeStore();

  const BackgroundColor = theme === "light" ? "#ebebeb" : "#181a1a";
  const Color = theme === "light" ? "#000000" : "#ffffff";

  const { t } = useTranslation();

  return (
    <ScrollView
      style={{ backgroundColor: BackgroundColor }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={{ ...styles.title, color: Color }}>{t("home")}</Text>
          <Text style={{ ...styles.text, color: Color }}>
            {t("To enter home page")}
          </Text>
          <View>
            <Text style={{ ...styles.subTitle, color: Color }}>
              {t("Change calendar")}
            </Text>
            <Text style={{ ...styles.text, color: Color }}>
              {t("On top right corner select")}
            </Text>
          </View>
          <View>
            <Text style={{ ...styles.subTitle, color: Color }}>
              {t("To Set Calendar To Today's Date")}
            </Text>
            <Text style={{ ...styles.text, color: Color }}>
              {t("On the right bottom of the screen")}
            </Text>
          </View>
          <View>
            <Text style={{ ...styles.subTitle, color: Color }}>
              {t("search year")}
            </Text>
            <Text style={{ ...styles.text, color: Color }}>
              {t("search on the right bottom of the screen1")}
              <AntDesign name="search1" size={16 * fontRatio} color={Color} />
              {t("search on the right bottom of the screen2")}
            </Text>
          </View>
          <View>
            <Text style={{ ...styles.subTitle, color: Color }}>
              {t("Add Event")}
            </Text>
            <Text style={{ ...styles.text, color: Color }}>
              {t("Select the date that you want")}
            </Text>
            <Text style={{ ...styles.text, color: Color }}>
              {t("Check if the date you selected")}
            </Text>
            <Text style={{ ...styles.text, color: Color }}>
              {t("At last select Add button")}
            </Text>
          </View>
          <View>
            <Text style={{ ...styles.subTitle, color: Color }}>
              {t("Remove Event")}
            </Text>
            <Text style={{ ...styles.text, color: Color }}>
              {t("Select the date that you want")}
            </Text>
            {/* */}
            <Text style={{ ...styles.text, color: Color }}>
              2. {t("clickPre")} <FontAwesome name="ellipsis-h" size={17} />{" "}
              {t("click")}
            </Text>
            <Text style={{ ...styles.text, color: Color }}>
              {t("To remove the event")}
              <FontAwesome name="trash" size={17} />
              {t("press delete")}
            </Text>
          </View>
          <View>
            <Text style={{ ...styles.subTitle, color: Color }}>
              {t("Edit Event")}
            </Text>

            <Text style={{ ...styles.text, color: Color }}>
              {t("Select the date that you want")}
            </Text>
            {/* */}
            <Text style={{ ...styles.text, color: Color }}>
              2. {t("clickPre")} <FontAwesome name="ellipsis-h" size={17} />{" "}
              {t("click")}
            </Text>
            <Text style={{ ...styles.text, color: Color }}>
              {t("To edit the event")}
              <FontAwesome name="pencil-square-o" size={17} />
              {t("press edit")}
            </Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <Text style={{ ...styles.title, color: Color }}>
            {t("calendarConverter")}
          </Text>
          <Text style={{ ...styles.text, color: Color }}>
            {t("To enter Calender Converter page select")}
          </Text>
          <View>
            <Text style={{ ...styles.subTitle, color: Color }}>
              {t("To Convert Date")}
            </Text>
            <Text style={{ ...styles.text, color: Color }}>
              {t("To convert form Ethiopia calendar to Awud calendar")}
            </Text>
            <Text style={{ ...styles.text, color: Color }}>
              {t("To convert form Gregorian calendar to Awud calendar")}
            </Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <Text style={{ ...styles.title, color: Color }}>{t("about")}</Text>
          <Text style={{ ...styles.text, color: Color }}>
            {t("To enter About page select")}
          </Text>
          <View>
            <Text style={{ ...styles.subTitle, color: Color }}>
              {t("To Send Message")}
            </Text>
            <Text style={{ ...styles.text, color: Color }}>
              {t("Click on the button with Mail")}
            </Text>
          </View>
          <View>
            <Text style={{ ...styles.subTitle, color: Color }}>
              {t("Visit Website")}
            </Text>
            <Text style={{ ...styles.text, color: Color }}>
              {t("Click on the button with Addmesh")}
            </Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <Text style={{ ...styles.title, color: Color }}>{t("setting")}</Text>
          <Text style={{ ...styles.text, color: Color }}>
            {t("To enter Settings page select")}
          </Text>
          <View>
            <Text style={{ ...styles.subTitle, color: Color }}>
              {t("To Change Dark Mode And Light Mode")}
            </Text>
            <Text style={{ ...styles.text, color: Color }}>
              {t("Select Dark Mode toggle")}
            </Text>
          </View>
          <View>
            <Text style={{ ...styles.subTitle, color: Color }}>
              {t("To Change Language")}
            </Text>
            <Text style={{ ...styles.text, color: Color }}>
              {t("Select Language")}
            </Text>
            <Text style={{ ...styles.text, color: Color }}>
              {t("Select the language you want")}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10 * fontRatio,
  },
  subContainer: {
    width: "100%",
    borderWidth: 0.9,
    borderRadius: 15,
    borderColor: "gray",
    padding: 15,
    marginVertical: 20,
  },
  title: {
    fontSize: 22 * fontRatio,
    fontWeight: "800",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  subTitle: {
    fontSize: 18 * fontRatio,
    fontWeight: "700",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  text: {
    fontSize: 17 * fontRatio,
    padding: 5,
  },
});
