<?php
require "src/bd_config.php";

function login($datos,$in_login=true)
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.":3307;dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
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


function catalogo_videojuegos()
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.":3307;dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
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

function obtener_familias()
{
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.":3307;dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
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
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.":3307;dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
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
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.":3307;dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
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
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.":3307;dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
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
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.":3307;dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
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
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.":3307;dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        
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
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.":3307;dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
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
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.":3307;dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
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
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.":3307;dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
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