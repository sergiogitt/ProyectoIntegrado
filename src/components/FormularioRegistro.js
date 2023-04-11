import { Button,Input } from "reactstrap"
export function FormularioRegistro(props){
    return(<div>
        <div>
            <label>Nombre de usuario:</label>
            <Input></Input>
        </div>
        <div>
            <label>Contraseña:</label>
            <Input></Input>
        </div>
        <div>
            <label>Repita la contraseña:</label>
            <Input></Input>
        </div>
        <div>
            <Button>Registrarse</Button>
        </div>

    </div>)
}