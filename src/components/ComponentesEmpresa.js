import { useNavigate } from "react-router-dom";
import '../style_components/ComponentesEmpresa.css';
import { DIR_PUBLIC, DIR_SERV } from "../variables";
import { useEffect,useState } from "react";
import axios from "axios";
import { Spinner } from "reactstrap";
import { ComponenteEmpresa } from "./ComponenteEmpresa";
export function ComponentesEmpresa(props){
    const navigate = useNavigate();
    const [componentes, setComponentes] = useState([]);
    const [cargando, setCargando] = useState(false);
    let numero_componentes=0;
    function getComponent(componente){
        axios.post(DIR_SERV+'/componentes_empresa', {
            api_session:localStorage.api_session,
            tipo_componente:componente
        })
            .then(response => {
                console.log(response);
                numero_componentes++;
                let componentes_aux=componentes;
                response.data.elements.forEach(element => {
                    componentes_aux.push(<ComponenteEmpresa seguridad={props.seguridad} data={element} tabla={componente}></ComponenteEmpresa>)
                });
                setComponentes(componentes_aux)
               
                if(numero_componentes==10){
                    setCargando(false)
                    console.log(componentes)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    useEffect(() => {
        // get the data from localStorage when the component mounts
        
        if (localStorage.tipo!="empresa") {
          navigate("/");
        }
        setCargando(true)
        getComponent("cooler_procesador");
        getComponent("disco_duro");
        getComponent("fuente_alimentacion");
        getComponent("placa_base");
        getComponent("procesador");
        getComponent("ram");
        getComponent("refrigeracion_liquida");
        getComponent("sistema_operativo");
        getComponent("tarjeta_grafica")
        getComponent("ventilador")
      }, []);
    return(<div id="componentes_empresa">
      <h2>Mis componentes</h2>
{(cargando)?(<div class="spinner"><Spinner animation="border" role="status">
               <span className="visually-hidden">Loading...</span>
             </Spinner></div>):(componentes)}
     
    </div>)
    }