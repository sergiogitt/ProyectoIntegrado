import { Button,Form,Input,Label,FormFeedback,FormGroup, Spinner} from "reactstrap";
import { useState} from 'react';
import '../style_components/SeleccionPresupuesto.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DevicesFromComponent from "./DevicesFromComponent";
export function FormularioComponente(props){
  const [cargando, setCargando] = useState(false);
  const [modelo,setModelo]=useState("");
  const [marca,setMarca]=useState("");
  const [precio,setPrecio]=useState("");
  const [url,setUrl]=useState("");
  const [fileError, setFileError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [error_imagen,setError_imagen]=useState("");
  const [extra1,setExtra1]=useState([]);
  const navigate = useNavigate();
  if (localStorage.tipo!="empresa"||!localStorage.editarComponente) {
    navigate("/");
  }

  useEffect(() => {
    setCargando(true);
    let componente=JSON.parse(localStorage.editarComponente)
    let marcaAux="marca_"+localStorage.editarTabla;
    let modeloAux="modelo_"+localStorage.editarTabla;
    let precioAux="precio_"+localStorage.editarTabla;
    let urlAux="url_"+localStorage.editarTabla;
    let imagenAux="imagen_"+localStorage.editarTabla;
    setMarca(componente[marcaAux])
    setModelo(componente[modeloAux])
    setPrecio(componente[precioAux])
    setUrl(componente[urlAux])
    setCargando(false)
}, []);
  function handle_change_input(event, setter) {
    console.log(marca)
    setter(event.target.value);

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


    return(<div id="formulario">
      <h1>Formulario</h1>
      {(cargando)?
    (<Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>):
    (<div id="labels-formulario">
    <div class="informacion-compartida">
    <FormGroup>
        <Label for="marca">Marca:</Label>
        {((marca=="")) ? <Input invalid id="marca"  value={marca} onChange={(event) => {handle_change_input(event, setMarca);}} /> : <Input id="marca" value={marca} onChange={(event) => handle_change_input(event, setMarca)} />}
        <FormFeedback>Campo obligatorio</FormFeedback>        
  </FormGroup>
  <FormGroup>
        <Label for="Modelo">Modelo:</Label>
        {((modelo=="")) ? <Input invalid id="Modelo" onChange={(event) => {handle_change_input(event, setModelo);}} /> : <Input id="Modelo" value={modelo} onChange={(event) => handle_change_input(event, setModelo)} />}
        <FormFeedback>Campo obligatorio</FormFeedback>        
  </FormGroup>
  <FormGroup>
        <Label for="Precio">Precio:</Label>
        {((precio=="")) ? <Input invalid  type="number" id="Precio" onChange={(event) => {handle_change_input(event, setPrecio);}} /> : <Input id="Precio" value={precio} onChange={(event) => handle_change_input(event, setPrecio)} />}
        <FormFeedback>Campo obligatorio</FormFeedback>        
  </FormGroup>
  <FormGroup>
        <Label for="Url">Url:</Label>
        {((url=="")) ? <Input invalid id="Url" onChange={(event) => {handle_change_input(event, setUrl);}} /> : <Input id="Url" value={url} onChange={(event) => handle_change_input(event, setUrl)} />}
        <FormFeedback>Campo obligatorio</FormFeedback>        
  </FormGroup>
  <FormGroup>
        <Label for="imagen">Imagen:</Label>
        {(fileError!="") ? <Input type="file" invalid id="Imagen" onChange={(e)=>handleFileChange(e)} /> : <Input id="Imagen" type="file"  onChange={(e)=>handleFileChange(e)} />}
        <FormFeedback>{fileError}</FormFeedback>        
  </FormGroup>
    </div>
    <div class="informacion-extra">
    
    </div>
    <DevicesFromComponent data={JSON.parse(localStorage.editarComponente)} modelo={modelo} marca={marca} precio={precio} url={url} vistaPrevia={previewImage} tabla={localStorage.editarTabla}></DevicesFromComponent>
   
  <button onClick={comprobar_datos()}>Editar</button>

  </div>)  
    }
      
    </div>)
  }
export default FormularioComponente;