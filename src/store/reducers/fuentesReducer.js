import {
    START_GET_FUENTES,
    GET_FUENTES_SUCCESS,
    GET_FUENTES_FAILURE
} from '../types';
const initiaState={fuentes:[],loading:false,error:false,errorInfo:''}
export default function(state=initiaState,action){
    switch (action.type){
        case START_GET_FUENTES:
            return{
                ...state,
                loading:true,
                fuentes:[],
                error:'',
                errorInfo:''
            }
        case GET_FUENTES_SUCCESS:
            return{
                ...state,
                fuentes:action.payload,
                loading:false,
                error:false,
                errorInfo:''

            }  
        case GET_FUENTES_FAILURE:
            return{
                ...state,
                fuentes:[],
                loading:false,
                error:true,
                errorInfo:''

            }
             
        default:
          //  return {...state};
          return state;  
       }           
    }
    





