import supabase from "../config/supabaseConfig"

export const fetchPlayerPortfolio=async(setLeagueData)=>{

    const {data,error} = await supabase
    .from('profiles')
    .select(`id,
        username,
        user_leagues!inner(user_id,league_id),
        leagues(league_id,league_name),
        portfolio_history!inner(user_id,total_value,time)
    `)
    .order('time',{ foreignTable: 'portfolio_history', ascending:false })
    .limit(1, {foreignTable: 'portfolio_history'})
    data.sort((a,b)=>{
        return b.portfolio_history[0].total_value-a.portfolio_history[0].total_value})
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