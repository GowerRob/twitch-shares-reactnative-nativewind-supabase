import {useContext, useEffect, useState} from "react";
import {FlatList, Pressable, Text, View} from "react-native";
import LeagueCard from "./LeagueCard";
import {UserContext} from "../../context/User";
import {router} from "expo-router";
import {fetchLeagues, fetchPlayerPortfolio, fetchUserLeagues} from "../../api/api";

const DisplayLeagues = () => {
    const [leagues, setLeagues] = useState([]);
    const [userLeagues, setUserLeagues] = useState([]);
    const [leagueData, setLeagueData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useContext(UserContext);

    useEffect(() => {
        const fetchInfo = async() => {
            await fetchPlayerPortfolio(setLeagueData);
            await fetchUserLeagues(setUserLeagues, user);
            await fetchLeagues(setLeagues);
            setIsLoading(false);
        }
        fetchInfo();
    }, []);

    const callCreateLeague = () => {
        router.push(`create`);

    };

    if (isLoading) {
        return <Text>Loading ...</Text>;
    }

    return (<>

        <View className={`p-4 bg-background-dark id-outerView`}>
            <View className="flex flex-row justify-around mb-4">
                <Pressable
                    className="rounded-full px-3 bg-accent-light font-bold w-1/3 md:w-1/4"
                    onPress={() => router.push("/leaguepage/all")}>
                    <Text className="text-white text-xs md:text-sm font-bold text-center p-3">All Users League</Text>
                </Pressable>
                {user.id ? <Pressable
                    className="rounded-full px-3 bg-accent-light font-bold w-1/3 md:w-1/4"
                    onPress={callCreateLeague}>
                    <Text className="text-white text-xs md:text-sm font-bold text-center p-3">Create League</Text>
                </Pressable> : null}

            </View>


            <View className={`bg-secondary-dark rounded-lg flex flex-column items-center id-innerView`}>
                <FlatList
                    className={`w-4/5`}
                    data={leagues}
                    renderItem={({item}) => {
                        return <Pressable
                            onPress={() => {
                                router.push({pathname: `/leaguepage/${item.league_id}`});
                            }}>
                            <LeagueCard leagueItem={item} userLeagues={userLeagues}
                                        leagueData={leagueData}/></Pressable>;
                    }}
                    keyExtractor={item => item.league_id}>
                </FlatList>
            </View>
        </View>
    </>);
};

export default DisplayLeagues
