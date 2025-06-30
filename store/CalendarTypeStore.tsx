import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type useCalendarStoreType = {
  calendarType: "Ethiopian" | "Gregorian" | "None";
  setCalendarType: (calendarType: "Ethiopian" | "Gregorian" | "None") => void;
};

const useCalendarType = create<useCalendarStoreType>()(
  persist(
    (set) => ({
      calendarType: "Ethiopian",
      setCalendarType: (calendarType) => {
        set({ calendarType: calendarType });
      },
    }),
    {
      name: "CalendarType",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useCalendarType;
