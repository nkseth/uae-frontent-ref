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
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
      
    setOpen(false);
  };
  const {dispatch,createcart,cartid,updatecart,state}=React.useContext(CartContext)
  const onadditem=(item)=>{
    const newstate=[...state,item]
      dispatch({type:"ADDITEM",payload:item})
      if(cartid){
          updatecart(newstate)
      }else{
          createcart(newstate)
      }
    handleClose()
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
        maxWidth="md"
        fullWidth
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
         {props.data.title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Box style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <img 
                                            src={`${process.env.REACT_APP_ENDPOINT}${props.data?.cover?.formats?.medium?.url}`}
                                            alt={props.data.title}
                                            style={{maxWidth:'50%'}}
                                            />
           <Typography style={{fontSize:'2rem',fontWeight:'bolder'}}>{`${props.data.currency} ${props.data.price}/User/Month`}</Typography>
          <Typography gutterBottom>
           {props.data.information}
          </Typography>
         </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
           Proceed To Checkout
          </Button>
          <Button autoFocus onClick={()=>{onadditem(props.data)}} disabled={productalreadypresent}>
           Add to Cart
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
export default CustomizedDialogs