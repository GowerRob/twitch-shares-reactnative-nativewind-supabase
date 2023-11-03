import {View, Text,ScrollView, SafeAreaView} from 'react-native'
import { useState } from 'react'
import {Stack, useRouter} from 'expo-router' 


// The below snippet also multiple nativewind classes to be applied
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
});

const Home = () => {
const router = useRouter();

    return(
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerStyle:{backgroundColor:'white'},
                    headerShadowVisible:false,
                    headerTitle:''
                }}
            />

            <ScrollView >
                <View className="flex-1 ">
            
                <Text className='text-xl text-red-500 text-center'>Test page</Text>         

                </View>
            </ScrollView>
        </SafeAreaView>

    )

}

export default Home;