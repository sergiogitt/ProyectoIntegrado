
import { Button, Input, Spinner } from "reactstrap";
import '../style_components/SeleccionadorComponente.css';
import { useEffect, useState } from "react";
import DevicesFromComponent from "./DevicesFromComponent";
import { DIR_SERV } from "../variables";
import axios from "axios";
import { render } from "react-dom";
import '../style_components/EquipoUsuario.css';
import { useNavigate } from "react-router-dom";

export function EquipoUsuario(props) {
    const [open, setOpen] = useState(false);
    const [listaComponentes, setListaComponentes] = useState([]);
    const [showMoreDataButton, setShowMoreDataButton] = useState(true);
    const [criterioBusqueda, setCriterioBusqueda] = useState("");
    const [offset, setOffset] = useState(0);
    const [firstOpen, setFirstOpen] = useState(true);

    const navigate = useNavigate();

    let renderObj = [];
    renderObj.push(<div onClick={() => setOpen(!open)} class="interaccion_componente nombre_equipo_usuario"><span>{props.nombre}</span><span class="icon">{(!open) ? "+" : "-"}</span></div>)
    function editarEquipo(id){
    
        props.setEquipos([])
        props.setVisualizacion("configurador");
        sessionStorage.visualizacion="configurador"; 
        sessionStorage.setItem("equipo_editar",id)
        navigate("/");
    }
    if (open) {

        renderObj.push(<div class="info_equipo">
            <div>
                <div>
                    <strong>Procesador:</strong> {(props.data.modelo_procesador == null) ? "Sin especificar" : props.data.modelo_procesador}
                </div>
                <div>
                    <strong>Placa base:</strong> {props.data.modelo_placa_base || "Sin especificar"}
                </div>
                <div>
                    <strong>Tarjeta Grafica:</strong> {props.data.modelo_tarjeta_grafica || "Sin especificar"}
                </div>
            </div>
            <div>
                <div>
                    <strong>Disco duro:</strong> {props.data.modelo_disco_duro || "Sin especificar"}
                </div>
                <div>
                    <strong>Refrigeracion líquida:</strong> {props.data.modelo_refrigeracion_liquida || "Sin especificar"}
                </div>
                <div>
                    <strong>RAM:</strong> {props.data.modelo_ram || "Sin especificar"}
                </div>
            </div>
            
                <Button className="editar_equipo" onClick={()=>editarEquipo(props.data.id_equipo)}>Editar{props.data.id_equipo}</Button>
            

        </div>)

    }


    return (<div class="component_wrapper nombre_equipo_usuario">{renderObj}</div>)
}
export default EquipoUsuario;