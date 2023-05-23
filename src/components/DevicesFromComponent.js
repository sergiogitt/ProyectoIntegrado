
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
    return (<div class="device" id={(props.vistaPrevia!=null)? ("vistaPrevia"):"de"}> 
       {props.vistaPrevia ? (
        <img class="imagen" 
          src={
            !props.cargarBD
              ? !props.data[imagen]
                ? props.vistaPrevia
                : DIR_PUBLIC + "/public/assets/" + props.data[imagen]
              : DIR_PUBLIC + "/public/assets/" + props.data[imagen]
          }
          alt=""
          title=""
        />
      ) : (
        <img class="imagen"
          src={
            !props.data[imagen]?
              ( DIR_PUBLIC + "/public/assets/no-disponible.png")
              : (DIR_PUBLIC + "/public/assets/" + props.data[imagen])
          }
          alt=""
          title=""
        />
      )}
      {(props.vistaPrevia!=null)?(<div class="device_info">
            <div class="modelo_marcas">
                <span>{props.marca}</span>
                <span>{props.modelo}</span>
            </div>
            <div class="precio_boton">
                <span>{props.precio}€</span>
                {(props.vistaPrevia)?(<button  >Seleccionar</button>):(<button onClick={() => props.cambiarSeleccionado(props.data)} class={(props.componenteSeleccionado == props.data[id]) ? "seleccionado" : " "}>Seleccionar</button>)}
                
            </div>


        </div>):(
        <div class="device_info">
        <div class="modelo_marca">
            <span>{props.data[marca]}</span>
            <span>{props.data[modelo]}</span>
        </div>
        <div class="precio_boton">
            <span>{props.data[precio]}€</span>
            {(!props.cambiarSeleccionado)?((props.quitar)?(<button onClick={()=>props.quitar()}>Quitar</button>):(<button>Seleccionar</button>)):(<button onClick={() => props.cambiarSeleccionado(props.data)} class={(props.componenteSeleccionado == props.data[id]) ? "seleccionado" : " "}>Seleccionar</button>)}
        </div>


    </div>
      )}
       
       
    </div>);
}
export default DevicesFromComponent;