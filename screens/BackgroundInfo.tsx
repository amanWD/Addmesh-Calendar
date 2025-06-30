import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import useThemeStore from "../store/ThemeStore";

const screenHeight = Dimensions.get("window").height;
const fontRatio: number = screenHeight / 800;

export const BackgroundInfo = () => {
  const { theme } = useThemeStore();

  const BackgroundColor = theme === "light" ? "#ebebeb" : "#181a1a";
  const Color = theme === "light" ? "#000000" : "#ffffff";

  const { t, i18n } = useTranslation();

  return (
    <ScrollView style={{ backgroundColor: BackgroundColor, padding: 10 }}>
      <View style={styles.container}>
        <Text style={{ ...styles.text, color: Color }}>{t("paragraph1")}</Text>
        <Text></Text>
        <Text style={{ ...styles.text, color: Color }}>{t("paragraph2")}</Text>
        <Text></Text>
        <Text style={{ ...styles.text, color: Color }}>{t("paragraph3")}</Text>
        <Text></Text>
        <Text style={{ ...styles.text, color: Color }}>{t("paragraph4")}</Text>
        <Text></Text>
        <Text style={{ ...styles.text, color: Color }}>{t("paragraph5")}</Text>
        <Text></Text>
        <Text style={{ ...styles.text, color: Color }}>{t("paragraph6")}</Text>
        <Text></Text>
        <Text style={{ ...styles.text, color: Color }}>{t("paragraph7")}</Text>
        <Text></Text>
        <Text
          style={{
            ...styles.text,
            color: Color,
            display: i18n.language === "en" ? "flex" : "none",
          }}
        >
          {t("paragraph8")}
        </Text>
        <Text
          style={{ display: i18n.language === "en" ? "flex" : "none" }}
        ></Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10 * fontRatio,
    paddingBottom: 0,
    marginHorizontal: 5 * fontRatio,
    marginVertical: 25 * fontRatio,
    borderWidth: 0.9,
    borderRadius: 15,
    borderColor: "gray",
  },
  text: {
    fontSize: 18 * fontRatio,
    lineHeight: 28 * fontRatio,
  },
});
