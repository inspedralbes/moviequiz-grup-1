/* Generar el carrusel amb les pel·lícules millor valorades */
obtenerPelisMejorValoracion();

/* Generar el ranking del joc */
obtenirRankingJoc();

/* Mostrar un missatge si l'usuari s'ha registrat correctament a la BD */
if (document.getElementById('registrar') != null) {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuari introduït',
        showConfirmButton: false,
        timer: 1500
    });
}

/* Funcio que engloba tota la funcionalitat de cercar de pelis */
busquedaPeliculas();

/* Funcio que engloba tota la funcionalitat de cercar de pelis */
function busquedaPeliculas() {

    //Cercar quan es fa click al boto de cercar
    document.getElementById("btn_search").addEventListener("click", function () {
        buscador();
    });

    //Cercar quan es pressiona el boto d'enter
    document.getElementById("search").addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            buscador();
        }
    });
}

/*  Funcio que cerca una pelicula i mostra els resultats de la cerca  */
function buscador(a = "") {

    //Ocultar el div on es trobarà el resultat de la cerca i boto que oculta el div anterior
    document.getElementById("resultat").classList.remove("oculto");
    document.getElementById("ocultardivsearch").classList.remove("oculto");

    //Obtenir el que s'ha introduit al input de la cerca
    var input = document.getElementById("search").value;

    //Peticio a l'api d'Omdb amb el parametre s = "peli que volem cercar"
    fetch(`https://www.omdbapi.com/?apikey=5149518a&s=${input}&type=movie`).
        then(res => res.json()).
        then(data => {

            //Si no es troba res, missatge d'error
            if (data.Response == "False" && a == "") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error en la cerca de la pel·lícula introduïda',
                    showConfirmButton: false,
                    timer: 1500
                });
            }

            //Si es troba informacio, mostrar una graella amb les pelis
            else {
                var text_movie = "";
                for (var i = 0; i < data.Search.length; i++) {
                    var idMovie = "movie" + i;
                    let data_movie = data.Search[i];

                    //Inserir al div "resultat" la graella amb les pel·lícules resultants de la cerca
                    text_movie += generarPelisCards(data_movie, idMovie);
                    document.getElementById("resultat").innerHTML = text_movie;
                }

                //Si s'ha fet login, comprovar quines pelis ja s'han guardat / valorat per tal de deshabilitar el boto que obre el modal que serveix per valorar cada peli
                if (document.getElementById("info-usuari").innerHTML != "") {
                    obtenerPelisValoradesUsuario();
                }

                //Generar el modal (de la peli on es fa click) que ens permetrà valorar/guardar-la
                document.getElementById("resultat").addEventListener("click", function (e) {
                    if (e.target.classList == "material-icons") {
                        id = e.target.parentElement.href.split("#")[1];
                        numPeli = id.split("e")[1];

                        eliminarModals(data.Search);
                        document.getElementById(id).innerHTML = generarModal(data.Search[numPeli]);

                        //Inicialitzar modals de les pelicules
                        var instances = M.Modal.init(document.querySelectorAll(".modal"), {});

                        //Habilitar o no el boto de guardar comentari/valoracio/favorit en funcio de si l'usuari ha fet o no login
                        if (document.getElementById("info-usuari").innerHTML != "") {
                            document.getElementById("btn-guardar").classList.remove("disabled");
                            document.getElementById("diverror").classList.add("oculto");
                            document.getElementById("resultat").classList.remove("oculto");
                        }

                        //Guardar la valoracio a la BD
                        guardarValoracio(data);
                    }
                });
            }
        });

    document.getElementById("ocultardivsearch").addEventListener("click", function (e) {
        document.getElementById("resultat").classList.add("oculto");
        document.getElementById("ocultardivsearch").classList.add("oculto");
    })
}

/* Generar les cards de les pel·lícules */
function generarPelisCards(data_movie, id) {
    var txt = `<div class="col s6 m4 l3" id="${data_movie.imdbID}" class="divpelis">
                <div class="card hoverable">
                    <div class="card-image">
                        <img class="poster" id="img-peli" src="${data_movie.Poster}" alt="${data_movie.Poster}">
                        <a id="btn btn-modal" class="btn-floating halfway-fab modal-trigger waves-effect waves-light deep-purple darken-1" href="#${id}"><i class="material-icons">add</i></a>
                    </div>

                    <div class="card-content card-title">
                        <span class="black_font">${data_movie.Title}</span>
                    </div>
                </div>
                <div id="${id}" class="modal"></div>
            </div>`;
    return txt;
}

/* GENERAR EL MODAL QUE SERVEIX PER A VALORAR LA PEL·LÍCULA SELECCIONADA */
function generarModal(nom) {
    var modalHtml = `<div class="modal-content center-align">
                        <h4 class="center-align purple-text text-darken-3 ">${nom.Title}</h4>
                        </br>
                        <div>
                            <label>
                                <input type="checkbox" id="fav" name="fav"/>
                                <span>Afegir a favorites </span>
                            </label>
                        </div>

                        <div id="formRadio">
                        </br>
                            <h5 class="red-text darken-1">Valoració</h5>
                            </br>

                            <label>
                                <input name="valoracio" type="radio" value="1"/>
                                <span>1</span>
                            </label>
                            <label>
                                <input name="valoracio" type="radio" value="2"/>
                                <span>2</span>
                            </label>
                            <label>
                                <input name="valoracio" type="radio" value="3"/>
                                <span>3</span>
                            </label>
                            <label>
                                <input name="valoracio" type="radio" value="4"/>
                                <span>4</span>
                            </label>
                            <label>
                                <input name="valoracio" type="radio" value="5"/>
                                <span>5</span>
                            </label>
                        </div>

                        <div class="input-field">
                            <textarea id="comentario" class="materialize-textarea" data-length="200"></textarea>
                            <label for="comentario">Comentari</label>
                        </div>

                        <button id="btn-guardar" class="btn waves-effect waves-light black_font disabled"> Guardar </button>
                        <div id="diverror" class="diverror"><label class="error"><span style="font-size: 20px"> ! </span>Has d'iniciar sessió per poder fer una valoració</label></div>
                    </div>
                    <div class="modal-footer">
                        <a href="#!" class="btn modal-close red "><i class="material-icons red">close</i></a>
                    </div>`;
    return modalHtml;
}

//Funcio que serveix per eliminar els modals (que serveixen per valorar una peli) ja existents
function eliminarModals(data) {
    for (let i = 0; i < data.length; i++) {
        document.getElementById("movie" + i).innerHTML = "";
    }
}

//Funcio que serveix per guardar la valoracio i el comentari d'una peli i si es favorita o no a la BD 
function guardarValoracio(data) {

    //Listener per obtenir el valor (del input radio seleccionat) de la valoracio de la peli 
    document.getElementById("formRadio").addEventListener("click", function (e) {
        valoracio = e.target.parentElement.querySelector("[name='valoracio']").value;
    })

    //Listener per recollir totes les dades i enviarles a la BD 
    document.getElementById("btn-guardar").addEventListener("click", function (e) {

        //Recollida de dades
        let favorito = e.target.parentElement.querySelector("[name='fav']").checked;
        favorito = (favorito == true) ? 1 : 0;
        let comentario = e.target.parentElement.querySelector("#comentario").value;
        let nomUsuari = document.getElementById('alias').value;

        //Creacio del FormData que enviarem pel fetch
        const datosLogin = new FormData();
        datosLogin.append("valoracio", valoracio);
        datosLogin.append("favorit", favorito);
        datosLogin.append("comentari", comentario);
        datosLogin.append('nom-peli', data.Search[numPeli].Title);
        datosLogin.append('any-peli', data.Search[numPeli].Year);
        datosLogin.append('img-peli', data.Search[numPeli].Poster);
        datosLogin.append('id-peli', data.Search[numPeli].imdbID);
        datosLogin.append('nom-usuari', nomUsuari);

        //Peticio fetch que guardarà la valoracio/comentari/favorit a la BD
        fetch('http://moviequiz1.alumnes.inspedralbes.cat//front/PHP/controller_MQ.php?action=valoracio', {
            method: "POST",
            body: datosLogin
        }).then(response => response.json())
            .then(data => {

                //Si el resultat del fetch es "existeix", mostrar missatge d'error
                if (data.resultat == "existeix") {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Ja s\' fet una valoració / un comentari a aquesta pel·lícula',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

                //Si el resultat del fetch es "be", mostrar missatge d'ok
                else if (data.resultat == "be") {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Valoració introduïda',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    document.body.style.overflow = "initial";

                    //Refrescar la pagina sense fer F5
                    refrescar();
                }
            });
    });
}

function obtenerPelisValoradesUsuario() {

    //Obtenir el nom d'usuari de la persona que ha fet login
    let user = document.getElementById("alias").value;

    const datos = new FormData();
    datos.append("user", user);

    //Fer un peticio fetch per tal d'obtenir les pelis que ha valorat la persona que ha fet login
    fetch('http://moviequiz1.alumnes.inspedralbes.cat//front/PHP/controller_MQ.php?action=pelisValoradesUsuari', {
        method: "POST",
        body: datos
    }).then(response => response.json()).then(pelisValorades => {
        for (var i = 0; i < pelisValorades.length; i++) {

            //Deshabilita el botó (de cada peli ja valorada) que serveix per a obrir el modal que ens permet valorar una peli.
            if (document.getElementById(pelisValorades[i].idPelicula) != null) {
                document.querySelector(`#${pelisValorades[i].idPelicula} a`).setAttribute("disabled", '');
            }
        }
    });
}

/* Generar el carrusel amb les pel·lícules millors valorades */
function obtenerPelisMejorValoracion() {

    //Peticio fetch de les pelis millors valorades
    fetch('http://moviequiz1.alumnes.inspedralbes.cat//front/PHP/controller_MQ.php?action=pelismillorvalorades')
        .then(response => response.json())
        .then(data => {

            //Inserir al div -> carrousel-fotos, el codi HTML del carrousel 
            document.getElementById("carrousel-fotos").innerHTML = generarcarrrousel(data);

            //Inicialitzar carrousel
            var imgs = document.querySelectorAll('.carousel');

            /* Característiques del carousel */
            var instances = M.Carousel.init(imgs, {
                numVisible: 6,
                padding: 2,
                indicators: true,
            });

            let indicatorItems = document.querySelectorAll('.carousel .indicator-item'),
                slideTime = 3500,
                activeClass = "active";

            setInterval(() => {
                indicatorItems.forEach(el => {
                    if (el.classList.contains(activeClass)) {
                        sib = el.nextElementSibling;
                        if (sib == null) {
                            indicatorItems[0].click();
                        } else {
                            sib.click()
                        }
                    }
                });
            }, slideTime);
        });
};

//Funció que genera el codi HTML carosuel amb les imatges de les pel·lícules millors valorades
function generarcarrrousel(data) {
    var carrousel = "";
    for (let i = 0; i < data.length; i++) {
        carrousel += `<a class="carousel-item" href="#"><img src="${data[i].img}" height="300px"></a>`;
    }
    return carrousel;
}

/* Listener que activa el joc */
document.getElementById("btn-joc").addEventListener("click", function (e) {
    let pelis = [];

    //Inicialitzar el modal del joc 
    var joc = document.querySelectorAll('.joc');
    var instances = M.Modal.init(joc, {});

    //Funcions per genrar el codi HTML del joc
    generarjuego();
    generarpreguntas();

    //Si es fa click a un dels inputs[type="radio"] que apareixen com a resposta de cada pregunta del joc, es guarda la resposta seleccionada a un array d'objectes
    document.getElementById('generarpreguntas').addEventListener('click', function (e) {
        if (e.target.name == "resposta") {
            let idPregunta = e.target.parentElement.parentElement.parentElement.id
            let resposta = e.target.value;
            let obj = { 'ImdbID': idPregunta, 'resposta': resposta }
            pelis.push(obj);
        }
    });

    //Enviar les respostes per compravar si son correctes
    enviarResposta(pelis);
});

function enviarResposta(pelis) {

    //Listener que s'activa quan es fa click al boto de enviar dades del joc
    document.getElementById('btn-acabarJoc').addEventListener('click', e => {
        let idPelis = [], respuestas = [];

        //Guardar l'id de cada una de les 5 pel·lícules que apareixen al joc
        for (let i = 0; i < pelis.length; i++) {
            var n = 0;
            for (let j = 0; j < idPelis.length; j++) {
                if (pelis[i].ImdbID == idPelis[j]) n++;
            }
            if (n == 0) idPelis.push(pelis[i].ImdbID);
        }

        //Crear un array format per només el valor dels camps ImdbID del array d'objectes 'pelis' 
        let pelisImdbID = pelis.map(peli => {
            return peli.ImdbID;
        })

        for (let i = 0; i < idPelis.length; i++) {

            //Obtenir l'ultima posicio del array pelisImdbID en el que es pot trobar l'id d'una de les peli que hi apareixen a l'array idPelis  
            let val = pelisImdbID.lastIndexOf(idPelis[i]);

            //Guardar l'ultima resposta que s'ha fet de cada peli a l'array 'respuestas'
            respuestas.push(pelis[val]);
        }

        //Obtenir el id de la partida
        let idParitda = document.getElementById('generarpreguntas').className;

        //Preguntar pel nom de la partida
        let nombrePartida = prompt('Nom de la partida: ');

        //Crear un objecte que volem enviar al servidor per comprovar les respostes
        jsonPartida = {
            'id_partida': idParitda,
            'nom_partida': nombrePartida,
            'respostes': respuestas
        }

        //Convertir l'objecte creat en una cadena de text JSON
        jsonPartida = JSON.stringify(jsonPartida);

        //Inserir al div -> joc-carousel el codi HTML que mostra un spinner
        document.getElementById("joc-carousel").innerHTML = `<br><div class="center"><div id="gif-loading" class="preloader-wrapper big active margen-top margen-bottom">
                                                                <div class="spinner-layer spinner-blue-only">
                                                                    <div class="circle-clipper left">
                                                                        <div class="circle"></div>
                                                                    </div>
                                                                    <div class="gap-patch">
                                                                        <div class="circle"></div>
                                                                    </div>
                                                                    <div class="circle-clipper right">
                                                                        <div class="circle"></div>
                                                                    </div>
                                                                </div>
                                                            </div></div>`;

        //Crear el FormData per enviar les respostes al servidor i obtenir algunes dades o unes altres en funcio de si s'ha fet login o no
        const datos = new FormData();
        datos.append("respostes", jsonPartida);

        if (document.getElementById("info-usuari").innerHTML != "") {
            let user = document.getElementById("alias").value;
            datos.append('userPartida', user);
        }

        //Fer un fetch al servidor per comprovar les respostes seleccionades
        fetch('http://moviequiz1.alumnes.inspedralbes.cat//front/PHP/controller_MQ.php?action=comprovarJoc', {
            method: "POST",
            body: datos
        }).then(response => response.json())
            .then(data => {

                //Oculta dades innecessaries al mostrar el resultat del joc
                document.getElementById("btn-acabarJoc").classList.add("oculto");
                document.getElementById("enunciatJoc").classList.add("oculto");

                //Processar les dades obtingudes despres que el servidor fes la comprovacio de les respostes seleccionades
                let puntuacion;
                var tpunts = data.encerts * 3 + data.fallos * -1;
                if (tpunts < 0) tpunts = 0;

                //Crear el codi HTML del resultat del joc
                puntuacion = `<div class="modal-content resultat-joc deep-purple center">
                                <div>                
                                    <h4>Partida: ${data.nom_partida}</h4>
                                </div>
                                <div> 
                                    <h5><i class="icon-resultat material-icons green-text text-accent-3">check</i>Encerts: ${data.encerts}</h5>
                                    <h5><i class="icon-resultat material-icons red-text">close</i>Errors: ${data.fallos}</h5>
                                </div>
                                <div>
                                    <h5 class="karma">Puntuació: ${tpunts}/15</h5>
                                </div><div>`;


                // Depenent de si s'ha aprovat o no, es mostra un gif que enfatitza el resultat
                if (tpunts < 7) {
                    puntuacion += `<img class="img_joc" src="./front/IMG/bad.gif">`;
                } else {
                    puntuacion += `<img class="img_joc" src="./front/IMG/welldone.gif">`;
                }

                //Botó per a tancar el modal del joc
                puntuacion += `</div><div><a id="cerrarModal-joc" href="#!" class="btn modal-close red"><i class="material-icons red">close</i></a>
                            </div></div>`;

                //Inserir al div -> joc-carousel els resultats del joc
                document.getElementById("joc-carousel").innerHTML = puntuacion;
            });
    });
}

//Funcio per generar i inserir l'estructura HTML del modal del joc al div -> modaljoc
function generarjuego() {
    let juegoHTML = `<div class="modal-content joc-modal">
                        <div class="header-joc center" id="pr">
                            <h4><i class="material-icons">games</i> MINIJOC <i class="material-icons">games</i> </h4>
                            <h6 id="enunciatJoc">En quin any es va estrenar aquesta pel·lícula?</h6>
                            <div>
                                <a id="btn-acabarJoc" class="btn waves-effect black_font">Enviar</a>
                            </div>
                        </div>
                        
                        <div id="joc-carousel" class="carousel joc-carousel carousel-slider black-text">
                            <div id="generarpreguntas"></div>
                        </div>

                    </div>`;

    document.getElementById("modaljoc").innerHTML = juegoHTML;
};

// Funcio per generar les 5 preguntes de les pelis
function generarpreguntas() {

    //Enviar unes dades o unes altres en funcio de si s'ha fet login o no
    let val = 'fallo';
    const datos = new FormData();

    if (document.getElementById("info-usuari").innerHTML != "") {
        let user = document.getElementById("alias").value;
        val = 'exito';
        datos.append('jocUser', user);
    }

    datos.append('joc', val);

    //Fer fetch per obtenir i inserir les 5 preguntes de les pelis
    fetch('http://moviequiz1.alumnes.inspedralbes.cat//front/PHP/controller_MQ.php?action=joc', {
        method: "POST",
        body: datos
    }).then(response => response.json())
        .then(data => {
            let preguntas = "";

            //Generar el codi HTML de les 5 preguntes que es mostraran com a diapositives del carousel
            for (let i = 0; i < data.peliculas.length; i++) {
                preguntas += `<div class="row carousel-item deep-purple black-text" href="#">

                                <div class="col s6 center">
                                    <img class="img_joc center" src="${data.peliculas[i].Poster}">
                                </div>
                                
                                <div id="${data.peliculas[i].ImdbID}" class="form-joc col s6 center">
                                    <h4 class="white-text center titol_peli_joc">${data.peliculas[i].Nombre}</h4>
                                    <form>
                                        <label class="opcions-joc">
                                            <input name="resposta" type="radio" value="${data.peliculas[i].choice1}"/>
                                            <span class="resposta-joc white_font">${data.peliculas[i].choice1}</span>
                                        </label>
                                        </br>
                                        <label class="opcions-joc">
                                            <input name="resposta" type="radio" value="${data.peliculas[i].choice2}"/>
                                            <span class="resposta-joc  white_font">${data.peliculas[i].choice2}</span>
                                        </label>
                                        </br>
                                        <label class="opcions-joc">
                                            <input name="resposta" type="radio" value="${data.peliculas[i].choice3}"/>
                                            <span class="resposta-joc white_font">${data.peliculas[i].choice3}</span>
                                        </label>
                                        </br>
                                        <label class="opcions-joc">
                                            <input name="resposta" type="radio" value="${data.peliculas[i].choice4}"/>
                                            <span class="resposta-joc white_font">${data.peliculas[i].choice4}</span>
                                        </label>
                                        </br>
                                        <label>
                                            <input name="resposta" type="radio" value="${data.peliculas[i].choice5}"/>
                                            <span class="resposta-joc white_font">${data.peliculas[i].choice5}</span>
                                        </label>
                                    </form>
                                </div>  
                            </div>`;
            }

            //Inserir les 5 preguntes de les pel·lícules i la classe formada per l'id de la partida al div -> generarpreguntas
            document.getElementById("generarpreguntas").innerHTML = preguntas;
            document.getElementById("generarpreguntas").classList.add(`${data.id_partida}`);


            //Inicialitzar el carrusel del joc 
            var carr = document.querySelectorAll('.joc-carousel');
            var instance = M.Carousel.init(carr, {
                fullWidth: true,
                indicators: true
            });
        });
}

// Funcio per generar el codi HTML del ranking total del joc 
function obtenirRankingJoc() {

    //Peticio fetch per obtenir els 3 users amb la millor puntuació 
    fetch('http://moviequiz1.alumnes.inspedralbes.cat//front/PHP/controller_MQ.php?action=ranking')
        .then(response => response.json())
        .then(usuarisRanking => {

            //Crear una taula amb els resultats del fetch
            let rankingHTML = `<table class="highlight responsive-table centered">
                                <thead>
                                    <tr>
                                        <th>Usuari</th>
                                        <th>Puntuació</th>
                                    </tr>
                                </thead>
                               <tbody>`;


            usuarisRanking.forEach(usuari => {
                rankingHTML += `<tr>
                                    <td><a href="#${usuari.user}" class="modal-trigger white_font">${usuari.user}</a></td>
                                    <td>${usuari.punts}</td>
                                </tr>`;
            });

            rankingHTML += `</tbody></table>`;

            //Generar el codi HTML del modal de cadascun dels usuaris que surten al ranking
            usuarisRanking.forEach(usuari => {
                rankingHTML += `<div id="${usuari.user}" class="modal usuarisModals bottom-sheet">
                                    <div class="modal-content">
                                        <div class="row center flex">
                                            <div class="col s6">
                                                <h4>${usuari.nom} ${usuari.cognoms}</h4>
                                                <p>${usuari.email}</p>
                                            </div>
                                            <div class="col s6">
                                                <img src="${usuari.imatge}" class="imgModalUsuari">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Tancar</a>
                                    </div>
                                </div>`;
            });

            //Inserir al div -> ranking-usuaris el codi HTML del ranking
            document.getElementById('ranking-usuaris').innerHTML = rankingHTML;

            //Inicialitzar els modals dels 3 usuaris amb millor puntuacio
            var elems = document.querySelectorAll('.usuarisModals');
            var instances = M.Modal.init(elems, {});
        });
}

function refrescar(a = ""){
    login();
    obtenirRankingJoc();
    obtenerPelisMejorValoracion();
    buscador(a);
}