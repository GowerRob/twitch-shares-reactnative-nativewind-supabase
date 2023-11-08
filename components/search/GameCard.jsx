
import {TextInput,FlatList,Text,View} from 'react-native'
import {useState,useEffect} from 'react'

import {styled} from 'nativewind'

import supabase from '../../config/supabaseConfig'

const StyledView=styled(View);

const GameCard= ({gameItem}) =>{
  



    return (<>
            <StyledView className="flex flex-row space-x-2">
                <Text >{gameItem.game_name} - </Text>
                <Text>{gameItem.value}</Text>

            </StyledView>


            </>
    

        
    )

}

export default GameCard;