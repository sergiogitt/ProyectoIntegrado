
import { Input } from "reactstrap";
import { DIR_PUBLIC } from "../variables";
import '../style_components/DevicesFromComponent.css';
import { useState } from "react";
export function ErrorCompatibilidadSocket(props) {
  
  return (<div class="error_compatibilidad">
    <h4>Sockets diferentes</h4>
    <p>Se ha detectado que el socket del procesador ({props.socket1}) y el socket de la placa base ({props.socket2}) no son el mismo y por lo tanto no pueden ser conectados entre sí</p>
  </div>);
}
export default ErrorCompatibilidadSocket;