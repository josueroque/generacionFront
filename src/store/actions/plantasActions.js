import{
    START_GET_PLANTAS,
    GET_PLANTAS_SUCCESS,
    GET_PLANTAS_FAILURE
} from '../types';

import{obtenerPlantas} from '../../Services/ApiService';

export const startGetPlantas = () => ({
    type: START_GET_PLANTAS
});

export const getPlantasFailure = (error) => ({
    type: GET_PLANTAS_FAILURE,
    payload:error
});

export const getPlantasSuccess=plantas=>({
    type:GET_PLANTAS_SUCCESS,
    payload:plantas
});

export function getPlantasAction(){
    return async (dispatch) =>{
        dispatch(startGetPlantas());
       try {

            const response=  await obtenerPlantas();
            dispatch(getPlantasSuccess(response.data));
           
        } catch (error) {
          console.log(error);
             dispatch(getPlantasFailure(error));
         }
    }

};