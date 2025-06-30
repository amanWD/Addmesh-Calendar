import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Switch, TouchableOpacity } from "react-native-gesture-handler";

import useThemeStore from "../store/ThemeStore";

const screenHeight = Dimensions.get("window").height;
const fontRatio: number = screenHeight / 800;

export const Settings = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();

  const { theme, toggleDarkMode } = useThemeStore();

  const BackgroundColor = theme === "light" ? "#ebebeb" : "#181a1a";
  const Color = theme === "light" ? "#000000" : "#ffffff";

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: BackgroundColor,
      }}
    >
      <View style={{ maxWidth: 1700, flex: 1 }}>
        <View style={styles.preference}>
          <Text style={{ ...styles.text, color: Color }}>{t("dark mode")}</Text>
          <Switch value={theme === "dark"} onChange={() => toggleDarkMode()} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Language")}>
          <View style={styles.preference}>
            <Text style={{ ...styles.text, color: Color }}>
              {t("language")}
            </Text>
            <FontAwesome size={13} name="chevron-right" color={Color} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 40,
    margin: 5,
  },
  text: {
    fontSize: 18 * fontRatio,
  },
});
