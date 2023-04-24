import { useNavigate } from "react-router-dom";

export function Cabecera(props){
  let render=[];
  const navigate = useNavigate();
  function volver_a_inicio(){
    navigate("/");
    localStorage.removeItem("presupuesto");
    localStorage.removeItem("tipo_configuracion");
    props.setVisualizacion('inicial');
  }
    if(localStorage.tipo=="empresa"){
      render.push(<ul>
         <li onClick={()=>props.changeActualAction("login")}><a >Perfil</a></li>
        <li onClick={()=>props.changeActualAction("registrarse")}><a >Subir nuevo componente</a></li>
        <li onClick={()=>props.salir()}><a >Salir</a></li>
        
        
      </ul>);
    }else if(localStorage.tipo=="normal"){
      render.push(<ul>
        <li onClick={()=>props.changeActualAction("registrarse")}><a >Perfil</a></li>
        <li onClick={()=>props.changeActualAction("login")}><a >Mis configuraciones</a></li>
        <li onClick={()=>props.salir()}><a >Salir</a></li>
      </ul>);
    }else{
      render.push(<ul>
       <li onClick={()=>props.changeActualAction("registrarse")}><a >Registrate</a></li>
        <li onClick={()=>props.changeActualAction("login")}><a >Iniciar sesión</a></li>
        <li onClick={()=>props.changeActualAction("registrarempresa")}><a >Promociona tu empresa</a></li>

      </ul>);
    }
    return(<header>
      <h1 onClick={()=>volver_a_inicio()}>My App</h1>
      <nav>
        {render}
      </nav>
    </header>)
    }