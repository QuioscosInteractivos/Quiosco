<?php

class Index_controller extends BServiceController {

    function __construct() {
        parent::__construct();
    }

    public function getIndex() {
        $arr = ["ñame"=>'pepé'];
        print json_encode($arr);
    }

    public function postIndex() {
        Request::setHeader(200, "text/html");
        echo "Post method Index controller";
    }

    public function getSaludo($nombre, $apellido) {
        if (!isset($nombre) || !isset($apellido)) {
            throw new Exception('Paremetros insuficientes.');
        }
        Request::setHeader(200, "text/plain");
        echo "Hey " . $nombre . " " . $apellido . "!";
    }
    
    public function getAuditorios($id=false){
        if($id){
            $auditorio = Auditorios::getById($id);
            print json_encode($auditorio->toArray());
        }else{
            $auditorios = Auditorios::getAll();
            print json_encode($auditorios);
        }
    }
    
    public function getAuditoriosByName($name){
        $auditorio = Auditorios::getBy("DESCRIPTION", $name);
        print json_encode($auditorio);
    }

    public function getAuditoriums($inuId){
        $auditorio = Auditorios::where("ID_AUDIENCE", $inuId);
        //$auditorio = Auditorios::getID_AUDIENCE($inuId);
        if (!empty($auditorio) || is_array($auditorio)) {
            print json_encode($auditorio);

        } else {
            print json_encode($auditorio->toArray());
        }
    }

    // Trae todos los edificios
    public function getBuildings(){
        $buildings = Edificiosauditorios::getAll();
        //$auditorio = Auditorios::getID_AUDIENCE($inuId);
        if (!empty($buildings) || is_array($buildings)) {
            print json_encode($buildings);
            
        } else {
            print json_encode($buildings->toArray());
        }
    }

    public function getCourses($isbSearchString){
        $buildings = Auditorios::searchFor("DESCRIPTION", $isbSearchString);
        //$auditorio = Auditorios::getID_AUDIENCE($inuId);
        if (!empty($buildings) || is_array($buildings)) {
            print json_encode($buildings);
            
        } else {
            print json_encode($buildings->toArray());
        }
    }
}
