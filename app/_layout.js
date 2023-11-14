import {Slot} from 'expo-router'
import Header from '../components/Header'
import { UserProvider } from '../context/User'
import Footer from '../components/Footer'

import { View } from 'react-native'

const Layout = () => {


    return(<>
            <UserProvider>
                <Header />
                <View className={`py-20 h-full bg-background-dark`}>
                    <Slot />
                </View>
                
                <Footer />
            </UserProvider>

            </>
        )
    

    // return <Stack />

}

export default Layout