import { StackActions } from "@react-navigation/native";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useThemeStore from "../store/ThemeStore";

const screenHeight = Dimensions.get("window").height;
const fontRatio: number = screenHeight / 800;

export const Language = ({ navigation }: { navigation: any }) => {
  const { theme } = useThemeStore();

  const BackgroundColor = theme === "light" ? "#ebebeb" : "#181a1a";
  const Color = theme === "light" ? "#000000" : "#ffffff";
  const ButtonColor = theme === "light" ? "#ffffff" : "#272727";

  const popAction = StackActions.pop(1);
  const { i18n } = useTranslation();

  const handlePress = async (language: "am" | "en") => {
    i18n.changeLanguage(language);
    navigation.dispatch(popAction);
    try {
      await AsyncStorage.setItem("Language", language);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={{ ...styles.container, backgroundColor: BackgroundColor }}>
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: ButtonColor }}
        onPress={() => {
          if (i18n.language !== "en") handlePress("en");
        }}
      >
        <Text style={{ ...styles.text, color: Color }}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: ButtonColor }}
        onPress={() => {
          if (i18n.language !== "am") handlePress("am");
        }}
      >
        <Text style={{ ...styles.text, color: Color }}>አማርኛ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    width: 300 * fontRatio,
    alignItems: "center",
  },
  text: {
    fontSize: 16 * fontRatio,
  },
});
