
import { Button, Input, Spinner } from "reactstrap";
import '../style_components/SeleccionadorComponente.css';
import { useEffect, useState } from "react";
import DevicesFromComponent from "./DevicesFromComponent";
import { DIR_SERV } from "../variables";
import axios from "axios";
export function SeleccionadorComponente(props) {
  const [cargando, setCargando] = useState(false);



  useEffect(() => {
    if (props.firstOpen) {
      getMoreComponents();
      props.handleOpen();
    }

  }, []);
  function getMoreComponents(event = null) {
    setCargando(true);
    let off = props.offset;
    let busqueda=document.getElementById("buscador_"+props.tabla).value;
    if (busqueda!=props.criterioBusqueda) {
      off = 0;
      props.setOffset(0)
    }
    if (event && event.target.value == "") {
      off = 0;
      props.setOffset(0)
    }
    axios.post(DIR_SERV + '/componente/' + props.tabla, {
      offset: off,
      buscador: busqueda
    })
      .then(response => {

        let listaComponentesAux = [...props.listaComponentes];
        let oldOffset = props.offset;
        if (busqueda!=props.criterioBusqueda ) {
          listaComponentesAux = [];
          props.setOffset(0);
          oldOffset=0;
        }
        if (event && event.target.value !=props.criterioBusqueda) {
          listaComponentesAux = [];

        }
        response.data.elements.forEach(element => {
          listaComponentesAux.push(<DevicesFromComponent setCapacidadVentilacion={props.setCapacidadVentilacion} setCapacidadVentilacion2={props.setCapacidadVentilacion2} setEstructura={props.setEstructura} setVatiosMaximo={props.setVatiosMaximo} setSocket={props.setSocket} indice={props.indice} cambiarPrecioTotal={(a,b)=>props.cambiarPrecioTotal(a,b)}  seleccionado={props.seleccionado} cambiarSeleccionado={(a,b)=>props.cambiarSeleccionado(a,b)} data={element} tabla={props.tabla}></DevicesFromComponent>);
        });
        if (!response.data.hasMoreRows) {
          props.setShowMoreDataButton(false)

        } else {
          props.setShowMoreDataButton(true)
        }

        props.setListaComponentes(listaComponentesAux);

        oldOffset += 3;
        if (event && event.target.value == "") {
          oldOffset = 3;
        }
        props.setOffset(oldOffset);
        setCargando(false);


      })
      .catch(error => {
        console.log(error);
      });
  }

  
  function handleInput(event) {
    const newValue = event.target.value;
    props.setCriterioBusqueda(newValue);
    console.log(props.criterioBusqueda)

  }
  return (
    <>
      <div className="seleccionador_componente">
        <div>
          <Input
            placeholder="Introduce un criterio de búsqueda" id={"buscador_"+props.tabla}
            onChange={(event) => {  handleInput(event); props.setListaComponentes([]); getMoreComponents(event) }}
          ></Input>
        </div>
        {props.listaComponentes === [] ? "Cargando" : props.listaComponentes}

      </div>
      <div class="cargar_mas">
        {props.showMoreDataButton ? (
          !cargando ? (
            <div onClick={() => getMoreComponents()} class="posicionamiento">
              <div class="linea abajo"></div>
              <div class="linea rotar"></div>
            </div>
          ) : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );

}
export default SeleccionadorComponente;