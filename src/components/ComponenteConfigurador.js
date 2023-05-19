import { useState } from "react";
import {DevicesFromComponent} from './DevicesFromComponent';
import '../style_components/ComponenteConfigurador.css';
import { SeleccionadorComponente } from "./SeleccionadorComponente";
function ComponenteConfigurador(props){
    const [open,setOpen]=useState(false);
    const [listaComponentes, setListaComponentes] = useState([]);
    const [showMoreDataButton, setShowMoreDataButton] = useState(true);
    const [criterioBusqueda, setCriterioBusqueda] = useState("");
    const [offset, setOffset] = useState(0);
    const [firstOpen, setFirstOpen] = useState(true);
    const [componenteSeleccionado, setComponenteSeleccionado] = useState(null);
    function handleOpen(){
        if(firstOpen){
            setFirstOpen(false);
        }
    }
    function cambiarSeleccionado(id) {
        console.log(id)
        setComponenteSeleccionado(id)
        console.log(componenteSeleccionado)
    }
    let renderObj=[];
    renderObj.push(<div  onClick={()=>setOpen(!open)} class="interaccion_componente"><span>{props.nombre}</span><span class="icon">{(!open)?"+":"-"}</span></div>)
    if(open){
        renderObj.push(<><SeleccionadorComponente componenteSeleccionado={componenteSeleccionado} cambiarSeleccionado={(a)=>cambiarSeleccionado(a)} offset={offset} setOffset={setOffset} showMoreDataButton={showMoreDataButton} setCriterioBusqueda={setCriterioBusqueda} setShowMoreDataButton={setShowMoreDataButton} listaComponentes={listaComponentes} firstOpen={firstOpen} handleOpen={handleOpen} setListaComponentes={setListaComponentes} tabla={props.tabla} ></SeleccionadorComponente>

        </>)

    }

    return(<div class="component_wrapper">{renderObj}</div>)
}
export default ComponenteConfigurador;