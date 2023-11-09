import { useContext, useEffect, useState } from 'react'
import { FlatList, Pressable } from 'react-native'
import LeagueCard from './LeagueCard'
import { UserContext } from '../../context/User'
import {router} from 'expo-router' 
import { fetchLeagues, fetchPlayerPortfolio, fetchUserLeagues } from '../../api/api'

const DisplayLeagues = () => {
    const [leagues, setLeagues] = useState([])
    const [userLeagues, setUserLeagues] = useState([])
    const [leagueData,setLeagueData] = useState([])
    const {user} = useContext(UserContext)
 
    useEffect(()=>{
        fetchPlayerPortfolio(setLeagueData)
        fetchUserLeagues(setUserLeagues,user)
        fetchLeagues(setLeagues)
    },[])  

    return (<>
        <FlatList
            data={leagues}
            renderItem={({item})=>{
                return <Pressable
                onPress={()=>{router.push({pathname: `/leaguepage/${item.league_id}`})}}>
                    <LeagueCard leagueItem={item} userLeagues={userLeagues} leagueData={leagueData}/></Pressable>
            }}
            keyExtractor={item=>item.league_id}>
        </FlatList>
    </>)
 }

export default DisplayLeagues