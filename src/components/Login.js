import { useState } from "react";
import { Button,Input } from "reactstrap";
export function Login(props){
    const [clave,setClave]=useState(null);
    const [usuario,setUsuario]=useState(null);

    function log_user(){
        if(clave!=""&&usuario!=""){
            axios.post('https://example.com/api/data', {
                usuario: usuario,
                clave: clave
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        }
       
    }
    function handle_change_input(event,setter){
        setter(event.target.value);
        
    }
    return(<div>
        <div>
            <label>Nombre de usuario:</label>
            <Input onChange={(event) => handle_change_input(event,setUsuario)}></Input>
        </div>
        <div>
            <label>Contraseña:</label>
            <Input onChange={(event) => handle_change_input(event,setClave)}></Input>
        </div>
       
        <div>
            <Button onClick={log_user()}>Iniciar sesion</Button>
        </div>

    </div>)
}