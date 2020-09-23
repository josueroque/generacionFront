import React, { Fragment, useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { saveSubestacionAction } from '../store/actions/subestacionesActions';
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
import { format } from 'date-fns';
import Loader from './Loader';
import Menu from './Menu';
import { Update } from '@material-ui/icons';

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
  
function Subestacion(props){
    const dispatch=useDispatch();
    const classes = useStyles();
    const error=useSelector(state=>state.subestaciones.error);
    const loading=useSelector(state=>state.subestaciones.loading);
    const subestacionGuardado=useSelector(state=>state.subestaciones.subestacion);
    const saveSubestacion=(subestacion) =>dispatch(saveSubestacionAction(subestacion));
    const [subestacion,actualizaSubestacion]=useState(null);
    const [nombre, actualizaNombre] = useState(null);
    const [zonaId,actualizaZonaId]=useState(null);
    const [id,actualizaId]=useState(null);
    const [nomenclatura,actualizaNomenclatura]=useState(null);
    const [savedStatus,updateSavedStatus]=useState(false);

      const handleChange = (event) => {
       // console.log(event.target.value);
        //actualizaScada(event.target.value);
        console.log(event.target.name);
        switch(event.target.name){
            case 'zona':
            {
                actualizaZonaId(event.target.value);
                break;
            }
            case 'nombre':
            {
                actualizaNombre(event.target.value);
                break;    
            }
            case 'nomenclatura':
            {
                actualizaNomenclatura(event.target.value);
                break;

            }
            default:{

            }
        }    
      };
    
      const wait=async(ms)=> {
        return new Promise(resolve => {
        setTimeout(resolve, ms);
        });
      }
      
      const guardarNuevo=async(subestacion)=>{
      //  console.log('desde funcion');
     //   console.log(archivo.ruta);
        await wait(300);
        const respuesta=  saveSubestacion(subestacion);
        await wait(300);
        console.log(subestacionGuardado);
        updateSavedStatus(true);
        return respuesta;
      }
      
    //   const tomarArchivo=(e)=> {
    //     //  console.log(e.target.files);
    //       actualizaArchivo(e.target.files);
    //       updateSavedStatus(false);
    //   }        

    return(

      
        <Fragment>
         <Menu></Menu>

          <h2 className="H2Componente">Crear Subestacion</h2>
          <br/>
         
          {loading===true?
          <Fragment>
              <Loader className="Loader"></Loader>
              <h3 className="LoaderLabel">Guardardo, espere por favor...</h3>
           </Fragment>:
          <form
            onSubmit={e=>{
              e.preventDefault();
              let subestacionCreado={
                nombre,
                nomenclatura,
                zonaId,
                id
              }
              
            const respuesta=  guardarNuevo (subestacionCreado);
            console.log(respuesta);

            }}
          >
          <FormGroup className="FormMantenimiento">
          <FormControl className={classes.formControl}>
             <InputLabel id="demo-simple-select-helper-label" value="list">Zona</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="zona"
                    value={zonaId}
                    name="zona"
                    onChange={handleChange}
                    
                >

                    <MenuItem key='LITORAL' value='1' >LITORAL</MenuItem>
                    <MenuItem key='OCCIDENTE' value='2' >OCCIDENTE</MenuItem>
                    <MenuItem key='NORTE' value='3' >NORTE</MenuItem>
                    <MenuItem key='CENTRO' value='4' >CENTRO</MenuItem>
                    <MenuItem key='SUR' value='5' >SUR</MenuItem>
                 
                </Select>
             </FormControl>
             <TextField onChange={handleChange} name='nombre' value={nombre} id="standard-basic" label="Nombre" />
             <TextField onChange={handleChange} name='nomenclatura' value={nomenclatura} id="standard-basic" label="Nomenclatura" />
                          
             <Grid container justify="center" className="GridBoton">
                <Button className="Boton" type="submit" variant="contained" color="primary">    Guardar  </Button>
                {/* <Button className="Boton" type="submit" variant="contained" color="primary">    Aplicar Archivo  </Button> */}
                <br/>
              </Grid>           

          </FormGroup>
                    <div>   
                                { savedStatus===true?
                                <Alert className="Alert" severity={error===true?'error':'success'}>
                                    {error===true ? 'Sucedio un error al guardar el registro, intentelo nuevamente mas tarde o notifiquelo al departamento de TI'
                                    :'Registro guardado exitosamente!'}
                                </Alert>
                                :''  
                                }
                    </div>
          </form>
        }
        
        </Fragment>
        
    )
};

export default Subestacion;