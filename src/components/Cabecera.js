import { useNavigate } from "react-router-dom";
import '../style_components/Cabecera.css';
import { DIR_PUBLIC } from "../variables";
export function Cabecera(props){
  let render=[];
  const navigate = useNavigate();
  function volver_a_inicio(){
    sessionStorage.visualizacion="inicial";
    sessionStorage.removeItem("presupuesto");
    sessionStorage.removeItem("tipo_configuracion");
    sessionStorage.removeItem("configurador");
    sessionStorage.removeItem("puntuacion_grafica_tarjeta");
    sessionStorage.removeItem("puntuacion_grafica_procesador");
    sessionStorage.removeItem("editar_componente");
    sessionStorage.removeItem("editarTabla");
    sessionStorage.removeItem("equipo_editar");
    if(sessionStorage.tipo=="normal"){
      navigate("/");
    }else{
      navigate("/mis_componentes");
    }
    
    

  }
  
    if(sessionStorage.tipo=="empresa"){
      render.push(<ul id="menu">
        
        <li onClick={()=>props.salir()}><a >Salir</a></li>
        
        
      </ul>);
    }else if(sessionStorage.tipo=="normal"){
      render.push(<ul id="menu">
       
        <li onClick={()=>props.salir()}><a >Salir</a></li>
      </ul>);
    }else{
      render.push(<ul id="menu">
       <li onClick={()=>navigate("/registro")}><a >Registrate</a></li>
        <li onClick={()=>navigate("/login")}><a >Iniciar sesión</a></li>
        <li onClick={()=>props.changeActualAction("registrarempresa")}><a >Promociona tu empresa</a></li>

      </ul>);
    }
    return(<header>
      <div id="logo" onClick={()=>props.seguridad(volver_a_inicio)}><img id="icono" src={DIR_PUBLIC+"/public/assets/drawing.svg"}/><img id="nombre_logo" src={DIR_PUBLIC+"/public/assets/letra-logo.svg"}/></div>
      <nav>
        {render}
      </nav>
    </header>)
    }