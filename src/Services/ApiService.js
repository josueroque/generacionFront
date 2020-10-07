import { useRadioGroup } from '@material-ui/core';
import axios from 'axios';
//export const URL='http://localhost:53363/api';
const URL='http://192.168.0.14:5100/api';

export async function obtenerArchivoFecha(fecha){  
    try {
      console.log(fecha);
      const requestUrl =URL +'/archivos/fecha?fecha='+fecha;
      const response = await axios.get(requestUrl);
       
      if (response.statusText!=="OK") {
          throw new Error('Error getting adverts'); 
        }
        
        return response; 
      }
    
      catch(error){
       console.error(error.response);
       throw error;
   }
  }

  export async function obtenerArchivo(id){  
    try {
      
      const requestUrl =URL +'/archivos/'+id;
      const response = await axios.get(requestUrl);
       
      if (response.statusText!=="OK") {
          throw new Error('Error getting adverts');
        }
        return response; 
      }
    
      catch(error){
       console.error(error.response);
       throw error;
   }
  }

  export async function eliminarArchivo(id,token){  
    try {
      
      const requestUrl =URL +'/archivos/'+id;
      const config = {
        headers: { 
             'Authorization': 'Bearer ' + token
           }
        };
      const response = await axios.delete(requestUrl,token);
       console.log(response);
      if (response.status!==200&&response.status!==204) {
          throw new Error('Error eliminando archivo');
        }
        return response; 
      }
    
      catch(error){
       console.error(error.response);
       throw error;
   }
  }

export const  guardarArchivo= async (archivo,token) =>{
   try {
      const requestUrl =URL +'/archivos';
       const config = {
         headers: { 
              'content-type': 'multipart/form-data',
              'Authorization': 'Bearer ' + token
            }
         };

      const response = await axios.post(requestUrl,archivo,config);
  //    console.log(response);
      return response;   
  
    } catch (err) {
      console.error(err);   
      //console.log(error.response);

      //throw(error);
     
    }
}

export async function obtenerSubestaciones(){  
  try {
    
    const requestUrl =URL +'/subestaciones';
    const response = await axios.get(requestUrl);
     
    if (response.statusText!=="OK") {
        throw new Error('Error ');
      }
      return response; 
    }
  
    catch(error){
     console.error(error.response);
     throw error;
 }
}

export async function obtenerSubestacion(id){  
  try {
    
    const requestUrl =URL +'/subestaciones/'+id;
    const response = await axios.get(requestUrl);
     
    if (response.statusText!=="OK") {
        throw new Error('Error ');
      }
      return response; 
    }
  
    catch(error){
     console.error(error.response);
     throw error;
 }
}



export const  guardarSubestacion= async (subestacion) =>{
 try {
    const requestUrl =URL +'/subestaciones';
    const response = await axios.post(requestUrl,subestacion);
    return response;   

  } catch (err) {
    console.error(err);   
   
  }
}

export const  editarSubestacion= async (subestacion) =>{
  try {
    
     const requestUrl =URL +'/subestaciones/'+subestacion.id;
     console.log(requestUrl);
     const response = await axios.put(requestUrl,subestacion);
     return response;   
 
   } catch (err) {
     console.error(err);   
    
   }
 }

 
 //USERS
 export const  editUser= async (user,id,token) =>{
  try {
    const requestUrl =URL +'/users/'+id;

     const config = {
       headers: { 
        
        'x-access-token': `${token}`,

      }};

      const response = await axios.put(requestUrl,user,config);

      return response;   
  } catch (error) {
   
    throw(error);
  }
}

export const deleteUser= async (user,id,token) =>{
  try {
    const requestUrl =URL +'/users/'+id;

     const config = {
       headers: { 
        
        'x-access-token': `${token}`,
        'email':user.email

      }};

      const response = await axios.delete(requestUrl,config);

      return response;   
  } catch (error) {
   
    throw(error);
  }
}
export const  saveRequest= async (request) =>{
  try {
    const requestUrl =URL +'/authenticate/forgot';

    const response = await axios.post(requestUrl,request);

    return response;   

  } catch (error) {
   
    throw(error);
  }
}

export const  resetPassword= async (user,NuevoPassword,token) =>{
  try {       
    const config = {
    headers: { 
         'Authorization': 'Bearer ' + user.token,
         'NuevoPassword':NuevoPassword 
       }
    };
  
    const requestUrl =URL +'/cuentas/login/cambiar';
    console.log(requestUrl);
    console.log(user);
    console.log(config);
    const response = await axios.post(requestUrl,{'email':user.email,'password':user.password},config);
    console.log(response);
    return response;   

  } catch (error) {
   console.log(error);
    throw(error);
  }
}

export async function saveUser(user){  
  try {
       
     const requestUrl =URL +'/authenticate/register';
     const response = await axios.post(requestUrl, user );
     if (response.statusText!=="OK") {
       throw new Error('Error saving user');
     }

     return response; 
    
 }
 catch(error){
     console.log(error.response);
     throw error.response;
 }
}

export async function loginUser(user){  
 try {
   
    const requestUrl =URL +'/cuentas/login';

 console.log(requestUrl);
 console.log(user);   
 const response = await axios.post(requestUrl, user);
    if (response.statusText!=="OK") {
      throw new Error('Error saving user');
    }

    return response; 
   
}
catch(error){
    console.error(error.response);
    throw error;
}
}
