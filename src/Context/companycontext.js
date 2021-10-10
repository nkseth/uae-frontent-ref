/* eslint-disable react-hooks/exhaustive-deps */

import React, { createContext, useReducer ,useEffect,useContext, useState} from 'react'
import axiosInstance from '../axios'
import { reducer, initialState } from './companyreducer'
import { withRouter } from 'react-router'
import { AuthContext } from '../Auth'
import { UIContext } from './UIcontextapi'

export const CompanyContext = createContext()


 const CompanyContextProvider = ({ children,history }) => {
     const {UIdispatch}=useContext(UIContext)
    const {gettoken,currentUser,checkuser}=useContext(AuthContext)  
    const [cartid]=useState(null)
 
    const [cstate, cdispatch] =
        useReducer(reducer, initialState)
       
        const callcompanytoken=async()=>{
           
            if(currentUser)
            {  UIdispatch({type:'LOADING',payload:true})
                 const  token= await gettoken()
               
                await axiosInstance.get('/companies',{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                }).then((res)=>{
                    UIdispatch({type:'LOADING',payload:false})
                  
                cdispatch({type:"ADDDATA",payload:res.data?res.data:[]})
                }).catch((error)=>{
                    UIdispatch({type:'LOADING',payload:false})
                    UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error?.response?.data?.message,status:true}})
                })
            }
            else 
            cdispatch({type:"ADDDATA",payload:[]})
        }



const createcompany=async(newstate)=>{
  
    UIdispatch({type:'LOADING',payload:true})
    const token=await gettoken()
    
    await axiosInstance({
     method:'POST',
    url:'/companies',
    headers:{
           'Authorization':`Bearer ${token}`,
           'Content-Type':"application/json"
       },
     data:JSON.stringify({...newstate})

  
       }  ).then((res)=>{
        UIdispatch({type:'LOADING',payload:false})
        cdispatch({type:"ADDITEM",payload:res.data})
        history.goBack()

 
})
.catch((error)=>{
    UIdispatch({type:'LOADING',payload:false})
                    UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error?.response?.data?.message,status:true}})
    console.error(error)})
}



useEffect(() => {
   
  callcompanytoken()
 
 }, [])

        return (
        <CompanyContext.Provider
            value={{cstate, cdispatch,callcompanytoken,createcompany ,cartid}}>
            {children}
        </CompanyContext.Provider>
    )
}
export default withRouter(CompanyContextProvider);
