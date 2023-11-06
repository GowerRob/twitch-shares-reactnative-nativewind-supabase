import supabase from "./config/supabaseConfig";

export const fetchUser = async () => {
  const user = await supabase.auth.getSession();
  if (user === null) {
    return null;
  }
  //   user.details = await fetchUserDetails(user.id);
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
