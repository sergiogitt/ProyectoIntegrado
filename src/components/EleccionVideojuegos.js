

import { DIR_SERV } from "../variables";

import { DIR_PUBLIC } from "../variables";
import { useState, useEffect } from 'react';
import axios from 'axios';

export function EleccionVideojuegos(props) {
  const [render, setRender] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(DIR_SERV + '/catalogo_videojuegos')
      .then(response => {
        const items = response.data.videojuegos.map(element => (
          <div key={element.id_videojuego} className="videojuego videojuego_no_seleccionado">
            <input type="checkbox" id={element.id_videojuego} hidden />
            <input type="hidden" id={"requerimiento"+element.id_videojuego} />
            <label htmlFor={element.id_videojuego}>
              <div className="img_container"><img src={DIR_PUBLIC+"/public/assets/"+element.caratula_videojuego} alt={element.nombre_videojuego} /></div>
              <h3>{element.nombre_videojuego}</h3>
            </label>
          </div>
        ));
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

  return render.length > 0 ? <div id="catalogo_videojuegos">{render}</div> : <p>No items found</p>;
}

export default EleccionVideojuegos;

