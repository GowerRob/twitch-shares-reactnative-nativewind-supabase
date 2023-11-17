import React from "react";
import {Text, View} from "react-native";
import {NativeWindStyleSheet} from "nativewind";

NativeWindStyleSheet.setOutput({});

function numberWithCommas(x = 0) {
    x = +x;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Transactions = ({data, show_overview = true}) => {
    const {total_shares_owned, total_shares_value, transactions} = data;
    const colorScheme = "dark";


    return (
        <View className={`rounded-lg p-4 m-4 bg-background-${colorScheme}`}>
            <Text className="text-2xl font-bold text-text-dark mb-4">
                Transaction History
            </Text>
            {show_overview && (
                <View>
                    <Text className={`text-lg text-text-${colorScheme} mb-2`}>
                        Total Shares Owned: {numberWithCommas(total_shares_owned)}
                    </Text>
                    <Text className={`text-lg text-text-${colorScheme} mb-4`}>
                        Total Shares Value: {numberWithCommas(total_shares_value)}
                    </Text>
                </View>
            )}
            <View className={`border border-text-dark rounded-lg`}>
                <View
                    className={`flex flex-row border-b border-dar border-text-${colorScheme} py-2 px-4`}
                >
                    <Text
                        className={`font-bold text-text-${colorScheme} basis-1/5 text-center `}
                    >
                        Date
                    </Text>
                    {transactions.length > 0 && transactions[0].game && (
                        <Text
                            className={`font-bold text-text-${colorScheme} basis-1/5 text-left`}
                        >
                            Game
                        </Text>
                    )}
                    {transactions.length > 0 && (
                        <Text
                            className={`font-bold text-text-${colorScheme} basis-1/5 text-center `}
                        >
                            Quantity
                        </Text>
                    )}
                    {transactions.length > 0 && (
                        <Text
                            className={`font-bold text-text-${colorScheme} basis-1/5 text-center `}
                        >
                            Share Value
                        </Text>
                    )}
                    {transactions.length > 0 && (
                        <Text
                            className={`font-bold text-text-${colorScheme} basis-1/5 text-right `}
                        >
                            Total Value
                        </Text>
                    )}
                </View>
                {transactions.map((transaction, index) => (
                    <View
                        className={`flex flex-row  border-b border-${colorScheme}-300 py-2 px-4`}
                        key={index}
                    >
                        <Text className={`text-text-${colorScheme} basis-1/5 text-left text-xs w-48`}>
                            {transaction.date.toDateString() +
                             " " +
                             transaction.date.toLocaleTimeString()}
                        </Text>
                        {transactions[0]?.game && (
                            <Text className={`text-text-${colorScheme} basis-1/5 text-left  text-xs flex-1`}>
                                {transaction?.game}
                            </Text>
                        )}
                        <Text
                            className={`text-text-${colorScheme} basis-1/5 text-center text-xs ${
                                transactions[0].game ? "w-24" : "flex-1"
                            }`}
                        >
                            {numberWithCommas(transaction.quantity)}
                        </Text>
                        <Text
                            className={`text-text-${colorScheme} basis-1/5 text-center text-xs ${
                                transactions[0].game ? "w-24" : "flex-1"
                            }`}
                        >
                            {numberWithCommas(transaction.value / transaction.quantity)}
                        </Text>
                        <Text
                            className={`text-text-${colorScheme} basis-1/5 text-right text-xs ${
                                transactions[0].game ? "w-24" : "flex-1"
                            }`}
                        >
                            {numberWithCommas(transaction.value)}
                        </Text>
                        {/*<Text*/}
                        {/*    className={`text-text-${colorScheme} text-right ${transactions[0].game ? "w-24" : "flex-1"}`}>{transaction.new_total}</Text>*/}
                    </View>
                ))}
            </View>
        </View>
    );
};

export default Transactions;
