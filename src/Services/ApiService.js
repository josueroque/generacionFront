import axios from 'axios';
export const URL='http://localhost:53363/api';


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
          
              'content-type': 'multipart/form-data'
            }
         };
      console.log('desde service');   
   
      // for (var pair of archivo.entries())
      // {
      //  console.log(pair[0]+ ', '+ pair[1]); 
      // }
    //  console.log(archivo);
      const response = await axios.post(requestUrl,archivo,config);
  //    console.log(response);
      return response;   
  
    } catch (err) {
      console.error(err);   
      //console.log(error.response);

      //throw(error);
     
    }
}
  