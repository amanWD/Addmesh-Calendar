import { getFormattedDay } from "./getFunctions/getFormattedDay"
import { getUnformattedDay } from "./getFunctions/getUnformattedDay"

export const addZero = (formattedDay: string) => {

    var {day, month, year} = getUnformattedDay({formattedDay: formattedDay})  
    
    if (day.length === 1) day = "0" + day
    if (month.length === 1) month = "0" + month

    const zeroFormattedDay = getFormattedDay({day: day, month: month, year: year})
    return zeroFormattedDay
}