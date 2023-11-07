import supabase from "./config/supabaseConfig";

export const fetchUser = async () => {
  const user = await supabase.auth.getSession();
  if (user === null) {
    return null;
  }
  user.details = await fetchUserDetails(user.data.session.user.id);

  return user;
};

export const fetchUserDetails = async (id) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
};

export const fetchInvestedGames = async (id) =>{

  const {data, error} = await supabase
  .from('shares')
  .select('game_id, quantity, games (game_name)')
  .eq('user_id', id)

  if (error) {
    
    throw new Error(error.message);
  }
  return data;
}

export const fetchGameValue = async (game_id) =>{

  const {data, error} = await supabase
  .from('games')
  .select('value', 'game_name')
  .eq('game_id', game_id)

  if (error) {
  
    throw new Error(error.message);
  }
  return data;
}
