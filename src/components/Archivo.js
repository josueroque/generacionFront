import React, { Fragment, useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
//import SideBar from './SideBar';
//import { css } from '@emotion/core';
import 'date-fns';
import { saveArchivoAction } from '../store/actions/archivosActions';
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
    const error=useSelector(state=>state.error);
    const saveArchivo=(archivo) =>dispatch(saveArchivoAction(archivo));
    const [archivo,actualizaArchivo]=useState('value');
    const [fecha, actualizaFecha] = useState(null);
    const [scada,actualizaScada]=useState(true);
    const [id,actualizaId]=useState(null);


    useEffect(()=>{
       console.log(archivo[0]);
      },[archivo])

      useEffect(()=>{
     //   console.log(scada);
      },[scada])

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
        console.log('desde funcion');
        console.log(archivo.ruta);
        await wait(1000);
        const respuesta=  saveArchivo(archivoFile);
        await wait(1000);
        return respuesta;
      }
      
      const tomarArchivo=(e)=> {
          console.log(e.target.files);
          actualizaArchivo(e.target.files);
      }        

    return(
        <Fragment>
          <h2 className="H2Componente">SUBIR ARCHIVO EXCEL</h2>
          <br/>
          <form
            onSubmit={e=>{
              e.preventDefault();
              let archivoCreado={
                ruta:archivo,
                scada,
                fecha
              }
              console.log(archivo[0]);
             // let objetoArchivo=URL.createObjectURL(archivo[0]);
             // console.log(objetoArchivo);
             let fechaConFormato= format(
              new Date(archivoCreado.fecha),
              'dd/MM/yyyy'
            )
              let Archivo=new FormData();
              Archivo.append('ruta',archivo[0]);
              Archivo.append('fecha',   fechaConFormato);
              Archivo.append('SCADA',archivoCreado.scada);
              
            const respuesta=  guardarNuevo(Archivo);
            console.log(respuesta);

            }}
          >
          <FormGroup>
          <FormControl  className={classes.formControl,"Lista"}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="left">
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
                <FormControlLabel  value = "false" control={<Radio color="primary" />} label="Datos comerciales" />
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
                <Button onChange={tomarArchivo} className="Boton" type="submit" variant="contained" color="primary">    Subir Archivo  </Button>
                <Button className="Boton" type="submit" variant="contained" color="primary">    Aplicar Archivo  </Button>
            </Grid>           

          </FormGroup>
          </form>
        </Fragment>
    )
};

export default Archivo;