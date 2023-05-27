import { Button, Form, Input, Label, FormFeedback, FormGroup, Spinner } from "reactstrap";
import { useState } from 'react';
import '../style_components/SeleccionPresupuesto.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DevicesFromComponent from "./DevicesFromComponent";
import axios from "axios";
import { DIR_SERV } from "../variables";
export function FormularioComponente(props) {
  const [cargando, setCargando] = useState(false);
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [precio, setPrecio] = useState("");
  const [url, setUrl] = useState("");
  const [tipo, setTipo] = useState("");
  const [fileError, setFileError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [error_imagen, setError_imagen] = useState("");
  const [extra, setExtra] = useState([]);
  const [tipos_estructuras, setTiposEstructuras] = useState([]);
  const navigate = useNavigate();
  if (sessionStorage.tipo != "empresa" || !sessionStorage.editarComponente) {
    navigate("/");
  }
  let extraFormulario = [];
  useEffect(() => {
    setCargando(true);
    let componente = JSON.parse(sessionStorage.editarComponente)
    let marcaAux = "marca_" + sessionStorage.editarTabla;
    let modeloAux = "modelo_" + sessionStorage.editarTabla;
    let precioAux = "precio_" + sessionStorage.editarTabla;
    let urlAux = "url_" + sessionStorage.editarTabla;
    let imagenAux = "imagen_" + sessionStorage.editarTabla;
    setMarca(componente[marcaAux])
    setModelo(componente[modeloAux])
    setPrecio(componente[precioAux])
    setUrl(componente[urlAux])
    setTipo(sessionStorage.editarTabla)
    if(tipos_estructuras.length==0){
      axios.post(`${DIR_SERV}/estructuras`, {
        api_session: sessionStorage.api_session
      })
        .then(response => {
          let estructuras = response.data.estructuras;
          let tiposAux = [...tipos_estructuras]; // Create a copy of tipos_estructuras array
          estructuras.forEach(element => {
            tiposAux.push(<option value={element.id_tipo_estructura}>{element.nombre_tipo_estructura}</option>);
          });
          setTiposEstructuras(tiposAux);
          setCargando(false)
        })
        .catch(error => {
          console.log(error);
        });
      
    }
    
  }, []);
  function handle_change_input(event, setter) {
    setter(event.target.value);

  }
  function handle_extra_info(event=null, index,valor=null) {
    let extraAux = extra;
    if(event){
      extraAux[index] = event.target.value;
    }else{
      extraAux[index] = valor;
    }

    setExtra(extraAux);

  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type.includes('image/')) {
        setFileError('');
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImage('');
        setSelectedFile(null);
        setFileError('Please select an image file');
      }
    } else {
      setPreviewImage('');
      setSelectedFile(null);
      setFileError('');
    }
  };
  function comprobar_datos() {


  }
  let componente = JSON.parse(sessionStorage.editarComponente)
  switch (tipo) {
    case "cooler_procesador":
      
      var atributo1 = "altura_" + sessionStorage.editarTabla;
      var atributo2 = "cantidad_refrigeracion_" + sessionStorage.editarTabla;
      if(extra.length==0){
        handle_extra_info(null, 0,componente[atributo1])
        handle_extra_info(null, 1,componente[atributo2])
      }
     
      extraFormulario.push(
        <div class="informacion_extra" key={tipo}>
          <FormGroup>
            <Label for="altura">Altura (en mm):</Label>
            {((extra[0] == "")) ? <Input invalid id="altura" type="number"  value={extra[0]} onFocus={()=>props.seguridad()}  onChange={(event) => { props.seguridad(handle_extra_info,[event, 0]); }} /> : <Input onFocus={()=>props.seguridad()} type="number" id="altura" value={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="altura">Maximo fluejo de aire (en cfm):</Label>
            {((extra[0] == "")) ? <Input invalid id="altura" type="number"   onFocus={()=>props.seguridad()} value={extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} /> : <Input type="number" id="altura" onFocus={()=>props.seguridad()} value={extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
        </div>
      );
      break;


    case "disco_duro":
      var atributo1 = "capacidad_" + sessionStorage.editarTabla;
      var atributo2 = "tipo" + sessionStorage.editarTabla;
      if(extra.length==0){
        handle_extra_info(null, 0,componente[atributo1])
        handle_extra_info(null, 1,componente[atributo2])
      }
     
      extraFormulario.push(
        <div class="informacion_extra" key={tipo}>
          <FormGroup>
            <Label for="altura">Capacidad (en mm):</Label>
            {((extra[0] == "")) ? <Input invalid id="Capacidad" type="number" onFocus={()=>props.seguridad()} value={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} /> : <Input type="Capacidad" onFocus={()=>props.seguridad()} id="Capacidad" value={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="altura">Tipo disco duro :</Label>
          <Input  id="tipo_disco" type="select" value={extra[1]} onChange={(event) => { handle_extra_info(event, 0); }} defaultValue={extra[1]}> 
            <option value="solido" >Solido</option>
            <option value="SSD"  >SSD</option>
            <option value="M2"  >M2</option>
          </Input>
           
          </FormGroup>
        </div>
      );
      break;

      break;
    case "fuente_alimentacion":
      var atributo1 = "vatios_" + sessionStorage.editarTabla;
      var atributo2 = "calor_producido_" + sessionStorage.editarTabla;
      console.log(componente)
      if(extra.length==0){
        handle_extra_info(null, 0,componente[atributo1])
        handle_extra_info(null, 1,componente[atributo2])
      }
     
      extraFormulario.push(
        <div class="informacion_extra" key={tipo}>
          <FormGroup>
            <Label for="Vatios">Vatios (en KWH):</Label>
            {((extra[0] == "")) ? <Input invalid id="Vatios" type="number" onFocus={()=>props.seguridad()} value={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} /> : <Input type="number" id="Vatios" onFocus={()=>props.seguridad()} value={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="Vatios">Calor producido :</Label>
            {((extra[1] == "")) ? <Input invalid id="calor" type="number" onFocus={()=>props.seguridad()} value={extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} /> : <Input onFocus={()=>props.seguridad()} type="number" id="calor" value={extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
        </div>
      );
      break;

    
    case "placa_base":
      var atributo1 = "id_tipo_estructura_" + sessionStorage.editarTabla;
      var atributo2 = "socket_" + sessionStorage.editarTabla;
     console.log(componente[atributo2])
      console.log(componente)
      if(extra.length==0){
        handle_extra_info(null, 0,componente[atributo1])
        handle_extra_info(null, 1,componente[atributo2])
      }
     
     
      console.log(extra[1])
      extraFormulario.push(
        <div class="informacion_extra" key={tipo}>
          <FormGroup>
            <Label for="tipo_estructura">Tipo estructura:</Label>
           <Input  id="tipo_estructura" type="select" onFocus={()=>props.seguridad()}  onChange={(event) => { handle_extra_info(event, 0); }} >
            {tipos_estructuras}
            </Input> 
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="Socket">Socket :</Label>
            {((extra[1] == "")) ? <Input invalid id="Socket" onFocus={()=>props.seguridad()} value={extra[0]} onChange={(event) => { handle_extra_info(event, 1); }} /> : <Input onFocus={()=>props.seguridad()}  id="Socket" value={extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
        </div>
      );
      break;

      break;
    case "procesador":
      break;
      option:
      break;
    case "ram":
      break;
      option:
      break;
    case "refrigeracion_liquida":
      break;

      break;
    case "sistema_operativo":
      break;

      break;
    case "tarjeta_grafica":
      break;

      break;
    case "torre":
      break;

      break;
    case "ventilador":
      extraFormulario.push(
        <div class="informacion_extra" key={tipo}>
          <FormGroup>
            <Label for="altura">Altura:</Label>
            {((extra[0] == "")) ? <Input invalid onFocus={()=>props.seguridad()} id="altura" type="number" onChange={(event) => { handle_extra_info(event, 0); }} /> : <Input onFocus={()=>props.seguridad()} type="number" id="altura" value={modelo} onChange={(event) => { handle_extra_info(event, 0); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="altura">Capacidad ventilacion (expresada en):</Label>
            {((extra[0] == "")) ? <Input invalid onFocus={()=>props.seguridad()} id="altura" type="number" onChange={(event) => { handle_extra_info(event, 0); }} /> : <Input onFocus={()=>props.seguridad()} type="number" id="altura" value={modelo} onChange={(event) => { handle_extra_info(event, 0); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
        </div>
      );
      break;

  }

console.log(sessionStorage.editarTabla)

  return (<div id="formulario">
    <h1>Formulario</h1>
    {(cargando) ?
      (<Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>) :
      (<div id="labels-formulario">
        <div class="informacion-compartida">
          <FormGroup>
            <Label for="marca">Marca:</Label>
            {((marca == "")) ? <Input invalid id="marca" value={marca} onChange={(event) => { handle_change_input(event, setMarca); }} /> : <Input id="marca" value={marca} onChange={(event) => handle_change_input(event, setMarca)} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="Modelo">Modelo:</Label>
            {((modelo == "")) ? <Input invalid id="Modelo" onChange={(event) => { handle_change_input(event, setModelo); }} /> : <Input id="Modelo" value={modelo} onChange={(event) => handle_change_input(event, setModelo)} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="Precio">Precio:</Label>
            {((precio == "")) ? <Input invalid type="number" id="Precio" onChange={(event) => { handle_change_input(event, setPrecio); }} /> : <Input id="Precio" value={precio} onChange={(event) => handle_change_input(event, setPrecio)} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="Url">Url:</Label>
            {((url == "")) ? <Input invalid id="Url" onChange={(event) => { handle_change_input(event, setUrl); }} /> : <Input id="Url" value={url} onChange={(event) => handle_change_input(event, setUrl)} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="imagen">Imagen:</Label>
            {(fileError != "") ? <Input type="file" invalid id="Imagen" onChange={(e) => handleFileChange(e)} /> : <Input id="Imagen" type="file" onChange={(e) => handleFileChange(e)} />}
            <FormFeedback>{fileError}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="imagen">Tipo de componente:</Label>
            <Input type="select" id="tipo" onChange={(event) => { handle_change_input(event, setTipo); }} defaultValue={sessionStorage.editarTabla} >
              <option value="">Seleccione un tipo</option>
              <option value="cooler_procesador">
                Cooler Procesador
              </option>
              <option value="disco_duro">Disco Duro</option>
              <option value="fuente_alimentacion" >Fuente Alimentacion</option>

              <option value="placa_base"  >Placa Base</option>
              <option value="procesador"  >Procesador</option>
              <option value="ram"  >Ram</option>
              <option value="refrigeracion_liquida"  >Refrigeracion Liquida</option>
              <option value="sistema_operativo"  >Sistema Operativo</option>
              <option value="tarjeta_grafica"  >Tarjeta Grafica</option>
              <option value="cooler_procesador"  >Cooler procesador</option>
              <option value="torre" >Torre</option>
              <option value="ventilador" >Ventilador</option>
              <option value="cooler_procesador"  >Cooler procesador</option>
            </Input>
          </FormGroup>
          {extraFormulario}
        </div>

        <DevicesFromComponent data={JSON.parse(sessionStorage.editarComponente)} modelo={modelo} marca={marca} precio={precio} url={url} vistaPrevia={previewImage} editarTabla={sessionStorage.editareditarTabla}></DevicesFromComponent>

        <button onClick={comprobar_datos()}>Editar</button>

      </div>)
    }

  </div>)
}
export default FormularioComponente;