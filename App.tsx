import { View, StatusBar } from "react-native";
import { Drawer } from "./routes/Drawer";

import "./i18n/i18n.config";
import useThemeStore from "./store/ThemeStore";

export default function App() {
  const { theme } = useThemeStore();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar
        translucent
        animated
        barStyle={`${theme === "light" ? "dark" : "light"}-content`}
        backgroundColor={"transparent"}
      />
      <Drawer />
    </View>
  );
}
