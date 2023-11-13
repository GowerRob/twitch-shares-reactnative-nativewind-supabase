import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import { NativeWindStyleSheet } from "nativewind";
import PortfolioHistory from "./PortfolioHistory";
import Transactions from "./Transactions";
import {
  fetchInvestedGames,
  fetchUserPortfolioHistory,
  fetchUserShares,
  fetchAllTransactions,
} from "../Utils";
NativeWindStyleSheet.setOutput({
  default: "native",
});
import { UserContext } from "../context/User";
import PGGamePreview from "./PGGamePreview";
import ShareOverview from "./ShareOverview";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [investedGames, setInvestedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [portfolioHistory, setPortfolioHistory] = useState();
  const [userShares, setUserShares] = useState();
  const [allTransactions, setAllTransactions] = useState();

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
        .then(() => {
          fetchUserPortfolioHistory(user.id).then((data) => {
            setPortfolioHistory(data);
          });
        })
        .then(() => {
          fetchUserShares(user.id).then((data) => {
            setUserShares(data);
          });
        })
        .then(() => {
          fetchAllTransactions(user.id).then((result) => {
            const newData = result.map((item) => {
              const newItem = { ...item };
              newItem.date = new Date(item.transaction_date);
              newItem.game_name = newItem.games.game_name;
              return newItem;
            });
            setAllTransactions(newData);
          });
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
            <PGGamePreview
              setInvestedGames={setInvestedGames}
              game={{ ...item, ...item.games }}
            />
          )}
          keyExtractor={(item) => item.games.game_name}
        />
      </View>
      <View>{userShares && <ShareOverview shares={userShares} />}</View>
      <View>
        {portfolioHistory && (
          <PortfolioHistory portfolio_history={portfolioHistory} />
        )}
      </View>
      {allTransactions && (
        <Transactions
          data={{
            total_shares_owned: 0,
            total_shares_value: 0,
            transactions: allTransactions,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Profile;
