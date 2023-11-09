import React, {useState} from "react";
import {
    View,
    Text, TouchableOpacity, TextInput,
} from "react-native";
import {NativeWindStyleSheet} from "nativewind";

NativeWindStyleSheet.setOutput({});

function numberWithCommas(x = 0) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const BuySell = ({game_id, value = 50, closeModal}) => {

    const [selectedOption, setSelectedOption] = useState("BUY");
    const [quantity, setQuantity] = useState(0);
    const currentValue = value * quantity;
    const totalValue = selectedOption === "BUY" ? currentValue : -currentValue;

    const adjustQuantity = (amount) => {
        const newQuantity = parseInt(quantity) + amount;
        setQuantity(Math.max(newQuantity, 0));
    };
    const colorScheme = "dark";

    return (
        <View className="rounded-lg m-4 bg-background-dark">
            <View className="flex-row justify-between">
                <TouchableOpacity
                    className={`${selectedOption === "BUY" ? "border-b-4 border-accent-light" : "border-b"} flex-1 text-center py-2`}
                    onPress={() => setSelectedOption("BUY")}
                >
                    <Text className="text-text-dark text-center">BUY</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`${selectedOption === "SELL" ? "border-b-4 border-accent-light" : "border-b"} flex-1 text-center py-2`}
                    onPress={() => setSelectedOption("SELL")}
                >
                    <Text className="text-text-dark text-center">SELL</Text>
                </TouchableOpacity>
            </View>
            <View className="sm:flex-col md:flex-row md:justify-between md:items-center md:mt-4">
                <View className="flex-row justify-between items-center mt-4 flex-1 flex-grow">
                    <TouchableOpacity className="p-2 rounded-l-lg border-white border flex-1 min-w-[70px]"
                                      onPress={() => adjustQuantity(-100)}>
                        <Text numberOfLines={1} className="text-text-dark text-center ">-100</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 border-white border-t border-b flex-1 min-w-[70px]"
                                      onPress={() => adjustQuantity(-10)}>
                        <Text className="text-text-dark text-center">-10</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 rounded-r-lg border-white border flex-1 min-w-[70px]"
                                      onPress={() => adjustQuantity(-1)}>
                        <Text className="text-text-dark text-center">-1</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    className="border-b-2 flex flex-shrink border-gray-300 p-2 mt-4 text-text-dark mx-2"
                    placeholder="Quantity"
                    keyboardType="numeric"
                    value={quantity}
                    onChangeText={text => setQuantity(+text.replace(/[^0-9]/g, ""))}
                />
                <View className="flex-row justify-between items-center mt-4 flex-1 flex-grow">
                    <TouchableOpacity className="p-2 rounded-l-lg border-white border flex-1 min-w-[70px]"
                                      onPress={() => adjustQuantity(1)}>
                        <Text className="text-text-dark text-center">+1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 border-white border-t border-b flex-1 min-w-[70px]"
                                      onPress={() => adjustQuantity(10)}>
                        <Text className="text-text-dark text-center">+10</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 rounded-r-lg border-white border flex-1 min-w-[70px]"
                                      onPress={() => adjustQuantity(100)}>
                        <Text className="text-text-dark text-center">+100</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="px-2">
                <Text className="text-text-dark mt-2">
                    Current Value: {numberWithCommas(currentValue)}
                </Text>
                <Text className="text-text-dark mt-2">
                    Total Value: {numberWithCommas(totalValue)}
                </Text></View>
            <View className="flex-row justify-between">
                {closeModal &&
                    <TouchableOpacity className="bg-accent-light p-2 mt-4 flex-grow border-r rounded-bl-lg"
                                      onPress={closeModal}>
                        <Text className="text-white text-center">Cancel Transaction</Text>
                    </TouchableOpacity>}
                <TouchableOpacity
                    className={`bg-accent-light p-2 mt-4 flex-grow border-l ${closeModal ? "" : "rounded-bl-lg"} rounded-br-lg`}>
                    <Text className="text-white text-center">Confirm Transaction</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BuySell;
