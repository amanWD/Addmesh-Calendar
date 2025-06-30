type getUnformattedDayProps = {
    formattedDay: string;
}

export const getUnformattedDay = ({formattedDay}: getUnformattedDayProps) => {
    let countSlash = 0;

    const unformattedDay = {
        day: "",
        month: "",
        year: ""
    }

    if (formattedDay === undefined || formattedDay === null) {
        return unformattedDay
    }

    for (let i = 0; i < formattedDay.length; i++) {
        if (formattedDay[i] === '/') {
            countSlash++
        } else if (formattedDay[i] != '/' && countSlash === 0) {
            unformattedDay.day += formattedDay[i]
        } else if (formattedDay[i] != '/' && countSlash === 1) {
            unformattedDay.month += formattedDay[i]
        } else if (formattedDay[i] != '/' && countSlash === 2) {
            unformattedDay.year += formattedDay[i]
        }
    }
    return unformattedDay
}