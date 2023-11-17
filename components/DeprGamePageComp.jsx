import {FlatList, Image, Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/User";
import {fetchGameInfo, fetchGameTransactions, handleTrade} from "../Utils";

import TradeShares from "./TradeShares";

export default function GamePageComp() {
    const {game_id} = useLocalSearchParams();
    const {user, setUser} = useContext(UserContext);
    const [currentGame, setCurrentGame] = useState({});

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchGameInfo(game_id, user.id).then((data) => {
            data.cover_url = data.cover_url
                .replace(/{width}/, 200)
                .replace(/{height}/, 300);
            setCurrentGame(data);
        });
    }, [game_id]);

    useEffect(() => {
        fetchGameTransactions(user.id, game_id).then((data) => {
            setTransactions(data);
        });
    }, [game_id]);

    function onPressFunction(amount, value, buy) {
        if (!buy) {
            amount = -amount;
        }

        handleTrade(user.id, game_id, amount)
            .then(() => {
                const newVal = amount * value;
                setUser((current) => {
                    return {...current, credits: current.credits - newVal};
                });
                fetchGameInfo(game_id, user.id).then((data) => {
                    data.cover_url = data.cover_url
                        .replace(/{width}/, 200)
                        .replace(/{height}/, 300);
                    setCurrentGame(data);
                    fetchGameTransactions(user.id, game_id).then((data) => {
                        setTransactions(data);
                    });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <View>
                <Text>{currentGame.game_name}</Text>
                <Image
                    style={{width: 200, height: 300}}
                    source={{uri: currentGame.cover_url}}
                />
                <Text>{currentGame.description}</Text>
                <Text> </Text>
            </View>
            <View>
                <Text>
                    share price: {currentGame.value} Shares: {currentGame.quantity}
                </Text>
                <Text>Total value of: {currentGame.value * currentGame.quantity}</Text>
            </View>

            <TradeShares
                currentGame={currentGame}
                onPressFunction={onPressFunction}
            />

            <View>
                <Text> Last 10 transactions</Text>
                <FlatList
                    data={transactions}
                    renderItem={({item}) => (
                        <Text>
                            {item.transaction_date.replace("T", " ").slice(0, 19)}{" "}
                            {item.quantity}
                        </Text>
                    )}
                />
            </View>
        </>
    );
}
