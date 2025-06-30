import { startingYear, yearLength } from "../Constats";

var ethiopianDate = require("ethiopian-date");

var calendarObject: any = {};
var monthObject: any = {};
var weekObject: any = {};
var dayObject: any = {};

const dayInYear = 365.25;

export const getCalendar = () => {
  console.log("Generating...");
  let awudStartingYear = startingYear - 1;
  let awudStartingDay = 0;
  let leapYear = 0;

  let borrowedDay = 7;

  const emptyDay = "empty";
  const senebet = "ሰንበት";
  const senebeteSenebetat = "ሰንበተ\nሰንበታት";

  const ethiopianStartingYear = startingYear - 1;
  const ethiopianStartingMonth = 7;
  const ethiopianStartingDay = 25;

  const gregorianStartingYear = startingYear - 1;
  const gregorianStartingMonth = 7;
  const gregorianStartingDay = 25;

  let ethiopianYearCount = 1;
  let ethiopianMonthCount = ethiopianStartingMonth;
  let ethiopianDayCount = ethiopianStartingDay;
  let startingEthiopianDayIndex = 5;

  let gregorianYearCount = 1;
  let gregorianMonthCount = gregorianStartingMonth;
  let gregorianDayCount = gregorianStartingDay;

  const getEthiopianDay = () => {
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
          ethiopianMonthCount = 1;
          ethiopianYearCount++;
        }
      }
    } else if (ethiopianMonthCount > 13) {
      ethiopianMonthCount = 1;
      ethiopianYearCount++;
    }

    const ethiopianFormattedDay = getFormattedDay({
      day: ethiopianDayCount,
      month: ethiopianMonthCount,
      year: ethiopianYearCount + ethiopianStartingYear - 1,
    });

    return ethiopianFormattedDay;
  };

  const getGregorianDay = () => {
    gregorianDayCount += 1;

    if (gregorianMonthCount < 13) {
      let numberOfDaysInMonth = 30;

      if (gregorianDayCount > numberOfDaysInMonth) {
        gregorianMonthCount++;
        gregorianDayCount = 1;
      }
    } else if (gregorianMonthCount === 13) {
      let numberOfDaysInMonth = 5;
      if (gregorianYearCount % 4 === 0) {
        numberOfDaysInMonth = 6;
      }

      if (gregorianDayCount > numberOfDaysInMonth) {
        gregorianMonthCount++;
        gregorianDayCount = 1;
        if (gregorianMonthCount === 14) {
          gregorianMonthCount = 1;
          gregorianYearCount++;
        }
      }
    } else if (gregorianMonthCount > 13) {
      gregorianMonthCount = 1;
      gregorianYearCount++;
    }

    const [year, month, day] = ethiopianDate.toGregorian(
      gregorianYearCount + gregorianStartingYear - 1,
      gregorianMonthCount,
      gregorianDayCount
    );

    const gregorianFormattedDay = getFormattedDay({
      day: day,
      month: month,
      year: year,
    });

    return gregorianFormattedDay;
  };

  const getFormattedDay = ({
    day,
    month,
    year,
  }: {
    day: number | string;
    month: number | string;
    year: number | string;
  }) => {
    const fromattedDay = day + "/" + month + "/" + year;
    return fromattedDay;
  };

  const getUnformattedDay = ({ formattedDay }: { formattedDay: string }) => {
    let countSlash = 0;

    const unformattedDay = {
      day: "",
      month: "",
      year: "",
    };

    if (formattedDay === undefined || formattedDay === null) {
      return unformattedDay;
    }

    for (let i = 0; i < formattedDay.length; i++) {
      if (formattedDay[i] === "/") {
        countSlash++;
      } else if (formattedDay[i] != "/" && countSlash === 0) {
        unformattedDay.day += formattedDay[i];
      } else if (formattedDay[i] != "/" && countSlash === 1) {
        unformattedDay.month += formattedDay[i];
      } else if (formattedDay[i] != "/" && countSlash === 2) {
        unformattedDay.year += formattedDay[i];
      }
    }
    return unformattedDay;
  };

  const addZero = (formattedDay: string) => {
    var { day, month, year } = getUnformattedDay({
      formattedDay: formattedDay,
    });

    if (day.length === 1) day = "0" + day;
    if (month.length === 1) month = "0" + month;

    const zeroFormattedDay = getFormattedDay({
      day: day,
      month: month,
      year: year,
    });
    return zeroFormattedDay;
  };

  for (let i = 0; i < yearLength + 2; i++) {
    awudStartingYear++;
    let isBorrowedDay = false;

    let yearCount = dayInYear;
    let countBorrowedDay = borrowedDay;

    for (let j = 0; j < 4; j++) {
      yearCount -= 91;

      let delayDay = 0;
      let dayCount = 0;

      for (let k = 0; k < 15; k++) {
        for (let l = 0; l < 7; l++) {
          delayDay++;

          startingEthiopianDayIndex++;
          if (startingEthiopianDayIndex > 6) startingEthiopianDayIndex = 0;

          if (i > yearLength) {
            dayObject[l] = {
              awudDay: emptyDay,
              ethiopianDay: emptyDay,
              gregorianDay: emptyDay,
              dayIndex: `${startingEthiopianDayIndex} - ${
                l - 1 < 0 ? 6 : l - 1
              }`,
            };
            continue;
          }

          if (delayDay < awudStartingDay) {
            dayObject[l] = {
              awudDay: emptyDay,
              ethiopianDay: emptyDay,
              gregorianDay: emptyDay,
              dayIndex: `${startingEthiopianDayIndex} - ${
                l - 1 < 0 ? 6 : l - 1
              }`,
            };
          } else if (dayCount < 91) {
            dayCount++;
            dayObject[l] = {
              awudDay: addZero(
                getFormattedDay({
                  day: dayCount,
                  month: j + 1,
                  year: awudStartingYear,
                })
              ),
              ethiopianDay: addZero(getEthiopianDay()),
              gregorianDay: addZero(getGregorianDay()),
              dayIndex: `${startingEthiopianDayIndex} - ${
                l - 1 < 0 ? 6 : l - 1
              }`,
            };
          } else if (yearCount === 1.25) {
            yearCount--;
            leapYear += yearCount;
            yearCount = 0;
            if (leapYear === 7) {
              isBorrowedDay = true;
              leapYear = 0;
              dayObject[l] = {
                awudDay: addZero(
                  getFormattedDay({
                    day: senebet,
                    month: j + 1,
                    year: awudStartingYear,
                  })
                ),
                ethiopianDay: addZero(getEthiopianDay()),
                gregorianDay: addZero(getGregorianDay()),
                dayIndex: `${startingEthiopianDayIndex} - ${
                  l - 1 < 0 ? 6 : l - 1
                }`,
              };
            } else {
              dayObject[l] = {
                awudDay: addZero(
                  getFormattedDay({
                    day: senebeteSenebetat,
                    month: j + 1,
                    year: awudStartingYear,
                  })
                ),
                ethiopianDay: addZero(getEthiopianDay()),
                gregorianDay: addZero(getGregorianDay()),
                dayIndex: `${startingEthiopianDayIndex} - ${
                  l - 1 < 0 ? 6 : l - 1
                }`,
              };
            }
          } else if (isBorrowedDay) {
            if (countBorrowedDay > 0) {
              countBorrowedDay--;

              if (countBorrowedDay === 0) {
                dayObject[l] = {
                  awudDay: addZero(
                    getFormattedDay({
                      day: senebeteSenebetat,
                      month: j + 1,
                      year: awudStartingYear,
                    })
                  ),
                  ethiopianDay: addZero(getEthiopianDay()),
                  gregorianDay: addZero(getGregorianDay()),
                  dayIndex: `${startingEthiopianDayIndex} - ${
                    l - 1 < 0 ? 6 : l - 1
                  }`,
                };
              } else {
                dayObject[l] = {
                  awudDay: addZero(
                    getFormattedDay({
                      day: senebet,
                      month: j + 1,
                      year: awudStartingYear,
                    })
                  ),
                  ethiopianDay: addZero(getEthiopianDay()),
                  gregorianDay: addZero(getGregorianDay()),
                  dayIndex: `${startingEthiopianDayIndex} - ${
                    l - 1 < 0 ? 6 : l - 1
                  }`,
                };
              }
              continue;
            } else {
              dayCount++;
              isBorrowedDay = false;
              dayObject[l] = {
                awudDay: emptyDay,
                ethiopianDay: emptyDay,
                gregorianDay: emptyDay,
                dayIndex: `${startingEthiopianDayIndex} - ${
                  l - 1 < 0 ? 6 : l - 1
                }`,
              };
            }
          } else {
            dayObject[l] = {
              awudDay: emptyDay,
              ethiopianDay: emptyDay,
              gregorianDay: emptyDay,
              dayIndex: `${startingEthiopianDayIndex} - ${
                l - 1 < 0 ? 6 : l - 1
              }`,
            };
          }
        }
        weekObject[k] = { ...dayObject };
      }
      monthObject[`${i} - ${j}`] = { ...weekObject };
    }
    startingEthiopianDayIndex++;
    if (startingEthiopianDayIndex > 6) startingEthiopianDayIndex = 0;
  }

  calendarObject = { ...monthObject };
  return calendarObject;
};
