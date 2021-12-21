<?php

require_once('model_MQ.php');
require_once('view_MQ.php');

class controller
{
    //rutes o esdeveniments possibles
    private $peticions = array('login', 'signup', 'valoracio', 'pelisValoradesUsuari', 'pelisGuardadesUsuari', 'modificarDadesUsuari', 'pelismillorvalorades', 'joc', 'comprovarJoc', 'ranking');

    public function handler()
    {
        $usuari = new usuari();
        $pelicula = new pelicula();
        $valoracio_pelicula = new valoracio_pelicula();
        $partida = new partida();
        $partida_jugada = new partida_jugada();
        $vista = new view();

        $event = 'inici';

        $uri = $_SERVER['REQUEST_URI'];

        foreach ($this->peticions as $peticio) {
            if (strpos($uri, $peticio) == true) {
                $event = $peticio;
            }
        }

        switch ($event) {
            //Registrar nou usuari
            case 'signup':
                $dadesPOST = $this->recollirDadesPost();
                echo $usuari->introduirUsuari($dadesPOST);
                break;

            //Valorar una pel·lícula
            case 'valoracio':
                $dadesPOST = $this->recollirDadesPost();
                $res = $valoracio_pelicula->afegirValoracioPeli($dadesPOST);
                echo $res;
                break;

            //Iniciar sessió amb un usuari
            case 'login':
                $dadesPOST = $this->recollirDadesPost();
                $resposta = $usuari->comprovarLogin($dadesPOST);
                $res = json_encode($resposta);
                echo $res;
                break;

            //Apartat "Les Meves Pel·lícules" de l'usuari
            case 'pelisValoradesUsuari':
                $dadesPOST = $this->recollirDadesPost();
                $datosUsuario = $usuari->dadesUsuari($dadesPOST);
                $res = $valoracio_pelicula->pelisValoradesUsuari($datosUsuario[0]['idUsuari']);
                echo json_encode($res);
                break;

            //Pel·lícules millor valorades
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

            //Editar les dades d'un usuari loggejat
            case 'modificarDadesUsuari':
                $dadesPOST = $this->recollirDadesPost();
                $usuari->modificarDadesUsuari($dadesPOST);
                break;

            //Generar joc amb inici i sense inici de sessió
            case 'joc':
                $dadesPOST = $this->recollirDadesPost();
                if ($dadesPOST['juego'] == 'exito') {
                    $json = $partida->generarjocLogin($dadesPOST['user']);
                    echo $json;
                } else if ($dadesPOST['juego'] == 'fallo') {
                    $json = $partida->generarjocNoLogin();
                    echo $json;
                }
                break;

            //Comprovar les respostes de l'usuari al joc
            case 'comprovarJoc':
                $dadesPOST = $this->recollirDadesPost();
                sleep(1.5);
                if (isset($_POST['userPartida'])) {
                    $json = $partida->comprovarPartidaConLogin($dadesPOST);
                    echo $json;
                } else {
                    $json = $partida->comprovarPartidaSinLogin($dadesPOST);
                    echo $json;
                }
                break;
            
            case 'ranking':
                $users = $usuari->rankingUsuaris();
                $users = json_encode($users);
                echo $users;
                break;
        }
    }


    //Funció per a recollir totes les dades de formularis amb POST
    private function recollirDadesPost()
    {
        $dadesForm = false;

        //Agafar les dades del formulari de registre
        if (isset($_POST["signup"])) {
            $dadesForm = array(
                'usuari' => $_POST["user"],
                'contrasenya' => $_POST["password"],
                'email' => $_POST["email"],
                'nom' => $_POST['nom'],
                'cognoms' => $_POST['cognom']
            );
        //Agafar les dades d'inici de sessió
        } else if (isset($_POST['usuari'])) {
            $dadesForm = array(
                'usuari' => $_POST['usuari'],
                'contrasenya' => $_POST['pwd']
            );
        //Dades de la valoració d'una pel·lícula
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
            if ($_POST['joc'] == 'exito') {
                $dadesForm = array_merge($dadesForm, array('user' => $_POST['jocUser']));
            }

            //Editar Dades Usuari
        } else if (isset($_POST['email_us'])) {
            //Format en que es desará les dades corresponents a l'imatge d'un usuari
            move_uploaded_file($_FILES['foto']['tmp_name'], "../IMG/" . $_FILES['foto']['name']);

            $dadesForm = array(
                'usuari' => $_POST['alias'],
                'nomU' => $_POST['nom_us'],
                'emailU' => $_POST['email_us'],
                'imgU' => "../IMG/" . $_FILES['foto']['name']
            );
        } else if (isset($_POST['respostes'])) {
            $dadesForm = array("respostes" => json_decode($_POST['respostes'], true));
            if (isset($_POST['userPartida'])) {
                $dadesForm = array_merge($dadesForm, array('user' => $_POST['userPartida']));
            }
        }
        return $dadesForm;
    }
}

$controller = new controller();
$controller->handler();
