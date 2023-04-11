
import { Input } from "reactstrap";
export function DevicesFromComponent(props){
    function showDevices(){
        
    }
    return(<><Input placeholder="Introduce un criterio de busqueda" onChange={()=>showDevices()}></Input></>);
}
export default DevicesFromComponent;