/* Inicialitzar modals */
document.getElementById("btn_login").addEventListener("click", function (e) {
    var instances = M.Modal.init(document.querySelector(".login"), {});
})

/* USUARI REGISTRAT */
document.getElementById("btn_entrar").addEventListener("click", function () { login(); });

document.getElementById("pwd").addEventListener('keydown', e => {
    if (e.key === 'Enter') { login(); }
});

function login() {
    let usu = document.getElementById("usuari").value;
    let pwd = document.getElementById("pwd").value;

    const datosLogin = new FormData();
    datosLogin.append("usuari", usu);
    datosLogin.append("pwd", pwd);

    fetch('http://localhost/moviequiz-grup-1/front/PHP/controller_MQ.php?action=login', {
        method: "POST",
        body: datosLogin
    }).then(response => response.json()).then(data => {
        //Si hi ha un usuari loggejat ...
        if (data.exito == true) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'S\'ha iniciat la sessió!',
                showConfirmButton: false,
                timer: 1500
            });

            //Inserir al header el nom de l'usuari y la seva imatge
            document.getElementById("resultat_header").innerHTML = codigoHTMLheaderuser(data);


            //Ocultar botó login, carusel
            document.getElementById("btn_login").classList.add("oculto");
            document.getElementById("carrousel-fotos").classList.add("oculto");
            document.getElementById("carrousel-titol").classList.add("oculto");

            //Mostrar l'informació de l'usuari i l'apartatar de "les Meves Pel·lícules"
            document.getElementById("info-usuari").classList.remove("oculto");
            document.getElementById("apartadoMisPeliculas").classList.remove("oculto");
            //Inserir l'informació de l'usuari
            document.getElementById("info-usuari").innerHTML = codigoHTMLuser(data);
            //No mostrar el botó de desar les dades de l'usuari
            document.getElementById("btn_save").classList.add("oculto");

            //Mostrar totes les dades modificables al pressionar el botó d'editar i habilitar la seva edició
            document.getElementById("btn_edit").addEventListener("click", function (e) {
                document.getElementById("nom_us").removeAttribute("disabled");
                document.getElementById("email_us").removeAttribute("disabled");
                document.getElementById("canviar_img_usr").classList.remove("oculto");
                document.getElementById("img_usr_label").classList.remove("oculto");
                document.getElementById("btn_save").classList.remove("oculto");
                document.getElementById("btn_edit").classList.add("oculto");
            });

            //Ocultar dades modificables al pressionar el botó de dessar i deshabilitar la seva edició
            document.getElementById("btn_save").addEventListener("click", function (e) {
                document.getElementById("nom_us").setAttribute("disabled", "");
                document.getElementById("email_us").setAttribute("disabled", "");
                document.getElementById("canviar_img_usr").classList.add("oculto");
                document.getElementById("img_usr_label").classList.add("oculto");
                document.getElementById("btn_edit").classList.remove("oculto");
                document.getElementById("btn_save").classList.add("oculto");
                dadesUsuariModificades();
            });

            //Mostrar les pel·lícules desades per l'usuari
            misPeliculas();

        } else {
            //Mostrar notificació conform no s'ha pogut iniciar la sessió
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

/* Codi per a inserir al header el nom de l'usuari y la seva imatge */
function codigoHTMLheaderuser(datos) {
    let text = `<div class="flex navbar">
                <div>${datos.usuari}</div>
                <div class="pad">
                    <img class="img_header circle responsive-img" src="${datos.imagen}">
                </div>
                <div>
                    <a id="btn_logout" href="logout.php" class="modal-trigger waves-effect waves-light black_font btn">LOGOUT</a>
                </div>
              </div>`;
    return text;
}


/* FORMULARI DADES (EDITABLES) USUARI */
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

/* SECCIÓ "LES MEVES PEL·LÍCULES" */
function misPeliculas() {
    let user = document.getElementById("alias").value;
    let codi;

    const datos = new FormData();
    datos.append("user", user);

    fetch('http://localhost/moviequiz-grup-1/front/PHP/controller_MQ.php?action=pelisGuardadesUsuari', {
        method: "POST",
        body: datos
    }).then(response => response.json()).then(pelisGuardades => {
        codi = misPeliculasHTML(pelisGuardades);
        document.getElementById("apartadoMisPeliculas").innerHTML = codi;
        //Inicialitzar el colapsable que mostrará "Les Meves Pel·lícules"
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, {});
    });
}

/* Llista amb les pel·lícules favorites de l'usuari */
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
                            <input type="checkbox" checked name="favorit-${datos[i].idPelicula}" id="favorit-${datos[i].idPelicula}"/>
                            <span>Guardat</span>
                            </label>
                        </p>
                    </div>
                </li>`;
    }
    text += '</ul>';
    return text;
}

/* GUARDAR DADES D'EDITAR LES DADES DE L'USUARI */
function dadesUsuariModificades() {
    let file = document.getElementById("foto-input").files[0];
    let nom_u = document.getElementById("nom_us").value;
    let email_u = document.getElementById("email_us").value;
    let img_u = document.getElementById("img_link").value;
    let user = document.getElementById("alias").value;

    const dades_u = new FormData();
    dades_u.append("alias", user);
    dades_u.append("nom_us", nom_u);
    dades_u.append("email_us", email_u);
    dades_u.append("img_link", img_u);
    dades_u.append("foto", file);

    fetch('http://localhost/moviequiz-grup-1/front/PHP/controller_MQ.php?action=modificarDadesUsuari', {
        method: "POST",
        body: dades_u,
        contentType: false,
        processData: false
    }).then(response => response.json()).then(data => {
        console.log(data);
    }).catch((error) => {
        console.log(error)
    });;
}