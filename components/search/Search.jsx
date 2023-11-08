
import {TextInput,FlatList,Text,Switch} from 'react-native'
import {useState,useEffect} from 'react'

import GameCard from './GameCard'

import supabase from '../../config/supabaseConfig'
import { Pressable } from 'react-native-web'




const Search = () =>{
  
    const [searchText, setSearchText]=useState('');
    const [gamesDataAsc, setGamesDataAsc]=useState([]);
    const [gamesDataDesc, setGamesDataDesc]=useState([]);
    const [filteredGames, setFilteredGames]=useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const [initialRender, setInitialRender]=useState(true);
    const [sortby, setSortby]=useState('game_name');

    const fetchGamesAsc=async ()=>{
        const { data, error } = await supabase
        .from('games')
        .select("*")
        .order("game_name", {ascending:true});
        // is this updating quick enough for the filter
        setGamesDataAsc(data)
        return data;
        
    }    
    const fetchGamesDesc=async ()=>{
        const { data, error } = await supabase
        .from('games')
        .select("*")
        .order("game_name", {ascending:false});
        // is this updating quick enough for the filter
        setGamesDataDesc(data)
    }



    const filterGames=()=>{
        let copyArray=[];
        if(isEnabled){ 
            copyArray=[...gamesDataDesc]
        }else{
            copyArray=[...gamesDataAsc]
        }
        if(sortby==='value'){
            if(isEnabled){
                copyArray.sort((a,b)=>{return b.value-a.value})
            }else{
                copyArray.sort((a,b)=>{return a.value-b.value})
            }
            
        }
        


        const pattern=new RegExp(`${searchText}`,'i')
        const filterTest=copyArray.filter(item=>{
            return pattern.test(item.game_name)
        })








        setFilteredGames(filterTest)
    }


    useEffect(()=>{
        initialise();
    },[])

    const initialise=async()=>{

        const initialData=await fetchGamesAsc()
        await fetchGamesDesc()
        setFilteredGames(initialData)
    }

    useEffect(()=>{
        filterGames()
    },[searchText,isEnabled,sortby])

    
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)};

    const handleSortPress = (e) =>{
        setSortby(e.target.id);
    }

    return (<>
                <Pressable 
                    className="bg-red-400"
                    onPress={handleSortPress}
                ><Text id='game_name'>Name</Text></Pressable>

                <Pressable 
                    className="bg-blue-400"
                    onPress={handleSortPress}
                    ><Text id='value'>Value</Text></Pressable>
                
                <Switch
                    trackColor={{false: '#fff', true: 'blue'}}
                    thumbColor={isEnabled ? '#fff' : 'red'}
                    ios_backgroundColor='black'
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                        {isEnabled?<Text>Descending</Text>:<Text>Ascending</Text>}
                


                <TextInput 
                value={searchText}
                onChangeText={setSearchText}
                className="border"
                placeholder="Enter search term"
                />
                <FlatList
                data={filteredGames}
                renderItem={({item})=>{
                    return <GameCard gameItem={item}/>
                }}
                keyExtractor={item=>item.game_id}>
                </FlatList>
                
            </>
    

        
    )

}

export default Search;