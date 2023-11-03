import {Text,StyleSheet, Pressable,TextInput,Button} from 'react-native'
import {router,Link} from 'expo-router' 
import { useState } from 'react';

const Dummy = () => {
  const tempParam='account';
  const [id, setId]=useState('')

  const handleSubmit = ()=>{
    router.push(`/parametric/${id}`)

  }

  return (
    <>
        <Text className="font-bold text-red-400 text-4xl border-solid border-2 border-indigo-600">The below Pressable navigates uses router.push(`/account`)</Text>
        <Pressable className="border"
          style={styles.dummyBtn}
          onPress={()=>{
            router.push(`/account/${tempParam}`)
          }} >
          <Text style={styles.textBtn}>Test</Text>
        </Pressable>

      <Text>The below Pressable navigates use Link href={`/account/${tempParam}`} asChild </Text>
        
        <Link href={`/account/${tempParam}`} asChild>
          <Pressable style={styles.dummyBtn}>
            <Text style={styles.textBtn}>Test</Text>
          </Pressable>
        </Link>

        <Text>The below button navigates to a parametric route based upon input </Text>
        <TextInput
            style={styles.input}
            value={id}
            onChangeText={setId}
        />
        <Button title="Take Me There" onPress={handleSubmit}/>

    </>
  )
}

const styles=StyleSheet.create({
  dummyBtn: {
  
    width: 100,
    height: 50,
    backgroundColor: "#312651",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    marginBottom:30
  
  },
  textBtn:{
    color:'white',
  },
  input:{
    height:40,
    margin:12,
    padding:10,
    borderWidth:1,
  }
})

export default Dummy