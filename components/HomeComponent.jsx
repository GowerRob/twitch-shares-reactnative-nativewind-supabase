import {View} from "react-native";
import GameList from "./GameList";


const HomeComponent = () => {


    return <View className={"bg-black h-full w-full flex justify-center items-center"}>
        <View className={"w-full max-w-4xl h-full"}>
            <GameList title="Top Games" limit={10} search={true} sort={true} filter={true}/>
        </View>
    </View>;
};
export default HomeComponent;

