import {Slot} from "expo-router";
import Header from "../components/Header";
import {UserProvider} from "../context/User";
import {ToastProvider} from "react-native-toast-notifications";

const Layout = () => {
    return (
        <>
            <ToastProvider>
                <UserProvider>
                    <Header/>
                    <Slot/>
                </UserProvider>
            </ToastProvider>
        </>
    );

    // return <Stack />
};


export default Layout;

