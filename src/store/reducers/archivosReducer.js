import {
    START_SAVE_ARCHIVO,
    SAVE_ARCHIVO_SUCCESS,
    SAVE_ARCHIVO_FAILURE,
     START_GET_ARCHIVO,
     GET_ARCHIVO_SUCCESS,
     GET_ARCHIVO_FAILURE,
     START_DELETE_ARCHIVO,
     DELETE_ARCHIVO_SUCCESS,
     DELETE_ARCHIVO_FAILURE
} from '../types';

const initialState={archivos:[],archivo:{},loading:false,error:false,errorInfo:''};

export default function(state=initialState,action){
    switch(action.type){
        case START_SAVE_ARCHIVO:
        return{
            ...state,
            loading:true,
            error:false,
            errorInfo:''
        }
        case SAVE_ARCHIVO_SUCCESS:
        return{
            ...state,
            archivo:action.payload,
            loading:false,
            error:false,
            errorInfo:''

        }
        case SAVE_ARCHIVO_FAILURE:
            return{
                ...state,
                archivo:{},
                loading:false,
                error:true,
                errorInfo:'',
                errorInfo:action.payload
            }
        case START_GET_ARCHIVO:
        return{
            ...state,
            loading:true,
            error:false,
            errorInfo:''
        }
        case GET_ARCHIVO_SUCCESS:
        return{
            ...state,
            archivo:action.payload,
            loading:false,
            error:false,
            errorInfo:''

        }
        case GET_ARCHIVO_FAILURE:
            return{
                ...state,
                archivo:{},
                loading:false,
                error:true,
                errorInfo:'',
                errorInfo:action.payload
            }   
        case START_DELETE_ARCHIVO:
        return{
            ...state,
            loading:true,
            error:false,
            errorInfo:''
        }
        case DELETE_ARCHIVO_SUCCESS:
        return{
            ...state,
            archivo:action.payload,
            loading:false,
            error:false,
            errorInfo:''

        }
        case DELETE_ARCHIVO_FAILURE:
            return{
                ...state,
                archivo:{},
                loading:false,
                error:true,
                errorInfo:'',
                errorInfo:action.payload
            }                     
        default:
            return state;

    }
}