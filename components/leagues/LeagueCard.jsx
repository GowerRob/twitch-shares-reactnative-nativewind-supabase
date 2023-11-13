import { useContext, useEffect, useState } from "react"
import { Pressable, Text, View } from "react-native"
import { UserContext } from "../../context/User"

import supabase from "../../config/supabaseConfig"

const LeagueCard = ({leagueItem, userLeagues,leagueData}) => {
    const {user} = useContext(UserContext)
    const [inLeague,setInLeague] = useState(false)
    const [peopleCount, setPeopleCount] = useState(0)

    useEffect(()=>{
        if(!inLeague){
            const checkInLeague = userLeagues.includes(leagueItem.league_id)
            setInLeague(checkInLeague)
        }
        countPeople()
        sumLeagueValue()
        
    },[inLeague])

    const countPeople = async () => {
        const {data,error} = await supabase
        .from('user_leagues')
        .select("*")
        .eq('league_id', leagueItem.league_id)
        if(data !==null){
            const numOfPeople = data.length
            setPeopleCount(numOfPeople)
        }
        
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

    const sumLeagueValue = () => {
        let currentValue = 0
        leagueData.forEach((user)=>{
            user.leagues.forEach((league)=>{
                if(league.league_id === leagueItem.league_id){
                    currentValue += user.portfolio_history[0].total_value
                }
            })      
        })
        return currentValue
    }
    
    return (<View className='border bg-background-light my-5 mx-3'>
        <Text>League Name : {leagueItem.league_name} </Text>
        <Text>Number of people in league : {peopleCount}</Text>
        <Text>Total Value : {sumLeagueValue()}</Text>
        {/* Vistory Graph */}




        {inLeague?null:<Pressable
            className="border bg-primary-light text-white my-2"
            onPress={handleJoinLeague}>
            <Text>Join League</Text>
        </Pressable>}
    </View>)
}

export default LeagueCard