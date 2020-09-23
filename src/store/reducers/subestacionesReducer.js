import {
    START_SAVE_SUBESTACION,
    SAVE_SUBESTACION_SUCCESS,
    SAVE_SUBESTACION_FAILURE,
    START_EDIT_SUBESTACION,
    EDIT_SUBESTACION_SUCCESS,
    EDIT_SUBESTACION_FAILURE,
    START_GET_SUBESTACIONES,
    GET_SUBESTACIONES_SUCCESS,
    GET_SUBESTACIONES_FAILURE,
    START_GET_SUBESTACION,
    GET_SUBESTACION_SUCCESS,
    GET_SUBESTACION_FAILURE,

} from '../types';

const initialState={subestaciones:[],subestacion:{},loading:false,error:false,errorInfo:''};

export default function(state=initialState,action){
    switch(action.type){
        case START_SAVE_SUBESTACION:
        return{
            ...state,
            loading:true,
            error:false,
            errorInfo:''
        }
        case SAVE_SUBESTACION_SUCCESS:
        return{
            ...state,
            subestacion:action.payload,
            loading:false,
            error:false,
            errorInfo:''

        }
        case SAVE_SUBESTACION_FAILURE:
            return{
                ...state,
                subestacion:{},
                loading:false,
                error:true,
                errorInfo:'',
                errorInfo:action.payload
            }
            case START_EDIT_SUBESTACION:
                return{
                    ...state,
                    loading:true,
                    error:false,
                    errorInfo:''
                }
            case EDIT_SUBESTACION_SUCCESS:
                return{
                    ...state,
                    subestacion:action.payload,
                    loading:false,
                    error:false,
                    errorInfo:''
        
                }
            case EDIT_SUBESTACION_FAILURE:
                return{
                    ...state,
                    subestacion:{},
                    loading:false,
                    error:true,
                    errorInfo:'',
                    errorInfo:action.payload
                    }
            case START_GET_SUBESTACIONES:
                return{
                    ...state,
                    loading:true,
                    error:false,
                    errorInfo:''
                    }
            case GET_SUBESTACIONES_SUCCESS:
                return{
                    ...state,
                    subestaciones:action.payload,
                    loading:false,
                    error:false,
                    errorInfo:''
                }
            case GET_SUBESTACIONES_FAILURE:
                return{
                    ...state,
                    subestaciones:[],
                    loading:false,
                    error:true,
                    errorInfo:'',
                    errorInfo:action.payload
                }
                case START_GET_SUBESTACION:
                    return{
                        ...state,
                        loading:true,
                        error:false,
                        errorInfo:''
                        }
                case GET_SUBESTACION_SUCCESS:
                    return{
                        ...state,
                        subestacion:action.payload,
                        loading:false,
                        error:false,
                        errorInfo:''
                    }
                case GET_SUBESTACION_FAILURE:
                    return{
                        ...state,
                        subestacion:{},
                        loading:false,
                        error:true,
                        errorInfo:'',
                        errorInfo:action.payload
                    }                
        
            default:
            return state;

    }
}