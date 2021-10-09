import React, { useContext, useEffect, useState } from 'react'
import Table from '../Components/tabel'
import {orderHeadCells , orderRows} from '../Components/tabeldata'
import {Box} from '@mui/material'
import Header from '../Components/header'
import Breadcrumb from '../Components/breadcrum'
import {AuthContext} from '../Auth'
import {UIContext} from '../Context/UIcontextapi'
import axios from '../axios'
import Loder from '../Components/loading'
import InvoiceDialogs from '../Components/invoicemodal'

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
                   url:'/orders',
                   headers:{
                          'Authorization':`Bearer ${token}`,
                          'Content-Type':"application/json"
                      }}).then(
                          (res)=>{
                        console.log("d€sdsad€sadaas€sd€ff",res.data)
                        let options = { year: 'numeric', month: 'long', day: 'numeric' };
                        let final=[]
                        res.data.map((item,index)=>{
                                console.log(index,item)
                                 final=[{
                                   ID:index,
                                   orderNumber:item?.id,
                                    orderDate: new Date(item.createdAt).toLocaleDateString("en-US",options),
                                    orderCompany:item?.company?.CompanyName,
                                    orderAmount:`AED ${item?.total}`,
                                    orderStatus:item?.status?'completed':'pending',
                                    orderInvoice: <InvoiceDialogs id={item?.id}/>,
                               },...final]


                     
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
            <Breadcrumb crum={[{label:"Home",url:"/"},{label:"Market Place",url:"/mainpage"},{label:"Orders",url:"/orders"}]}/>
            </Box>
            <Box p={4}>
                <Box style={{boxShadow:'0 0 5px gray'}}>
                  
            <Table rows={finalres} headCells={orderHeadCells}/>
            </Box>
            </Box>
        </Box>
    )
}

export default Orders