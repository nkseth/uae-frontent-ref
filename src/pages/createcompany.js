import { Button, Container, TextField,Typography,Box } from '@mui/material'

import React, {useContext} from 'react'
import Breadcrumb from '../Components/breadcrum'
import Header from '../Components/header'
import Loder from '../Components/loading'
import { CompanyContext } from '../Context/companycontext'
const CreateCompany=()=>{
    const {createcompany}=useContext(CompanyContext)
  
const submithandler=(e)=>{
    e.preventDefault()
    const {companyEmail,companyName,domainName,steupDate,companyURL}=e.target.elements
   
    createcompany({
        CompanyEmail: companyEmail.value,
        CompanyName: companyName.value,
        companyURL: companyURL.value,
        
        domainName: domainName.value,
        setupDate:steupDate.value,
        status:true
    })
  
  
    
}

    return(
        <div>
            <Header/> 
            <Loder/>
            <Box ml={3} mt={3}>
            <Breadcrumb crum={[{label:"Home",url:"/"},{label:"Market Place",url:"/mainpage"},{label:"Create New Company",url:"/createCompany"}]}/>
            </Box>
            <Container fluid style={{minHeight:'70vh',boxShadow:'0 0 30px lightBlue',marginTop:'20px',display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center',maxWidth:'500px'}} >
            <Typography variant="h5" color="primary">Create New Company</Typography>
            <form onSubmit={submithandler} style={{display:'flex',flexDirection:'column',width:'100%',justifyContent:'space-around',alignItems:'center'}}>  
            <TextField id="outlined-basic"  style={{marginTop:'10px'}} name="companyName" label="Company Name" variant="outlined" fullWidth />
            <TextField id="outlined-basic"   style={{marginTop:'10px'}} name="companyEmail" label="Company Email" type="email" variant="outlined" fullWidth />
            <TextField id="outlined-basic"  style={{marginTop:'10px'}}  name="domainName" label="Domain Name"  variant="outlined" fullWidth/>
            <TextField id="outlined-basic"  style={{marginTop:'10px'}}  name="companyURL" label="companyURL" type="url" variant="outlined" fullWidth />
            <Box mt={2} style={{width:'100%'}}>
            <label>Setup date</label>
            </Box>
            <TextField id="outlined-basic" type="date" name="steupDate"  style={{marginTop:'10px'}} fullWidth />
            
                <Button variant="contained" style={{marginTop:'20px',textTransform:'capitalize'}} type='submit' color="primary"
                
                >Create New Company</Button>
            </form>
            
          
            </Container>
           
          
           
        </div>
    )
}
export default CreateCompany