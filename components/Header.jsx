import {Text, Pressable} from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/User'
import {Link} from 'expo-router' 

import supabase from '../config/supabaseConfig'

import secondsToTime from '../utils/secondsToTime'

const Header =()=>{
    const {user, setUser} = useContext(UserContext);
    const [timeOfUpdate, setTimeOfUpdate]= useState(Date.now()/1000);
    const [displayTime, setDisplayTime]=useState('');
    const [isLoggedIn, setIsLoggedIn]=useState(false);
    const [count,setCount] = useState(0)


    const fetchUpdateTime = async () => {
        const { data, error } = await supabase
            .from('stats')
            .select("next_update")
            .order("id", {ascending:false})
            .limit(1).
            single();
            const timeInSeconds=Math.floor((new Date(data.next_update).getTime())/1000)
            const currentDate=Math.ceil(Date.now()/1000)
            if(currentDate>=timeInSeconds){
                setTimeout(fetchUpdateTime,10000)
                
            }else{
                setTimeOfUpdate(timeInSeconds)
            }
            
    };



useEffect(()=>{
    if (Object.keys(user).length>0){
        setIsLoggedIn(true)
    }
    fetchUpdateTime();
},[user])

const callDisplay=()=>{
    const timeNow=Date.now()/1000
    const timeLeft=Math.floor(timeOfUpdate-timeNow)
    if(timeLeft===0 ){
        fetchUpdateTime();
    }else{
        setDisplayTime(secondsToTime(timeLeft))
        setCount(timeLeft)
    }
}


useEffect(()=>{
    const interval =setInterval(callDisplay,1000);
    return ()=> clearInterval(interval);
},[count])

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