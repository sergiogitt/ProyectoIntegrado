import { Link, useNavigate } from 'react-router-dom';
import { Card, CardSubtitle, CardGroup, CardImg, CardBody, CardText, Button, CardTitle } from 'reactstrap';
import SeleccionPresupuesto from './SeleccionPresupuesto';
import { useEffect, useState } from 'react';
import { EleccionVideojuegos } from './EleccionVideojuegos';
import '../style_components/EleccionConfiguracion.css';
import { Configurador } from './Configurador';
import { DIR_PUBLIC } from '../variables';
export function EleccionConfiguracion(props) {

  const navigate = useNavigate();
  let render = [];
  const [tipo_configuracion, setTipo_configuracion] = useState(null);
  const [presupuesto, setPresupuesto] = useState(null);
  const [visualizacion, setVisualizacion] = useState(null);
  const [puntuacion_grafica, setPuntuacion_grafica] = useState(0);
  function local_storage_tipo_configuracion(funcion, valor) {

    localStorage.setItem("tipo_configuracion", valor);
    console.log("cambiado a " + valor)
    funcion(valor)

  }

  useEffect(() => {
    console.log(localStorage)

    // get the data from localStorage when the component mounts
    if (!localStorage.visualizacion) {
      localStorage.setItem("visualizacion", "inicial");
    }

    setVisualizacion(localStorage.visualizacion);
  }, []);
  function change_local_storage(new_view) {
    console.log(new_view)
    localStorage.visualizacion = new_view;
    setVisualizacion(new_view)
  }
  switch (localStorage.visualizacion) {
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
      console.log("energto")
      render.push(<Configurador setVisualizacion={(a) => setVisualizacion(a)} seguridad={(a) => props.seguridad(a)}></Configurador>);
      break;
    case "catalogo_videojuegos":
      render.push(<EleccionVideojuegos setVisualizacion={(a) => setVisualizacion(a)} seguridad={(a) => props.seguridad(a)} setPuntuacion_grafica={setPuntuacion_grafica}></EleccionVideojuegos>);
      break;
  }
  return (

    <div>

      {render}


    </div>

  );
}
export default EleccionConfiguracion;