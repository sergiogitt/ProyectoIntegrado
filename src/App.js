import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';
import {Configurador} from './components/Configurador.js';
import {EleccionConfiguracion} from './components/EleccionConfiguracion';
import {EleccionVideojuegos} from './components/EleccionVideojuegos';
import {Cabecera} from './components/Cabecera';
import {Login} from './components/Login';
import {FormularioRegistro} from './components/FormularioRegistro';
import {FormularioRegistroEmpresa} from './components/FormularioRegistroEmpresa';
import { Route,BrowserRouter,Routes} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import md5 from 'md5';
function App() {
  console.log(localStorage)
  const [visualizacion,setVisualizacion]=useState("inicial");
  const [accion,setAccion]=useState(null);
  const [logued,setLogued]=useState(false);
  const [usuario,setUsuario]=useState(null);
  const [clave,setClave]=useState(null);
  const [tipo,setTipo]=useState(null);
  const [api_session,setApi_session]=useState(null);
  const [mensaje_error,setMensaje_error]=useState(null);
  const navigate = useNavigate();
  const DIR_SERV="http://localhost/ProyectoIntegrado/backend/index.php";
  const TIEMPO_SESION_MINUTOS=10;
  useEffect(() => {
    // get the data from localStorage when the component mounts
    
    if (localStorage) {
      setLogued(true);
    }
  }, []);
  function changeActualAction(direccion){
    navigate(direccion);
    
  }
  function salir(){
    setLogued(false);
    localStorage.clear();
    console.log(localStorage);
    setVisualizacion('inicial');
  }
  function seguridad(funcion,params){
    if(localStorage.usuario){
      if(((new Date()/1000)-localStorage.ultima_accion)<TIEMPO_SESION_MINUTOS*60){
        axios.post(DIR_SERV+"/logueado",{
            "api_session":localStorage.api_session,
            usuario:localStorage.usuario,
            clave:localStorage.clave,
        })
        .then(data=>{
          
            if(data.data.usuario){
                localStorage.ultima_accion=new Date()/1000;
                funcion(params)
            }else if(data.data.no_login){
                navigate("/login");
                setMensaje_error("Usted ha sido expulsado de nuestro sistema.");
                localStorage.clear();
            }else if(data.data.mensaje_error){
                localStorage.clear();
                setMensaje_error(data.data.mensaje_error);
            }else{
                setMensaje_error("Usted ya no se encuentra registrado en las BD");
                localStorage.clear();
                navigate("/login");
            }
        })
        .catch(error=>{
          console.log(error);

        });
      }
      else
      {
        localStorage.clear();
        navigate("/login");
        setMensaje_error("Su tiempo de sesión ha expirado");
        
      }
    }else{
      funcion(params);
    }
    

  
  }

  
  return (
    <div>
        <Cabecera changeActualAction={changeActualAction} tipo_usuario={usuario} salir={salir} setVisualizacion={setVisualizacion}></Cabecera>
      
        <Routes>
          <Route path='/' exact element={<EleccionConfiguracion seguridad={seguridad} visualizacion={visualizacion}  setVisualizacion={setVisualizacion}/>}/>
          
          <Route path='/login' exact element={<Login  log_user={setLogued} mensaje_error={mensaje_error} setError={setMensaje_error}/>}/>
        
        </Routes>
    
     
    </div>
  );
}







export default App;
