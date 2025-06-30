import { useTranslation } from "react-i18next";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Help } from "../screens/Help";
import { BackgroundInfo } from "../screens/BackgroundInfo";
import { CalnedarConverter } from "../screens/CalendarConverter";

import { SettingStack } from "./SettingStack";
import { CalendarStack } from "./CalendarStack";

import { SwitchCalnedarType } from "../components/SwitchCalendarType";

import useThemeStore from "../store/ThemeStore";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import { About } from "../screens/About";

const screenHeight = Dimensions.get("window").height;
const fontRatio: number = screenHeight / 800;

type RootDrawerParamList = {
  CalendarStack: undefined;
  CalendarConverter: undefined;
  About: undefined;
  SettingStack: undefined;
  Help: undefined;
  BackgroundInfo: undefined;
};

const DrawerTab = createDrawerNavigator<RootDrawerParamList>();

export const Drawer = () => {
  const { theme } = useThemeStore();

  const tabBarColor = theme === "light" ? "#ffffff" : "#090a0a";
  const activeIconColor = "#9955ffff";
  const inactiveIconColor = theme === "light" ? "#8e8e8f" : "#7c7c7d";

  const { t, i18n } = useTranslation();

  const getLanguage = async () => {
    try {
      let language: any = await AsyncStorage.getItem("Language");

      if (typeof language === null || language === undefined) {
        language = "en";
        await AsyncStorage.setItem("Language", language);
      }

      i18n.changeLanguage(language);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLanguage();
  }, []);

  return (
    <NavigationContainer>
      <DrawerTab.Navigator
        screenOptions={{
          headerTitleStyle: {
            color: activeIconColor,
            fontSize: 16 * fontRatio,
          },
          headerTintColor: activeIconColor,
          headerStyle: {
            backgroundColor: tabBarColor,
            borderBottomWidth: 0.4,
          },
          drawerLabelStyle: {
            fontSize: 15 * fontRatio,
            margin: 4 * fontRatio,
          },
          drawerStyle: {
            backgroundColor: tabBarColor,
            width: 300 * fontRatio,
          },
          drawerInactiveTintColor: inactiveIconColor,
          drawerActiveTintColor: activeIconColor,
        }}
      >
        <DrawerTab.Screen
          name="CalendarStack"
          component={CalendarStack}
          options={{
            title: t("home"),
            drawerIcon: ({ color }) => (
              <FontAwesome name="home" size={20} color={color} />
            ),
            headerRight: () => <SwitchCalnedarType />,
          }}
        />
        <DrawerTab.Screen
          name="CalendarConverter"
          component={CalnedarConverter}
          options={{
            title: t("calendarConverter"),
            drawerIcon: ({ color }) => (
              <FontAwesome name="calendar" size={20} color={color} />
            ),
          }}
        />
        <DrawerTab.Screen
          name="About"
          component={About}
          options={{
            title: t("about"),
            drawerIcon: ({ color }) => (
              <FontAwesome name="info-circle" size={20} color={color} />
            ),
          }}
        />
        <DrawerTab.Screen
          name="Help"
          component={Help}
          options={{
            title: t("help"),
            drawerIcon: ({ color }) => (
              <FontAwesome name="question-circle" size={20} color={color} />
            ),
          }}
        />
        <DrawerTab.Screen
          name="BackgroundInfo"
          component={BackgroundInfo}
          options={{
            title: t("backgroundInfo"),
            drawerIcon: ({ color }) => (
              <FontAwesome name="book" size={20} color={color} />
            ),
          }}
        />
        <DrawerTab.Screen
          name="SettingStack"
          component={SettingStack}
          options={{
            title: t("setting"),
            drawerIcon: ({ color }) => (
              <FontAwesome name="gear" size={20} color={color} />
            ),
          }}
        />
      </DrawerTab.Navigator>
    </NavigationContainer>
  );
};
