

import { DIR_SERV } from "../variables";

import { DIR_PUBLIC } from "../variables";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "reactstrap";
import '../style_components/EleccionVideojuegos.css';
export function EleccionVideojuegos(props) {
  const [render, setRender] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected_games, setSelected_games] = useState([]);
  const [selected_games_colors, setSelected_games_colors] = useState([]);
  localStorage.setItem("puntuacion_grafica",null);
  function volver(){
    localStorage.visualizacion="inicial";
    props.setVisualizacion("inicial");
    localStorage.removeItem("tipo_configuracion");
  }
  function select_game(number,puntuacion_procesador,puntuacion_grafica){
    let games_aux=selected_games;
    let color_aux=selected_games_colors;
    if(games_aux[number].length==0){
      games_aux[number]=[puntuacion_procesador,puntuacion_grafica];
      setSelected_games(games_aux);
      color_aux[number]="selected_game";
      setSelected_games_colors(color_aux);
    }else{
      games_aux[number]=[];
      setSelected_games(games_aux);
      color_aux[number]="not_selected_game";
      setSelected_games_colors(color_aux);
    }
    console.log(selected_games_colors)
  }
  useEffect(() => {
    axios.get(DIR_SERV + '/catalogo_videojuegos')
      .then(response => {
        let selected_aux=selected_games;
        let color_games=selected_games_colors;
        if(selected_games!=[]){
          for (let index = 0; index < response.data.videojuegos.length; index++) {
            selected_aux[index]=[];
            color_games[index]="not_selected_game";
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return render.length > 0 ? <div><Button onClick={()=>props.seguridad(volver) }>Volver</Button><div id="catalogo_videojuegos">{
    render.map((element,index) => {
      return <div key={element.id_videojuego} className={"videojuego "+selected_games_colors[index]}  onClick={()=>select_game(index,element.requerimiento_grafico_procesador,element.requerimiento_grafico_tarjeta_grafica)}>
        <label htmlFor={element.id_videojuego}>
          <div className="img_container"><img src={DIR_PUBLIC+"/public/assets/"+element.caratula_videojuego} alt={element.nombre_videojuego} /></div>
          <h3>{element.nombre_videojuego}</h3>
        </label>
      </div>
    
    })
    }</div></div> : <p>No items found</p>;
}

export default EleccionVideojuegos;

