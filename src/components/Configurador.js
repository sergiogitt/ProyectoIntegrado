import ComponenteConfigurador from './ComponenteConfigurador';
import {SeleccionPresupuesto} from './SeleccionPresupuesto';
import { useEffect, useState } from 'react';

export function Configurador(props){
    const [presupuesto,setPresupuesto]=useState(null);
    useEffect(() => {
      console.log(localStorage)
  
      // get the data from localStorage when the component mounts
      if (!localStorage.visualizacion) {
        localStorage.setItem("visualizacion", "configurador");
      }
  
      props.setVisualizacion(localStorage.visualizacion);
    }, []);

    function changePresupuesto(newPresupuesto){
      setPresupuesto(newPresupuesto)
      console.log(newPresupuesto)
    }
    let visualzacion=[];
    /*visualzacion.push(<h1>Configurador</h1>)
    visualzacion.push(<ComponenteConfigurador nombre={"Procesador"} tabla={pro}></ComponenteConfigurador>)
    visualzacion.push(<ComponenteConfigurador nombre={"Placa base"} ></ComponenteConfigurador>)
    visualzacion.push(<ComponenteConfigurador nombre={"Tarjeta grafica"} ></ComponenteConfigurador>)
    visualzacion.push(<ComponenteConfigurador nombre={"Disco duro"} ></ComponenteConfigurador>)*/
    visualzacion.push(<ComponenteConfigurador nombre={"Cooler"} tabla={"cooler_procesador"}></ComponenteConfigurador>)

    
    return(<div>
      {visualzacion}
    </div>
    )
  }
