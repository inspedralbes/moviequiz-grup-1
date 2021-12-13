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

    function __destruct()
    {
    }

    //select dels camps passats de tots els registres
    //stored in $rows property
    public function selectAll($fields = array())
    {
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
                $this->query = "INSERT INTO usuari(idUsuari, nom, cognoms, email, user, passw, imatge, punts) VALUES (NULL, '$nom', '$cognoms', '$email', '$usuari', '$contrasenya', NULL, 0)";
                $this->execute_single_query();
                $this->message  = "Usuari introduït";
            } else $this->message = "L'usuari ja existeix";
        } else $this->message = "Usuari no introduït";

        return $this->message;
    }

    public function comprovarLogin($login_data = array())
    {
        $this->query = "SELECT * FROM usuari WHERE user = '" . $login_data['usuari'] . "'";
        $this->get_results_from_query();

        if ($this->rows != null && $this->rows[0]["passw"] == $login_data['contrasenya']) {
            $res = array(
                'exito' => true,
                'idUsuari' => $this->rows[0]["idUsuari"],
                'nombre' => $this->rows[0]["nom"],
                'cognoms' => $this->rows[0]["cognoms"],
                'usuari' => $this->rows[0]["user"],
                'email' => $this->rows[0]["email"],
                'imagen' => 'https://randomuser.me/api/portraits/men/23.jpg',
                'puntuacion' => $this->rows[0]["punts"]
            );;
        } else {
            $res = array('exito' => false);
        }
        return $res;
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

    function __destruct()
    {
    }

    //select dels camps passats de tots els registres
    //stored in $rows property
    public function selectAll($fields = array())
    {
        $this->query = "SELECT ";
        $firstField = true;
        for ($i = 0; $i < count($fields); $i++) {
            if ($firstField) {
                $this->query .= $fields[$i];
                $firstField = false;
            } else $this->query .= ", " . $fields[$i];
        }
        $this->query .= " FROM persones";
        $this->get_results_from_query();
        return $this->rows;
    }

    public function select($nom = "")
    {
        $this->query = "SELECT ";
        $this->get_results_from_query();
        return $this->rows;
    }


    public function insert($user_data = array())
    {
        /*
        if (array_key_exists("nom", $user_data)) {
            $this->select($user_data["nom"]);
            if (!isset($this->rows[0]['nom'])) {
                foreach ($user_data as $campo => $c) {
                    $$campo = $c;
                }
                $this->query = "INSERT INTO persones(id, nom, edat, alcada) VALUES (NULL, '" . $nom . "', '" . $edat . "', '" . $alcada . "')";
                $this->execute_single_query();
                $this->message  = "Usuari introduït";
            } else $this->message = "L'usuari ja existeix";
        } else $this->message = "Usuari no introduït";*/
    }

    public function update($userData = array())
    {
    }

    public function delete($nom = "")
    {
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

    function __destruct()
    {
    }

    //select dels camps passats de tots els registres
    //stored in $rows property
    public function selectAll($fields = array())
    {
        $this->query = "SELECT ";
        $firstField = true;
        for ($i = 0; $i < count($fields); $i++) {
            if ($firstField) {
                $this->query .= $fields[$i];
                $firstField = false;
            } else $this->query .= ", " . $fields[$i];
        }
        $this->query .= " FROM persones";
        $this->get_results_from_query();
        return $this->rows;
    }

    public function select($nom = "")
    {
        $this->query = "SELECT ";
        $this->get_results_from_query();
        return $this->rows;
    }


    public function insert($user_data = array())
    {
        /*
        if (array_key_exists("nom", $user_data)) {
            $this->select($user_data["nom"]);
            if (!isset($this->rows[0]['nom'])) {
                foreach ($user_data as $campo => $c) {
                    $$campo = $c;
                }
                $this->query = "INSERT INTO persones(id, nom, edat, alcada) VALUES (NULL, '" . $nom . "', '" . $edat . "', '" . $alcada . "')";
                $this->execute_single_query();
                $this->message  = "Usuari introduït";
            } else $this->message = "L'usuari ja existeix";
        } else $this->message = "Usuari no introduït";*/
    }

    public function update($userData = array())
    {
    }

    public function delete($nom = "")
    {
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

    //select dels camps passats de tots els registres
    //stored in $rows property
    public function selectAll($fields = array())
    {
        $this->query = "SELECT ";
        $firstField = true;
        for ($i = 0; $i < count($fields); $i++) {
            if ($firstField) {
                $this->query .= $fields[$i];
                $firstField = false;
            } else $this->query .= ", " . $fields[$i];
        }
        $this->query .= " FROM persones";
        $this->get_results_from_query();
        return $this->rows;
    }

    public function select($nom = "")
    {
        $this->query = "SELECT ";
        $this->get_results_from_query();
        return $this->rows;
    }


    public function insert($user_data = array())
    {
        /*
        if (array_key_exists("nom", $user_data)) {
            $this->select($user_data["nom"]);
            if (!isset($this->rows[0]['nom'])) {
                foreach ($user_data as $campo => $c) {
                    $$campo = $c;
                }
                $this->query = "INSERT INTO persones(id, nom, edat, alcada) VALUES (NULL, '" . $nom . "', '" . $edat . "', '" . $alcada . "')";
                $this->execute_single_query();
                $this->message  = "Usuari introduït";
            } else $this->message = "L'usuari ja existeix";
        } else $this->message = "Usuari no introduït";*/
    }

    public function update($userData = array())
    {
    }

    public function delete($nom = "")
    {
    }
}

class valoracio_pelicula extends BD_MovieQuiz
{
    private $pelicula;
    private $usuari;
    private $comentari;
    private $favorit;
    private $valoracio;


    function __toString()
    {
        echo "Dades pelicula<br>";
        return "(" . $this->pelicula . ", " . $this->usuari . ", " .
            $this->comentari . ", " . $this->favorit .  ", " . $this->valoracio . ")";
    }

    function __destruct()
    {
    }

    //select dels camps passats de tots els registres
    //stored in $rows property

    public function afegirValoracioPeli($dadesValoracio = array())
    {
        if (array_key_exists("nomUsuari", $dadesValoracio)) {
            $this->dadesValoracio($dadesValoracio["nomUsuari"]);
            if (!isset($this->rows[0]['usuari'])) {
                
                //Obtindre el id del usuari que valora/guarda la peli
                $usuari = new usuari();
                $usuari->dadesUsuari($dadesValoracio['nomUsuari']);
                $user = $this->rows[0]['idUsuari'];

                foreach ($dadesValoracio as $campo => $dato) {
                    $$campo = $dato;
                }

                $this->query = "INSERT INTO pelicula(idPelicula, nomPelicula, any, img) VALUES (NULL,'$nomPeli','','')";
                $this->execute_single_query();



                $this->query = "INSERT INTO valoracio_pelicules(pelicula, usuari, comentari, favorit, valoracio) VALUES ('','','','','')";
                $this->execute_single_query();
                $this->message  += "Usuari introduït";
            } else $this->message = "L'usuari ja existeix";
        } else $this->message = "Usuari no introduït";

        return $this->message;
    }

    public function dadesValoracio($user = "")
    {
        $this->query = "SELECT * FROM valoracio_pelicules WHERE user = '$user'";
        $this->get_results_from_query();
        return $this->rows;
    }
}
