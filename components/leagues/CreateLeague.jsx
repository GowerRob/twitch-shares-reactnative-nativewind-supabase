import { useState } from "react"
import { Pressable, TextInput, Text, View } from "react-native"
import { router } from "expo-router"

import supabase from '../../config/supabaseConfig'

const CreateLeague = () => {
    const [leagueName, setLeagueName] = useState('')
    const [leagueCreated, setLeagueCreated] = useState(false)
    const [error, setError] = useState('')

    const handleCreateLeague = async () => {
        setError('')
        if(leagueName.trim()){
            const {error} = await supabase
            .from('leagues')
            .insert({league_name:leagueName.trim()})
            setLeagueCreated(true)
            const timer =  setTimeout(() => {
                router.push(`leagues`)
            }, 2000)
             return () => clearTimeout(timer);

        }else{
            setError('League name must contain at least 1 none whitespace character')
        }
        setLeagueName('')
    }

    return (

    <View className="bg-secondary-dark h-full">
            <View className="bg-background-dark rounded-md flex flex-col mx-10 p-10 mt-10">
        <Text className="text-white font-bold text-xl mb-2">Enter new league name:</Text>
        <TextInput
            className="bg-white border-4 border-solid text-xl border-accent-light rounded-md mb-5"
            placeholder="league name" 
            value={leagueName}
            onChangeText={setLeagueName}
        />
        <Pressable 
            className="border bg-primary-light text-white my-2 rounded-md "
            onPress={handleCreateLeague}>
            <Text className="text-white font-bold text-xl text-center p-1">Submit</Text>
        </Pressable>

        {leagueCreated?<Text>Your League has been created</Text>:null}
        {error?<Text>{error}</Text>:null}

        <Pressable 
            className="border bg-primary-light text-white my-2 rounded-md "
            onPress={()=>{router.push(`leagues`)}}>
            <Text className="text-white font-bold text-xl text-center p-1">Cancel</Text>
        </Pressable>
     </View>
    </View>

     
     )
}

export default CreateLeague