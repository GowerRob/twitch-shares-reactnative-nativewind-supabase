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
import { fetchGamePrices } from "../Utils";
import { fetchGameInfo } from "../Utils";

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

  useEffect(() => {
    fetchGameInfo(game_id, user.id)
      .then((data) => {
        data.cover_url = data.cover_url
          .replace(/{width}/, 200)
          .replace(/{height}/, 300);

        setCurrentGame(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.credits]);

  useEffect(() => {
    fetchGamePrices(game_id)
      .then((result) => setGamePrices(result))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const colorScheme = "dark";
  return (
    <>
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
          <View className="flex-row justify-end mt-4"></View>
        </View>
      </View>
      <View className="flex-grow m-0 p-0 rounded-lg hidden sm:flex">
        <VictoryChart
          height={90}
          width={170}
          theme={VictoryTheme.grayscale}
          padding={0}
        >
          <svg style={{ height: 0 }}>
            <defs>
              <linearGradient id="myGradient1">
                <stop offset="10%" stopColor="#6441A400" />
                <stop offset="100%" stopColor="#6441A4FF" />
              </linearGradient>
              <linearGradient id="myGradient2">
                <stop offset="20%" stopColor="#6441A400" />
                <stop offset="100%" stopColor="#6441A490" />
              </linearGradient>
            </defs>
          </svg>
          <VictoryAxis
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              tickLabels: { fill: "transparent" },
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
    </>
  );
}
