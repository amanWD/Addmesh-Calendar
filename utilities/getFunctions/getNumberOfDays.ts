export const getEthiopianNumberOfDays = (monthName: string) => {
    const numberOfDays = []
    
    for (let i = 0; i < 30; i++) {
        if (i === 6 && monthName === "ጳጉሜ") break
        numberOfDays.push({title: (i+1).toString(), value: (i+1).toString()})
    }
    return numberOfDays    
}

export const getGregorianNumberOfDays = (monthName: string) => {
    const numberOfDays = []
    
    for (let i = 0; i < 31; i++) {
        if (i === 30 && (monthName === "April" || monthName === "Jun" || monthName === "September")) break
        if (i === 29 && monthName === "February") break
        numberOfDays.push({title: (i+1).toString(), value: (i+1).toString()})
    }
    return numberOfDays    
}