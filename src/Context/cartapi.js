/* eslint-disable array-callback-return */

import React, { createContext, useReducer ,useContext, useState, useEffect, } from 'react'
import axiosInstance from '../axios'
import { reducer, initialState } from './cartreducer'
import { AuthContext } from '../Auth'
import { UIContext } from './UIcontextapi'
export const CartContext = createContext()


 const CartContextProvider = ({ children }) => {
    const {gettoken,currentUser}=useContext(AuthContext)  
    const [cartid,setcartid]=useState(null)
 const {UIdispatch}=useContext(UIContext)
    const [state, dispatch] =
        useReducer(reducer, initialState)
       
        const callcarttoken=async()=>{
           
            if(currentUser){
                 UIdispatch({type:'LOADING',payload:true})
                const token= await gettoken()

                await axiosInstance.get('/usercarts',{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                }).then((res)=>{

                    console.log("dispatch is done",res.data)
                    setcartid(res.data[0]?.id)
                dispatch({type:"ADDDATA",
                payload:res.data[0]?.plans || res.data[0]?.addons
                ?[...res.data[0].plans,...res.data[0].addons]:[]})
                UIdispatch({type:'LOADING',payload:false})
            })
     .catch((error)=>{console.log(error)
        UIdispatch({type:'LOADING',payload:false})
        UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error.response.data.message,status:true}})
    })
            }
            else {
                dispatch({type:"ADDDATA",payload:[]})
                UIdispatch({type:'LOADING',payload:false})
               
            }
            
        }



const createcart=async(newstate)=>{
    if(currentUser){
        console.log(state)
        console.log("create")
        const token=gettoken()
        UIdispatch({type:'LOADING',payload:true})
        const plaid=[]
        const addonid=[]
        newstate.map((item)=>{
            if(item.type==="subscription")
            {
                plaid.push(item?.id)
            }
            else if(item.type==="addon")
            {
                addonid.push(item?.id)
            }
         
        })
        
       await axiosInstance({
         method:'POST',
        url:'/usercarts',
        headers:{
               'Authorization':`Bearer ${token}`,
               'Content-Type':"application/json"
           },
         data:JSON.stringify({plans:plaid,addons:addonid})
    
      
           }  ).then((res)=>{
          setcartid(res.data.id)
          UIdispatch({type:'LOADING',payload:false})
     
    })
    .catch((error)=>{
        UIdispatch({type:'LOADING',payload:false})
        UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error.message,state:true}})
    }
    )
    }
   
}

const updatecart=async(newstate)=>{
    if(currentUser){
 UIdispatch({type:'LOADING',payload:true})
    console.log("thidnbdnd",newstate)
    
    const plaid=[]
    const addonid=[]
    newstate.map((item)=>{
        if(item.type==="subscription")
        {
            plaid.push(item?.id)
        }
        else if(item.type==="addon")
        {
            addonid.push(item?.id)
        }
     
    })
    const token=await gettoken()
   
   await axiosInstance({
    method:'PUT',
    url:`/usercarts/${cartid}`,
    headers:{
           'Authorization':`Bearer ${token}`,
           'Content-Type':"application/json"
       },
     data:JSON.stringify({plans:plaid,addons:addonid})
    
   }).then((res)=>{
    UIdispatch({type:'LOADING',payload:false})
       
  
})
.catch((error)=>{
    console.error(error)
    UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error.message,state:true}})
    UIdispatch({type:'LOADING',payload:false})
})
    }
   
}

useEffect(()=>{
    if(currentUser) callcarttoken()
    
},[currentUser])


        return (
        <CartContext.Provider
            value={{ state, dispatch,callcarttoken,updatecart,createcart ,cartid}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartContextProvider
