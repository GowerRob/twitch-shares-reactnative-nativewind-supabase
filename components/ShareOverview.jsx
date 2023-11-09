import React from "react";
import {
    View,
    Text,
} from "react-native";
import {NativeWindStyleSheet} from "nativewind";
import {VictoryPie} from "victory-native";

NativeWindStyleSheet.setOutput({});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ShareOverview = ({shares}) => {
    const colorScheme = "dark";
    return (
        <View className={`rounded-lg p-4 m-4 bg-background-${colorScheme}`}>
            <Text className="text-2xl font-bold text-text-dark mb-4">Shares</Text>
            <Text className={`text-lg text-text-${colorScheme} mb-2`}>Total Shares
                Owned: {numberWithCommas(shares.reduce((total, current) => total + current.quantity, 0))}</Text>
            <Text className={`text-lg text-text-${colorScheme} mb-4`}>Total Shares
                Value: {numberWithCommas(shares.reduce((total, current) => total + current.quantity * current.games.value, 0))}</Text>
            <View className="sm:flex-col md:flex-row justify-between">
                <View className="flex-1">
                    <Text className="text-lg font-bold text-text-dark text-center">Shares by Quantity</Text>
                    <VictoryPie data={shares.map(share => {
                        return {
                            x: share.games.game_name, y: share.quantity,
                            label: share.games.game_name
                        };
                    })} style={{labels: {fill: "white", fontSize: 40, fontWeight: "bold"}}}
                                padding={{top: 100, bottom: 200, right: 200, left: 200}}/>
                </View>
                <View className="flex-1">
                    <Text className={`text-lg font-bold text-text-dark text-center`}>Shares by Value</Text>
                    <VictoryPie data={shares.map(share => {
                        return {
                            x: share.games.game_name,
                            y: share.quantity * share.games.value,
                            label: share.games.game_name
                        };
                    })} style={{labels: {fill: "white", fontSize: 40, fontWeight: "bold"}}}
                                padding={{top: 100, bottom: 200, right: 200, left: 200}}/>
                </View>
            </View>
            <View className={`border border-text-dark rounded-lg`}>
                <View
                    className={`flex flex-row justify-between border-b border-dar border-text-${colorScheme} py-2 px-4`}>
                    <Text className={`font-bold text-text-${colorScheme} text-right flex-1`}>Game</Text>
                    <Text
                        className={`font-bold text-text-${colorScheme} text-right flex-1`}>Quantity</Text>
                    <Text
                        className={`font-bold text-text-${colorScheme} text-right flex-1`}>Value</Text>
                </View>
                {shares.map((share, index) => (
                    <View className={`flex flex-row justify-between border-b border-${colorScheme}-300 py-2 px-4`}
                          key={index}>
                        <Text className={`text-text-${colorScheme} text-right flex-1`}>{share.games.game_name}</Text>
                        <Text
                            className={`text-text-${colorScheme} text-right flex-1`}>{numberWithCommas(share.quantity)}</Text>
                        <Text
                            className={`text-text-${colorScheme} text-right flex-1`}>{numberWithCommas(share.games.value * share.quantity)}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default ShareOverview;
