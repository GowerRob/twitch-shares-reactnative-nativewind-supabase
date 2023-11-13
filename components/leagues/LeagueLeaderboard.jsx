import { useEffect, useState } from "react"
import { FlatList, Text } from "react-native"

import { fetchPlayerPortfolio } from "../../api/api"

const LeagueLeaderboard = ({league_id}) => {
    const [leagueData,setLeagueData] = useState([])
    const [filteredData,setFilteredData] = useState([])

    useEffect(()=>{
        fetchPlayerPortfolio(setLeagueData)
    },[])
    
    useEffect(()=>{
        const result = leagueData.filter((item)=>{
            let value = false
            item.leagues.forEach((league)=>{
                if(league.league_id=== +league_id){
                    value = true
                }
            })
            return value
        })
        setFilteredData(result)
    },[leagueData])

    const sumLeagueValue = () => {
        let currentValue = 0
            filteredData.forEach((item)=>{
                currentValue += item.portfolio_history[0].total_value
            })
        return currentValue
    }

    return (<>
        <Text>Total Value : {sumLeagueValue()}</Text>
        <FlatList
                data={filteredData}
                renderItem={({item})=>{
                    return <>
                        <Text>{item.username} {item.portfolio_history[0].total_value}</Text>
                    </>
                }}
                keyExtractor={item=>item.id}>
                </FlatList>
    </>)
}

export default LeagueLeaderboard;