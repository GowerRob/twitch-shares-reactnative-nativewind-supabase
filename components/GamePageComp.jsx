import { Text, View, Image } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/User"
import { fetchGameInfo, fetchCurrentInvestedGame } from "../Utils"

export default function GamePageComp(){
    const {game_id} = useLocalSearchParams('game_id')
    const {user, setUser} = useContext(UserContext)
    const [currentGame, setCurrentGame] = useState({})

    useEffect(()=>{
        fetchGameInfo(game_id, user.id)
        .then((data)=>{
            data.cover_url = data.cover_url.replace(/{width}/, 200).replace(/{height}/, 300)
            setCurrentGame(data)
        })
        
    }, [game_id])
    
    return (
        <View>
        <Text>{currentGame.game_name} share price: {currentGame.value}</Text>
        <Text>You own {currentGame.quantity} shares in {currentGame.game_name}</Text>
        <Image style={{width: 200, height: 300}}
        source={{uri: currentGame.cover_url}}
        />
        </View>
    )
}