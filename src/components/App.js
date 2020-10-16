import React,{Component} from 'react';
import "../index.css";
//import Home from './components/Home';
//import Login from './components/Login';
import Archivo from './Archivo';
import ScadaValores from './ScadaValores';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Home';
import Subestacion from './Subestacion';
import SubestacionEditar from './SubestacionEditar';
import Totales from './Totales';
import Login from './Login';
import Cambiar from './CambiarContraseña';
import DatosComerciales from './DatosComerciales';
import DatosComercialesTotales from './DatosComercialesTotales';

class App  extends Component {

  render(){ 
    return (

        <Router>
      
          <Switch>

            <Route exact path='/DatosComerciales' component={DatosComerciales}  />
            <Route exact path='/DatosComercialesTotales' component={DatosComercialesTotales}  /> 
                <Route exact path='/Totales' component={Totales}  /> 
                <Route exact path='/ScadaValores' component={ScadaValores}  /> 
               <Route exact path='/Archivo' component={Archivo}  />
               <Route exact path='/Subestacion' component={Subestacion}  />
               <Route exact path='/SubestacionEditar' component={SubestacionEditar}  />
               <Route exact path='/Home' component={Home}  />
               <Route exact path='/Cambiar' component={Cambiar}  /> 
               <Route exact path='/Login' component={Login}  />  
               <Route exact path='/Logout' component={Login}  />   
               <Route exact path='/' component={Login}  />       
         
          </Switch>
          
      </Router>
      
    );
  }
  }

export default App;
