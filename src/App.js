import React, { Component } from 'react';
import './App.css';

import {BrowserRouter} from 'react-router-dom'
import {Route,Switch} from "react-router-dom"

import {AuthProvider} from "./Auth"
import PrivateRoute from "./provateroute"


import LoginPage from './pages/loginpage';
import SigninupPage from './pages/signuppage';
import MainPage from './pages/Main';
import HomePage from './pages/homepage';
import Pagenp from './pages/404';

class App extends Component {
state={
 speed:10 
}
render(){
return( 
    
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
)
}
}
export default App;
