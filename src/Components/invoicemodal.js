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
import {Box, Container, Grid} from '@mui/material'
import { CartContext } from '../Context/cartapi';
import { withRouter } from 'react-router';
import { AuthContext } from '../Auth';
import { UIContext } from '../Context/UIcontextapi';
import axios from '../axios'
import { createStyles, makeStyles } from '@mui/styles';
import Loder from '../Components/loading'


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

const  InvoiceDialogs=(props) =>{
  const [open, setOpen] = React.useState(false);


const {gettoken}=React.useContext(AuthContext)
const {UIdispatch}=React.useContext(UIContext)
const [total,settotal]=React.useState(0)
const [finalres,setfinalres]=React.useState([])
const [res,setres]=React.useState("")


const handleClickOpen = () => {
    fire()
   
   
  };
  const handleClose = () => {
      
    setOpen(false);
  };
  
 
 

    
   
    const fire= async()=>{
        UIdispatch({type:'LOADING',payload:true})
         gettoken().then(async(token)=>{
            await axios({
                method:'GET',
               url:`/orders/${props.id}`,
               headers:{
                      'Authorization':`Bearer ${token}`,
                      'Content-Type':"application/json"
                  }}).then((res)=>{
                     
                      let papi= new Date(res?.data?.createdAt).toLocaleDateString('en-US');
                    console.log(papi)
                    setres(papi)
                    const final=[]
                    
            const  item=res.data
                    final.push(item.plan)
                    item.addons.map((itema)=>{
                        final.push(itema)
                    })  
                    console.log(final)
                    setfinalres(final)
                   
                   settotal(item.total)
                UIdispatch({type:'LOADING',payload:false})
                setOpen(true);
              })
              .catch((error)=>{
                  UIdispatch({type:'LOADING',payload:false})
                  UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error.message,state:true}})
                  setOpen(false);
                }
              )
           })
        }     
   


const classes=useStyles()

  return (
    <div>
      <Button variant="outlined" style={{borderRadius:'20px'}} onClick={handleClickOpen}>
       View Invoice
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
     
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
         INVOICE
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Box  >
           
            <Loder/>
           
            
            <Container  fluid style={{padding:'20px',marginTop:'20px',maxWidth:'900px',}}>
            <Grid container  >
                <Grid item container sm={12}
                justifyContent='center' alignItems='center'
                >
                <Typography variant="subtitle2" color='primary'>Order Id:{props.id}</Typography>

                </Grid>
                
                <Grid item container sm={12}
                justifyContent='center' alignItems='center'
                >
                <Typography variant="subtitle2" color='primary'>Order Date:{res}</Typography>

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
             {finalres.map((item)=>{
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
            <Grid item container xs={12}  justifyContent='center' alignItems='center'>

</Grid>
            <Grid item container xs={6}  justifyContent='center' alignItems='center'>

                        <Box style={{fontSize:'18px',fontWeight:'bold'}}>Total = {total} AED</Box>
                        </Grid>
                
            </Grid>
           
       
            
          
       
            </Grid>
            </Container>
     </Box>    
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color='primary'>
                Close
            </Button>
        </DialogActions>
      
      </BootstrapDialog>
    </div>
  );
}
export default withRouter(InvoiceDialogs)