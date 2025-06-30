export const getTotalEthiopianCalendarYear = () => {
  const startingYear = 1996;

  const numberOfYears = [];

  for (let i = startingYear; i < 2501; i++) {
    numberOfYears.push({
      title: i.toString(),
      value: i.toString(),
    });
  }
  return numberOfYears;
};

export const getTotalGregorianCalendarYear = () => {
  const startingYear = 2005;

  const numberOfYears = [];

  for (let i = startingYear; i < 2507; i++) {
    numberOfYears.push({
      title: i.toString(),
      value: i.toString(),
    });
  }
  return numberOfYears;
};
