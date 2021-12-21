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
    <!-- CSS -->
    <link rel="stylesheet" href="../CSS/header.css">
    <link rel="stylesheet" href="../CSS/footer.css">
    <link rel="stylesheet" href="../CSS/signup.css">
    <title>Registre</title>
</head>

<body>
    <?php include("header.php"); ?>

    <!-- Botó tornar enrrere -->



    <!-- Formulari registre d'usuari -->

    <div class="formulariRegistre">
        <form action="./index.php?action=signup" method="POST">
            <div class="row formulari center white">

                <div class="col s12">
                    <h3 class="h3 deep-purple-text">Dades de l'usuari</h3>
                </div>

                <div class="input-field col s12">
                    <input id="usuari" type="text" class="validate" name="user">
                    <label for="usuari">Usuari/alias</label>
                </div>

                <div class="input-field col s12">
                    <input id="password" type="password" class="validate" name="password">
                    <label for="password">Contrasenya</label>
                </div>

                <div class="input-field col s12">
                    <input id="email" type="email" class="validate" name="email">
                    <label for="email">Email</label>
                </div>

                <div class="input-field col s12">
                    <input id="nom" type="text" class="validate" name="nom">
                    <label for="nom">Nom</label>
                </div>

                <div class="input-field col s12">
                    <input id="cognom" type="text" class="validate" name="cognom">
                    <label for="cognom">Cognoms</label>
                </div>

                <div class="col s12 submit">
                    <button class="btn waves-effect waves-light pulse" type="submit" name="signup">Registrat</button>
                </div>

            </div>

        </form>

    </div>


    <?php include("footer.php"); ?>
    <!-- SCRIPTS -->
    <script type="text/javascript" src="../JS/signup.js"></script>
</body>

</html>