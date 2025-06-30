import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
  Image,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTranslation } from "react-i18next";
import { Entypo } from "@expo/vector-icons";

import useThemeStore from "../store/ThemeStore";
import { TouchableOpacity } from "react-native-gesture-handler";

const screenHeight = Dimensions.get("window").height;
const fontRatio: number = screenHeight / 800;

export const About = () => {
  const { theme } = useThemeStore();

  const BackgroundColor = theme === "light" ? "#ebebeb" : "#181a1a";
  const Color = theme === "light" ? "#000000" : "#ffffff";
  const ButtonColor = theme === "light" ? "#ffffff" : "#272727";

  const { t } = useTranslation();
  return (
    <View style={{ ...styles.container, backgroundColor: BackgroundColor }}>
      <TouchableOpacity
        onPress={() => Linking.openURL("mailto:addmeshms@gmail.com")}
      >
        <View
          style={{
            ...styles.button,
            backgroundColor: ButtonColor,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 150 * fontRatio,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Entypo name="mail" size={35} color={"#bf83fdfa"} />
            <Text style={{ color: Color, fontSize: 11 * fontRatio }}>
              Email
            </Text>
          </View>
          <View
            style={{
              width: 150 * fontRatio,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome size={13} name="chevron-right" color={Color} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Linking.openURL("https://addmeshbook.com/")}
      >
        <View
          style={{
            ...styles.button,
            backgroundColor: ButtonColor,
            justifyContent: "center",
            marginBottom: 25 * fontRatio,
          }}
        >
          <View
            style={{
              width: 150 * fontRatio,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/addmeshLogo.png")}
              style={{
                width: 45 * fontRatio,
                height: 35 * fontRatio,
                marginHorizontal: 20,
              }}
            />
            <Text style={{ color: Color, fontSize: 11 * fontRatio }}>
              Website
            </Text>
          </View>
          <View
            style={{
              width: 150 * fontRatio,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome size={13} name="chevron-right" color={Color} />
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          ...styles.button,
          backgroundColor: ButtonColor,
          height: 30 * fontRatio,
          marginVertical: 3 * fontRatio,
        }}
      >
        <Text style={{ fontSize: 13 * fontRatio, color: Color }}>
          {t("version")}{" "}
        </Text>
        <Text
          style={{ fontSize: 13 * fontRatio, color: Color, fontWeight: 700 }}
        >
          1.0.0
        </Text>
      </View>
      <View
        style={{
          ...styles.button,
          backgroundColor: ButtonColor,
          height: 30 * fontRatio,
          marginVertical: 3 * fontRatio,
        }}
      >
        <Text style={{ fontSize: 13 * fontRatio, color: Color }}>
          © 2024 Addmesh
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: 340 * fontRatio,
          height: 55 * fontRatio,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() =>
          Linking.openURL("https://addmeshbook/app/calendar_policy")
        }
      >
        <Text
          style={{
            color: Color,
            opacity: 0.5,
            fontSize: 13 * fontRatio,
            textDecorationLine: "underline",
          }}
        >
          Privacy Policy
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginVertical: 5 * fontRatio,
    borderRadius: 10,
    width: 340 * fontRatio,
    height: 55 * fontRatio,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontSize: 18 * fontRatio,
  },
});
