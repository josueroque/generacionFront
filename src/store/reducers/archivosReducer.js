import {
    START_SAVE_ARCHIVO,
    SAVE_ARCHIVO_SUCCESS,
    SAVE_ARCHIVO_FAILURE,

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
            archivo:{},
            loading:false,
            error:true,
            errorInfo:action.payload

        }
        case SAVE_ARCHIVO_FAILURE:
            return{
                ...state,
                loading:true,
                error:false,
                errorInfo:''
            }
        default:
            return state;

    }
}