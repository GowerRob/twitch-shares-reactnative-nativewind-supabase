import { useContext, useEffect, useState } from "react"
import { Pressable, Text, View } from "react-native"
import { UserContext } from "../../context/User"

import supabase from "../../config/supabaseConfig"

const LeagueCard = ({leagueItem, userLeagues}) => {
    const {user} = useContext(UserContext)
    const [inLeague,setInLeague] = useState(false)
    const [peopleCount, setPeopleCount] = useState(0)

    useEffect(()=>{
        if(!inLeague){
            const checkInLeague = userLeagues.includes(leagueItem.league_id)
            setInLeague(checkInLeague)

        }
        
        countPeople()
    },[inLeague])

    const countPeople = async () => {
        const {data,error} = await supabase
        .from('user_leagues')
        .select("*")
        .eq('league_id',leagueItem.league_id)
        const numOfPeople = data.length
        setPeopleCount(numOfPeople)
    }

    const handleJoinLeague = async () => {
        const {error} = await supabase
        .from('user_leagues')
        .insert({
            user_id:user.id,
            league_id:leagueItem.league_id
        });
        setInLeague(true);
    }
    
    return (<View className='border bg-background-light my-5 mx-3'>
        <Text>League Name : {leagueItem.league_name} </Text>
        <Text>Number of people in league : {peopleCount}</Text>
        {!inLeague&&<Pressable
            className="border bg-primary-light text-white my-2"
            onPress={handleJoinLeague}>
            <Text>Join League</Text>
        </Pressable>}
    </View>)
}

export default LeagueCard