import React, { Fragment, useState, useEffect } from 'react';
import {MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker} from '@material-ui/pickers';
import axios from 'axios';
import Menu from './Menu';
import { Grid,FormControl } from '@material-ui/core';
import { FormGroup } from '@material-ui/core';
import { Button} from '@material-ui/core'; 
import { makeStyles,useTheme } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';  
import { format } from 'date-fns';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ExportExcel from 'react-export-excel';
import MaterialTable,{ MTableToolbar } from 'material-table';


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


function Totales(props){
    //const URL='http://localhost:53363/api/';
    const URL='http://192.168.0.14:5100/api/';
    const classes = useStyles();
    const [data,updateData]=useState([]);
    const [fechas,updateFechas]=useState([]);
    const [fecha1,updateFecha1]=useState(null);
    const [fecha2,updateFecha2]=useState(null);
    const [plantas,updatePlantas]=useState([]);
    const [fuentes,updateFuentes]=useState([]);
    const [columns,updateColumns]=useState([]);
    const [nombrePlanta,updateNombrePlanta]=useState('Todos');
    const [idFuente,updateIdFuente]=useState(0);
    const [idZona,updateIdZona]=useState(0);


    useEffect(()=>{
     
      getPlantas();
      getFuentes();   


    }
    ,[]);

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

    const setColumns= async function(){
        const columns2=[
            { title: 'Planta', field: 'nombre'  },
            { title: 'Total', field: 'sum' }
           
        ];
       
    }

    const getPlantas=    async function (){
       const data2= await (axios.get(URL+'plantas'));
        console.log(data2.data);
        updatePlantas(data2.data);
        return data2.data;
        
    }
    const getFuentes=    async function (){
        const data2= await (axios.get(URL+'fuentes'));
         console.log(data2.data);
         updateFuentes(data2.data);
         return data2.data;
         
     }
    
    const handleChange=async function(event){
//console.log(event.target);
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
            default:{

            }
        }
       // updateNombrePlanta(event.target.value);
    }
    const wait=async(ms)=> {
        return new Promise(resolve => {
        setTimeout(resolve, ms);
        });
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
            urlFiltros+='filtro?totales=true&FechaInicial='+Fecha1;
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
                    urlFiltros+='filtro?totales=true&NombrePlanta='+nombrePlanta;
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
                      urlFiltros+='filtro?totales=true&IdZona='+idZona;
                  }
              }
          }

          if (idFuente){

              if (parseInt(idFuente)!==0){
                  if (fecha1 || fecha2 ||(nombrePlanta!=='Todos')||(idZona!==0)){
                      urlFiltros+='&IdFuente='+idFuente;
                  }
                  else{
                      urlFiltros+='filtro?totales=true&IdFuente='+idFuente;
                  }
                  
              }
          }

        const data2= await (axios.get(urlFiltros));
       updateColumns( [{ title: 'Planta', field: 'nombre'  },
                       { title: 'Total', field: 'sum' }]);

        console.log(data2);
        updateData(data2.data);  
        return data2;
    }
    

 
    return(
      <Fragment>
          <Menu></Menu>

          <h2 className="H2ComponenteConsulta">Totales Por Planta</h2>
          
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

            </FormGroup>

         
        <Grid container justify="center" className="GridBotonConsulta">
                <Button onClick={getData} className="Boton" type="submit" variant="contained" color="primary">   Realizar Consulta  </Button>
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

    );
            
};

export default Totales;
