import { useState,useContext } from 'react'
import {View,Text,TextInput,Pressable,ActivityIndicator} from 'react-native'
import {router,Link} from 'expo-router' 
import { UserContext } from '../context/User'

import supabase from '../config/supabaseConfig'



const RegistrationComp =() => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [repassword, setRepassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors]=useState({});
  const {user, setUser} = useContext(UserContext);

  const fetchUserDetails = async (id) => {
    
    const {data, error} = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();
    setUser(data); 
    
    return data;
  };

  const handleSignUp = async ( )=>{
    if (password!==repassword){
      let errors={}
      errors.passwordMismatch='Password mismatch'
      setErrors(errors)
      return
    }
    setIsLoading(true)
    const {data,error} = await supabase.auth.signUp(
      {
        email,
        password,
        options:{data:{
            username
          }
              
        }
      }
    )
  setIsLoading(false)
  if(error){
      let errors={}
      errors.checkInput="Please check that you have given a valid email address and you password is 6 characters or more"
      setErrors(errors)
    }
      if(data.session!==null){
          fetchUserDetails(data.user.id)
          router.push(`account`)
      }

    }

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View className="bg-secondary-dark h-full">
          <View className="bg-background-dark rounded-md flex flex-col mx-10 p-10 mt-10">
          
          <Text className="text-white font-bold text-xl">Enter Email</Text>
          <TextInput value={email} onChangeText={setEmail} className="bg-white border-4 border-solid text-xl border-accent-light rounded-md mb-5" />

          <Text className="text-white font-bold text-xl">Enter Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            className="bg-white border-4 border-solid text-xl border-accent-light rounded-md mb-5"
          />

          <Text className="text-white font-bold text-xl">Enter Password</Text>
          <TextInput
            secureTextEntry="true"
            value={password}
            onChangeText={setPassword}
            className="bg-white border-4 border-solid text-xl border-accent-light rounded-md mb-5"
          />

          <Text className="text-white font-bold text-xl">ReEnter Password</Text>
          <TextInput
            secureTextEntry="true"
            value={repassword}
            onChangeText={setRepassword}
            className="bg-white border-4 border-solid text-xl border-accent-light rounded-md mb-5"
          />
          {errors.passwordMismatch ? (
            <Text>{errors.passwordMismatch}</Text>
          ) : null}

          <Pressable
            className="border bg-primary-light text-white my-2 rounded-md "
            onPress={handleSignUp}
          >
            <Text className="text-white font-bold text-xl text-center p-1">Create user account</Text>
          </Pressable>

          {errors.checkInput ? <Text>{errors.checkInput}</Text> : null}
          <Link href={`/login`} asChild>
            <Pressable className="border bg-primary-light text-white my-2 rounded-md ">
              <Text className="text-white text-xl text-center p-1">Already have an account? Log in</Text>
            </Pressable>
          </Link>
          </View>

        </View>
      )}
    </>
  );
}

export default RegistrationComp;
