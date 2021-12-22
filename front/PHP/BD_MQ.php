<?php

abstract class BD_MovieQuiz {
  private static $db_host = "localhost";
  private static $db_user = "a20paumunoli_vicsanpau";
  private static $db_pass = "Vicsanpau123456789";
  private $db_name = "a20paumunoli_movie_quiz";

  protected $query;
  protected $rows=array();
  private $conn;
  protected $message;

  private function open_connection() {
    $this->conn = new mysqli (self::$db_host, self::$db_user, self::$db_pass, $this->db_name);
  }
  
  private function close_connection() {
    $this->conn->close();
  }
  
  protected function execute_single_query() {
    $this->open_connection();
    $this->conn->query($this->query);
    $this->close_connection();
  }
  
  protected function get_results_from_query() {
    $this->open_connection();
    $result = $this->conn->query($this->query);
    for ($i=0;$i<$result->num_rows;$i++)
      $this->rows[$i]=$result->fetch_assoc();
    $result->close();
    $this->close_connection();
  }

}


?>