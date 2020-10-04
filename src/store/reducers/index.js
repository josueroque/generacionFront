import { combineReducers } from 'redux';
import archivosReducer from './archivosReducer';
import subestacionesReducer from './subestacionesReducer';
import userReducer from './userReducer';

//import validacionReducer from './validacionReducer';

export default combineReducers({
    archivos: archivosReducer,
    subestaciones:subestacionesReducer,
    user:userReducer
});