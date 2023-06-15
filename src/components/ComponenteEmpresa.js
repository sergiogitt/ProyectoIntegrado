import { useNavigate } from "react-router-dom";
import '../style_components/Cabecera.css';
import { DIR_PUBLIC, DIR_SERV } from "../variables";
import { useEffect,useState } from "react";
import axios from "axios";
import { Spinner } from "reactstrap";
import '../style_components/ComponenteEmpresa.css';
export function ComponenteEmpresa(props){
    const navigate = useNavigate();
    let marca = "marca_" + props.tabla;
    let modelo = "modelo_" + props.tabla;
    let precio = "precio_" + props.tabla;
    let imagen = "imagen_" + props.tabla;
    let url = "url_" + props.tabla;
    let id = "id_" + props.tabla;
    function editar_componente(compoenente){
       
        sessionStorage.setItem("editarComponente",JSON.stringify(compoenente));
        sessionStorage.setItem("editarTabla",props.tabla);
        navigate("/editar_componente");
    }
    return(<div class="componente_empresa" id={props.tabla+"_"+props.data[id]}>
        <div class="device_image"><img src={(!props.data[imagen]) ? (DIR_PUBLIC + "/assets/" + "no-disponible.png") : (DIR_PUBLIC + "/assets/" + props.data[imagen])} alt="" title="" /></div>
        <div class="device_info">
            <div class="modelo_marca">
                <span class="negrita">{props.data[marca]}</span>
                <span class="negrita">{props.data[modelo]}</span>
            </div>
            <div class="precio_boton">
                <span>{props.data[precio]}€</span>
                <span>{(props.data[url])?(<a href={props.data[url]}>{props.data[url]}</a>):("URL sin asignar")}</span>
                <button onClick={() => props.seguridad(editar_componente,props.data)} class={(props.componenteSeleccionado == props.data[id]) ? "seleccionado" : " "}>Editar</button>
            </div>


        </div>

     
    </div>)
    }