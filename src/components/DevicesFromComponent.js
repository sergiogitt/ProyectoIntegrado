
import { Input } from "reactstrap";
import { DIR_PUBLIC } from "../variables";
import '../style_components/DevicesFromComponent.css';
import { useState } from "react";
export function DevicesFromComponent(props) {

    let marca = "marca_" + props.tabla;
    let modelo = "modelo_" + props.tabla;
    let precio = "precio_" + props.tabla;
    let imagen = "imagen_" + props.tabla;
    let id = "id_" + props.tabla;

    return (<div class="device">
        <div class="device_image"><img src={(!props.data[imagen]) ? (DIR_PUBLIC + "/public/assets/" + "no-disponible.png") : (DIR_PUBLIC + "/public/assets/" + props.data[imagen])} alt="" title="" /></div>
        <div class="device_info">
            <div class="modelo_marca">
                <span>{props.data[marca]}</span>
                <span>{props.data[modelo]}</span>
            </div>
            <div class="precio_boton">
                <span>{props.data[precio]}€</span>
                <button onClick={() => props.cambiarSeleccionado(props.data)} class={(props.componenteSeleccionado == props.data[id]) ? "seleccionado" : " "}>Seleccionar</button>
            </div>


        </div>
    </div>);
}
export default DevicesFromComponent;