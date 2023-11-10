import React from "react";
import {
    View,
    Text,
} from "react-native";
import {NativeWindStyleSheet} from "nativewind";

NativeWindStyleSheet.setOutput({});

// function numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

const Transactions = ({data}) => {

    const {total_shares_owned, total_shares_value, transactions} = data;
    const colorScheme = "dark";
console.log(transactions)
    return (
        <View className={`rounded-lg p-4 m-4 bg-background-${colorScheme}`}>
            <Text className="text-2xl font-bold text-text-dark mb-4">Transaction History</Text>
            <Text className={`text-lg text-text-${colorScheme} mb-2`}>Total Shares
                Owned: </Text>
            <Text className={`text-lg text-text-${colorScheme} mb-4`}>Total Shares
                Value:</Text>
            <View className={`border border-text-dark rounded-lg`}>
                <View
                    className={`flex flex-row justify-between border-b border-dar border-text-${colorScheme} py-2 px-4`}>
                    <Text className={`font-bold text-text-${colorScheme} text-right w-48`}>Date</Text>
                    {transactions[0]?.game &&
                        <Text className={`font-bold text-text-${colorScheme} text-right flex-1`}>Game</Text>}
                    <Text
                        className={`font-bold text-text-${colorScheme} text-right ${transactions[0]?.game ? "w-24" : "flex-1"}`}>Quantity</Text>
                    <Text
                        className={`font-bold text-text-${colorScheme} text-right ${transactions[0]?.game ? "w-24" : "flex-1"}`}>Value</Text>
                    {/* <Text*/}
                    {/*    className={`font-bold text-text-${colorScheme} text-right ${transactions[0].game ? "w-24" : "flex-1"}`}>New*/}
                    {/*    Total</Text> */}
                </View>
                {transactions.map((transaction, index) => (
                    <View className={`flex flex-row justify-between border-b border-${colorScheme}-300 py-2 px-4`}
                          key={index}>
                        <Text
                            className={`text-text-${colorScheme} text-right w-48`}>{transaction.date.toDateString() + " " + transaction.date.toLocaleTimeString()}</Text>
                        {transactions[0]?.game &&
                            <Text className={`text-text-${colorScheme} text-right flex-1`}>{transaction?.game}</Text>}
                        <Text
                            className={`text-text-${colorScheme} text-right ${transactions[0]?.game ? "w-24" : "flex-1"}`}>{transaction.quantity}</Text>
                        <Text
                            className={`text-text-${colorScheme} text-right ${transactions[0]?.game ? "w-24" : "flex-1"}`}>{transaction.value}</Text>
                        {/*<Text*/}
                        {/*    className={`text-text-${colorScheme} text-right ${transactions[0].game ? "w-24" : "flex-1"}`}>{transaction.new_total}</Text>*/}
                    </View>
                ))}
            </View>
        </View>
    );
};

export default Transactions;
