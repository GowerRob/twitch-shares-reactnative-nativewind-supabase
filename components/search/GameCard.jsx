
import { Text,View } from 'react-native'

import { styled } from 'nativewind'


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