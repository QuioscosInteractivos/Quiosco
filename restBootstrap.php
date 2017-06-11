<?php

/*
 * RESTful API Example
 * 
 * Created by:
 * @Pabhoz
 * pabhoz[@]gmail.com
 * 
 */

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//Capturamos la URL
$url = ( filter_input(INPUT_GET,"url") != null) ? filter_input(INPUT_GET,"url") : "Index/";
$url = explode('/', filter_var( rtrim($url, '/') , FILTER_SANITIZE_URL));

$controller = ( isset($url[0]) ) ? $url[0]."_controller" : "Index_controller";
$method = ( isset($url[1]) && $url[1] != null) ? $url[1] : substr($controller, 0, -11);

$request = new Request();

if($request->method == "options"){
    return true;
}

$path = "./controllers/".$controller.".php";

if(file_exists($path)){

    require $path;
    $controller = new $controller();
    $controller->setPhpinput($request->phpinput);
    
    $params = $request->parameters;
    unset($params["url"]);
    unset($params["key"]);
    
    if(isset($request->method)){
        if(method_exists($controller, $request->method)){
            if(isset($params) && $params != null){
                $controller->{$request->method}($method,$params);
            }else{
                $controller->{$request->method}($method);
            }
        }else{
            Request::error("Método no disponible",405);
        }
    } 
}else{
    Request::error("Petición no encontrada",404);
}
