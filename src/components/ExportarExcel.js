import React  from 'react';
import ExportExcel from 'react-export-excel';
import { Button} from '@material-ui/core'; 
const ExcelFile=ExportExcel.ExcelFile;
const ExcelSheet=ExportExcel.ExcelSheet;
const ExcelColumn=ExportExcel.ExcelColumn;

const ExportarExcel= function(props){
    return(
    <div>
    <ExcelFile element={<Button className="Boton" type="submit" variant="contained" color="primary">Exportar a Excel</Button> }fileName="GeneracionPorPlanta">
        {props.data?
            <ExcelSheet data={props.data} name="GeneracionTotales">
            {props.columns ? props.columns.map( dataItem=>
                <ExcelColumn label={dataItem.title} key={dataItem.title} value={dataItem.field} > </ExcelColumn>
                    ):''}  
            
            </ExcelSheet>:''
        }
    </ExcelFile>
  </div>   
    )
}
export default ExportarExcel;