import { combineReducers } from 'redux';
import archivosReducer from './archivosReducer';
import subestacionesReducer from './subestacionesReducer';
import userReducer from './userReducer';
import scadaValoresReducer from './scadaValoresReducer';
import plantasReducer from './plantasReducer';
import fuentesReducer from './fuentesReducer';
import curvaDemandaReducer from './curvaDemandaReducer';
import inadvertidoReducer from './inadvertidoReducer';

export default combineReducers({
    archivos: archivosReducer,
    subestaciones:subestacionesReducer,
    user:userReducer,
    scadaValores:scadaValoresReducer,
    plantas:plantasReducer,
    fuentes:fuentesReducer,
    curvaDemanda:curvaDemandaReducer,
    inadvertido:inadvertidoReducer

});