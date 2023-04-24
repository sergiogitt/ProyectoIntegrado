import ComponenteConfigurador from './ComponenteConfigurador';
import {SeleccionPresupuesto} from './SeleccionPresupuesto';
import { useState } from 'react';

export function Configurador(props){
    const [presupuesto,setPresupuesto]=useState(null);
    function changePresupuesto(newPresupuesto){
      setPresupuesto(newPresupuesto)
      console.log(newPresupuesto)
    }
    let visualzacion=[];
    
    visualzacion.push(<ComponenteConfigurador nombre={"Procesador"} ></ComponenteConfigurador>)
    
    return(<div>
      {visualzacion}
    </div>
    )
  }
