import React, { Fragment, useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
//import SideBar from './SideBar';
//import { css } from '@emotion/core';
import 'date-fns';
import { saveArchivoAction,getArchivoAction,deleteArchivoAction } from '../store/actions/archivosActions';
import { Container } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { FormGroup } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button,FormLabel,RadioGroup,Radio,FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import {MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';  
import { format } from 'date-fns';
import Loader from './Loader';
import Menu from './Menu';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2), 
      },
    },
  }));
  
function Archivo(props){
    const dispatch=useDispatch();
    const classes = useStyles();
    const error=useSelector(state=>state.archivos.error);
    const loading=useSelector(state=>state.archivos.loading);
   // const archivoGuardado=useSelector(state=>state.archivos.archivo);
    const archivoConsultado=useSelector(state=>state.archivos.archivo);
    const saveArchivo=(archivo,token) =>dispatch(saveArchivoAction(archivo,token));
    const getArchivo=(fecha) =>dispatch(getArchivoAction(fecha));
    const deleteArchivo=(id) =>dispatch(deleteArchivoAction(id));
    const [archivo,actualizaArchivo]=useState({});
    const [fecha, actualizaFecha] = useState(null);
    const [scada,actualizaScada]=useState(true);
    const [id,actualizaId]=useState(null);
    const [savedStatus,updateSavedStatus]=useState(false);
    const [fechaDiferente,updateFechaDiferente]=useState(false);
    const [guardarDesactivado,actualizaGuardarDesactivado]=useState(false);
    const [eliminarDesactivado,actualizaEliminarDesactivado]=useState(true);

    const user=useSelector(state=>state.user.user);
    useEffect(()=>{
 
      },[archivo])

      useEffect(()=>{
        if (fecha) obtenerArchivo(fecha);
        updateSavedStatus(false);
      },[fecha])

      useEffect(()=>{
        console.log(archivoConsultado);
        if (archivoConsultado.request)
          {
            archivoConsultado.request.status===200 ? actualizaGuardarDesactivado(true):actualizaGuardarDesactivado(false);
            archivoConsultado.request.status===200 ? actualizaEliminarDesactivado(false):actualizaEliminarDesactivado(true);

          }
        else
          {
            actualizaGuardarDesactivado(false);
            actualizaEliminarDesactivado(true);
           // updateFechaDiferente(false);
          }
       // actualizaArchivo(respuesta); 


      },[archivoConsultado])

      const obtenerArchivo=async(fecha)=>{
        await wait(1000);
        let fechaConFormato= format(
          new Date(fecha),
          'MM/dd/yyyy'
        )
      //  console.log(fechaConFormato.toString());
        const respuesta= getArchivo(fechaConFormato.toString());
        await wait(1000);

        return respuesta;
      }

      const handleChange = (event) => {
       // console.log(event.target.value);
        actualizaScada(event.target.value);
      };
    
      const wait=async(ms)=> {
        return new Promise(resolve => {
        setTimeout(resolve, ms);
        });
      }
      
      const guardarNuevo=async(archivoFile)=>{
        await wait(1000);
        if (user.token){
        const respuesta=  saveArchivo(archivoFile,user.token);
        await wait(1000);
    //    console.log(archivoGuardado);
        updateSavedStatus(true);
        return respuesta;
        }
        else{
          props.history.push('/');
        }
      }
      
      const tomarArchivo=(e)=> {
        //  console.log(e.target.files);
          actualizaArchivo(e.target.files);
          console.log(e.target.files);
          updateSavedStatus(false);
      } 
      
      const eliminarArchivo=async()=>{
        //  console.log('desde funcion');
       //   console.log(archivo.ruta);
          await wait(1000);
         // console.log(archivoConsultado);
         if (user.token){
          const respuesta=  deleteArchivo(archivoConsultado.data.id,user.token);
          await wait(1000);
          console.log(respuesta);
          updateSavedStatus(true);
          return respuesta;
         }
         else{
           props.history.push('/');
         }

        }

    return(

      
        <Fragment>
         <Menu></Menu>

          <h2 className="H2Componente">SUBIR ARCHIVO EXCEL</h2>
          <br/>
         
          {loading===true?
          <Fragment>
              <Loader className="Loader"></Loader>
              <h3 className="LoaderLabel">Procesando Archivo, espere por favor...</h3>
           </Fragment>:
          <form
            onSubmit={e=>{
              e.preventDefault();

               console.log(archivo[0].name);
               let dia=parseInt(archivo[0].name.substring(19,21));
               let mes=parseInt(archivo[0].name.substring(21,23));
               let año=parseInt(archivo[0].name.substring(23,25));
               let fechaValidacion= new Date(fecha );
               console.log(fechaValidacion.getYear());
               if(dia!==fechaValidacion.getDate()||mes!==(fechaValidacion.getMonth()+1)){
                 updateFechaDiferente(true);
                 return;
               }
               else{
                updateFechaDiferente(false);
               }
              
              let archivoCreado={
                ruta:archivo,
                scada,
                fecha
              }

             let fechaConFormato= format(
              new Date(archivoCreado.fecha),
              'dd/MM/yyyy'
            )
              let Archivo=new FormData();
              Archivo.append('ruta',archivo[0]);
              Archivo.append('fecha',   fechaConFormato);
              Archivo.append('SCADA',archivoCreado.scada);
              
            const respuesta=  guardarNuevo(Archivo);
        //   console.log(respuesta);

            }}
          >
          <FormGroup>
          <FormControl  className={classes.formControl,"Lista"}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container >
            <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="dd/MM/yyyy"
                value={fecha}
                onChange={actualizaFecha}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
             />

            </Grid>
          </MuiPickersUtilsProvider>
          </FormControl>
         
            <FormControl className={classes.formControl,"Radio"}> 

              <RadioGroup 
                className="Radio"
                aria-label="valorScada" 
                name="ScadaRadio"
                value={scada}
                onChange={handleChange}
              >
                <FormControlLabel  value = "true" control={<Radio color="primary" />} label="Valores SCADA" />
                <FormControlLabel   value = "false" control={<Radio color="primary" />} label="Datos comerciales" />
              </RadioGroup>
          </FormControl> 

              <FormControl className={classes.formControl}> 
                <div className="DivSubirArchivo">
                  <input
                    accept="excel"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={e=>actualizaArchivo(e.target.files)}
                    
                  />
                  <label htmlFor="contained-button-file">

                  </label>  
                </div>    
                          
              </FormControl>

            <Grid container justify="center" className="GridBoton">
                <Button disabled={guardarDesactivado} onChange={tomarArchivo} className="Boton" type="submit" variant="contained" color="primary">    Subir Archivo  </Button>
                <Button disabled={eliminarDesactivado} onClick={eliminarArchivo} className="Boton"  variant="contained" color="primary">    Eliminar Archivo  </Button>
                <br/>
            </Grid>   
               <div>   
                    { fechaDiferente===true?
                      <Alert className="Alert" severity={fechaDiferente===true?'error':'success'}>
                        {'La fecha seleccionada no coincide con el archivo seleccionado'}
                      </Alert>
                      :''  
                    }
                </div>        
                <div>   
                    { savedStatus===true?
                      <Alert className="Alert" severity={error===true?'error':'success'}>
                        {error===true ? 'Sucedio un error al procesar el archivo, intentelo nuevamente mas tarde o notifiquelo al departamento de TI'
                        :'Archivo procesado exitosamente!'}
                      </Alert>
                      :''  
                    }
                </div>
          </FormGroup>
      
          </form>
        }
        
        </Fragment>
        
    )
};

export default Archivo;