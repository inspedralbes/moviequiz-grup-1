<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movies</title>
</head>

<body>
<?php include("./PHP/header.php"); ?>
    <div id="divBusqueda" class="oculto">
        <div id="divsearch">
            <h4>Buscar peli: <input type="text" id="search">
                <input type="button" id="btn_search" value="Buscar">
            </h4>
        </div>

        <div id="resultat"></div>
    </div>

    <?php include("./PHP/footer.php"); ?>
    <script type="text/javascript" src="./JS/index.js"></script>
</body>
</html>