import { Spinner } from 'reactstrap';
import ComponenteConfigurador from './ComponenteConfigurador';
import { SeleccionPresupuesto } from './SeleccionPresupuesto';
import { useEffect, useState } from 'react';
import { DIR_SERV } from '../variables';
import axios from 'axios';

export function Configurador(props) {
  const [presupuesto, setPresupuesto] = useState(null);
  const [cargando, setCargando] = useState(null);
  const [componentes, setComponentes] = useState([]);
  const [precios, setPrecios] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [idDiscoDuro, setidDiscoDuro] = useState(null);
  const [idFuente_alimentacion, setidFuente_alimentacion] = useState(null);
  const [idPlaca_base, setidPlaca_base] = useState(null);
  const [idProcesador, setidProcesador] = useState(null);
  const [idRam, setidRam] = useState(null);
  const [idRefrigeracion_liquida, setidRefrigeracion_liquida] = useState(null);
  const [idTarjeta_grafica, setidTarjeta_grafica] = useState(null);
  const [idTorre, setidTorre] = useState(null);
  const [socketProcesador, setsocketProcesador] = useState(null);
  const [socketPlacaBase, setsocketPlacaBase] = useState(null);
  const [estructuraPlacaBase, setEstructuraPlacaBase] = useState(null);
  const [estructuraTorre, setestructuraTorre] = useState(false);
  const [capacidadVentilacion, setCapacidadVentilacion] = useState(0);
  const [calorGenerado, setCalorGenerado] = useState(0);
  const [vatiosNecesarios, setvatiosNecesarios] = useState(0);
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
        if(idRam==null){
          axios.post(DIR_SERV+"/equipo_configurado_ofimatica", {
            precio: sessionStorage.presupuesto,
        })
            .then(response => {
               let calor=0;
               let componentesAux=[];
               let precioAux=[];
               calor+=response.data.procesador.vatios_procesador;
               calor+=response.data.refrigeracion_liquida.vatios_refrigeracion_liquida;
               calor+=response.data.tarjeta_grafica.vatios_tarjeta_grafica;
               setvatiosNecesarios(calor)
               calor+=response.data.fuente_alimentacion.vatios_fuente_alimentacion;
               setCalorGenerado(calor);
               componentesAux.push(response.data.procesador);
               componentesAux.push(response.data.disco_duro);
               componentesAux.push(response.data.fuente_alimentacion);
               componentesAux.push(response.data.placa_base);
               componentesAux.push(response.data.ram);
               componentesAux.push(response.data.refrigeracion_liquida);
               componentesAux.push(response.data.tarjeta_grafica);
               componentesAux.push(response.data.torre);

               precioAux.push(response.data.procesador.precio_procesador);
               precioAux.push(response.data.disco_duro.precio_disco_duro);
               precioAux.push(response.data.fuente_alimentacion.precio_fuente_alimentacion);
               precioAux.push(response.data.placa_base.precio_placa_base);
               precioAux.push(response.data.ram.precio_ram);
               precioAux.push(response.data.refrigeracion_liquida.precio_refrigeracion_liquida);
               precioAux.push(response.data.tarjeta_grafica.precio_tarjeta_grafica);
               precioAux.push(response.data.torre.precio_torre);
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
  
  function cambiarPrecioTotal(indice,precioNuevo) {
    let precioAux=precios;
    console.log(precioAux)
    precioAux[indice]=precioNuevo;
    setPrecios(precioAux);
    refrescarPrecio()
  }
  function cambiarSeleccionado(indice,elemento) {
    let componentesAux=componentes;
    componentesAux[indice]=elemento;
    setComponentes(componentesAux);
  }
  
  
  


  let visualzacion = [];
  visualzacion.push(<ComponenteConfigurador  indice={0} nombre={"Procesador"} tabla={"procesador"} seleccionado={componentes[0]} setSeleccionado={(a,b)=>cambiarSeleccionado(a,b)} cambiarPrecioTotal={(a,b,c,d)=>cambiarPrecioTotal(a,b,c,d)}></ComponenteConfigurador>)
 /* visualzacion.push(<ComponenteConfigurador nombre={"Placa base"} tabla={"placa_base"} seleccionado={idPlaca_base} setSeleccionado={setidPlaca_base}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador nombre={"Fuente alimentacion"} tabla={"fuente_alimentacion"} seleccionado={idFuente_alimentacion} setSeleccionado={setidFuente_alimentacion}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador nombre={"RAM"} tabla={"ram"} seleccionado={idRam} setSeleccionado={setidRam}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador nombre={"Regrigeracion líquida"} tabla={"refrigeracion_liquida"} seleccionado={idRefrigeracion_liquida} setSeleccionado={setidRefrigeracion_liquida}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador nombre={"Torre"} tabla={"torre"} seleccionado={idTorre} setSeleccionado={setidTorre}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador nombre={"Disco duro"} tabla={"disco_duro"} seleccionado={idDiscoDuro} setSeleccionado={setidDiscoDuro}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador nombre={"Tarjeta grafica"} tabla={"tarjeta_grafica"} seleccionado={idTarjeta_grafica} setSeleccionado={setidTarjeta_grafica}></ComponenteConfigurador>)

  visualzacion.push(<ComponenteConfigurador nombre={"Cooler"} tabla={"cooler_procesador"}></ComponenteConfigurador>)*/
visualzacion.push(<>{precioTotal}€</>)

  return (<div>
    {(!cargando) ? visualzacion : <div class="spinner"><Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner></div>}
  </div>
  )
}
