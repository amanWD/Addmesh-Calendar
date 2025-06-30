type getFormattedDayProps = {
    day: any;
    month: any;
    year: any;
}

export const getFormattedDay = ({day, month, year}: getFormattedDayProps) => {
    const fromattedDay = day + "/" + month + "/" + year
    return fromattedDay
}