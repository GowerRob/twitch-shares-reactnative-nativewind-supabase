import React, { useState, useContext, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { useLocalSearchParams } from "expo-router";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory-native";
import BuySell from "./BuySell";
import { UserContext } from "../context/User";
import { fetchGamePrices, fetchGameTransactions } from "../Utils";
import { fetchGameInfo } from "../Utils";
import Transactions from "./Transactions";

NativeWindStyleSheet.setOutput({});

function numberWithCommas(x = 0) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function GamePage() {
  const { game_id } = useLocalSearchParams("game_id");
  const [modalVisible, setModalVisible] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [currentGame, setCurrentGame] = useState({});
  const [gamePrices, setGamePrices] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchGameInfo(game_id, user?.id)
      .then((data) => {
        data.cover_url = data.cover_url
          .replace(/{width}/, 200)
          .replace(/{height}/, 300);
        console.log(data);
        setCurrentGame(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.credits]);

  useEffect(() => {
    fetchGamePrices(game_id)
      .then((result) => {
        const filteredResult = result.filter((item, index) => {
          if ((index + 1) % 2 === 0) {
            // const newTime = new Date(item.time)
            // console.log(newTime)

            const newTime = item.time.replace("T", "@").slice(5, 16);

            item.time = newTime;
            return item;
          }
        });
        setGamePrices(filteredResult);
      })
      .then(() => {
        if (user.id){
          fetchGameTransactions(user.id, game_id).then((data) => {
            const newData = data.map((item) => {
              const newItem = { ...item };
              newItem.date = new Date(item.transaction_date);
              return newItem;
            });
            setTransactions(newData);
          });
        }  
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.credits]);
  
  const colorScheme = "dark";
  return (
    <View className={`rounded-lg h-full bg-background-${colorScheme}`}>
      <View className={`flex-row rounded-lg m-4 bg-background-dark`}>
        <Image
          source={{
            uri: currentGame.cover_url,
          }}
          style={{
            width: 150,
            height: "100%",
            resizeMode: "cover",
            borderRadius: 10,
          }}
        />
        <View className={`flex-1 justify-evenly flex-grow rounded m-4`}>
          <Text className={`text-xl text-text-dark font-bold mb-2`}>
            {currentGame.game_name}
          </Text>
          <Text className={`text-sm text-text-dark`}>
            Value: {numberWithCommas(currentGame.value)}
          </Text>
          <Text className={`text-sm text-text-dark`}>
            Shares owned: {numberWithCommas(currentGame.quantity)}
          </Text>
          <Text className={`text-sm text-text-dark`}>
            Owned value:{" "}
            {numberWithCommas(currentGame.quantity * currentGame.value)}
          </Text>
          <View className="flex-row self-center justify-center mt-4">
            <Text className={`text-sm text-text-dark`}>
              {currentGame.description}
            </Text>
          </View>
        </View>
      </View>
      <View
        className={`rounded-lg border pt-40 p-4 m-4 bg-background-${colorScheme}`}
      >
        <Text className="text-2xl font-bold text-text-dark mb-4">
          Game Value
        </Text>
        <VictoryChart
          height={300}
          width={600}
          theme={VictoryTheme.grayscale}
          padding={60}
        >
          <svg style={{ height: 0 }}>
            <defs>
              <linearGradient id="myGradient1">
                <stop offset="0%" stopColor="#6441A400" />
                <stop offset="0%" stopColor="#6441A4FF" />
              </linearGradient>
              <linearGradient id="myGradient2">
                <stop offset="0%" stopColor="#6441A400" />
                <stop offset="100%" stopColor="#6441A490" />
              </linearGradient>
            </defs>
          </svg>
          <VictoryAxis
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "white" },
              tickLabels: { fill: "white" },
            }}
            dependentAxis
          />
          <VictoryAxis
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "white" },
              tickLabels: {
                fill: "white",
                angle: -60,
                textAnchor: "end",
                fontSize: 9,
              },
            }}
          />

          <VictoryArea
            interpolation="natural"
            style={{
              data: {
                fill: "url(#myGradient2)",
                stroke: "url(#myGradient1)",
              },
            }}
            data={gamePrices.map((value) => {
              return { x: value.time, y: value.value };
            })}
          />
        </VictoryChart>
      </View>
      <View>
        <BuySell
          quantity={currentGame.quantity}
          game_id={game_id}
          game_name={currentGame.game_name}
          value={currentGame.value}
        />
      </View>
      <View>
        {transactions.length && (
          <Transactions
            data={{
              total_shares_owned: currentGame.quantity,
              total_shares_value: currentGame.quantity * currentGame.value,
              transactions: transactions,
            }}
          />
        )}
      </View>
    </View>
  );
}
