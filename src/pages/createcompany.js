import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, {useContext} from 'react'
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
  
    console.log(e)
    
}

    return(
        <div>
            <Header/> 
            <Loder/>
            <Box  p={2}>
            <form onSubmit={submithandler} style={{display:'flex',flexDirection:'column'}}>  
            <TextField id="outlined-basic" name="companyName" label="Company Name" variant="outlined" />
            <TextField id="outlined-basic" name="companyEmail" label="Company Email" type="email" variant="outlined" />
            <TextField id="outlined-basic" name="domainName" label="Domain Name"  variant="outlined" />
            <TextField id="outlined-basic" name="companyURL" label="companyURL" type="url" variant="outlined" />
            <label>Setup date</label>
            <TextField id="outlined-basic" type="date" name="steupDate" />
            
                <Button variant="contained" type='submit' color="primary">Create New Company</Button>
            </form>
            
            </Box>
           
          
           
        </div>
    )
}
export default CreateCompany