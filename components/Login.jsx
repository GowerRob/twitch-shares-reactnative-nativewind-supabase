import { useState, useContext } from "react";
import {
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
  View,
} from "react-native";
import { Link, router } from "expo-router";
import { UserContext } from "../context/User";

import supabase from "../config/supabaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const fetchUserDetails = async (id) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    setUser(data);

    return data;
  };
  const handleSignIn = async () => {
    let newErrors = {};

    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setIsLoading(false);
      if (error) {
        newErrors.invalid = "Email or password is incorrect, please try again";
        setErrors(newErrors);
      }
      if (data.user !== null) {
        fetchUserDetails(data.user.id);
        router.push(`/`);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View className="bg-secondary-dark h-full">
          <View className="bg-background-dark rounded-md flex flex-col mx-10 p-10 mt-10">
            <Text className="text-white font-bold text-xl">Enter Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="bg-white border-4 border-solid text-xl border-accent-light rounded-md "
            />
            {errors.email ? (
              <Text className="text-white font-bold">{errors.email}</Text>
            ) : null}

            <Text className="text-white font-bold text-xl mt-5">
              Enter Password
            </Text>
            <TextInput
              secureTextEntry={true}
              value={password}
              className="bg-white border-4 border-solid text-xl border-accent-light rounded-md "
              onChangeText={setPassword}
            />
            {errors.password ? (
              <Text className="text-white font-bold">{errors.password}</Text>
            ) : null}

            <Pressable
              className="border bg-primary-light text-white my-2 rounded-md mt-5"
              onPress={handleSignIn}
            >
              <Text className="text-white font-bold text-xl text-center p-1">
                Log In
              </Text>
            </Pressable>
            {errors.invalid ? (
              <Text className="text-white font-bold ">{errors.invalid}</Text>
            ) : null}

            <Link href={`/registration`} asChild>
              <Pressable className="border bg-primary-light text-white my-2 rounded-md ">
                <Text className="text-white text-xl text-center p-1">
                  Don't have an account? Sign up
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      )}
    </>
  );
};

export default Login;
