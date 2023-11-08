
import { useLocalSearchParams } from "expo-router";
import {Text} from 'react-native'
import LeagueLeaderboard from "../../components/leagues/LeagueLeaderboard";


const leagueInfo =() => {
    const {league_id} =useLocalSearchParams()

    return(<>
    <Text>League::::{league_id}</Text>
    <LeagueLeaderboard league_id={league_id}></LeagueLeaderboard>
    </>
        


    )

}

export default leagueInfo;