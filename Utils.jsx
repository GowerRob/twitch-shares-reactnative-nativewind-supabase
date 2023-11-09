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

export const fetchGameInfo = async (game_id, user_id) => {
  const { data, error } = await supabase
    .from("games")
    .select("game_name, value, cover_url, description")
    .eq("game_id", game_id)
    .maybeSingle();

  data.quantity = await fetchCurrentInvestedGame(user_id, game_id);

  return data;
};

export const fetchCurrentInvestedGame = async (user_id, game_id) => {
  const { data, error } = await supabase
    .from("shares")
    .select("quantity")
    .eq("user_id", user_id)
    .eq("game_id", game_id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  return data.quantity;
};

export const fetchGameTransactions = async (user_id, game_id) => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user_id)
    .eq("game_id", game_id)
    .order("transaction_date", { ascending: false })
    .limit(10);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
