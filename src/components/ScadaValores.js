import React, { Fragment, useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import MaterialTable,{ MTableToolbar } from 'material-table';
import {MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker} from '@material-ui/pickers';
import axios from 'axios';
import Menu from './Menu';
import { Grid,FormLabel,RadioGroup,Radio,FormControlLabel,FormControl } from '@material-ui/core';
import { FormGroup } from '@material-ui/core';
import { Button} from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';  
import { format } from 'date-fns';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ExportExcel from 'react-export-excel';
import Loader from './Loader';
const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2), 
      },
    },
  }));
  const ExcelFile=ExportExcel.ExcelFile;
  const ExcelSheet=ExportExcel.ExcelSheet;
  const ExcelColumn=ExportExcel.ExcelColumn;
  
function ScadaValores(props){
 //  const URL='http://localhost:53363/api/';
   const URL='http://192.168.0.14:5100/api/';
    const classes = useStyles();
    const [data,updateData]=useState([]);
    const [fecha1,updateFecha1]=useState(null);
    const [fecha2,updateFecha2]=useState(null);
    const [plantas,updatePlantas]=useState([]);
    const [columns,updateColumns]=useState([]);
    const [nombrePlanta,updateNombrePlanta]=useState("Todos");
    const [fuentes,updateFuentes]=useState([]);
    const [idFuente,updateIdFuente]=useState(0);
    const [idZona,updateIdZona]=useState(0);
    const [idTension,updateIdTension]=useState(0);
    const [idOrigen,updateIdOrigen]=useState(0);
    const [loading,updateLoading]=useState(false);
    const user=useSelector(state=>state.user.user);


    useEffect(()=>{
     
        getPlantas();       
        getFuentes();  
      }
    ,[]);

    const getFuentes=    async function (){
      const data2= await (axios.get(URL+'fuentes'));

       updateFuentes(data2.data);
       return data2.data;
       
    }

    const ExportarExcelComponente= function(){
        return(
        <div>
        <ExcelFile element={<Button className="Boton" type="submit" variant="contained" color="primary">Exportar a Excel</Button> }fileName="GeneracionPorPlanta">
            {data?
                <ExcelSheet data={data} name="GeneracionPorPlanta">
                {columns ? columns.map( dataItem=>
                    <ExcelColumn label={dataItem.title} key={dataItem.title} value={dataItem.field} > </ExcelColumn>
                        ):''}  
                
                </ExcelSheet>:''
            }
        </ExcelFile>
      </div>   
        )
    }

    const wait=async(ms)=> {
        return new Promise(resolve => {
        setTimeout(resolve, ms);
        });
    }

    const getPlantas=    async function (){
       const data2= await (axios.get(URL+'plantas'));
        
        updatePlantas(data2.data);
        return data2.data;
        
    }
    
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

    const consultar=async()=>{
        updateLoading(true);
        await wait(1000);
        await getData();
        await wait(1000);
        updateLoading(false);

    }

    const getData=async function (){
      
        let Fecha1= format(
            new Date(fecha1),
            'MM/dd/yyyy'
          )

        let Fecha2= format(
            new Date(fecha2),
            'MM/dd/yyyy'
          )

          let urlFiltros=URL+'scadavalores/';
    
          if (fecha1){
              urlFiltros+='filtro?totales=false&FechaInicial='+Fecha1;
          }
          if (fecha2){
             fecha1?urlFiltros+='&FechaFinal='+Fecha2: urlFiltros+='filtro?FechaFinal='+Fecha2;
          }
          if (nombrePlanta){
            //  console.log(nombrePlanta);
              if (nombrePlanta!=='Todos'){
                  if (fecha1 || fecha2){
                      urlFiltros+='&NombrePlanta='+nombrePlanta;
                  }
                  else{
                      urlFiltros+='filtro?totales=false&NombrePlanta='+nombrePlanta;
                  }
              }
          }
          if (idZona){
              //  console.log(nombrePlanta);
                if (parseInt(idZona)!==0){
                    if (fecha1 || fecha2 ||(nombrePlanta!=='Todos')){
                        urlFiltros+='&IdZona='+idZona;
                    }
                    else{
                        urlFiltros+='filtro?totales=false&IdZona='+idZona;
                    }
                }
            }
  
            if (idFuente){
  
                if (parseInt(idFuente)!==0){
                    if (fecha1 || fecha2 ||(nombrePlanta!=='Todos')||(idZona!==0)){
                        urlFiltros+='&IdFuente='+idFuente;
                    }
                    else{
                        urlFiltros+='filtro?totales=false&IdFuente='+idFuente;
                    }
                    
                }
            }
            if (idTension){
  
              if (parseInt(idTension)!==0){
                  if (fecha1 || fecha2 ||(nombrePlanta!=='Todos')||(idTension!==0)){
                      urlFiltros+='&IdTension='+idTension;
                  }
                  else{
                      urlFiltros+='filtro?totales=false&IdTension='+idTension;
                  }
                  
              }
          }
          
          if (idOrigen){
  
              if (parseInt(idOrigen)!==0){
                  if (fecha1 || fecha2 ||(nombrePlanta!=='Todos')||(idOrigen!==0)){
                      urlFiltros+='&IdOrigen='+idOrigen;
                  }
                  else{
                      urlFiltros+='filtro?totales=false&IdOrigen='+idOrigen;
                  }
                  
              }
          }
     console.log(urlFiltros);  
     let data2;
     if (user.token)
     {
        const config = {
          headers: { 
           
            'Authorization': 'Bearer ' + user.token},
        };
         data2= await (axios.get(urlFiltros,config));
      }
      else{
        data2=[];
        props.history.push('/');
      }
        
      

       console.log(data2.data[0]);

        const columns2=[
            { title: 'Fecha', field: 'fecha'},
            { title: 'Hora', field: 'hora' }
           
        ];

       let plantas2=plantas.filter(p=>{
         return p.intercambio===false;
       })
       
       console.log(plantas2);


        for (let item6 of plantas2){
          // console.log(item6);
            if (data2.data[0]) {
                let existe = data2.data.filter(function (o) {
                    return o.hasOwnProperty(item6.nombre);
                }).length > 0;
                
                if (existe ===true) columns2.push({ title: item6.nombre, field: item6.nombre,type:"numeric"});
            } 
        }
        console.log(columns2);
        updateColumns(columns2);

       // updateData(dataCruzada);
       updateData(data2.data);
     
        return ;
    }
    
 
    return(
      <Fragment>
          <Menu></Menu>

          <h2 className="H2ComponenteConsulta">Generación Valores SCADA</h2>
          
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
          
             <FormControl className={classes.formControl,"ListaConsultaItem"}>
             <InputLabel id="demo-simple-select-helper-label" value="list">Planta</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={nombrePlanta}
                    name="planta"
                    onChange={handleChange}
                    
                >
                    <MenuItem value="Todos"key="Todos">
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
                    <em>Todos los tipos</em>
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
        {loading?
        <Fragment>
            <br/><br/><br/>
        <Loader></Loader>
        <Grid container justify="center">Espere por favor...</Grid>
        </Fragment>
        :
        <Fragment>
            
        <Grid container justify="center" className="GridBotonConsulta">
                <Button onClick={consultar} className="Boton" type="submit" variant="contained" color="primary">   Realizar Consulta  </Button>
                <br/>
                <ExportarExcelComponente></ExportarExcelComponente>        
        </Grid>  
       
         <div className="MaterialTable">
            { data.length>0 ? 
            
                <MaterialTable

                columns={columns}
                 data={data}
                title=""
                options={{
                    exportButton: false
                  }}
                />
              
            :''}
         </div>
         </Fragment>
        }
   
      </Fragment>

    );
            
};

export default ScadaValores;
