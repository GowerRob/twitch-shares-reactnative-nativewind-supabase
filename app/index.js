import {SafeAreaView, View} from "react-native";
import {Stack, useRouter} from "expo-router";
import GameList from "../components/GameList";

// The below snippet also multiple nativewind classes to be applied
import {NativeWindStyleSheet} from "nativewind";

NativeWindStyleSheet.setOutput({
    default: "native",
});

const Home = () => {


    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 h-screen bg-black">
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: "white"},
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />


            <View className="flex-1 h-screen">
                <GameList/>
            </View>

        </SafeAreaView>
    );

};

export default Home;
