import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {authUserAction} from '../store/actions/usersActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
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

export default function Login(props) {
  const classes = useStyles();
  const dispatch=useDispatch();
  const user=useSelector(state=>state.user.user);
  const error=useSelector(state=>state.user.error);
  const [email,updateEmail] =useState('');
  const [password,updatePassword] =useState('');
  const authUser=(newUser) =>dispatch(authUserAction(newUser));
  const errorInfo=useSelector(state=>state.user.errorInfo);
  
  useEffect(()=>{
    console.log(user);
      if (user.token && error===false){
          
          props.history.push("/Home");
          
      }

  },[user])


  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
      <Typography component="h1" variant="h5" className="LabelLogin">
          Generación de Energia <br/>  Valores SCADA y Datos Comerciales
        </Typography>


        <br/>   
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>


        <Typography component="h2" variant="h5">
          Autenticación
        </Typography>
        <form className={classes.form} noValidate
                             onSubmit={e=> {
                                e.preventDefault();
                                   
                                const loginUser={
                                            email:email,
                                            password:password
                                            };
                                                                     
                                const response=  authUser(loginUser);
                                console.log(response);
                                
         
        
                            } 
                         }
        
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Dirección Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e=>updateEmail(e.target.value)}
            value={email}
            required

          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e=>updatePassword(e.target.value)}
            value={password}
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
        <div className="AlertCambiar">   
                    
                    {error?
                      <Alert  severity='error' >
                        Credenciales no validas 
                      </Alert>
                      :''  
                    }
         </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}