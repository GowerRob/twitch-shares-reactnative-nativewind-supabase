import React from "react";
import {View, Text} from "react-native";
import {NativeWindStyleSheet} from "nativewind";
import {
    VictoryArea,
    VictoryAxis,
    VictoryChart,
    VictoryLine,
    VictoryPie,
    VictoryTheme, VictoryTooltip, VictoryVoronoiContainer,
} from "victory-native";

NativeWindStyleSheet.setOutput({});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ShareOverview = ({portfolio_history}) => {
    const colorScheme = "dark";
    return (
        <View className={`rounded-lg p-4 m-4 bg-background-${colorScheme}`}>
            <Text className="text-2xl font-bold text-text-dark mb-4">
                Portfolio Value
            </Text>
            <View className="flex-grow m-0 p-0 rounded-lg hidden sm:flex">
                <VictoryChart
                    height={300}
                    width={600}
                    theme={VictoryTheme.material}
                    padding={{left: 100}}
                >
                    <VictoryAxis dependentAxis/>
                    <VictoryLine
                        data={portfolio_history.map((value) => {
                            return {x: value.time, y: value.total_value};
                        })}
                        style={{
                            data: {
                                stroke: "#82de81",
                            }
                        }}
                    />
                    <VictoryLine
                        data={portfolio_history.map((value) => {
                            return {x: value.time, y: value.credits};
                        })}
                        style={{
                            data: {
                                stroke: "#3d84ce",
                            }
                        }}
                    />
                    <VictoryLine
                        data={portfolio_history.map((value) => {
                            return {x: value.time, y: value.credits + value.total_value};
                        })}
                        style={{
                            data: {
                                stroke: "#757575",
                            }
                        }}
                    />
                </VictoryChart>
                <Text className="text-right font-bold text-[#757575]">Total Value</Text>
                <Text className="text-right font-bold text-[#82de81]">Shares Value</Text>
                <Text className="text-right font-bold text-[#3d84ce]">Credit Balance</Text>
            </View>
        </View>
    );
};

export default ShareOverview;
