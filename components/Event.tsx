import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import useThemeStore from "../store/ThemeStore";
import { defaultEventCode } from "../utilities/Constats";
import { useTranslation } from "react-i18next";

const screenWidth = Dimensions.get("window").width;

const screenHeight = Dimensions.get("window").height;
const fontRatio: number = screenHeight / 800;

const screenRatio: number = screenWidth / 450;

type EventProps = {
  event: string;
  handleRemove: () => void;
  handleEdit: () => void;
};

export const Event = ({ event, handleEdit, handleRemove }: EventProps) => {
  const { theme } = useThemeStore();

  const tabBarColor = theme === "light" ? "#ffffff" : "#090a0a";
  const Color = theme === "light" ? "#000000" : "#ffffff";
  const { t } = useTranslation();

  const [displayDialog, setDisplayDialog] = useState(false);
  const height = Math.ceil(event.length / 27) * 40;

  return (
    <View style={{ minHeight: height * 2.5, margin: 10 }}>
      <View
        style={{
          alignSelf: "flex-end",
          display: event.includes(defaultEventCode) ? "none" : "flex",
        }}
      >
        <TouchableOpacity
          style={{ padding: 13 }}
          onPress={() => setDisplayDialog(!displayDialog)}
        >
          <FontAwesome
            name="ellipsis-h"
            size={16 * screenRatio}
            color={displayDialog ? "gray" : Color}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: displayDialog ? "flex" : "none",
          zIndex: 1,
          alignSelf: "flex-end",
          width: 125,
          position: "absolute",
          top: 30,
          borderRadius: 10,
          paddingHorizontal: 5,
          backgroundColor: tabBarColor,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderBottomColor: "grey",
            borderBottomWidth: 0.5,
          }}
          onPress={handleEdit}
        >
          <Text style={{ color: Color }}>Edit</Text>
          <FontAwesome name="pencil-square-o" size={15} color={Color} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
          onPress={handleRemove}
        >
          <Text style={{ color: Color }}>Delete</Text>
          <FontAwesome name="trash" size={15} color={Color} />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.event, height: height }}>
        <Text style={{ ...styles.text, width: 190 * fontRatio, color: Color }}>
          {t(event.replace(defaultEventCode, ""))}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  event: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    margin: 5,
  },
  text: {
    fontSize: 17 * screenRatio,
  },
});
