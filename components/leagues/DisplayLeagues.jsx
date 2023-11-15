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
    
    const callCreateLeague=()=>{
        router.push(`create`)

    }

    if(isLoading) return <Text>Loading ...</Text>

    return (<>

<View className={`p-4 bg-background-dark id-outerView`}>
        <View className="flex flex-row justify-end mb-4">
            <Pressable 
                className="rounded-full px-3 bg-accent-light font-bold w-1/3"
                onPress={callCreateLeague}>
                <Text className="text-white text-xl font-bold text-center">Create League</Text>
            </Pressable>

        </View>


        <View className={`bg-secondary-dark rounded-lg flex flex-column items-center id-innerView`}>
        <FlatList
        className={`w-4/5`}
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