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
    throw new Error(error.message);
  }
  return data;
};

export const fetchInvestedGames = async (id) => {
  const { data, error } = await supabase
    .from("shares")
    .select("game_id, quantity, games (game_name, value)")
    .eq("user_id", id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const handleTrade = async (user_id, game_id, quantity) => {
  const { error } = await supabase
    .from("transactions")
    .insert({ user_id, game_id, quantity });
  if (error) {
    throw new Error(error.message);
  }
};
