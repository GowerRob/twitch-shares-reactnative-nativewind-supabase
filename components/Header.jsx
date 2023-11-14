import {Text, Pressable, View, Image} from 'react-native'
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
    if(user !== undefined){
        if (Object.keys(user)!== undefined){
        setIsLoggedIn(true)
    }
    fetchUpdateTime()
    }
    ;
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
    <View className={`bg-background-dark flex flex-row justify-around `}>
        <View className="w-1/3">
            <Image className="m-1 w-full" resizeMode='contain' source={require('./twitch.png')}></Image>
        </View>
        
        <View className={`my-center w-1/3`}>
            {isLoggedIn?<Text className={`text-text-dark`}>{user?.username}</Text>:null}
            {isLoggedIn?<Text className={`text-text-dark`}>{user?.credits} Credits</Text>:null}
            {!isLoggedIn?null:<Text className={`text-text-dark`}>{displayTime} until prices update</Text>}
        </View>
  
        
        

        {!isLoggedIn?
        <Link href={`/`} asChild>
                <Pressable 
                className="border bg-accent-dark  my-2 rounded-md">
                <Text className={`text-text-dark my-1 mx-1`}>Login</Text>
                </Pressable>
            </Link>:
        <Link href={`/`} asChild>
                <Pressable 
                className="border bg-accent-dark  my-2 rounded-md"
                onPress={handleSignOut}>
                <Text className={`text-text-dark my-1 mx-1`}>Sign out</Text>
                </Pressable>
            </Link>}
            <Link href={`/leagues`} asChild>
                {/* <Pressable 
                    className="border bg-primary-light text-white my-2"
                >
                <Text>leagues</Text>
                </Pressable> */}
            </Link>
    </View>

)
}

export default Header;