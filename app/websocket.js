import {FlatList, Text, View} from "react-native";
import socket from "../socket";
import {useEffect, useState} from "react";

const websocket = () => {

    const [updateInfo, setUpdateInfo] = useState();
    const [gameInfo, setGameInfo] = useState([]);
    const [messages, setMessages] = useState([]);
    const [oldGameInfo, setOldGameInfo] = useState({});
    useEffect(() => {
        socket.emit("register user", "683673b5-9e7e-46fd-8bd0-30e49867c2ab");
    }, []);

    useEffect(() => {
        socket.on("update", (newUpdateInfo) => {
            setUpdateInfo(newUpdateInfo.times);
            setGameInfo(currentInfo => {
                if (currentInfo !== undefined) {
                    storeOldValues(currentInfo);
                }
                return newUpdateInfo.games;
            });
        });
        socket.on("game_update", (game_info) => {
            setMessages(oldMessages => {
                const newMessages = [...oldMessages];
                newMessages.push("game_update: " + JSON.stringify(game_info));
                return newMessages;
            });
        });
    }, [socket]);

    function storeOldValues(currentInfo) {
        const currentGameInfo = {};
        for (let i = 0; i < currentInfo.length; i++) {
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
