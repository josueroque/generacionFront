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
            archivo:action.payload,
            loading:false,
            error:true,
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
        default:
            return state;

    }
}