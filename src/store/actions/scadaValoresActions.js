import {
    START_GET_SCADAVALORES,
    GET_SCADAVALORES_SUCCESS,
    GET_SCADAVALORES_FAILURE,

} from '../types';

import{consultar} from '../../Services/ApiService';

export const getScadaValoresSuccess=scadaValores=>({
    type:GET_SCADAVALORES_SUCCESS,
    payload:scadaValores
});

export const startGetScadaValores = () => ({
    type: START_GET_SCADAVALORES
});

export const getScadaValoresFailure = (error) => ({
    type: GET_SCADAVALORES_FAILURE,
    payload:error
});

export function getScadaValoresAction(filtro,token,totales){
    return async (dispatch) =>{
        dispatch(startGetScadaValores());
       try {
   
         const response=  await consultar(totales,true,token,filtro);

         dispatch(getScadaValoresSuccess(response));
           
        } catch (error) {
             console.log(error);
             dispatch(getScadaValoresSuccess(error));
         }
    }

};

