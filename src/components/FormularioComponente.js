import { Button, Form, Input, Label, FormFeedback, FormGroup, Spinner } from "reactstrap";
import { useState } from 'react';
import '../style_components/FormularioComponente.css';
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
  if (sessionStorage.tipo != "empresa" ) {
    navigate("/");
  }
  if (props.componenteNuevo){
    console.log("creando nuevo")
      const editarComponente = {
  id_disco_duro: "",
  url_disco_duro: "",
  precio_disco_duro: "",
  marca_disco_duro: "",
  modelo_disco_duro: "",
  capacidad_disco_duro: "",
  tipo_disco_duro: "",
  id_anunciante_disco_duro: sessionStorage.id,
  imagen_disco_duro: null
};
sessionStorage.setItem("editarTabla","procesador");
sessionStorage.setItem("editarComponente", JSON.stringify(editarComponente));

  }
  let extraFormulario = [];
  useEffect(() => {
    setCargando(true);
    
    console.log(sessionStorage.editarComponente)
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
    if (tipos_estructuras.length == 0) {
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
  function handle_extra_info(event = null, index, valor = null) {


    let extraAux = [...extra];
    
    if (event) {
      extraAux[index] = event.target.value;
    } else {
      extraAux[index] = valor;
    }

    setExtra(extraAux);
    console.log(extraAux)

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
  function actualizarComponente(id){
    let datos=[ marca,modelo,precio,url,extra[0],extra[1]];
    if((tipo=="procesador"||tipo=="ram"||tipo=="refrigeracion_liquida"||tipo=="tarjeta_grafica"||tipo=="torre")){
      datos.push(extra[2])
    }
    datos.push(id)
    axios.post(DIR_SERV+'/actualizar_componente', {
      api_session:sessionStorage.api_session,
      info:datos,
      tipo_componente:sessionStorage.editarTabla
  })
      .then(response => {
        sessionStorage.setItem("mensaje","Se ha actualizado el componente "+modelo)
        navigate("/mis_componentes")
      })
      .catch(error => {
          console.log(error);
      });
  }
  function comprobar_accion(){
    let columna="id_"+sessionStorage.editarTabla;
      let id=componente[columna]
    if(sessionStorage.editarTabla==tipo){
      
      actualizarComponente(id)
    }else{
      console.log("inserto antes")
      borrarComponente(id)
      insertarNuevoComponente()
    }
  }
  function borrarComponente(id){
    let columna="id_"+sessionStorage.editarTabla;
      let id_borrar=componente[columna];
      let tabla=sessionStorage.editarTabla;
    axios.post(DIR_SERV+"/borrar_componente", {
      api_session: sessionStorage.api_session,
      tabla:tabla,
      datos:id_borrar
    })
      .then(response => {
       
      })
      .catch(error => {
        console.log(error);
      });
  }
  function insertarNuevoComponente(){
    let datos=[ marca,modelo,precio,url,extra[0],extra[1]];
    if((tipo=="procesador"||tipo=="ram"||tipo=="refrigeracion_liquida"||tipo=="tarjeta_grafica"||tipo=="torre")){
      datos.push(extra[2])
    }
   
    
    axios.post(DIR_SERV+"/nuevo_componente", {
      api_session: sessionStorage.api_session,
      tabla:tipo,
      datos:datos
    })
      .then(response => {
        sessionStorage.setItem("mensaje","Se ha insertado un nuevo componente "+modelo)
       navigate("/mis_componentes")
      })
      .catch(error => {
        console.log(error);
      });
  }
  function comprobar_datos_editar() {
    if(modelo!=""&&marca!=""&&precio!=""&&url!=""&&url!=null&&extra[0]!=""&&extra[1]!=""&&extra[0]!=null&&extra[1]!=null){
      if((tipo=="procesador"||tipo=="ram"||tipo=="refrigeracion_liquida"||tipo=="tarjeta_grafica"||tipo=="torre")){
        if(extra[2]=!""&&extra[2]!=null&&extra[2]){
          comprobar_accion()
        }else{
          console.log("no inserto con tres")
        }
      }else{
        comprobar_accion()
        console.log("inserto con dos"+url)
      }
    }else{
      console.log("no inserto")
    }

  }
  function comprobar_datos_nuevo() {
    if(modelo!=""&&marca!=""&&precio!=""&&url!=""&&url!=null&&extra[0]!=""&&extra[1]!=""&&extra[0]!=null&&extra[1]!=null){
      if((tipo=="procesador"||tipo=="ram"||tipo=="refrigeracion_liquida"||tipo=="tarjeta_grafica"||tipo=="torre")){
        if(extra[2]=!""&&extra[2]!=null&&extra[2]){
          insertarNuevoComponente()

        }else{
          console.log("no inserto con tres")
        }
      }else{
        insertarNuevoComponente()
        console.log("inserto con dos"+url)
      }
    }else{
      console.log("no inserto")
    }

  }
  
  let componente = JSON.parse(sessionStorage.editarComponente)
  switch (tipo) {
    case "cooler_procesador":

      var atributo1 = "altura_cooler_procesador";
      var atributo2 = "cantidad_refrigeracion_" + sessionStorage.editarTabla;
      if (extra.length == 0) {
        extra[0] = componente[atributo1];
        handle_extra_info(null, 1, componente[atributo2])
        console.log(extra)
      }
      console.log(componente[atributo1])
      extraFormulario.push(
        <div class="informacion_extra" key={tipo}>
          <FormGroup>
            <Label for="altura">Altura (en mm):</Label>
            {((extra[0] == "")) ? <Input invalid id="altura" type="number" onFocus={() => props.seguridad()} defaultValue={componente[atributo1]} onChange={(event) => { handle_extra_info(event, 0); }} /> : <Input type="number" id="altura" onFocus={() => props.seguridad()} defaultValue={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="flujo_air_cooler">Maximo fluejo de aire (en cfm):</Label>
            {((extra[1] == "")) ? <Input invalid id="flujo_air_cooler" type="number" onFocus={() => props.seguridad()} defaultValue={extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} /> : <Input type="number" id="flujo_air_cooler" onFocus={() => props.seguridad()} defaultValue={extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
        </div>
      );
      break;


    case "disco_duro":
      var atributo1 = "capacidad_" + sessionStorage.editarTabla;
      var atributo2 = "tipo_" + sessionStorage.editarTabla;
      if (extra.length == 0) {

        extra[0] = componente[atributo1];
        extra[1] = componente[atributo2];
      }

      extraFormulario.push(
        <div class="informacion_extra" key={tipo}>
          <FormGroup>
            <Label for="altura">Capacidad (en mm):</Label>
            {((extra[0] == "")) ? <Input invalid id="Capacidad" type="number" onFocus={() => props.seguridad()} defaultValue={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} /> : <Input type="Capacidad" onFocus={() => props.seguridad()} id="Capacidad" defaultValue={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="altura">Tipo disco duro :</Label>
            <Input id="tipo_disco" type="select" onChange={(event) => { handle_extra_info(event, 1); }} defaultValue={extra[1]}>
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
      if (extra.length == 0) {
        extra[0]=componente[atributo1];
        handle_extra_info(null, 1, componente[atributo2])
      }

      extraFormulario.push(
        <div class="informacion_extra" key={tipo}>
          <FormGroup>
            <Label for="Vatios_fuente">Vatios_fuente (en KWH):</Label>
            {((extra[0] == "")) ? <Input invalid id="Vatios_fuente" type="number" onFocus={() => props.seguridad()} defaultValue={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} /> : <Input type="number" id="Vatios" onFocus={() => props.seguridad()} defaultValue={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="calor_fuente">Calor producido :</Label>
            {((extra[1] == "")) ? <Input invalid id="calor_fuente" type="number" onFocus={() => props.seguridad()} defaultValue={extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} /> : <Input onFocus={() => props.seguridad()} type="number" id="calor_fuente" defaultValue={extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
        </div>
      );
      break;


    case "placa_base":
      var atributo1 = "id_tipo_estructura" ;
      var atributo2 = "socket_" + sessionStorage.editarTabla;
      console.log(componente[atributo2])
      console.log(componente)
      if (extra.length == 0) {
        extra[0]=componente[atributo1];
        extra[1]=componente[atributo2]
      }



      extraFormulario.push(
        <div class="informacion_extra" key={tipo}>
          <FormGroup>
            <Label for="tipo_estructura_placa_base">Tipo estructura:</Label>
            <Input id="tipo_estructura_placa_base" type="select" onFocus={() => props.seguridad()} onChange={(event) => { handle_extra_info(event, 0); }} defaultValue={extra[0]}>
              {tipos_estructuras}
            </Input>
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="Socket_placaBase">Socket :</Label>
            {((extra[1] == "")) ? <Input invalid id="Socket_placaBase" onFocus={() => props.seguridad()} defaultValue={extra[1] == null ? '' : extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} /> : <Input onFocus={() => props.seguridad()} id="Socket_placaBase" defaultValue={extra[1] == null ? '' : extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
        </div>
      );
      break;

      break;
    case "procesador":
      var atributo1 = "vatios_" + sessionStorage.editarTabla;
      var atributo2 = "benchmark_" + sessionStorage.editarTabla;
      var atributo3 = "socket_" + sessionStorage.editarTabla;
      console.log(componente)
      if (extra.length == 0) {
        extra[0]=componente[atributo1];
        extra[1]=componente[atributo2];
         extra[2]=componente[atributo3];
         console.log(extra)
      }

      extraFormulario.push(
        <div class="informacion_extra" key={tipo}>
          <FormGroup>
            <Label for="VatiosProcesador">Vatios (en W):</Label>
            {((extra[0] == "")) ? <Input invalid id="VatiosProcesador" type="number" onFocus={() => props.seguridad()} defaultValue={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} /> : <Input type="number" id="VatiosProcesador" onFocus={() => props.seguridad()} defaultValue={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="benchmarkProcesador">Puntuacion benchmark :</Label>
            {((extra[1] == "")) ? <Input invalid id="benchmarkProcesador" type="number" onFocus={() => props.seguridad()} defaultValue={extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} /> : <Input onFocus={() => props.seguridad()} type="number" id="benchmarkProcesador" defaultValue={extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="SocketProcesador">Socket :</Label>
            {((extra[2] == "")) ? <Input invalid id="SocketProcesador" onFocus={() => props.seguridad()} defaultValue={extra[2]} onChange={(event) => { handle_extra_info(event, 2); }} /> : <Input onFocus={() => props.seguridad()} id="SocketProcesador" defaultValue={extra[2]} onChange={(event) => { handle_extra_info(event, 2); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>

        </div>
      );
      break;

    case "ram":
      var atributo1 = "velocidad_" + sessionStorage.editarTabla;
      var atributo3 = "gb_" + sessionStorage.editarTabla;
      var atributo2 = "tipo_" + sessionStorage.editarTabla;
      if (extra.length == 0) {
        extra[0]=componente[atributo1];
        extra[1]=componente[atributo2];
         extra[2]=componente[atributo3];
      }
console.log(componente[atributo3])
      extraFormulario.push(
        <div class="informacion_extra" key={tipo}>
          <FormGroup>
            <Label for="velocidadRam">Velocidad (en Mhz):</Label>
            {((extra[0] == "")) ? <Input invalid id="velocidadRam" type="number" onFocus={() => props.seguridad()} defaultValue={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} /> : <Input type="velocidadRam" onFocus={() => props.seguridad()} id="Capacidad" defaultValue={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="tipo_memoria_ram">Tipo de RAM:</Label>
            <Input id="tipo_memoria_ram" type="select" onChange={(event) => { handle_extra_info(event, 1); }} defaultValue={extra[1]}>
              
              <option value="DDR3">DDR3</option>
              <option value="DDR2">DDR2</option>
              <option value="DDR1">DDR1</option>
              <option value="DDR4" >DDR4</option>
            </Input>

          </FormGroup>
          <FormGroup>
            <Label for="gb">GB:</Label>
            {((extra[2] == "")) ? <Input invalid id="gb" type="number" onFocus={() => props.seguridad()} defaultValue={extra[2]} onChange={(event) => { handle_extra_info(event, 2); }} /> : <Input type="gb" onFocus={() => props.seguridad()} id="Capacidad" defaultValue={extra[2]} onChange={(event) => { handle_extra_info(event, 2); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
        </div>
      );
      break;

    case "refrigeracion_liquida":
      var atributo1 = "anchura_" + sessionStorage.editarTabla;
      var atributo2 = "maximo_calor_refrigerado_" + sessionStorage.editarTabla;
      var atributo3 = "vatios_" + sessionStorage.editarTabla;

      if (extra.length == 0) {
        extra[0]=componente[atributo1];
        extra[1]=componente[atributo2];
         extra[2]=componente[atributo3];
      }



      extraFormulario.push(
        <div class="informacion_extra" key={tipo}>
          <FormGroup>
            <Label for="Refrigeracion">Altura (en mm):</Label>
            {((extra[0] == "")) ? <Input invalid id="Refrigeracion" onFocus={() => props.seguridad()} defaultValue={extra[1] == null ? '' : extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} /> : <Input onFocus={() => props.seguridad()} id="Refrigeracion" defaultValue={extra[1] == null ? '' : extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} />}

            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="calor_refrigerado">Maximo calor refrigerado (en cfm):</Label>
            {((extra[1] == "")) ? <Input invalid id="calor_refrigerado" onFocus={() => props.seguridad()} defaultValue={extra[1] == null ? '' : extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} /> : <Input onFocus={() => props.seguridad()} id="calor_refrigerado" defaultValue={extra[1] == null ? '' : extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="VatiosRefrigeracion">Vatios:</Label>
            {((extra[2] == "")) ? <Input invalid id="VatiosRefrigeracion" onFocus={() => props.seguridad()} defaultValue={extra[2] == null ? '' : extra[2]} onChange={(event) => { handle_extra_info(event, 2); }} /> : <Input onFocus={() => props.seguridad()} id="VatiosRefrigeracion" defaultValue={extra[2] == null ? '' : extra[2]} onChange={(event) => { handle_extra_info(event, 2); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
        </div>
      );
      break;

      break;
    case "sistema_operativo":
      break;

      break;
    case "tarjeta_grafica":
      var atributo1 = "vatios_" + sessionStorage.editarTabla;
      var atributo2 = "benchmark_" + sessionStorage.editarTabla;
      var atributo3 = "altura_" + sessionStorage.editarTabla;
      console.log(componente)
      if (extra.length == 0) {
         extra[0]=componente[atributo1];
         extra[1]=componente[atributo2];
         extra[2]=componente[atributo3];
      }

      extraFormulario.push(
        <div class="informacion_extra" key={tipo}>
          <FormGroup>
            <Label for="VatiosTarjetaGrafica">Vatios (en W):</Label>
            {((extra[0] == "")) ? <Input invalid id="VatiosTarjetaGrafica" type="number" onFocus={() => props.seguridad()} defaultValue={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} /> : <Input type="number" id="VatiosTarjetaGrafica" onFocus={() => props.seguridad()} defaultValue={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="benchmarkTarjetaGrafica">Puntuacion benchmark :</Label>
            {((extra[1] == "")) ? <Input invalid id="benchmarkTarjetaGrafica" type="number" onFocus={() => props.seguridad()} defaultValue={extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} /> : <Input onFocus={() => props.seguridad()} type="number" id="benchmarkTarjetaGrafica" defaultValue={extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="AlturaTarjetaGrafica">Altura :</Label>
            {((extra[2] == "")) ? <Input invalid id="AlturaTarjetaGrafica" onFocus={() => props.seguridad()} defaultValue={extra[2]} onChange={(event) => { handle_extra_info(event, 2); }} /> : <Input onFocus={() => props.seguridad()} id="AlturaTarjetaGrafica" defaultValue={extra[2]} onChange={(event) => { handle_extra_info(event, 2); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>

        </div>
      );
      break;


    case "torre":
      var atributo1 = "id_tipo_estructura";
      var atributo2 = "anchura_" + sessionStorage.editarTabla;
      var atributo3 = "profundidad_" + sessionStorage.editarTabla;
      console.log(componente[atributo2])
      console.log(componente)
      if (extra.length == 0) {
         extra[0]=componente[atributo1];
         extra[1]=componente[atributo2];
         extra[2]=componente[atributo3];
      }



      extraFormulario.push(
        <div class="informacion_extra" key={tipo}>
          <FormGroup>
            <Label for="tipo_estructuraTorre">Tipo estructura:</Label>
            <Input id="tipo_estructuraTorre" type="select" onFocus={() => props.seguridad()} onChange={(event) => { handle_extra_info(event, 0); }} defaultValue={componente[atributo1]}>
              {tipos_estructuras}
            </Input>
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="AnchuraTorre">Anchura (en mm) :</Label>
            {((extra[1] == "")) ? <Input invalid id="AnchuraTorre" onFocus={() => props.seguridad()} defaultValue={extra[1] == null ? '' : extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} /> : <Input onFocus={() => props.seguridad()} id="AnchuraTorre" defaultValue={extra[1] == null ? '' : extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="ProfundidadTorre">Profundidad (en mm) :</Label>
            {((extra[2] == "")) ? <Input invalid id="ProfundidadTorre" onFocus={() => props.seguridad()} defaultValue={extra[2]} onChange={(event) => { handle_extra_info(event, 2); }} /> : <Input onFocus={() => props.seguridad()} id="ProfundidadTorre" defaultValue={extra[2] == null ? '' : extra[2]} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>

        </div>
      );
      break;

      break;
    case "ventilador":
      var atributo1 = "altura_ventilador";
      var atributo2 = "maxima_cantidad_vn";
      console.log(componente[atributo2])
      console.log(componente)
      if (extra.length == 0) {
         extra[0]=componente[atributo1];
         extra[1]=componente[atributo2];
      }

      extraFormulario.push(
        <div class="informacion_extra" key={tipo}>
          <FormGroup>
            <Label for="alturaVentilador">Altura:</Label>
            {((extra[0] == "")) ? <Input invalid onFocus={() => props.seguridad()} id="alturaVentilador" type="number" onChange={(event) => { handle_extra_info(event, 0); }} /> : <Input onFocus={() => props.seguridad()} type="number" id="alturaVentilador" defaultValue={extra[0]} onChange={(event) => { handle_extra_info(event, 0); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="alturaVentilador">Capacidad ventilacion (expresada en):</Label>
            {((extra[0] == "")) ? <Input invalid onFocus={() => props.seguridad()} id="alturaVentilador" type="number" onChange={(event) => { handle_extra_info(event, 1); }} /> : <Input onFocus={() => props.seguridad()} type="number" id="alturaVentilador" defaultValue={extra[1]} onChange={(event) => { handle_extra_info(event, 1); }} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>


        </div>
      );
      break;

  }
extraFormulario.push()

  return (<div id="formulario">
    <h1>{(props.componenteNuevo)?"Nuevo componente":"Editar componente"}</h1>
    {(cargando) ?
      (<div class="spinner"><Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner></div>) :
      (<div id="labels-formulario">
        <div class="informacion-compartida">
          <FormGroup>
            <Label for="marca">Marca:</Label>
            {((marca == "")) ? <Input invalid id="marca" onFocus={() => props.seguridad()} defaultValue={marca} onChange={(event) => { handle_change_input(event, setMarca); }} /> :
              <Input onFocus={() => props.seguridad()} id="marca" defaultValue={marca} onChange={(event) => handle_change_input(event, setMarca)} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="Modelo">Modelo:</Label>
            {((modelo == "")) ? <Input invalid id="Modelo" onChange={(event) => { handle_change_input(event, setModelo); }} onFocus={() => props.seguridad()} /> : <Input id="Modelo" onFocus={() => props.seguridad()} defaultValue={modelo} onChange={(event) => handle_change_input(event, setModelo)} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="Precio">Precio:</Label>
            {((precio == "")) ? <Input invalid type="number" id="Precio" onChange={(event) => { handle_change_input(event, setPrecio); }} onFocus={() => props.seguridad()} /> : <Input id="Precio" onFocus={() => props.seguridad()} defaultValue={precio} onChange={(event) => handle_change_input(event, setPrecio)} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="Url">Url:</Label>
            {url === "" ? (
              <Input
                invalid
                id="Url"
                onChange={(event) => {
                  handle_change_input(event, setUrl);
                }}
              />
            ) : (
              <Input
                id="Url"
                value={url ? url : ""}
                onChange={(event) => handle_change_input(event, setUrl)}
              />
            )}
            <FormFeedback>Campo obligatorio</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="imagen">Imagen:</Label>
            {(fileError != "") ? <Input type="file" invalid id="Imagen" onChange={(e) => handleFileChange(e)} /> : <Input id="Imagen" type="file" onChange={(e) => handleFileChange(e)} />}
            <FormFeedback>{fileError}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="imagen">Tipo de componente:</Label>
            <Input type="select" id="tipo" onFocus={() => props.seguridad()} onChange={(event) => { handle_change_input(event, setTipo); setExtra([]) }} defaultValue={sessionStorage.editarTabla} >
              <option value="cooler_procesador">
                Cooler Procesador
              </option>
              <option value="disco_duro">Disco Duro</option>
              <option value="fuente_alimentacion" >Fuente Alimentacion</option>

              <option value="placa_base"  >Placa Base</option>
              <option value="procesador"  >Procesador</option>
              <option value="ram"  >Ram</option>
              <option value="refrigeracion_liquida"  >Refrigeracion Liquida</option>
              <option value="tarjeta_grafica"  >Tarjeta Grafica</option>
              <option value="cooler_procesador"  >Cooler procesador</option>
              <option value="torre" >Torre</option>
              <option value="ventilador" >Ventilador</option>
              <option value="cooler_procesador"  >Cooler procesador</option>
            </Input>
          </FormGroup>
         
        </div>
        {extraFormulario}
        <DevicesFromComponent id="visualizacion" data={JSON.parse(sessionStorage.editarComponente)} modelo={modelo} marca={marca} precio={precio} url={url} vistaPrevia={previewImage} editarTabla={sessionStorage.editareditarTabla}></DevicesFromComponent>
              
       
      </div>)
    }
{(props.componenteNuevo)? <Button id="boton_accion" onClick={()=>comprobar_datos_nuevo()}>Subir</Button>

: <Button  id="boton_accion" onClick={()=>comprobar_datos_editar()}>Editar</Button>
}
  </div>)
}
export default FormularioComponente;