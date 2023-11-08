import { createContext,useEffect,useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children})=>{

    const [user, setUser]=useState(()=>{
        const stickyUser = window.localStorage.getItem('userData');
        if(stickyUser === null){
            return 'hello'
        }else{
            return JSON.parse(stickyUser)
        }
    })

    useEffect(()=>{
        window.localStorage.setItem('userData',JSON.stringify(user))
    },[user])

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}