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
    .select("game_id, quantity, games!inner(*, price_history(*))")
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

  if (user_id){
    data.quantity = await fetchCurrentInvestedGame(user_id, game_id);
  } else {
    data.quantity = 0;
  }
  
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
  console.log(data);
  if (data === null) {
    return 0;
  } else {
    return data.quantity;
  }
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

export const fetchAllTransactions = async (user_id, limit = 20) => {
  const { data, error } = await supabase
    .from("transactions")
    .select(
      "game_id, quantity, transaction_date, value, new_total, games (game_name)"
    )
    .eq("user_id", user_id)
    .order("transaction_date", { ascending: false })
    .limit(limit);
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const fetchGamePrices = async (gameID) => {
  const { data } = await supabase
    .from("price_history")
    .select("*")
    .eq("game_id", gameID)
    .gte("time", new Date(Date.now() - 86400000).toISOString())
    .order("time", { ascending: true });
  return data;
};

export const fetchUserPortfolioHistory = async (userID) => {
  const { data } = await supabase
    .from("portfolio_history")
    .select("*")
    .eq("user_id", userID)
    .order("time", { ascending: true });
  return data;
};

export const fetchUserShares = async (userID) => {
  const { data } = await supabase
    .from("shares")
    .select("*, games(game_name, value)")
    .eq("user_id", userID)
    .order("quantity", { ascending: false });
  return data;
};
