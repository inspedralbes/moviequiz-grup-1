<?php
require_once("controller_MQ.php");
?>

<!DOCTYPE html>
<html lang="en">

<?php
    if (isset($_SESSION['registrar']) && $_SESSION['registrar'] == 'existeix') {
        header("Refresh:2; url=signup.php");
    }
    if (isset($_SESSION['registrar']) && $_SESSION['registrar'] == 'ok') {
        header("Location: ./index.php");
    }
?>

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
        <form action="./signup.php?action=signupUsuari" method="POST">
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
                    <button class="btn waves-effect waves-light pulse black_font" type="submit" name="signup">Registra't</button>
                </div>

            </div>

        </form>

    </div>

    <?php
        if (isset($_SESSION['registrar']) && $_SESSION['registrar'] == 'existeix') {
            echo "<div id='registrar'></div>";
            unset($_SESSION['registrar']);
            session_destroy();
        }

        include("footer.php");
    ?>
    <!-- SCRIPTS -->
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script type="text/javascript" src="../JS/signup.js"></script>

</body>

</html>