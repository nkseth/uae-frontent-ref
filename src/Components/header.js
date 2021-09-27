import React,{useContext, useEffect,useState} from 'react'
import { createStyles, makeStyles } from '@mui/styles'
import { Avatar, Box, Button } from '@mui/material'
import logo from '../asserts/logo.png'
import Popper from './popper'
import { AuthContext } from '../Auth'
import { withRouter } from 'react-router'
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position:'sticky',
      minHeight:'10vh',
      
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between'
      
    },
  }),
);
const Header=({history})=>{
const classes=useStyles()
const {currentUser,checkuser}=useContext(AuthContext)
 

useEffect(() => {
   const  checking=async()=>{
        await checkuser()
      
    }
    checking()  
}, [])
console.log("thius is header",currentUser)
    return(<Box px={4} className={classes.root}>
       
      <Box style={{width:'200px',height:'80%'}}>
      <img src={logo} alt="logo" style={{width:'100%',height:'100%'}}/>

      </Box>
      <Box  >
          {currentUser?
      <Popper  />
    :
    <Button onClick={()=>{history.push('/login')}}>Login/SignUp</Button>}
      </Box>
    </Box>)  
}
export default withRouter(Header)