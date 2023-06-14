import { Button, Spinner } from 'reactstrap';
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
import ErrorCompatibilidadGraficosTarjeta from './ErrorCompatibilidadGraficosTarjeta';

export function Configurador(props) {
  const [cargando, setCargando] = useState(null);
  const [editanto, setEditando] = useState(null);
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
  const [benchmarkProcesador, setBenchmarkProcesador] = useState(0);
  const [benchmarkTarjeta, setBenchmarkTarjeta] = useState(0);
  let endpoint = "";
  useEffect(() => {
    // get the data from sessionStorage when the component mounts
    if (!sessionStorage.visualizacion) {
      sessionStorage.setItem("visualizacion", "configurador");
    }
    props.setVisualizacion(sessionStorage.visualizacion);
    if(sessionStorage.equipo_editar){
      endpoint="/all_data_equipo";
      console.log("cambiando endpoint")
    }else{
      console.log("no cambiando endpoint")
      switch (sessionStorage.tipo_configuracion) {
        case "disenyo":
          endpoint = "/equipo_configurado_design";
          break;
        case "gaming":
          endpoint = "/equipo_configurado_gaming";
          break;
        case "multimedia":
          endpoint = "/equipo_configurado_ofimatica";
  
  
          break;
      }
    }
    
    setinitialConfiguration()
  }, []);
  function setinitialConfiguration() {
    setCargando(true)
    if (componentes[1] == null) {
      axios.post(DIR_SERV + endpoint, {
        precio: sessionStorage.presupuesto,
        puntuacion_grafica_tarjeta: sessionStorage.puntuacion_grafica_tarjeta,
        puntuacion_grafica_procesador: sessionStorage.puntuacion_grafica_procesador,
        equipo_editar:sessionStorage.equipo_editar,
        api_session:sessionStorage.api_session
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
          setBenchmarkProcesador(response.data.procesador.benchmark_procesador)
          setBenchmarkTarjeta(response.data.tarjeta_grafica.benchmark_tarjeta_grafica)
          const componentes = [
            response.data.procesador,
            response.data.placa_base,
            response.data.fuente_alimentacion,
            response.data.ram,
            response.data.refrigeracion_liquida,
            response.data.torre,
            response.data.disco_duro,
            response.data.tarjeta_grafica,
            response.data.cooler_procesador,
            response.data.sistema_operativo,
            response.data.ventilador
          ];
          
          for (const componente of componentes) {
            if (componente !== "Equipo no registrado en BD") {
              componentesAux.push(componente);
            } else {
              componentesAux.push(null);
            }
          }
          const precios = [
            response.data.procesador.precio_procesador,
            response.data.placa_base.precio_placa_base,
            response.data.fuente_alimentacion.precio_fuente_alimentacion,
            response.data.ram.precio_ram,
            response.data.refrigeracion_liquida.precio_refrigeracion_liquida,
            response.data.torre.precio_torre,
            response.data.disco_duro.precio_disco_duro,
            response.data.tarjeta_grafica.precio_tarjeta_grafica,
            response.data.cooler_procesador ? response.data.cooler_procesador.precio_cooler_procesador : 0,
            response.data.sistema_operativo ? response.data.sistema_operativo.precio_sistema_operativo : 0,
            response.data.ventilador ? response.data.ventilador.precio_ventilador : 0
          ];
          
          for (const precio of precios) {
            if (precio) {
              precioAux.push(precio);
            } else {
              precioAux.push(0);
            }
          }


          console.log(precioAux)
          setPrecios(precioAux)
          refrescarPrecio(response.data.coste);
          setCapacidadVentilacion(response.data.refrigeracion_liquida.maximo_calor_refrigerado_refrigeracion_liquida);
          setPrecioTotal(Math.round(response.data.coste * 100) / 100)
          setComponentes(componentesAux)
          setCargando(false)
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  function refrescarPrecio() {
    const total = precios.reduce((total, valor) => total + Number(valor), 0);
    const truncado = Math.round(total * 100) / 100; // Truncar a dos decimales
    setPrecioTotal(truncado);
  }

  function cambiarPrecioTotal(indice, precioNuevo) {
    let precioAux = precios;
    precioAux[indice] = precioNuevo;
    setPrecios(precioAux);
    refrescarPrecio()
  }
  function cambiarSeleccionado(indice, elemento) {
    let componentesAux = componentes;
    console.log(elemento)
    componentesAux[indice] = elemento;
    setComponentes(componentesAux);
  }
  function guardarConfiguracion() {
    setEditando(true)
    axios.post(DIR_SERV + "/guardar_configuracion", {
      api_session: sessionStorage.api_session,
      componentes: [componentes[0]?.id_procesador,
      componentes[1]?.id_placa_base,
      componentes[2]?.id_fuente_alimentacion,
      componentes[3]?.id_ram,
      componentes[4]?.id_refrigeracion_liquida,
      componentes[5]?.id_torre,
      componentes[6]?.id_disco_duro,
      componentes[7]?.id_tarjeta_grafica,
      componentes[8]?.id_cooler_procesador,
      componentes[9]?.id_sistema_operativo,
      componentes[10]?.id_ventilador,
      sessionStorage.id_usuario,]


    })
      .then(response => {
        setEditando(false)
        sessionStorage.setItem("editar_componente", response.data.componente_insertado)
      })
      .catch(error => {
        console.log(error);
      });

  }
  function editarConfiguracion() {
    axios.post(DIR_SERV + "/editar_equipo", {
      api_session: sessionStorage.api_session,
      componentes: [componentes[0]?.id_procesador,
      componentes[1]?.id_placa_base,
      componentes[2]?.id_fuente_alimentacion,
      componentes[3]?.id_ram,
      componentes[4]?.id_refrigeracion_liquida,
      componentes[5]?.id_torre,
      componentes[6]?.id_disco_duro,
      componentes[7]?.id_tarjeta_grafica,
      componentes[8]?.id_cooler_procesador,
      componentes[9]?.id_sistema_operativo,
      componentes[10]?.id_ventilador,
      sessionStorage.equipo_editar,]


    })
      .then(response => {
        props.setEquipos([])
        sessionStorage.setItem("equipo_editar", response.data.componente_insertado)
      })
      .catch(error => {
        console.log(error);
      });

  }







  let visualzacion = [];
  let errores = [];

  if (socketPlacaBase != null && socketProcesador != null && socketPlacaBase != socketProcesador) {
    errores.push(<ErrorCompatibilidadSocket socket1={socketPlacaBase} socket2={socketProcesador}>Diferentes</ErrorCompatibilidadSocket>)
  }
  if (vatiosNecesarios.reduce((total, valor) => total + Number(valor), 0) > vatiosFuente) {
    errores.push(<ErrorCompatibilidadVatios vatiosFuente={vatiosFuente} vatiosActuales={vatiosNecesarios.reduce((total, valor) => total + Number(valor), 0)} ></ErrorCompatibilidadVatios>)
  }
  if (estructuraPlacaBase != null && estructuraTorre != null && estructuraPlacaBase != estructuraTorre) {
    errores.push(<ErrorCompatibilidadEstructura estructuraPlaca={estructuraPlacaBase} estructuraTorre={estructuraTorre}></ErrorCompatibilidadEstructura>)
  }
  if ((capacidadVentilacion + capacidadVentilacion2) <= 50) {
    errores.push(<ErrorCompatibilidadVentilacion ventilacion={capacidadVentilacion + capacidadVentilacion2}></ErrorCompatibilidadVentilacion>)
  }
  if (alturaCooler != null && profundidadTorre != null && profundidadTorre < alturaCooler) {
    errores.push(<ErrorCompatibilidadCooler alturaCooler={alturaCooler} profundidadTorre={profundidadTorre}></ErrorCompatibilidadCooler>)
  }
  if (sessionStorage.puntuacion_grafica_tarjeta && benchmarkTarjeta < sessionStorage.puntuacion_grafica_tarjeta) {
    errores.push(<ErrorCompatibilidadGraficosTarjeta puntuacion={benchmarkTarjeta}></ErrorCompatibilidadGraficosTarjeta>)
  }


  visualzacion.push(<ComponenteConfigurador indice={0} nombre={"Procesador"} setSocket={setsocketProcesador} tabla={"procesador"} seleccionado={componentes[0]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={1} nombre={"Placa base"} setEstructura={setEstructuraPlacaBase} setSocket={setsocketPlacaBase} tabla={"placa_base"} seleccionado={componentes[1]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={7} nombre={"Tarjeta grafica"} setBenchmarkTarjeta={setBenchmarkTarjeta} tabla={"tarjeta_grafica"} seleccionado={componentes[7]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  console.log(sessionStorage)
  visualzacion.push(<ComponenteConfigurador indice={2} setVatiosMaximo={setvatiosFuente} nombre={"Fuente alimentacion"} tabla={"fuente_alimentacion"} seleccionado={componentes[2]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={3} nombre={"RAM"} tabla={"ram"} seleccionado={componentes[3]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={4} nombre={"Regrigeracion líquida"} setCapacidadVentilacion={setCapacidadVentilacion} tabla={"refrigeracion_liquida"} seleccionado={componentes[4]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={5} nombre={"Torre"} setProfundidadTorre={setProfundidadTorre} setEstructura={setestructuraTorre} tabla={"torre"} seleccionado={componentes[5]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={6} nombre={"Disco duro"} tabla={"disco_duro"} seleccionado={componentes[6]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={8} setAlturaCooler={setAlturaCooler} nombre={"Cooler procesador"} tabla={"cooler_procesador"} seleccionado={componentes[8]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={9} nombre={"Sistema Operativo"} tabla={"sistema_operativo"} seleccionado={componentes[9]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)
  visualzacion.push(<ComponenteConfigurador indice={10} nombre={"Ventilador"} setCapacidadVentilacion2={setCapacidadVentilacion2} tabla={"ventilador"} seleccionado={componentes[10]} setSeleccionado={(a, b) => cambiarSeleccionado(a, b)} cambiarPrecioTotal={(a, b, c, d) => cambiarPrecioTotal(a, b, c, d)}></ComponenteConfigurador>)

  return (<div>
    {(!cargando) ? <div id="configurador"><div id="componentes">{visualzacion}</div><div id="errores"><div id="precio_total"><h4>Precio total</h4><span>{precioTotal}€</span></div>
      {(sessionStorage.usuario && !sessionStorage.equipo_editar) ? <div id="wrapper_save"><Button id="guardarConfiguracion" onClick={() => guardarConfiguracion()}>Guardar</Button></div> : ""}
      {(sessionStorage.usuario && sessionStorage.equipo_editar) ? <div id="wrapper_save"><Button id="editarConfiguracion" onClick={() => editarConfiguracion()}>Editaar</Button></div> : ""}
      {errores}</div></div> :
      <div class="spinner"><Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner></div>}
  </div>
  )
}
