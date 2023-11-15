import { Pressable, View, Text } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { fetchInvestedGames, handleTrade } from "../Utils";
import { useContext, useState } from "react";
import { UserContext } from "../context/User";
import { useRouter } from "expo-router";
NativeWindStyleSheet.setOutput({
  default: "native",
});

const InvestedGameCard = ({
  setInvestedGames,
  game_id,
  game_name,
  quantity,
  value,
}) => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  function onPressFunction(amount) {
    handleTrade(user.id, game_id, amount)
      .then(() => {
        const newVal = amount * value;
        setUser((current) => {
          return { ...current, credits: current.credits - newVal };
        });
        fetchInvestedGames(user.id).then((result) => {
          const newArr = result.filter((game) => {
            return game.quantity !== 0;
          });
          setInvestedGames(newArr.sort((a, b) => a.game_id - b.game_id));
        });
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
            {game_name} {value}
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
          disabled={user.credits < 1 * value}
          onPress={() => onPressFunction(1)}
        >
          <Text className="border rounded ml-2 text-red-500">+1</Text>
        </Pressable>
        <Pressable
          disabled={user.credits < 10 * value}
          onPress={() => onPressFunction(10)}
        >
          <Text className="border rounded ml-2 text-red-500">+10</Text>
        </Pressable>
        <Pressable
          disabled={user.credits < 100 * value}
          onPress={() => onPressFunction(100)}
        >
          <Text className="border rounded ml-2 text-red-500">+100</Text>
        </Pressable>
      </Text>
      <Text>
        {" "}
        Total value for {game_name} {value * quantity}
      </Text>
    </View>
  );
};

export default InvestedGameCard;
