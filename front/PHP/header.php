<nav>
    <div id="nav" class="nav-wrapper deep-purple">
        <a href="index.php">
            <img src="../IMG/logo2.png" class="logo" width="50px">
        </a>

        <a href="#" class="brand-logo center"><img src="../IMG/titol.png" class="titolMovies"></a>

        <ul id="nav-mobile" class="right">
            <li><a id="btn_login" href="#login" class="modal-trigger waves-effect waves-light btn">LOGIN</a></li>
            <li id="resultat_header"></li>
        </ul>
    </div>
</nav>


<!-- LOGIN MODAL -->
<div id="login" class=" login modal">
    <div class="modal-content">
        <div class="row center">
            <div class="col s12">
                <h5 class="red-text darken-1">Inicia Sessió</h5>
            </div>

            <div class="col s12">
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
            </div>

            <!-- BOTÓ LOGIN / LINK SING UP-->
            <div class="col s12">
                <a id="btn_entrar" class="waves-effect waves-light btn btn-small">Entrar</a>
                <p class="grey-text link">No ets usuari?,<a href="signup.php"> registrat</a></p>
            </div>
        </div>
    </div>

    <div class="modal-footer">
        <a href="#!" class="btn modal-close red "><i class="material-icons">close</i></a>
    </div>
</div>