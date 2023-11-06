import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import InvestedGameCard from "./InvestedGameCard";
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
});

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [investedGames, setInvestedGames] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setUser({ username: "John", portfolio_value: 100, current_credits: 800 });

    setInvestedGames([
      { game_name: "Valorant", quantity: 50, share_value: 10 },
      { game_name: "Fortnite", quantity: 20, share_value: 15 },
      { game_name: "World of Warcraft", quantity: 30, share_value: 20 },
    ]);
    setIsLoading(false);
  }, []);
  console.log(investedGames);
  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <SafeAreaView className="flex-column items-center">
      <View>
        <Text className="text-center">
          {" "}
          Your portfolio value = {user.portfolio_value} cr
        </Text>
      </View>

      <View>
        <Text className="text-center">Invested games</Text>
      </View>

      <View className="flex-column items-center border">
        <FlatList
          data={investedGames}
          renderItem={({ item }) => (
            <InvestedGameCard
              game_name={item.game_name}
              share_value={item.share_value}
              quantity={item.quantity}
            />
          )}
          keyExtractor={(item) => item.game_name}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
