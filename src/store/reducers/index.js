import { combineReducers } from 'redux';
import archivosReducer from './archivosReducer';
import subestacionesReducer from './subestacionesReducer';

//import validacionReducer from './validacionReducer';

export default combineReducers({
    archivos: archivosReducer,
    subestaciones:subestacionesReducer
});