/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useContext,useEffect} from 'react'
import { withRouter } from 'react-router'

import { AuthContext } from '../Auth'
import { Button, Container, Input, TextField, Typography } from '@mui/material'

import Breadcrumb from '../Components/breadcrum'
import {UIContext} from '../Context/UIcontextapi' 
import Loder from '../Components/loading'
import { Box } from '@mui/system'
const LoginPage=({history,location})=>{
    const {currentUser,checkuser,onlogin,Oauthlogin}=useContext(AuthContext)

  const [email,setemail]=useState("")
  const  {UIdispatch}=useContext(UIContext)
  useEffect(() => {
    const fire=async()=>{
      UIdispatch({type:'LOADING',payload:true})
      const user= await checkuser() 
      console.log("user check",user)
      if(user){
        UIdispatch({type:'LOADING',payload:false})
        console.log(history)
        history.goBack()

      }
      else{
        UIdispatch({type:'LOADING',payload:false})
      }
     if(currentUser){
      history.push('/mainpage')
     } 
    }
     
    fire()  
  }, [])

   
    return(
        <Box  style={{background:"#56BAEC",width:'100vw',height:'100vh',display:'flex',justifyContent: 'center',alignItems: 'center'}}>
          <Loder/>
          <Container style={{background:"white",maxWidth:'400px'
          ,minHeight:'60vh',borderRadius:'10px',boxShadow:'0 0 10px gray',
          padding:'20px',display:'flex',justifyCotent: 'center',alignItems: 'center'
          ,flexDirection:'column'
          }}>
            <Typography style={{
              fontWeight:'bolder',
              fontSize:'0.9rem',
              padding:'2px',
              borderBottom:'2px solid #56BAEC '
            }}> SIGN IN / SIGN UP</Typography>
<Box my={2} display="flex" flexDirection="column" justifyContent='center' alignItems='center'>
           <TextField variant="outlined" placeholder="Email" type="Email" label="Email" onChange={(e)=>{setemail(e.target.value)}}/>
          <Button variant="contained" color="primary"
          style={{textTransform:'capitalize',marginTop:"5px"}}
          onClick={()=>{onlogin(email)}}>Log in with Email</Button>
          </Box>

          <Typography style={{
              fontWeight:'bolder',
              fontSize:'0.9rem',
              padding:'2px',
              borderBottom:'2px solid #56BAEC '
            }}> OR</Typography>
<Box mt={2}>
  <Button style={{textTransform:'capitalize',fontWeight:'bold',
  color:'gray',border:'1px solid gray',borderRadius:'10px', fontSize:'.8rem',
  boxShadow:'0 0 5px gray'
  }}>
  <img 
  style={{width:'40px',marginRight:'10px'}}
  src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="google"/>
   
            Sign In With facebook
  </Button>
</Box>
<Box mt={2}>
  <Button style={{textTransform:'capitalize',fontWeight:'bold',
  color:'gray',border:'1px solid gray',borderRadius:'10px', fontSize:'.8rem',
  boxShadow:'0 0 5px gray'
  }}
  onClick={()=>{Oauthlogin("google")}}
  >
  <img 
  style={{width:'40px',marginRight:'10px'}}
  src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google" />
    
            Sign In With Google
  </Button>
</Box>
<Box mt={2}>
  <Button style={{textTransform:'capitalize',fontWeight:'bold',
  color:'gray',border:'1px solid gray',borderRadius:'10px', fontSize:'.8rem',
  boxShadow:'0 0 5px gray'
  }}>
  <img 
  style={{width:'40px',marginRight:'10px'}}
  src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-apple-fitness-kiranshastry-solid-kiranshastry.png" alt="google"/>
    
            Sign In With Apple
  </Button>
</Box>
<Box mt={2}>
  <Button style={{textTransform:'capitalize',fontWeight:'bold',
  color:'gray',border:'1px solid gray',borderRadius:'10px', fontSize:'.8rem',
  boxShadow:'0 0 5px gray'
  }}>
  <img 
  style={{width:'40px',marginRight:'10px'}}
  src="https://img.icons8.com/fluency/48/000000/linkedin.png" alt="google"/>
  
            Sign In With Linkedin
  </Button>
</Box>
<Box mt={2}>
  <Button style={{textTransform:'capitalize',fontWeight:'bold',
  color:'gray',border:'1px solid gray',borderRadius:'10px', fontSize:'.8rem',
  boxShadow:'0 0 5px gray'
  }}>
  <img 
  style={{width:'40px',marginRight:'10px'}}
  src="https://img.icons8.com/fluency/48/000000/twitter.png" alt="google"/>
    
            Sign In With Twitter
  </Button>
</Box>
<Box mt={2}>
  <Button style={{textTransform:'capitalize',fontWeight:'bold',
  color:'gray',border:'1px solid gray',borderRadius:'10px', fontSize:'.8rem',
  boxShadow:'0 0 5px gray'
  }}>
  <img 
  style={{width:'40px',marginRight:'10px'}}
  src="https://img.icons8.com/color/48/000000/microsoft.png" alt="google"/>
    
            Sign In With Microsoft
  </Button>
</Box>

        </Container>
        </Box>
    )
}
export default withRouter(LoginPage)