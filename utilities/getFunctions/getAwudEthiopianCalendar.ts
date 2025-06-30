import { getFormattedDay } from "./getFormattedDay";

export const getAwudEthiopianCalendar = () => {
  const days = new Array(7).fill("");
  const weeks = new Array(15).fill("");
  const months = new Array(4).fill("");
  const years = new Array(504).fill("");

  const awudEthiopianCalendar = new Array(years);
  const ethiopianDayIndex = new Array(years);

  const dayInYear = 365.25;

  const ethiopianStartingYear = 1996;
  const ethiopianStartingMonth = 7;
  const ethiopianStartingDay = 25;

  let ethiopianYearCount = 1;
  let ethiopianMonthCount = ethiopianStartingMonth;
  let ethiopianDayCount = ethiopianStartingDay;
  let startingEthiopianDayIndex = 5

  let startingDay = 0;
  let leapYear = 0;

  const ethiopianCalendar = () => {
    ethiopianDayCount += 1;

    if (ethiopianMonthCount < 13) {
      let numberOfDaysInMonth = 30;

      if (ethiopianDayCount > numberOfDaysInMonth) {
        ethiopianMonthCount++;
        ethiopianDayCount = 1;
      }
    } else if (ethiopianMonthCount === 13) {
      let numberOfDaysInMonth = 5;
      if (ethiopianYearCount % 4 === 0) {
        numberOfDaysInMonth = 6;
      }

      if (ethiopianDayCount > numberOfDaysInMonth) {
        ethiopianMonthCount++;
        ethiopianDayCount = 1;
        if (ethiopianMonthCount === 14) {
           ethiopianMonthCount = 1
           ethiopianYearCount++
        }

      }
    } else if (ethiopianMonthCount > 13) {
      ethiopianMonthCount = 1;
      ethiopianYearCount++;
    }

    const ethiopianFormattedDay = getFormattedDay({day: ethiopianDayCount, month: ethiopianMonthCount, year: ethiopianYearCount + ethiopianStartingYear - 1})

    return ethiopianFormattedDay;
  };

  let borrowedDay = 7;

  const emptyDay = "empty";

  for (let i = 0; i < 504; i++) {
    let isBorrowedDay = false;

    let yearCount = dayInYear;
    let countBorrowedDay = borrowedDay;

    awudEthiopianCalendar[i] = new Array(months);
    ethiopianDayIndex[i] = new Array(months);

    for (let j = 0; j < 4; j++) {
      yearCount -= 91;
      awudEthiopianCalendar[i][j] = new Array(weeks);
      ethiopianDayIndex[i][j] = new Array(weeks);

      let delayDay = 0;
      let dayCount = 0;

      for (let k = 0; k < 15; k++) {
        awudEthiopianCalendar[i][j][k] = new Array(days);
        ethiopianDayIndex[i][j][k] = new Array(days);

        for (let l = 0; l < 7; l++) {
          delayDay++;

          startingEthiopianDayIndex++;
          if (startingEthiopianDayIndex > 6) startingEthiopianDayIndex = 0;
          ethiopianDayIndex[i][j][k][l] = startingEthiopianDayIndex;

          if (delayDay < startingDay) {
            awudEthiopianCalendar[i][j][k][l] = emptyDay;
          } else if (dayCount < 91) {
            dayCount++;
            awudEthiopianCalendar[i][j][k][l] = ethiopianCalendar();
          } else if (yearCount === 1.25) {
            awudEthiopianCalendar[i][j][k][l] = ethiopianCalendar();
            yearCount--;
            leapYear += yearCount;
            yearCount = 0;
            if (leapYear === 7) {
              isBorrowedDay = true;
              leapYear = 0;
            }
          } else if (isBorrowedDay) {
            if (countBorrowedDay > 0) {
              countBorrowedDay--;
              awudEthiopianCalendar[i][j][k][l] = ethiopianCalendar();
              continue;
            } else {
              dayCount++;
              isBorrowedDay = false;
            }
          } else {
            awudEthiopianCalendar[i][j][k][l] = "empty";
          }
        }
      }
    }
    startingEthiopianDayIndex++
    if (startingEthiopianDayIndex > 6) startingEthiopianDayIndex = 0;
  }
  return {awudEthiopianCalendar, ethiopianDayIndex};
};
