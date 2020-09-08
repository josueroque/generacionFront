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

export const startSaveArchivo = () => ({
    type: START_SAVE_ARCHIVO
});

export const saveArchivoFailure = (error) => ({
    type: SAVE_ARCHIVO_FAILURE,
    payload:error
});

export function saveArchivoAction(archivo){
    return async (dispatch) =>{
        dispatch(startSaveArchivo());
   //     try {
            console.log('desde action');
            for (var pair of archivo.entries())
            {
             console.log(pair[0]+ ', '+ pair[1]); 
            }
            await guardarArchivo(archivo);
            dispatch(saveArchivoSuccess(archivo));
           
        // } catch (error) {
        //   //  console.log(error);
        //     dispatch(saveArchivoFailure(error));
        // }
    }

};