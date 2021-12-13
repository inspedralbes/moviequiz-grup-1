<?php

require_once('model_MQ.php');
require_once('view_MQ.php');

class controller
{
    //rutes o esdeveniments possibles
    //view1: nom i edat
    //view2: nom i alçada
    private $peticions = array('login', 'signup', 'valoracio');

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
        //echo $uri;

        foreach ($this->peticions as $peticio) {
            if (strpos($uri, $peticio) == true) {
                $event = $peticio;
            }
        }

        switch ($event) {
            case 'signup':
                $dades = $this->recollirDadesPost();
                echo $usuari->introduirUsuari($dades);
                break;

            case 'valoracio':
                $dades = $this->recollirDadesPost();
                $res = $valoracio_pelicula->afegirValoracioPeli($dades);
                echo $res;
                break;

            case 'login':
                $resposta = $this->login();
                $res = json_encode($resposta);
                echo $res;
                break;
        }
    }

    public function login()
    {
        $usuari_login = new usuari();
        $dadesPOST = $this->recollirDadesPost();
        $resposta = $usuari_login->comprovarLogin($dadesPOST);
        return $resposta;
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
                'contrasenya' => $_POST['pwd']
            );
        } else if (isset($_POST['valoracio'])) {
            $dadesForm = array(
                'valoracio' => $_POST["valoracio"],
                'favorit' => $_POST["favorit"],
                'comentari' => $_POST["comentari"],
                'nomPeli' => $_POST["nom-peli"],
                'anyPeli' => $_POST["any-peli"],
                'imgPeli' => $_POST["img-peli"],
                'nomUsuari' => $_POST['nom-usuari']
            );
        }
        return $dadesForm;
    }
}

$controller = new controller();
$controller->handler();
