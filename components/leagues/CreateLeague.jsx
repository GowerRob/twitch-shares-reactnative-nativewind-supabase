import { useState } from "react"
import { Pressable, TextInput, Text, View } from "react-native"

import supabase from '../../config/supabaseConfig'

const CreateLeague = () => {
    const [leagueName, setLeagueName] = useState('')
    const [leagueCreated, setLeagueCreated] = useState(false)

    const handleCreateLeague = async () => {
        const {error} = await supabase
        .from('leagues')
        .insert({league_name:leagueName})
        setLeagueCreated(true)
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
     </View>)
}

export default CreateLeague