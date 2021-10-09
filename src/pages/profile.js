import { Button, Container, TextField,Typography,Box, Grid } from '@mui/material'

import React, {useContext, useEffect, useState} from 'react'
import Breadcrumb from '../Components/breadcrum'
import Header from '../Components/header'
import Loder from '../Components/loading'
import {AuthContext} from '../Auth'
import {UIContext} from '../Context/UIcontextapi'
import axios from '../axios'
const Profile=()=>{
    const {UIdispatch}=useContext(UIContext)
   const {currentUser,gettoken}=useContext(AuthContext)
   const [userdata,setuserdata]=useState({
       username:"",
       firstname:"",
       lastname:"",
       email:"",
   })
 
 
   useEffect(() => {
    const callplan=async()=>{
        UIdispatch({type:'LOADING',payload:true})
        const token=await gettoken()
           
           await axios({
            method:'GET',
           url:'/users/me',
           headers:{
                  'Authorization':`Bearer ${token}`,
                  'Content-Type':"application/json"
              },
           }).then(async(res1)=>{
            UIdispatch({type:'LOADING',payload:false})
            console.log(res1)
            setuserdata({email:res1.data.email,firstname:res1.data.firstname,lastname:res1.data.lastname,username:res1.data.username,id:res1.data.id})
         
           
           }).catch((err)=>{console.log(err)
               UIdispatch({type:'LOADING',payload:false})
               UIdispatch({type:'SNACKBAR',payload:{type:'error',message:err?.response?.data?.message,status:true}})
           })
       }
   callplan()
      
   }, [])

  
   const submithandler=(e)=>{
    e.preventDefault()

    const {email,Firstname,LastName,username}=e.target.elements
   
    const callplan=async()=>{
        UIdispatch({type:'LOADING',payload:true})
        const token=await gettoken()
           
           await axios({
            method:'PUT',
           url:`/users/${userdata.id}`,
           headers:{
                  'Authorization':`Bearer ${token}`,
                  'Content-Type':"application/json"
              },
              data:{firstname:Firstname.value,lastname:LastName.value,username:username.value}
           }).then(async(res1)=>{
            UIdispatch({type:'LOADING',payload:false})
            console.log(res1)
            setuserdata({email:res1.data.email,firstname:res1.data.firstname,lastname:res1.data.lastname,username:res1.data.username})
         }).catch((err)=>{console.log(err)
               UIdispatch({type:'LOADING',payload:false})
               UIdispatch({type:'SNACKBAR',payload:{type:'error',message:err?.response?.data?.message,status:true}})
           })
       }
   callplan()
    
}
const onchangehandler=(e,type)=>{
const olds={...userdata,[type]:e.target.value}
setuserdata(olds)

}

console.log(currentUser)
    return(
        <div>
            <Header/> 
            <Loder/>
            <Box ml={3} mt={3}>
            <Breadcrumb crum={[{label:"Home",url:"/"},{label:"Market Place",url:"/mainpage"},{label:"Profile",url:"/profile"}]}/>
            </Box>
            <Container fluid style={{minHeight:'70vh',boxShadow:'0 0 30px lightBlue',marginTop:'20px',display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center',maxWidth:'500px'}} >
            <Typography variant="h5" color="primary">My Profile</Typography>

            <form onSubmit={submithandler} style={{display:'flex',flexDirection:'column',width:'100%',justifyContent:'space-around',alignItems:'center'}}>  
           
                <TextField id="outlined-basic"  value={userdata?.username} onChange={(e)=>{onchangehandler(e,"username")}} style={{marginTop:'10px'}} name="username" label="Username" variant="outlined" fullWidth />
                
                <TextField id="outlined-basic"  value={userdata?.email}  style={{marginTop:'10px'}} name="email" label="Email" type="email" variant="outlined" fullWidth readOnly />
               
                <TextField id="outlined-basic"  value={userdata?.firstname} onChange={(e)=>{onchangehandler(e,"firstname")}} style={{marginTop:'10px'}}  name="Firstname" label="First Name"  variant="outlined" fullWidth/>
                
             
                <TextField id="outlined-basic" value={userdata.lastname} onChange={(e)=>{onchangehandler(e,"lastname")}}  style={{marginTop:'10px'}}  name="LastName" label="Last Name"  variant="outlined" fullWidth/>
         
            
                <Button variant="contained" style={{marginTop:'20px',textTransform:'capitalize'}}
            
                type='submit' color="primary" 
                
                >Update Profile</Button>
            </form>
            
          
            </Container>
           
          
           
        </div>
    )
}
export default Profile