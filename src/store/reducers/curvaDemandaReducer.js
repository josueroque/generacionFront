import {
    START_GET_CURVADEMANDA,
    GET_CURVADEMANDA_SUCCESS,
    GET_CURVADEMANDA_FAILURE,

} from '../types';

const initialState={curvaDemanda:[],loading:false,error:false,errorInfo:''};

export default function(state=initialState,action){
    switch(action.type){
        case START_GET_CURVADEMANDA:
        return{
            ...state,
            loading:true,
            error:false,
            errorInfo:''
        }
        case GET_CURVADEMANDA_SUCCESS:
        return{
            ...state,
            curvaDemanda:action.payload,
            loading:false,
            error:false,
            errorInfo:''

        }
        case GET_CURVADEMANDA_FAILURE:
            return{
                ...state,
                curvaDemanda:[],
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