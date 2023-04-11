import { Button,Input } from "reactstrap"
export function FormularioRegistroEmpresa(props){
    return(<div>
        <div>
            <label>Nombre de la emrpesa:</label>
            <Input></Input>
        </div>
        <div>
            <label>CIF:</label>
            <Input></Input>
        </div>
        <div>
            <label>Tipo de empresa (sociedad limitada, sociedad anónima, etc.):</label>
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