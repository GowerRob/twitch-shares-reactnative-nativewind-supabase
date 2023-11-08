import { useEffect } from "react"
import { Text } from "react-native"

import supabase from "../../config/supabaseConfig"

const LeagueLeaderboard = ({league_id}) => {

    const fetchLeaguePlayers=async()=>{

        const {data,error} = await supabase
        .from('user_leagues')
        .select(`user_id,
                league_id,
                leagues(league_id,league_name),
                profiles(id,username)`)
        .eq('league_id',league_id)
        console.log(data)
    }
    
    useEffect(()=>{
        fetchLeaguePlayers();
    })

    return (
        <Text>Nothing</Text>
    )
}

export default LeagueLeaderboard;