
import { Input } from "reactstrap";
import { DIR_PUBLIC } from "../variables";
import '../style_components/DevicesFromComponent.css';
import { useState } from "react";
export function ErrorCompatibilidadVatios(props) {
  
  return (<div class="error_compatibilidad">
    <h4>Vatios insuficientes</h4>
    <p>Se ha detectado que los vatios minimos necesarios para la configuracion  ({(props.vatiosActuales==null)?"0":props.vatiosActuales}W)
    y la maxima capacidad suministrada por la fuente de alimentacio  ({(props.vatiosFuente==null)?"0":props.vatiosFuente}W)  es insuficiente</p>
  </div>);
}
export default ErrorCompatibilidadVatios;