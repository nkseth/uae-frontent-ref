import React,{useEffect,useState} from "react"
import { Magic } from "magic-sdk";

export const AuthContext= React.createContext();
export const AuthProvider =({children})=>{
const [currentUser,setCurrentUser]= useState(null);
console.log()
const magic= new Magic(process.env.REACT_APP_MAGIC_PUBLIC_KEY)
const checkuser= async()=>{
    try{
        const isLoggedIn= await magic.user.isLoggedIn()
        console.log(isLoggedIn)
        if(isLoggedIn){
           const userdata= await  magic.user.getMetadata()
           console.log(userdata)
            setCurrentUser(userdata)
        }
    }
    catch(err){
        console.log(err)
    }
}
useEffect(()=>{
    
   
 checkuser()

},[]);

return(
    <AuthContext.Provider
    value={{currentUser}}
>
    {children}
</AuthContext.Provider>
    )
}