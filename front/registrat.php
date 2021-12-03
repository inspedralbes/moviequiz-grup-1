<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <link rel="stylesheet" href="CSS/registrat.css">
    <title>Registro</title>
</head>

<body>
    <?php include("./PHP/header.php"); ?>
    </div>

    <!-- Botó tornar enrrere -->
    <!-- <input type="button" id="back" class="boton btn_back" value="Back"> -->
    <button id="back" class="btn waves-effect waves-light" type="button" name="action">Back</button>
    </div>


    <!--Formulari Confirmació compra-->
    <?php
    if(!$_POST){
    ?>  
        
        <div class="row">
            <h2 class="h2">Dades de l'usuari</h2>
            <form class="col s12">
            <div class="row center">
                <div class="input-field col s6">
                    <input id="usuari" type="text" class="validate">
                    <label for="usuari">Usuari/alias</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="password" type="password" class="validate">
                    <label for="password">Contrassenya</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="email" type="email" class="validate">
                    <label for="email">Email</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="nom" type="text" class="validate">
                    <label for="nom">Nom</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="cognom" type="text" class="validate">
                    <label for="cognom">Cognom</label>
                </div>
            </div>
                <div class="submit">
                <button class="btn waves-effect waves-light" type="submit" name="action">Registrat</button>
                    <!--<input type="submit" value="Registrat" class="boton btn_registrar" id="registrar">-->
                </div>
            </div>
            </form>
        </div>
            
        <?php
    } else {
        echo "<br>";
    function test_input($valor)
    {
        $valor = trim($valor);
        $valor = stripslashes($valor);
        return htmlspecialchars($valor);
    }}
    ?>
    <script type="text/javascript" src="../JS/registrat.js"></script>
    <?php include("./PHP/footer.php"); ?>
    </div>
</body>

</html>