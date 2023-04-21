<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require __DIR__ . '/Slim/autoload.php';

require "src/funciones.php";

$app= new \Slim\App;

$app->post('/salir',function($request){

    session_id($request->getParam('api_session'));
    session_start();
    session_destroy();
    echo json_encode(array("logout"=>"Fin de la session"));
    
});
$app->get('/conexion',function($request){

    echo json_encode(conexion());
  
});
$app->post('/logueado',function($request){
    session_id($request->getParam('api_session'));
    session_start();
    if(isset($_SESSION["tipo"]))
    {
        $datos[]=$_SESSION["usuario"];
        $datos[]=$_SESSION["clave"];
        echo json_encode(login($datos,false));
    }
    else
    {
        session_destroy();
        echo json_encode(array("no_login"=>"Usted no tienes permisos usar este servicio"));
    }
});

$app->post('/login',function($request){

    $datos[]=$request->getParam('usuario');
    $datos[]=$request->getParam('clave');
    echo json_encode(login($datos));

});

$app->get('/productos',function($request){

    session_id($request->getParam('api_session'));
    session_start();
    if(isset($_SESSION["tipo"]) )
        echo json_encode(obtener_productos());
    else
    {
        session_destroy();
        echo json_encode(array("no_login"=>"Usted no tienes permisos usar este servicio"));
    }

});

$app->get('/producto/{cod}',function($request){

    session_id($request->getParam('api_session'));
    session_start();
    if(isset($_SESSION["tipo"]))
        echo json_encode(obtener_producto($request->getAttribute('cod')));
    else
    {
        session_destroy();
        echo json_encode(array("no_login"=>"Usted no tienes permisos usar este servicio"));
    }
});

$app->post('/producto/insertar',function($request){

    session_id($request->getParam('api_session'));
    session_start();
    if(isset($_SESSION["tipo"]) && $_SESSION["tipo"]=="admin")
    {
        $datos[]=$request->getParam('cod');
        $datos[]=$request->getParam('nombre');
        $datos[]=$request->getParam('nombre_corto');
        $datos[]=$request->getParam('descripcion');
        $datos[]=$request->getParam('PVP');
        $datos[]=$request->getParam('familia');

        echo json_encode(insertar_producto($datos));
    }
    else
    {
        session_destroy();
        echo json_encode(array("no_login"=>"Usted no tienes permisos usar este servicio"));
    }

});

$app->put('/producto/actualizar/{cod}',function($request){

    session_id($request->getParam('api_session'));
    session_start();
    if(isset($_SESSION["tipo"]) && $_SESSION["tipo"]=="admin")
    {
        $datos[]=$request->getParam('nombre');
        $datos[]=$request->getParam('nombre_corto');
        $datos[]=$request->getParam('descripcion');
        $datos[]=$request->getParam('PVP');
        $datos[]=$request->getParam('familia');
        $datos[]=$request->getParam('cod');
        $datos[]=$request->getAttribute('cod');
        echo json_encode(actualizar_producto($datos));
    }
    else
    {
        session_destroy();
        echo json_encode(array("no_login"=>"Usted no tienes permisos usar este servicio"));
    }
});

$app->delete('/producto/borrar/{cod}',function($request){

    session_id($request->getParam('api_session'));
    session_start();
    if(isset($_SESSION["tipo"]) && $_SESSION["tipo"]=="admin")
        echo json_encode(borrar_producto($request->getAttribute('cod')));
    else
    {
        session_destroy();
        echo json_encode(array("no_login"=>"Usted no tienes permisos usar este servicio"));
    }
});

$app->get('/familias',function($request){

    session_id($request->getParam('api_session'));
    session_start();
    if(isset($_SESSION["tipo"]))
        echo json_encode(obtener_familias());
    else
    {
        session_destroy();
        echo json_encode(array("no_login"=>"Usted no tienes permisos usar este servicio"));
    }
});

$app->get('/familia/{cod}',function($request){

    session_id($request->getParam('api_session'));
    session_start();
    if(isset($_SESSION["tipo"]))
        echo json_encode(obtener_familia($request->getAttribute('cod')));
    else
    {
        session_destroy();
        echo json_encode(array("no_login"=>"Usted no tienes permisos usar este servicio"));
    }
});

$app->get('/repetido_insert/{tabla}/{columna}/{valor}',function($request){

    session_id($request->getParam('api_session'));
    session_start();
    if(isset($_SESSION["tipo"]) && $_SESSION["tipo"]=="admin")
        echo json_encode(repetido($request->getAttribute('tabla'),$request->getAttribute('columna'),$request->getAttribute('valor')));
    else
    {
        session_destroy();
        echo json_encode(array("no_login"=>"Usted no tienes permisos usar este servicio"));
    }
});

$app->get('/repetido_edit/{tabla}/{columna}/{valor}/{columna_clave}/{valor_clave}',function($request){

    session_id($request->getParam('api_session'));
    session_start();
    if(isset($_SESSION["tipo"]) && $_SESSION["tipo"]=="admin")
        echo json_encode(repetido($request->getAttribute('tabla'),$request->getAttribute('columna'),$request->getAttribute('valor'),$request->getAttribute('columna_clave'),$request->getAttribute('valor_clave')));
    else
    {
        session_destroy();
        echo json_encode(array("no_login"=>"Usted no tienes permisos usar este servicio"));
    }
});
$app->get('/conexion_PDO',function($request){
    try
    {
        $conexion=new PDO("mysql:host=".SERVIDOR_BD.":3307;dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        $respuesta=["todo bien"=>"Conecxion realizada con exito"];
    }
    catch(PDOException $e)
    {
        $respuesta["mensaje_error"]="Imposible conectar. Error:".$e->getMessage();
    }
    echo json_encode($respuesta) ;
    
});


// Una vez creado servicios los pongo a disposición
$app->run();
?>