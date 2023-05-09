import { Button,Input} from "reactstrap";
import { useState } from 'react';
export function SeleccionPresupuesto(props){
    const [presupuestoAux,setPresupuestoAux]=useState(null);
    const [mensajeError,setMensajeError]=useState(null);
    localStorage.setItem("presupuesto",0);
    function changePresupuestoAux(newPresupuesto){
      setPresupuestoAux(newPresupuesto)
     
    }
    function handleNewPresupuesto(){
      if(!presupuestoAux||presupuestoAux==""){
        setMensajeError("Por favor, rellene el campo.");
      }else if(presupuestoAux>0||presupuestoAux<=0){
        if(presupuestoAux>400&&presupuestoAux<4000){
          localStorage.visualizacion="configurador";
          localStorage.setItem("presupuesto",presupuestoAux);
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
    render.push( <><p>Indica el presupuesto principal del que dispones y con el que se te hará una configuración inicial</p>
    <Input onChange={(event)=>changePresupuestoAux(event.target.value)}></Input>
    <Button color="primary" onClick={()=>props.seguridad(handleNewPresupuesto)}>Continuar</Button></>)
    if(mensajeError){
      render.push(<p class="presupuestoIncorrecto">{mensajeError}</p>);
    }
    return(<div class="presupuesto">
     {render}
    </div>)
  }
export default SeleccionPresupuesto;