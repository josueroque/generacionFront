import {
    START_SAVE_SUBESTACION,
    SAVE_SUBESTACION_SUCCESS,
    SAVE_SUBESTACION_FAILURE,
    START_EDIT_SUBESTACION,
    EDIT_SUBESTACION_SUCCESS,
    EDIT_SUBESTACION_FAILURE,
    START_GET_SUBESTACIONES,
    GET_SUBESTACIONES_SUCCESS,
    GET_SUBESTACIONES_FAILURE,
    START_GET_SUBESTACION,
    GET_SUBESTACION_SUCCESS,
    GET_SUBESTACION_FAILURE,
} from '../types';

import{guardarSubestacion,obtenerSubestacion,editarSubestacion, obtenerSubestaciones} from '../../Services/ApiService';

export const saveSubestacionSuccess=subestacion=>({
    type:SAVE_SUBESTACION_SUCCESS,
    payload:subestacion
});

export const startSaveSubestacion = () => ({
    type: START_SAVE_SUBESTACION
});

export const saveSubestacionFailure = (error) => ({
    type: SAVE_SUBESTACION_FAILURE,
    payload:error
});

export const editSubestacionSuccess=subestacion=>({
    type:EDIT_SUBESTACION_SUCCESS,
    payload:subestacion
});

export const startEditSubestacion = () => ({
    type: START_EDIT_SUBESTACION
});

export const editSubestacionFailure = (error) => ({
    type: EDIT_SUBESTACION_FAILURE,
    payload:error
});

export const getSubestacionesSuccess=subestaciones=>({
    type:GET_SUBESTACIONES_SUCCESS,
    payload:subestaciones
});

export const startGetSubestaciones = () => ({
    type: START_GET_SUBESTACIONES
});

export const getSubestacionesFailure = (error) => ({
    type: GET_SUBESTACIONES_FAILURE,
    payload:error
});

export const getSubestacionSuccess=subestacion=>({
    type:GET_SUBESTACION_SUCCESS,
    payload:subestacion
});

export const startGetSubestacion = () => ({
    type: START_GET_SUBESTACION
});

export const getSubestacionFailure = (error) => ({
    type: GET_SUBESTACION_FAILURE,
    payload:error
});

export function saveSubestacionAction(subestacion){
    return async (dispatch) =>{
        dispatch(startSaveSubestacion());
       try {

         const response=  await guardarSubestacion(subestacion);

            console.log(response);
            dispatch(saveSubestacionSuccess(response.data));
           
        } catch (error) {
          console.log(error);
             dispatch(saveSubestacionFailure(error));
         }
    }

};

export function editSubestacionAction(subestacion){
    return async (dispatch) =>{
        dispatch(startEditSubestacion());
       try {

        console.log(subestacion)
         const response=  await editarSubestacion(subestacion);

            console.log(response);
            dispatch(editSubestacionSuccess(response.data));
           
        } catch (error) {
          console.log(error);
             dispatch(editSubestacionFailure(error));
         }
    }

};

export function getSubestacionesAction(){
    return async (dispatch) =>{
        dispatch(startGetSubestaciones());
       try {

         const response=  await obtenerSubestaciones();

            console.log(response);
            dispatch(getSubestacionesSuccess(response.data));
           
        } catch (error) {
          console.log(error);
             dispatch(getSubestacionesFailure(error));
         }
    }

};

export function getSubestacionAction(id){
    return async (dispatch) =>{
        dispatch(startEditSubestacion());
       try {

         const response=  await obtenerSubestacion(id);

            console.log(response);
            dispatch(getSubestacionSuccess(response.data));
           
        } catch (error) {
          console.log(error);
             dispatch(getSubestacionFailure(error));
         }
    }

};
