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
            $precioItem=$precio*0.25;
            $calor=0;
            $consulta="select * from procesador where precio_procesador<=".$precioItem." order by precio_procesador  desc limit 1";
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute();
            $respuesta["procesador"]=$sentencia->fetch(PDO::FETCH_ASSOC);
            $socket=$respuesta["procesador"]["socket_procesador"];
            $calor+=$respuesta["procesador"]["vatios_procesador"];
            $acarreo=$precioItem-$respuesta["procesador"]["precio_procesador"];
            
            $precioItem=$precio*0.15+$acarreo;
            $consulta = "SELECT * FROM placa_base WHERE precio_placa_base <= ? AND socket_placa_base = ? ORDER BY precio_placa_base desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem, $socket]);
            $respuesta["placa_base"]=$sentencia->fetch(PDO::FETCH_ASSOC);
            $idTipoEstructura= $respuesta["placa_base"]["id_tipo_estructura"];
            $acarreo=$precioItem-$respuesta["placa_base"]["precio_placa_base"];

            $precioItem=$precio*0.15+$acarreo;
            $consulta = "SELECT * FROM tarjeta_grafica WHERE precio_tarjeta_grafica <= ? ORDER BY precio_tarjeta_grafica desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem]);
            $respuesta["tarjeta_grafica"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $tamanyoTarjeta=$respuesta["tarjeta_grafica"]["altura_tarjeta_grafica"];
            $calor+=$respuesta["tarjeta_grafica"]["vatios_tarjeta_grafica"];
            $acarreo=$precioItem-$respuesta["tarjeta_grafica"]["precio_tarjeta_grafica"];

            $precioItem=$precio*0.1+$acarreo;
            $consulta = "SELECT * FROM disco_duro WHERE precio_disco_duro <= ? ORDER BY precio_disco_duro desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem]);
            $respuesta["disco_duro"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["disco_duro"]["precio_disco_duro"];

            $precioItem=$precio*0.05+$acarreo;
            $consulta = "SELECT * FROM torre WHERE precio_torre <= ? and profundidad_torre>= ? and id_tipo_estructura=? ORDER BY precio_torre desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem,$tamanyoTarjeta,$idTipoEstructura]);
            $respuesta["torre"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["torre"]["precio_torre"];

            $precioItem=$precio*0.1+$acarreo;
            $consulta = "SELECT * FROM ram WHERE precio_ram <= ? ORDER BY precio_ram desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem]);
            $respuesta["ram"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["ram"]["precio_ram"];

            $precioItem=$precio*0.1+$acarreo;
            $consulta = "SELECT * FROM refrigeracion_liquida WHERE precio_refrigeracion_liquida <= ? ORDER BY precio_refrigeracion_liquida desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem]);
            $respuesta["refrigeracion_liquida"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["refrigeracion_liquida"]["precio_refrigeracion_liquida"];
            $calor+=$respuesta["refrigeracion_liquida"]["vatios_refrigeracion_liquida"];

            $precioItem=$precio*0.1+$acarreo;
            $consulta = "SELECT * FROM fuente_alimentacion WHERE precio_fuente_alimentacion <= ? and vatios_fuente_alimentacion>? ORDER BY precio_fuente_alimentacion desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem,$calor]);
            $respuesta["fuente_alimentacion"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["fuente_alimentacion"]["precio_fuente_alimentacion"];
            $calor+=$respuesta["fuente_alimentacion"]["vatios_fuente_alimentacion"];
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
            $consulta="select * from procesador where precio_procesador<=".$precioItem." order by precio_procesador  desc limit 1";
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute();
            $respuesta["procesador"]=$sentencia->fetch(PDO::FETCH_ASSOC);
            $socket=$respuesta["procesador"]["socket_procesador"];
            $calor+=$respuesta["procesador"]["vatios_procesador"];
            $acarreo=$precioItem-$respuesta["procesador"]["precio_procesador"];
            
            $precioItem=$precio*0.1+$acarreo;
            $consulta = "SELECT * FROM placa_base WHERE precio_placa_base <= ? AND socket_placa_base = ? ORDER BY precio_placa_base desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem, $socket]);
            $respuesta["placa_base"]=$sentencia->fetch(PDO::FETCH_ASSOC);
            $idTipoEstructura= $respuesta["placa_base"]["id_tipo_estructura"];
            $acarreo=$precioItem-$respuesta["placa_base"]["precio_placa_base"];

            $precioItem=$precio*0.35+$acarreo;
            $consulta = "SELECT * FROM tarjeta_grafica WHERE precio_tarjeta_grafica <= ? and modelo_tarjeta_grafica like '%quadro%' ORDER BY precio_tarjeta_grafica desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem]);
            $respuesta["tarjeta_grafica"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $tamanyoTarjeta=$respuesta["tarjeta_grafica"]["altura_tarjeta_grafica"];
            $calor+=$respuesta["tarjeta_grafica"]["vatios_tarjeta_grafica"];
            $acarreo=$precioItem-$respuesta["tarjeta_grafica"]["precio_tarjeta_grafica"];

            $precioItem=$precio*0.05+$acarreo;
            $consulta = "SELECT * FROM disco_duro WHERE precio_disco_duro <= ? ORDER BY precio_disco_duro desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem]);
            $respuesta["disco_duro"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["disco_duro"]["precio_disco_duro"];

            $precioItem=$precio*0.05+$acarreo;
            $consulta = "SELECT * FROM torre WHERE precio_torre <= ? and profundidad_torre>= ? and id_tipo_estructura=? ORDER BY precio_torre desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem,$tamanyoTarjeta,$idTipoEstructura]);
            $respuesta["torre"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["torre"]["precio_torre"];

            $precioItem=$precio*0.1+$acarreo;
            $consulta = "SELECT * FROM ram WHERE precio_ram <= ? ORDER BY precio_ram desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem]);
            $respuesta["ram"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["ram"]["precio_ram"];

            $precioItem=$precio*0.1+$acarreo;
            $consulta = "SELECT * FROM refrigeracion_liquida WHERE precio_refrigeracion_liquida <= ? ORDER BY precio_refrigeracion_liquida desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem]);
            $respuesta["refrigeracion_liquida"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["refrigeracion_liquida"]["precio_refrigeracion_liquida"];
            $calor+=$respuesta["refrigeracion_liquida"]["vatios_refrigeracion_liquida"];

            $precioItem=$precio*0.05+$acarreo;
            $consulta = "SELECT * FROM fuente_alimentacion WHERE precio_fuente_alimentacion <= ? and vatios_fuente_alimentacion>? ORDER BY precio_fuente_alimentacion desc LIMIT 1";
            $sentencia = $conexion->prepare($consulta);
            $sentencia->execute([$precioItem,$calor]);
            $respuesta["fuente_alimentacion"] = $sentencia->fetch(PDO::FETCH_ASSOC);
            $acarreo=$precioItem-$respuesta["fuente_alimentacion"]["precio_fuente_alimentacion"];
            $calor+=$respuesta["fuente_alimentacion"]["vatios_fuente_alimentacion"];
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

function obtener_familia($cod)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta="select * from familia where cod=?";
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute([$cod]);
            $respuesta["familia"]=$sentencia->fetch(PDO::FETCH_ASSOC);
            
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

function actualizar_producto($datos)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta="update producto set nombre=?,nombre_corto=?,descripcion=?,PVP=?,familia=?,cod=? where cod=?";
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute($datos);
            $respuesta["mensaje"]=$datos[5];
            
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