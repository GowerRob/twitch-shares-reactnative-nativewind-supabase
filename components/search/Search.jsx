
import {TextInput,FlatList,Text,Switch} from 'react-native'
import {useState,useEffect} from 'react'

import GameCard from './GameCard'

import supabase from '../../config/supabaseConfig'
import { Pressable } from 'react-native-web'




const Search = () =>{
  
    const [searchText, setSearchText]=useState('');
    const [gamesData, setGamesData]=useState([]);
    const [filteredGames, setFilteredGames]=useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const [initialRender, setInitialRender]=useState(false)

    const fetchGames=async (order)=>{
        const { data, error } = await supabase
        .from('games')
        .select("*")
        .order("game_name", {ascending:!order});
        setGamesData(data)

        if(searchText.length!==0){

            filterGames()
        }else{
            setFilteredGames(data)
        }
        console.log(filteredGames)

    }

    const filterGames=()=>{

        const copyArray=[...gamesData]
        const pattern=new RegExp(`${searchText}`,'i')


        const filterTest=copyArray.filter(item=>{
                
            return pattern.test(item.game_name)
        })

        setFilteredGames(filterTest)
    }

    useEffect(()=>{
        console.log("Change")
        fetchGames(isEnabled)
    },[isEnabled])

    useEffect(()=>{
        fetchGames(isEnabled)
    },[])


    useEffect(()=>{
    filterGames()

    },[searchText])

    
   
    const toggleSwitch = () => {
        setInitialRender(true);
        setIsEnabled(previousState => !previousState)};



    return (<>
                <Pressable className="bg-red-400"><Text>Name</Text></Pressable>
                <Pressable className="bg-blue-400"><Text>Value</Text></Pressable>
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