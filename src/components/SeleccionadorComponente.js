
import { Button, Input } from "reactstrap";
import '../style_components/SeleccionadorComponente.css';
import { useEffect, useState } from "react";
import DevicesFromComponent from "./DevicesFromComponent";
import { DIR_SERV } from "../variables";
import axios from "axios";
export function SeleccionadorComponente(props) {
    
   
    const [componenteSeleccionado, setComponenteSeleccionado] = useState(null);
    function cambiarSeleccionado(id){
        console.log(id)
        setComponenteSeleccionado(id)
        console.log(componenteSeleccionado)
    }
    useEffect(() => {
        if (props.firstOpen) {
            
                getMoreComponents();
                props.handleOpen();
        }

    }, []);
    function getMoreComponents(){
        axios.post(DIR_SERV + '/' + props.tabla, {
            offset: props.offset
        })
            .then(response => {

                let listaComponentesAux = [...props.listaComponentes];
               
                response.data.elements.forEach(element => {
                    listaComponentesAux.push(<DevicesFromComponent componenteSeleccionado={componenteSeleccionado} cambiarSeleccionado={(a)=>cambiarSeleccionado(a)} data={element} tabla={props.tabla}></DevicesFromComponent>);
                });
                if(!response.data.hasMoreRows){
                    props.setShowMoreDataButton(false)
                    console.log(props.showMoreDataButton)
                }
               
                props.setListaComponentes(listaComponentesAux);
                let oldOffset=props.offset;
                oldOffset+=3;
                props.setOffset(oldOffset);
                


            })
            .catch(error => {
                console.log(error);
            });
    }
    function showDevices(event) {
        props.setCriterioBusqueda(event.target.value);

    }
    return (<div class="seleccionador_compoentne"><div><Input placeholder="Introduce un criterio de busqueda" onChange={(event) => showDevices(event)}></Input></div>{(props.listaComponentes == []) ? "Cargando" : props.listaComponentes}
    {(props.showMoreDataButton)?<button onClick={()=>getMoreComponents()}>Cargar mas</button>:<></>}
    </div>);
}
export default SeleccionadorComponente;