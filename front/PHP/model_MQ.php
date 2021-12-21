<?php

require_once("BD_MQ.php");

class usuari extends BD_MovieQuiz
{
    private $nom;
    private $cognoms;
    private $email;
    private $user;
    private $password;
    private $img;
    private $punts;

    function __toString()
    {
        echo "Dades usuari<br>";
        return "(" . $this->id . ", " . $this->name . ", " . $this->edat . ", " .
            $this->alcada . ")";
    }

    public function actualizarPuntosUsuario($puntos, $id)
    {
        $this->query = "UPDATE usuari SET punts = '$puntos' WHERE idUsuari = '$id'";
        $this->execute_single_query();
    }


    public function dadesUsuari($user = "")
    {
        $this->query = "SELECT * FROM usuari WHERE user = '$user'";
        $this->get_results_from_query();
        return $this->rows;
    }

    public function introduirUsuari($user_data = array())
    {
        if (array_key_exists("usuari", $user_data)) {
            $this->dadesUsuari($user_data["usuari"]);
            if (!isset($this->rows[0]['user'])) {
                foreach ($user_data as $campo => $dato) {
                    $$campo = $dato;
                }

                //Securitzar contrasenya
                $contrasenya = password_hash($contrasenya, PASSWORD_DEFAULT);

                $this->query = "INSERT INTO usuari(idUsuari, nom, cognoms, email, user, passw, imatge, punts) VALUES (NULL, '$nom', '$cognoms', '$email', '$usuari', '$contrasenya', NULL, 0)";
                $this->execute_single_query();
                $this->message  = "ok";
            } else {
                $this->message = "existeix";
            }
        }
        
        $_SESSION['registrar'] = $this->message;
    }

    public function comprovarLogin($login_data = array())
    {
        $this->query = "SELECT * FROM usuari WHERE user = '" . $login_data['usuari'] . "'";
        $this->get_results_from_query();

        //Utilitzar password_verify() per comprovar el hash de la contrasenya de la BD amb l'string que prove del login
        if ($this->rows != null && password_verify($login_data['contrasenya'], $this->rows[0]["passw"])) {
            $res = array(
                'exito' => true,
                'idUsuari' => $this->rows[0]["idUsuari"],
                'nombre' => $this->rows[0]["nom"],
                'cognoms' => $this->rows[0]["cognoms"],
                'usuari' => $this->rows[0]["user"],
                'email' => $this->rows[0]["email"],
                'imagen' => $this->rows[0]["imatge"],
                'puntuacion' => $this->rows[0]["punts"]
            );

            $_SESSION['user'] = $this->rows[0]["user"];
        } else {
            $res = array('exito' => false);
        }
        return $res;
    }

    /* EDITAR DADES USUARI */
    public function modificarDadesUsuari($user = array())
    {
        foreach ($user as $u => $datos) {
            $$u = $datos;
        }

        $this->query = "UPDATE 
                            usuari 
                        SET 
                            usuari.nom = '$nomU' ,
                            usuari.email = '$emailU',
                            usuari.imatge = '$imgU'
                        WHERE 
                            usuari.user = '$usuari'";

        $this->execute_single_query();
    }

    public function rankingUsuaris()
    {
        $this->query = "SELECT * FROM usuari ORDER BY usuari.punts DESC LIMIT 3";
        $this->get_results_from_query();
        return $this->rows;
    }
}

class partida extends BD_MovieQuiz
{
    private $nomPartida;
    private $pelicules;
    private $fecha;

    function __toString()
    {
        echo "Dades pelicula<br>";
        return "(" . $this->nomPartida . ", " . $this->pelicules . ", " .
            $this->fecha . ")";
    }

    //GENERAR EL JOC PER ALS USUARIS LOGGEJATS
    public function generarjocLogin($nomuser = "")
    {
        $val = new valoracio_pelicula();
        $per = new usuari();
        $user = $per->dadesUsuari($nomuser)[0]['idUsuari'];
        $dadesPelicules = $val->pelisGuardadesUsuari($user);
        $json = $this->generarJSONjoc($dadesPelicules);
        return $json;
    }

    //GENERAR EL JOC PER ALS USUARIS NO LOGGEJATS
    public function generarjocNoLogin()
    {
        //Selecciona les dades de les pel·lícules valorades pels usuaris
        $this->query = "SELECT
                            pelicula.nomPelicula,
                            pelicula.idPelicula,
                            pelicula.img,
                            pelicula.any,
                            AVG(valoracio_pelicules.valoracio) AS valoracio
                        FROM
                            valoracio_pelicules
                        JOIN pelicula ON pelicula.idPelicula = valoracio_pelicules.pelicula
                        GROUP BY
                            (pelicula.idPelicula)
                        ORDER BY
                            valoracio
                        DESC
                        LIMIT 10;";

        $this->get_results_from_query();
        $dadesPelicules = $this->rows;
        $json = $this->generarJSONjoc($dadesPelicules);
        return $json;
    }

    //JSON DEL JOC
    public function generarJSONjoc($dadesPelicules = array())
    {
        $jsonJS = array();

        //Escollir 5 pelis aleatoriament d'entre les que s'han obtingut a la funció anterior
        $numAleatorio = range(0, (count($dadesPelicules) - 1));
        shuffle($numAleatorio);

        $arr_pelis = array();
        for ($i = 0; $i < 5; $i++) {
            $peli = $dadesPelicules[$numAleatorio[$i]];
            $anys = $this->generarAñosAleatorios($peli['any']);
            array_push($arr_pelis, array(
                'ImdbID' => $peli['idPelicula'],
                'Nombre' => $peli['nomPelicula'],
                'Poster' => $peli['img'],
                'choice1' => $anys[0],
                'choice2' => $anys[1],
                'choice3' => $anys[2],
                'choice4' => $anys[3],
                'choice5' => $anys[4]
            ));
        }

        $jsonJS = array_merge($jsonJS, ["peliculas" => $arr_pelis]);

        $this->guardarPartida($jsonJS);

        $id = $this->obtenerIDPartida();
        $id = array('id_partida' => $id);

        $jsonJS = array_merge($id, $jsonJS);

        return (json_encode($jsonJS));
    }

    //Genera aleatoria els anys de les posibles opcions de resposta al joc
    public function generarAñosAleatorios($any = "")
    {
        $valors = array(-15, -10, -5, -2, 2, +5, +10, +15);
        shuffle($valors);
        $arr_anys = array($any);

        for ($i = 0; $i < 4; $i++) {
            array_push($arr_anys, ($any + $valors[$i]));
        }

        shuffle($arr_anys);
        return $arr_anys;
    }

    //Desa les dades de la partida jugada a la Base de Dades
    public function guardarPartida($partida)
    {
        $partida = json_encode($partida);
        $this->query = "INSERT INTO partida(idPartida, nomPartida, pelicules, fecha) VALUES (NULL,'no-defined-yet','$partida', CURRENT_TIMESTAMP())";
        $this->execute_single_query();
    }


    public function obtenerIDPartida()
    {
        $this->query = "SELECT MAX(partida.idPartida) AS 'id' FROM partida";
        $this->get_results_from_query();
        return $this->rows[0]['id'];
    }


    public function comprovarPartidaConLogin($dadesPartida = array())
    {
        $datos = $this->comprovarPartida($dadesPartida);
        $this->actualizarPartida($dadesPartida['respostes']['id_partida'], $dadesPartida['respostes']['nom_partida']);
        $user = new usuari();
        $partidaJugada = new partida_jugada();
        $idUser = $user->dadesUsuari($dadesPartida['user'])[0]['idUsuari'];
        $user->actualizarPuntosUsuario($datos['puntos'], $idUser);
        $partidaJugada->guardarPartida($dadesPartida['respostes']['id_partida'], $idUser, $datos['encerts'], $datos['fallos']);
        unset($datos['puntos']);
        return json_encode($datos);
    }


    public function comprovarPartidaSinLogin($dadesPartida = array())
    {
        $datos = $this->comprovarPartida($dadesPartida);
        $this->actualizarPartida($dadesPartida['respostes']['id_partida'], $dadesPartida['respostes']['nom_partida']);
        unset($datos['puntos']);
        return json_encode($datos);
    }


    public function comprovarPartida($dadesPartida = array())
    {
        $pelicula = new pelicula();
        $punts = 0;
        $fallos = 0;
        $aciertos = 0;

        $respuestas = $dadesPartida['respostes']['respostes'];
        foreach ($respuestas as $peli) {
            $any = $pelicula->dadesPeliculaPerID($peli['ImdbID'])[0]['any'];
            if ($peli['resposta'] == $any) {
                $punts = $punts + 3;
                $aciertos++;
            } else {
                $punts--;
                $fallos++;
            }
        }

        if ($punts < 0) $punts = 0;

        $aciertosFallos = array(
            'id_partida' => $dadesPartida['respostes']['id_partida'],
            'nom_partida' => $dadesPartida['respostes']['nom_partida'],
            'encerts' => $aciertos,
            'fallos' => $fallos,
            'puntos' => $punts
        );

        return $aciertosFallos;
    }

    public function actualizarPartida($id = "", $nom = '')
    {
        $this->query = "UPDATE partida SET nomPartida = '$nom' WHERE idPartida = '$id'";
        $this->execute_single_query();
    }
}

class partida_jugada extends BD_MovieQuiz
{
    private $partida;
    private $usuari;
    private $encerts;
    private $errades;


    function __toString()
    {
        echo "Dades pelicula<br>";
        return "(" . $this->partida . ", " . $this->usuari . ", " .
            $this->encerts . ", " . $this->errades . ")";
    }

    public function guardarPartida($idPartida, $idUsuari, $encerts, $errades)
    {
        $this->query = "INSERT INTO partida_jugada VALUES ('$idPartida','$idUsuari','$encerts','$errades')";
        $this->execute_single_query();
    }
}

class pelicula extends BD_MovieQuiz
{
    private $nomPelicula;
    private $any;
    private $img;


    function __toString()
    {
        echo "Dades pelicula<br>";
        return "(" . $this->nomPelicula . ", " . $this->any . ", " .
            $this->img . ")";
    }

    function __destruct()
    {
    }


    public function selectAll($fields = array())
    {
    }

    public function dadesPelicula($nom = "")
    {
        $this->query = "SELECT * FROM pelicula WHERE nomPelicula = '$nom'";
        $this->get_results_from_query();
        return $this->rows;
    }

    public function dadesPeliculaPerID($id = "")
    {
        $this->query = "SELECT * FROM pelicula WHERE pelicula.idPelicula = '$id'";
        $this->get_results_from_query();
        return $this->rows;
    }

    public function comprovarSiExisteixPelicula($nom = "")
    {
        $this->query = "SELECT * FROM pelicula WHERE nomPelicula = '$nom'";
        $this->get_results_from_query();
        return (!isset($this->rows[0]['nomPelicula'])) ? 1 : 0;
    }
}

class valoracio_pelicula extends BD_MovieQuiz
{
    private $pelicula;
    private $usuari;
    private $comentari;
    private $favorit;
    private $valoracio;

    /* STRING VALORACIÓ PEL·LÍCULA */
    function __toString()
    {
        echo "Dades valoracio pel·lícula<br>";
        return "(" . $this->pelicula . ", " . $this->usuari . ", " .
            $this->comentari . ", " . $this->favorit .  ", " . $this->valoracio . ")";
    }

    /* INSERTAR VALORACIÓ PELI B.D */
    public function afegirValoracioPeli($dadesValoracio = array())
    {
        if (array_key_exists("nomUsuari", $dadesValoracio)) {

            foreach ($dadesValoracio as $campo => $dato) {
                $$campo = $dato;
            }

            $pelicula = new pelicula();
            $usuari = new usuari();

            //Comprovar si la pelicula existeix a la BD
            $bool = $pelicula->comprovarSiExisteixPelicula($nomPeli);
            if ($bool) {
                //Afegir la peli a la BD si no hi és a la BD
                $this->query = "INSERT INTO pelicula(idPelicula, nomPelicula, any, img) VALUES ('$idPeli','$nomPeli','$anyPeli','$imgPeli')";
                $this->execute_single_query();
            }

            //Obtenir l'id de l'usuari que valora/guarda la peli
            $idUser = $usuari->dadesUsuari($nomUsuari)[0]['idUsuari'];

            //Obtenir l'id de la peli valorada/guardada
            $idPeli = $pelicula->dadesPelicula($nomPeli)[0]['idPelicula'];

            $bool = $this->comprovarSiExisteixValoracio($idUser, $idPeli);
            if ($bool) {
                //Afegir la valoracio a la BD
                $this->query = "INSERT INTO valoracio_pelicules(pelicula, usuari, comentari, favorit, valoracio) VALUES ('$idPeli','$idUser','$comentari','$favorit','$valoracio')";
                $this->execute_single_query();
                $this->message = "be";
            } else $this->message = "existeix";
        } else $this->message = "error";

        return json_encode(array('resultat' => $this->message));
    }

    public function comprovarSiExisteixValoracio($user = "", $peli = "")
    {
        $this->query = "SELECT * FROM valoracio_pelicules WHERE usuari = '$user' AND pelicula = '$peli'";
        $this->get_results_from_query();
        return (!isset($this->rows[0]['usuari']) and !isset($this->rows[0]['pelicula'])) ? 1 : 0;
    }

    /* PEL·LÍCULES VALORADES PER X USUARI */
    public function pelisValoradesUsuari($id = "")
    {
        $this->query = "SELECT
                            pelicula.idPelicula
                        FROM
                            valoracio_pelicules
                        JOIN pelicula ON pelicula.idPelicula = valoracio_pelicules.pelicula
                        WHERE valoracio_pelicules.usuari = $id;";
        $this->get_results_from_query();
        return $this->rows;
    }

    /* PEL·LÍCULES AMB MILLOR PUNTUACIÓ */
    public function millorvalorades()
    {
        $this->query = "SELECT
                            pelicula.nomPelicula,
                            pelicula.idPelicula,
                            pelicula.img,
                            AVG(valoracio_pelicules.valoracio) AS valoracio
                        FROM
                            valoracio_pelicules
                        JOIN pelicula ON pelicula.idPelicula = valoracio_pelicules.pelicula
                        GROUP BY
                            (pelicula.idPelicula)
                        ORDER BY
                            valoracio
                        DESC
                        LIMIT 10;";
        $this->get_results_from_query();
        return $this->rows;
    }

    public function pelisGuardadesUsuari($id = "")
    {
        $this->query = "SELECT
                            valoracio_pelicules.comentari, valoracio_pelicules.valoracio, pelicula.nomPelicula, pelicula.img, pelicula.idPelicula, pelicula.any
                        FROM
                            valoracio_pelicules
                        INNER JOIN pelicula ON pelicula.idPelicula = valoracio_pelicules.pelicula
                        WHERE
                            valoracio_pelicules.usuari = $id AND valoracio_pelicules.favorit = 1;";
        $this->get_results_from_query();
        return $this->rows;
    }

    public function eliminarPeliValorada($datos=array())
    {
        $peli = $datos["peli"];
        $usuari = $datos["usuari"];
        $usr = new usuari();
        $id= $usr->dadesUsuari($usuari)[0]['idUsuari'];
        $this->query = "DELETE FROM valoracio_pelicules WHERE valoracio_pelicules.pelicula = '$peli' AND valoracio_pelicules.usuari = '$id'";
        $this -> execute_single_query();
        echo $this->query;
    }
}
