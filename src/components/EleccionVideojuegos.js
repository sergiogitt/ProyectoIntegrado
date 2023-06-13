

import { DIR_SERV } from "../variables";

import { DIR_PUBLIC } from "../variables";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Spinner } from "reactstrap";
import '../style_components/EleccionVideojuegos.css';
export function EleccionVideojuegos(props) {
  const [render, setRender] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrar_boton, setMostrar_boton] = useState(<Button disabled>Continuar</Button>);
  const [selected_games, setSelected_games] = useState([]);
  const [selected_games_colors, setSelected_games_colors] = useState([]);
  sessionStorage.setItem("puntuacion_grafica_tarjeta", 0);
  sessionStorage.setItem("puntuacion_grafica_procesador", 0);
  function useForceUpdate() {
    let [value, setState] = useState(true);
    return () => setState(!value);
  }
  let forceUpdate = useForceUpdate();
  function change_continue_button() {
    let cambiar_boton = false;
    selected_games_colors.map((element) => {
      if (element == "selected_game") {
        cambiar_boton = true;
      }

    })
    if (cambiar_boton) {
      setMostrar_boton(<Button onClick={() => selectPuntuacionGrafica()}>Continuar</Button>)

    } else {
      setMostrar_boton(<Button disabled>Continuar</Button>)
    }
  }
  function selectPuntuacionGrafica() {
    console.log("dentro")
    selected_games.map(e => {
      console.log(e)
      if (e[0] > sessionStorage.puntuacion_grafica_procesador||e[1] > sessionStorage.puntuacion_grafica_tarjeta) {
        sessionStorage.puntuacion_grafica_procesador = e[0];
        sessionStorage.puntuacion_grafica_tarjeta = e[1];
        
      }
    })
    sessionStorage.visualizacion="configurador";
    props.setVisualizacion("configurador");
  }

  function select_game(number, puntuacion_procesador, puntuacion_grafica) {

    let games_aux = selected_games;
    let color_aux = selected_games_colors;
    if (games_aux[number].length == 0) {
      games_aux[number] = [puntuacion_procesador, puntuacion_grafica];
      setSelected_games(games_aux);
      color_aux[number] = "selected_game";
      setSelected_games_colors(color_aux);
      forceUpdate()
    } else {
      games_aux[number] = [];
      setSelected_games(games_aux);
      color_aux[number] = "not_selected_game";
      setSelected_games_colors(color_aux);
      forceUpdate()
    }
    console.log(selected_games_colors)
    change_continue_button();
  }
  useEffect(() => {
    axios.get(DIR_SERV + '/catalogo_videojuegos')
      .then(response => {
        let selected_aux = selected_games;
        let color_games = selected_games_colors;
        if (selected_games != []) {
          for (let index = 0; index < response.data.videojuegos.length; index++) {
            selected_aux[index] = [];
            color_games[index] = "not_selected_game";
          }
          setSelected_games(selected_aux);
          setSelected_games_colors(color_games);
          console.log(selected_games)
        }

        const items = response.data.videojuegos;
        setRender(items);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div class="spinner"><Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner></div>;
  }

  if (error) {
    return <p>{error}</p>; <Button disabled={mostrar_boton ? true : false}>Continuar</Button>

  }
  return render.length > 0 ? <div>{mostrar_boton}<div id="catalogo_videojuegos">{
    render.map((element, index) => {
      return <div key={element.id_videojuego} className={"videojuego " + selected_games_colors[index]} onClick={() => select_game(index, element.requerimiento_grafico_procesador, element.requerimiento_grafico_tarjeta_grafica)}>
        <label htmlFor={element.id_videojuego}>
          <div className="img_container"><img src={DIR_PUBLIC + "/public/assets/" + element.caratula_videojuego} alt={element.nombre_videojuego} /></div>
          <h3>{element.nombre_videojuego}</h3>
        </label>
      </div>

    })
  }</div></div> : <p>No items found</p>;
}

export default EleccionVideojuegos;

