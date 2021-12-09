<nav>
    <div id="nav" class="nav-wrapper">
        <a href="index.php" class="brand-logo">MOVIES</a>
        <ul class="right hide-on-med-and-down">
            <li><a id="btn_login" href="#login" class="modal-trigger waves-effect waves-light btn">LOGIN</a></li>
        </ul>
    </div>

    <!-- LOGIN MODAL -->

    <div id="login" class="login modal">
        <div class="modal-content">
            <div class="row center">
                <h5 class="red-text darken-1">Inicia Sessió</h5>
                <form class="col s4 offset-m3 l4 offset-l4">
                    <div class="input-field">
                        <i class="material-icons prefix">person</i>
                        <label for="usuari">Usuari</label>
                        <input type="text" id="usuari" name="usuari">
                    </div>

                    <div class="input-field">
                        <i class="material-icons prefix">key</i>
                        <label for="pwd">Contrasenya</label>
                        <input type="password" id="pwd" name="pwd">
                    </div>
                </form>
            </div>

            <div class="row center center-align">
                <a id="btn_entrar" class="waves-effect waves-light btn-small"><i class="material-icons right">arrow_forward</i>Entrar</a>
                <p class="grey-text link">No ets usuari?,<a href="signup.php"> registrat</a></p>
            </div>
        </div>

        <div class="modal-footer">
            <a href="#!" class="btn modal-close red "><i class="material-icons red">close</i></a>
        </div>
    </div>

</nav>


<?php
/*
    $usuari = $_POST['usuari'];
    $pwd = $_POST['pwd'];

    if(($usuari == "user") && ($pwd == "1234")){

        session_start();

        $arr = array ('exito' => true, 'usuario' => "user");

    }else{

        $arr = array ('exito' => false);

    }

    $myJSON = json_encode($arr);
    echo $myJSON;*/
?>