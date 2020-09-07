import {
    START_SAVE_ARCHIVO,
    SAVE_ARCHIVO_SUCCESS,
    SAVE_ARCHIVO_FAILURE,

} from '../types';

import{guardarArchivo,obtenerArchivo} from '../../Services/ApiService';

export const saveArchivoSuccess=archivo=>({
    type:SAVE_ARCHIVO_SUCCESS,
    payload:archivo
});

export const startEditArchivo = () => ({
    type: START_SAVE_ARCHIVO
});

export const saveArchivoFailure = (error) => ({
    type: SAVE_ARCHIVO_FAILURE,
    payload:error
});

export function saveArchivoAction(archivo){
    return async (dispatch) =>{
        try {
            await guardarArchivo(archivo);
            dispatch(saveArchivoSuccess(archivo));

        } catch (error) {
            console.log(error);
            dispatch(guardarArchivo(error));
        }
    }

};