import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import {Configurador} from './components/Configurador.js';
import {EleccionConfiguracion} from './components/EleccionConfiguracion';
import {EleccionVideojuegos} from './components/EleccionVideojuegos';
import {Cabecera} from './components/Cabecera';
import {Login} from './components/Login';
import {FormularioRegistro} from './components/FormularioRegistro';
import {FormularioRegistroEmpresa} from './components/FormularioRegistroEmpresa';
import { Route,BrowserRouter,Routes} from "react-router-dom";
import { useNavigate } from "react-router-dom";
function App() {
  const [accion,setAccion]=useState(null);
  const [logued,setLogued]=useState(null);
  const navigate = useNavigate();

  function changeActualAction(direccion){
    navigate(direccion);
    
  }
  function prueba(direccion){
console.log()    
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
      
        <Routes>
          <Route path='/' exact element={<EleccionConfiguracion changeActualAction={(a)=>prueba(a)}/>}/>
          <Route path='/catalogo' exact element={<EleccionVideojuegos changeActualAction={(a)=>prueba(a)}/>}/>
          <Route path='/iniciar_sesion' exact element={<Login changeActualAction={(a)=>prueba(a)}/>}/>
        
        </Routes>
    
     
    </div>
  );
}







export default App;
