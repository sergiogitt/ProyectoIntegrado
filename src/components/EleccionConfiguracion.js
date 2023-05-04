import { Link, useNavigate } from 'react-router-dom';
import { Card,CardSubtitle,CardGroup,CardImg,CardBody,CardText,Button,CardTitle } from 'reactstrap';
import SeleccionPresupuesto from './SeleccionPresupuesto';
import { useEffect, useState } from 'react';
import { EleccionVideojuegos } from './EleccionVideojuegos';
import { Configurador } from './Configurador';
export function EleccionConfiguracion(props){
  
  const navigate = useNavigate();
  let render=[];
  const [tipo_configuracion,setTipo_configuracion]=useState(null);
  const [presupuesto,setPresupuesto]=useState(null);
  const [puntuacion_grafica, setPuntuacion_grafica] = useState(0);
  function local_storage_tipo_configuracion(funcion,valor){
    localStorage.setItem("tipo_configuracion",valor);
    funcion(valor)
    console.log(localStorage)
  }
  console.log(localStorage)
  useEffect(() => {
    // get the data from localStorage when the component mounts
    
    if(localStorage.tipo_configuracion){
      setTipo_configuracion(localStorage.tipo_configuracion);
      props.setVisualizacion("presupuesto");
    }
    if(localStorage.presupuesto>0){
      setTipo_configuracion(localStorage.tipo_configuracion);
      props.setVisualizacion("configurador");
    }
    if(localStorage.puntuacion_grafica>=0){
      setPuntuacion_grafica(localStorage.puntuacion_grafica);
      props.setVisualizacion("catalogo_videojuegos");
    }
  }, []);
  
  switch(props.visualizacion){
    case null:
      render.push(<CardGroup>
        <Card>
          <CardImg
            alt="Card image cap"
            src="https://picsum.photos/318/180"
            top
            width="100%"
          />
          <CardBody>
            <CardTitle tag="h5">
              Multimedia
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
            <Button onClick={()=>{props.seguridad(props.setVisualizacion,"presupuesto");local_storage_tipo_configuracion(setTipo_configuracion,"multimedia")}}>
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
              Diseño
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
            <Button onClick={()=>{props.seguridad(props.setVisualizacion,"presupuesto");local_storage_tipo_configuracion(setTipo_configuracion,"disenyo")}}>
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
              Gaming
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
            <Button onClick={()=>props.seguridad(props.setVisualizacion,"catalogo_videojuegos")}>
              Button
            </Button>
          </CardBody>
        </Card>
      </CardGroup>);
      break;
    case "presupuesto":
      render.push(<SeleccionPresupuesto setVisualizacion={props.setVisualizacion} seguridad={(a)=>props.seguridad(a)}></SeleccionPresupuesto>);
      break;
    case "configurador":
      render.push(<Configurador></Configurador>);
    break;
    case "catalogo_videojuegos":
      render.push(<EleccionVideojuegos setVisualizacion={props.setVisualizacion} seguridad={(a)=>props.seguridad(a)} setPuntuacion_grafica={setPuntuacion_grafica}></EleccionVideojuegos>);
    break;
  }
    return(
      
    <div>
      {render}
    
    
    </div>
    
    );
    }
export default EleccionConfiguracion;