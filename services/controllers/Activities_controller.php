<?php

class Activities_controller extends BServiceController {

    function __construct() {
        parent::__construct();
    }

    public function getIndex($id = null) {
        if(is_null($id)){
            $r = Activity::getAll();    
        }else{ 
            $r =Activity::getById($id)->toArray();
        }
        Penelope::printJSON($r);
    }
    
    public function postIndex() {
        
        $act = Activity::instanciate($_POST);
        $r = $act->create();
        Penelope::printJSON($r);
    }
    
    public function putStatus(){
        $_PUT = $this->_PUT;
        $id = $_PUT["id"];
        $act = Activity::getById($id);
        $act->setStatus(1);
        $r=$act->update();
        Penelope::printJSON($r);
        
    }
}
