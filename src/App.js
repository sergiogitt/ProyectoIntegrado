import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import {Configurador} from './components/Configurador.js';
import {EleccionConfiguracion} from './components/EleccionConfiguracion';
import {EleccionVideojuegos} from './components/EleccionVideojuegos';
import {Cabecera} from './components/Cabecera';
import {FormularioRegistro} from './components/FormularioRegistro';
function App() {
  const [accion,setAccion]=useState(null);
  const [logued,setLogued]=useState(null);
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
    case "registrarse":
    actualVisualitation.push(<FormularioRegistro changeActualAction={(a)=>changeActualAction(a)}></FormularioRegistro>);
    break;
    case "registrarempresa":
      actualVisualitation.push(<FormularioRegistroEmpresa changeActualAction={(a)=>changeActualAction(a)}></FormularioRegistroEmpresa>);
      break;
    default:
      actualVisualitation.push( <EleccionConfiguracion changeActualAction={(a)=>changeActualAction(a)}></EleccionConfiguracion>);
      break;
  }
  return (
    <div>
      <Cabecera changeActualAction={changeActualAction}></Cabecera>
      {actualVisualitation}
     
    </div>
  );
}







export default App;
