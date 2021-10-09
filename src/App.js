/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import './App.css';

import {BrowserRouter} from 'react-router-dom'
import {Route,Switch} from "react-router-dom"

import AuthProvider from "./Auth"
import PrivateRoute from "./provateroute"
import Checkout from './pages/checkout'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import LoginPage from './pages/loginpage';
import SigninupPage from './pages/signuppage';
import MainPage from './pages/Main';
import HomePage from './pages/homepage';
import Pagenp from './pages/404';
import { indigo,blue } from '@mui/material/colors';  
import CartPage from './pages/cart';
import CartContextProvider from './Context/cartapi'
import Orders from './pages/orders';
import CompanyContextProvider from './Context/companycontext'
import CreateCompany from './pages/createcompany';
import UIContextProvider from './Context/UIcontextapi';
import Loading from './Components/loading'
import Snackbars from './Components/snackbar';
import Profile from './pages/profile';
import Subscription from './pages/subcriptions';
import Companies from './pages/companies';
import Viewinvoice from './pages/viewinvoice';
import Thankyou from './pages/thankyou';

const App =()=> {
  const defaultTheme = createTheme();
  const theme = createTheme({
    ...defaultTheme,
    palette: {
      type: "ligth",  
      primary: {
        main: indigo[900],
      },
      secondary: {
        main: blue[300],
      },
    },
    typography: {   
      fontFamily:'Nunito',
      fontSize: 14,    
    },
    
  });
return( 
   <ThemeProvider theme={defaultTheme}>
     {console.log(defaultTheme)}
     <UIContextProvider>

  
 <BrowserRouter>

 <AuthProvider>
  
 <CartContextProvider>  
   <CompanyContextProvider>
     <Snackbars/>
<Switch>
<PrivateRoute path="/mainpage" exact component={MainPage}/>
<Route path="/cart" exact component={CartPage}/>
<PrivateRoute path="/Orders" exact component={Orders}/>
<PrivateRoute path="/Checkout" exact component={Checkout}/>
<PrivateRoute path="/CreateCompany" exact component={CreateCompany}/>
<PrivateRoute path="/profile" exact component={Profile}/>
<PrivateRoute path="/subscriptions" exact component={Subscription}/>
<PrivateRoute path="/Companies" exact component={Companies}/>
<PrivateRoute path="/invoice/:id" exact component={Viewinvoice}/>
<Route path="/thankyou" exact component={Thankyou}/>
<Route path="/Login" exact component={LoginPage}/>
<Route path="/Signup" exact component={SigninupPage}/>
<Route path="/" exact component={HomePage}/>
<Route  component={Pagenp}/>

</Switch>
</CompanyContextProvider>
</CartContextProvider>
</AuthProvider> 


</BrowserRouter>


</UIContextProvider>
</ThemeProvider> 
)

}
export default App;
