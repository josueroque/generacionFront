import{
    START_GET_FUENTES,
    GET_FUENTES_SUCCESS,
    GET_FUENTES_FAILURE
} from '../types';

import{obtenerFuentes} from '../../Services/ApiService';

export const startGetFuentes = () => ({
    type: START_GET_FUENTES
});

export const getFuentesFailure = (error) => ({
    type: GET_FUENTES_FAILURE,
    payload:error
});

export const getFuentesSuccess=fuentes=>({
    type:GET_FUENTES_SUCCESS,
    payload:fuentes
});

export function getFuentesAction(){
    return async (dispatch) =>{
        dispatch(startGetFuentes());
       try {

            const response=  await obtenerFuentes();
            dispatch(getFuentesSuccess(response.data));
           
        } catch (error) {
          console.log(error);
             dispatch(getFuentesFailure(error));
         }
    }

};