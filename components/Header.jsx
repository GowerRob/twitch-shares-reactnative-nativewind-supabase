import {Text, Pressable} from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/User'
import {Link} from 'expo-router' 

import supabase from '../config/supabaseConfig'

import secondsToTime from '../utils/secondsToTime'

const Header =()=>{
    const {user, setUser} = useContext(UserContext);
    const [timeOfUpdate, setTimeOfUpdate]= useState(Date.now()/1000);
    const [displayTime, setDisplayTime]=useState(0);
    const [isLoggedIn, setIsLoggedIn]=useState(true);


    const fetchUpdateTime = async () => {
        const { data, error } = await supabase
            .from('stats')
            .select("next_update")
            .order("id", {ascending:false})
            .limit(1).
            single();

        return
    };



useEffect(()=>{
    if (Object.keys(user).length>0){
        setIsLoggedIn(true)
    }
    fetchUpdateTime();
    console.log


},[user])



// useEffect(()=>{
//     const interval =setInterval(func,10000);
//     return ()=> clearInterval(interval);
// },[displayTime])

const handleSignOut = () =>{
    setUser({});
    setIsLoggedIn(false)
}

return(
    <>
        <Text className="text-5xl mb-8">Twitch Shares</Text>
        {isLoggedIn?<Text>Credits:  {user.credits}</Text>:null}
        {isLoggedIn?<Text>Username:  {user.username}</Text>:null}
        {!isLoggedIn?null:<Text>Time to update: {displayTime}</Text>}

        {!isLoggedIn?null:<Link href={`/`} asChild>
                <Pressable 
                className="border bg-primary-light text-white my-2"
                onPress={handleSignOut}>
                <Text>Sign out</Text>
                </Pressable>
            </Link>}
    </>

)
}

export default Header;