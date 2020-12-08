import React, { Fragment, useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import MaterialTable  from  'material-table';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import Menu from './Menu';
import { Grid,FormControl,FormLabel,RadioGroup,Radio,FormControlLabel } from '@material-ui/core';
import { FormGroup } from '@material-ui/core';
import { Button} from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns'; 
import { format } from 'date-fns'; 
import ExportarExcel from './ExportarExcel';
import Loader from './Loader';
import { getInadvertidoAction } from '../store/actions/inadvertidoActions';


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2), 
      },
    },
  }));
  
function Inadvertido(props){

    const dispatch=useDispatch();
    const classes = useStyles();
    const [tipo, updateTipo] = useState('horaria');
    const [data,updateData]=useState([]);
    const [fecha1,updateFecha1]=useState(null);
    const [fecha2,updateFecha2]=useState(null);
    const [columns,updateColumns]=useState([]);
    const [loading,updateLoading]=useState(false);
    const error=useSelector(state=>state.inadvertido.error);
    const inadvertido=useSelector(state=>state.inadvertido.inadvertido);
    const user=useSelector(state=>state.user.user);
    const getInadvertido=(filtro,token) =>dispatch(getInadvertidoAction(filtro,token));
   
    useEffect(()=>{
                  
      if (inadvertido.data&&(fecha1||fecha2)){
        let columns2=[
            { title: 'Fecha', field: 'fecha'},
            { title: 'Hora', field: 'hora' },
            { title: 'Recibido', field: 'recibido' },
            { title: 'Enviado', field: 'enviado' },

        ];

        let data2=inadvertido;
      
          if(data2.data.length>0){
            data2.data.map(item=>{
              let recibido=0;
              let enviado=0;
              item.fecha=format(new Date(item.fecha),'dd/MM/yyyy');
              if (item.amm<0) recibido+=Math.abs(item.amm);
              if (item.ut<0) recibido+=Math.abs(item.ut);
              if (item.enatrel<0) recibido+=Math.abs(item.enatrel);
              if (item.amm>0) enviado+=item.amm;
              if (item.ut>0) enviado+=item.ut;
              if (item.enatrel>0) enviado+=item.enatrel;
              item.enviado=enviado.toFixed(3);
              item.recibido=recibido.toFixed(3);

            });
          }
                
        if(tipo==="diaria"){
          columns2=[
            { title: 'Fecha', field: 'fecha'},
            { title: 'Recibido', field: 'recibido' },
            { title: 'Enviado', field: 'enviado' },
          ];       

          let dataDiaria=[];
          let fechaActual=new Date(fecha1);
          let fechaFinal=new Date(fecha2);
          while(fechaActual<=fechaFinal){
            let enviadoDiario=0;
            let recibidoDiario=0;
            let lista= data2.data.filter(item=>{
              return item.fecha===format(fechaActual,'dd/MM/yyyy'); 
            });
            lista.map(item=>{
              if (item.amm<0) recibidoDiario+=Math.abs(item.amm);
              if (item.ut<0) recibidoDiario+=Math.abs(item.ut);
              if (item.enatrel<0) recibidoDiario+=Math.abs(item.enatrel);
              if (item.amm>0) enviadoDiario+=item.amm;
              if (item.ut>0) enviadoDiario+=item.ut;
              if (item.enatrel>0) enviadoDiario+=item.enatrel;
            })

            let fila={fecha:format(new Date(fechaActual),'dd/MM/yyyy'),
            enviado:enviadoDiario.toFixed(3),recibido:recibidoDiario.toFixed(3)};
            dataDiaria.push(fila);
            fechaActual.setDate(fechaActual.getDate()+1);
          
          }
          updateData(dataDiaria);


        }
        if (data2.data.length>0) updateColumns(columns2);
        if(tipo!=="diaria") updateData(data2.data);

      }
        
        updateLoading(false);

    },[inadvertido])
    
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
    }

    const getData=async function (){
        updateData([]);

          let filtro={};  
           
          if (fecha1) filtro.fecha1=fecha1;
          if (fecha2) filtro.fecha2=fecha2;
         
        if (user.token)
        {
            getInadvertido(filtro,user.token);
        }
      else{
           props.history.push('/');
      }
        
    }
    const handleChange = (event) => {
      updateTipo(event.target.value);
    };
    return(
      <Fragment>
          <Menu></Menu>
          <h2 className="H2ComponenteConsulta">Inadvertido</h2>
          <FormGroup >
          <FormControl component="fieldset">
            
            <RadioGroup aria-label="tipoConsulta"  className="TipoConsulta" name="tipo1" value={tipo} onChange={handleChange}>
                <h4>Tipo de Consulta</h4>
                <FormControlLabel value="horaria" control={<Radio />} label="Horaria" className="RadioItem"/>
                <FormControlLabel value="diaria" control={<Radio />} label="Diaria" className="RadioItem"/>
              </RadioGroup>
            </FormControl>
            </FormGroup>
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
                <ExportarExcel data={data} columns={columns} ></ExportarExcel>           
        </Grid>  
       
         <div className="MaterialTable">
            { data.length>0 ? 
            
                <MaterialTable

                columns={columns}
                 data={data}
                title=""
                options={{
                    exportButton: false,
                    search:false,
                    pageSize:24
                  }}
                />
              
            :''}
         </div>
         </Fragment>
        }
   
      </Fragment>

    );
            
};

export default Inadvertido;
