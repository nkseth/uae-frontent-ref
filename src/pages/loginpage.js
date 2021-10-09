/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useContext,useEffect} from 'react'
import { withRouter } from 'react-router'
import {magic} from '../utils/magic'
import { AuthContext } from '../Auth'
import { Button, Input } from '@mui/material'
import Breadcrumb from '../Components/breadcrum'
import {UIContext} from '../Context/UIcontextapi' 
import Loder from '../Components/loading'
const LoginPage=({history,location})=>{
    const {currentUser,checkuser,onlogin}=useContext(AuthContext)

  const [email,setemail]=useState("")
  const  {UIdispatch}=useContext(UIContext)
  useEffect(() => {
    const fire=async()=>{
      UIdispatch({type:'LOADING',payload:true})
      const user= await checkuser() 
      console.log("user check",user)
      if(user){
        UIdispatch({type:'LOADING',payload:false})
        console.log(history)
        history.goBack()

      }
      else{
        UIdispatch({type:'LOADING',payload:false})
      }
     if(currentUser){
      history.push('/mainpage')
     } 
    }
     
    fire()  
  }, [])

   
    return(
        <div>
          <Loder/>
           <Breadcrumb crum={[{label:"Home",url:"/"},{label:"Market Place",url:"/main"},{label:"Login Page",url:"/Login"}]}/>
            <Input placeholder="Email" type="email" onChange={(e)=>{setemail(e.target.value)}}/>
          
        <Button variant="contained" color="primary" onClick={()=>{onlogin(email)}}>SUbmit</Button>
        </div>
    )
}
export default withRouter(LoginPage)