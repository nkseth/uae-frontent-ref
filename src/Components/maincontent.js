/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { Typography,Box,TextField, FormGroup, FormControlLabel, Checkbox, Paper} from '@mui/material'
import {UIContext} from '../Context/UIcontextapi'
import React,{useContext, useEffect,useState} from 'react'
import Breadcrumb from './breadcrum'
import Loading from '../Components/loading'
import axios from '../axios'
import Dialog from './dialog'
const MainPage=()=>{
const [Plans,setplans]=useState([])
const [filter,setfilter]=useState([])
const [filterop,setfilterop]=useState([])
const [titleop,settitles]=useState([])
const [finalplan,setfinalplan]=useState([])
const [searchq,setsearchq]=useState("")
const {UIdispatch}=useContext(UIContext)
    useEffect(() => {
     const callplan=async()=>{
            UIdispatch({type:'LOADING',payload:true})
           await axios.get('/plans').then(async(res1)=>{
          
          
                await axios.get('/addons').then((res2)=>{

                    setplans([...res1.data,...res2.data],)
                    UIdispatch({type:'LOADING',payload:false})
                })
            
            }).catch((err)=>{console.log(err)
                UIdispatch({type:'LOADING',payload:false})
                UIdispatch({type:'SNACKBAR',payload:{type:'error',message:err.message,state:true}})
            })
        }
    callplan()
       
    }, [])


const filtercreator=()=>{
   
    const filteroptions=[]
    const titles=[]
    let fplani=[...Plans]
    let fp=[]
    if(filter.length<1){
        fp=[...fplani]
        setfinalplan(fplani)
    }
    else{
        fplani.map((item)=>{
            if(filter.includes(item.filteroption))
            {
                fp.push(item)
            }
        })
    
        setfinalplan(fp)
    }
Plans.map((item)=>{
    if(!filteroptions.includes(item.filteroption))
    filteroptions.push(item.filteroption)
    return filteroptions
})
fp.map((item)=>{
  
    if(!titles.includes(item.category))
    
    titles.push(item.category)
  
})
setfilterop(filteroptions)
settitles(titles)

return fp
}

useEffect(()=>{
   
    filtercreator()
},[Plans,filter]) 

useEffect(()=>{
    searchfilter()
console.log("thidasdasdasdasd")
},[searchq])

const searchfilter=()=>{
  const returnfinal=filtercreator()
   const pl=[...returnfinal]

   console.log("this sh",pl)
    if(searchq!==""){ 
    const searchResults = pl.filter(item => {

        return item.title.toLowerCase().includes(searchq.toLowerCase());
    });
    const titles=[]

    searchResults.map((item)=>{
     
        if(!titles.includes(item.category))
        
        titles.push(item.category)
      
    })
    settitles(titles)
    setfinalplan(searchResults)
}

   
}

const filterclicked=(e,type)=>{
    const olds=[...filter]
    setsearchq("")
  if(e.target.checked){
    olds.push(type)
    setfilter(olds)
    
  }
  else {
      olds.splice(olds.indexOf(type),1)
      setfilter(olds)
      
  }
}
const colors=['#83d17f','#ffc300','#2064d8','#d4afff']
//sdsd


    return(
        <Box >
            <Loading/>
          
            <Box  px={4} pt={1}> 
            <Typography variant="h1" style={{fontSize:'2.5rem',fontWeight:'bolder'}}>Market Place</Typography>
           <Breadcrumb crum={[{label:"Home",url:"/"},{label:"Market Place",url:"/main"}]}/>
            <Box pt={1} style={{width:'100%',display:'flex',justifyContent:'center'}}>
                <TextField placeholder="Search Plans/Addons" 
                fullWidth
                value={searchq}
                style={{maxWidth:'500px',boxShadow:'0 0 5px lightblue',border:'none'}}
                onChange={(e)=>{setsearchq(e.target.value)}}
                />
            </Box>


            <Box mt={2} mb={4} style={{width:'100%',display:'flex',justifyContent:'center'}}>
            <FormGroup style={{display:'flex',flexDirection:'row'}}>
                {filterop.map((item)=>{
                    return(
                       
        <FormControlLabel control={<Checkbox onChange={(e)=>{filterclicked(e,item)}} />} style={{textTransform:'capitalize'}} label={item} />
                 
                    )
                })}
  
  
</FormGroup> 
            </Box>
            {
                titleop.map((item,index)=>{
                    return (
                    <Box key={index}>
                        <Box px={2} py={4} style={{borderTop:index===0?"none":'2px solid lightgray'}}>
                        <Typography variant="h6" style={{textTransform:'capitalize',fontSize:'2rem',} } color="primary"> {item?.replace(0," ")}</Typography>
                        </Box>
                        <Box style={{display:'flex',flexWrap:'wrap',paddingBottom:'20px'}}>
                            {finalplan.map((itemw)=>{
                                if(itemw.category===item){
                                    return (
                                        <Paper style={{minWidth:'220px',boxShadow:'0 0 5px gray',
                                        display:'flex',flexDirection:'column',justifyContent:'center',
                                        alignItems:'center',margin:"20px",borderRadius:'15px'
                                        }}>
                                            <Box style={{background:itemw.headercolor,height:'30px',width:'100%',borderRadius:'15px 15px 0px 0px'}}>

                                            </Box>
                                            <Box p={2} style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                            <img
                                            src={itemw?.cover?.formats?.medium?.url?`${process.env.REACT_APP_ENDPOINT}${itemw?.cover?.formats?.medium?.url}`:
                                         `${process.env.REACT_APP_ENDPOINT}${itemw?.cover?.formats?.thumbnail?.url}`
                                        }
                                            alt={itemw.title}
                                            style={{maxWidth:'100%'}}
                                            />
                                            <Typography style={{color:itemw.headercolor,fontSize:'1.2rem',fontWeight:'bold'}}>{itemw.title}</Typography>
                                        <Typography style={{textTransform:'capitalize',fontSize:'1rem',fontWeight:'bold'}}>{`${itemw.currency} ${itemw.price} / User / ${itemw.tenure}`}</Typography>
                                        <Dialog btn={itemw.buttontype} data={itemw}/>
                                        </Box>
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