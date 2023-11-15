import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import Login from "../components/Login";
import GameList from "../components/GameList";

// The below snippet also multiple nativewind classes to be applied
import { NativeWindStyleSheet } from "nativewind";
import HomeComponent from "../components/HomeComponent";

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

            <ScrollView className="flex-1 h-screen">
                <View className="flex-1 h-screen">
                    <GameList/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );

};

export default Home;
