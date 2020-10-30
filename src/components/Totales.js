import React, { Fragment, useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import MaterialTable  from  'material-table';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import Menu from './Menu';
import { Grid,FormControl } from '@material-ui/core';
import { FormGroup } from '@material-ui/core';
import { Button} from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';  
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ExportarExcel from './ExportarExcel';
import Loader from './Loader';
import { getScadaValoresAction } from '../store/actions/scadaValoresActions';
import { getPlantasAction } from '../store/actions/plantasActions';
import { getFuentesAction } from '../store/actions/fuentesActions';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2), 
      },
    },
  }));

function Totales(props){

    const dispatch=useDispatch();
    const classes = useStyles();
    const [data,updateData]=useState([]);
    const [fecha1,updateFecha1]=useState(null);
    const [fecha2,updateFecha2]=useState(null);
    const [columns,updateColumns]=useState([]);
    const [nombrePlanta,updateNombrePlanta]=useState("Todos");
    const [idFuente,updateIdFuente]=useState(0);
    const [idZona,updateIdZona]=useState(0);
    const [idTension,updateIdTension]=useState(0);
    const [idOrigen,updateIdOrigen]=useState(0);
    const [loading,updateLoading]=useState(false);
    const error=useSelector(state=>state.scadaValores.error);
    const scadaValores=useSelector(state=>state.scadaValores.scadaValores);
    const fuentes=useSelector(state=>state.fuentes.fuentes);
    const plantas=useSelector(state=>state.plantas.plantas);
    const user=useSelector(state=>state.user.user);
    const getPlantas=() =>dispatch(getPlantasAction());
    const getFuentes=() =>dispatch(getFuentesAction());    
    const getScadaValores=(filtro,token,totales) =>dispatch(getScadaValoresAction(filtro,token,totales));

    useEffect(()=>{
     
        getPlantas();
        getFuentes();   
    
      }
      ,[]);

      useEffect(()=>{
                 
        if (scadaValores.data&&(fecha1||fecha2)){
    
          let data2=scadaValores;
          
             if (data2.data.length>0) {  
                    updateColumns( [{ title: 'Planta', field: 'nombre'  },
                                    { title: 'Total', field: 'sum' },
                                    { title: 'Fuente', field: 'fuente' },
                                    { title: 'Tension', field: 'tension' },
                                    { title: 'Zona', field: 'zona' },
                                    { title: 'origen', field: 'origen' }
                    ]);
             }
             updateData(data2.data);
          
            }
          updateLoading(false);
  
      },[scadaValores])
  
    const handleChange=async function(event){

        switch (event.target.name){
            case "zona":{
                updateIdZona(event.target.value);
                break;
            }
            case "fuente":{
                updateIdFuente(event.target.value);
                break;
            }
            case "planta":{
                updateNombrePlanta(event.target.value);
                break;
            }  
            case "tension":{
                updateIdTension (event.target.value);
                break;
            }  
            case "origen":{
                updateIdOrigen (event.target.value);
                break;
            }                                  
            default:{

            }
        }
  
    }
    const wait=async(ms)=> {
        return new Promise(resolve => {
        setTimeout(resolve, ms);
        });
      }
      
      const consultar=async()=>{
        updateLoading(true);
        await wait(1000);
        await getData();
        await wait(1000);
        updateLoading(false);

    }
   
    const getData=async function (){
        updateData([]);

          let filtro={};  
           
          if (fecha1) filtro.fecha1=fecha1;
          if (fecha2) filtro.fecha2=fecha2;
          if (nombrePlanta) filtro.nombrePlanta=nombrePlanta;
          if (idZona) filtro.idZona=idZona;
          if (idFuente) filtro.idFuente=idFuente;
          if (idTension) filtro.idTension=idTension;
          if (idOrigen) filtro.idOrigen=idOrigen;
   
      
        if (user.token)
        {
            getScadaValores(filtro,user.token,true);
        }
      else{
        //data2=[];
        props.history.push('/');
      }
        
    }    
 
    return(
      <Fragment>
          <Menu></Menu>
          <h2 className="H2ComponenteConsultaTotales">Totales Por Planta</h2>
          <FormGroup className="RangoFechas">
            <FormControl  className={classes.formControl,"Fecha"}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Fecha inicial"
                            format="dd/MM/yyyy"
                            value={fecha1}
                            onChange={updateFecha1}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </FormControl>
                      
                <FormControl  className={classes.formControl,"Fecha"}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Fecha final"
                            format="dd/MM/yyyy"
                            value={fecha2}
                            onChange={updateFecha2}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </FormControl>       
             </FormGroup>
             <FormGroup className="ListaConsulta">
                <FormControl className={classes.formControl,"ListaConsultaItem"}>
                    <InputLabel id="demo-simple-select-helper-label" value="list">Planta</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={nombrePlanta}
                        name="planta"
                        onChange={handleChange}
                    
                        
                    >
                        <MenuItem value="Todos" key="Todos">
                        <em>Todas las plantas</em>
                        </MenuItem>
                        {plantas ? plantas.map( planta=>
                        <MenuItem key={planta.rotulacionSCADA} value={planta.rotulacionSCADA} >{planta.rotulacionSCADA}</MenuItem>
                            ):''}  
                    </Select>
                </FormControl>
            
             <FormControl className={classes.formControl,"ListaConsultaItem"}>
                <InputLabel id="demo-simple-select-helper-label2" value="list">Tipo de Energia</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label2"
                    id="demo-simple-select-helper2"
                    value={idFuente}
                    name="fuente"
                    onChange={handleChange}                                
                >
                    <MenuItem value="0"key="Todos">
                    <em>Todas los tipos</em>
                    </MenuItem>
                    {fuentes ? fuentes.map( fuente=>
                    <MenuItem key={fuente.nombre} value={fuente.id} >{fuente.nombre}</MenuItem>
                        ):''}  
                </Select>
             </FormControl>
            
             <FormControl className={classes.formControl,"ListaConsultaItem"}>
                <InputLabel id="demo-simple-select-helper-label3" value="list">Zona</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label3"
                    id="demo-simple-select-helper3"
                    value={idZona}
                    name="zona"
                    onChange={handleChange} 
                    
                    
                >
                    <MenuItem value="0"key="Todos">
                    <em>Todas los zonas</em>
                    </MenuItem>
                        
                    <MenuItem key='LITORAL' value='1' >LITORAL</MenuItem>
                    <MenuItem key='OCCIDENTE' value='2' >OCCIDENTE</MenuItem>
                    <MenuItem key='NORTE' value='3' >NORTE</MenuItem>
                    <MenuItem key='CENTRO' value='4' >CENTRO</MenuItem>
                    <MenuItem key='SUR' value='5' >SUR</MenuItem>
                </Select>
             </FormControl>

             <FormControl className={classes.formControl,"ListaConsultaItem"}>
                <InputLabel id="demo-simple-select-helper-label3" value="list">Nivel de Tensión</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label3"
                    id="demo-simple-select-helper3"
                    value={idTension}
                    name="tension"
                    onChange={handleChange} 
                                       
                >
                    <MenuItem value="0"key="Todos">
                    <em>Todos los niveles de tension</em>
                    </MenuItem>
                        
                    <MenuItem key='ALTA' value='1' >ALTA</MenuItem>
                    <MenuItem key='MEDIA' value='2' >MEDIA</MenuItem>
                    <MenuItem key='BAJA' value='3' >BAJA</MenuItem>

                </Select>
             </FormControl>

             <FormControl className={classes.formControl,"ListaConsultaItem"}>
             <InputLabel id="demo-simple-select-helper-label3" value="list">Origen</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label3"
                    id="demo-simple-select-helper3"
                    value={idOrigen}
                    name="origen"
                    onChange={handleChange} 
                     
                >
                    <MenuItem value="0"key="Todos">
                    <em>Todos los tipos de origen</em>
                    </MenuItem>
                        
                    <MenuItem key='PRIVADO' value='1' >PRIVADO</MenuItem>
                    <MenuItem key='PUBLICO' value='2' >PUBLICO</MenuItem>

                </Select>
             </FormControl>

            </FormGroup>
        
        <Grid container justify="center" className="GridBotonConsulta">
                <Button onClick={consultar} className="Boton" type="submit" variant="contained" color="primary">   Realizar Consulta  </Button>
                <br/>
                <ExportarExcel data={data} columns={columns} ></ExportarExcel>        
        </Grid>  

       {loading===true?
            <Fragment>
                <br/><br/><br/><br/><br/><br/>
                <Loader ></Loader>
            </Fragment>
         :
            <div className="MaterialTable">
                { data.length>0 ? 
                
                    <MaterialTable

                    columns={columns}
                    data={data}
                    title=""
                    options={{
                        exportButton: false,
                        search: false,
                        pageSize:20
                        
                    }}
                    />
                
                :''}
            </div>
        }
        
      </Fragment>

    );
            
};

export default Totales;
