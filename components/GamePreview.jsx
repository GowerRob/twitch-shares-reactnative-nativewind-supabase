import React, {useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal
} from "react-native";
import {NativeWindStyleSheet} from "nativewind";
import {
    VictoryArea,
    VictoryAxis,
    VictoryChart, VictoryLabel,
    VictoryTheme,
    VictoryTooltip,
    VictoryVoronoiContainer
} from "victory-native";
import BuySell from "./BuySell";

NativeWindStyleSheet.setOutput({});

const PopupModal = ({visible, children, closeModal}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={closeModal}
        >
            <View style={{
                minWidth: "200px",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)"
            }}>
                {children}
            </View>
        </Modal>
    );
};

function numberWithCommas(x = 0) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const GamePreview = ({game, user_info, value_history}) => {
    const {game_name, value, cover_url, game_id} = game;
    const {shares_owned} = user_info;
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    const colorScheme = "dark";
    return (
        <View className={`flex-row rounded-lg m-4 bg-background-dark`}>
            <Image
                source={{uri: cover_url.replace("{width}", "450").replace("{height}", "600")}}
                style={{width: 150, height: "100%", resizeMode: "cover", borderRadius: 10}}
            />
            <View className={`flex-1 justify-evenly flex-grow rounded m-4`}>
                <Text className={`text-xl text-text-dark font-bold mb-2`}>{game_name}</Text>
                <Text className={`text-sm text-text-dark`}>Value: {numberWithCommas(value)}</Text>
                <Text className={`text-sm text-text-dark`}>Shares owned: {numberWithCommas(shares_owned)}</Text>
                <Text className={`text-sm text-text-dark`}>Owned value: {numberWithCommas(shares_owned * value)}</Text>
                <View className="flex-row justify-end mt-4">
                    <TouchableOpacity className={`bg-accent-light hover:bg-accent-dark rounded p-2 m-2`}
                                      onPress={openModal}>
                        <Text className="text-white">Buy/Sell</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={`bg-accent-light hover:bg-accent-dark rounded p-2 m-2`}>
                        <Text className="text-white">Game Page</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex-grow m-0 p-0 rounded-lg hidden md:flex">
                <VictoryChart height={90} width={170} theme={VictoryTheme.grayscale} padding={0}>
                    <svg style={{height: 0}}>
                        <defs>
                            <linearGradient id="myGradient1">
                                <stop offset="10%" stopColor="#6441A400"/>
                                <stop offset="100%" stopColor="#6441A4FF"/>
                            </linearGradient>
                            <linearGradient id="myGradient2">
                                <stop offset="20%" stopColor="#6441A400"/>
                                <stop offset="100%" stopColor="#6441A490"/>
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
                            data: {fill: "url(#myGradient2)", stroke: "url(#myGradient1)"}
                        }}
                        data={value_history.map((value) => {
                            return {x: value.time, y: value.value};
                        })}
                    />
                </VictoryChart>
            </View>
            <PopupModal visible={modalVisible} closeModal={closeModal}>
                <BuySell game_id={game_id} value={value} closeModal={closeModal}/>
            </PopupModal>
        </View>
    );
};

export default GamePreview;