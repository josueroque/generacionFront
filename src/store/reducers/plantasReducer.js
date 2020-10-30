import {
    START_GET_PLANTAS,
    GET_PLANTAS_SUCCESS,
    GET_PLANTAS_FAILURE
} from '../types';
const initiaState={plantas:[],loading:false,error:false,errorInfo:''}
export default function(state=initiaState,action){
    switch (action.type){
        case START_GET_PLANTAS:
            return{
                ...state,
                loading:true,
                plantas:[],
                error:'',
                errorInfo:''
            }
        case GET_PLANTAS_SUCCESS:
            return{
                ...state,
                plantas:action.payload,
                loading:false,
                error:false,
                errorInfo:''

            }  
        case GET_PLANTAS_FAILURE:
            return{
                ...state,
                plantas:[],
                loading:false,
                error:true,
                errorInfo:''

            }
             
        default:
          //  return {...state};
          return state;  
       }           
    }
    





