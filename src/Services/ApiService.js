import axios from 'axios';
import { format } from 'date-fns';
//const URL='http://localhost:53363/api';
const URL='http://192.168.0.14:5100/api';

export async function consultarCurvaDemanda(token,filtro ){  
  try {
  
    let Fecha1= format(
      new Date(filtro.fecha1),
      'MM/dd/yyyy'
     )
  
    let Fecha2= format(
      new Date(filtro.fecha2),
      'MM/dd/yyyy'
    )
    
    let urlFiltros;
    
       urlFiltros=URL+'/curvademanda/';
    
    if (filtro.fecha1){
        urlFiltros+='?FechaInicial='+Fecha1;
    }
    
    if (filtro.fecha2){
       filtro.fecha1?urlFiltros+='&FechaFinal='+Fecha2: urlFiltros+='filtro?FechaFinal='+Fecha2;
    }
    
    const config = {
        headers: {'Authorization': 'Bearer ' + token},
    };
    
    const response= await (axios.get(urlFiltros,config));
     
    if (response.statusText!=="OK") {
        throw new Error('Error getting data'); 
     }
      
      return response; 
    }
  
    catch(error){
     console.error(error.response);
     throw error;
 }
}

export async function consultar(totales,scada,token,filtro ){  
  try {
  
    let Fecha1= format(
      new Date(filtro.fecha1),
      'MM/dd/yyyy'
     )
  
    let Fecha2= format(
      new Date(filtro.fecha2),
      'MM/dd/yyyy'
    )
    
    let urlFiltros;
    
    if (scada===true){
       urlFiltros=URL+'/scadavalores/';
    }   
    else{
       urlFiltros=URL+'/comercialdatos/';
    } 
    
    if (filtro.fecha1){
        urlFiltros+='filtro?totales='+totales+'&FechaInicial='+Fecha1;
    }
    
    if (filtro.fecha2){
       filtro.fecha1?urlFiltros+='&FechaFinal='+Fecha2: urlFiltros+='filtro?FechaFinal='+Fecha2;
    }
    
    if (filtro.nombrePlanta){
        if (filtro.nombrePlanta!=='Todos'){
            if (filtro.fecha1 || filtro.fecha2){
                urlFiltros+='&NombrePlanta='+filtro.nombrePlanta;
            }
            else{
                urlFiltros+='filtro?totales='+totales+'&NombrePlanta='+filtro.nombrePlanta;
            }
        }
    }

    if (filtro.idZona){
          if (parseInt(filtro.idZona)!==0){
              if (filtro.fecha1 || filtro.fecha2 ||(filtro.nombrePlanta!=='Todos')){
                  urlFiltros+='&IdZona='+filtro.idZona;
              }
              else{
                  urlFiltros+='filtro?totales='+totales+'&IdZona='+filtro.idZona;
              }
          }
      }

      if (filtro.idFuente){

          if (parseInt(filtro.idFuente)!==0){
              if (filtro.fecha1 || filtro.fecha2 ||(filtro.nombrePlanta!=='Todos')||(filtro.idZona!==0)){
                  urlFiltros+='&IdFuente='+filtro.idFuente;
              }
              else{
                  urlFiltros+='filtro?totales='+totales+'&IdFuente='+filtro.idFuente;
              }
              
          }
      }
      if (filtro.idTension){

        if (parseInt(filtro.idTension)!==0){
            if (filtro.fecha1 || filtro.fecha2 ||(filtro.nombrePlanta!=='Todos')||(filtro.idTension!==0)){
                urlFiltros+='&IdTension='+filtro.idTension;
            }
            else{
                urlFiltros+='filtro?totales='+totales+'&IdTension='+filtro.idTension;
            }
         }
    }
    
    if (filtro.idOrigen){

        if (parseInt(filtro.idOrigen)!==0){
            if (filtro.fecha1 || filtro.fecha2 ||(filtro.nombrePlanta!=='Todos')||(filtro.idOrigen!==0)){
                urlFiltros+='&IdOrigen='+filtro.idOrigen;
            }
            else{
                urlFiltros+='filtro?totales='+totales+'&IdOrigen='+filtro.idOrigen;
            }
            
        }
    }

    const config = {
    
    headers: { 
       
        'Authorization': 'Bearer ' + token},
    };
    
    const response= await (axios.get(urlFiltros,config));
     
    if (response.statusText!=="OK") {
        throw new Error('Error getting data'); 
     }
      
      return response; 
    }
  
    catch(error){
     console.error(error.response);
     throw error;
 }
}


export async function obtenerArchivoFecha(fecha,scada){  
    try {
      
      const requestUrl =URL +'/archivos/fecha?fecha='+fecha+'&scada='+scada;
      const response = await axios.get(requestUrl);
       
      if (response.statusText!=="OK") {
          throw new Error('Error getting file'); 
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
      const response = await axios.delete(requestUrl,config);
       
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

      return response;   
  
    } catch (err) {
      console.error(err);   

     
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

export async function obtenerPlantas(){  
  try {
    
    const requestUrl =URL +'/plantas';
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

export async function obtenerFuentes(){  
  try {
    
    const requestUrl =URL +'/fuentes';
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

    const response = await axios.post(requestUrl,{'email':user.email,'password':user.password},config);
  
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
