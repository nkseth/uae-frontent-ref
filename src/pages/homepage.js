import { Button, Container, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import {withRouter} from 'react-router-dom'
import logo from '../asserts/logo.png'
import { AuthContext } from '../Auth'
import axiosInstance from '../axios'
import { UIContext } from '../Context/UIcontextapi'

const Homepage=({history,type})=>{
    const [count,setcount]=useState(0)
    const {UIdispatch}=useContext(UIContext)
useEffect(() => {
    const fire=async()=>{
    await axiosInstance({
        method:'GET',
       url:'/prospects/Count',
   }  ).then(async(count1)=>{

           UIdispatch({type:'LOADING',payload:false})
       setcount(count1?.data)
   })
}
fire()
},[])   

    const submithandler=async(e)=>{
        e.preventDefault()
        const {firstname,lastname,email}=e.target.elements
    (firstname.value,lastname.value,email.value)
        UIdispatch({type:'LOADING',payload:true})
         await axiosInstance({
         method:'POST',
         headers:{
            'Content-Type':"application/json"
        },
        url:'/prospects',
        data:JSON.stringify({
             firstname:firstname.value,
             lastname:lastname.value,
             email:email.value
         })
    }  ).then(async(response)=>{
      
    history.push('/thankyou')
    })
}
   
    return(
        <div style={{width:'100vw',height:'100vh',display:'grid',placeItems:'center'}}>

            <Box style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            
            <img src={logo} alt="logo" style={{maxWidth:'50%'}} /> 
           
            <Typography variant="h1" style={{fontSize:'3rem',fontWeight:'bolder'}}>Comming Soon</Typography>
            <Typography variant="h6">Please Fill the form and Join the wishlist</Typography>

            <Container fluid style={{paddingTop:'10px',paddingBottom:'10px',boxShadow:'0 0 30px lightBlue',marginTop:'20px',display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center',maxWidth:'500px'}} >
           
            <form onSubmit={submithandler} style={{display:'flex',flexDirection:'column',width:'100%',justifyContent:'space-around',alignItems:'center'}}>  
            <TextField id="outlined-basic" required style={{marginTop:'10px'}} name="firstname" label="First Name" variant="outlined" fullWidth />
            <TextField id="outlined-basic"  required style={{marginTop:'10px'}} name="lastname" label="Last Name"  variant="outlined" fullWidth />
            <TextField id="outlined-basic"  required style={{marginTop:'10px'}}  name="email" label="Email "  variant="outlined" fullWidth type="email"/>
            
                <Button variant="contained" style={{marginTop:'20px',textTransform:'capitalize'}} type='submit' color="primary"
                
                >Count me In</Button>

            </form>
            
          <Typography style={{marginTop:'10px'}}>People On the Wishlist:{count}</Typography>
            </Container>
            </Box>
        </div>
    )
}
export default withRouter(Homepage)