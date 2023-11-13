import { useContext, useEffect, useState } from 'react'
import { FlatList, Pressable, Text , View} from 'react-native'
import LeagueCard from './LeagueCard'
import { UserContext } from '../../context/User'
import {router} from 'expo-router' 
import { fetchLeagues, fetchPlayerPortfolio, fetchUserLeagues } from '../../api/api'
import { NativeWindStyleSheet } from "nativewind";

const DisplayLeagues = () => {
    const [leagues, setLeagues] = useState([])
    const [userLeagues, setUserLeagues] = useState([])
    const [leagueData,setLeagueData] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const {user} = useContext(UserContext)
    const colorScheme = "dark";
    useEffect(()=>{
        fetchPlayerPortfolio(setLeagueData)
        fetchUserLeagues(setUserLeagues,user)
        fetchLeagues(setLeagues)
        setIsloading(false)
    },[])
    
    if(isLoading) return <Text>Loading ...</Text>

    return (<>

<View className={`rounded-lg p-4 bg-background-${colorScheme}`}>
        <View className={`border border-text-dark rounded-lg`}>
        <FlatList
            data={leagues}
            renderItem={({item})=>{
                return <Pressable
                onPress={()=>{router.push({pathname: `/leaguepage/${item.league_id}`})}}>
                    <LeagueCard leagueItem={item} userLeagues={userLeagues} leagueData={leagueData}/></Pressable>
            }}
            keyExtractor={item=>item.league_id}>
        </FlatList>
        </View>
    </View>
    </>)
 }

export default DisplayLeagues