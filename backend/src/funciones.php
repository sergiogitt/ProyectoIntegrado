<?php
require "src/bd_config.php";

function login($datos,$in_login=true)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta="select * from usuario where nombre_usuario=? and clave=?";
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute($datos);
            if($sentencia->rowCount()>0)
            {
                $respuesta["usuario"]=$sentencia->fetch(PDO::FETCH_ASSOC);
                if($in_login)
                {
                    session_name("api_configurador_pc");
                    session_start();
                    $_SESSION["usuario"]=$datos[0];
                    $_SESSION["clave"]=$datos[1];
                    $_SESSION["tipo"]=$respuesta["usuario"]["tipo"];
                    $_SESSION["id"]=$respuesta["usuario"]["id_usuario"];
                    $respuesta["api_session"]=session_id();
                }
            }
            else
            {
                $respuesta["mensaje"]="Usuario no registrado en BD";
            }
            
        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}
function dataTabla($tabla,$id){
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta="select * from ".$tabla." where id_".$tabla."=?";
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute([$id]);
            if($sentencia->rowCount()>0)
            {
                $respuesta=$sentencia->fetch(PDO::FETCH_ASSOC);
            }
            else
            {
                $respuesta="Equipo no registrado en BD";
            }
            
        }
        catch(PDOException $e)
        {
        
            $respuesta="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    } catch(PDOException $e)
    {
        $respuesta="Imposible conectar. Error:".$e->getMessage();
    }
    return $respuesta;
}
function dataEquipo($id)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta="select * from equipo_configurado where id_equipo=?";
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute([$id]);
            if($sentencia->rowCount()>0)
            {
                $resultados=$sentencia->fetch(PDO::FETCH_ASSOC);
                $respuesta["p"]=$resultados;
                $coste = 0;

                $atributos = array(
                  "procesador" => "id_procesador",
                  "placa_base" => "id_placa_base",
                  "tarjeta_grafica" => "id_tarjeta_grafica",
                  "fuente_alimentacion" => "id_fuente_alimentacion",
                  "ram" => "id_ram",
                  "refrigeracion_liquida" => "id_refrigeracion_liquida",
                  "torre" => "id_torre",
                  "disco_duro" => "id_disco_duro",
                  "cooler_procesador" => "id_cooler_procesador",
                  "sistema_operativo" => "id_sistema_operativo",
                  "ventilador" => "id_ventilador"
                );
                
                foreach ($atributos as $atributo => $clave) {
                  $respuesta[$atributo] = dataTabla($atributo, $respuesta["p"][$clave]);
                  if(isset($respuesta[$atributo]["precio_" . $atributo])){
                    $coste += $respuesta[$atributo]["precio_" . $atributo];
                  }
                }
                
                $respuesta["coste"]=$coste;
                
            }
            else
            {
                $respuesta["mensaje"]="Equipo no registrado en BD";
            }
            
        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}
function createUser($request)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta="insert into usuario(nombre_usuario,clave,correo_electronico) values(?,?,?)";
            $sentencia=$conexion->prepare($consulta);
            $datos[]=$request[0];
            $datos[]=$request[1];
            $datos[]=$request[2];
            $sentencia->execute($datos);
           
            $respuesta=login([$request[0],$request[1]],true);
            
            
        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}
function createCompany($request)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta="insert into usuario(nombre_usuario,clave,correo_electronico,nombre_empresa,cif_empresa,tipo) values(?,?,?,?,?,?)";
            $sentencia=$conexion->prepare($consulta);
            $datos[]=$request[0];
            $datos[]=$request[1];
            $datos[]=$request[2];
            $datos[]=$request[3];
            $datos[]=$request[4];

            $datos[]="empresa";
            $sentencia->execute($datos);
           
            $respuesta=login([$request[0],$request[1]],true);
            
            
        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}

function catalogo_videojuegos()
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta="select * from videojuego";
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute();
            $respuesta["videojuegos"]=$sentencia->fetchAll(PDO::FETCH_ASSOC);
            
        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}
function equipoOfimatica($precio)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $precioTotal=0;
            $precioItem=$precio*0.25;
            $calor=0;
            $consulta="select * from procesador where precio_procesador<=? order by precio_procesador  desc limit 1";
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute([$precioItem]);
            $respuesta["procesador"]=$sentencia->fetch(PDO::FETCH_ASSOC);
            $socket=$respuesta["procesador"]["socket_procesador"];
            $calor+=$respuesta["procesador"]["vatios_procesador"];
            $precioTotal+=$respuesta["procesador"]["precio_procesador"];
            $acarreo=$precioItem-$respuesta["procesador"]["precio_procesador"];

            
            $precioItem=$precio*0.15+$acarreo;
            $consulta = "SELECT * FROM placa_base WHERE precio_placa_base <= ? AND socket_placa_base = ? ORDER BY precio_placa_base desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem, $socket]);
            $respuesta["placa_base"]=$sentencia->fetch(PDO::FETCH_ASSOC);
            $idTipoEstructura= $respuesta["placa_base"]["id_tipo_estructura"];
            $acarreo=$precioItem-$respuesta["placa_base"]["precio_placa_base"];
            $precioTotal+=$respuesta["placa_base"]["precio_placa_base"];

            $precioItem=$precio*0.15+$acarreo;
            $consulta = "SELECT * FROM tarjeta_grafica WHERE precio_tarjeta_grafica <= ? ORDER BY precio_tarjeta_grafica desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem]);
            $respuesta["tarjeta_grafica"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $tamanyoTarjeta=$respuesta["tarjeta_grafica"]["altura_tarjeta_grafica"];
            $calor+=$respuesta["tarjeta_grafica"]["vatios_tarjeta_grafica"];
            $acarreo=$precioItem-$respuesta["tarjeta_grafica"]["precio_tarjeta_grafica"];
            $precioTotal+=$respuesta["tarjeta_grafica"]["precio_tarjeta_grafica"];

            $precioItem=$precio*0.1+$acarreo;
            $consulta = "SELECT * FROM disco_duro WHERE precio_disco_duro <= ? ORDER BY precio_disco_duro desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem]);
            $respuesta["disco_duro"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["disco_duro"]["precio_disco_duro"];
            $precioTotal+=$respuesta["disco_duro"]["precio_disco_duro"];

            $precioItem=$precio*0.05+$acarreo;
            $consulta = "SELECT * FROM torre WHERE precio_torre <= ? and profundidad_torre>= ? and id_tipo_estructura=? ORDER BY precio_torre desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem,$tamanyoTarjeta,$idTipoEstructura]);
            $respuesta["torre"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["torre"]["precio_torre"];
            $precioTotal+=$respuesta["torre"]["precio_torre"];

            $precioItem=$precio*0.1+$acarreo;
            $consulta = "SELECT * FROM ram WHERE precio_ram <= ? ORDER BY precio_ram desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem]);
            $respuesta["ram"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["ram"]["precio_ram"];
            $precioTotal+=$respuesta["ram"]["precio_ram"];

            $precioItem=$precio*0.1+$acarreo;
            $consulta = "SELECT * FROM refrigeracion_liquida WHERE precio_refrigeracion_liquida <= ? ORDER BY precio_refrigeracion_liquida desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem]);
            $respuesta["refrigeracion_liquida"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["refrigeracion_liquida"]["precio_refrigeracion_liquida"];
            $calor+=$respuesta["refrigeracion_liquida"]["vatios_refrigeracion_liquida"];
            $precioTotal+=$respuesta["refrigeracion_liquida"]["precio_refrigeracion_liquida"];

            $precioItem=$precio*0.1+$acarreo;
            $consulta = "SELECT * FROM fuente_alimentacion WHERE precio_fuente_alimentacion <= ? and vatios_fuente_alimentacion>? ORDER BY precio_fuente_alimentacion desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem,$calor]);
            $respuesta["fuente_alimentacion"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["fuente_alimentacion"]["precio_fuente_alimentacion"];
            $calor+=$respuesta["fuente_alimentacion"]["vatios_fuente_alimentacion"];
            $precioTotal+=$respuesta["fuente_alimentacion"]["precio_fuente_alimentacion"];
            $respuesta["coste"]=$precioTotal;
        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}
function equipoDesign($precio)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            
            $precioItem=$precio*0.2;
            $calor=0;
            $precioTotal=0;
            $consulta = "SELECT * FROM procesador WHERE precio_procesador <= ? ORDER BY precio_procesador DESC LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem]);
            $respuesta["procesador"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $socket = $respuesta["procesador"]["socket_procesador"];
            $calor += $respuesta["procesador"]["vatios_procesador"];
            $acarreo = $precioItem - $respuesta["procesador"]["precio_procesador"];
            $precioTotal+=$respuesta["procesador"]["precio_procesador"];

            
            $precioItem=$precio*0.1+$acarreo;
            $consulta = "SELECT * FROM placa_base WHERE precio_placa_base <= ? AND socket_placa_base = ? ORDER BY precio_placa_base desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem, $socket]);
            $respuesta["placa_base"]=$sentencia->fetch(PDO::FETCH_ASSOC);
            $idTipoEstructura= $respuesta["placa_base"]["id_tipo_estructura"];
            $acarreo=$precioItem-$respuesta["placa_base"]["precio_placa_base"];
            $precioTotal+=$respuesta["placa_base"]["precio_placa_base"];


            $precioItem=$precio*0.35+$acarreo;
            $consulta = "SELECT * FROM tarjeta_grafica WHERE precio_tarjeta_grafica <= ? and modelo_tarjeta_grafica like '%quadro%' ORDER BY precio_tarjeta_grafica desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem]);
            $respuesta["tarjeta_grafica"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $tamanyoTarjeta=$respuesta["tarjeta_grafica"]["altura_tarjeta_grafica"];
            $calor+=$respuesta["tarjeta_grafica"]["vatios_tarjeta_grafica"];
            $acarreo=$precioItem-$respuesta["tarjeta_grafica"]["precio_tarjeta_grafica"];
            $precioTotal+=$respuesta["tarjeta_grafica"]["precio_tarjeta_grafica"];


            $precioItem=$precio*0.05+$acarreo;
            $consulta = "SELECT * FROM disco_duro WHERE precio_disco_duro <= ? ORDER BY precio_disco_duro desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem]);
            $respuesta["disco_duro"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["disco_duro"]["precio_disco_duro"];
            $precioTotal+=$respuesta["disco_duro"]["precio_disco_duro"];


            $precioItem=$precio*0.05+$acarreo;
            $consulta = "SELECT * FROM torre WHERE precio_torre <= ? and profundidad_torre>= ? and id_tipo_estructura=? ORDER BY precio_torre desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem,$tamanyoTarjeta,$idTipoEstructura]);
            $respuesta["torre"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["torre"]["precio_torre"];
            $precioTotal+=$respuesta["torre"]["precio_torre"];


            $precioItem=$precio*0.1+$acarreo;
            $consulta = "SELECT * FROM ram WHERE precio_ram <= ? ORDER BY precio_ram desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem]);
            $respuesta["ram"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["ram"]["precio_ram"];
            $precioTotal+=$respuesta["ram"]["precio_ram"];


            $precioItem=$precio*0.1+$acarreo;
            $consulta = "SELECT * FROM refrigeracion_liquida WHERE precio_refrigeracion_liquida <= ? ORDER BY precio_refrigeracion_liquida desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem]);
            $respuesta["refrigeracion_liquida"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["refrigeracion_liquida"]["precio_refrigeracion_liquida"];
            $calor+=$respuesta["refrigeracion_liquida"]["vatios_refrigeracion_liquida"];
            $precioTotal+=$respuesta["refrigeracion_liquida"]["precio_refrigeracion_liquida"];


            $precioItem=$precio*0.05+$acarreo;
            $consulta = "SELECT * FROM fuente_alimentacion WHERE precio_fuente_alimentacion <= ? and vatios_fuente_alimentacion>? ORDER BY precio_fuente_alimentacion desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem,$calor]);
            $respuesta["fuente_alimentacion"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["fuente_alimentacion"]["precio_fuente_alimentacion"];
            $calor+=$respuesta["fuente_alimentacion"]["vatios_fuente_alimentacion"];
            $precioTotal+=$respuesta["fuente_alimentacion"]["precio_fuente_alimentacion"];
            $respuesta["coste"]=$precioTotal;


        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}

function equipoGaming($puntuacion_procesador,$puntuacion_tarjeta)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $precioTotal=0;
            $calor=0;
            $consulta = "SELECT * FROM procesador WHERE benchmark_procesador >= ?  ORDER BY benchmark_procesador";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$puntuacion_procesador]);
            $respuesta["procesador"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $socket = $respuesta["procesador"]["socket_procesador"];
            $calor += $respuesta["procesador"]["vatios_procesador"];
            $precioTotal+=$respuesta["procesador"]["precio_procesador"];

            
            
            $consulta = "SELECT * FROM placa_base WHERE precio_placa_base <= ? AND socket_placa_base = ? ORDER BY precio_placa_base desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$respuesta["procesador"]["precio_procesador"]*0.7,$socket]);
            $respuesta["placa_base"]=$sentencia->fetch(PDO::FETCH_ASSOC);
            $idTipoEstructura= $respuesta["placa_base"]["id_tipo_estructura"];
            $precioTotal+=$respuesta["placa_base"]["precio_placa_base"];

            $consulta = "SELECT * FROM tarjeta_grafica WHERE benchmark_tarjeta_grafica >= ? ORDER BY benchmark_tarjeta_grafica LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$puntuacion_tarjeta]);
            $respuesta["tarjeta_grafica"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $tamanyoTarjeta=$respuesta["tarjeta_grafica"]["altura_tarjeta_grafica"];
            $calor+=$respuesta["tarjeta_grafica"]["vatios_tarjeta_grafica"];
            $precioTotal+=$respuesta["tarjeta_grafica"]["precio_tarjeta_grafica"];

            $consulta = "SELECT * FROM disco_duro WHERE precio_disco_duro <= 80 ORDER BY precio_disco_duro desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([]);
            $respuesta["disco_duro"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $precioTotal+=$respuesta["disco_duro"]["precio_disco_duro"];

            $consulta = "SELECT * FROM torre WHERE precio_torre <= 70 and profundidad_torre>= ? and id_tipo_estructura=? ORDER BY precio_torre desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$tamanyoTarjeta,$idTipoEstructura]);
            $respuesta["torre"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $precioTotal+=$respuesta["torre"]["precio_torre"];

            $consulta = "SELECT * FROM ram WHERE precio_ram <= 80 ORDER BY precio_ram desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([]);
            $respuesta["ram"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $precioTotal+=$respuesta["ram"]["precio_ram"];

            $consulta = "SELECT * FROM refrigeracion_liquida WHERE precio_refrigeracion_liquida <= 170 ORDER BY precio_refrigeracion_liquida desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([]);
            $respuesta["refrigeracion_liquida"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $calor+=$respuesta["refrigeracion_liquida"]["vatios_refrigeracion_liquida"];
            $precioTotal+=$respuesta["refrigeracion_liquida"]["precio_refrigeracion_liquida"];

            $consulta = "SELECT * FROM fuente_alimentacion WHERE precio_fuente_alimentacion <= 100 and vatios_fuente_alimentacion>? ORDER BY precio_fuente_alimentacion desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$calor]);
            $respuesta["fuente_alimentacion"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $precioTotal+=$respuesta["fuente_alimentacion"]["precio_fuente_alimentacion"];
            $respuesta["coste"]=$precioTotal;
        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}
function estructuras()
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta="select * from tipo_estructura";
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute();
            $respuesta["estructuras"]=$sentencia->fetchAll(PDO::FETCH_ASSOC);
            
        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}
function estructura($id)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta="select * from tipo_estructura where id_tipo_estructura=?";
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute([$id]);
            $respuesta["estructura"]=$sentencia->fetch(PDO::FETCH_ASSOC);
            
        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}
function getComponents($tabla,$offset,$buscador)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta;
            $marca="marca_".$tabla;
            $marca="modelo_".$tabla;
            $datos=[];
            if($buscador){
                $consulta = "SELECT * FROM ".$tabla." WHERE LOWER(".$marca.") LIKE LOWER('%".$buscador."%') LIMIT 4 OFFSET ".$offset;
                //$datos[]=$buscador;
            }else{
                $consulta="select * from ".$tabla." limit 4 offset ".$offset;
            }
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute($datos);
            $tuplas=$sentencia->fetchAll(PDO::FETCH_ASSOC);
            $respuesta["elements"] = array_slice($tuplas, 0, 3);
            $respuesta["cons"] = $consulta;
            $respuesta["hasMoreRows"] = $sentencia->rowCount()==4;

            
            
        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}
function getComponentesEmpresa($id,$tipo)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta="select * from ".$tipo." where id_anunciante_".$tipo."=?";
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute([$id]);
            $respuesta["elements"]=$sentencia->fetchAll(PDO::FETCH_ASSOC);
           

            
            
        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}

function obtener_familias()
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta="select * from familia";
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute();
            $respuesta["familias"]=$sentencia->fetchAll(PDO::FETCH_ASSOC);
            
        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}

function obtener_producto($cod)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta="select * from producto where cod=?";
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute([$cod]);
            $respuesta["producto"]=$sentencia->fetch(PDO::FETCH_ASSOC);
            
        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}

function equipos($cod)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta = "SELECT equipo_configurado.*, procesador.modelo_procesador, tarjeta_grafica.modelo_tarjeta_grafica, placa_base.modelo_placa_base, disco_duro.modelo_disco_duro, refrigeracion_liquida.modelo_refrigeracion_liquida, ram.modelo_ram
            FROM equipo_configurado
            LEFT JOIN procesador ON equipo_configurado.id_procesador = procesador.id_procesador
            LEFT JOIN tarjeta_grafica ON equipo_configurado.id_tarjeta_grafica = tarjeta_grafica.id_tarjeta_grafica
            LEFT JOIN placa_base ON equipo_configurado.id_placa_base = placa_base.id_placa_base
            LEFT JOIN disco_duro ON equipo_configurado.id_disco_duro = disco_duro.id_disco_duro
            LEFT JOIN refrigeracion_liquida ON equipo_configurado.id_refrigeracion_liquida = refrigeracion_liquida.id_refrigeracion_liquida
            LEFT JOIN ram ON equipo_configurado.id_ram = ram.id_ram
            WHERE equipo_configurado.id_usuario = ?";

           $sentencia=$conexion->prepare($consulta);
            $sentencia->execute([$cod]);
            $respuesta["equipos"]=$sentencia->fetchAll(PDO::FETCH_ASSOC);
            
        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}
function guardarConfiguracion($datos)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta="insert into equipo_configurado (id_procesador,id_placa_base,id_fuente_alimentacion,id_ram,id_refrigeracion_liquida,id_torre,id_disco_duro,id_tarjeta_grafica,id_cooler_procesador,id_sistema_operativo,id_ventilador,id_usuario) values (?,?,?,?,?,?,?,?,?,?,?,?)";
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute($datos);
            $respuesta["componente_insertado"]=$conexion->lastInsertId();
            
            
        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}
function insertar_producto($datos)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta="insert into producto (cod,nombre,nombre_corto,descripcion,PVP,familia) values (?,?,?,?,?,?)";
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute($datos);
            $respuesta["mensaje"]=$datos[0];
            
        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}

function actualizarComponente($datos,$componente)
{
    try {
        $conexion = new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD, USUARIO_BD, CLAVE_BD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try {
            $consulta="";
            switch($componente){
                case "procesador":
                $consulta="UPDATE procesador SET marca_".$componente."=?, modelo_".$componente."=?, precio_".$componente."=?,url_".$componente."=?, vatios_procesador=?,benchmark_procesador=? , socket_procesador=? WHERE id_".$componente."=?";
                break;
                case "placa_base":
                    $consulta="UPDATE ".$componente." SET marca_".$componente."=?, modelo_".$componente."=?, precio_".$componente."=?,url_".$componente."=?, id_tipo_estructura =?,socket_placa_base=?  WHERE id_".$componente."=?";
                    break;
                case "cooler_procesador":
                    $consulta="UPDATE ".$componente." SET marca_".$componente."=?, modelo_".$componente."=?, precio_".$componente."=?,url_".$componente."=?, altura_cooler_procesador =?,cantidad_refrigeracion_cooler_procesador=?  WHERE id_".$componente."=?";
                    break;
                case "disco_duro":
                    $consulta="UPDATE ".$componente." SET marca_".$componente."=?, modelo_".$componente."=?, precio_".$componente."=?,url_".$componente."=?, capacidad_disco_duro =?,tipo_disco_duro=?  WHERE id_".$componente."=?";
                    break;
                case "fuente_alimentacion":
                    $consulta="UPDATE ".$componente." SET marca_".$componente."=?, modelo_".$componente."=?, precio_".$componente."=?,url_".$componente."=?, vatios_fuente_alimentacion =?,calor_producido_fuente_alimentacion=?  WHERE id_".$componente."=?";
                    break;
                case "ram":
                    $consulta="UPDATE ".$componente." SET marca_".$componente."=?, modelo_".$componente."=?, precio_".$componente."=?,url_".$componente."=?, velocidad_ram =?,tipo_ram=?,gb_ram=?  WHERE id_".$componente."=?";
                    break;
                case "refrigeracion_liquida":
                    $consulta="UPDATE ".$componente." SET marca_".$componente."=?, modelo_".$componente."=?, precio_".$componente."=?,url_".$componente."=?, anchura_refrigeracion_liquida =?,maximo_calor_refrigerado_refrigeracion_liquida=?,vatios_refrigeracion_liquida=?  WHERE id_".$componente."=?";
                    break;
                case "sistema_operativo":
                    $consulta="UPDATE ".$componente." SET marca_".$componente."=?, modelo_".$componente."=?, precio_".$componente."=?,url_".$componente."=? WHERE id_".$componente."=?";
                    break;
                case "tarjeta_grafica":
                    $consulta="UPDATE ".$componente." SET marca_".$componente."=?, modelo_".$componente."=?, precio_".$componente."=?,url_".$componente."=?, vatios_tarjeta_grafica =?,benchmark_tarjeta_grafica=?,altura_tarjeta_grafica=?  WHERE id_".$componente."=?";
                    break;
                case "torre":
                    $consulta="UPDATE ".$componente." SET marca_".$componente."=?, modelo_".$componente."=?, precio_".$componente."=?,url_".$componente."=?, id_tipo_estructura  =?,anchura_torre=?,profundidad_torre=?  WHERE id_".$componente."=?";
                    break;
                case "ventilador":
                    $consulta="UPDATE ".$componente." SET marca_".$componente."=?, modelo_".$componente."=?, precio_".$componente."=?,url_".$componente."=?, altura_ventilador  =?,maxima_cantidad_vn=?  WHERE id_".$componente."=?";
                    break;
            }
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute($datos);
            $respuesta["equipo"] = "Componente actualizado correctamente";
        } catch (PDOException $e) {
            $respuesta["mensaje_error"] = "Imposible realizar la consulta. Error: ".$e->getMessage();
        }
        $sentencia = null;
        $conexion = null;
    } catch (PDOException $e) {
        $respuesta["mensaje_error"] = "Imposible conectar. Error: ".$e->getMessage();
    }
    

    
    return $respuesta;
}
function editarEquipo($datos)
{
    try {
        $conexion = new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD, USUARIO_BD, CLAVE_BD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try {
            $consulta = "UPDATE equipo_configurado SET id_procesador=?, id_placa_base=?, id_fuente_alimentacion=?, id_ram=?, id_refrigeracion_liquida=?, id_torre=?, id_disco_duro=?, id_tarjeta_grafica=?, id_cooler_procesador=?, id_sistema_operativo=?, id_ventilador=? WHERE id_equipo=?";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute($datos);
            $respuesta["equipo"] = "Equipo configurado correctamente";
        } catch (PDOException $e) {
            $respuesta["mensaje_error"] = "Imposible realizar la consulta. Error: ".$e->getMessage();
        }
        $sentencia = null;
        $conexion = null;
    } catch (PDOException $e) {
        $respuesta["mensaje_error"] = "Imposible conectar. Error: ".$e->getMessage();
    }
    

    
    return $respuesta;
}
function conexion2()
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        
        $respuesta["todobien"]="COnecion realizada con exito";
        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}
function borrar_producto($cod)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta="delete from producto where cod=?";
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute([$cod]);
            $respuesta["mensaje"]=$cod;
        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}
function conexion()
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        $respuesta["todobien"]="COnecion realizada con exito";
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}
function repetido($tabla,$columna,$valor,$columna_clave=null,$valor_clave=null)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            if(isset($columna_clave))
            {
                $consulta="select ".$columna." from ".$tabla." where ".$columna."=? and ".$columna_clave."<>?";
                $datos[]=$valor;
                $datos[]=$valor_clave;
            }
            else
            {
                $consulta="select ".$columna." from ".$tabla." where ".$columna."=?";
                $datos[]=$valor;
            }

            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute($datos);
            $respuesta["repetido"]=$sentencia->rowCount()>0;
        }
        catch(PDOException $e)
        {
        
            $respuesta["mensaje_error"]="Imposible realizar la consulta. Error:".$e->getMessage();
        }

        $sentencia=null;
        $conexion=null; 
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }

    
    return $respuesta;
}
?>