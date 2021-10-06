/* eslint-disable react-hooks/exhaustive-deps */
import React,{useContext, useEffect,useState} from "react"
import { Magic } from "magic-sdk";
import { UIContext } from "./Context/UIcontextapi";
import {withRouter} from 'react-router'
export const AuthContext= React.createContext();

const AuthProvider =({children,history})=>{
    const {UIdispatch}=useContext(UIContext)
const [currentUser,setCurrentUser]= useState(null);
console.log()
const magic= new Magic(process.env.REACT_APP_MAGIC_PUBLIC_KEY)

const checkuser= async()=>{
   await magic.user.isLoggedIn().then(async(isLoggedIn)=>{
          
            if(isLoggedIn){

                 await magic.user.getMetadata().then((userdata)=>{
                    setCurrentUser(userdata)
                
                 })
             }else {
               
                setCurrentUser(null)}
        }).catch((error)=>{
          
            UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error.message}})
        })

       if(currentUser)
           return true
       
        return false
      
}

const onlogin= async(email)=>{
     
    await magic.auth.loginWithMagicLink({email}).then((res)=>{

     console.log("adjasdjadjadkasjdkajda",res)
    if(res)
     history.push('/mainpage')

    })
    .catch((err)=>{
        console.log(err)
    })
 
    
 }

const gettoken=async()=>{
    let resi=""
    
    if(currentUser){
        await magic.user.getIdToken().then((res)=>{
           resi=res
        }).catch((error)=>{
            
            UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error.message}})
        })  
      
    }
    return resi
}

useEffect(()=>{
    
   
 checkuser()

},[]);

return(
    <AuthContext.Provider
    value={{currentUser,checkuser,gettoken,onlogin}}
>
    {children}
</AuthContext.Provider>
    )
}
export default withRouter(AuthProvider)