import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Switch } from "react-native";
import GamePreview from "./GamePreview";
import supabase from "../config/supabaseConfig";
import { Picker } from "react-native-web";
import { useContext } from "react";
import { UserContext } from "../context/User";

const GameList = ({
  title = "",
  limit = 20,
  search = true,
  sort = true,
  filter = true,
}) => {
  const { user, setUser } = useContext(UserContext);
  const [hideExpensive, setHideExpensive] = useState(false);
  const toggleSwitch = () =>
    setHideExpensive((previousState) => !previousState);

  const [games, setGames] = useState();
  const [sortAscending, setSortAscending] = useState(false);
  const [sortOrder, setSortOrder] = useState("value");
  const [searchTerm, setSearchTerm] = useState("");
  const credits = user?.credits || 1000;

  useEffect(() => {
    const fetchGames = async () => {
      if (user?.id) {
        if (sortOrder === "user shares owned") {
          const { data } = await supabase
            .from("shares")
            .select("*, games!inner(*, price_history(*))")
            .eq("user_id", user.id)
            .ilike("games.game_name", `%${searchTerm}%`)
            .order("quantity", { ascending: sortAscending })
            .limit(limit);
          const mappedData = data.map((datum) => {
            return {
              ...datum.games,
              shares: [{ quantity: datum.quantity }],
            };
          });
          setGames(mappedData);
        } else {
          if (hideExpensive) {
            const { data } = await supabase
              .from("games")
              .select("*, price_history(*), shares(*)")
              .eq("shares.user_id", user.id)
              .gte("value", 100)
              .lte("value", credits)
              .ilike("game_name", `%${searchTerm}%`)
              .order(sortOrder, { ascending: sortAscending })
              .limit(limit);
            setGames(data);
          } else {
            const { data } = await supabase
              .from("games")
              .select("*, price_history(*), shares(*)")
              .eq("shares.user_id", user.id)
              .gte("value", 100)
              .ilike("game_name", `%${searchTerm}%`)
              .order(sortOrder, { ascending: sortAscending })
              .limit(limit);

            setGames(data);
          }
        }
      } else {
        console.log("User not found");
        if (hideExpensive) {
          const { data } = await supabase
            .from("games")
            .select("*, price_history(*), shares(*)")
            .gte("value", 100)
            .lte("value", credits)
            .ilike("game_name", `%${searchTerm}%`)
            .order(sortOrder, { ascending: sortAscending })
            .limit(limit);
          setGames(data);
        } else {
          const { data } = await supabase
            .from("games")
            .select("*, price_history(*), shares(*)")
            .gte("value", 100)
            .ilike("game_name", `%${searchTerm}%`)
            .order(sortOrder, { ascending: sortAscending })
            .limit(limit);
          setGames(data);
        }
      }
    };
    fetchGames();
  }, [
    sortOrder,
    sortAscending,
    limit,
    searchTerm,
    hideExpensive,
    user,
    user?.credits,
  ]);

  const handleSortChange = (item) => {
    const [field, order] = item.split("-");
    if (order === "desc") {
      setSortAscending(false);
    } else {
      setSortAscending(true);
    }
    setSortOrder(field);
  };
  const colorScheme = "dark";

  return (
    <View className={`rounded-lg h-full p-4 m-4 bg-background-${colorScheme}`}>
      <Text className="text-2xl font-bold text-text-dark mb-4">{title}</Text>
      {search || sort || filter ? (
        <View className="flex-col md:flex-row justify-end">
          {search ? (
            <TextInput
              className="border-b-2 flex flex-grow border-gray-300 p-2 my-4 text-text-dark mx-2"
              placeholder="Search for a game"
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
          ) : null}
          {sort ? (
            <Picker
              id="sorting"
              className="p-2 border-2 border-white rounded-lg my-4 bg-background-dark text-white"
              onValueChange={(itemValue) => handleSortChange(itemValue)}
            >
              <Picker.Item
                value="value-desc"
                label="Sort by Value (Highest First)"
              />
              <Picker.Item
                value="value-asc"
                label="Sort by Value (Lowest First)"
              />
              <Picker.Item
                value="shares_owned-desc"
                label="Sort by Popularity (Highest First)"
              />
              <Picker.Item
                value="share_owned-asc"
                label="Sort by Popularity (Lowest First)"
              />
              {user ? (
                <Picker.Item
                  value="user shares owned-desc"
                  label="Sort by Shares Owned (Highest First)"
                />
              ) : null}
              {user ? (
                <Picker.Item
                  value="user shares owned-asc"
                  label="Sort by Shares Owned (Lowest First)"
                />
              ) : null}
            </Picker>
          ) : null}
          {filter ? (
            <View className="flex-1 flex-row items-center m-4 self-end">
              <Text className="text-text-dark">Hide Unaffordable </Text>
              <Switch
                trackColor={{ false: "#595959", true: "#7D5BBE" }}
                thumbColor={hideExpensive ? "#07040c" : "#ffffff"}
                onValueChange={toggleSwitch}
                value={hideExpensive}
              />
            </View>
          ) : null}
        </View>
      ) : null}
      <View
        className={
          "bg-black rounded-lg h-auto w-full flex justify-center items-center"
        }
      >
        {games ? (
          <FlatList
            className="w-full"
            data={games}
            renderItem={({ item }) => (
              <GamePreview
                value_history={item.price_history}
                shares_owned={
                  user
                    ? item.shares[0]
                      ? item.shares[0].quantity
                      : 0
                    : undefined
                }
                game={item}
              />
            )}
            keyExtractor={(item) => item.game_id}
          />
        ) : null}
      </View>
    </View>
  );
};

export default GameList;
