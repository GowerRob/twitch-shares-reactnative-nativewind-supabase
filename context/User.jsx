import { createContext,useEffect,useState } from "react";
export const UserContext = createContext();
export const UserProvider = ({children})=>{
     const [user, setUser]=useState(()=>{
        if(window.localStorage){
            const stickyUser = window.localStorage.getItem('userData');
            if(stickyUser === null){
                return {}
            }else{
                return JSON.parse(stickyUser)
            }
        }
    })

    useEffect(()=>{
        if(window.localStorage){
            window.localStorage.setItem('userData',JSON.stringify(user))
        }
    },[user])

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
