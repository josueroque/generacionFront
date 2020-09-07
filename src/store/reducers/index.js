import { combineReducers } from 'redux';
import archivosReducer from './archivosReducer';

//import validacionReducer from './validacionReducer';

export default combineReducers({
    archivos: archivosReducer,
});