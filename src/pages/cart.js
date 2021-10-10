/* eslint-disable array-callback-return */
import { Grid ,Box,Typography,Button, IconButton, Tooltip, Container} from '@mui/material'
import { makeStyles,createStyles } from '@mui/styles'
import { withRouter } from 'react-router'
import React,{useContext, useEffect, useState} from 'react'
import Header from '../Components/header'
import { CartContext } from '../Context/cartapi'
import { AuthContext } from '../Auth'
import Loader from '../Components/loading'
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import { UIContext } from '../Context/UIcontextapi'
import Breadcrumb from '../Components/breadcrum'

const useStyles = makeStyles((theme) =>
  createStyles({
  imageset:{
  
        maxWidth:'100%',
    
      [theme.breakpoints.up('md')]:{
        maxWidth:'50%'
      },
      
  }
  }),
);

const CartPage=({history})=>{

    const [total,settotal]=useState(0)
    const {state,dispatch,cartid,updatecart,createcart}=useContext(CartContext)
    const currentstate=[...state]
    const {currentUser}=useContext(AuthContext)
   const {UIdispatch}=useContext(UIContext)
    let neewstate
    const removeitem=(item)=>{
       neewstate= currentstate.filter((items)=>items.id!==item)
        console.log("this is ",neewstate)
        dispatch({type:'REMOVEITEM',payload:neewstate})
        if(currentUser){
         if(cartid){
        updatecart(neewstate)
        }else{
        createcart(neewstate)
         }
}

    }


    useEffect(()=>{
        let total=0
        state.map((item,index)=>{
          return total=total+item.price 
        })
        settotal(total)
    },[state])

   

    const classes=useStyles()
    return(
        <Box  >
            <Header/>
            <Loader/>
            <Box ml={3} mt={3}>
            <Breadcrumb crum={[{label:"Home",url:"/"},{label:"Market Place",url:"/marketplace"},{label:"Your Cart",url:"/cart"}]}/>
            </Box>
            
            <Container  fluid style={{padding:'20px',boxShadow:'0 0 10px gray',marginTop:'20px',maxWidth:'900px',}}>
            <Grid container  >
                <Grid item container sm={12}
                justifyContent='center' alignItems='center'
                >
                <Typography variant="h4" color='primary'>Your Cart</Typography>

                </Grid>
                <Grid item container sm={12}
                justifyContent='center' alignItems='center'
                >
                

                </Grid>
                <Grid item container xs={12}  style={{marginTop:'20px'}} justifyContent='center' alignItems='center'>
             <Box  my={2} style={{width:'100%',borderBottom:'1px solid gray',boxShadow:' 0 0 5px lightgray'}}>
            
             </Box>
             </Grid>
                <Grid item container xs={6}
                justifyContent='center' alignItems='center'
                >
                    <Box style={{fontSize:'1rem' ,fontWeight:'bolder'}}>
                    PRODUCT
                    </Box>
                </Grid>

                <Grid item container xs={6}  justifyContent='center' alignItems='center'>
             <Box style={{fontSize:'1rem' ,fontWeight:'bolder'}}>
             PRICE
             </Box>
             </Grid>
             <Grid item container xs={12}  style={{marginTop:'20px'}} justifyContent='center' alignItems='center'>
             <Box  my={0} style={{width:'100%',borderBottom:'1px solid gray',boxShadow:' 0 0 5px lightgray'}}>
            
             </Box>
             </Grid>
             {state.map((item)=>{
                     return (
                        <Grid item container xs={12}  justifyContent='center' alignItems='center'>
               
                        <Grid item container xs={2}  justifyContent='center' alignItems='center'>
                        <img 
                                            src={item?.cover?.formats?.medium?.url?
                                                `${process.env.REACT_APP_ENDPOINT}${item?.cover?.formats?.medium?.url}`
                                                :`${process.env.REACT_APP_ENDPOINT}${item?.cover?.formats?.thumbnail?.url}`}
                                            alt={item.title}
                                           className={classes.imageset}
                                            />
                      </Grid>
                      <Grid item container xs={4}  justifyContent='flex-start' alignItems='center'>
                      <Box style={{display:'flex',flexWrap:'wrap'}}>
                          <Box>
                      <Typography style={{color:item.headercolor,fontSize:'1.2rem',fontWeight:'bold'}}>{item.title}</Typography>
                    <Typography style={{textTransform:'capitalize',fontSize:'.8rem',fontWeight:'bold'}}>{`${item.currency} ${item.price} / User / ${item.tenure}`}</Typography>
                     </Box>
                     <Tooltip title="Delete"  onClick={()=>{removeitem(item.id)}}>
                        <IconButton>
                        <DeleteIcon />
                         </IconButton>
                        </Tooltip>
                      </Box>
                        </Grid>
                        <Grid item container xs={4}  justifyContent='center' alignItems='center'>
                        <Box>{item.price} {item.currency}</Box>
                        </Grid>
                        </Grid>
                        
                     )
                    })}
            <Grid  item container xs={12}   justifyContent='flex-end' alignItems='center'>
            <Grid item container xs={12}  justifyContent='center' alignItems='center'>

{currentstate.length<1?<Typography>Your Cart is Empty </Typography>:null}
</Grid>
            <Grid item container xs={6}  justifyContent='center' alignItems='center'>

                        <Box style={{fontSize:'18px',fontWeight:'bold'}}>Total = {total} AED</Box>
                        </Grid>
                
            </Grid>
           
            <Grid  item container xs={12} style={{marginTop:'40px'}}  justifyContent='center' alignItems='center'>
            <Button   variant="contained"
             style={{textTransform:'capitalize',
             background:'#28d9a'  ,margin:'10px'          
             }}
             onClick={()=>{history.push("/marketplace")}}
             >
                    <AddShoppingCartIcon/>
                    Go Back Marketplace
                </Button>
               <Button   variant="container"
               onClick={()=>{
                if(currentstate.length>0)   
                history.push("/Checkout")
                else {
                    UIdispatch({type:"SNACKBAR",payload:{type:"error",message:'Your Cart is Empty',status:true}})
                }
            }}
               style={{background:"#28d9ad",
               textTransform:'capitalize',color:'white' ,margin:'10px'}}
               >
                   <AirportShuttleIcon style={{marginRight:'3px'}}/> Proceed to checkout</Button>
            </Grid>
            
          
       
            </Grid>
            </Container>
     </Box>    
    )
}
export default withRouter(CartPage)