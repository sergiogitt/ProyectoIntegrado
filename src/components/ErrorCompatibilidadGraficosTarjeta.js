
import { Input } from "reactstrap";
import { DIR_PUBLIC } from "../variables";
import '../style_components/DevicesFromComponent.css';
import { useState } from "react";
export function ErrorCompatibilidadGraficosTarjeta(props) {
  
  return (<div class="error_compatibilidad">
    <h4>Potencia baja tarjeta</h4>
    <p>Se ha detectado que la tarjeta gráfica elegia tiene una puntuación gráfica ({props.socket1}) por debajo del mínimo requerido para jugar a los juegos seleccionados</p>
  </div>);
}
export default ErrorCompatibilidadGraficosTarjeta;