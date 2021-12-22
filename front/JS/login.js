/* Listener al boto de login per tal d'inicialitzar el modal del login */
document.getElementById("btn_login").addEventListener("click", function (e) {
    var instances = M.Modal.init(document.querySelector(".login"), {});
})

//Funcio que engloba tota la funcionalitat de fer login
ferLogin();

//Funcio que engloba tota la funcionalitat de fer login
function ferLogin() {
    document.getElementById("btn_entrar").addEventListener("click", function () { login(); });

    document.getElementById("pwd").addEventListener('keydown', e => {
        if (e.key === 'Enter') { login(); }
    });
}

//Funcio que comprova si l'usuari introduït, concorda amb algun de la BD
function login() {

    //Obtenir l'usuari i la contrasenya introduïts per l'usuari
    let usu = document.getElementById("usuari").value;
    let pwd = document.getElementById("pwd").value;

    //Crear el FormData per enviar-lo pel fetch
    const datosLogin = new FormData();
    datosLogin.append("usuari", usu);
    datosLogin.append("pwd", pwd);

    //Fer el fetch per comprovar si l'suari introduït concorda amb algun de la BD
    fetch('http://moviequiz1.alumnes.inspedralbes.cat/front/PHP/controller_MQ.php?action=login', {
        method: "POST",
        body: datosLogin
    }).then(response => response.json()).then(data => {
        //Si hi ha un usuari loggejat ...
        if (data.exito == true) {
            if(document.getElementById("login").classList.contains('lg')){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'S\'ha iniciat la sessió!',
                    showConfirmButton: false,
                    timer: 1500
                });
                document.getElementById("login").classList.remove('lg');
            }

            //Inserir al header el nom de l'usuari i la seva imatge
            document.getElementById("resultat_header").innerHTML = codigoHTMLheaderuser(data);

            //Ocultar el botó login i el carrusel
            document.getElementById("btn_login").classList.add("oculto");
            document.getElementById("carrousel-fotos").classList.add("oculto");
            document.getElementById("carrousel-titol").classList.add("oculto");

            //Mostrar l'informació de l'usuari i l'apartat de "les Meves Pel·lícules"
            document.getElementById("info-usuari").classList.remove("oculto");
            document.getElementById("apartadoMisPeliculas").classList.remove("oculto");

            //Inserir l'informació de l'usuari
            document.getElementById("info-usuari").innerHTML = codigoHTMLuser(data);

            //No mostrar el botó de desar les dades de l'usuari
            document.getElementById("btn_save").classList.add("oculto");

            //Mostrar totes les dades modificables de l'usuari al pressionar el botó d'editar i habilitar la seva edició
            document.getElementById("btn_edit").addEventListener("click", function (e) {
                document.getElementById("nom_us").removeAttribute("disabled");
                document.getElementById("email_us").removeAttribute("disabled");
                document.getElementById("canviar_img_usr").classList.remove("oculto");
                document.getElementById("img_usr_label").classList.remove("oculto");
                document.getElementById("btn_save").classList.remove("oculto");
                document.getElementById("btn_edit").classList.add("oculto");
            });

            //Ocultar dades modificables de l'usuari al pressionar el botó de desar, deshabilitar la seva edició i guardar les dades modificades
            document.getElementById("btn_save").addEventListener("click", function (e) {
                document.getElementById("nom_us").setAttribute("disabled", "");
                document.getElementById("email_us").setAttribute("disabled", "");
                document.getElementById("canviar_img_usr").classList.add("oculto");
                document.getElementById("img_usr_label").classList.add("oculto");
                document.getElementById("btn_edit").classList.remove("oculto");
                document.getElementById("btn_save").classList.add("oculto");

                //Guardar les dades modificades
                dadesUsuariModificades();
            });

            //Mostrar les pel·lícules desades per l'usuari
            misPeliculas();


        } else {
            //Mostrar notificació d'error en cas que no s'hagi pogut iniciar la sessió
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'No s\'ha iniciat la sessió!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}

/* Codi per a inserir al header el nom de l'usuari, la seva imatge i boto de logout */
function codigoHTMLheaderuser(datos) {
    let text = `<div class="flex navbar">
                <div>${datos.usuari}</div>
                <div class="pad">
                    <img class="img_header circle responsive-img" src="${datos.imagen}">
                </div>
                <div>
                    <a id="btn_logout" href="../../index.php" class="modal-trigger waves-effect waves-light black_font btn">LOGOUT</a>
                </div>
              </div>`;
    return text;
}

/* FORMULARI AMB LES DADES (EDITABLES) DE L'USUARI QUE HA FET LOGIN */
function codigoHTMLuser(datos) {
    let text = `<div class="row margin0px">
                    <div class="col s12 m4 centrar">
                        <h3>¡Hola ${datos.nombre}!</h3>
                        <img src="${datos.imagen}" class="circle responsive-img foto-usu">
                    </div>

                    <div class="dades_usuari col s12 m8">

                        <div class="row margin0px">
                            <div class="col s10">
                                <h3 class="margin0px center">Les meves dades</h3>
                                <label class="white_font" for="alias">Nom</label>
                                <input disabled id="nom_us" type="text" class="white_font" value="${datos.nombre}">

                                <label class="white_font" for="email">Correu</label>
                                <input disabled id="email_us" type="email" class="white_font" value="${datos.email}">

                                <label class="white_font" for="puntuacio">Karma</label>
                                <input disabled id="puntuacio_us" type="text" class="white_font" value="${datos.puntuacion}">

                                <label class="white_font oculto" id="img_usr_label" for="imatge">Imatge</label>

                                <div class="file-field input-field oculto" id="canviar_img_usr">
                                    <div class="btn btn-small">
                                        <input type="file" id="foto-input" multiple accept="image/*"><i
                                            class="material-icons black_font">insert_photo</i></input>
                                    </div>

                                    <div class="file-path-wrapper">
                                        <input class="file-path white_font" type="text" id="img_link">
                                    </div>
                                </div>

                                <input id="alias" type="hidden" value="${datos.usuari}">
                            </div>

                            <div class="col s2 center-align">
                                <a class="btn btn-small waves-effect waves-light black_font" id="btn_edit"><i
                                        class="material-icons">create</i></a>
                                <a class="btn btn-small waves-effect waves-light black_font" id="btn_save"><i
                                        class="material-icons">save</i></a>
                            </div>
                        </div>
                    </div>
                </div>`;
    return text;
}

/* Funcio per generar el codi HTML de "LES MEVES PEL·LÍCULES" */
function misPeliculas() {

    //Obtenir el nom d'usuari de la persona que ha fet login
    let user = document.getElementById("alias").value;
    let codi;

    //Crear el FormData per enviar-lo pel fetch
    const datos = new FormData();
    datos.append("user", user);

    //Fer la peticio fetch
    fetch('http://moviequiz1.alumnes.inspedralbes.cat/front/PHP/controller_MQ.php?action=pelisGuardadesUsuari', {
        method: "POST",
        body: datos
    }).then(response => response.json()).then(pelisGuardades => {

        //Generar el codi HTML de les pelis guardades i inserir-ho al div -> apartadoMisPeliculas
        codi = misPeliculasHTML(pelisGuardades);
        document.getElementById("apartadoMisPeliculas").innerHTML = codi;

        //Listener per eliminar una pel·lícula de la col·lecció de pelis d'un usuari
        document.getElementById("apartadoMisPeliculas").addEventListener("click", function (e) {
            if (e.target.classList.contains("btn_delete")) {

                //Obtenir el id de la peli i nom d'usuari
                let id_peli = e.target.parentElement.parentElement.id;
                let usr = document.getElementById('alias').value;

                //Crear el FormData per enviar-lo pel fetch
                const idMovie = new FormData();
                idMovie.append("id_peli", id_peli);
                idMovie.append("nom_usr", usr);

                //Fer la peticio fetch
                fetch('http://moviequiz1.alumnes.inspedralbes.cat/front/PHP/controller_MQ.php?action=eliminarPelisColleccio', {
                    method: "POST",
                    body: idMovie
                }).then(response => response.json()).then(data => {
                    //Si la query s'ha executat be, es mostrarà un missatge
                    if (data.resultat == "ok") {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Valoració eliminada de les meves pel·lícules',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        //Refrescar la pagina sense fer F5
                        refrescar("a");
                    }
                });
            }
        });

        //Inicialitzar el colapsable que mostrará la llista de "Les Meves Pel·lícules"
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, {});
    });
}

/* Generar el codi HTML de la llista que contindrà les pel·lícules favorites de l'usuari */
function misPeliculasHTML(datos) {
    let text = `<h3 class="center">Les meves pel·lícules</h3><ul class="collapsible popout">`;
    for (let i = 0; i < datos.length; i++) {
        text += `<li class="coll">
                    <div class="collapsible-header">
                        <img src="${datos[i].img}" height="80px">
                        <p>${datos[i].nomPelicula}</p>
                    </div>
                    <div class="collapsible-body">
                        <label for='comentari-${datos[i].idPelicula}'>Comentari: </label>
                        <textarea name="comentari-${datos[i].idPelicula}" id="comentari-${datos[i].idPelicula}" cols="30" rows="10" disabled>${datos[i].comentari}</textarea>
                        <label for='valoracio-${datos[i].idPelicula}'>Valoració: </label>
                        <input type="number" name="valoracio-${datos[i].idPelicula}" id="valoracio-${datos[i].idPelicula}" min=1 max=5 disabled value="${datos[i].valoracio}">
                        <p>
                            <label>
                            <input type="checkbox" disabled checked name="favorit-${datos[i].idPelicula}" id="favorit-${datos[i].idPelicula}"/>
                            <span>Guardat</span>
                            </label>
                        </p>

                        <div class="right-align" id="${datos[i].idPelicula}">
                            <a class="btn-colleccio btn btn-small waves-effect waves-light right red" id=""><i class="material-icons btn_delete">delete</i></a>
                            <a class="btn-colleccio btn btn-small waves-effect waves-light right" id="btn_edit_colleccio"><i class="material-icons">create</i></a>
                            <a class="btn-colleccio btn btn-small waves-effect waves-light right oculto" id="btn_save_colleccio"><i class="material-icons">save</i></a>
                            <br>
                        </div>
                    </div>
                </li>`;
    }
    text += '</ul>';
    return text;
}

/* GUARDAR LES DADES DE L'USUARI MODIFICADES */
function dadesUsuariModificades() {

    //Obtenir les noves dades del usuari
    let file = document.getElementById("foto-input").files[0];
    let nom_u = document.getElementById("nom_us").value;
    let email_u = document.getElementById("email_us").value;
    let img_u = document.getElementById("img_link").value;
    let user = document.getElementById("alias").value;

    //Crear el FormData per enviar-lo pel fetch
    const dades_u = new FormData();
    dades_u.append("alias", user);
    dades_u.append("nom_us", nom_u);
    dades_u.append("email_us", email_u);
    dades_u.append("img_link", img_u);
    dades_u.append("foto", file);

    //Fer un fetch per actualitzar les dades de l'usuari
    fetch('http://moviequiz1.alumnes.inspedralbes.cat/front/PHP/controller_MQ.php?action=modificarDadesUsuari', {
        method: "POST",
        body: dades_u,
        contentType: false,
        processData: false
    }).then(response => response.json()).then(data => {

        //Si la query s'ha executat be, es mostrarà un missatge
        if (data.resultat == "ok") {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Informació modificada',
                showConfirmButton: false,
                timer: 1500
            });

            //Refrescar la pagina sense fer F5
            refrescar("a");
        }
    })
}

