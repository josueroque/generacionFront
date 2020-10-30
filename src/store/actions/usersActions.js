import {
    START_SAVE_USER,
    SAVE_USER_SUCCESS,
    SAVE_USER_FAILURE,
    START_AUTH_USER,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAILURE,
    LOGOUT_USER,
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

import {saveUser,loginUser,editUser,deleteUser,saveRequest,resetPassword} from '../../Services/ApiService';

export const resetPasswordSuccess=request=>({
    type:RESET_PASSWORD_SUCCESS,
    payload:request
});

export const startResetPassword = () => ({
    type: START_RESET_PASSWORD
});

export const resetPasswordFailure = (error) => ({
    type: RESET_PASSWORD_FAILURE,
    payload:error
});

export const resetRequestSuccess=request=>({
    type:RESET_REQUEST_SUCCESS,
    payload:request
});

export const startResetRequest = () => ({
    type: START_RESET_REQUEST
});

export const resetRequestFailure = (error) => ({
    type: RESET_REQUEST_FAILURE,
    payload:error
});

export const deleteUserSuccess=user=>({
    type:DELETE_USER_SUCCESS,
    payload:user
});

export const startDeleteUser = () => ({
    type: START_DELETE_USER
});

export const deleteUserFailure = (error) => ({
    type: DELETE_USER_FAILURE,
    payload:error
});


export const editUserSuccess=user=>({
    type:EDIT_USER_SUCCESS,
    payload:user
});

export const startEditUser = () => ({
    type: START_EDIT_USER
});

export const editUserFailure = (error) => ({
    type: EDIT_USER_FAILURE,
    payload:error
});

export const saveUserSuccess=user=>({
    type:SAVE_USER_SUCCESS,
    payload:user
});

export const startSaveUser = () => ({
    type: START_SAVE_USER
});

export const saveUserFailure = (error) => ({
    type: SAVE_USER_FAILURE,
    payload:error
});


export const authUserSuccess=user=>({
    type:AUTH_USER_SUCCESS,
    payload:user
});

export const startAuthUser = () => ({
    type: START_AUTH_USER
});

export const authUserFailure = () => ({
    type: AUTH_USER_FAILURE
});


export const logoutUser = () => ({
    type: LOGOUT_USER
});

export const logoutUserSuccess=user=>({
    type:LOGOUT_USER_SUCCESS,
    payload:user
});

export  function  saveUserAction  (user) {
    return async (dispatch)=>{
         dispatch(startSaveUser());
         try {
             
            await saveUser(user);
            dispatch(saveUserSuccess(user));
               
         } catch (error) {
             console.log(typeof(error.data.error));
             dispatch(saveUserFailure(error.data.error));
         }
     }
 };

 export  function  editUserAction  (user,id,token) {
    return async (dispatch)=>{
         dispatch(startEditUser());

         try {
             
            await editUser(user,id,token);
            dispatch(editUserSuccess(user));
               
         } catch (error) {
             dispatch(editUserFailure(error));
         }
     }
 };

 export  function  deleteUserAction  (user,id,token) {
    return async (dispatch)=>{
         dispatch(startDeleteUser());
         console.log(user);

         try {
             
            await deleteUser(user,user._id,user.token);
            dispatch(deleteUserSuccess(user));
               
         } catch (error) {
             dispatch(deleteUserFailure(error));
         }
     }
 };

export  function  authUserAction  (user) {
    return async (dispatch)=>{
         dispatch(startAuthUser());
         try {
             
            const response=await loginUser(user);

            if (response.statusText=== 'OK'){
                user.token=response.data.token;
                user.password='';
                dispatch(authUserSuccess(user));
            }
            else {
                console.log(response);
                dispatch(authUserFailure());
            }
               
         } catch (error) {
             console.log(error);
             dispatch(authUserFailure());
         }
     }
 };

 export  function  logoutUserAction  (user) {
    return async (dispatch)=>{
         try {
                user.token=null;
                dispatch(logoutUserSuccess(user));
               
         } catch (error) {
             console.log(error);
         }
     }
 };

 export  function  saveRequestAction  (request) {
    return async (dispatch)=>{
         dispatch(startResetRequest());
         try {
             
          await saveRequest (request);
          dispatch(resetRequestSuccess(request));
               
         } catch (error) {
             dispatch(resetRequestFailure(error));
         }
     }
 };

 export  function  resetPasswordAction  (user,newPassword,token) {
    return async (dispatch)=>{
         dispatch(startResetPassword());
         try {

            const response= await resetPassword (user,newPassword,token);

            dispatch(resetPasswordSuccess(user));
               
         } catch (error) {
             console.log(error);
             dispatch(resetPasswordFailure(error));
         }
     }
 };
