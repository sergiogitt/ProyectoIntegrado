export function Cabecera(props){
    if(props.login){

    }else{

    }
    return(<header>
      <h1>My App</h1>
      <nav>
        <ul>
          <li onClick={()=>props.changeActualAction("registrarse")}><a >Registrate</a></li>
          <li onClick={()=>props.changeActualAction("iniciar_sesion")}><a >Iniciar sesión</a></li>
          <li onClick={()=>props.changeActualAction("registrarempresa")}><a >Promociona tu empresa</a></li>
        </ul>
      </nav>
    </header>)
    }