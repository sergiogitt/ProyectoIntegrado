export function Cabecera(props){
  let render=[];
    if(!props.tipo_usuario){
      render.push(<ul>
        <li onClick={()=>props.changeActualAction("registrarse")}><a >Registrate</a></li>
        <li onClick={()=>props.changeActualAction("login")}><a >Iniciar sesión</a></li>
        <li onClick={()=>props.changeActualAction("registrarempresa")}><a >Promociona tu empresa</a></li>
      </ul>);
    }else if(props.tipo_usuario=="normal"){
      render.push(<ul>
        <li onClick={()=>props.changeActualAction("registrarse")}><a >Perfil</a></li>
        <li onClick={()=>props.changeActualAction("login")}><a >Mis configuraciones</a></li>
        
      </ul>);
    }else{
      render.push(<ul>
        <li onClick={()=>props.changeActualAction("login")}><a >Perfil</a></li>
        <li onClick={()=>props.changeActualAction("registrarse")}><a >Subir nuevo componente</a></li>
        
      </ul>);
    }
    return(<header>
      <h1>My App</h1>
      <nav>
        {render}
      </nav>
    </header>)
    }