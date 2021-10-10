/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useContext, useEffect} from 'react';
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
import {Box, Container, Grid, Switch, TextField} from '@mui/material'
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

const  CompanyDialogs=(props) =>{
  const [open, setOpen] = React.useState(false);
const {gettoken}=React.useContext(AuthContext)
const {UIdispatch}=React.useContext(UIContext)
const [activeaddons,setactiveaddons]=useState([])
const [activeplan,setactiveplan]=useState([])
const [cstatus,setcstatus]=useState({})
const [userdata,setuserdata]=useState({
    CompanyEmail:"",
        CompanyName: "",
        companyURL: "",
        domainName: "",
        setupDate:"",
        
})


useEffect(() => {

   setuserdata({
    CompanyEmail:props.email,
    CompanyName: props.title,
    companyURL: props.url,
    domainName: props.domain,
    setupDate:props.setupdate,
   
   })
   setcstatus(props.status)
}, [])


const submithandler=(e)=>{
 e.preventDefault()

 const {companyEmail,companyName,domainName,steupDate,companyURL}=e.target.elements

 const callplan=async()=>{
     UIdispatch({type:'LOADING',payload:true})
     const token=await gettoken()
        
        await axios({
         method:'PUT',
        url:`/companies/${props.id}`,
        headers:{
               'Authorization':`Bearer ${token}`,
               'Content-Type':"application/json"
           },
           data:{ CompanyEmail:companyEmail.value,
            CompanyName: companyName.value,
            companyURL: companyURL.value,
            domainName: domainName.value,
            setupDate:steupDate.value,
            status:cstatus}


        })
        .then(async(res1)=>{
         UIdispatch({type:'LOADING',payload:false})
         UIdispatch({type:'SNACKBAR',payload:{type:'success',message:"company updated Successfully",status:true}})
 props.history.push('/')
      
        
      }).catch((err)=>{
            UIdispatch({type:'LOADING',payload:false})
            UIdispatch({type:'SNACKBAR',payload:{type:'error',message:err?.message,status:true}})
        })
    }

callplan()
 
}
const onchangehandler=(e,type)=>{
const olds={...userdata,[type]:e.target.value}
setuserdata(olds)
}

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
                       url:`/activeadonscompany/${props.id}`,
                       headers:{
                              'Authorization':`Bearer ${token}`,
                              'Content-Type':"application/json"
                          }}).then(async(resa)=>{
                            setactiveaddons(resa.data)
                          
                            await axios({
                                method:'GET',
                               url:`/activeplanscompany/${props.id}`,
                               headers:{
                                      'Authorization':`Bearer ${token}`,
                                      'Content-Type':"application/json"
                                  }}).then(async(resffff)=>{
                                
                                      setactiveplan(resffff?.data)
                                     
                                      UIdispatch({type:'LOADING',payload:false})
                                      setOpen(true);
                                   
                                   })
                          })
               
              }).catch((error)=>{
                  UIdispatch({type:'LOADING',payload:false})
                  UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error.message,state:true}})
                  setOpen(false);
                }
              )
        }     
   


const classes=useStyles()

  return (
    <div>
      <Button variant="outlined" style={{borderRadius:'20px'}} onClick={handleClickOpen}>
       Manage
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen
     
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {props.title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Box  >
           
            <Loder/>
           
            
            <Container  fluid style={{padding:'20px',marginTop:'20px',maxWidth:'900px'}}>
            
          


            
            <Grid container  >
           
           
           
           
            {
               
               activeplan.length>0?(
                    <>

            <Grid
                justifyContent='center' alignItems='center'   >
                <Typography variant="h6" color='primary'>Active Plan</Typography>

                </Grid>
            <Grid item container xs={12}  justifyContent='center' alignItems='center' style={{marginTop:'10px',marginBottom:'10px',padding:'5px',border:'2px solid lightblue'}}>
               
               <Grid item container xs={4} lg={2} justifyContent='center' alignItems='center'>
               <img 
                                   src={activeplan[0].plan?.cover?.formats?.medium?.url?
                                       `${process.env.REACT_APP_ENDPOINT}${activeplan[0].plan?.cover?.formats?.medium?.url}`
                                       :`${process.env.REACT_APP_ENDPOINT}${activeplan[0].plan?.cover?.formats?.thumbnail?.url}`}
                                   alt={activeplan[0].plan.title}
                                  className={classes.imageset}
                                   />
             </Grid>
             <Grid item container  xs={8} lg={4}  justifyContent='flex-start' alignItems='center'>
             <Box style={{display:'flex',flexWrap:'wrap'}}>
                 <Box>
             <Typography style={{color:activeplan[0].plan.headercolor,fontSize:'1.2rem',fontWeight:'bold'}}>{activeplan[0].plan.title}</Typography>
           <Typography style={{textTransform:'capitalize',fontSize:'.8rem',fontWeight:'bold'}}>{`${activeplan[0].plan.currency} ${activeplan[0].plan.price} / User / ${activeplan[0].plan.tenure}`}</Typography>
            </Box>
          
             </Box>
               </Grid>
               <Grid item container xs={6} lg={2} justifyContent='flex-start' alignItems='center'>
             <Box style={{display:'flex',flexWrap:'wrap'}}>
                 <Box>
             <Typography style={{color:activeplan[0].plan.headercolor,fontSize:'1rem',fontWeight:'bold'}}>Activation Date</Typography>
           <Typography style={{textTransform:'capitalize',fontSize:'.8rem',fontWeight:'bold'}}>{activeplan[0].startdate}</Typography>
            </Box>
          
             </Box>
               </Grid>

               <Grid item container xs={6} lg={2}   justifyContent='flex-start' alignItems='center'>
             <Box style={{display:'flex',flexWrap:'wrap'}}>
                 <Box>
             <Typography style={{color:activeplan[0].plan.headercolor,fontSize:'1rem',fontWeight:'bold'}}>Expiry Date</Typography>
           <Typography style={{textTransform:'capitalize',fontSize:'.8rem',fontWeight:'bold'}}>{activeplan[0].enddate}</Typography>
            </Box>
          
             </Box>
               </Grid>
              
               </Grid></>):null
} 
               

             {
             activeaddons.length>0?
            <>
         <Grid
             justifyContent='center' alignItems='center'   >
             <Typography variant="h6" color='primary'>Active Addons</Typography>

             </Grid>

             {activeaddons.map((item)=>{
                     return (
                        <Grid item container xs={12}  justifyContent='center' alignItems='center' style={{marginTop:'10px',marginBottom:'10px',padding:'5px',border:'2px solid lightblue'}}>
               
                        <Grid item container xs={4} lg={2}  justifyContent='center' alignItems='center'>
                        <img 
                                            src={item?.cover?.formats?.medium?.url?
                                                `${process.env.REACT_APP_ENDPOINT}${item?.addon.cover?.formats?.medium?.url}`
                                                :`${process.env.REACT_APP_ENDPOINT}${item?.addon.cover?.formats?.thumbnail?.url}`}
                                            alt={item.title}
                                           className={classes.imageset}
                                            />
                      </Grid>
                      <Grid item container xs={8} lg={4}  justifyContent='flex-start' alignItems='center'>
                      <Box style={{display:'flex',flexWrap:'wrap'}}>
                          <Box>
                      <Typography style={{fontSize:'1.2rem',fontWeight:'bold'}}>{item.addon.title}</Typography>
                    <Typography style={{textTransform:'capitalize',fontSize:'.8rem',fontWeight:'bold'}}>{`${item.addon.currency} ${item.addon.price} / User / ${item.addon.tenure}`}</Typography>
                     </Box>
                   
                      </Box>
                        </Grid>
                        <Grid item container xs={6} lg={2} justifyContent='flex-start' alignItems='center'>
             <Box style={{display:'flex',flexWrap:'wrap'}}>
                 <Box>
             <Typography style={{fontSize:'1rem',fontWeight:'bold'}}>Activation Date</Typography>
           <Typography style={{textTransform:'capitalize',fontSize:'.8rem',fontWeight:'bold'}}>{item.startdate}</Typography>
            </Box>
          
             </Box>
               </Grid>

               <Grid item container xs={6} lg={2}   justifyContent='flex-start' alignItems='center'>
             <Box style={{display:'flex',flexWrap:'wrap'}}>
                 <Box>
             <Typography style={{fontSize:'1rem',fontWeight:'bold'}}>Expiry Date</Typography>
           <Typography style={{textTransform:'capitalize',fontSize:'.8rem',fontWeight:'bold'}}>{item.enddate}</Typography>
            </Box>
          
             </Box>
               </Grid>
                        </Grid>
                        
                     )
                    })}
                    </>
                :null
                }
                    
            <Grid  item container xs={12}   justifyContent='flex-end' alignItems='center'>
            <Grid item container xs={12}  justifyContent='center' alignItems='center'>

</Grid>
            
                
            </Grid>
           
            <Grid container style={{padding:'10px',margin:'10px',boxShadow:'0px 0px 5px gray'}} >
           <Typography variant="H6">Edit Company</Typography>
           <form onSubmit={submithandler} style={{display:'flex',flexDirection:'column',width:'100%',justifyContent:'space-around',alignItems:'center'}}>  
            <TextField id="outlined-basic"  value={userdata.CompanyName} onChange={(e)=>onchangehandler(e,"CompanyName")} 
            style={{marginTop:'10px'}} name="companyName"
             label="Company Name" variant="outlined" fullWidth />
            <TextField id="outlined-basic"  value={userdata.CompanyEmail}  onChange={(e)=>onchangehandler(e,"CompanyEmail")} 
            style={{marginTop:'10px'}} name="companyEmail" label="Company Email" type="email" variant="outlined" fullWidth />
            <TextField id="outlined-basic" value={userdata.domainName}  onChange={(e)=>onchangehandler(e,"domainName")}
             style={{marginTop:'10px'}}  name="domainName" label="Domain Name"  variant="outlined" fullWidth/>
            <TextField id="outlined-basic"  value={userdata.companyURL}  onChange={(e)=>onchangehandler(e,"companyURL")} 
            style={{marginTop:'10px'}}  name="companyURL" label="companyURL" type="url" variant="outlined" fullWidth />
            <Box mt={2} style={{width:'100%'}}>
            <label>Setup date</label>
            </Box>
            <TextField id="outlined-basic"  onChange={(e)=>onchangehandler(e,"setupDate")} type="date" name="steupDate" value={userdata.setupDate} style={{marginTop:'10px'}} fullWidth />
            <Switch checked={cstatus} onChange={()=>{setcstatus(!cstatus)}}/>
                <Button variant="contained" style={{marginTop:'20px',textTransform:'capitalize'}} type='submit' color="primary"
                
                >Update Company Details</Button>
            
            </form>
           
         
           
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
export default withRouter(CompanyDialogs)