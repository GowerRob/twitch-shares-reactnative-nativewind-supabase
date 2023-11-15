
import { Text,View } from 'react-native'

import { styled } from 'nativewind'


const StyledView=styled(View);

const GameCard= ({gameItem, index}) =>{
  



    return (<>
            <StyledView className="flex flex-row space-x-2">
                <Text >{gameItem.game_name} - </Text>
                <Text>{gameItem.value}</Text>
                <Text>{index}</Text>
            </StyledView>


            </>
    

        
    )

}

export default GameCard;