import { Link, useNavigate } from 'react-router-dom';
import { Card, CardSubtitle, CardGroup, CardImg, CardBody, CardText, Button, CardTitle } from 'reactstrap';
import SeleccionPresupuesto from './SeleccionPresupuesto';
import { useEffect, useState } from 'react';
import { EleccionVideojuegos } from './EleccionVideojuegos';
import '../style_components/EleccionConfiguracion.css';
import { Configurador } from './Configurador';
import { DIR_PUBLIC, DIR_SERV } from '../variables';
import axios from "axios";
import EquipoUsuario from './EquipoUsuario';
export function EleccionConfiguracion(props) {

  const navigate = useNavigate();
  let render = [];
  const [tipo_configuracion, setTipo_configuracion] = useState(null);
  const [presupuesto, setPresupuesto] = useState(null);
  const [visualizacion, setVisualizacion] = useState(null);
  const [puntuacion_grafica, setPuntuacion_grafica] = useState(0);
  const [Equipos, setEquipos] = useState([]);
  const [cargando, setCargando] = useState(false);
  function local_storage_tipo_configuracion(funcion, valor) {

    sessionStorage.setItem("tipo_configuracion", valor);
    console.log("cambiado a " + valor)
    funcion(valor)

  }
 
  useEffect(() => {
    console.log(sessionStorage)

    // get the data from sessionStorage when the component mounts
    if (!sessionStorage.visualizacion) {
      sessionStorage.setItem("visualizacion", "inicial");
    }

    setVisualizacion(sessionStorage.visualizacion);
  }, []);
  function change_local_storage(new_view) {
    sessionStorage.visualizacion = new_view;
    setVisualizacion(new_view)
  }
  function mostrarEquipos(){
    console.log("cargando equipos")
    axios.post(DIR_SERV + "/equipos", {
      api_session:sessionStorage.api_session,     
    })
      .then(response => {
        let equiposAux=[];
        if( response.data.equipos.length>0){
          
          response.data.equipos.forEach((element,index) => {
            let id=element.id_equipo;
            equiposAux.push(
            <EquipoUsuario setEquipos={(a)=>setEquipos(a)} nombre={"Equipo "+(index+1)} data={element} setVisualizacion={(a) => setVisualizacion(a)} seguridad={(a) => props.seguridad(a)}></EquipoUsuario>
            );
          });
        }else{
          equiposAux.push(<p>No hay ningún equipo guardado.</p>)
        }
       
        setEquipos(equiposAux)
        setCargando(false)
      })
      .catch(error => {
        console.log(error);
      });
  }
  switch (sessionStorage.visualizacion) {
    case "inicial":
      render.push(<div><h2>Tipo de configuración</h2><p class="black">Elige de entre las siguientes opciones el tipo de configuracion que mas se adapte a tus necesidades</p><div id="tipos_configuraciones">
        <div class="configuracion">


          <h3>Ofimatica</h3><div>
            <p>Ordenador preparado para un uso cotidiano y tareas sencillas.</p>
            <p>Esta orientado a personas que no necesitan mucho mas que un navegador y programas de edicion de texto.</p>
          </div>
          <button onClick={() => { props.seguridad(change_local_storage, "presupuesto"); local_storage_tipo_configuracion(setTipo_configuracion, "multimedia") }}>
            Elegir
          </button>

        </div>
        <div class="configuracion">

          <h3>Diseño</h3>

          <p>Adecuado para profesionales creativos como diseñadores gráficos, arquitectos, ingenieros de diseño, artistas digitales y cualquier persona involucrada en la creación visual o de productos que requiera potencia de procesamiento, capacidad gráfica y software especializado.</p>
          <button onClick={() => { props.seguridad(change_local_storage, "presupuesto"); local_storage_tipo_configuracion(setTipo_configuracion, "disenyo") }}>
            Elegir
          </button>




        </div>
        <div class="configuracion">
          <h3>Gaming</h3>
          <div>
            <p> Ideal para entusiastas de los videojuegos y jugadores ávidos que buscan disfrutar de una experiencia de juego fluida y de alto rendimiento.</p>
            <p>Está preparado con los componentes necesarios para jugar a los titulos que elijas y obtener una configuracion optimizada para esos titulos.</p>

          </div>
          <button onClick={() => { props.seguridad(change_local_storage, "catalogo_videojuegos"); local_storage_tipo_configuracion(setTipo_configuracion, "gaming") }}>
            Elegir
          </button>

        </div>
      </div></div>);
      break;
    case "presupuesto":
      render.push(<SeleccionPresupuesto setVisualizacion={(a) => setVisualizacion(a)} seguridad={(a) => props.seguridad(a)}></SeleccionPresupuesto>);
      break;
    case "configurador":
      render.push(<Configurador setEquipos={setEquipos} setVisualizacion={(a) => setVisualizacion(a)} seguridad={(a) => props.seguridad(a)}></Configurador>);
      break;
    case "catalogo_videojuegos":
      render.push(<EleccionVideojuegos setVisualizacion={(a) => setVisualizacion(a)} seguridad={(a) => props.seguridad(a)} setPuntuacion_grafica={setPuntuacion_grafica}></EleccionVideojuegos>);
      break;
  }
  if(sessionStorage.tipo=="normal"&&Equipos.length==0&&!sessionStorage.editar_equipo){
    mostrarEquipos()
  }
  
    
  
  return (

    <div>

      {render}
      {(sessionStorage.tipo === "normal"&&sessionStorage.visualizacion=="inicial") ? (
  <>
    <h2>Mis configuraciones guardadas</h2>
    {(cargando) ? "" : <div id="equipos_usuario">{Equipos}</div>}
  </>
) : ""}

    </div>

  );
}
export default EleccionConfiguracion;