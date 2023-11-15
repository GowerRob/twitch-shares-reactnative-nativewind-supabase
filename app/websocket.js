import {Button, FlatList, Text, View} from "react-native";
import socket from "../socket";
import {useEffect, useState} from "react";
import Toast from "react-native-toast-message";

const websocket = () => {

    const [updateInfo, setUpdateInfo] = useState();
    const [gameInfo, setGameInfo] = useState([]);
    const [messages, setMessages] = useState([]);
    const [oldGameInfo, setOldGameInfo] = useState({});
    const [toastQueue, setToastQueue] = useState([]);
    useEffect(() => {
        socket.emit("register user", "683673b5-9e7e-46fd-8bd0-30e49867c2ab");
    }, []);

    useEffect(() => {
        console.log("toast queue updated");
        if (toastQueue.length > 0) {
            const toastInfo = toastQueue[0];
            toastInfo.onHide = onToastHide;
            console.log(`Showing ${JSON.stringify(toastInfo)}`);
            Toast.show(toastInfo);
        }
    }, [toastQueue]);

    const addToastToQueue = (toast) => {
        console.log("adding toast");
        setToastQueue(currentQueue => {
            const newQueue = [...currentQueue];
            newQueue.push(toast);
            return newQueue;
        });
    };

    const onToastHide = () => {
        setTimeout(function () {
            setToastQueue(currentQueue => {
                const newQueue = [...currentQueue];
                newQueue.shift();
                return newQueue;
            });
        }, 1000);
    };

    const showToast = () => {
        addToastToQueue({
            type: "success",
            text1: "Hello",
            text2: `This is some something number ${toastQueue.length}👋`
        });
    };
    useEffect(() => {
        socket.on("update", (newUpdateInfo) => {
            addToastToQueue({
                type: "success",
                text1: `Prices updated!`,
                text2: `Next update at ${new Date(newUpdateInfo.times.nextUpdate).toLocaleTimeString()}`
            });
            setUpdateInfo(newUpdateInfo.times);
            setGameInfo(currentInfo => {
                if (currentInfo !== undefined) {
                    storeOldValues(currentInfo);
                }
                return newUpdateInfo.games;
            });
        });
        socket.on("game_update", (game_info) => {
            addToastToQueue({
                type: "info",
                text1: `Price update for ${game_info.game.name}`,
                text2: `New price: ${game_info.game.viewer_count}`
            });
            setMessages(oldMessages => {
                const newMessages = [...oldMessages];
                newMessages.push("game_update: " + JSON.stringify(game_info));
                return newMessages;
            });
        });
        socket.onAny((event_name, content) => {
            console.log("update received");
        });
    }, [socket]);

    function storeOldValues(currentInfo) {
        console.log("Storing old values");
        const currentGameInfo = {};
        for (let i = 0; i < currentInfo.length; i++) {
            console.log(`Setting ${currentInfo[i].game_id} to ${currentInfo[i].value}`);
            currentGameInfo[currentInfo[i].game_id] = currentInfo[i].value;
        }
        setOldGameInfo(currentGameInfo);
    }

    return (<>
            <Text>Websocket
                Test</Text>{updateInfo &&
                            <Text>{`Update received at ${new Date(updateInfo.updateTime).toISOString()}. Next update at ${new Date(updateInfo.nextUpdate).toISOString()}`}</Text>}
            <FlatList
                data={gameInfo}
                keyExtractor={(item) => item.game_id.toString()}
                renderItem={({item}) => (
                    <View style={{flexDirection: "row", padding: 10}}>
                        <Text style={{flex: 1}}>{item.game_id}</Text>
                        <Text style={{flex: 1}}>{item.game_name}</Text>
                        <Text
                            style={{flex: 1}}>{oldGameInfo && oldGameInfo[item.game_id] ? oldGameInfo[item.game_id] : "N/A"}</Text>
                        <Text
                            style={{flex: 1}}>{oldGameInfo && oldGameInfo[item.game_id] ? (oldGameInfo[item.game_id] < item.value ? "↗️" : (oldGameInfo[item.game_id] < item.value ? "↘️" : "➡️")) : "➡️"}{item.value}</Text>
                    </View>
                )}
                ListHeaderComponent={() => (
                    <View style={{flexDirection: "row", padding: 10, backgroundColor: "lightgray"}}>
                        <Text style={{flex: 1, fontWeight: "bold"}}>ID</Text>
                        <Text style={{flex: 1, fontWeight: "bold"}}>Name</Text>
                        <Text style={{flex: 1, fontWeight: "bold"}}>Previous Value</Text>
                        <Text style={{flex: 1, fontWeight: "bold"}}>Value</Text>
                    </View>
                )}
            />
            {messages.map(message => <Text>{message}</Text>)}
        </>

    );

};

export default websocket;
