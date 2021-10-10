import { Button } from '@mui/material'
import React, {  useContext, useEffect, useState } from 'react'
import Companyselect from '../Components/companyselect'
import Header from '../Components/header'
import { AuthContext } from '../Auth'
import { CartContext } from '../Context/cartapi'
import axiosInstance from '../axios'
import { UIContext } from '../Context/UIcontextapi'
import Loder from '../Components/loading'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import { Grid ,Box,Typography,  Container} from '@mui/material'
import { withRouter } from 'react-router'
import { createStyles, makeStyles } from '@mui/styles'
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
const Checkout=({history})=>{
    const classes=useStyles()
    const {UIdispatch}=useContext(UIContext)
const  {gettoken}=useContext(AuthContext)
const [comp,setcomp]=useState("")
const [total,settotal]=useState(0)
const {state,Emptycart}=useContext(CartContext)

  const comnfrmcheckout=async()=>{

        UIdispatch({type:"LOADING",payload:true})
        const token=await gettoken()
       
        await axiosInstance({
         method:'POST',
        url:'/orders',
        headers:{
               'Authorization':`Bearer ${token}`,
               'Content-Type':"application/json"
           },
         data:JSON.stringify({cart:state,companyid:comp})
        }).then((res)=>{

       
        UIdispatch({type:"LOADING",payload:false})
Emptycart()
        history.push('/thankyou')
           
    })
    .catch((error)=>
    {
        
      
 
        UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error?.response?.data?.message,status:true}})
        UIdispatch({type:"LOADING",payload:false})
        
    })
    }
  
    onchange=(e)=>{
      
setcomp(e.target.value)
    }

    useEffect(()=>{
        let total=0
        state.map((item,index)=>{
          return total=total+item.price 
        })
        settotal(total)
    },[state])
    
    return(
        <div>
            <Loder/>
            <Header/>
            <Box ml={3} mt={3}>
            <Breadcrumb crum={[{label:"Home",url:"/"},{label:"Market Place",url:"/marketplace"},{label:"Checkout",url:"/checkout"}]}/>
         </Box>
           <Container fluid style={{padding:'20px',boxShadow:'0 0 10px gray',marginTop:'20px',maxWidth:'900px',}}>
           
            <Grid container  >
               
                <Grid item container sm={12}
                justifyContent='center' alignItems='center'
                >
                <Typography variant="h4" color='primary'>Please Confirm your Order</Typography>
                <Grid item container sm={12}
                justifyContent='center' alignItems='center'
                >
               <Companyselect onchange={onchange} value={comp}/>

                </Grid>
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
                    
                      </Box>
                        </Grid>
                        <Grid item container xs={4}  justifyContent='center' alignItems='center'>
                        <Box>{item.price} {item.currency}</Box>
                        </Grid>
                        </Grid>
                        
                     )
                    })}
            <Grid  item container xs={12}   justifyContent='flex-end' alignItems='center'>
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
               onClick={
                ()=>{
                    if(comp==="")  UIdispatch({type:'SNACKBAR',payload:{type:'error',message:"please select company to continue",status:true}})
                else   comnfrmcheckout()
                }   
               }
               style={{background:"#28d9ad",
               textTransform:'capitalize',color:'white' ,margin:'10px'}}
               >
                   <AirportShuttleIcon style={{marginRight:'3px'}}/> Place Order</Button>
            </Grid>
            
           
       
            </Grid>
            </Container>
        </div>
    )
}
export default withRouter(Checkout)