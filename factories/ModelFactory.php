<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ModelFactory
 *
 * @author pabhoz
 */
class ModelFactory implements IModelFactory{

    public function newCategory($id, string $name, string $icon): \Category {
        $m_id = (is_int($id)) ? $id : null;
        return new Category($m_id, $name, $icon);
    }

    public function newClient($id, string $username, string $password, 
            string $email, string $name, bool $isPremium): \Client {
        
        $m_id = (is_int($id)) ? $id : null;
        return new Client($m_id, $username, $password, $email, $name, $isPremium);
    }

    public function newClientChildren($id, string $username, string $password, 
            $parent): \ClientChildren {
        
        $m_id = (is_int($id)) ? $id : null;
        $m_parent = (is_int($parent)) ? $parent : null;
        return new ClientChildren($m_id, $username, $password, $m_parent);
    }

    public function newQuality($id, string $name, string $color, 
            float $experience): \Quality {
        $m_id = (is_int($id)) ? $id : null;
        return new Quality($m_id, $name, $color, $experience);
    }

    public function newRusty($id, string $title, float $discount, string $img, 
            float $realPrice, string $publishAt, string $endDate, string $desc, 
            $quality, $publisher): \Rusty {
        
        $m_id = (is_int($id)) ? $id : null;
        $m_quality = (is_int($quality)) ? $quality : null;
        $m_publisher = (is_int($publisher)) ? $publisher : null;
        return new Rusty($m_id, $title, $discount, $img, $realPrice, $publishAt, 
                $endDate, $desc, $m_quality, $m_publisher);
    }

    public function newRustyChildren(string $code, $parent): \RustyChildren {
        $m_code = (is_string($code)) ? $code : "";
        $m_parent = (is_int($parent)) ? $parent : null;
        return new RustyChildren($m_code, $m_parent);
    }

    public function newUser($id, string $username, string $password, string $email,
            int $lv, float $experience): \User {
        $m_id = (is_int($id)) ? $id : null;
        return new User($m_id, $username, $password, $email, $lv, $experience);
    }

}
