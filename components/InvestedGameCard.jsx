import { TouchableOpacity, View, Text } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
});

const InvestedGameCard = ({ game_name, quantity, share_value }) => {
  return (
    <View>
      <Text>
        <TouchableOpacity>
          <Text>
            {game_name} {share_value}
          </Text>
          {/*  onPress={router.push} to gamecard to trade */}
        </TouchableOpacity>{" "}
        <TouchableOpacity>
          <Text className="border rounded text-red-500">-100</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="border rounded text-red-500">-10</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="border rounded text-red-500">-1</Text>
        </TouchableOpacity>
        <Text>{quantity}</Text>
        <TouchableOpacity>
          <Text className="border rounded text-red-500">+1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="border rounded text-red-500">+10</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="border rounded text-red-500">+100</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default InvestedGameCard;
