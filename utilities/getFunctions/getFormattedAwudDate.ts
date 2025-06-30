import { awudMonthsAmharic, awudMonthsEnglish } from "../Constats";
import { getFormattedDay } from "./getFormattedDay";
import { getUnformattedDay } from "./getUnformattedDay";

export const getFormattedAwudDate = (AwudDay: string, calendarType?: "Ethiopian" | "Gregorian") => {
  const { day, month, year } = getUnformattedDay({ formattedDay: AwudDay });

  try {
    const monthNumber = parseInt(month);
    const formattedAwudDay = getFormattedDay({
      day: day,
      month: calendarType === "Ethiopian" ? awudMonthsAmharic[monthNumber - 1] : calendarType === "Gregorian" ?  awudMonthsEnglish[monthNumber - 1] : awudMonthsAmharic[monthNumber - 1],
      year: year,
    });
    return formattedAwudDay
  } catch (err) {
    return AwudDay
  }
};
