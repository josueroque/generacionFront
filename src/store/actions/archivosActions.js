import {
    START_SAVE_ARCHIVO,
    SAVE_ARCHIVO_SUCCESS,
    SAVE_ARCHIVO_FAILURE,
    START_GET_ARCHIVO,
    GET_ARCHIVO_SUCCESS,
    GET_ARCHIVO_FAILURE,
    START_DELETE_ARCHIVO,
    DELETE_ARCHIVO_SUCCESS,
    DELETE_ARCHIVO_FAILURE

} from '../types';

import{guardarArchivo,obtenerArchivo} from '../../Services/ApiService';

export const saveArchivoSuccess=archivo=>({
    type:SAVE_ARCHIVO_SUCCESS,
    payload:archivo
});

export const startSaveArchivo = () => ({
    type: START_SAVE_ARCHIVO
});

export const saveArchivoFailure = (error) => ({
    type: SAVE_ARCHIVO_FAILURE,
    payload:error
});

export const getArchivoSuccess=archivo=>({
    type:GET_ARCHIVO_SUCCESS,
    payload:archivo
});

export const startGetArchivo = () => ({
    type: START_GET_ARCHIVO
});

export const getArchivoFailure = (error) => ({
    type: GET_ARCHIVO_FAILURE,
    payload:error
});

export const deleteArchivoSuccess=archivo=>({
    type:DELETE_ARCHIVO_SUCCESS,
    payload:archivo
});

export const startDeleteArchivo = () => ({
    type: START_DELETE_ARCHIVO
});

export const deleteArchivoFailure = (error) => ({
    type: DELETE_ARCHIVO_FAILURE,
    payload:error
});

export function saveArchivoAction(archivo){
    return async (dispatch) =>{
        dispatch(startSaveArchivo());
       try {

         const response=  await guardarArchivo(archivo);

            console.log(response);
            dispatch(saveArchivoSuccess(response.data));
           
        } catch (error) {
          console.log(error);
             dispatch(saveArchivoFailure(error));
         }
    }

};

export function getArchivoAction(fecha){
    return async (dispatch) =>{
        dispatch(startSaveArchivo());
       try {

         const response=  await obtenerArchivo(fecha);

            console.log(response);
            dispatch(getArchivoSuccess(response.data));
           
        } catch (error) {
          console.log(error);
             dispatch(getArchivoFailure(error));
         }
    }

};

export function saveArchivoAction(archivo){
    return async (dispatch) =>{
        dispatch(startSaveArchivo());
       try {

         const response=  await guardarArchivo(archivo);

            console.log(response);
            dispatch(saveArchivoSuccess(response.data));
           
        } catch (error) {
          console.log(error);
             dispatch(saveArchivoFailure(error));
         }
    }

};