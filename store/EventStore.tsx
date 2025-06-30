import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import defaultEventList from "../defaultEventList.json";

const defaultEventStore: any = defaultEventList;

type EventStoreType = {
  eventStore: { [key: string]: string[] };
  addEvent: (eventID: string, events: string[]) => void;
  removeEvent: (eventId: string, event: string) => void;
};

const useEventStore = create<EventStoreType>()(
  persist(
    (set) => ({
      eventStore: defaultEventStore,
      addEvent: (eventID: string, events: string[]) => {
        set((state) => {
          var eventList = state.eventStore;

          eventList[eventID] = [...events];

          return {
            eventStore: eventList,
          };
        });
      },
      removeEvent: (eventID: string, event: string) => {
        set((state) => {
          var eventList = state.eventStore;

          eventList[eventID] = eventList[eventID].filter(
            (eventName, index) => eventName !== event
          );

          return {
            eventStore: eventList,
          };
        });
      },
    }),
    {
      name: "EventStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
export default useEventStore;
