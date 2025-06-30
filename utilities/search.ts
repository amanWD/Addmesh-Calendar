import { getAwudCalendar } from "./getFunctions/getAwudCalendar";
import { getAwudEthiopianCalendar } from "./getFunctions/getAwudEthiopianCalendar";


export const Search = (formattedDay: string) => {
  const { awudCalendar } = getAwudCalendar();
  const { awudEthiopianCalendar } = getAwudEthiopianCalendar();
  let convertedDay = "Not Found";

  for (let i = 0; i < 504; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 15; k++) {
        for (let l = 0; l < 7; l++) {
          if (awudEthiopianCalendar[i][j][k][l] === formattedDay) {
            convertedDay = awudCalendar[i][j][k][l];
          }
        }
      }
    }
  }

  return convertedDay;
};
