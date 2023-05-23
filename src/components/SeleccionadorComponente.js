
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
          console.log("first open")
            getMoreComponents();
            props.handleOpen();
        }

    }, []);
    function getMoreComponents(event=null) {
        setCargando(true);
        let off=props.offset;
        if(document.getElementById("buscador").value!=""){
         off=0;
         props.setOffset(0)
        }
        if(event&&event.target.value==""){
          off=0;
          props.setOffset(0)
        }
        axios.post(DIR_SERV + '/componente/' + props.tabla, {
            offset: off,
            buscador:document.getElementById("buscador").value
        })
            .then(response => {
             
                let listaComponentesAux = [...props.listaComponentes];
                let oldOffset = props.offset;
                if(document.getElementById("buscador").value!=""){
                  listaComponentesAux=[];
                }
                if(event&&event.target.value==""){
                  listaComponentesAux=[];
                  
                }
                response.data.elements.forEach(element => {
                    listaComponentesAux.push(<DevicesFromComponent componenteSeleccionado={props.componenteSeleccionado} cambiarSeleccionado={(a) => props.cambiarSeleccionado(a)} data={element} tabla={props.tabla}></DevicesFromComponent>);
                });
                if (!response.data.hasMoreRows) {
                    props.setShowMoreDataButton(false)
                    console.log(props.showMoreDataButton)
                }else{
                  props.setShowMoreDataButton(true)
                }
               
                props.setListaComponentes(listaComponentesAux);
               
                oldOffset += 3;
                if(event&&event.target.value==""){
oldOffset=3;                  
                }
                props.setOffset(oldOffset);
                setCargando(false);


            })
            .catch(error => {
                console.log(error);
            });
    }
    console.log(props.offset)
    function componenteBusqueda(){
      let off=props.offset;
        if(document.getElementById("buscador").value!=""){
         off=0;
         props.handleOpen();
         props.setListaComponentes([])
        }
    }
    function showDevices(event) {
        props.setCriterioBusqueda(event.target.value);

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
              placeholder="Introduce un criterio de búsqueda" id="buscador"
              onChange={(event) => {props.setOffset(0);handleInput(event);props.setListaComponentes([]);getMoreComponents(event)}}
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