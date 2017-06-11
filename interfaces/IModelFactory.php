<?php

/**
 *
 * @author pabhoz
 */
interface IModelFactory {
    
    public function newCategory($id, string $name, string $icon): Category;
    public function newClient($id, string $username, string $password, 
            string $email,string $name, bool $isPremium): Client;
    public function newClientChildren($id, string $username, string $password,
            $parent): ClientChildren;
    public function newQuality($id, string $name, string $color, float $experience): Quality;
    public function newRusty($id, string $title, float $discount, string $img,
            float $realPrice, string $publishAt, string $endDate, string $desc,
            $quality, $publisher): Rusty;
    public function newRustyChildren(string $code,$parent): RustyChildren;
    public function newUser($id, string $username, string $password, string $email,
            int $lv, float $experience): User;
    
}
