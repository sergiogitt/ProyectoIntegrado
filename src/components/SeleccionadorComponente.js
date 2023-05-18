
import { Button, Input } from "reactstrap";
import '../style_components/SeleccionadorComponente.css';
import { useEffect, useState } from "react";
import DevicesFromComponent from "./DevicesFromComponent";
import { DIR_SERV } from "../variables";
import axios from "axios";
export function SeleccionadorComponente(props) {
    const [criterioBusqueda, setCriterioBusqueda] = useState("");

    const [offset, setOffset] = useState(0);

    useEffect(() => {

        // get the data from localStorage when the component mounts
        if (props.firstOpen) {
            axios.post(DIR_SERV + '/' + props.tabla, {
                offset: offset
            })
                .then(response => {

                    let listaComponentesAux = [...props.listaComponentes];

                    response.data.elements.forEach(element => {
                        listaComponentesAux.push(<DevicesFromComponent data={element}></DevicesFromComponent>);
                    });

                    props.setListaComponentes(listaComponentesAux);
                    



                })
                .catch(error => {
                    console.log(error);
                });
                props.handleOpen();
        }

    }, []);
    function showDevices(event) {
        setCriterioBusqueda(event.target.value);

    }
    return (<div class="seleccionador_compoentne"><div><Input placeholder="Introduce un criterio de busqueda" onChange={(event) => showDevices(event)}></Input></div>{(props.listaComponentes == []) ? "Cargando" : props.listaComponentes}</div>);
}
export default SeleccionadorComponente;