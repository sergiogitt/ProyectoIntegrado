import { Spinner } from 'reactstrap';
import ComponenteConfigurador from './ComponenteConfigurador';
import { SeleccionPresupuesto } from './SeleccionPresupuesto';
import { useEffect, useState } from 'react';
import { DIR_SERV } from '../variables';
import axios from 'axios';

export function Configurador(props) {
  const [presupuesto, setPresupuesto] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [idDiscoDuro, setidDiscoDuro] = useState(false);
  const [idFuente_alimentacion, setidFuente_alimentacion] = useState(false);
  const [idPlaca_base, setidPlaca_base] = useState(false);
  const [idProcesador, setidProcesador] = useState(false);
  const [idRam, setidRam] = useState(false);
  const [idRefrigeracion_liquida, setidRefrigeracion_liquida] = useState(false);
  const [idTarjeta_grafica, setidTarjeta_grafica] = useState(false);
  const [idTorre, setidTorre] = useState(false);
  const [socketProcesador, setsocketProcesador] = useState(false);
  const [socketPlacaBase, setsocketPlacaBase] = useState(false);
  const [estructuraPlacaBase, setEstructuraPlacaBase] = useState(false);
  const [estructuraTorre, setestructuraTorre] = useState(false);
  const [precioTotal, setPrecioTotal] = useState(0);
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
        axios.post(DIR_SERV+"/equipo_configurado_ofimatica", {
                precio: sessionStorage.presupuesto,
            })
                .then(response => {
                   setCargando(false)
                   let calor=0;
                   calor+=response.data.procesador.vatios_procesador;
                   calor+=response.data.refrigeracion_liquida.vatios_refrigeracion_liquida;
                   calor+=response.data.tarjeta_grafica.vatios_tarjeta_grafica;
                   setvatiosNecesarios(calor)
                   console.log(calor)
                   calor+=response.data.fuente_alimentacion.vatios_fuente_alimentacion;
                   setCalorGenerado(calor);
                   console.log(calor)
                   console.log(response)
                   setidDiscoDuro(response.data.disco_duro);
                   setidFuente_alimentacion(response.data.fuente_alimentacion);
                   setidPlaca_base(response.data.placa_base);
                   setidProcesador(response.data.procesador);
                   setidRam(response.data.ram);
                   setidRefrigeracion_liquida(response.data.refrigeracion_liquida);
                   setCapacidadVentilacion(response.data.refrigeracion_liquida.maximo_calor_refrigerado_refrigeracion_liquida)
                   setidTarjeta_grafica(response.data.tarjeta_grafica);
                   setidTorre(response.data.torre);
                })
                .catch(error => {
                    console.log(error);
                });
        break;
    }
  }, []);

  function changePresupuesto(newPresupuesto) {
    setPresupuesto(newPresupuesto)
    console.log(newPresupuesto)
  }
  let visualzacion = [];
  visualzacion.push(<ComponenteConfigurador nombre={"Procesador"} tabla={"procesador"} seleccionado={idProcesador} setSeleccionado={setidProcesador}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador nombre={"Placa base"} tabla={"placa_base"} seleccionado={idPlaca_base} setSeleccionado={setidPlaca_base}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador nombre={"Fuente alimentacion"} tabla={"fuente_alimentacion"} seleccionado={idFuente_alimentacion} setSeleccionado={setidFuente_alimentacion}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador nombre={"RAM"} tabla={"ram"} seleccionado={idRam} setSeleccionado={setidRam}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador nombre={"Regrigeracion líquida"} tabla={"refrigeracion_liquida"} seleccionado={idRefrigeracion_liquida} setSeleccionado={setidRefrigeracion_liquida}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador nombre={"Torre"} tabla={"torre"} seleccionado={idTorre} setSeleccionado={setidTorre}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador nombre={"Disco duro"} tabla={"disco_duro"} seleccionado={idDiscoDuro} setSeleccionado={setidDiscoDuro}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador nombre={"Tarjeta grafica"} tabla={"tarjeta_grafica"} seleccionado={idTarjeta_grafica} setSeleccionado={setidTarjeta_grafica}></ComponenteConfigurador>)

  visualzacion.push(<ComponenteConfigurador nombre={"Cooler"} tabla={"cooler_procesador"}></ComponenteConfigurador>)


  return (<div>
    {(!cargando) ? visualzacion : <div class="spinner"><Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner></div>}
  </div>
  )
}
