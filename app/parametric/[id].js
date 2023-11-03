import { Text} from 'react-native'
import { useLocalSearchParams } from 'expo-router';

const Game = () => {
    const params = useLocalSearchParams();
    return(
        <Text>You reached the game page {params.id}</Text>

    )

}

export default Game;