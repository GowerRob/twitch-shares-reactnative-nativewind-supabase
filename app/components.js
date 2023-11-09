import {Text, View} from "react-native";
import Transactions from "../components/Transactions";
import {NativeWindStyleSheet} from "nativewind";
import {useColorScheme} from "nativewind";
import GamePreview from "../components/GamePreview";
import BuySell from "../components/BuySell";
import supabase from "../config/supabaseConfig";
import {useEffect, useState} from "react";

NativeWindStyleSheet.setOutput({});

const account = () => {
    const [GTAGameInfo, setGTAGameInfo] = useState();
    const [GTAGamePrices, setGTAGamePrices] = useState([]);
    const [gameBGameInfo, setGameBGameInfo] = useState();
    const [gameBGamePrices, setGameBGamePrices] = useState([]);

    const userInfo = {
        shares_owned: 20
    };

    useEffect(() => {
        const fetchGame = async (gameID) => {
            const {data, error} = await supabase
                .from("games")
                .select("*")
                .eq("game_id", gameID)
                .single();
            return data;
        };
        const fetchGamePrices = async (gameID) => {
            const {data, error} = await supabase
                .from("price_history")
                .select("*")
                .eq("game_id", gameID)
                .gte("time", new Date(Date.now() - 86400000).toISOString())
                .order("time", {ascending: true});
            return data;
        };
        fetchGame(32982)
            .then(result =>
                setGTAGameInfo(result));
        fetchGamePrices(32982)
            .then(result =>
                setGTAGamePrices(result));
        fetchGame(463447553)
            .then(result =>
                setGameBGameInfo(result));
        fetchGamePrices(463447553)
            .then(result =>
                setGameBGamePrices(result));
    }, []);


    const transactions = [
        {
            date: new Date("2023-11-01T09:00:00"),
            quantity: 5,
            value: 10,
            new_total: 50
        },
        {
            date: new Date("2023-11-02T10:30:00"),
            quantity: 3,
            value: 8,
            new_total: 24
        },
        {
            date: new Date("2023-11-03T12:45:00"),
            quantity: 7,
            value: 12,
            new_total: 84
        },
        {
            date: new Date("2023-11-04T14:15:00"),
            quantity: 2,
            value: 15,
            new_total: 30
        },
        {
            date: new Date("2023-11-05T16:30:00"),
            quantity: 4,
            value: 9,
            new_total: 36
        },
        {
            date: new Date("2023-11-06T18:20:00"),
            quantity: 6,
            value: 11,
            new_total: 66
        },
        {
            date: new Date("2023-11-07T20:00:00"),
            quantity: 1,
            value: 7,
            new_total: 7
        },
        {
            date: new Date("2023-11-08T22:10:00"),
            quantity: 8,
            value: 13,
            new_total: 104
        },
        {
            date: new Date("2023-11-09T23:45:00"),
            quantity: 3,
            value: 10,
            new_total: 30
        },
        {
            date: new Date("2023-11-10T08:55:00"),
            quantity: 5,
            value: 14,
            new_total: 70
        }
    ];
    const transactionsWithGames = [
        {
            date: new Date("2023-11-01T09:00:00"),
            quantity: 5,
            value: 10,
            new_total: 50,
            game: "The Legend of Zelda: Breath of the Wild"
        },
        {
            date: new Date("2023-11-02T10:30:00"),
            quantity: 3,
            value: 8,
            new_total: 24,
            game: "Red Dead Redemption 2"
        },
        {
            date: new Date("2023-11-03T12:45:00"),
            quantity: 7,
            value: 12,
            new_total: 84,
            game: "Minecraft"
        },
        {
            date: new Date("2023-11-04T14:15:00"),
            quantity: 2,
            value: 15,
            new_total: 30,
            game: "FIFA 22"
        },
        {
            date: new Date("2023-11-05T16:30:00"),
            quantity: 4,
            value: 9,
            new_total: 36,
            game: "Call of Duty: Warzone"
        },
        {
            date: new Date("2023-11-06T18:20:00"),
            quantity: 6,
            value: 11,
            new_total: 66,
            game: "Cyberpunk 2077"
        },
        {
            date: new Date("2023-11-07T20:00:00"),
            quantity: 1,
            value: 7,
            new_total: 7,
            game: "Among Us"
        },
        {
            date: new Date("2023-11-08T22:10:00"),
            quantity: 8,
            value: 13,
            new_total: 104,
            game: "Fortnite"
        },
        {
            date: new Date("2023-11-09T23:45:00"),
            quantity: 3,
            value: 10,
            new_total: 30,
            game: "League of Legends"
        },
        {
            date: new Date("2023-11-10T08:55:00"),
            quantity: 5,
            value: 14,
            new_total: 70,
            game: "Overwatch"
        }
    ];

    return <View className={"bg-black h-full w-full flex justify-center items-center"}>
        <View className={"w-full max-w-4xl h-full"}>
            <Transactions data={{
                "total_shares_owned": 20,
                "total_shares_value": 123456,
                "transactions": transactions
            }}/>
            <Transactions data={{
                "total_shares_owned": 20,
                "total_shares_value": 123456,
                "transactions": transactionsWithGames
            }}/>
            {GTAGameInfo && GTAGamePrices &&
                <GamePreview game={GTAGameInfo} user_info={userInfo} value_history={GTAGamePrices}/>}
            {gameBGameInfo && gameBGamePrices &&
                <GamePreview game={gameBGameInfo} user_info={userInfo} value_history={gameBGamePrices}/>}
            <BuySell game_id={123} share_value={1234}/>
        </View>
    </View>;
};
export default account;

