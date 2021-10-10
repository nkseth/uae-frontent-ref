/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material'
import { CartContext } from '../Context/cartapi';
import { withRouter } from 'react-router';
import { AuthContext } from '../Auth';
import { UIContext } from '../Context/UIcontextapi';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const  CustomizedDialogs=(props) =>{
  const [open, setOpen] = React.useState(false);
const [productalreadypresent,setproductalreadypresent]=React.useState(false)
const {state,dispatch,cartid,updatecart,createcart}=React.useContext(CartContext)

const {UIdispatch}=React.useContext(UIContext)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
      
    setOpen(false);
  };
  
  const onadditem=(item)=>{
    const newstatek=[...state]
    let flag=0
    newstatek.map((itemk)=>{
        if(item.id===itemk.id) 
        flag=1
   return flag
      })
    if(flag===0){
      const newstate=[...state,item]
      dispatch({type:"ADDITEM",payload:item})
      if(cartid){
          updatecart(newstate)
      }else{
          createcart(newstate)
      }
    handleClose()
    } else{
      UIdispatch({type:'SNACKBAR',payload:{type:'error',message:"you already have this item in the cart",state:true}})
    }
   
  }


  React.useEffect(()=>{
    const allitemid=[]
    state.map((item)=>{
    return  allitemid.push(item.id)
    })
   
    if(allitemid.includes(props.data.id)){
      setproductalreadypresent(true)
    }else setproductalreadypresent(false)
  },[state])
  return (
    <div>
      <Button variant="outlined" style={{marginTop:'20px',borderRadius:'20px'}} onClick={handleClickOpen}>
        {props.btn}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
     
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
         {props.data.title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Box style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <img 
                                            src={`${process.env.REACT_APP_ENDPOINT}${props.data?.cover?.formats?.thumbnail?.url}`}
                                            alt={props.data.title}
                                            style={{maxWidth:'50%'}}
                                            />
           <Typography style={{fontSize:'2rem',fontWeight:'bolder'}}>{`${props.data.currency} ${props.data.price}/User/Month`}</Typography>
          <Box >
          <Typography gutterBottom  >
           {props.data.information}
          </Typography>
          </Box>
         </Box>
        </DialogContent>
        <DialogActions>
        
          <Button   variant="contained"
             style={{textTransform:'capitalize',
             background:'#28d9a'  ,margin:'10px'          
             }}
             onClick={()=>{onadditem(props.data)}}
            disabled={productalreadypresent}
            >
                    <AddShoppingCartIcon/>
                   Add to Cart
                </Button>
               <Button   variant="container"
               onClick={()=>{
                onadditem(props.data)
  
                props.history.push("/Checkout")
               
            }}
               style={{background:"#28d9ad",
               textTransform:'capitalize',color:'white' ,margin:'10px'}}
               >
                   <AirportShuttleIcon style={{marginRight:'3px'}}/> Proceed to checkout</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
export default withRouter(CustomizedDialogs)