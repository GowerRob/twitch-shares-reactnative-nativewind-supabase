import { Text, View, Image, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User";
import { fetchGameInfo, fetchGameTransactions, handleTrade } from "../Utils";
import { FlatList } from "react-native-gesture-handler";

export default function GamePageComp() {
  const { game_id } = useLocalSearchParams("game_id");
  const { user, setUser } = useContext(UserContext);
  const [currentGame, setCurrentGame] = useState({});
  const [amount, setAmount] = useState(0);
  const [buy, setBuy] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchGameInfo(game_id, user.id).then((data) => {
      data.cover_url = data.cover_url
        .replace(/{width}/, 200)
        .replace(/{height}/, 300);
      setCurrentGame(data);
    });
  }, [game_id]);

  useEffect(() => {
    fetchGameTransactions(user.id, game_id).then((data) => {
      setTransactions(data);
    });
  }, [game_id]);

  function onPressFunction(amount, value) {
    if (!buy) amount = -amount;
    console.log(amount);

    handleTrade(user.id, game_id, amount)
      .then(() => {
        const newVal = amount * value;
        setUser((current) => {
          return { ...current, credits: current.credits - newVal };
        });
        fetchGameInfo(game_id, user.id).then((data) => {
          data.cover_url = data.cover_url
            .replace(/{width}/, 200)
            .replace(/{height}/, 300);
          setCurrentGame(data);
          fetchGameTransactions(user.id, game_id).then((data) => {
            setTransactions(data);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <View>
        <Text>
          {currentGame.game_name} share price: {currentGame.value}
        </Text>
        <Text>
          You own {currentGame.quantity} shares in {currentGame.game_name}
        </Text>
        <Image
          style={{ width: 200, height: 300 }}
          source={{ uri: currentGame.cover_url }}
        />
      </View>
      <View>
        <Pressable onPress={() => setBuy(true)}>
          <Text>Buy</Text>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => setBuy(false)}>
          <Text>Sell</Text>
        </Pressable>
      </View>

      <View>
        <Pressable onPress={() => setAmount((current) => ++current)}>
          <Text>+1</Text>
        </Pressable>
        <Text>Amount {amount}</Text>
        <Pressable onPress={() => setAmount((current) => --current)}>
          <Text>-1</Text>
        </Pressable>

        <Pressable
          disabled={amount === 0}
          onPress={() => onPressFunction(amount, currentGame.value)}
        >
          <Text>Confirm</Text>
        </Pressable>
      </View>
      <View>
        <Text> Last 10 transactions</Text>
        <FlatList
          data={transactions}
          renderItem={({ item }) => (
            <Text>
              {item.transaction_date.replace("T", " ").slice(0, 19)}{" "}
              {item.quantity}
            </Text>
          )}
        />
      </View>
    </>
  );
}
