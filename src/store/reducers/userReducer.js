import { ContactSupportOutlined } from '@material-ui/icons';
import {
    START_SAVE_USER,
    SAVE_USER_SUCCESS,
    SAVE_USER_FAILURE,
    START_AUTH_USER,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAILURE,
    LOGOUT_USER_SUCCESS,
    START_EDIT_USER,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILURE,
    START_DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    START_RESET_REQUEST,
    RESET_REQUEST_SUCCESS,
    RESET_REQUEST_FAILURE,
    START_RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE

    } from '../types';


const initialState={user:{},loading:false,error:false,errorInfo:''};
//console.log(action.type);
export default function (state=initialState,action){
    switch(action.type){
        case START_RESET_PASSWORD:
            return{
                ...state,
                loading:true,
                error:false,
                errorInfo:''
            } 
        case RESET_PASSWORD_SUCCESS:
            return{
                ...state,
               // user:action.payload,
                loading:false,
                error:false,
            }
        case RESET_PASSWORD_FAILURE:
            console.log('prueba reducer');
            return{
                ...state,
                //user:{},
                loading:false,
               
                error:true,
                errorInfo:action.payload
            }    

        case START_RESET_REQUEST:
            return{
                ...state,
                loading:true,
                error:false,
                errorInfo:''
            } 
        case RESET_REQUEST_SUCCESS:
            return{
                ...state,
               // user:action.payload,
                loading:false,
                error:false,
            }
        case RESET_REQUEST_FAILURE:
            return{
                ...state,
             //   user:{},
                loading:false,
                error:true,
                errorInfo:action.payload
            }    
        case START_DELETE_USER:
            return{
                ...state,
                loading:true,
                error:false,
                errorInfo:''
            } 
        case DELETE_USER_SUCCESS:
            return{
                ...state,
                user:action.payload,
                loading:false,
                error:false,
            }
        case DELETE_USER_FAILURE:
            return{
                ...state,
             //   user:{},
                loading:false,
                error:true,
                errorInfo:action.payload
            }    

        case START_EDIT_USER:
            return{
                ...state,
                loading:true,
                error:false,
                errorInfo:''
            } 
        case EDIT_USER_SUCCESS:
            return{
                ...state,
                user:action.payload,
                loading:false,
                error:false,
            }
        case EDIT_USER_FAILURE:
            return{
                ...state,
                loading:false,
                error:true,
                errorInfo:action.payload
            }    

        case START_SAVE_USER:
            return{
                ...state,
                loading:true,
                error:false,
                errorInfo:''
            } 
        case SAVE_USER_SUCCESS:
            return{
                ...state,
                user:action.payload,
                loading:false,
                error:false,
            }
        case SAVE_USER_FAILURE:
            return{
                ...state,
                user:{},
                loading:false,
                error:true,
                errorInfo:action.payload
            }    
            case START_AUTH_USER:
                return{
                    ...state,
                    loading:true,
                    error:false
                } 
            case AUTH_USER_SUCCESS:
                return{
                    ...state,
                    user:action.payload,
                    loading:false,
                    error:false,
                }
            case AUTH_USER_FAILURE:
                return{
                    
                    user:{},
                    loading:false,
                    error:true,
                  
                }

            case LOGOUT_USER_SUCCESS:
                return{
                    ...state,
                    user:action.payload,
                    loading:false,
                    error:false,
                }  
    
            default:
            //return {...state};
            return state;
    }
}
