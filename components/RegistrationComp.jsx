import { useState } from 'react'
import {Text,TextInput,Pressable,ActivityIndicator} from 'react-native'
import {router} from 'expo-router' 

import supabase from '../config/supabaseConfig'

const RegistrationComp =() => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [repassword, setRepassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors]=useState({})

    const handleSignUp = async ( )=>{
        if (password!==repassword){
            let errors={}
            errors.passwordMismatch='Password mismatch'
            setErrors(errors)
            console.log(error)

            return
        }
        setIsLoading(true)

        const {data,error} = await supabase.auth.signUp(
            {
                email,
                password,
                options:{
                    username
                }
            }
        )
        setIsLoading(false)

        console.log(error)
        if(error){
            let errors={}
            errors.checkInput="Please check that you have given a valid email address and you password is 6 characters or more"
            setErrors(errors)

        }

        if(data.session!==null){
            router.push(`account`)
        }

    }


    return(<>
        {isLoading?<ActivityIndicator size="large"/>:
        <>
        <Text>New User Registration Page</Text>

        <Text>Enter Email</Text>
        <TextInput 
        value={email}
        onChangeText={setEmail}
        className="border"
        />
        
        <Text>Enter Username</Text>
        <TextInput 
        value={username}
        onChangeText={setUsername}
        className="border"
        />

        <Text>Enter Password</Text>
        <TextInput 
        secureTextEntry="true"
        value={password}
        onChangeText={setPassword}
        className="border"
        />

        <Text>ReEnter Password</Text>
        <TextInput 
        secureTextEntry="true"
        value={repassword}
        onChangeText={setRepassword}
        className="border"
        />
        {errors.passwordMismatch?<Text>{errors.passwordMismatch}</Text>:null}


            <Pressable 
            className="border bg-primary-light text-white my-2"
            onPress={handleSignUp}
            >
            <Text>Create user account</Text>
            </Pressable>

        {errors.checkInput?<Text>{errors.checkInput}</Text>:null}

        
        
        </>
        }
    </>

    )}

    export default RegistrationComp;