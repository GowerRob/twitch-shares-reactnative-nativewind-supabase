
import { useLocalSearchParams } from "expo-router";
import LeagueLeaderboard from "../../components/leagues/LeagueLeaderboard";


const leagueInfo =() => {
    const {league_id} =useLocalSearchParams()
    return(<>
    <LeagueLeaderboard league_id={league_id}></LeagueLeaderboard>
    </>
        


    )

}

export default leagueInfo;