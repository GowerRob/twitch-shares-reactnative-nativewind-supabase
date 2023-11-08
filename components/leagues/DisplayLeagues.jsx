import { useContext, useEffect, useState } from 'react'
import supabase from '../../config/supabaseConfig'
import { FlatList } from 'react-native'
import LeagueCard from './LeagueCard'
import { UserContext } from '../../context/User'

const DisplayLeagues = () => {
    const [leagues, setLeagues] = useState([])
    const [userLeagues, setUserLeagues] = useState([])
    const {user} = useContext(UserContext)


    const fetchLeagues = async () => {
        const {data,error} = await supabase
        .from('leagues')
        .select("*")
        setLeagues(data)
    }

    const fetchUserLeagues = async () => {
        const {data,error} = await supabase
        .from('user_leagues')
        .select("*")
        .eq('user_id',user.id)
        console.log(data)
        
        if(data!==null){
            const leagueIds = data.map((league)=>{
            return league.league_id
        })
        setUserLeagues(leagueIds)
        }
        
    }

    useEffect(()=>{
        fetchLeagues()
        fetchUserLeagues()
    },[])

    return (<>
        <FlatList
            data={leagues}
            renderItem={({item})=>{
                return <LeagueCard leagueItem={item} userLeagues={userLeagues}/>
            }}
            keyExtractor={item=>item.league_id}>
        </FlatList>
    </>)
}

export default DisplayLeagues