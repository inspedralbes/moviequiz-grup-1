<?php

require_once('model_MQ.php');
require_once('view_MQ.php');

class controller
{
    //rutes o esdeveniments possibles
    private $peticions = array('login', 'signup', 'valoracio', 'pelisValoradesUsuari', 'pelisGuardadesUsuari', 'modificarDadesUsuari', 'pelismillorvalorades', 'joc');

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
                $dadesPOST = $this->recollirDadesPost();
                echo $usuari->introduirUsuari($dadesPOST);
                break;

            case 'valoracio':
                $dadesPOST = $this->recollirDadesPost();
                $res = $valoracio_pelicula->afegirValoracioPeli($dadesPOST);
                echo $res;
                break;

            case 'login':
                $dadesPOST = $this->recollirDadesPost();
                $resposta = $usuari->comprovarLogin($dadesPOST);
                $res = json_encode($resposta);
                echo $res;
                break;

            case 'pelisValoradesUsuari':
                $dadesPOST = $this->recollirDadesPost();
                $datosUsuario = $usuari->dadesUsuari($dadesPOST);
                $res = $valoracio_pelicula->pelisValoradesUsuari($datosUsuario[0]['idUsuari']);
                echo json_encode($res);
                break;

            case 'pelismillorvalorades':
                $res = $valoracio_pelicula->millorvalorades();
                echo json_encode($res);
                break;

            case 'pelisGuardadesUsuari':
                $dadesPOST = $this->recollirDadesPost();
                $datosUsuario = $usuari->dadesUsuari($dadesPOST);
                $res = $valoracio_pelicula->pelisGuardadesUsuari($datosUsuario[0]['idUsuari']);
                echo json_encode($res);
                break;

            case 'modificarDadesUsuari':
                $dadesPOST = $this->recollirDadesPost();
                print_r($dadesPOST);
                $dadesEditades = $usuari->modificarDadesUsuari($dadesPOST);
                break;
            case 'joc':
                $dadesPOST = $this->recollirDadesPost();
                print_r($dadesPOST);
                if($dadesPOST['juego'] == 1){
                    echo "Juego login";
                }else{
                    $partida->generarjocNoLogin();
                    echo "Juego no login";
                }
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
                'contrasenya' => $_POST['pwd']
            );
        } else if (isset($_POST['valoracio'])) {
            $dadesForm = array(
                'valoracio' => $_POST["valoracio"],
                'favorit' => $_POST["favorit"],
                'comentari' => $_POST["comentari"],
                'idPeli' => $_POST['id-peli'],
                'nomPeli' => $_POST["nom-peli"],
                'anyPeli' => $_POST["any-peli"],
                'imgPeli' => $_POST["img-peli"],
                'nomUsuari' => $_POST['nom-usuari']
            );
        } else if (isset($_POST['user'])) {
            $dadesForm = $_POST['user'];

        } else if (isset($_POST['joc'])) {
            $dadesForm = array("juego" => $_POST['joc']);
            if($_POST['joc'] == true){
                $dadesForm = array_merge($dadesForm, array('user' => $_POST['jocUser']));
            }
            
        //Editar Dades Usuari
        } else if (isset($_POST['email_us'])) {

            print_r($_FILES);
            move_uploaded_file($_FILES['foto']['tmp_name'], "../IMG/" . $_FILES['foto']['name']);
            print_r($_FILES);

            $dadesForm = array(
                'usuari' => $_POST['alias'],
                'nomU' => $_POST['nom_us'],
                'emailU' => $_POST['email_us'],
                'imgU' => "../IMG/" . $_FILES['foto']['name']
            );
        }
        return $dadesForm;
    }
}

$controller = new controller();
$controller->handler();
