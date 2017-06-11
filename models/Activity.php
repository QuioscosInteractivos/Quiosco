<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Activity
 *
 * @author Pabhoz
 */
class Activity extends BModel {

  private $id, $title, $description, $responsable, $team, $expdate, $donedate,
          $status;

      function __construct($id, $title, $description, $responsable, $team, $expdate, $donedate, $status) {
          parent::__construct();
          $this->id = $id;
          $this->title = $title;
          $this->description = $description;
          $this->responsable = $responsable;
          $this->team = $team;
          $this->expdate = $expdate;
          $this->donedate = $donedate;
          $this->status = $status;
      }
      
      function getId() {
          return $this->id;
      }

      function getTitle() {
          return $this->title;
      }

      function getDescription() {
          return $this->description;
      }

      function getResponsable() {
          return $this->responsable;
      }

      function getTeam() {
          return $this->team;
      }

      function getExpdate() {
          return $this->expdate;
      }

      function getDonedate() {
          return $this->donedate;
      }

      function getStatus() {
          return $this->status;
      }

      function getHas_one() {
          return $this->has_one;
      }

      function getKnown_as() {
          return $this->known_as;
      }

      function getHas_many() {
          return $this->has_many;
      }

      function setId($id) {
          $this->id = $id;
      }

      function setTitle($title) {
          $this->title = $title;
      }

      function setDescription($description) {
          $this->description = $description;
      }

      function setResponsable($responsable) {
          $this->responsable = $responsable;
      }

      function setTeam($team) {
          $this->team = $team;
      }

      function setExpdate($expdate) {
          $this->expdate = $expdate;
      }

      function setDonedate($donedate) {
          $this->donedate = $donedate;
      }

      function setStatus($status) {
          $this->status = $status;
      }

      function setHas_one($has_one) {
          $this->has_one = $has_one;
      }

      function setKnown_as($known_as) {
          $this->known_as = $known_as;
      }

      function setHas_many($has_many) {
          $this->has_many = $has_many;
      }

      
    public function getMyVars(){
        return get_object_vars($this);
    }

}
