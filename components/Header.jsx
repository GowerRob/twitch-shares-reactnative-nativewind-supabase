import {Text} from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/User'

import supabase from '../config/supabaseConfig'

import secondsToTime from '../utils/secondsToTime'

const Header =()=>{
    const {user, setUser} = useContext(UserContext);
    const [currentCredits, setCurrentCredits]=useState(0);
    const [timeOfUpdate, setTimeOfUpdate]= useState(0);

    const fetchUserDetails = async (id) => {
        const {data, error} = await supabase
            .from("profiles")
            .select("*")
            .eq("id", id)
            .maybeSingle();
            if(user.id!==data.id){
               setUser(data) 
            setCurrentCredits(data.credits);   
            }
        
        console.log(data);
        return data;
    };

    const fetchUpdateTime = async () => {
        const { data, error } = await supabase
            .from('stats')
            .select("next_update")
            .order("id", {ascending:false})
            .limit(1).
            single();
            
            //console.log("Time",data.next_update)
            const timeInSeconds=(new Date(data.next_update).getTime())
            console.log(typeof timeInSeconds)
            console.log(timeInSeconds)

            setTimeOfUpdate(timeInSeconds);
            //const timePhrase=(secondsToTime(((new Date(data.next_update).getTime()) - Date.now())/1000));
            //setTimeToUpdate(time);

            return data
    };

    const decTime=()=>{

        // const temp=timeToUpdate-1;

        // setTimeToUpdate(temp)
            }

    setInterval(decTime, 1000)


useEffect(()=>{
    if(Object.keys(user).length>0){
        fetchUserDetails(user.id)
    }
    fetchUpdateTime();


},[user])


return(
    <>
        <Text className="text-5xl mb-8">Twitch Shares</Text>
        <Text>Credits:  {currentCredits}</Text>
        <Text>Time to update:  {timeOfUpdate}</Text>
    </>

)
}

export default Header;