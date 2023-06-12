
import { Input } from "reactstrap";
import { DIR_PUBLIC, DIR_SERV } from "../variables";
import '../style_components/DevicesFromComponent.css';
import { useEffect, useState } from "react";
import axios from "axios";
export function ErrorCompatibilidadEstructura(props) {
    const [estructuraPlaca, setEstructuraPlaca] = useState(null);
    const [estructuraTorre, setEstructuraTorre] = useState(null);
    useEffect(() => {
        axios.post(DIR_SERV + '/estructura/'+props.estructuraPlaca, {
           
          })
            .then(response => {
                setEstructuraPlaca(response.data.estructura.nombre_tipo_estructura)
      
      
            })
            .catch(error => {
              console.log(error);
            });
            axios.post(DIR_SERV + '/estructura/'+props.estructuraTorre, {
           
            })
              .then(response => {
                  setEstructuraTorre(response.data.estructura.nombre_tipo_estructura)
        
        
              })
              .catch(error => {
                console.log(error);
              });
    
      }, []);
  return (<div class="error_compatibilidad">
    <h4>Estructuras diferentes</h4>
    <p>La estructura de la placa base ({estructuraPlaca}) y la de la torre ({estructuraTorre}) no son la misma y no podrán ser ensambladas correctamente.</p>
  </div>);
}
export default ErrorCompatibilidadEstructura;