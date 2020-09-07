import axios from 'axios';
export const URL='http://localhost:3001/api';


export async function obtenerArchivo(id){  
    try {
      
      const requestUrl =URL +'/archivos?id='+id;
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


export const  guardarArchivo= async (archivo) =>{
    try {
      const requestUrl =URL +'/archivos';
       const config = {
         headers: { 
          
         // 'x-access-token': `${token}`,
                    'Content-Type':'multipart/form-data'},
         };
  
      const response = await axios.post(requestUrl,archivo,config);
      return response;   
  
    } catch (error) {
     
      throw(error);
    }
  }
  