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
import { format } from 'date-fns'; 
import ExportarExcel from './ExportarExcel';
import Loader from './Loader';
import { getCurvaDemandaAction } from '../store/actions/curvaDemandaActions';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2), 
      },
    },
  }));
  
function CurvaDemanda(props){

    const dispatch=useDispatch();
    const classes = useStyles();
    const [data,updateData]=useState([]);
    const [fecha1,updateFecha1]=useState(null);
    const [fecha2,updateFecha2]=useState(null);
    const [columns,updateColumns]=useState([]);
    const [loading,updateLoading]=useState(false);
    const error=useSelector(state=>state.scadaValores.error);
    const curvaDemanda=useSelector(state=>state.curvaDemanda.curvaDemanda);
    const user=useSelector(state=>state.user.user);
    const getCurvaDemanda=(filtro,token) =>dispatch(getCurvaDemandaAction(filtro,token));
   
    useEffect(()=>{
                  
      if (curvaDemanda.data&&(fecha1||fecha2)){
        const columns2=[
            { title: 'Fecha', field: 'fecha'},
            { title: 'Hora', field: 'hora' },
            { title: 'Valor Máximo', field: 'valorMaximo' },
            { title: 'Valor Minimo', field: 'valorMinimo' },

        ];

        let data2=curvaDemanda;

        if(data2.data.length>0){
          data2.data.map(item=>{
            item.fecha=format(new Date(item.fecha),'dd/MM/yyyy')
          });
        }

        if (data2.data.length>0) updateColumns(columns2);
            updateData(data2.data);
      }
        
        updateLoading(false);

    },[curvaDemanda])

    useEffect(()=>{

      }
    ,[]);
    
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
            getCurvaDemanda(filtro,user.token);
        }
      else{
           props.history.push('/');
      }
        
    }
     
    return(
      <Fragment>
          <Menu></Menu>
          <h2 className="H2ComponenteConsulta">Curva de Demanda</h2>
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
                    search:false
                  }}
                />
              
            :''}
         </div>
         </Fragment>
        }
   
      </Fragment>

    );
            
};

export default CurvaDemanda;
