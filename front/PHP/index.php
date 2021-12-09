<?php
    require_once("controller_MQ.php");
    $controller = new controller();
    $controller->handler();
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="../CSS/index.css">
    <link rel="stylesheet" href="../CSS/normalize.css">
    <link type="text/css" rel="stylesheet" href="../CSS/header.css">
    <title>Movies</title>
</head>

<body>
    <?php include("header.php"); ?>

    <div id="a"></div>
    <div id="divBusqueda" class="oculto">
        <div id="divsearch">
            <h4>Buscar peli: </h4>
            <input type="text" id="search">
            <a class=" btn-small waves-effect waves-light" id="btn_search"><i class="material-icons">search</i></a>
        </div>

        <div id="resultat" class="row center-align"></div>
    </div>

    <?php include("footer.php"); ?>
    <script type="text/javascript" src="../JS/login.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script type="text/javascript" src="../JS/index.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
</body>

</html>