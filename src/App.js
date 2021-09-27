import React, { Component } from 'react';
import './App.css';

import {BrowserRouter} from 'react-router-dom'
import {Route,Switch} from "react-router-dom"

import {AuthProvider} from "./Auth"
import PrivateRoute from "./provateroute"

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import LoginPage from './pages/loginpage';
import SigninupPage from './pages/signuppage';
import MainPage from './pages/Main';
import HomePage from './pages/homepage';
import Pagenp from './pages/404';
import { indigo,blue } from '@mui/material/colors';  
const App =()=> {

  const theme = createTheme({
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
   <ThemeProvider theme={theme}>
 <AuthProvider>
  
 <BrowserRouter>
 <div>
    
     
<Switch>
<PrivateRoute path="/mainpage" exact component={MainPage}/>
<Route path="/Login" exact component={LoginPage}/>
<Route path="/Signup" exact component={SigninupPage}/>
<Route path="/" exact component={HomePage}/>
<Route  component={Pagenp}/>
</Switch>
</div>
</BrowserRouter>

</AuthProvider> 
</ThemeProvider> 
)

}
export default App;
