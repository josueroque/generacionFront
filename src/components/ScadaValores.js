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
    const URL='http://localhost:53363/api/';
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


    useEffect(()=>{
     
     getPlantas();       

    }
    ,[]);

    // useEffect(()=>{
    //     setColumns();
    // },[plantas])
    const ExportarExcelComponente= function(){
        return(
        <div>
        <ExcelFile element={<button>Exportar a Excel</button> }fileName="GeneracionPorPlanta">
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
            { title: 'Fecha', field: 'fecha' },
            { title: 'Hora', field: 'hora' }
           
        ];
       
        for (let item of plantas){
            columns2.push({ title: item, field: item});
        } 
    }

    const getPlantas=    async function (){
       const data2= await (axios.get(URL+'plantas'));
        
        updatePlantas(data2.data);
        return data2.data;

        
    }
    
    const handleChangePlanta=async function(event){
        updateNombrePlanta(event.target.value);
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
            console.log(nombrePlanta);
            if (nombrePlanta!=='Todos'){
                if (fecha1 || fecha2){
                    urlFiltros+='&NombrePlanta='+nombrePlanta;
                }
                else{
                    urlFiltros+='filtro?NombrePlanta='+nombrePlanta;
                }
            }
        }
        console.log(urlFiltros);
        const data2= await (axios.get(urlFiltros));
        const plantas2=[];
        const fechas2=[];

        
        for(let item of data2.data){
            if (!plantas2.includes(item.planta.rotulacionSCADA)){
                plantas2.push(item.planta.rotulacionSCADA);
            }
        }

        for(let item2 of data2.data){
            if (!fechas2.includes(item2.fecha)){
                fechas2.push(item2.fecha);
            }
        }
        
       updateFechas(fechas2);
      //  updatePlantas(plantas2);
      
        const dataCruzada=[];
        console.log(data2.data);
        const horas=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
        
        for(let item3 of fechas2){
            
            for (let item4 of horas){
                const valoresPlanta=data2.data.filter(function(dato){
                    return dato.fecha===item3 && dato.hora===item4 ;
                });

                let auxiliar={};
                auxiliar["fecha"]=item3;
                auxiliar["hora"]=item4;
                for (let item5 of valoresPlanta){
                    auxiliar[item5.planta.rotulacionSCADA]=item5.valor;
                }

               // console.log(auxiliar);
               dataCruzada.push(auxiliar);
            }
           
           // console.log(planta);


        }

        const columns2=[
            { title: 'Fecha', field: 'fecha' },
            { title: 'Hora', field: 'hora' }
           
        ];
       
        for (let item6 of plantas2){
            columns2.push({ title: item6, field: item6});
        } 
        
        updateColumns(columns2);

        console.log(columns2);
        console.log(dataCruzada);
        updateData(dataCruzada);
        return dataCruzada;
    }
    


    async function exportarExcel(){
        let columnas=[];
        // let diccionario={1:'A',2:'B',3:'C',4:'D',5:'E',6:'F',7:'G',8:'H',9:'I',10:'J',11:'K',12:'L',13:'M',14:'N',15:'N',
        //                     16:'O',17:'P',18:'Q',19:'R',20:'S',21:'T',22:'U',23:'V',24:'W',25:'X',26:'Y',27:'Z',28:'AA',
        //                     29:'AB',30:'AC',31:'AD',32:'AF',33:'AG',34:'AH',35:'',36:'',37:'',38:'',39:'',40:'',41:'',
        //                     42:'',43:'',44:'',45:'',46:'',47:'',48:'',49:'',50:'',51:'',52:'',53:'',54:'',55:'',
        //                     56:'',57:'',58:'',59:'',60:'',61:'',62:'',63:'',64:'',65:'',66:'',67:'',68:'',
        //                     69:'',70:'',71:'',72:'',73:'',74:'',75:'',76:'',77:'',78:'',79:'',80:'',81:'',
        //                     82:'',83:'',84:'',85:'',86:'',87:'',88:'',89:'',90:'',91:'',92:'',93:'',94:'',
        //                     95:'',96:'',97:'',98:'',99:'',100:'',101:'',102:'',103:'',104:'',105:'',106:'',
        //                     107:'',108:'',109:'',110:''};
        console.log (columns);
        console.log(data);
        var data=  {
            cols: [{ name: "A", key: 0 }, { name: "B", key: 1 }, { name: "C", key: 2 }],
            data: [
              [ "id",    "name", "value" ],
              [    1, "sheetjs",    7262 ],
              [    2, "js-xlsx",    6969 ]
            ]
          };

    }

     //console.log(data);
    // console.log(plantas);
    // console.log(fechas);

    

    return(
      <Fragment>
          <Menu></Menu>
          
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
         
        <Grid container justify="center" className="GridBoton">
                <Button onClick={getData} className="Boton" type="submit" variant="contained" color="primary">   Realizar Consulta  </Button>
                <br/>
                <Button onClick={exportarExcel} className="Boton" type="submit" variant="contained" color="primary">   Exportar a excel  </Button>
                <ExportarExcelComponente></ExportarExcelComponente>        
        </Grid>  

         <div className="MaterialTable">
            { data.length>0 ? 
            
                <MaterialTable

                columns={columns}
                 data={data}
                title="Generación Valores SCADA"
                />
              
            :''}
         </div>
            
   
      </Fragment>

    );
            
};

export default ScadaValores;
