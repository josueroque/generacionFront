import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {authUserAction,resetPasswordAction} from '../store/actions/usersActions';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import Menu from './Menu';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://ods.org.hn/">
        ODS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Cambiar(props) {
  const classes = useStyles();
  const dispatch=useDispatch();
  const user=useSelector(state=>state.user.user);
  const [userLocal,updateUserLocal]=useState(null);
  const cambioExitoso=useState(false);
  const error=useSelector(state=>state.user.error);
  const [actual,updateActual] =useState('');
  const [nueva,updateNueva] =useState('');
  const [nuevaConfirmacion,updateNuevaConfirmacion] =useState('');
  const [cambiar,updateCambiar]=useState(false); 
  const authUser=(newUser) =>dispatch(authUserAction(newUser));
  const reset=(user) =>dispatch(resetPasswordAction(user));
  
  useEffect(()=>{
  console.log(user.token);
  updateUserLocal(user);
  },[])

  useEffect(()=>{
    if (user.token&&cambiar===true){
        console.log(user.token);
        
    }
    else
    {
      updateCambiar(false);
    }
  },[user.token])

  const resetPassword=async(user)=>{
      await wait(1000);
      reset(user);
  }
  const wait=async(ms)=> {
    return new Promise(resolve => {
    setTimeout(resolve, ms);
    });
  }
  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Menu></Menu>
      <div className={classes.paper}>
      <Typography component="h1" variant="h5" className="LabelLogin">
         Cambiar Contraseña
        </Typography>


        <br/>   
        <form className={classes.form} noValidate
                             onSubmit={e=> {
                                e.preventDefault();
                                if (user.token)
                                {   
                                    const loginUser={
                                                email:user.email,
                                                password:actual
                                                };
                                                                        
                                    const response=  authUser(loginUser)   ;                              
                                    updateCambiar(true);
                                    console.log(response);
                                }
                                else 
                                {
                                    updateCambiar(false);
                                    props.history.push('/');
                                }
         
        
                            } 
                         }
        
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="actual"
            label="Contraseña actual"
            name="actual"
            type="password"
            autoFocus
            onChange={e=>updateActual(e.target.value)}
            value={actual}
            required

          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="nueva"
            label="Nueva contraseña"
            type="password"
            id="nueva"
            autoComplete="current-password"
            onChange={e=>updateNueva(e.target.value)}
            value={nueva}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="nuevaConfirmacion"
            label="Confirme contraseña"
            type="password"
            id="nuevaConfirmacion"
            autoComplete="current-password"
            onChange={e=>updateNuevaConfirmacion(e.target.value)}
            value={nuevaConfirmacion}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>

        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}