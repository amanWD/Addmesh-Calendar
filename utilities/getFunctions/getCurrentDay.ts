import { getFormattedDay } from "./getFormattedDay";
import { Search } from "../search";
import { addZero } from "../addZero";

var ethiopianDate = require('ethiopian-date');

export const getCurrentDay = () => {
    var gregorianDay = "25/9/2024"
    var ethiopianDay = "15/1/2017"
    var awudDay = "89/2/2017"

    var Gday = new Date().getDate();
    var Gmonth = new Date().getMonth() + 1;
    var Gyear = new Date().getFullYear();

    
    const [year, month, day] = ethiopianDate.toEthiopian(Gyear, Gmonth, Gday)
    
    const gregorianFormattedDay = getFormattedDay({day: Gday, month: Gmonth, year: Gyear})
    const ethiopianFormattedDay = getFormattedDay({day: day, month: month, year: year})
    
    var awudFormattedDay = Search(ethiopianFormattedDay);

    gregorianDay = addZero(gregorianFormattedDay)
    ethiopianDay = addZero(ethiopianFormattedDay)
    awudDay = addZero(awudFormattedDay)

    return {
        ethiopianDay: ethiopianDay, 
        gregorianDay: gregorianDay, 
        awudDay: awudDay
    }    
}