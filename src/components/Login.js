import axios from "axios";
import md5 from "md5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormFeedback, Input } from "reactstrap";
import '../style_components/Login.css';
import { DIR_SERV } from "../variables";

export function Login(props) {
    const [clave, setClave] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [mensaje, setMensaje] = useState(null);
    const navigate = useNavigate();
    function log_user() {
        if (clave != "" && usuario != "") {
            axios.post(DIR_SERV+'/login', {
                usuario: usuario,
                clave: md5(clave)
            })
                .then(response => {
                    console.log(response);
                    if (response.data.usuario) {
                        console.log(response.data.usuario.tipo)
                        props.log_user(response.data.usuario.tipo);
                        sessionStorage.setItem("usuario", usuario);
                        sessionStorage.setItem("clave", md5(clave));
                        sessionStorage.setItem("id_usuario",response.data.usuario.id_usuario) ;
                        sessionStorage.setItem("tipo", response.data.usuario.tipo);
                        sessionStorage.setItem("api_session", response.data.api_session);
                        sessionStorage.setItem("ultima_accion", new Date() / 1000);
                        console.log(sessionStorage.ultima_accion)
                        props.setError(null);
                        if(response.data.usuario.tipo=="normal"){
                            navigate("/");
                        }else{
                            navigate("/mis_componentes");
                        }
                       
                    } else {
                        props.setError("Credenciales incorrectas");
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }
    function comprobarDatos(){
        if(usuario==null||usuario==""){
            setUsuario("")
        }
        if(clave==null||clave==""){
            setClave("")
        }
        if(clave!=""&&usuario!=""){
            log_user()
        }
    }
    function handle_change_input(event, setter) {
        setter(event.target.value);

    }
    return (<>
    <h2>Login</h2>
    <div id="wrapper_login">
        <div>
            <label>Nombre de usuario:</label>
            <Input onChange={(event) => handle_change_input(event, setUsuario)} invalid={(usuario=="")?true:false}></Input>
            <FormFeedback>Campo obligatorio</FormFeedback>   
        </div>
        <div>
            <label>Contraseña:</label>
            <Input type="password" onChange={(event) => handle_change_input(event, setClave)} invalid={(clave=="")?true:false}></Input>
            <FormFeedback>Campo obligatorio</FormFeedback>   

        </div>

        <div>
            <Button onClick={() => comprobarDatos()}>Iniciar sesion</Button>
        </div>{props.mensaje_error}

    </div></>)
}