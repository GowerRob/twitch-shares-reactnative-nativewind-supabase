import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import InvestedGameCard from "./InvestedGameCard";
import { NativeWindStyleSheet } from "nativewind";
import { fetchInvestedGames } from "../Utils";
NativeWindStyleSheet.setOutput({
  default: "native",
});
import { UserContext } from "../context/User";
import GamePreview from "./GamePreview";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [investedGames, setInvestedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioValue, setPortfolioValue] = useState(0);

  // function handleUserState(new_value) {
  //   setUser((current) => {
  //     return {
  //       ...current,
  //       portfolio_value: current.portfolio_value + new_value,
  //       current_credits: current.current_credits - new_value,
  //     };
  //   });
  //   fetchInvestedGames(user.user_id).then((data) => {
  //     const filteredData = data.filter((game) => {
  //       return game.quantity !== 0;
  //     });

  //     setInvestedGames(filteredData.sort((a, b) => a.game_id - b.game_id));
  //   });
  // }

  useEffect(() => {
    if (user.id) {
      fetchInvestedGames(user.id)
        .then((result) => {
          const newArr = result.filter((game) => {
            return game.quantity !== 0;
          });

          setInvestedGames(newArr.sort((a, b) => a.game_id - b.game_id));
          const totalValue = result.reduce(
            (total, current) => {
              return Number(
                (total = total + current.games.value * current.quantity)
              );
            },
            [0]
          );
          setPortfolioValue(totalValue);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user.id, user.credits]);

  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <SafeAreaView className="flex-column items-center">
      <View>
        <Text className="text-center">
          {" "}
          Hello {user.username} to your Profile page. Your portfolio value ={" "}
          {portfolioValue} cr
        </Text>

        <Text className="text-center">
          Your available credit: {user.credits}
        </Text>
      </View>
      <View>
        <Text className="text-center">Your invested games</Text>
      </View>

      <View className="flex-column items-center border">
        <FlatList
          data={investedGames}
          renderItem={({ item }) => (
            <GamePreview
              setInvestedGames={setInvestedGames}
              game={{ ...item, ...item.games }}
            />
          )}
          keyExtractor={(item) => item.games.game_name}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
