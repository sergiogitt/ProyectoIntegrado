
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
  return (<div class="device" id={(props.vistaPrevia != null) ? ("vistaPrevia") : "de"}>

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
          !props.data[imagen] ?
            (DIR_PUBLIC + "/public/assets/no-disponible.png")
            : (DIR_PUBLIC + "/public/assets/" + props.data[imagen])
        }
        alt=""
        title=""
      />
    )}
    {(props.vistaPrevia != null) ? (<div class="device_info">
      <div class="modelo_marcas">
        <span>{props.marca}</span>
        <span>{props.modelo}</span>
      </div>
      <div class="precio_boton">
        <span>{props.precio}€</span>
        {(!props.cambiarSeleccionado) ? (<button  >Seleccionar</button>) : (<button onClick={(a) => props.cambiarSeleccionado(props.indice, props.data)} >Seleccionar </button>)}

      </div>


    </div>) : (
      <div class="device_info">
        <div class="modelo_marca">
          <span>{props.data[marca]}</span>
          <span>{props.data[modelo]}</span>
        </div>
        <div class="precio_boton">
          <span>{props.data[precio]}€</span>
          {(!props.cambiarSeleccionado) ?
            ((props.quitar) ? (<button onClick={() => {
              if (props.setSocket) {

                console.log("quitando socket")
                props.setSocket(null)
              }
              if (props.setVatiosMaximo) {

                props.setVatiosMaximo(null)
              }
              if (props.setEstructura) {
                props.setEstructura(null)
              }
              if (props.setCapacidadVentilacion) {
                props.setCapacidadVentilacion(0)
              }
              if (props.setCapacidadVentilacion2) {
                props.setCapacidadVentilacion2(0)
              }
              if (props.setAlturaCooler) {
                props.setAlturaCooler(null)
              }
              if (props.setProfundidadTorre) {
                props.setProfundidadTorre(null)
              }
              props.cambiarPrecioTotal(props.indice, 0);
              
              
              props.quitar(props.indice, null)
            }}>Quitar</button>) : (<button>Seleccionar</button>))
            : (<button
              onClick={() => {
                console.log(props.data)
                props.cambiarPrecioTotal(props.indice, props.data[precio])
                if (props.setSocket) {
                  let socket = "socket_" + props.tabla;
                  props.setSocket(props.data[socket])
                }
                if (props.setVatiosMaximo) {
                  props.setVatiosMaximo(props.data["vatios_fuente_alimentacion"])
                }
                if (props.setEstructura) {
                  props.setEstructura(props.data["id_tipo_estructura"])
                }
                if (props.setCapacidadVentilacion) {
                  props.setCapacidadVentilacion(props.data["maximo_calor_refrigerado_refrigeracion_liquida"])
                }
                if (props.setCapacidadVentilacion2) {
                  props.setCapacidadVentilacion2(props.data["maxima_cantidad_vn"])
                }
                if (props.setAlturaCooler) {
                  props.setAlturaCooler(props.data["altura_cooler_procesador"])
                }
                if (props.setProfundidadTorre) {
                  props.setProfundidadTorre(props.data["profundidad_torre"])
                }
                props.cambiarSeleccionado(props.indice, props.data);



              }
              }
            >Seleccionar</button>)}
        </div>


      </div>
    )}


  </div>);
}
export default DevicesFromComponent;