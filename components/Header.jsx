import {Text, Pressable} from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/User'
import {Link} from 'expo-router' 

import supabase from '../config/supabaseConfig'

import secondsToTime from '../utils/secondsToTime'

const Header =()=>{
    const {user, setUser} = useContext(UserContext);
    const [currentCredits, setCurrentCredits]=useState(0);
    const [timeOfUpdate, setTimeOfUpdate]= useState(Date.now()/1000);
    const [displayTime, setDisplayTime]=useState('');
    const [isLoggedIn, setIsLoggedIn]=useState(true);


    const fetchUpdateTime = async () => {
        const { data, error } = await supabase
            .from('stats')
            .select("next_update")
            .order("id", {ascending:false})
            .limit(1).
            single();
            console.log("Returned time",(data.next_update))
            console.log("Returned time",(new Date(data.next_update).getTime())/1000)
            // if(error!==null){
            //     fetchUpdateTime();
            // }
            
            
            const timeInSeconds=Math.floor((new Date(data.next_update).getTime())/1000)
            setTimeOfUpdate(timeInSeconds)
            //return data
    };



useEffect(()=>{

    console.log("Header ",user)
    if (Object.keys(user).length>0){
        setIsLoggedIn(true)
    }
    fetchUpdateTime();

},[user])

const callDisplay=async ()=>{
    // const timeNow=Date.now()/1000;
    // console.log("callDow update",timeNow)
    // console.log("callDis update",timeOfUpdate)
    // const timeLeft=Math.floor(timeOfUpdate-timeNow)
    // if(timeLeft===0 ){
    //     await fetchUpdateTime();
    // }else{
    //     setDisplayTime(secondsToTime(Math.floor(timeLeft)))
    // }
    fetchUpdateTime();
    console.log("Now",Date.now()/1000)
}


useEffect(()=>{
    const interval =setInterval(callDisplay,1000);
    return ()=> clearInterval(interval);
},[displayTime])

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