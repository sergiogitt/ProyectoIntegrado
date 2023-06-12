import { Spinner } from 'reactstrap';
import ComponenteConfigurador from './ComponenteConfigurador';
import { SeleccionPresupuesto } from './SeleccionPresupuesto';
import { useEffect, useState } from 'react';
import { DIR_SERV } from '../variables';
import axios from 'axios';
import '../style_components/Configurador.css';
import ErrorCompatibilidadSocket from './ErrorCompatibilidadSocket';
import ErrorCompatibilidadVatios from './ErrorCompatibilidadVatios';
import ErrorCompatibilidadEstructura from './ErrorCompatibilidadEstructura';
import ErrorCompatibilidadVentilacion from './ErrorCompatibilidadVentilacion';
import ErrorCompatibilidadCooler from './ErrorCompatibilidadCooler';

export function Configurador(props) {
  const [cargando, setCargando] = useState(null);
  const [componentes, setComponentes] = useState([]);
  const [precios, setPrecios] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [socketProcesador, setsocketProcesador] = useState(null);
  const [alturaCooler, setAlturaCooler] = useState(null);
  const [socketPlacaBase, setsocketPlacaBase] = useState(null);
  const [estructuraPlacaBase, setEstructuraPlacaBase] = useState(null);
  const [estructuraTorre, setestructuraTorre] = useState(null);
  const [profundidadTorre, setProfundidadTorre] = useState(null);
  const [capacidadVentilacion, setCapacidadVentilacion] = useState(0);
  const [capacidadVentilacion2, setCapacidadVentilacion2] = useState(0);
  const [vatiosNecesarios, setvatiosNecesarios] = useState([]);
  const [vatiosFuente, setvatiosFuente] = useState([]);
  useEffect(() => {
    console.log(sessionStorage)
    // get the data from sessionStorage when the component mounts
    if (!sessionStorage.visualizacion) {
      sessionStorage.setItem("visualizacion", "configurador");
    }
    props.setVisualizacion(sessionStorage.visualizacion);

    switch (sessionStorage.tipo_configuracion) {
      case "disenyo":

        break;
      case "gaming":
        break;
      case "multimedia":
        setCargando(true)
        if (componentes[1] == null) {
          axios.post(DIR_SERV + "/equipo_configurado_ofimatica", {
            precio: sessionStorage.presupuesto,
          })
            .then(response => {
              let componentesAux = [];
              let precioAux = [];
              let vatiosTotales = [];
              vatiosTotales[0] = response.data.procesador.vatios_procesador
              vatiosTotales[4] = response.data.refrigeracion_liquida.vatios_refrigeracion_liquida
              vatiosTotales[7] = response.data.tarjeta_grafica.vatios_tarjeta_grafica

              setvatiosNecesarios(vatiosTotales)
              setsocketProcesador(response.data.procesador.socket_procesador)
              setsocketPlacaBase(response.data.placa_base.socket_placa_base)
              setvatiosFuente(response.data.fuente_alimentacion.vatios_fuente_alimentacion)
              setEstructuraPlacaBase(response.data.placa_base.id_tipo_estructura)
              setestructuraTorre(response.data.torre.id_tipo_estructura)
              setProfundidadTorre(response.data.torre.profundidad_torre)
              setCapacidadVentilacion(response.data.refrigeracion_liquida.maximo_calor_refrigerado_refrigeracion_liquida)
              componentesAux.push(response.data.procesador);
              componentesAux.push(response.data.placa_base);
              componentesAux.push(response.data.fuente_alimentacion);
              componentesAux.push(response.data.ram);
              componentesAux.push(response.data.refrigeracion_liquida);
              componentesAux.push(response.data.torre);
              componentesAux.push(response.data.disco_duro);
              componentesAux.push(response.data.tarjeta_grafica);
              componentesAux.push(null);
              componentesAux.push(null);
              componentesAux.push(null);


              precioAux.push(response.data.procesador.precio_procesador);
              precioAux.push(response.data.placa_base.precio_placa_base);
              precioAux.push(response.data.fuente_alimentacion.precio_fuente_alimentacion);
              precioAux.push(response.data.ram.precio_ram);
              precioAux.push(response.data.refrigeracion_liquida.precio_refrigeracion_liquida);
              precioAux.push(response.data.torre.precio_torre);
              precioAux.push(response.data.disco_duro.precio_disco_duro);
              precioAux.push(response.data.tarjeta_grafica.precio_tarjeta_grafica);
              precioAux.push(null)
              precioAux.push(null)
              precioAux.push(null)



              setPrecios(precioAux)
              refrescarPrecio();
              setCapacidadVentilacion(response.data.refrigeracion_liquida.maximo_calor_refrigerado_refrigeracion_liquida);
              setPrecioTotal(response.data.coste)
              setComponentes(componentesAux)
              setCargando(false)
            })
            .catch(error => {
              console.log(error);
            });
        }

        break;
    }
  }, []);
  function refrescarPrecio() {
    const total = precios.reduce((total, valor) => total + Number(valor), 0);
    const truncado = Math.round(total * 100) / 100; // Truncar a dos decimales
    setPrecioTotal(truncado);
  }

  function cambiarPrecioTotal(indice, precioNuevo) {
    let precioAux = precios;
    console.log(precioAux)
    precioAux[indice] = precioNuevo;
    setPrecios(precioAux);
    refrescarPrecio()
  }
  function cambiarSeleccionado(indice, elemento) {
    let componentesAux = componentes;
    componentesAux[indice] = elemento;
    setComponentes(componentesAux);
  }







  let visualzacion = [];
  let errores = [];

  if (socketPlacaBase != null && socketProcesador != null && socketPlacaBase != socketProcesador) {
    errores.push(<ErrorCompatibilidadSocket socket1={socketPlacaBase} socket2={socketProcesador}>Diferentes</ErrorCompatibilidadSocket>)
  }
  if (vatiosNecesarios.reduce((total, valor) => total + Number(valor), 0) > vatiosFuente) {
    errores.push(<ErrorCompatibilidadVatios vatiosFuente={vatiosFuente} vatiosActuales={vatiosNecesarios.reduce((total, valor) => total + Number(valor), 0)} ></ErrorCompatibilidadVatios>)
  }
  if (estructuraPlacaBase!=null&&estructuraTorre!=null&&estructuraPlacaBase!=estructuraTorre) {
    errores.push(<ErrorCompatibilidadEstructura estructuraPlaca={estructuraPlacaBase} estructuraTorre={estructuraTorre}></ErrorCompatibilidadEstructura>)
  }
  if ((capacidadVentilacion+capacidadVentilacion2)<=50) {
    errores.push(<ErrorCompatibilidadVentilacion ventilacion={capacidadVentilacion+capacidadVentilacion2}></ErrorCompatibilidadVentilacion>)
  }
  if (alturaCooler!=null&&profundidadTorre!=null&&profundidadTorre<alturaCooler) {
    errores.push(<ErrorCompatibilidadCooler alturaCooler={alturaCooler} profundidadTorre={profundidadTorre}></ErrorCompatibilidadCooler>)
  }
  
console.log(capacidadVentilacion)
console.log(capacidadVentilacion2)
  visualzacion.push(<ComponenteConfigurador indice={0} nombre={"Procesador"} setSocket={setsocketProcesador} tabla={"procesador"} seleccionado={componentes[0]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={1} nombre={"Placa base"} setEstructura={setEstructuraPlacaBase} setSocket={setsocketPlacaBase} tabla={"placa_base"} seleccionado={componentes[1]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={2} setVatiosMaximo={setvatiosFuente} nombre={"Fuente alimentacion"} tabla={"fuente_alimentacion"} seleccionado={componentes[2]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={3} nombre={"RAM"} tabla={"ram"} seleccionado={componentes[3]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={4} nombre={"Regrigeracion líquida"} setCapacidadVentilacion={setCapacidadVentilacion} tabla={"refrigeracion_liquida"} seleccionado={componentes[4]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={5} nombre={"Torre"} setProfundidadTorre={setProfundidadTorre} setEstructura={setestructuraTorre} tabla={"torre"} seleccionado={componentes[5]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={6} nombre={"Disco duro"} tabla={"disco_duro"} seleccionado={componentes[6]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={7} nombre={"Tarjeta grafica"} tabla={"tarjeta_grafica"} seleccionado={componentes[7]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={8} setAlturaCooler={setAlturaCooler} nombre={"Cooler procesador"} tabla={"cooler_procesador"} seleccionado={componentes[8]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={9} nombre={"Sistema Operativo"} tabla={"sistema_operativo"} seleccionado={componentes[9]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={10} nombre={"Ventilador"} setCapacidadVentilacion2={setCapacidadVentilacion2} tabla={"ventilador"} seleccionado={componentes[10]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<>{precioTotal}€</>)

  return (<div>
    {(!cargando) ? <div id="configurador"><div id="componentes">{visualzacion}</div><div id="errores"><div id="precio_total"><h4>Precio total</h4><span>{precioTotal}€</span></div>{errores}</div></div> : <div class="spinner"><Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner></div>}
  </div>
  )
}
