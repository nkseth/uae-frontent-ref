import React,{useState,useContext,useEffect} from 'react'
import { withRouter } from 'react-router'
import {magic} from '../utils/magic'
import { AuthContext } from '../Auth'
const LoginPage=({history})=>{
    const {currentUser}=useContext(AuthContext)
  const [email,setemail]=useState("")
  useEffect(() => {
      console.log("thwaidiasd",currentUser)
      if(currentUser){
        history.push('/mainpage')
      }
      
  }, [currentUser])
    const onlogin= async()=>{
       try{
       await magic.auth.loginWithMagicLink({email})
       }
       catch (err){
        console.log(err)
       } 
    }
    return(
        <div>
            <input placeholder="Email" type="email" onChange={(e)=>{setemail(e.target.value)}}/>
            <input placeholder="password" type="password"/>
        <button onClick={onlogin}>SUbmit</button>
        </div>
    )
}
export default withRouter(LoginPage)