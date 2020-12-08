import {
    START_GET_INADVERTIDO,
    GET_INADVERTIDO_SUCCESS,
    GET_INADVERTIDO_FAILURE,

} from '../types';

const initialState={inadvertido:[],loading:false,error:false,errorInfo:''};

export default function(state=initialState,action){
    switch(action.type){
        case START_GET_INADVERTIDO:
        return{
            ...state,
            loading:true,
            error:false,
            errorInfo:''
        }
        case GET_INADVERTIDO_SUCCESS:
        return{
            ...state,
            inadvertido:action.payload,
            loading:false,
            error:false,
            errorInfo:''

        }
        case GET_INADVERTIDO_FAILURE:
            return{
                ...state,
                inadvertido:[],
                loading:false,
                error:true,
                errorInfo:'',
                errorInfo:action.payload
            }
        default:
            ///return {...state};
            return state;    

    }
}