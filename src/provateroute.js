import React, { useContext,useEffect } from 'react';
import {Route , Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import {AuthContext } from './Auth';
const PrivateRoute=({component:RouteComponent,history,...rest})=>{
    const {currentUser,checkuser}= useContext(AuthContext);
    useEffect(() => {
        if(currentUser===null){
            const checkuseri=async()=>{
                return await checkuser().then(
                    (res)=>{
                     if(!res){
            
                         history.push('/Login')
                        }
                    }
                )
             }
             checkuseri()
        }
        
     
    }, [])

    return(
        <Route
    {...rest}
    render={routeProps=>
    currentUser ? (
            <RouteComponent {...routeProps}/>
        ) :null
      
    }
    />
    );
};
export default withRouter(PrivateRoute)