import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Butto,Card,CardSubtitle,CardGroup,CardImg,CardBody,CardText,Button,CardTitle, Input } from 'reactstrap';
import { useState } from 'react';

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
function Configurador(props){
  const [presupuesto,setPresupuesto]=useState(null);
  function changePresupuesto(newPresupuesto){
    setPresupuesto(newPresupuesto)
    console.log(newPresupuesto)
  }
  let visualzacion=[];
  if(presupuesto){
    visualzacion.push(<Componente nombre={"Procesador"} ></Componente>)
  }else{
    visualzacion.push(<SeleccionPresupuesto changePresupuesto={(d)=>changePresupuesto(d)}></SeleccionPresupuesto>)
  }
  return(<div>
    {visualzacion}
    

  </div>
  )
}
function SeleccionPresupuesto(props){
  const [presupuestoAux,setPresupuestoAux]=useState(null);
  
  function changePresupuestoAux(newPresupuesto){
    setPresupuestoAux(newPresupuesto)
   
  }
  function handleNewPresupuesto(){
    console.log(Number.isInteger(presupuestoAux))
    if(presupuestoAux>0){
      props.changePresupuesto(presupuestoAux)
    }else{

    }
    
   
  }
  return(<div>
    <p>Indica el presupuesto principal del que dispones y con el que se te hará una configuración inicial</p>
    <Input onChange={(event)=>changePresupuestoAux(event.target.value)}></Input>
    <Button color="primary" onClick={()=>handleNewPresupuesto()}>Continuar</Button>
  </div>)
}
function Componente(props){
  return(<div>{props.nombre}</div>)
}
function EleccionVideojuegos(props){
  return(<>Eligiendo juegos</>)
}
function EleccionConfiguracion(props){
return(
<div>
<CardGroup>
  <Card>
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/318/180"
      top
      width="100%"
    />
    <CardBody>
      <CardTitle tag="h5">
        Card title
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Card subtitle
      </CardSubtitle>
      <CardText>
        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
      </CardText>
      <Button onClick={()=>props.changeActualAction("configurarPC")}>
        Button
      </Button>
    </CardBody>
  </Card>
  <Card>
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/318/180"
      top
      width="100%"
    />
    <CardBody>
      <CardTitle tag="h5">
        Card title
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Card subtitle
      </CardSubtitle>
      <CardText>
        This card has supporting text below as a natural lead-in to additional content.
      </CardText>
      <Button onClick={()=>props.changeActualAction("configurarPC")}>
        Button
      </Button>
    </CardBody>
  </Card>
  <Card>
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/318/180"
      top
      width="100%"
    />
    <CardBody>
      <CardTitle tag="h5">
        Card title
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Card subtitle
      </CardSubtitle>
      <CardText>
        This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.
      </CardText>
      <Button onClick={()=>props.changeActualAction("elegirJuegos")}>
        Button
      </Button>
    </CardBody>
  </Card>
</CardGroup>

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
