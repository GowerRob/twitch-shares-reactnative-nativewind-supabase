import supabase from "../config/supabaseConfig"

export const fetchPlayerPortfolio=async(setLeagueData)=>{

    const {data,error} = await supabase
    .from('profiles')
    .select(`id,
        username,
        user_leagues!inner(user_id,league_id),
        leagues(league_id,league_name),
        portfolio_history!inner(user_id,total_value,time,credits)
    `)
    .order('time',{ foreignTable: 'portfolio_history', ascending:false })
    .limit(2, {foreignTable: 'portfolio_history'})
    data.sort((a,b)=>{
        return (b.portfolio_history[0].total_value+b.portfolio_history[0].credits)-(a.portfolio_history[0].total_value+a.portfolio_history[0].credits)})
    setLeagueData(data)
}

export const fetchLeagues = async (setLeagues) => {
    const {data,error} = await supabase
    .from('leagues')
    .select("*")
    setLeagues(data)
}

export const fetchUserLeagues = async (setUserLeagues,user) => {
    const {data,error} = await supabase
    .from('user_leagues')
    .select("*")
    .eq('user_id',user.id)

    
    if(data!==null){
        const leagueIds = data.map((league)=>{
        return league.league_id
    })
    setUserLeagues(leagueIds)
    }
    
}

export const fetchAllPortfolio=async(setLeagueData)=>{

    const {data,error} = await supabase
    .from('profiles')
    .select(`id,
        username,
        portfolio_history!inner(user_id,total_value,time,credits)
    `)
    .order('time',{ foreignTable: 'portfolio_history', ascending:false })
    .limit(2, {foreignTable: 'portfolio_history'})
    data.sort((a,b)=>{
        return (b.portfolio_history[0].total_value+b.portfolio_history[0].credits)-(a.portfolio_history[0].total_value+a.portfolio_history[0].credits)})
    setLeagueData(data)
}

const lastReset=()=>{
    let today=Date.now()
    let reset= new Date('November 6, 2023 00:00:00')
    reset=reset.getTime()
    while (today>reset){
        reset=reset+(7*24*60*60*1000)
    }
    reset=reset-(7*24*60*60*1000)
    return ((new Date(reset)).toISOString())
}

export const fetchLastAllPortfolio=async(setLeagueData)=>{
    const lastSunday= lastReset()
    const {data,error} = await supabase
    .from('profiles')
    .select(`id,
        username,
        portfolio_history!inner(user_id,total_value,time,credits)
    `)
    .lte('portfolio_history.time', lastSunday)
    .order('time',{ foreignTable: 'portfolio_history', ascending:false })
    .limit(2, {foreignTable: 'portfolio_history'})
    data.sort((a,b)=>{
        return (b.portfolio_history[0].total_value+b.portfolio_history[0].credits)-(a.portfolio_history[0].total_value+a.portfolio_history[0].credits)})
    setLeagueData(data)
}

export const fetchlastPlayerPortfolio=async(setLeagueData)=>{

    const lastSunday = lastReset()

    const {data,error} = await supabase
    .from('profiles')
    .select(`id,
        username,
        user_leagues!inner(user_id,league_id),
        leagues(league_id,league_name),
        portfolio_history!inner(user_id,total_value,time,credits)
    `)
    .lte('portfolio_history.time', lastSunday)
    .order('time',{ foreignTable: 'portfolio_history', ascending:false })
    .limit(2, {foreignTable: 'portfolio_history'})
    data.sort((a,b)=>{
        return (b.portfolio_history[0].total_value+b.portfolio_history[0].credits)-(a.portfolio_history[0].total_value+a.portfolio_history[0].credits)})
    setLeagueData(data)
}