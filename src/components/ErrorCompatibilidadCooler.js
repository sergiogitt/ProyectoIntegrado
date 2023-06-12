
import { Input } from "reactstrap";
import { DIR_PUBLIC } from "../variables";
import '../style_components/DevicesFromComponent.css';
import { useState } from "react";
export function ErrorCompatibilidadCooler(props) {
  
  return (<div class="error_compatibilidad">
    <h4>Cooler grande</h4>
    <p>Se ha detectado que el cooler que refrigera el procesador tiene un tamaño ({props.alturaCooler}mm) superior al que admite la torre seleccionada ({props.profundidadTorre}mm)</p>
  </div>);
}
export default ErrorCompatibilidadCooler;