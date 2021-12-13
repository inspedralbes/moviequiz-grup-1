<?php
    require_once("controller_MQ.php");
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="shortcut icon" href="https://cdn.sstatic.net/Sites/es/img/favicon.ico?v=a8def514be8a">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="../CSS/index.css">
    <link type="text/css" rel="stylesheet" href="../CSS/header.css">
    <title>Movies</title>
</head>

<body>
    <?php include("header.php"); ?>

    <div id="apartadoBusqueda" class="row apartadoBusqueda">

        <div id="divsearch" class="col s9 m9 l10">
            <input type="text" id="search" placeholder="Cercar pel·lícula">
        </div>

        <div id="butons_search" class="col s3 m3 l2">
            <a class=" btn-small waves-effect waves-light" id="btn_search"><i class="material-icons">search</i></a>
            <a id="ocultardivsearch" href="#!" class="btn-small red oculto"><i class="material-icons red">arrow_drop_up</i></a>
        </div>

        <div id="resultat" class="row center-align"></div>

    </div>

    <div id="apartadoCarrousel" class="row">
        
        <div id="carrousel-titol" class="col s12 m12 l5">
            <h1>LES ÚLTIMES TENDÈNCIES EN PEL·LÍCULES</h1>
        </div>
        <div id="carrousel-fotos" class="carousel col s12 m12 l7">
            <a class="carousel-item" href="#"><img src="https://api.lorem.space/image/movie?w=159&h=220"></a>
            <a class="carousel-item" href="#"><img src="https://api.lorem.space/image/movie?w=150&h=220"></a>
            <a class="carousel-item" href="#"><img src="https://api.lorem.space/image/movie?w=151&h=220"></a>
            <a class="carousel-item" href="#"><img src="https://api.lorem.space/image/movie?w=152&h=220"></a>
            <a class="carousel-item" href="#"><img src="https://api.lorem.space/image/movie?w=153&h=220"></a>
            <a class="carousel-item" href="#"><img src="https://api.lorem.space/image/movie?w=154&h=220"></a>
            <a class="carousel-item" href="#"><img src="https://api.lorem.space/image/movie?w=155&h=220"></a>
            <a class="carousel-item" href="#"><img src="https://api.lorem.space/image/movie?w=156&h=220"></a>
            <a class="carousel-item" href="#"><img src="https://api.lorem.space/image/movie?w=157&h=220"></a>
            <a class="carousel-item" href="#"><img src="https://api.lorem.space/image/movie?w=158&h=220"></a>
        </div>
    </div>

    <div id="apartadoJuego" class="row">
        <div id="juego" class="col s12 m12 l4">
            <button id="btn-joc" class="btn waves-effect waves-light btn-joc"> Joc </button>
        </div>
        <div id="ranking" class="col s12 m12 l8">
            <div>
                <div id="ranking-titol ">
                    <h5>Ranking puntuació</h5>
                </div>
                <div id="ranking-usuaris">
                    <ul>
                        <li>Persona 1 - 50pt</li>
                        <li>Persona 2 - 60pt</li>
                        <li>Persona 3 - 40pt</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div id="apartadoMisPeliculas" class="row">
        <div id="mispelis" class="col s12 m12 l8">
                <div>
                    <div id="mispelis-titol ">
                        <h5>Les meves pel·lícules</h5>
                    </div>
    </div>



    <div><button id="btn-joc" class="btn waves-effect waves-light btn-joc"><i class="material-icons">trophy</i> Puntuació Joc </button></div>


    <?php include("footer.php"); ?>

    <script type="text/javascript" src="../JS/login.js"></script>
    <script src="js/materialize.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script type="text/javascript" src="../JS/index.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
</body>

</html>