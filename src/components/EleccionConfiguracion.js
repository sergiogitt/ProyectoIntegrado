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
  const [visualizacion,setVisualizacion]=useState(null);
  const [puntuacion_grafica, setPuntuacion_grafica] = useState(0);
  function local_storage_tipo_configuracion(funcion,valor){
    console.log(localStorage)
    localStorage.setItem("tipo_configuracion",valor);
    funcion(valor)
    
  }

  useEffect(() => {
    console.log(localStorage)

    // get the data from localStorage when the component mounts
    if(!localStorage.visualizacion){
      localStorage.setItem("visualizacion","inicial");
    }
   
    /*if(localStorage.puntuacion_grafica){
      setTipo_configuracion(localStorage.tipo_configuracion);
      setVisualizacion("catalogo_videojuegos");
    }
    if(localStorage.configurador){
      setTipo_configuracion(localStorage.tipo_configuracion);
      setVisualizacion(null);
    }
    if(!localStorage.configurador&&!localStorage.puntuacion_grafica&&!localStorage.tipo_configuracion){
      setVisualizacion(null);
      localStorage.setItem("tipo_configuracion",null);
    }*/
    setVisualizacion(localStorage.visualizacion);
  }, []);
  function change_local_storage(new_view){
    localStorage.visualizacion=new_view;
    setVisualizacion(new_view)
  }
  switch(localStorage.visualizacion){
    case "inicial":
      
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
            <Button onClick={()=>{props.seguridad(change_local_storage,"presupuesto");local_storage_tipo_configuracion(setTipo_configuracion,"multimedia")}}>
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
            <Button onClick={()=>{props.seguridad(change_local_storage,"presupuesto");local_storage_tipo_configuracion(setTipo_configuracion,"disenyo")}}>
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
            <Button onClick={()=>props.seguridad(change_local_storage,"catalogo_videojuegos")}>
              Button
            </Button>
          </CardBody>
        </Card>
      </CardGroup>);
      break;
    case "presupuesto":
      render.push(<SeleccionPresupuesto setVisualizacion={(a)=>setVisualizacion(a)} seguridad={(a)=>props.seguridad(a)}></SeleccionPresupuesto>);
      break;
    case "configurador":
      console.log("ento")
      render.push(<Configurador></Configurador>);
    break;
    case "catalogo_videojuegos":
      render.push(<EleccionVideojuegos setVisualizacion={(a)=>setVisualizacion(a)} seguridad={(a)=>props.seguridad(a)} setPuntuacion_grafica={setPuntuacion_grafica}></EleccionVideojuegos>);
    break;
  }
    return(
      
    <div>
      {render}
    
    
    </div>
    
    );
    }
export default EleccionConfiguracion;