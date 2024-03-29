import axios from "axios";
import { useState } from "react";
import { Button, Input, Label, FormGroup, FormFeedback, FormText, Form } from "reactstrap";
import { DIR_SERV } from "../variables";
import md5 from "md5";
import '../style_components/FormularioRegistro.css';

import { useNavigate } from "react-router-dom";
export function FormularioRegistroEmpresa(props) {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [clave1, setClave1] = useState("");
    const [clave2, setClave2] = useState("");
    const [email, setEmail] = useState("");
    const [usuario, setUsuario] = useState("");
    const [nombre_empresa, setNombre_empresa] = useState("");
    const [cif, setCif] = useState("");
    const [error, setError] = useState("");
    const [repetido, setRepetido] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [campos_vacios, setCampo_vacio] = useState([false, false, false, false,false,false]);
    function handle_change_input(event, setter) {
        setter(event.target.value);

    }
    function comprobar_campo_vacio(campo, indice) {
        setCampo_vacio(prevState => {
            let aux = [...prevState];
            aux[indice] = campo == "";
            if(campo==usuario){
                setError("Campo obligatorio");
            }
            return aux;
            
        });


    }
    function comprobar_usuario_repetido() {
        if(usuario!=""){
            axios.post(DIR_SERV+'/user_repetido', {
                usuario: usuario
                
            })
            .then(response => {
                if (response.data.repetido) {
                    setRepetido(response.data.repetido)
                    console.log(repetido)
                    setError("Usuario repetido");
                    setCampo_vacio(prevState => {
                        let aux = [...prevState];
                        aux[0] = response.data.repetido;
                        return aux;
                    });
                    return response.data.repetido;
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
       
    }
    function comprobar_datos() {
        comprobar_campo_vacio(usuario, 0);
        comprobar_campo_vacio(nombre, 1);
        comprobar_campo_vacio(clave1, 2);
        comprobar_campo_vacio(clave2, 3);
        comprobar_campo_vacio(nombre_empresa, 4);
        comprobar_campo_vacio(cif, 5);
        if(!emailRegex.test(nombre)){
            setCampo_vacio(prevState => {
                let aux = [...prevState];
                aux[1] = true;
                return aux;
                
            });
        }else{
            setCampo_vacio(prevState => {
                let aux = [...prevState];
                aux[1] = false;
                return aux;
                
            });
        }
        if (clave1 == clave2) {
          
            if (nombre != "" && usuario != "" && clave1 != "" && clave2 != ""&&nombre_empresa!=""&&cif!=""&& !repetido&&emailRegex.test(nombre)) {
                //Registrar usuario en la BD
                console.log("inserto")
                axios.post(DIR_SERV+'/create_company', {
                usuario: usuario,
                clave: md5(clave1),
                email:nombre,
                cif:cif,
                nombre_empresa:nombre_empresa
                })
                    .then(response => {
                    console.log(response);
                    if (response.data.usuario) {
                        console.log(response.data.usuario.tipo)
                        props.log_user(response.data.usuario.tipo);
                        sessionStorage.setItem("usuario", usuario);
                        sessionStorage.setItem("clave", md5(clave1));
                        sessionStorage.setItem("tipo", "empresa");
                        sessionStorage.setItem("api_session", response.data.api_session);
                        sessionStorage.setItem("ultima_accion", new Date() / 1000);
                        console.log(sessionStorage.ultima_accion)
                        navigate("/");
                    } else {
                        props.setError("Credenciales incorrectas");
                    }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }

        } else {
            setCampo_vacio(prevState => {
                let aux = [...prevState];
                aux[2] = true;
                return aux;
            });
        }

    }
    return (<><h2>Registro de usuario</h2><Form  id="formulario_registro">
        <FormGroup>
            <Label for="examplePassword">Nombre usuario</Label>
            {(campos_vacios[0]) ? <Input invalid onChange={(event) => {handle_change_input(event, setUsuario);comprobar_usuario_repetido()}} /> : <Input onChange={(event) => handle_change_input(event, setUsuario)} />}
            <FormFeedback>{error}</FormFeedback>        
            </FormGroup>
        <FormGroup>
            <Label for="examplePassword">Email de contacto:</Label>
            {(campos_vacios[1]) ? <Input  invalid onChange={(event) => handle_change_input(event, setNombre)} /> : <Input type="email" onChange={(event) => handle_change_input(event, setNombre)} />}
            {(nombre == "") ? <FormFeedback>Campo obligatorio</FormFeedback> : <FormFeedback>Tiene que introducir una direccion de email válida</FormFeedback>}
        </FormGroup>
        
        <FormGroup>
            <Label for="examplePassword">Contraseña</Label>
            {(campos_vacios[2]) ? <Input invalid onChange={(event) => handle_change_input(event, setClave1)} /> : <Input onChange={(event) => handle_change_input(event, setClave1)} />}
            {(clave1 == "") ? <FormFeedback>Campo obligatorio</FormFeedback> : <FormFeedback>Las contraseñas no coinciden</FormFeedback>}
        </FormGroup>
        <FormGroup>
            <Label for="examplePassword">Repita la contraseña</Label>
            {(campos_vacios[3]) ? <Input invalid onChange={(event) => handle_change_input(event, setClave2)} /> : <Input onChange={(event) => handle_change_input(event, setClave2)} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
        </FormGroup>
        <FormGroup>
            <Label for="examplePassword">Nombre de la empresa:</Label>
            {(campos_vacios[4]) ? <Input  invalid onChange={(event) => handle_change_input(event, setNombre_empresa)} /> : <Input  onChange={(event) => handle_change_input(event, setNombre_empresa)} />}
           <FormFeedback>Campo obligatorio</FormFeedback>
        </FormGroup>
        <FormGroup>
            <Label for="examplePassword">CIF de la empresa:</Label>
            {(campos_vacios[5]) ? <Input  invalid onChange={(event) => handle_change_input(event, setCif)} /> : <Input  onChange={(event) => handle_change_input(event, setCif)} />}
            <FormFeedback>Campo obligatorio</FormFeedback> 
        </FormGroup>


        <div id="boton_registro">
            <Button onClick={() => comprobar_datos()}>Registrarse</Button>
        </div>

    </Form></>)
}