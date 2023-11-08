import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import {NativeWindStyleSheet} from "nativewind";
import {VictoryArea, VictoryAxis, VictoryChart, VictoryTheme} from "victory-native";

NativeWindStyleSheet.setOutput({});


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const GamePreview = ({game}) => {
    const {name, value, cover_url, shares_owned, owned_value} = game;
    const colorScheme = "dark";
    return (
        <View className={`flex-row rounded-lg m-4 bg-background-dark`}>
            <Image
                source={{uri: cover_url}}
                style={{width: 150, height: "100%", resizeMode: "cover", borderRadius: 10}}
            />
            <View className={`flex-1 rounded m-4`}>
                <Text className={`text-xl text-text-dark font-bold mb-2`}>{name}</Text>
                <Text className={`text-sm text-text-dark`}>Value: {value}</Text>
                <Text className={`text-sm text-text-dark`}>Shares owned: {numberWithCommas(shares_owned)}</Text>
                <Text className={`text-sm text-text-dark`}>Owned value: {numberWithCommas(owned_value)}</Text>
                <View className="flex-row mt-4">
                    <TouchableOpacity className={`bg-accent-light hover:bg-accent-dark rounded p-2 m-2`}>
                        <Text className="text-white">Buy/Sell</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={`bg-accent-light hover:bg-accent-dark rounded p-2 m-2`}>
                        <Text className="text-white">Game Page</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex-grow m-0 p-0 rounded-lg">
                <VictoryChart height={90} width={200} theme={VictoryTheme.grayscale} padding={0}>
                    <svg style={{height: 0}}>
                        <defs>
                            <linearGradient id="myGradient" gradientTransform="rotate(90)">
                                <stop offset="0%" stopColor="#6441A466"/>
                                <stop offset="100%" stopColor="#6441A400"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <VictoryAxis style={{
                        axis: {stroke: "transparent"},
                        ticks: {stroke: "transparent"},
                        tickLabels: {fill: "transparent"}
                    }}/>
                    <VictoryArea
                        interpolation="natural"
                        style={{
                            data: {fill: "url(#myGradient)", stroke: "#6441A4"}
                        }}

                        data={[
                            {x: 1, y: 2},
                            {x: 2, y: 3},
                            {x: 3, y: 5},
                            {x: 4, y: 4},
                            {x: 5, y: 7}
                        ]}
                    />
                </VictoryChart>
            </View>
        </View>
    );
};

export default GamePreview;
