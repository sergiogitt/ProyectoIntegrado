import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import {Configurador} from './components/Configurador.js';
import {EleccionConfiguracion} from './components/EleccionConfiguracion';
import {EleccionVideojuegos} from './components/EleccionVideojuegos';
function App() {
  const [accion,setAccion]=useState();
  function changeActualAction(newAction){
    setAccion(newAction);
    console.log(newAction);
  }
  let actualVisualitation=[];
  switch(accion){
    case "configurarPC":
      actualVisualitation.push(<Configurador changeActualAction={(a)=>changeActualAction(a)} accion={accion}></Configurador>);
      break;
    case "elegirJuegos":
    actualVisualitation.push(<EleccionVideojuegos changeActualAction={(a)=>changeActualAction(a)}></EleccionVideojuegos>);
    break;
    default:
      actualVisualitation.push( <EleccionConfiguracion changeActualAction={(a)=>changeActualAction(a)}></EleccionConfiguracion>);
      break;
  }
  return (
    <div>
      <Cabecera></Cabecera>
      {actualVisualitation}
     
    </div>
  );
}





function Cabecera(){
return(<header>
  <h1>My App</h1>
  <nav>
    <ul>
      <li><a href="#">Registrate</a></li>
      <li><a href="#">Login</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
</header>)
}

export default App;
