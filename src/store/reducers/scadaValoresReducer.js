import {
    START_GET_SCADAVALORES,
    GET_SCADAVALORES_SUCCESS,
    GET_SCADAVALORES_FAILURE,

} from '../types';

const initialState={scadaValores:[],loading:false,error:false,errorInfo:''};

export default function(state=initialState,action){
    switch(action.type){
        case START_GET_SCADAVALORES:
        return{
            ...state,
            loading:true,
            error:false,
            errorInfo:''
        }
        case GET_SCADAVALORES_SUCCESS:
        return{
            ...state,
            scadaValores:action.payload,
            loading:false,
            error:false,
            errorInfo:''

        }
        case GET_SCADAVALORES_FAILURE:
            return{
                ...state,
                scadaValores:[],
                loading:false,
                error:true,
                errorInfo:'',
                errorInfo:action.payload
            }
        default:
            return {...state};

    }
}