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
    
    return (
    
    <View className='border-solid border-4 border-accent-dark  my-5 mx-3 flex flex-column w-90 rounded-md'>
        <Text className='text-text-dark text-center text-xl my-2 border-solid border-2 border-primary-dark font-bold mx-2 rounded-lg'>{leagueItem.league_name} </Text>
        <View className='flex flex-row justify-evenly mb-2'>
            <Text className={`text-text-dark`}>{peopleCount} Members</Text>
            <Text className={`text-text-dark`}>{sumLeagueValue()} credits in combined assets</Text>
        </View>
        
        <View>
        {inLeague?null:<Pressable
            className="border bg-primary-dark text-white my-2 mx-3 rounded-md"
            onPress={handleJoinLeague}>
            <Text className={`text-text-dark text-center`}>Join League</Text>
        </Pressable>}
        </View>
    </View>)
}

export default LeagueCard