<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../IMG/logo2.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="../CSS/header.css">
    <link rel="stylesheet" href="../CSS/footer.css">
    <link  rel="stylesheet" href="../CSS/signup.css">
    <title>Registre</title>
</head>

<body>
    <?php include("header.php"); ?>

    <!-- Botó tornar enrrere -->
    <div>
        <button id="back" class="btn waves-effect waves-light" type="button" name="action"><i class="material-icons">arrow_back</i></button>
    </div>


  

    <!-- Formulari registre d'usuari -->
    <?php
    if (!$_POST) {
    ?>
        <h2 class="h2">Dades de l'usuari</h2>

        <div class="row">
            <form class="col s12" action="./index.php?action=signup" method="POST">
                <div class="row center">
                    <div class="input-field col s6">
                        <input id="usuari" type="text" class="validate  white_font" name="user">
                        <label for="usuari">Usuari/alias</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input id="password" type="password" class="validate white_font" name="password">
                        <label for="password">Contrasenya</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input id="email" type="email" class="validate white_font" name="email">
                        <label for="email">Email</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input id="nom" type="text" class="validate white_font" name="nom">
                        <label for="nom">Nom</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input id="cognom" type="text" class="validate white_font" name="cognom">
                        <label for="cognom">Cognoms</label>
                    </div>
                </div>

                <div class="submit">
                    <button class="btn waves-effect waves-light" type="submit" name="signup">Registrat</button>
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
        }
    }
    ?>
    </div>

    <!-- SCRIPTS -->
    <?php include("footer.php"); ?>
    <script type="text/javascript" src="../JS/signup.js"></script>

</body>

</html>