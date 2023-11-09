import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import InvestedGameCard from "./InvestedGameCard";
import { NativeWindStyleSheet } from "nativewind";
import { fetchInvestedGames, fetchUser } from "../Utils";
NativeWindStyleSheet.setOutput({
  default: "native",
});
import supabase from "../config/supabaseConfig";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [investedGames, setInvestedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  function handleUserState(new_value) {
    setUser((current) => {
      return {
        ...current,
        portfolio_value: current.portfolio_value + new_value,
        current_credits: current.current_credits - new_value,
      };
    });
    fetchInvestedGames(user.user_id).then((data) => {
      const filteredData = data.filter((game) => {
        return game.quantity !== 0;
      });

      setInvestedGames(filteredData.sort((a, b) => a.game_id - b.game_id));
    });
  }

  useEffect(() => {
    fetchUser()
      .then(({ details }) => {
        setUser({
          user_id: details.id,
          username: details.username,
          current_credits: details.credits,
          portfolio_value: 0,
        });
        return details.id;
      })
      .then((id) => {
        fetchInvestedGames(id).then((result) => {
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

          setUser((current) => {
            return { ...current, portfolio_value: totalValue };
          });

          setIsLoading(false);
        });
      });
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    router.push(`/`);
  };

  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <SafeAreaView className="flex-column items-center">
      <View>
        <Text className="text-center">
          {" "}
          Hello {user.username} to your Profile page. Your portfolio value ={" "}
          {user.portfolio_value} cr
        </Text>
      </View>
      <Pressable
        className="border bg-primary-light text-white my-2"
        onPress={handleSignOut}
      >
        <Text>Sign out</Text>
      </Pressable>
      <View>
        <Text className="text-center">
          Your available credit: {user.current_credits}
        </Text>
      </View>
      <View>
        <Text className="text-center">Your invested games</Text>
      </View>

      <View className="flex-column items-center border">
        <FlatList
          data={investedGames}
          renderItem={({ item }) => (
            <InvestedGameCard
              handleUserState={handleUserState}
              user_id={user.user_id}
              game_id={item.game_id}
              game_name={item.games.game_name}
              share_value={item.games.value}
              quantity={item.quantity}
              current_credits={user.current_credits}
            />
          )}
          keyExtractor={(item) => item.games.game_name}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
