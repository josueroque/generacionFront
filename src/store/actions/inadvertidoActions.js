import {
    START_GET_INADVERTIDO,
    GET_INADVERTIDO_SUCCESS,
    GET_INADVERTIDO_FAILURE,

} from '../types';

import{consultarInadvertido} from '../../Services/ApiService';

export const getInadvertidoSuccess=inadvertido=>({
    type:GET_INADVERTIDO_SUCCESS,
    payload:inadvertido
});

export const startGetInadvertido = () => ({
    type: START_GET_INADVERTIDO
});

export const getInadvertidoFailure = (error) => ({
    type: GET_INADVERTIDO_FAILURE,
    payload:error
});

export function getInadvertidoAction(filtro,token,totales){
    return async (dispatch) =>{
        dispatch(startGetInadvertido());
       try {
   
         const response=  await consultarInadvertido(token,filtro);
         console.log(response);   
         dispatch(getInadvertidoSuccess(response));
           
        } catch (error) {
             console.log(error);
             dispatch(getInadvertidoSuccess(error));
         }
    }

};

