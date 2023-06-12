
import { Input } from "reactstrap";
import { DIR_PUBLIC, DIR_SERV } from "../variables";
import '../style_components/DevicesFromComponent.css';
import { useEffect, useState } from "react";
import axios from "axios";
export function ErrorCompatibilidadVentilacion(props) {
    
  return (<div class="error_compatibilidad">
    <h4>Ventilación insuficiente</h4>
    <p>La capacidad de ventilación seleccionada ({props.ventilacion}cfm) es insuficiente para la configuración elegida.</p>
  </div>);
}
export default ErrorCompatibilidadVentilacion;