import { TouchableOpacity, View, Text } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
});

const InvestedGameCard = ({ game_name, quantity, share_value }) => {
  return (
    <View>
      <Text>
        {game_name} {quantity} {share_value}
        <TouchableOpacity className="border-black">
          {/*  onPress={router.push} to gamecard to trade */}
          <Text>Trade</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default InvestedGameCard;
