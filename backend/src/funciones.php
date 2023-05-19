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
function getCoolers($offset)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        try
        {
            $consulta="select * from cooler_procesador limit 4 offset ".$offset;
            $sentencia=$conexion->prepare($consulta);
            $sentencia->execute();
            $tuplas=$sentencia->fetchAll(PDO::FETCH_ASSOC);
            $respuesta["elements"] = array_slice($tuplas, 0, 3);
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