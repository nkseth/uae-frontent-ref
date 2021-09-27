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
            const token= await gettoken()
            console.log(token)
        }else setCurrentUser(null)
    }
    catch(err){
        console.log(err)
    }
    
}

const gettoken=async()=>{
try{
const token=await magic.user.getIdToken()
return token
} catch(err){

}
}
useEffect(()=>{
    
   
 checkuser()

},[]);

return(
    <AuthContext.Provider
    value={{currentUser,checkuser}}
>
    {children}
</AuthContext.Provider>
    )
}