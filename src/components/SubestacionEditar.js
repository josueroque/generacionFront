import React, { Fragment, useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { editSubestacionAction ,getSubestacionesAction,getSubestacionAction} from '../store/actions/subestacionesActions';
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
  
function SubestacionEditar(props){
    const dispatch=useDispatch();
    const classes = useStyles();
    const error=useSelector(state=>state.subestaciones.error);
    const loading=useSelector(state=>state.subestaciones.loading);
    const subestacion=useSelector(state=>state.subestaciones.subestacion);
    const subestaciones=useSelector(state=>state.subestaciones.subestaciones);
    const subestacionGuardado=useSelector(state=>state.subestaciones.subestacion);
    const getSubestaciones=() =>dispatch(getSubestacionesAction());
    const editSubestacion=(subestacion) =>dispatch(editSubestacionAction(subestacion));
    const getSubestacion=(id) =>dispatch(getSubestacionAction(id));
   // const [subestacion,actualizaSubestacion]=useState(null);
    const [nombre, actualizaNombre] = useState(null);
    const [zonaId,actualizaZonaId]=useState(null);
    const [subestacionId,actualizaSubestacionId]=useState(null);
    const [id,actualizaId]=useState(null);
    const [nomenclatura,actualizaNomenclatura]=useState(null);
    const [savedStatus,updateSavedStatus]=useState(false);
    

    useEffect(()=>{
            getSubestaciones();
           // getSubestacion(0);
        }
    ,[]);

    useEffect(()=>{
      actualizaZonaId(subestacion.zonaId);
      actualizaNombre(subestacion.nombre);
      actualizaNomenclatura(subestacion.nomenclatura);
     // actualizaSubestacionId(subestacion.id);
    },[subestacion])

      const handleChange = (event) => {
       // console.log(event.target.value);
        //actualizaScada(event.target.value);
        console.log(event.target.name);
        switch(event.target.name){
            case 'subestacion':
                {
                    actualizaSubestacionId(event.target.value);
                    break;
                }
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
      
      const cargaSubestacion= async (event)=>{
          console.log(event.target.value);
           await wait(300);
          let subestacion1=  getSubestacion(event.target.value);
           await wait(300);
           console.log(subestacion1);

           return;
            
      }

      const guardarCambios=async(subestacion)=>{

        await wait(300);
        console.log(subestacion);
        const respuesta=  editSubestacion(subestacion);
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
//console.log(subestacion);
    return(

      
        <Fragment>
         <Menu></Menu>

          <h2 className="H2Componente">Editar Subestacion</h2>
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
                id:subestacion.id
              }
              
            const respuesta=  guardarCambios (subestacionCreado);
            console.log(respuesta);

            }}
          >
          <FormGroup className="FormMantenimiento">
          <FormControl className={classes.formControl}>
             <InputLabel id="demo-simple-select-helper-label" value="list">Subestacion</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="subestacion"
                    value={subestacionId}
                    name="subestacion"
                    onChange={cargaSubestacion}
                    
                >

                {subestaciones?
                    subestaciones.map(subestacion=>
                    <MenuItem key= {subestacion.nombre} value={subestacion.id}>{subestacion.nombre}</MenuItem> 
                    ):''
                }
                 
                </Select>
             </FormControl>

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
             <TextField onChange={handleChange} name='nombre' value={nombre?nombre:''} id="standard-basic" label="Nombre" />
             <TextField onChange={handleChange} name='nomenclatura' value={nomenclatura?nomenclatura:''} id="standard-basic" label="Nomenclatura" />
                          
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

export default SubestacionEditar;