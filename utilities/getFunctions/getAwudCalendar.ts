import { getFormattedDay } from "./getFormattedDay";

export const getAwudCalendar = () => {
  const days = new Array(7).fill("");
  const weeks = new Array(15).fill("");
  const months = new Array(4).fill("");
  const years = new Array(504).fill("");

  const awudCalendar = new Array(years);
  const awudDayIndex = new Array(years);

  const dayInYear = 365.25;

  let currentYear = 1996;
  let startingDay = 0;
  let leapYear = 0;

  let borrowedDay = 7;

  const emptyDay = "empty";
  const senebet = "ሰንበት";
  const senebeteSenebetat = "ሰንበተ\nሰንበታት";

  for (let i = 0; i < 504; i++) {
    currentYear++;
    let isBorrowedDay = false;

    let yearCount = dayInYear;
    let countBorrowedDay = borrowedDay;

    awudCalendar[i] = new Array(months);
    awudDayIndex[i] = new Array(months);

    for (let j = 0; j < 4; j++) {
      yearCount -= 91;
      awudCalendar[i][j] = new Array(weeks);
      awudDayIndex[i][j] = new Array(weeks);

      let delayDay = 0;
      let dayCount = 0;

      for (let k = 0; k < 15; k++) {
        awudCalendar[i][j][k] = new Array(days);
        awudDayIndex[i][j][k] = new Array(days);

        for (let l = 0; l < 7; l++) {
          delayDay++;

          if (l - 1 < 0) awudDayIndex[i][j][k][l] = 6
          else awudDayIndex[i][j][k][l] = l - 1

          if (delayDay < startingDay) {
            awudCalendar[i][j][k][l] = emptyDay;
          } else if (dayCount < 91) {
            dayCount++;
            awudCalendar[i][j][k][l] = getFormattedDay({day: dayCount, month: j + 1, year: currentYear});
          } else if (yearCount === 1.25) {
            yearCount--;
            leapYear += yearCount;
            yearCount = 0;
            if (leapYear === 7) {
              isBorrowedDay = true;
              leapYear = 0;
              awudCalendar[i][j][k][l] = getFormattedDay({
              day: senebet,
              month: j + 1, 
              year: currentYear
            });
            } else {
              awudCalendar[i][j][k][l] = getFormattedDay({
              day: senebeteSenebetat,
              month: j + 1, 
              year: currentYear
            });
            }
          } else if (isBorrowedDay) {
            if (countBorrowedDay > 0) {
              countBorrowedDay--;

              if (countBorrowedDay === 0) {
                awudCalendar[i][j][k][l] = getFormattedDay({
                  day: senebeteSenebetat,
                  month: j + 1, 
                  year: currentYear
                });
              } else {
                awudCalendar[i][j][k][l] = getFormattedDay({
                  day: senebet,
                  month: j + 1, 
                  year: currentYear
                });;
              }
              continue;
            } else {
              dayCount++;
              isBorrowedDay = false;
              awudCalendar[i][j][k][l] = emptyDay;
            }
          } else {
            awudCalendar[i][j][k][l] = emptyDay;
          }
        }
      }
    }
  }
  return {awudCalendar, awudDayIndex};
};
