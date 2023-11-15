import { View } from "react-native"
import HeaderComponent from "./HeaderComponent"

function Header() {
  return (
    <View style={{ position: "fixed", left: 0, right: 0, top: 0, zIndex:100 }}>
          <HeaderComponent/>
    </View>
  )
}

export default Header