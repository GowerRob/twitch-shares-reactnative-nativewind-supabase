import { useEffect, useState } from "react"
import { FlatList, Text,View } from "react-native"
import { NativeWindStyleSheet } from "nativewind";

import { fetchPlayerPortfolio, fetchlastPlayerPortfolio } from "../../api/api"

const LeagueLeaderboard = ({league_id}) => {
    const [leagueData,setLeagueData] = useState([])
    const [filteredData,setFilteredData] = useState([])
    const [lastLeague, setLastLeague] = useState([])
    const colorScheme = "dark";
    useEffect(()=>{
        fetchPlayerPortfolio(setLeagueData)
        fetchlastPlayerPortfolio(setLastLeague)
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
                currentValue += (item.portfolio_history[0].total_value+item.portfolio_history[0].credits)
            })
        return currentValue
    }

   

    return (<>
    
        

 <View className={`bg-background-${colorScheme} h-full w-full flex justify-center items-center`}>
      <View className={"w-full max-w-4xl h-full"}>
        {/* <Text className="text-white font-bold text-2xl p-2">
            Total Value : {sumLeagueValue()}</Text> */}
            <Text className="text-white font-bold text-xl">Current League</Text>

    <View className={`rounded-lg p-4 m-4 bg-background-${colorScheme}`}>
        <View className={`border border-text-dark rounded-lg`}>
            {/* Headers */}
            <View
                 className={`flex flex-row  border-b border-text-${colorScheme} py-2 px-4`}
          
                >
                <Text
                    className={`font-bold text-text-${colorScheme} basis-1/4 text-left w-24`}
        
                >
                    League Position
                </Text>
                <Text
                    className={`font-bold text-text-${colorScheme} basis-1/4 text-left w-48`}
                >
                    Username
                </Text>
                <Text
                    className={`font-bold text-text-${colorScheme} basis-1/4 text-right w-48`}
                >
                    Portfolio Value
                </Text>
                <Text
                    className={`font-bold text-text-${colorScheme} basis-1/4 text-right w-48`}
                >
                    % change
                </Text>
            </View>
            {/* Data */}
            {filteredData.map((item, index)=>(
                <View             
                className={`flex flex-row border-b border-${colorScheme}-300 py-2 px-4`}
                key={index}>
                    <Text
                     className={`text-text-${colorScheme}  basis-1/4 text-left w-24 `}
                    >
                        {index+1}
                    </Text>
                    <Text className={`text-text-${colorScheme} basis-1/4 text-left w-48`}>
                        {item.username}
                    </Text>
                    <Text
                    className={`text-text-${colorScheme} text-right basis-1/4 w-48}`}
                    >
                        {item.portfolio_history[0].total_value + item.portfolio_history[0].credits}
                    </Text>
                    <Text
                    className={`text-text-${colorScheme} text-right basis-1/4 w-48}`}
                    >
                        {(item.portfolio_history[1].total_value)!==undefined
                        ?(100*(((item.portfolio_history[0].total_value+item.portfolio_history[0].credits)-(item.portfolio_history[1].total_value+item.portfolio_history[1].credits))/(item.portfolio_history[0].total_value+item.portfolio_history[0].credits))).toFixed(2) 
                        : "0.00"} %
                    </Text>

                </View>
            ))}
        </View>

    </View>
    <Text className="text-white font-bold text-xl">Last Weeks League</Text>
    <View className={`rounded-lg p-4 m-4 bg-background-${colorScheme}`}>
        <View className={`border border-text-dark rounded-lg`}>
            {/* Headers */}
            <View
                 className={`flex flex-row  border-b border-text-${colorScheme} py-2 px-4`}
          
                >
                <Text
                    className={`font-bold text-text-${colorScheme} basis-1/4 text-left w-24`}
        
                >
                    League Position
                </Text>
                <Text
                    className={`font-bold text-text-${colorScheme} basis-1/4 text-left w-48`}
                >
                    Username
                </Text>
                <Text
                    className={`font-bold text-text-${colorScheme} basis-1/4 text-right w-48`}
                >
                    Portfolio Value
                </Text>
                <Text
                    className={`font-bold text-text-${colorScheme} basis-1/4 text-right w-48`}
                >
                    % change
                </Text>
            </View>
            {/* Data */}
            {lastLeague.map((item, index)=>(
                <View             
                className={`flex flex-row border-b border-${colorScheme}-300 py-2 px-4`}
                key={index}>
                    <Text
                     className={`text-text-${colorScheme}  basis-1/4 text-left w-24 `}
                    >
                        {index+1}
                    </Text>
                    <Text className={`text-text-${colorScheme} basis-1/4 text-left w-48`}>
                        {item.username}
                    </Text>
                    <Text
                    className={`text-text-${colorScheme} text-right basis-1/4 w-48}`}
                    >
                        {item.portfolio_history[0].total_value + item.portfolio_history[0].credits}
                    </Text>
                    <Text
                    className={`text-text-${colorScheme} text-right basis-1/4 w-48}`}
                    >
                        {(item.portfolio_history[1].total_value)!==undefined
                        ?(100*(((item.portfolio_history[0].total_value+item.portfolio_history[0].credits)-(item.portfolio_history[1].total_value+item.portfolio_history[1].credits))/(item.portfolio_history[0].total_value+item.portfolio_history[0].credits))).toFixed(2) 
                        : "0.00"} %
                    </Text>

                </View>
            ))}
        </View>

    </View>

    </View>

</View>
   





    </>)
}

export default LeagueLeaderboard;