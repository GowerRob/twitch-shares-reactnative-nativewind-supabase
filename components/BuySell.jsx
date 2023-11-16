import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { handleTrade } from "../Utils";
import { useContext } from "react";
import { UserContext } from "../context/User";
import { fetchInvestedGames } from "../Utils";

NativeWindStyleSheet.setOutput({});

function numberWithCommas(x = 0) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const BuySell = ({
  quantity = 0,
  game_id,
  game_name,
  value = 50,
  closeModal,
}) => {
  const [selectedOption, setSelectedOption] = useState("BUY");
  const { user, setUser } = useContext(UserContext);
  const [tradeQuantity, setTradeQuantity] = useState(0);

  const currentValue = value * quantity;
  const totalValue =
    selectedOption === "BUY"
      ? currentValue + value * tradeQuantity
      : currentValue - value * tradeQuantity;

  const adjustQuantity = (amount) => {
    const newQuantity = parseInt(tradeQuantity) + amount;
    setTradeQuantity(Math.max(newQuantity, 0));
  };
  const colorScheme = "dark";

  function onPressFunction(amount) {
    if (amount === 0) return;
    selectedOption !== "BUY" ? (amount = -amount) : "";
    handleTrade(user.id, game_id, amount)
      .then(() => {
        const newVal = amount * value;
        setUser((current) => {
          return { ...current, credits: current.credits - newVal };
        });
        setTradeQuantity(0);
        if (closeModal) {
          fetchInvestedGames(user.id).then((result) => {
            const newArr = result.filter((game) => {
              return game.quantity !== 0;
            });

            closeModal();
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View className="rounded-lg m-4 bg-background-dark">
      <View className="flex-row justify-between">
        <TouchableOpacity
          className={`${
            selectedOption === "BUY"
              ? "border-b-4 border-accent-light"
              : "border-b"
          } flex-1 text-center py-2`}
          onPress={() => {
            setSelectedOption("BUY");
            setTradeQuantity(0);
          }}
        >
          <Text className="text-text-dark text-center">BUY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${
            selectedOption === "SELL"
              ? "border-b-4 border-accent-light"
              : "border-b"
          } flex-1 text-center py-2`}
          onPress={() => {
            setSelectedOption("SELL");
            setTradeQuantity(0);
          }}
        >
          <Text className="text-text-dark text-center">SELL</Text>
        </TouchableOpacity>
      </View>
      <View className="sm:flex-col md:flex-row md:justify-between md:items-center md:mt-4">
        <View className="flex-row-reverse md:flex-row justify-between items-center mt-4 flex-1 flex-grow">
          <TouchableOpacity
            className="p-2 rounded-r-lg md:rounded-r-none md:rounded-l-lg bg-accent-light flex-1 min-w-[70px]"
            onPress={() => adjustQuantity(-100)}
          >
            <Text numberOfLines={1} className="text-text-dark text-center ">
              -100
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 bg-accent-light border-l-2 border-r-2 flex-1 min-w-[70px]"
            onPress={() => adjustQuantity(-10)}
          >
            <Text className="text-text-dark text-center">-10</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 rounded-l-lg md:rounded-l-none md:rounded-r-lg bg-accent-light flex-1 min-w-[70px]"
            onPress={() => adjustQuantity(-1)}
          >
            <Text className="text-text-dark text-center">-1</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          className="border-b-2 flex flex-shrink border-gray-300 p-2 mt-4 text-text-dark mx-2"
          placeholder="Quantity"
          keyboardType="numeric"
          value={tradeQuantity}
          onChangeText={(text) =>
            setTradeQuantity(
              selectedOption === "BUY"
                ? Math.min(
                    +text.replace(/[^0-9]/g, ""),
                    Math.floor(user.credits / value)
                  )
                : Math.min(
                  +text.replace(/[^0-9]/g, ""),
                  quantity)
            )git 
          }
        />
        <View className="flex-row justify-between items-center mt-4 flex-1 flex-grow">
          <TouchableOpacity
            disabled={
              selectedOption === "BUY"
                ? (tradeQuantity + 1) * value > user.credits
                : tradeQuantity + 1 > quantity
            }
            className="p-2 rounded-l-lg bg-accent-light flex-1 min-w-[70px]"
            onPress={() => adjustQuantity(1)}
          >
            <Text className="text-text-dark text-center">+1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={
              selectedOption === "BUY"
                ? (tradeQuantity + 10) * value > user.credits
                : tradeQuantity + 10 > quantity
            }
            className="p-2 bg-accent-light border-l-2 border-r-2 flex-1 min-w-[70px]"
            onPress={() => adjustQuantity(10)}
          >
            <Text className="text-text-dark text-center">+10</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={
              selectedOption === "BUY"
                ? (tradeQuantity + 100) * value > user.credits
                : tradeQuantity + 100 > quantity
            }
            className="p-2 rounded-r-lg bg-accent-light flex-1 min-w-[70px]"
            onPress={() => adjustQuantity(100)}
          >
            <Text className="text-text-dark text-center">+100</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="px-2">
        <Text className="text-text-dark mt-2">
          Current Value: {numberWithCommas(currentValue)}
        </Text>
        <Text className="text-text-dark mt-2">
          Value After Transaction: {numberWithCommas(totalValue)}
        </Text>
        {quantity !== 0 ? (
          <Text className="text-text-dark mt-2">
            You have {quantity} {quantity === 1 ? "share" : "shares"} in{" "}
            {game_name}
          </Text>
        ) : (
          <></>
        )}
      </View>
      <View className="flex-row justify-between">
        {closeModal ? (
          <TouchableOpacity
            className="bg-accent-light p-2 mt-4 flex-grow border-r rounded-bl-lg"
            onPress={closeModal}
          >
            <Text className="text-white text-center">Cancel Transaction</Text>
          </TouchableOpacity>
        ):null}
        <Pressable
          onPress={() => onPressFunction(tradeQuantity)}
          className={`bg-accent-light p-2 mt-4 flex-grow border-l ${
            closeModal ? "" : "rounded-bl-lg"
          } rounded-br-lg`}
        >
          <Text className="text-white text-center">Confirm Transaction</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default BuySell;
