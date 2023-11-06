import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import InvestedGameCard from "./InvestedGameCard";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [investedGames, setInvestedGames] = useState();

  useEffect(() => {
    setUser({ username: "John", portfolio_value: 100, current_credits: 800 });

    setInvestedGames([
      { game_name: "Valorant", quantity: 50, share_value: 10 },
      { game_name: "Fortnite", quantity: 20, share_value: 15 },
      { game_name: "World of Warcraft", quantity: 30, share_value: 20 },
    ]);
  }, []);
  console.log(investedGames);
  return (
    <SafeAreaView>
      <View>
        <Text>Invested games</Text>
      </View>

      <View>
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
