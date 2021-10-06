/* eslint-disable react-hooks/exhaustive-deps */
import React,{useContext, useEffect} from 'react'
import { createStyles, makeStyles } from '@mui/styles'
import {  Badge, Box, Button ,Typography} from '@mui/material'
import logo from '../asserts/logo.png'
import Popper from './popper'
import { AuthContext } from '../Auth'
import { withRouter } from 'react-router'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { CartContext } from '../Context/cartapi'
import {UIContext} from '../Context/UIcontextapi'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position:'sticky',
      maxHeight:'10vh',
      maxWidth:'98vw',
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      background:'white',
      zIndex:'100',
      top:0,
      left:0
    },
    logo:{
      maxWidth:'70%',
      minWidth:'10vh',
      [theme.breakpoints.up('md')]:{
        maxWidth:'100%',
        maxHeight:'10vh'
      },
      
    }
  }),
);
const Header=({history})=>{
const classes=useStyles()
const {currentUser}=useContext(AuthContext)
 const {state}=useContext(CartContext)
const {UIdispatch}=useContext(UIContext)
 



    return(<Box  className={classes.root}>
       
      <Box style={{maxWidth:'100%',maxHeight:'10vh'}} onClick={()=>{history.push('/')}} >
       <img src={logo} alt="logo" className={classes.logo}/> 

      </Box>
      <Box >
          {currentUser?
      <Box style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
    
      <Box style={{cursor:'pointer',display:'grid',placeItems:'center'}} mx={1} onClick={()=>{history.push('/cart')}} px={2}> 
      <Badge badgeContent={state?.length} color="primary">
       
      <ShoppingCartIcon/>
      </Badge>
      
      </Box>
      <Popper user={currentUser.email}  />
    

      </Box>
    :
    <Box>
    <Button onClick={()=>{history.push('/login')}}>Login/SignUp</Button>
    <Box style={{cursor:'pointer',display:'grid',placeItems:'center'}} mx={1} onClick={()=>{history.push('/cart')}}> 
      <Badge badgeContent={state?.length} color="primary">
       
      <ShoppingBasketIcon/>
      </Badge>
      
      </Box>
    </Box>
    }
      </Box>
    </Box>)  
}
export default withRouter(Header)