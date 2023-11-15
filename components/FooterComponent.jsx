import { Link } from "expo-router"
import { Text, View } from "react-native"

const FooterComponent = () => {
    return (
        <View className="flex flex-row justify-around py-4 bg-background-dark">
        <Link href={`/`} asChild><Text className="text-white rounded-full px-3 bg-accent-light font-bold p-3 w-40 text-center">Home</Text></Link> 
        <Link href={`/leagues`} asChild><Text className="text-white rounded-full px-3 bg-accent-light font-bold p-3 w-40 text-center">Leagues</Text></Link> 
        <Link href={`/account`} asChild><Text className="text-white rounded-full px-3 bg-accent-light font-bold p-3 w-40 text-center">Profile</Text></Link> 

     </View>
    )
}

export default FooterComponent