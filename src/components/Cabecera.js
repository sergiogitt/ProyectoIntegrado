import { useNavigate } from "react-router-dom";

export function Cabecera(props){
  let render=[];
  const navigate = useNavigate();
  function volver_a_inicio(){
    navigate("/");
    localStorage.removeItem("presupuesto");
    localStorage.removeItem("tipo_configuracion");
    props.setVisualizacion(null);
  }
    if(localStorage.tipo=="empresa"){
      render.push(<ul>
         <li onClick={()=>props.seguridad(navigate,"/perfil")}><a >Perfil</a></li>
        <li onClick={()=>props.seguridad(navigate,"/nuevo_componente")}><a >Subir nuevo componente</a></li>
        <li onClick={()=>props.salir()}><a >Salir</a></li>
        
        
      </ul>);
    }else if(localStorage.tipo=="normal"){
      render.push(<ul>
        <li onClick={()=>props.seguridad(navigate,"/perfil")}><a >Perfil</a></li>
        <li onClick={()=>props.seguridad(navigate,"/configuraciones_guardadas")}><a >Mis configuraciones</a></li>
        <li onClick={()=>props.salir()}><a >Salir</a></li>
      </ul>);
    }else{
      render.push(<ul>
       <li onClick={()=>navigate("/registro")}><a >Registrate</a></li>
        <li onClick={()=>navigate("/login")}><a >Iniciar sesión</a></li>
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