
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
    function getMoreComponents() {
        setCargando(true);
        axios.post(DIR_SERV + '/' + props.tabla, {
            offset: props.offset
        })
            .then(response => {

                let listaComponentesAux = [...props.listaComponentes];

                response.data.elements.forEach(element => {
                    listaComponentesAux.push(<DevicesFromComponent componenteSeleccionado={props.componenteSeleccionado} cambiarSeleccionado={(a) => props.cambiarSeleccionado(a)} data={element} tabla={props.tabla}></DevicesFromComponent>);
                });
                if (!response.data.hasMoreRows) {
                    props.setShowMoreDataButton(false)
                    console.log(props.showMoreDataButton)
                }

                props.setListaComponentes(listaComponentesAux);
                let oldOffset = props.offset;
                oldOffset += 3;
                props.setOffset(oldOffset);
                setCargando(false);


            })
            .catch(error => {
                console.log(error);
            });
    }
    function showDevices(event) {
        props.setCriterioBusqueda(event.target.value);

    }
    return (
        <>
        <div className="seleccionador_componente">
          <div>
            <Input
              placeholder="Introduce un criterio de búsqueda"
              onChange={(event) => showDevices(event)}
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
            // <button onClick={() => getMoreComponents()}>Cargar más</button>
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