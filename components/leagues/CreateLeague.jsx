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

    return (<View>
        <TextInput
            className="border" 
            placeholder="league name" 
            value={leagueName}
            onChangeText={setLeagueName}
        />
        <Pressable 
            className="border bg-primary-light text-white my-2"
            onPress={handleCreateLeague}>
            <Text>Submit</Text>
        </Pressable>

        {leagueCreated?<Text>Your League has been created</Text>:null}
        {error?<Text>{error}</Text>:null}

        <Pressable 
            className="border bg-primary-light text-white my-2"
            onPress={()=>{router.push(`leagues`)}}>
            <Text>Cancel</Text>
        </Pressable>
     </View>)
}

export default CreateLeague