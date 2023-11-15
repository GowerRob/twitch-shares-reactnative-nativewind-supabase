import {Text, Pressable, View, Image} from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/User'
import {Link,usePathname} from 'expo-router' 
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
})

import supabase from '../config/supabaseConfig'

import secondsToTime from '../utils/secondsToTime'

const HeaderComponent =()=>{
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
    if(user?.id !== undefined){
        if (Object.keys(user).length!==0){
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


const loginDisplay=()=>{
    
    const url=usePathname();
    
    if(isLoggedIn){

        return(            
        <Link href={`/`} asChild>
            <Pressable 
            className="border bg-accent-dark  my-2 rounded-md"
            onPress={handleSignOut}>
            <Text className={`text-white my-1 mx-1 p-1`}>Sign out</Text>
            </Pressable>
        </Link> )
    }else{
        if(url==='/login'){
            return null
        }else{
        return <Link href={`/login`} asChild>
            <Pressable 
            className={` bg-accent-light rounded p-2 m-2`}>
            <Text className={`text-white`}>Login</Text>
            </Pressable>
        </Link> 

        }
    }

}



return(
<>

        <View 
        className={`bg-background-dark flex flex-row justify-between `}>
            <View className="w-1/3  ">
                <Image className="m-1 w-full  h-20" resizeMode='contain' source={require('./twitchFinal.png')}></Image>
            </View>
            <View className="flex flex-row w-2/3 pr-2 justify-end items-center ">
                <View className={`my-center w-2/3 mr-3 flex flex-col items-end`}>
                    {isLoggedIn?<Text className={`text-text-dark font-bold text-lg`}>{user?.username}</Text>:null}
                    {isLoggedIn?<Text className={`text-text-dark`}>{user?.credits} Credits</Text>:null}
                    {!isLoggedIn?null:<Text className={`text-text-dark`}>New Prices:{displayTime} </Text>}
                </View>
    

                {loginDisplay()}


            </View>


        </View>
        </>
)
}

export default HeaderComponent;