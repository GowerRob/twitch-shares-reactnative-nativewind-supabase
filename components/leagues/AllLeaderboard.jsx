import {useEffect, useState} from "react";
import {Text, View} from "react-native";

import {fetchAllPortfolio, fetchLastAllPortfolio} from "../../api/api";

const AllLeaderboard = () => {
    const [leagueData, setLeagueData] = useState([]);
    const [lastLeague, setLastLeague] = useState([]);
    const colorScheme = "dark";

    useEffect(() => {
        fetchAllPortfolio(setLeagueData);
        fetchLastAllPortfolio(setLastLeague);
    }, []);


    return (<>


        <View className={`bg-background-${colorScheme} h-full w-full flex justify-center items-center mt-5`}>
            <View className={"w-full max-w-4xl h-full"}>
                <Text className="text-white font-bold text-xl pl-4">Current League</Text>
                <View className={`rounded-lg p-4 m-4 bg-background-${colorScheme}`}>
                    <View className={`border border-text-dark rounded-lg`}>
                        {/* Headers */}
                        <View
                            className={`flex flex-row  border-b border-text-${colorScheme} py-2 px-4`}

                        >
                            <Text
                                className={`font-bold text-text-${colorScheme} basis-1/4 text-left w-24`}

                            >
                                League Position
                            </Text>
                            <Text
                                className={`font-bold text-text-${colorScheme} basis-1/4 text-left w-48`}
                            >
                                Username
                            </Text>
                            <Text
                                className={`font-bold text-text-${colorScheme} basis-1/4 text-right w-48`}
                            >
                                Portfolio Value
                            </Text>
                            <Text
                                className={`font-bold text-text-${colorScheme} basis-1/4 text-right w-48`}
                            >
                                % change
                            </Text>
                        </View>
                        {/* Data */}
                        {leagueData.map((item, index) => (
                            <View
                                className={`flex flex-row border-b border-${colorScheme}-300 py-2 px-4`}
                                key={index}>
                                <Text
                                    className={`text-text-${colorScheme} basis-1/4  text-left w-24 `}
                                >
                                    {index + 1}
                                </Text>
                                <Text className={`text-text-${colorScheme} basis-1/4 text-left w-48`}>
                                    {item.username}
                                </Text>
                                <Text
                                    className={`text-text-${colorScheme} basis-1/4 text-right w-48}`}
                                >
                                    {item.portfolio_history[0]?.total_value}
                                </Text>
                                <Text
                                    className={`text-text-${colorScheme} basis-1/4 text-right w-48}`}
                                >
                                    {(item.portfolio_history[1]?.total_value) !== undefined
                                     ? (100 * ((item.portfolio_history[0]?.total_value - item.portfolio_history[1]?.total_value) / item.portfolio_history[0]?.total_value)).toFixed(2)
                                     : "0.00"} %
                                </Text>


                            </View>


                        ))}

                    </View>

                </View>
                <Text className="text-white font-bold text-xl pl-4">Last Weeks League</Text>
                <View className={`rounded-lg p-4 m-4 bg-background-${colorScheme}`}>
                    <View className={`border border-text-dark rounded-lg`}>
                        {/* Headers */}
                        <View
                            className={`flex flex-row  border-b border-text-${colorScheme} py-2 px-4`}

                        >
                            <Text
                                className={`font-bold text-text-${colorScheme} basis-1/4 text-left w-24`}

                            >
                                League Position
                            </Text>
                            <Text
                                className={`font-bold text-text-${colorScheme} basis-1/4 text-left w-48`}
                            >
                                Username
                            </Text>
                            <Text
                                className={`font-bold text-text-${colorScheme} basis-1/4 text-right w-48`}
                            >
                                Portfolio Value
                            </Text>
                            <Text
                                className={`font-bold text-text-${colorScheme} basis-1/4 text-right w-48`}
                            >
                                % change
                            </Text>
                        </View>
                        {/* Data */}
                        {lastLeague.map((item, index) => (
                            <View
                                className={`flex flex-row border-b border-${colorScheme}-300 py-2 px-4`}
                                key={index}>
                                <Text
                                    className={`text-text-${colorScheme} basis-1/4  text-left w-24 `}
                                >
                                    {index + 1}
                                </Text>
                                <Text className={`text-text-${colorScheme} basis-1/4 text-left w-48`}>
                                    {item.username}
                                </Text>
                                <Text
                                    className={`text-text-${colorScheme} basis-1/4 text-right w-48}`}
                                >
                                    {item.portfolio_history[0]?.total_value}
                                </Text>
                                <Text
                                    className={`text-text-${colorScheme} basis-1/4 text-right w-48}`}
                                >
                                    {(item.portfolio_history[1]?.total_value) !== undefined
                                     ? (100 * ((item.portfolio_history[0]?.total_value - item.portfolio_history[1]?.total_value) / item.portfolio_history[0]?.total_value)).toFixed(2)
                                     : "0.00"} %
                                </Text>


                            </View>


                        ))}

                    </View>

                </View>

            </View>

        </View>


    </>);
};

export default AllLeaderboard;
