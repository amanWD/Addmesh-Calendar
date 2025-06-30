import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type useThemeStoreType = {
  theme: "light" | "dark";
  toggleDarkMode: () => void;
};

const useThemeStore = create<useThemeStoreType>()(
  persist(
    (set, get) => ({
      theme: "dark",
      toggleDarkMode() {
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" }));
      },
    }),
    {
      name: "Theme",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useThemeStore;
