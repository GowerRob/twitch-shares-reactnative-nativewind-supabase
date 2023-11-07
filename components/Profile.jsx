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
import { fetchInvestedGames, fetchUser, fetchUserDetails, fetchGameValue } from "../Utils";
NativeWindStyleSheet.setOutput({
  default: "native",
});
import supabase from "../config/supabaseConfig";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [investedGames, setInvestedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {

    fetchUser()
    .then(({details})=>{
      setUser({username: details.username, current_credits: details.credits, portfolio_value: 1000})
      return details.id
    })
    .then((id)=>{
      fetchInvestedGames(id)
      .then((result)=>{
        setInvestedGames(result)
        
        
        
      })
    })
    
   
    
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

