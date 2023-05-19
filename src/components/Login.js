import axios from "axios";
import md5 from "md5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "reactstrap";
export function Login(props) {
    const [clave, setClave] = useState("");
    const [usuario, setUsuario] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();
    function log_user() {
        if (clave != "" && usuario != "") {
            axios.post('http://localhost/ProyectoIntegrado/backend/index.php/login', {
                usuario: usuario,
                clave: md5(clave)
            })
                .then(response => {
                    console.log(response);
                    if (response.data.usuario) {
                        console.log(response.data.usuario.tipo)
                        props.log_user(response.data.usuario.tipo);
                        localStorage.setItem("usuario", usuario);
                        localStorage.setItem("clave", md5(clave));
                        localStorage.setItem("tipo", response.data.usuario.tipo);
                        localStorage.setItem("api_session", response.data.api_session);
                        localStorage.setItem("ultima_accion", new Date() / 1000);
                        console.log(localStorage.ultima_accion)
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
    function handle_change_input(event, setter) {
        setter(event.target.value);

    }
    return (<div>
        <div>
            <label>Nombre de usuario:</label>
            <Input onChange={(event) => handle_change_input(event, setUsuario)}></Input>
        </div>
        <div>
            <label>Contraseña:</label>
            <Input onChange={(event) => handle_change_input(event, setClave)}></Input>
        </div>

        <div>
            <Button onClick={() => log_user()}>Iniciar sesion</Button>
        </div>{props.mensaje_error}

    </div>)
}