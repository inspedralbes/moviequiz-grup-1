<?php

require_once('model_MQ.php');
require_once('view_MQ.php');

class controller
{

    //rutes o esdeveniments possibles
    //view1: nom i edat
    //view2: nom i alçada
    private $peticions = array('login', 'signup');

    public function handler()
    {

        // Què em demanen?
        $event = 'inici';

        $uri = $_SERVER['REQUEST_URI'];
        echo $uri;

        foreach ($this->peticions as $peticio){
            if (strpos($uri, $peticio) == true){
                $event = $peticio;
            }
        }

        $usuari = new usuari();
        $pelicula = new pelicula();
        $valoracio_pelicula = new valoracio_pelicula();
        $partida = new partida();
        $partida_jugada = new partida_jugada();
        $vista = new view();

        switch ($event) {
            case 'view1':
                $dades = $usuari->selectAll(array("nom", "edat"));
                break;
            
            case 'signup':
                $dades = $this->recollirDadesPost();
                echo $usuari->introduirUsuari($dades);
        }
    }

    private function recollirDadesPost(){
        $dadesForm = false;
        if(isset($_POST["signup"])){
            $dadesForm = array(
                'usuari' => $_POST["user"],
                'contrasenya' => $_POST["password"],
                'email' => $_POST["email"],
                'nom' => $_POST['nom'],
                'cognoms' => $_POST['cognom']
            );
        } 

        return $dadesForm;
    }

}
