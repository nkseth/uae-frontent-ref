import React, { useContext, useEffect, useState } from 'react'
import Table from '../Components/tabel'
import {companyHeadCells , orderRows} from '../Components/tabeldata'
import {Box} from '@mui/material'
import Header from '../Components/header'
import Breadcrumb from '../Components/breadcrum'
import {AuthContext} from '../Auth'
import {UIContext} from '../Context/UIcontextapi'
import axios from '../axios'
import Loder from '../Components/loading'
import CompanyDialogs from '../Components/managecompanydialog'

function Orders() {

const {UIdispatch}=useContext(UIContext)
const [finalres,setfinalres]=useState([])
const {gettoken}=useContext(AuthContext)
    useEffect(() => {
        UIdispatch({type:'LOADING',payload:true})
        const fire= async()=>{
            
             gettoken().then(async(token)=>{
                await axios({
                    method:'GET',
                   url:'/companies',
                   headers:{
                          'Authorization':`Bearer ${token}`,
                          'Content-Type':"application/json"
                      }}).then((res)=>{
                          console.log(res)
                        const final=[]
                     //  let options = { year: 'numeric', month: 'long', day: 'numeric' };
                        let ff
                      res.data.map((item,index)=>{
                           ff={
                               ID:index,
                            companyId:item.id,
                            companyName:item.CompanyName,
                           
                            domain:item.domainName,
                            adminemail:item.CompanyEmail,
                            setupDate:item.setupDate,
                            companyStatus:item.status?"ACTIVE":"INACTIVE",
                            companyurl:item.companyURL,

                            
                            action:<CompanyDialogs href={`/manageCompany`} id={item.id} 
                            title={item.CompanyName}
                             domain={item.domainName}
                             email={item.CompanyEmail}
                             setupdate={item.setupDate}
                             status={item.status}
                             url={item.companyURL}
                             />
                               }
                               console.log(ff)
                       final.push(ff)
                       
                           })
                       setfinalres(final)
                    UIdispatch({type:'LOADING',payload:false})
                   
                  })
                  .catch((error)=>{
                      UIdispatch({type:'LOADING',payload:false})
                      UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error.message,state:true}})
                  }
                  )
               })
            }     
        fire()
        },[] )
    return (
        <Box>
            <Loder/>
            <Header/>
            <Box ml={2}>
            <Breadcrumb crum={[{label:"Home",url:"/"},{label:"Market Place",url:"/mainpage"},{label:"Companies",url:"/companies"}]}/>
            </Box>
            <Box p={4}>
                <Box style={{boxShadow:'0 0 5px gray'}}>
            <Table rows={finalres} headCells={companyHeadCells}/>
            </Box>
            </Box>
        </Box>
    )
}

export default Orders