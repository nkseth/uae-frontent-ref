import React,{useState,useContext,useEffect} from 'react'
import { withRouter } from 'react-router'
import {magic} from '../utils/magic'
import { AuthContext } from '../Auth'
import { Button, Input } from '@mui/material'

const LoginPage=({history})=>{
    const {currentUser,checkuser}=useContext(AuthContext)

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
       checkuser()
       history.push('/mainpage')
       }
       catch (err){
        console.log(err)
       } 
    }
    return(
        <div>
            <Input placeholder="Email" type="email" onChange={(e)=>{setemail(e.target.value)}}/>
          
        <Button variant="contained" color="primary" onClick={onlogin}>SUbmit</Button>
        </div>
    )
}
export default withRouter(LoginPage)