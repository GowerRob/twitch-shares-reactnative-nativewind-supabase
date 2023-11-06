import {useState} from 'react'
import {Text, Pressable,TextInput,ActivityIndicator} from 'react-native'
import {Link,router} from 'expo-router' 

import supabase from '../config/supabaseConfig'

const Login = () =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors]=useState({})
    const [isLoading, setIsLoading] = useState(false)



    const handleSignIn = async ()=>{
        setIsLoading(true)
        let errors={}

        if(!email) errors.email="Email is required"
        if(!password) errors.password="Password is required"
        setErrors(errors)

        if (Object.keys(errors).length===0){
            const {data,error} = await supabase.auth.signInWithPassword(
                {
                    email,
                    password
                }
            )
            setIsLoading(false)
            if(error){
                console.log("Error",error)
                errors.invalid="Email or password is incorrect, please try again"
                setErrors(errors)
            }
            if(data.session!==null){
                console.log("Data, " ,data)
                router.push(`account`)
            }
        }

    }



    return (<>
       {isLoading?<ActivityIndicator size="large"/>:
       <>
            <Text>Enter Email</Text>
            <TextInput 
            value={email}
            onChangeText={setEmail}
            className="border"
            />
            {errors.email?<Text>{errors.email}</Text>:null}

            <Text>Enter Password</Text>
            <TextInput 
            secureTextEntry="true"
            value={password}
            onChangeText={setPassword}
            className="border"
            />
            {errors.password?<Text>{errors.password}</Text>:null}

            <Pressable 
            className="border bg-primary-light text-white my-2"
            onPress={handleSignIn}
            >
            <Text>Log In</Text>
            </Pressable>
            {errors.invalid?<Text>{errors.invalid}</Text>:null}


            <Link href={`/registration`} asChild>
                <Pressable 
                className="border bg-primary-light text-white my-2">
                <Text>Sign up</Text>
                </Pressable>
            </Link>




            </>}
        
        </>
    )

}

export default Login