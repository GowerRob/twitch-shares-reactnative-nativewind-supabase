import {Slot} from "expo-router";
import Header from "../components/Header";
import {UserProvider} from "../context/User";
import Toast from "react-native-toast-message";

const Layout = () => {
    return (
        <>
            <UserProvider>
                <Header/>
                <Slot/>
            </UserProvider>
            <Toast/>
        </>
    );

    // return <Stack />
};


export default Layout;

