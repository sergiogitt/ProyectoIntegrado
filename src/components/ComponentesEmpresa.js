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
    let nombres_categorias = { "cooler_procesador": "Coolers para procesador", "disco_duro": "Discos duros", "fuente_alimentacion": "Fuentes de alimentacion", "placa_base": "Placas base", "procesador": "Procesadores",  "torre": "Torres",
    "ram": "Memorias ram", "refrigeracion_liquida": "Refrigeraciones liquida", "sistema_operativo": "Sistemas operativos",  "tarjeta_grafica": "Tarjetas graficas",  "ventilador": "Ventiladores", };
    function getComponent(componente){
        axios.post(DIR_SERV+'/componentes_empresa', {
            api_session:sessionStorage.api_session,
            tipo_componente:componente
        })
            .then(response => {
                console.log(response);
                numero_componentes++;
                let componentes_aux=componentes;
                let header=false;

                response.data.elements.forEach(element => {
                    if(!header){
                        componentes_aux.push(<h2>{nombres_categorias[componente]}</h2>)
                    }
                    componentes_aux.push(<ComponenteEmpresa seguridad={props.seguridad} data={element} tabla={componente}></ComponenteEmpresa>)
                });
                setComponentes(componentes_aux)
               
                if(numero_componentes==10){
                    setCargando(false)
                    
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    useEffect(() => {
        // get the data from sessionStorage when the component mounts
        
        if (sessionStorage.tipo!="empresa") {
          navigate("/");
        }
       
        setCargando(true)
        getComponent("cooler_procesador");
        getComponent("disco_duro");
        getComponent("fuente_alimentacion");
        getComponent("placa_base");
        getComponent("procesador");
        getComponent("ram");
        getComponent("torre");
        getComponent("refrigeracion_liquida");
        getComponent("sistema_operativo");
        getComponent("tarjeta_grafica")
        getComponent("ventilador")
      }, []);
    return(<div id="componentes_empresa">
      <h1>Mis componentes</h1>
{(cargando)?(<div class="spinner"><Spinner animation="border" role="status">
               <span className="visually-hidden">Loading...</span>
             </Spinner></div>):(componentes)}
     
    </div>)
    }