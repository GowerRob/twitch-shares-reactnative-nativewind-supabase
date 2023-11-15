import {Slot} from "expo-router";
import Header from "../components/Header";
import {UserContext, UserProvider} from "../context/User";
import Toast from "react-native-toast-message";
import {useContext, useEffect, useState} from "react";
import socket from "../socket";
import supabase from "../config/supabaseConfig";
import Footer from "../components/Footer";

import { View } from "react-native";

const Layout = () => {

    const [toastQueue, setToastQueue] = useState([]);
    useEffect(() => {
        const fetchCurrentUser = async () => {
            const {data} = await supabase.auth.getSession();
            return data.session.user;
        };
        fetchCurrentUser().then(user => {
            if (user) {
                socket.emit("register user", user.id);
            }
        });
    }, []);

    useEffect(() => {
        if (toastQueue.length > 0) {
            const toastInfo = toastQueue[0];
            toastInfo.onHide = onToastHide;
            Toast.show(toastInfo);
        }
    }, [toastQueue]);

    const addToastToQueue = (toast, front = false) => {
        setToastQueue(currentQueue => {
            const newQueue = [...currentQueue];
            if (front) {
                newQueue.unshift(toast);
            } else {
                newQueue.push(toast);
            }
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
    useEffect(() => {
        socket.on("update", (newUpdateInfo) => {
            addToastToQueue({
                type: "success",
                text1: `Prices updated!`,
                text2: `Next update at ${new Date(newUpdateInfo.times.nextUpdate).toLocaleTimeString()}`
            }, true);
        });
        socket.on("game_update", (game_info) => {
            addToastToQueue({
                type: "info",
                text1: `Price update for ${game_info.game.name}`,
                text2: `New price: ${game_info.game.viewer_count}`
            });
        });
    }, [socket]);


    return(<>
        <UserProvider>
            <Header />
            <View className={`mt-10 py-20 h-full bg-background-dark`}>
                <Slot />
            </View>

            <Footer />
        </UserProvider>
    </>)
}

export default Layout;

