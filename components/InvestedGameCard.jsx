import { Pressable, View, Text } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { fetchInvestedGames, handleTrade } from "../Utils";
import { useRouter } from "expo-router";
NativeWindStyleSheet.setOutput({
  default: "native",
});

const InvestedGameCard = ({
  handleUserState,
  user_id,
  game_id,
  game_name,
  quantity,
  share_value,
  current_credits,
}) => {
  const router = useRouter();
  function onPressFunction(amount) {
    handleTrade(user_id, game_id, amount)
      .then(() => {
        handleUserState(amount * share_value);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <View>
      <Text>
        <Pressable onPress={() => router.push(`/${game_id}`)}>
          <Text>
            {game_name} {share_value}
          </Text>
          {/*  onPress={router.push} to gamecard to trade */}
        </Pressable>{" "}
        <Pressable
          disabled={quantity < 100}
          onPress={() => onPressFunction(-100)}
        >
          <Text className="border rounded ml-2 text-red-500 items-right">
            -100
          </Text>
        </Pressable>
        <Pressable
          disabled={quantity < 10}
          onPress={() => onPressFunction(-10)}
        >
          <Text className="border rounded ml-2 text-red-500">-10</Text>
        </Pressable>
        <Pressable onPress={() => onPressFunction(-1)}>
          <Text className="border rounded ml-2 text-red-500">-1</Text>
        </Pressable>
        <Text>{quantity}</Text>
        <Pressable
          disabled={current_credits < 1 * share_value}
          onPress={() => onPressFunction(1)}
        >
          <Text className="border rounded ml-2 text-red-500">+1</Text>
        </Pressable>
        <Pressable
          disabled={current_credits < 10 * share_value}
          onPress={() => onPressFunction(10)}
        >
          <Text className="border rounded ml-2 text-red-500">+10</Text>
        </Pressable>
        <Pressable
          disabled={current_credits < 100 * share_value}
          onPress={() => onPressFunction(100)}
        >
          <Text className="border rounded ml-2 text-red-500">+100</Text>
        </Pressable>
      </Text>
      <Text>
        {" "}
        Total value for {game_name} {share_value * quantity}
      </Text>
    </View>
  );
};

export default InvestedGameCard;
