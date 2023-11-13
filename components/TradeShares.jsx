import { Text, View, Pressable } from "react-native";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User";

export default function TradeShares({ currentGame, onPressFunction }) {
  const { user, setUser } = useContext(UserContext);
  const [buy, setBuy] = useState(true);
  const [amount, setAmount] = useState(0);

  return (
    <>
      <View>
        <Pressable
          onPress={() => {
            setBuy(true);
            setAmount(0);
          }}
        >
          <Text>Buy</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => {
            setBuy(false);
            setAmount(0);
          }}
        >
          <Text>Sell</Text>
        </Pressable>
      </View>

      <View>
        <Pressable
          disabled={
            buy
              ? (amount + 100) * currentGame.value > user.credits
              : amount + 100 > currentGame.quantity
          }
          onPress={() => setAmount((current) => (current += 100))}
        >
          <Text>+100</Text>
        </Pressable>
        <Pressable
          disabled={
            buy
              ? (amount + 10) * currentGame.value > user.credits
              : amount + 10 > currentGame.quantity
          }
          onPress={() => setAmount((current) => (current += 10))}
        >
          <Text>+10</Text>
        </Pressable>
        <Pressable
          disabled={
            buy
              ? (amount + 1) * currentGame.value > user.credits
              : amount + 1 > currentGame.quantity
          }
          onPress={() => setAmount((current) => ++current)}
        >
          <Text>+1</Text>
        </Pressable>
        <Text>
          {" "}
          {buy ? "You are buying: " : "You are selling: "} {amount} shares
        </Text>
        <Pressable
          disabled={amount - 1 < 0}
          onPress={() => setAmount((current) => --current)}
        >
          <Text>-1</Text>
        </Pressable>
        <Pressable
          disabled={amount - 10 < 0}
          onPress={() => setAmount((current) => (current -= 10))}
        >
          <Text>-10</Text>
        </Pressable>
        <Pressable
          disabled={amount - 100 < 0}
          onPress={() => setAmount((current) => (current -= 100))}
        >
          <Text>-100</Text>
        </Pressable>

        <Text> Transaction value: {amount * currentGame.value}</Text>
        <Text>
          Credits after transaction:{" "}
          {buy
            ? user.credits - amount * currentGame.value
            : user.credits + amount * currentGame.value}
        </Text>
        <Pressable
          disabled={amount === 0}
          onPress={() => onPressFunction(amount, currentGame.value, buy)}
        >
          <Text>Confirm</Text>
        </Pressable>
      </View>
    </>
  );
}
