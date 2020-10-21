import axios from 'axios';
//export const URL='http://localhost:53363/api';
const URL='http://192.168.0.14:5100/api';
export async function obtenerArchivoFecha(fecha,scada){  
    try {
      console.log(fecha);
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