import React from "react";
import {
    View,
    Text,
} from "react-native";
import {NativeWindStyleSheet} from "nativewind";

NativeWindStyleSheet.setOutput({});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Transactions = ({data}) => {

    const {total_shares_owned, total_shares_value, transactions} = data;
    const colorScheme = "dark";

    const styles = {
        tableHeader: `font-bold text-text-${colorScheme} text-right flex-1`,
        tableData: `text-text-${colorScheme} text-right flex-1`,
    };

    return (
        <View className={`rounded-lg p-4 m-4 bg-background-${colorScheme}`}>
            <Text className={`text-xl font-bold text-text-dark mb-4`}>Transaction History</Text>
            <Text className={`text-lg text-text-${colorScheme} mb-2`}>Total Shares
                Owned: {numberWithCommas(total_shares_owned)}</Text>
            <Text className={`text-lg text-text-${colorScheme} mb-4`}>Total Shares
                Value: {numberWithCommas(total_shares_value)}</Text>
            <View className={`border border-text-dark rounded-lg`}>
                <View
                    className={`flex flex-row justify-between border-b border-dar border-text-${colorScheme} py-2 px-4`}>
                    <Text className={styles.tableHeader}>Date</Text>
                    <Text className={styles.tableHeader}>Quantity</Text>
                    <Text className={styles.tableHeader}>Value</Text>
                    <Text className={styles.tableHeader}>New Total</Text>
                </View>
                {transactions.map((transaction, index) => (
                    <View className={`flex flex-row justify-between border-b border-${colorScheme}-300 py-2 px-4`}
                          key={index}>
                        <Text
                            className={styles.tableData}>{transaction.date.toDateString() + " " + transaction.date.toLocaleTimeString()}</Text>
                        <Text className={styles.tableData}>{transaction.quantity}</Text>
                        <Text className={styles.tableData}>{numberWithCommas(transaction.value)}</Text>
                        <Text className={styles.tableData}>{transaction.new_total}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default Transactions;
