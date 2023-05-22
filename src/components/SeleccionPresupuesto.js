import { Button,Input} from "reactstrap";
import { useState } from 'react';
import '../style_components/SeleccionPresupuesto.css';
export function SeleccionPresupuesto(props){
    const [presupuestoAux,setPresupuestoAux]=useState(null);
    const [mensajeError,setMensajeError]=useState(null);
    sessionStorage.setItem("presupuesto",0);
    function changePresupuestoAux(newPresupuesto){
      setPresupuestoAux(newPresupuesto)
     
    }
    function handleNewPresupuesto(){
      if(!presupuestoAux||presupuestoAux==""){
        setMensajeError("Por favor, rellene el campo.");
      }else if(presupuestoAux>0||presupuestoAux<=0){
        if(presupuestoAux>400&&presupuestoAux<4000){
          sessionStorage.visualizacion="configurador";
          sessionStorage.setItem("presupuesto",presupuestoAux);
          props.setVisualizacion("configurador");
          setMensajeError(null)
          console.log("presiono")
        }else{
          setMensajeError("Por favor, introduzca un presupuesto coherente.");
        }      
      }else{
        setMensajeError("Por favor, introduzca valor numérico que se corresponda con su presupuesto inicial.")
      }
      
     
    }
    let render=[];
    render.push( <>
    <Input id="input" onChange={(event)=>changePresupuestoAux(event.target.value)}  invalid={mensajeError !== ""&&mensajeError!=null}></Input>
    <button  onClick={()=>props.seguridad(handleNewPresupuesto)}>Continuar</button></>)
    if(mensajeError){
      render.push(<p class="error">{mensajeError}</p>);
    }
    return(<div id="presupuesto">
      <h1>Presupuesto</h1>
      <p>A continuación debe indicar el presupuesto con el que desea que se realice una configuraciñon inicial.</p><p> Tenga en cuenta que cada tipo de configuracion tiene unos topes con los que hacer dicho proceso.</p>
     {render}
    </div>)
  }
export default SeleccionPresupuesto;