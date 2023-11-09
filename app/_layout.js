import {Slot} from 'expo-router'
import Header from '../components/Header'
import { UserProvider } from '../context/User'
import GamePageComp from '../components/GamePageComp'

const Layout = () => {


    return(<>
            <UserProvider>
                <Header />
                <Slot />
                
            </UserProvider>

            </>
        )
    

    // return <Stack />

}

export default Layout