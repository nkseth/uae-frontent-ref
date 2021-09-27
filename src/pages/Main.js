import { Typography,Box,Input,TextField, FormGroup, FormControlLabel, Checkbox, Paper, Button } from '@mui/material'

import React,{useEffect,useState} from 'react'
import Breadcrumb from '../Components/breadcrum'
import Header from '../Components/header'
import axios from '../axios'
const MainPage=()=>{
const [Plans,setplans]=useState([])
const [filterop,setfilterop]=useState([])
const [titleop,settitles]=useState([])

    useEffect(() => {
        const callplan=async()=>{

           await axios.get('/plans').then((res)=>{
                setplans(res.data)
                console.log(res.data)
            }).catch((err)=>{console.log(err)})
        }
    callplan()
       
    }, [])
useEffect(()=>{
    const filteroptions=[]
    const titles=[]
Plans.map((item)=>{
    if(!filteroptions.includes(item.filteroption))
    filteroptions.push(item.filteroption)
    return filteroptions
})
Plans.map((item)=>{
    if(!titles.includes(item.type))
    
    titles.push(item.type)
    return titles
})
setfilterop(filteroptions)
settitles(titles)
},[Plans]) 
    return(
        <Box >
            <Header/>
            <Box  px={4} pt={2}> 
            <Typography variant="h1" style={{fontSize:'3rem',fontWeight:'bolder'}}>Market Place</Typography>
           <Breadcrumb crum={[{label:"Home",url:"/"},{label:"Market Place",url:"/main"}]}/>
            <Box pt={2} style={{width:'100%',display:'flex',justifyContent:'center'}}>
                <TextField placeholder="Search" 
                fullWidth
                style={{maxWidth:'500px',boxShadow:'0 0 5px gray'}}
                />
            </Box>
            <Box mt={2}  style={{width:'100%',display:'flex',justifyContent:'center'}}>
            <FormGroup style={{display:'flex',flexDirection:'row'}}>
                {filterop.map((item)=>{
                    return(
                       
        <FormControlLabel control={<Checkbox  />} style={{textTransform:'capitalize'}} label={item} />
                 
                    )
                })}
  
  
</FormGroup> 
            </Box>
            {
                titleop.map((item)=>{
                    return (
                    <Box>
                        <Box px={4} py={2} style={{borderBottom:'2px solid gray'}}>
                        <Typography variant="h4" style={{textTransform:'capitalize'}}> {item.replace(0," ")}</Typography>
                        </Box>
                        <Box>
                            {Plans.map((itemw)=>{
                                if(itemw.type===item){
                                    return (
                                        <Paper style={{maxWidth:'200px',padding:'10px',boxShadow:'0 0 5px gray',
                                        display:'flex',flexDirection:'column',justifyContent:'center',
                                        alignItems:'center',margin:"20px"
                                        }}>
                                            
                                            <img
                                            src={`${process.env.REACT_APP_ENDPOINT}${itemw?.cover?.formats?.medium?.url}`}
                                            alt={itemw.title}
                                            style={{maxWidth:'100%'}}
                                            />
                                            <Typography>{itemw.title}</Typography>
                                        <Typography>{`${itemw.currency} ${itemw.price}/User/Month`}</Typography>
                                        <Button>{itemw.buttontype}</Button>
                                        </Paper> 
                                    )
                                }
                            })}
                          
                        </Box>
                    </Box>
                    )
                })
            }
           </Box> 
        </Box>
    )
}
export default MainPage