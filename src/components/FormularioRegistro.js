import axios from "axios";
import { useState } from "react";
import { Button, Input, Label, FormGroup, FormFeedback, FormText } from "reactstrap";
import { DIR_SERV } from "../variables";
export function FormularioRegistro(props) {
    const [nombre, setNombre] = useState("");
    const [clave1, setClave1] = useState("");
    const [clave2, setClave2] = useState("");
    const [email, setEmail] = useState("");
    const [usuario, setUsuario] = useState("");
    const [error, setError] = useState("");
    const [repetido, setRepetido] = useState(false);
    const [campos_vacios, setCampo_vacio] = useState([false, false, false, false]);
    function handle_change_input(event, setter) {
        setter(event.target.value);

    }
    function comprobar_campo_vacio(campo, indice) {
        setCampo_vacio(prevState => {
            let aux = [...prevState];
            aux[indice] = campo == "";
            if(campo==usuario){
                setError("Campo obligatorio");
                if(campo!=""){
                    comprobar_usuario_repetido()
                }
                
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
        if (clave1 == clave2) {
          
            if (nombre != "" && usuario != "" && clave1 != "" && clave2 != ""&&repetido) {
                //Registrar usuario en la BD
                console.log("inserto")
            }

        } else {
            setCampo_vacio(prevState => {
                let aux = [...prevState];
                aux[2] = true;
                return aux;
            });
        }

    }
    return (<div>
        <FormGroup>
            <Label for="examplePassword">Nombre de usuario</Label>
            {(campos_vacios[0]) ? <Input invalid onChange={(event) => handle_change_input(event, setUsuario)} /> : <Input onChange={(event) => handle_change_input(event, setUsuario)} />}
            <FormFeedback>{error}</FormFeedback>        
            </FormGroup>
        <FormGroup>
            <Label for="examplePassword">Nombre completo</Label>
            {(campos_vacios[1]) ? <Input invalid onChange={(event) => handle_change_input(event, setNombre)} /> : <Input onChange={(event) => handle_change_input(event, setNombre)} />}
            <FormFeedback>Campo obligatorio</FormFeedback>
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


        <div>
            <Button onClick={() => comprobar_datos()}>Registrarse</Button>
        </div>

    </div>)
}