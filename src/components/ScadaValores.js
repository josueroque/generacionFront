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
   // const URL='http://localhost:53363/api/';
    const URL='http://192.168.0.14:5100/api/';
    const classes = useStyles();
    const [data,updateData]=useState([]);
    const [fechas,updateFechas]=useState([]);
    const [fecha1,updateFecha1]=useState(null);
    const [fecha2,updateFecha2]=useState(null);
    const [plantas,updatePlantas]=useState([]);
    const [flag,updateFlag]=useState(false);
    const [columns,updateColumns]=useState([]);
    const [idPlanta,updateIdPlanta]=useState(null);
    const [nombrePlanta,updateNombrePlanta]=useState("Todos");
    const [loading,updateLoading]=useState(false);


    useEffect(()=>{
     
     getPlantas();       

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
    
    const handleChangePlanta=async function(event){
        updateNombrePlanta(event.target.value);
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
            urlFiltros+='filtro?FechaInicial='+Fecha1;
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
                    urlFiltros+='filtro?NombrePlanta='+nombrePlanta;
                }
            }
        }
     
        const data2= await (axios.get(urlFiltros));
     //   await wait(1000);

       // let diccionarioPlantas= Object.fromEntries(data2.data.map(m => [m.planta.nombre,m.planta.nombre]));
        let diccionarioFechas=Object.fromEntries(data2.data.map(m => [format(new Date(m.fecha   ),'dd/MM/yyyy' ),m.fecha]));
             

       // const plantas2=Object.keys(diccionarioPlantas);
        const fechas2=Object.keys(diccionarioFechas);  

        fechas2.sort(function(a,b){
            return new Date(a) - new Date(b)
          })
      
        const dataCruzada=[];
      
      //  console.log(data2.data);
        const horas=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
      // console.log(data2.data);
        for(let item3 of fechas2){
            
            for (let item4 of horas){
                const valoresPlanta=data2.data.filter(function(dato){
                    // console.log(dato.fecha);
                    // console.log(new Date(dato.fecha),'dd/MM/yyyy');
                    return format(new Date(dato.fecha),'dd/MM/yyyy' ) ===item3 && dato.hora===item4 ;
                });

                let auxiliar={};
                auxiliar["fecha"]=item3;
                auxiliar["hora"]=item4;

                for (let item5 of valoresPlanta){
                  { item5.valor>0? auxiliar[item5.planta.nombre]=(parseFloat(item5.valor)*1000).toFixed(0):auxiliar[item5.planta.nombre]=0 };
                }


               dataCruzada.push(auxiliar);
            }
           

        }
       // await wait(1000);
        const columns2=[
            { title: 'Fecha', field: 'fecha'},
            { title: 'Hora', field: 'hora' }
           
        ];

       let plantas2=plantas.filter(p=>{
         return p.intercambio===false;
       })
       
       console.log(plantas2);

        for (let item6 of plantas2){
         //   console.log(item6);
            columns2.push({ title: item6.nombre, field: item6.nombre,type:"numeric"});
        } 
        
        updateColumns(columns2);

        updateData(dataCruzada);
     
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
          
             <FormControl className={classes.formControl}>
             <InputLabel id="demo-simple-select-helper-label" value="list">Planta</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={nombrePlanta}
                    name="planta"
                    onChange={handleChangePlanta}
                    
                >
                    <MenuItem value="Todos"key="Todos">
                    <em>Todas las plantas</em>
                    </MenuItem>
                    {plantas ? plantas.map( planta=>
                    <MenuItem key={planta.rotulacionSCADA} value={planta.rotulacionSCADA} >{planta.rotulacionSCADA}</MenuItem>
                        ):''}  
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
