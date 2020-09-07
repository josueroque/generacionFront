import React,{Component} from 'react';
import "../index.css";
//import Home from './components/Home';
//import Login from './components/Login';
import Archivo from './Archivo';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


class App  extends Component {

  render(){ 
    return (

        <Router>
      
          <Switch>

            {/* <Route exact path='/edit/:id' component={EditAd}  /> */}

            {/* <Route exact path='/Login' component={Login}  /> */}
            {/* <Route exact path='/' component={Home}  /> */}

               <Route exact path='/' component={Archivo}  />
          </Switch>
          
      </Router>
      
    );
  }
  }

export default App;
