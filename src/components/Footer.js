import { useNavigate } from "react-router-dom";
import '../style_components/Footer.css';
import { DIR_PUBLIC } from "../variables";
export function Footer(props){

  
    return(<footer>
      <span>Siguenos en nuestras redes sociales</span>
      <div class="redes">
        <img src={DIR_PUBLIC+"/public/assets/instagram.svg"}/>
        <img src={DIR_PUBLIC+"/public/assets/twitter.svg"}/>
      </div>
      <span>© MASTERBUILDER, todos los derechos reservados.</span>
    </footer>)
    }