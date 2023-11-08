import {Text, View} from "react-native";
import Transactions from "../components/Transactions";
import {NativeWindStyleSheet} from "nativewind";
import {useColorScheme} from "nativewind";
import GamePreview from "../components/GamePreview";

NativeWindStyleSheet.setOutput({});

const account = () => {

    const gameData = {
        name: "Fortnite",
        value: 123456,
        cover_url: "https://static-cdn.jtvnw.net/ttv-boxart/33214-450x600.jpg",
        shares_owned: 20,
        owned_value: 2469120
    };
    return <View className={"bg-black h-full w-full flex justify-center items-center"}>
        <View className={"w-full max-w-4xl h-full"}>
            <Text className={"text-white"}>Some example components:</Text>
            <Transactions data={{
                "total_shares_owned": 20,
                "total_shares_value": 123456,
                "transactions": [{"date": new Date(), "quantity": 10, "value": 7890, "new_total": 20}]
            }}/>
            <GamePreview game={gameData}/>
        </View>
    </View>;
};
export default account;

