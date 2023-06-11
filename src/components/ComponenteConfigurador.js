import { useState } from "react";
import { DevicesFromComponent } from './DevicesFromComponent';
import '../style_components/ComponenteConfigurador.css';
import { SeleccionadorComponente } from "./SeleccionadorComponente";
function ComponenteConfigurador(props) {
    const [open, setOpen] = useState(false);
    const [listaComponentes, setListaComponentes] = useState([]);
    const [showMoreDataButton, setShowMoreDataButton] = useState(true);
    const [criterioBusqueda, setCriterioBusqueda] = useState("");
    const [offset, setOffset] = useState(0);
    const [firstOpen, setFirstOpen] = useState(true);
    function handleOpen() {
        if (firstOpen) {
            setFirstOpen(false);
            
        }
    }
   
    let renderObj = [];
    renderObj.push(<div onClick={() => setOpen(!open)} class="interaccion_componente"><span>{props.nombre}</span><span class="icon">{(!open) ? "+" : "-"}</span></div>)
    if (props.seleccionado != null) {
        renderObj.push(<DevicesFromComponent indice={props.indice} cambiarPrecioTotal={(a,b)=>props.cambiarPrecioTotal(a,b)}  quitar={(a,b)=>props.setSeleccionado(a,b)} data={props.seleccionado} tabla={props.tabla} seleccionado={props.seleccionado} ></DevicesFromComponent>)
    }

    if (open) {
        renderObj.push(<SeleccionadorComponente indice={props.indice} cambiarPrecioTotal={(a,b)=>props.cambiarPrecioTotal(a,b)} seleccionado={props.seleccionado} cambiarSeleccionado={(a,b)=>props.setSeleccionado(a,b)} offset={offset} setOffset={setOffset} showMoreDataButton={showMoreDataButton} criterioBusqueda={criterioBusqueda} setCriterioBusqueda={setCriterioBusqueda} setShowMoreDataButton={setShowMoreDataButton} listaComponentes={listaComponentes} firstOpen={firstOpen} handleOpen={handleOpen} setListaComponentes={setListaComponentes} tabla={props.tabla} ></SeleccionadorComponente>

        )

    }


    return (<div class="component_wrapper">{renderObj}</div>)
}
export default ComponenteConfigurador;