import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";

import { Language } from "../screens/Language";
import { Settings } from "../screens/Settings";

import useThemeStore from "../store/ThemeStore";

type RootStackParamList = {
  Settings: undefined;
  Language: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const SettingStack = () => {
  const { theme } = useThemeStore();

  const tabBarColor = theme === "light" ? "#ffffff" : "#090a0a";
  const activeIconColor = "#9955ffff";

  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: tabBarColor,
        },
        headerTitleStyle: {
          color: activeIconColor,
        },
        headerTintColor: activeIconColor,
      }}
    >
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false, title: t("setting") }}
      />
      <Stack.Screen
        name="Language"
        component={Language}
        options={{ title: t("language") }}
      />
    </Stack.Navigator>
  );
};
