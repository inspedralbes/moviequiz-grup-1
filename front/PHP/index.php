<?php
session_start();
/*if(!isset($_SESSION['user'])){
    header("Location: ./index.php");
}*/
require_once("controller_MQ.php");
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="shortcut icon" href="../IMG/logo2.png">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="../CSS/index.css">
    <link type="text/css" rel="stylesheet" href="../CSS/header.css">
    <title>Movies</title>
</head>

<body>
    <?php include("header.php"); ?>

    <!-- CERCADOR PEL·LÍCULES-->
    <div id="apartadoBusqueda" >
        <div class="row apartadoBusqueda">
            <div id="divsearch" class="col s10">
                <input type="text" id="search" class="white_font" placeholder="Cercar pel·lícula">
            </div>

            <div id="butons_search" class="col s2">
            <a class=" btn-small waves-effect waves-light" id="btn_search"><i class="material-icons">search</i></a>
                <a id="ocultardivsearch" href="#!" class="btn-small red oculto"><i class="material-icons red">arrow_drop_up</i></a>
            </div>
        </div>

        <div id="resultat" class="row center-align"></div>
    </div>

    <!-- CARUSEL PEL·LÍCULES MÉS VALORADES-->
    <div id="apartadoCarrousel" class="row">
        <div id="info-usuari" class="col s12 oculto"></div>

        <div id="carrousel-titol" class="col s12 m12 l5">
            <h1>LES ÚLTIMES TENDÈNCIES EN PEL·LÍCULES</h1>
        </div>

        <div id="carrousel-fotos" class="carousel col s12 m12 l7"></div>
    </div>


<!-- CONTINGUT VISIBLE PER L'USUARI REGISTRAT -->
    <div id="apartadoJuego" class="row">
        <div id="juego" class="col s12 m12 l4">
                <!--<h3>Minijoc</h3>-->
            <button id="btn-joc" class="btn waves-effect waves-light btn-joc modal-trigger" href="#modaljoc"> Jugar </button>
        </div>
        <div id="ranking" class="col s12 m12 l8">
            <div>
                <div id="ranking-titol ">
                    <h5>Ranking puntuació</h5>
                </div>
                <div id="ranking-usuaris">
                    <ul>
                        <li>Persona 1 - 90pt</li>
                        <li>Persona 2 - 60pt</li>
                        <li>Persona 3 - 40pt</li>
                    </ul>
                </div>
            </div>
        </div>

        <div id="modaljoc" class="modal joc">
        </div>

    </div>

    <div id="apartadoMisPeliculas" class="row oculto">
        <div id="mispelis" class="col s12 m12 l8">
            <div>
                <div id="mispelis-titol">
                    <h5>Les meves pel·lícules</h5>
                </div>
        </div>
    </div>


    <?php include("footer.php"); ?>

    <!-- SCRIPTS -->
    <script type="text/javascript" src="../JS/index.js"></script>
    <script type="text/javascript" src="../JS/login.js"></script>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    
</body>

</html>