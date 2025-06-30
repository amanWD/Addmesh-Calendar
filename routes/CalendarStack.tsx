import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";

import { EventModal } from "../screens/EventModal";
import { AwudCalendar } from "../screens/AwudCalendar";

import useThemeStore from "../store/ThemeStore";

type RootStackParamList = {
  Calendar: undefined;
  EventModal: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const CalendarStack = () => {
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
      <Stack.Group screenOptions={{ headerShown: false, title: t("calendar") }}>
        <Stack.Screen name="Calendar" component={AwudCalendar} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="EventModal"
          component={EventModal}
          options={{ title: t("event") }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
