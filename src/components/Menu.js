import React,{Fragment,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {logoutUserAction} from '../store/actions/usersActions';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListAlt from '@material-ui/icons/ListAlt';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Power from '@material-ui/icons/Power';
import EvStation from '@material-ui/icons/EvStation';
import LockOpen from '@material-ui/icons/LockOpen';
import Settings from '@material-ui/icons/Settings';
import Security from '@material-ui/icons/Security';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Publish from '@material-ui/icons/Publish';
import Search from '@material-ui/icons/Search';
import Info from '@material-ui/icons/Info';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Button from '@material-ui/core/Button';
import Logo from '../img/ods.png';
import Collapse from '@material-ui/core/Collapse';
import Create from '@material-ui/icons/Create';
import Add from '@material-ui/icons/Add';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));



export default function Menu() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch=useDispatch(); 
  const user=useSelector(state=>state.user.user);
  //quitar,de prueba
  const auth= useState({token:true});
  const logOut=(userRedux) =>dispatch(logoutUserAction(userRedux));
  const [open, setOpen] = React.useState(false);
  const [openNested, setOpenNested] = React.useState(false);
  const [openNested2, setOpenNested2] = React.useState(false);
  const [openNested3, setOpenNested3] = React.useState(false);
  const [openNested4, setOpenNested4] = React.useState(false);
  
  //(userRedux) =>dispatch(logoutUserAction(userRedux));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  auth.token=true;
   const logoutFunction={};

  const handleClick = () => {
    setOpenNested(!openNested);
  };

  const handleClick2 = () => {
    setOpenNested2(!openNested2);
  };

  const handleClick3 = () => {
    setOpenNested3(!openNested3);
  };

  const handleClick4 = () => {
    setOpenNested4(!openNested4);
  };


  return (
    <Fragment>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
           
        <Toolbar>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
            
          </IconButton>
          {/* <Link to={ {pathname: `/`}} className="Link" >  
          <Typography variant="h6" noWrap>
             Inicio
          </Typography>
          </Link> */}
          <Link key ={'Login'} to={auth.token? {pathname: `/`}:{pathname: `/`}}  className="Link loginMenu"  onClick={auth.token ?  ()=>logOut(user) :()=>{}}>  
          <Typography variant="h6" noWrap >
          {!auth.token ? 'Login':'Cerrar Sesión'}
          </Typography>
          </Link>
        

        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
    
         <Link key ={'Login'} to={auth.token? {pathname: `/Login`}:{pathname: `/Logout`}}   className='LinkMenu'  onClick={auth.token ?  ()=>logoutFunction({}) :()=>{}}>  
            <ListItem button  >
                <ListItemIcon>
                  <LockOpen />
                </ListItemIcon>
                <ListItemText primary={!auth.token ? 'Entrar':'Cerrar'} />
            </ListItem>
          </Link>
            <ListItem button button onClick={handleClick}  >
              <ListItemIcon>
                <AssignmentInd />
              </ListItemIcon>
              <ListItemText primary='Datos' />
              {openNested ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openNested} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
              <Link key='Subir' to={{pathname:`/archivo`}} className='LinkMenu'>  
                  <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <Publish />
                        </ListItemIcon>
                        <ListItemText primary="Subir Archivo" />
                    </ListItem>
                  </Link>
                {/* <Link key='Create' to={{pathname:`/general`}}  className='LinkMenu'>  
                  <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <Create />
                        </ListItemIcon>
                        <ListItemText primary="Valores SCADA" />
                    </ListItem>
                  </Link>
                <Link key='Create2' to={{pathname:`/search`}}  className='LinkMenu'>    
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <Create />
                    </ListItemIcon>
                    <ListItemText primary="Datos Comerciales" />
                  </ListItem>
                </Link> */}
              </List>
            </Collapse>            

            <ListItem button button onClick={handleClick2}  >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary='Mantenimiento' />
              {openNested2 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openNested2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link key='Create2' to={{pathname:`/Subestacion`}}  className='LinkMenu'>  
                  <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <Add />
                        </ListItemIcon>
                        <ListItemText primary=" Crear Subestaciones" />
                    </ListItem>
                  </Link>
                  <Link key='Edit1' to={{pathname:`/SubestacionEditar`}}  className='LinkMenu'>  
                  <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <Create />
                        </ListItemIcon>
                        <ListItemText primary="Editar Subestaciones" />
                    </ListItem>
                  </Link>
                <Link key='Create4' to={{pathname:`/search`}}  className='LinkMenu'>    
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <ListItemText primary="Crear Plantas" />
                  </ListItem>
                </Link>
                <Link key='Edit2' to={{pathname:`/PlantasEditar`}}  className='LinkMenu'>    
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <Create />
                    </ListItemIcon>
                    <ListItemText primary="Editar Plantas" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>            

            <ListItem button button onClick={handleClick3}  >
              <ListItemIcon>
                <Security />
              </ListItemIcon>
              <ListItemText primary='Seguridad' />
              {openNested3 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openNested3} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link key='Create5' to={{pathname:`/cambiar`}}  className='LinkMenu'>  
                  <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <Create />
                        </ListItemIcon>
                        <ListItemText primary="Cambiar Contraseña" />
                    </ListItem>
                  </Link>
              </List>
            </Collapse>            

            <ListItem button button onClick={handleClick4}  >
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary='Consultas' />
              {openNested4 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openNested4} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link key='Create7' to={{pathname:`/ScadaValores`}}  className='LinkMenu'>  
                  <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <Power />
                        </ListItemIcon>
                        <ListItemText primary="Produccion horaria por Planta" />
                    </ListItem>
                  </Link>
                <Link key='Create8' to={{pathname:`/totales`}}  className='LinkMenu'>    
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <EvStation />
                    </ListItemIcon>
                    <ListItemText primary="Totales" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>            


        </List>
        
        <Divider />

      </Drawer>

    </div>
     
      <h4>
        {user.token? 'Welcome '+ user.nickname:''}
      </h4>
   
    </Fragment>
  );
}
