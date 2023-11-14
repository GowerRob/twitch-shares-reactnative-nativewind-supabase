import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Collapsible from "react-native-collapsible";
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
import { useRouter } from "expo-router";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [investedGames, setInvestedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [portfolioHistory, setPortfolioHistory] = useState();
  const [userShares, setUserShares] = useState();
  const [allTransactions, setAllTransactions] = useState();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const router = useRouter();

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
              newItem.game = newItem.games.game_name;
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

  let totalShares = 0;
  if (userShares) {
    totalShares = userShares.reduce((total, game) => {
      return (total += game.quantity);
    }, 0);
  }
  const colorScheme = "dark";
  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <View className={`rounded-lg h-full bg-background-${colorScheme}`}>
      <View>
        <Text className="text-center text-text-dark">
          {" "}
          Hello {user.username}! This is your Profile page. Your portfolio value
          = {portfolioValue} cr
        </Text>
      </View>
      <View className="flex-column items-center">
        <FlatList
          data={investedGames}
          renderItem={({ item }) => (
            <PGGamePreview
              setInvestedGames={setInvestedGames}
              game={{ ...item, ...item.games }}
            />
          )}
          keyExtractor={(item) => item.games.game_namse}
        />
      </View>
      <Pressable
        className="bg-accent-light self-center hover:bg-accent-dark rounded p-2 m-2 max-w-[110px]"
        onPress={() => setIsCollapsed(!isCollapsed)}
      >
        <Text className="text-text-dark">
          {isCollapsed ? "Show Charts" : "Hide Charts"}
        </Text>
      </Pressable>
      <Collapsible collapsed={isCollapsed}>
        <View>{userShares && <ShareOverview shares={userShares} />}</View>
        <View>
          {portfolioHistory && (
            <PortfolioHistory portfolio_history={portfolioHistory} />
          )}
        </View>
      </Collapsible>
      {allTransactions && (
        <Transactions
          data={{
            total_shares_owned: totalShares,
            total_shares_value: portfolioValue,
            transactions: allTransactions,
          }}
        />
      )}
      <View>
        <Pressable
          onPress={() => router.push("/transactionshistory")}
          className="bg-accent-light self-center hover:bg-accent-dark rounded p-2 m-2 max-w-[110px]"
        >
          <Text>Show all transactions</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;
