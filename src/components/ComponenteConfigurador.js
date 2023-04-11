import { useState } from "react";
import {DevicesFromComponent} from './DevicesFromComponent';
function ComponenteConfigurador(props){
    const [open,setOpen]=useState(false);
    let renderObj=[];
    renderObj.push(<div onClick={()=>setOpen(!open)}>{props.nombre}<span>+</span></div>)
    if(open){
        renderObj.push(<DevicesFromComponent></DevicesFromComponent>)
    }
    return(<div>{renderObj}</div>)
}
export default ComponenteConfigurador;