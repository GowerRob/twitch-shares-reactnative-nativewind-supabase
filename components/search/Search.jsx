
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
    const [initialRender, setInitialRender]=useState(false);

    const fetchGames=async (order)=>{
        order?console.log(order, "Ascending"):console.log(order, "Descending");
        const { data, error } = await supabase
        .from('games')
        .select("*")
        .order("game_name", {ascending:order});
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
        fetchGames(isEnabled)
    },[isEnabled])

    useEffect(()=>{
        fetchGames(true)
    },[])


    useEffect(()=>{
    filterGames()

    },[searchText])

    
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    return (<>
                <Pressable className="bg-red-400"><Text>Name</Text></Pressable>
                <Pressable className="bg-blue-400"><Text>Value</Text></Pressable>
                <Switch
                     trackColor={{false: '#B2BEB5', true: '#B2BEB5'}}
                     thumbColor={isEnabled ? '#B2BEB5' : '##B2BEB5'}
                    ios_backgroundColor="#B2BEB5"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                ></Switch>
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