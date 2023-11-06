import {Text} from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/User'

import supabase from '../config/supabaseConfig'

const Header =()=>{
    const {user, setUser} = useContext(UserContext);
    const [currentCredits, setCurrentCredits]=useState(0);



    const fetchUserDetails = async (id) => {
        const {data, error} = await supabase
            .from("profiles")
            .select("*")
            .eq("id", id)
            .maybeSingle();
        setCurrentCredits(data.credits);
        return data;
    };

useEffect(()=>{
    if(Object.keys(user).length>0){
        fetchUserDetails(user.id)
    }
    

},[user])


return(
    <>
        <Text className="text-5xl mb-8">Twitch Shares</Text>
        <Text>Credits:  {currentCredits}</Text>
    </>

)
}

export default Header;