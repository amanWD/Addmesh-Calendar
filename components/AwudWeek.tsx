import { View, Text, Dimensions } from "react-native";
import { DayDiamond } from "./DayDiamond";
import { FlatList } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
const diamondRatio: number = screenWidth / 430;

export const AwudWeek = ({ weekData }: { weekData: any }) => {
  const dataArray: any = Object.keys(weekData);

  return (
    <View style={{ height: 115 * diamondRatio }}>
      <FlatList
        data={dataArray}
        horizontal
        scrollEnabled={false}
        renderItem={({ item }: { item: any }) => {
          return <DayDiamond day={weekData[item]} />;
        }}
      />
    </View>
  );
};
