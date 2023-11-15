import { Slot } from "expo-router";
import Header from "../components/Header";
import { UserProvider } from "../context/User";

const Layout = () => {
  return (
    <>
      <UserProvider>
        <Header />
        <Slot />
      </UserProvider>
    </>
  );

  // return <Stack />
};


export default Layout;

