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
        $usuari = new usuari();
        $pelicula = new pelicula();
        $valoracio_pelicula = new valoracio_pelicula();
        $partida = new partida();
        $partida_jugada = new partida_jugada();
        $vista = new view();

        // Què em demanen?
        $event = 'inici';

        $uri = $_SERVER['REQUEST_URI'];
        echo $uri;

        foreach ($this->peticions as $peticio) {
            if (strpos($uri, $peticio) == true) {
                $event = $peticio;
            }
        }

        switch ($event) {
            case 'view1':
                $dades = $usuari->selectAll(array("nom", "edat"));
                break;

            case 'signup':
                $dades = $this->recollirDadesPost();
                echo $usuari->introduirUsuari($dades);
                break;
        }
    }

    private function recollirDadesPost()
    {
        $dadesForm = false;
        if (isset($_POST["signup"])) {
            $dadesForm = array(
                'usuari' => $_POST["user"],
                'contrasenya' => $_POST["password"],
                'email' => $_POST["email"],
                'nom' => $_POST['nom'],
                'cognoms' => $_POST['cognom']
            );
        } else if (isset($_POST['usuari'])) {
            $dadesForm = array(
                'usuari' => $_POST['usuari'],
                'constrasenya' => $_POST['pwd']
            );
        }

        return $dadesForm;
    }

    public function login(){
        $usuari_login = new usuari();
        $dadesPOST = $this->recollirDadesPost();
        $resposta = $usuari_login->comprovarLogin($dadesPOST);
        return $resposta;
    }
}
