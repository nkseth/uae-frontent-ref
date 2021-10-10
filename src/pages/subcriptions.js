import React, { useContext, useEffect, useState } from 'react'
import Table from '../Components/tabel'
import {subHeadCells , subRows} from '../Components/tabeldata'
import {Box} from '@mui/material'
import Header from '../Components/header'
import Breadcrumb from '../Components/breadcrum'
import {UIContext} from '../Context/UIcontextapi'
import { AuthContext } from '../Auth'
import axiosInstance from '../axios'


function Subscription() {
    const {UIdispatch}=useContext(UIContext)
    const {gettoken}=useContext(AuthContext)
    const [activeaddon,setactiveaddons]=useState([])
    const [activeplan,setactiveplan]=useState([])
   const [finalarry,setfinalaary]=useState([])
    const fire= async()=>{
        UIdispatch({type:'LOADING',payload:true})
         gettoken().then(async(token)=>{
          
                    await axiosInstance({
                        method:'GET',
                       url:`/activeadons`,
                       headers:{
                              'Authorization':`Bearer ${token}`,
                              'Content-Type':"application/json"
                          }}).then(async(resa)=>{
                            setactiveaddons(resa.data)
                            console.log("sdfsdfds",resa)
                            await axiosInstance({
                                method:'GET',
                               url:`/activeplans`,
                               headers:{
                                      'Authorization':`Bearer ${token}`,
                                      'Content-Type':"application/json"
                                  }}).then(async(resffff)=>{
                                    console.log("asdsadsadsad",resffff) 
                                      setactiveplan(resffff?.data)
                                     
                                      UIdispatch({type:'LOADING',payload:false})
                                    
                                   })
                          })
               
              }).catch((error)=>{
                  UIdispatch({type:'LOADING',payload:false})
                  UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error.message,state:true}})
                }
              )
        }     
   useEffect(() => {
       fire()
   },[])

   useEffect(() => {

    console.log(activeaddon,activeplan)
       let paa=[]
       activeplan.map((item,index)=>{
        let p={
            ID:index,
        subName:item?.plan?.title,
        companyname:item?.company?.CompanyName,
        startDate:item?.startdate,
        endDate:item?.enddate,
        renewDate:item?.enddate,
        subStatus:item?.status?'Active':'Inactive',
       
        }
    paa.push(p)
       })
     
       activeaddon.map((item,index)=>{
        let p={
            ID:index+activeplan?.length,
        subName:item?.addon?.title,
        companyname:item?.company?.CompanyName,
        startDate:item?.startdate,
        endDate:item?.enddate,
        renewDate:item?.enddate,
        subStatus:item?.status?'Active':'Inactive',
       
        }
    paa.push(p)
       })
      
       console.log(paa)
    setfinalaary(paa)
},[activeaddon,activeplan])
    return (
        <Box>
            <Header/>
            <Box ml={2}>
            <Breadcrumb crum={[{label:"Home",url:"/"},{label:"Market Place",url:"/marketplace"},{label:"Subcriptions",url:"/subcriptions"}]}/>
            </Box>
            <Box p={4}>
                <Box style={{boxShadow:'0 0 5px gray'}}>
            <Table rows={finalarry} headCells={subHeadCells}/>
            </Box>
            </Box>
        </Box>
    )
}

export default Subscription