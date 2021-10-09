import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import logo from '../asserts/logo.png'

const Thankyou=({history,type})=>{
    useEffect(()=>{
        setTimeout(() => {
            history.push('/')
        }, 3000);
    },[])

    return(
        <div style={{width:'100vw',height:'100vh',display:'grid',placeItems:'center'}}>

            <Box style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            
            <img src={logo} alt="logo" /> 
           
            <Typography variant="h1" style={{fontSize:'5rem',fontWeight:'bolder'}}>THANK YOU</Typography>
            <Typography variant="h6">For choosing Simple Accounts</Typography>
            </Box>
        </div>
    )
}
export default withRouter(Thankyou)