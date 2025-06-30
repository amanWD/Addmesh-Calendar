import { ethiopianMonths, gregorianMonths } from "../Constats"

export const getEthiopianMonth = () => {
    const months = []
    for (let i = 0; i < 13; i++) {
        months.push({title: `${i+1}-${ethiopianMonths[i]}`, value: i+1})
    }
    return months;
}

export const getGregorianMonth = () => {
    const months = []
    for (let i = 0; i < 12; i++) {
        months.push({title: `${i+1}-${gregorianMonths[i]}`, value: i+1})
    }
    return months;
}