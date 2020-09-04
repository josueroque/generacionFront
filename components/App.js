import React,{Component} from 'react';
import "./index.css";
import Home from './components/Home';
import Login from './components/Login';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


class App  extends Component {

  render(){ 
    return (

        <Router>
      
          <Switch>

            {/* <Route exact path='/edit/:id' component={EditAd}  /> */}

            <Route exact path='/Login' component={Login}  />
            <Route exact path='/' component={Home}  />
          </Switch>
          
      </Router>
      
    );
  }
  }

export default App;
