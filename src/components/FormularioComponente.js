import { Button, Form, Input, Label, FormFeedback, FormGroup, Spinner } from "reactstrap";
import { useState } from 'react';
import '../style_components/SeleccionPresupuesto.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DevicesFromComponent from "./DevicesFromComponent";
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
    setCargando(false)
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
        <div class="informacion_extra">
          <FormGroup>
            <Label for="altura">Altura (en mm):</Label>
            {((extra[0] == "")) ? <Input invalid id="altura" type="number" value={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} /> : <Input type="number" id="altura" value={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="altura">Maximo fluejo de aire (en cfm):</Label>
            {((extra[0] == "")) ? <Input invalid id="altura" type="number" value={extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} /> : <Input type="number" id="altura" value={extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} />}
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
        <div class="informacion_extra">
          <FormGroup>
            <Label for="altura">Capacidad (en mm):</Label>
            {((extra[0] == "")) ? <Input invalid id="Capacidad" type="number" value={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} /> : <Input type="Capacidad" id="Capacidad" value={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="altura">Tipo disco duro :</Label>
          <Input  id="tipo_disco" type="select" value={extra[1]} onChange={(event) => { handle_extra_info(event, 0); }} > 
            <option value="solido"  selected={(extra[1] === "solido") ? true : false}>Solido</option>
            <option value="SSD"  selected={(extra[1] === "SSD") ? true : false}>SSD</option>
            <option value="M2"  selected={(extra[1] === "M2") ? true : false}>M2</option>
          </Input>
           
          </FormGroup>
        </div>
      );
      break;

      break;
    case "fuente_alimentacion":
      var atributo1 = "vatios_" + sessionStorage.editarTabla;
      var atributo2 = "calor_producido_" + sessionStorage.editarTabla;
      if(extra.length==0){
        handle_extra_info(null, 0,componente[atributo1])
        handle_extra_info(null, 1,componente[atributo2])
      }
     
      extraFormulario.push(
        <div class="informacion_extra">
          <FormGroup>
            <Label for="Vatios">Vatios (en KWH):</Label>
            {((extra[0] == "")) ? <Input invalid id="Vatios" type="number" value={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} /> : <Input type="number" id="Vatios" value={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="Vatios">Calor producido :</Label>
            {((extra[0] == "")) ? <Input invalid id="calor" type="number" value={extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} /> : <Input type="number" id="calor" value={extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
        </div>
      );
      break;

      break;
    case "placa_base":
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
        <div class="informacion_extra">
          <FormGroup>
            <Label for="altura">Altura:</Label>
            {((extra[0] == "")) ? <Input invalid id="altura" type="number" onChange={(event) => { handle_extra_info(event, 0); }} /> : <Input type="number" id="altura" value={modelo} onChange={(event) => { handle_extra_info(event, 0); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="altura">Capacidad ventilacion (expresada en):</Label>
            {((extra[0] == "")) ? <Input invalid id="altura" type="number" onChange={(event) => { handle_extra_info(event, 0); }} /> : <Input type="number" id="altura" value={modelo} onChange={(event) => { handle_extra_info(event, 0); }} />}
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
            <Input type="select" id="tipo" onChange={(event) => { handle_change_input(event, setTipo); }} >
              <option value="">Seleccione un tipo</option>
              <option value="cooler_procesador" selected={(sessionStorage.editarTabla === "cooler_procesador") ? true : false}>
                Cooler Procesador
              </option>
              <option value="disco_duro">Disco Duro</option>
              <option value="fuente_alimentacion" selected={(sessionStorage.editarTabla === "fuente_alimentacion")? true : false }>Fuente Alimentacion</option>

              <option value="placa_base"  selected={(sessionStorage.editarTabla === "placa_base") ? true : false}>Placa Base</option>
              <option value="procesador"  selected={(sessionStorage.editarTabla === "procesador") ? true : false}>Procesador</option>
              <option value="ram"  selected={(sessionStorage.editarTabla === "ram") ? true : false}>Ram</option>
              <option value="refrigeracion_liquida"  selected={(sessionStorage.editarTabla === "refrigeracion_liquida") ? true : false}>Refrigeracion Liquida</option>
              <option value="sistema_operativo"  selected={(sessionStorage.editarTabla === "sistema_operativo") ? true : false}>Sistema Operativo</option>
              <option value="tarjeta_grafica"  selected={(sessionStorage.editarTabla === "tarjeta_grafica") ? true : false}>Tarjeta Grafica</option>
              <option value="cooler_procesador"  selected={(sessionStorage.editarTabla === "cooler_procesador") ? true : true}>Cooler procesador</option>
              <option value="torre"  selected={(sessionStorage.editarTabla === "torre") ? true : false}>Torre</option>
              <option value="ventilador"  selected={(sessionStorage.editarTabla === "ventilador") ? true : true}>Ventilador</option>
              <option value="cooler_procesador"  selected={(sessionStorage.editarTabla === "cooler_procesador") ? true : true}>Cooler procesador</option>
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