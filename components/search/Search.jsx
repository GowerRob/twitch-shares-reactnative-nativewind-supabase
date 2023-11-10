import {TextInput,FlatList,Text,Switch,Pressable} from 'react-native'
import {useState,useEffect,useContext} from 'react'
import { UserContext } from '../../context/User'
import GamePreview from '../GamePreview'

import supabase from '../../config/supabaseConfig'



const Search = () =>{
    const {user} = useContext(UserContext);
    const [searchText, setSearchText]=useState('');
    const [gamesDataAsc, setGamesDataAsc]=useState([]);
    const [gamesDataDesc, setGamesDataDesc]=useState([]);
    const [filteredGames, setFilteredGames]=useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const [sortby, setSortby]=useState('game_name');
    const [searchPage, setSearchPage]=useState(0)
    const [isLoading, setIsloading]=useState(true)
    const [currentResults, setCurrentResults]=useState(0)
    const [start, setStart]=useState(0);
    const [end, setEnd]=useState(99);

    const fetchGamesAsc=async ()=>{
        const { data, error } = await supabase
        .from('games')
        .select(`*, 
        price_history(game_id, value),
        shares!left(game_id,quantity,user_id)`)
        .order("game_name", {ascending:true});
        setGamesDataAsc(data)
        console.log(data)
        return data;
        
    }    
    const fetchGamesDesc=async ()=>{
        const { data, error } = await supabase
        .from('games')
        .select(`*, 
        price_history(game_id, value)
        shares!left(game_id,quantity,user_id)`)
        .order("game_name", {ascending:false});
        setGamesDataDesc(data)
    }

    const filterGames=()=>{
        let copyArray=[];
        if(isEnabled){ 
           copyArray=[...gamesDataDesc]
           //copyArray=[...gamesDataAsc]
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
        const numResults=filterTest.length
        setCurrentResults(numResults)
        let reducedFilteredData=[]

        let endCopy=end;
        if(end>numResults){
            endCopy=numResults
        }
        for(let i=start;i<endCopy;i++){
            const tempObject={}
            tempObject.game_id=filterTest[i].game_id
            tempObject.game_name=filterTest[i].game_name
            tempObject.value=filterTest[i].value
            tempObject.cover_url=filterTest[i].cover_url
            tempObject.price_history=filterTest[i].price_history
            tempObject.usersShares=filterTest[i].shares.filter((item)=>{
                item.user_id===user.id
            })
            reducedFilteredData.push(tempObject)
        }
        setFilteredGames(reducedFilteredData)
    }

    useEffect(()=>{
        initialise();
        setIsloading(false)
    },[])

    const initialise=async()=>{
        const initialData=await fetchGamesAsc()
        await fetchGamesDesc()
        const k=searchPage;
        let reducedFilteredData=[]
        for(let i=start;i<end;i++){
            const tempObject={}
            tempObject.game_id=initialData[i].game_id
            tempObject.game_name=initialData[i].game_name
            tempObject.value=initialData[i].value
            tempObject.cover_url=initialData[i].cover_url
            tempObject.price_history=initialData[i].price_history
            tempObject.usersShares=initialData[i].shares.filter((item)=>{
                return item.user_id===user.id
            })
            reducedFilteredData.push(tempObject)
        }
        const numResults=initialData.length
        setCurrentResults(numResults)
        setFilteredGames(reducedFilteredData)
    }

    useEffect(()=>{

        if(!isLoading){
          filterGames()  
        }
        
    },[searchText,isEnabled,sortby,end])

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)};

    const handleSortPress = (e) =>{
        setSortby(e.target.id);
    }

    const decSearchPage=()=>{
        let a=searchPage-1;
        if(a<0){
            a=0
        }
        let currentStart=start-100;
        let currentEnd=currentStart+99;
        if(currentStart<0){
            currentStart=0;
            currentEnd=99;
        }
        setStart(currentStart)
        setEnd(currentEnd)

        
        setSearchPage(a)
    }

    const incSearchPage=()=>{

        if((end+100)>=currentResults){
            setEnd(currentResults)
            if((start+100<currentResults)){
                const temp=start+100;
                setStart(temp)
            }
        }else{
            setStart(start+100)
            setEnd(end+100)
        }
        let a=searchPage+1;
        setSearchPage(a)
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
                {!isLoading&&<FlatList
                data={filteredGames}
                renderItem={({item})=>{
                        let usersShares=0;
                        if(item.usersShares.length>0){
                            usersShares=item.usersShares[0].quantity
                        }
                    return <GamePreview game={item} user_info={{shares_owned:usersShares}} value_history={item.price_history}/>
                }}
                keyExtractor={item=>item.game_id}>
                </FlatList>}
                
                <Pressable
                    onPress={decSearchPage}
                    disabled={searchPage===0?true:false}>
                    
                    <Text>Prev Page</Text>
                </Pressable>

                <Text>Page {searchPage+1}</Text>
                <Pressable
                    onPress={incSearchPage}
                    disabled={Math.floor(currentResults/100)===searchPage?true:false}
                    >
                    <Text>Next Page</Text>
                </Pressable>




            </>
    

        
    )

}

export default Search;

<GamePreview game={GTAGameInfo} user_info={userInfo} value_history={GTAGamePrices}/>}