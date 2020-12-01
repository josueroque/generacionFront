import {
    START_GET_CURVADEMANDA,
    GET_CURVADEMANDA_SUCCESS,
    GET_CURVADEMANDA_FAILURE,

} from '../types';

import{consultarCurvaDemanda} from '../../Services/ApiService';

export const getCurvaDemandaSuccess=curvaDemanda=>({
    type:GET_CURVADEMANDA_SUCCESS,
    payload:curvaDemanda
});

export const startGetCurvaDemanda = () => ({
    type: START_GET_CURVADEMANDA
});

export const getCurvaDemandaFailure = (error) => ({
    type: GET_CURVADEMANDA_FAILURE,
    payload:error
});

export function getCurvaDemandaAction(filtro,token,totales){
    return async (dispatch) =>{
        dispatch(startGetCurvaDemanda());
       try {
   
         const response=  await consultarCurvaDemanda(token,filtro);
         console.log(response);   
         dispatch(getCurvaDemandaSuccess(response));
           
        } catch (error) {
             console.log(error);
             dispatch(getCurvaDemandaSuccess(error));
         }
    }

};

