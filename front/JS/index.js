/* Carrusel amb les pel·lícules millor valorades */
obtenermejorvaloracion();

/* Obtenir el ranking del joc */
obtenirRankingJoc();

/* Missatge de que l'usuari s'introdueixi */
if(document.getElementById('registrar') != null){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuari introduït',
        showConfirmButton: false,
        timer: 1500
    });
}

/* Mostrar resultats de la búsqueda */
document.getElementById("btn_search").addEventListener("click", function () {
    buscador();
});
document.getElementById("search").addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        buscador();
    }
})


/*  CERCADOR PEL·LÍCULES  */
function buscador() {
    document.getElementById("resultat").classList.remove("oculto");
    document.getElementById("ocultardivsearch").classList.remove("oculto");
    var input = document.getElementById("search").value;
    let valoracio;

    //Agafa les dades de pel·lícules de l'api de Omdb 
    fetch(`https://www.omdbapi.com/?apikey=5149518a&s=${input}&type=movie`).
        then(res => res.json()).
        then(data => {
            var text_movie = "";
            for (var i = 0; i < data.Search.length; i++) {
                var idMovie = "movie" + i;
                let data_movie = data.Search[i];
                //insereix al div "resultat" de l'index.php les pel·lícules a les seves cards
                text_movie += imprimirPelisCards(data_movie, idMovie);
                document.getElementById("resultat").innerHTML = text_movie;
            }

            if (document.getElementById("info-usuari").innerHTML != "") {
                obtenerPelisValoradesUsuario();
            }

            document.getElementById("resultat").addEventListener("click", function (e) {
                if (e.target.classList == "material-icons") {
                    id = e.target.parentElement.href.split("#")[1];
                    numPeli = id.split("e")[1];
                    eliminarModals(data.Search);
                    document.getElementById(id).innerHTML = generarModal(data.Search[numPeli]);

                    //Inicialitzar modals de les pelicules
                    var instances = M.Modal.init(document.querySelectorAll(".modal"), {});

                    //Habilitar o no el boto de guarda comentari/valoracio/favorit si l'usuari no ha fet login
                    if (document.getElementById("info-usuari").innerHTML != "") {
                        document.getElementById("btn-guardar").classList.remove("disabled");
                        document.getElementById("diverror").classList.add("oculto");
                        document.getElementById("resultat").classList.remove("oculto");
                    }

                    guardarValoracio(data);
                }
            });

        })

        document.getElementById("ocultardivsearch").addEventListener("click", function (e) {
            document.getElementById("resultat").classList.add("oculto");
            document.getElementById("ocultardivsearch").classList.add("oculto");
    })
}


/* Cards pel·lícules */
function imprimirPelisCards(data_movie, id) {
    var txt = `<div class="col s6 m4 l3" id="${data_movie.imdbID}" class="divpelis">
                <div class="card hoverable">
                    <div class="card-image">
                        <img class="poster" id="img-peli" src="${data_movie.Poster}" alt="${data_movie.Poster}">
                        <a id="btn btn-modal" class="btn-floating halfway-fab modal-trigger waves-effect waves-light deep-purple darken-1" href="#${id}"><i class="material-icons">add</i></a>
                    </div>

                    <div class="card-content card-title">
                        <span class="black_font">${data_movie.Title}</span><br>
                        <span class="black_font">${data_movie.Year}</span>
                    </div>
                </div>
                <div id="${id}" class="modal"></div>
            </div>`;
    return txt;
}

/* MODALS PER A VALORAR LES PEL·LÍCULES */
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

                        <button id="btn-guardar" class="btn waves-effect waves-light disabled"> Guardar </button>
                        <div id="diverror" class="diverror"><label class="error"><span style="font-size: 20px"> ! </span>Has d'iniciar sessió per poder fer una valoració</label></div>
                    </div>
                    <div class="modal-footer">
                        <a href="#!" class="btn modal-close red "><i class="material-icons red">close</i></a>
                    </div>`;
    return modalHtml;
}

function eliminarModals(data) {
    for (let i = 0; i < data.length; i++) {
        document.getElementById("movie" + i).innerHTML = "";
    }
}

function guardarValoracio(data) {
    //Guardar la valoracio i el comentari d'una peli i si es favorita o no a la BD 


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

        const datosLogin = new FormData();
        datosLogin.append("valoracio", valoracio);
        datosLogin.append("favorit", favorito);
        datosLogin.append("comentari", comentario);
        datosLogin.append('nom-peli', data.Search[numPeli].Title);
        datosLogin.append('any-peli', data.Search[numPeli].Year);
        datosLogin.append('img-peli', data.Search[numPeli].Poster);
        datosLogin.append('id-peli', data.Search[numPeli].imdbID);
        datosLogin.append('nom-usuari', nomUsuari);

        fetch('http://localhost/moviequiz-grup-1/front/PHP/controller_MQ.php?action=valoracio', {
            method: "POST",
            body: datosLogin
        }).then(response => response.json()).then(data => { console.log(data); });
    });
}

function obtenerPelisValoradesUsuario() {
    let user = document.getElementById("alias").value;

    const datos = new FormData();
    datos.append("user", user);

    fetch('http://localhost/moviequiz-grup-1/front/PHP/controller_MQ.php?action=pelisValoradesUsuari', {
        method: "POST",
        body: datos
    }).then(response => response.json()).then(pelisValorades => {
        for (var i = 0; i < pelisValorades.length; i++) {
            //deshabilita el botó per a obrir el modal (de valorar) d'una peli ja valorada per l'usuari
            if (document.getElementById(pelisValorades[i].idPelicula) != null) {
                document.querySelector(`#${pelisValorades[i].idPelicula} a`).setAttribute("disabled", '');
            }
        }
    });
}



function obtenermejorvaloracion() {

    fetch('http://localhost/moviequiz-grup-1/front/PHP/controller_MQ.php?action=pelismillorvalorades', {}).then(response => response.json()).then(data => {

        document.getElementById("carrousel-fotos").innerHTML = generarcarrrousel(data);

        var imgs = document.querySelectorAll('.carousel');

        //Característiques del carousel
        var instances = M.Carousel.init(imgs, {
            numVisible: 6,
            padding: 2,
        });

    });
}

//Funció que genera el carosuel amb les imatges de les pel·lícules
function generarcarrrousel(data) {
    var carrousel = "";
    for (let i = 0; i < data.length; i++) {
        carrousel += `<a class="carousel-item" href="#"><img src="${data[i].img}" height="320px"></a>`;
    }
    return carrousel;
}


/*-------------JOC------------- */
document.getElementById("btn-joc").addEventListener("click", function (e) {
    let pelis = [];

    //Inicialitzar modal del joc 
    var joc = document.querySelectorAll('.joc');
    var instances = M.Modal.init(joc, {});

    generarjuego();
    generarpreguntas();

    document.getElementById('generarpreguntas').addEventListener('click', function (e) {
        if (e.target.name == "resposta") {
            let idPregunta = e.target.parentElement.parentElement.parentElement.id
            let resposta = e.target.value;
            let obj = { 'ImdbID': idPregunta, 'resposta': resposta }
            pelis.push(obj);
        }
    });

    enviarResposta(pelis);

});

function enviarResposta(pelis) {
    document.getElementById('btn-acabarJoc').addEventListener('click', e => {

        let idPelis = [], respuestas = [];

        //Guarda l'id de cada una de les 5 pel·lícules que apareixen al joc
        for (let i = 0; i < pelis.length; i++) {
            var n = 0;
            for (let j = 0; j < idPelis.length; j++) {
                if (pelis[i].ImdbID == idPelis[j]) n++;
            }
            if (n == 0) idPelis.push(pelis[i].ImdbID);
        }

        //Array donde se han extraido el valor de los campos ImdbID del array de objetos 'peli' 
        let pelisImdBID = pelis.map(peli => {
            return peli.ImdbID;
        })

        for (let i = 0; i < idPelis.length; i++) {

            //Obtener el ultimo indice en el que el id de una pelicula puede encontrase en el array aux 
            let val = pelisImdBID.lastIndexOf(idPelis[i]);

            //Guardar la ultima respuesta que se ha hecho de cada pelicula
            respuestas.push(pelis[val]);
        }

        let idParitda = document.getElementById('generarpreguntas').className;
        let nombrePartida = prompt('Nom de la partida: ');

        jsonPartida = {
            'id_partida': idParitda,
            'nom_partida': nombrePartida,
            'respostes': respuestas
        }

        jsonPartida = JSON.stringify(jsonPartida);

        document.getElementById("joc-carousel").innerHTML = `<div id="gif-loading" class="preloader-wrapper big active margen-top margen-bottom">
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
                                                            </div>`;

        const datos = new FormData();
        datos.append("respostes", jsonPartida);

        if (document.getElementById("info-usuari").innerHTML != "") {
            let user = document.getElementById("alias").value;
            datos.append('userPartida', user);
        }

        fetch('http://localhost/moviequiz-grup-1/front/PHP/controller_MQ.php?action=comprovarJoc', {
            method: "POST",
            body: datos
        }).then(response => response.json())
            .then(data => {

                //Oculta dades innecessaries al mostrar el resultat del joc
                document.getElementById("btn-acabarJoc").classList.add("oculto");
                document.getElementById("enunciatJoc").classList.add("oculto");

                console.log(data);
                let puntuacion;
                var tpunts = data.encerts * 3 + data.fallos * -1;
                //Imprimeix el resultat del joc
                puntuacion = `<div class="modal-content resultat-joc deep-purple center">
                                <h4>${data.nom_partida}</h4>
                                </br>
                                <h5><i class="icon-resultat material-icons green-text text-accent-3">check</i>Encerts: ${data.encerts}</h5>
                                <h5><i class="icon-resultat material-icons red-text">close</i>Errors: ${data.fallos}</h5>
                                <h5 class="karma">Puntuació: ${tpunts}/15</h5>`;

                // Depenent de si s'ha arribat a la mitja o no mostra un gif que enfatitza 
                if (tpunts < 7) {
                    puntuacion += `<img class="gifJoc" src="../IMG/bad.gif">`;
                } else {
                    puntuacion += `<img class="gifJoc" src="../IMG/welldone.gif">`;
                }

                //Botó per a tancar el modaldel resultat del joc
                puntuacion += `<a id="cerrarModal-joc" href="#!" class="btn modal-close red oculto"><i class="material-icons red">close</i></a>
                            </div>`;

                //Sobrescriu el modal que ja hi existia amb els resultats
                document.getElementById("joc-carousel").innerHTML = puntuacion;
                document.getElementById("cerrarModal-joc").classList.remove("oculto");
            });
    });
}


function generarjuego() {
    let juegoHTML = `<div class="modal-content joc-modal">
                        <div class="header-joc center" id="pr">
                            <h4><i class="material-icons">games</i> MINIJOC <i class="material-icons">games</i> </h4>
                            <h6 id="enunciatJoc">En quin any es va estrenar aquesta pel·lícula?</h6>
                            <div class="center">
                                <a id="btn-acabarJoc" class="btn waves-effect">Enviar</a>
                            </div>
                        </div>
                        
                        <div id="joc-carousel" class="carousel joc-carousel carousel-slider center black-text">
                            <div id="generarpreguntas"></div>
                        </div>

                    </div>`;
                    
    document.getElementById("modaljoc").innerHTML = juegoHTML;
};


function generarpreguntas() {

    let val = 'fallo';
    const datos = new FormData();

    if (document.getElementById("info-usuari").innerHTML != "") {
        let user = document.getElementById("alias").value;
        val = 'exito';
        datos.append('jocUser', user);
    }

    datos.append('joc', val);

    fetch('http://localhost/moviequiz-grup-1/front/PHP/controller_MQ.php?action=joc', {
        method: "POST",
        body: datos
    }).then(response => response.json())
        .then(data => {
            console.log(data);
            let preguntas = "";
            //Genera les 5 preguntes / pel·lícules com a diapositives del carousel
            for (let i = 0; i < data.peliculas.length; i++) {
                preguntas += `<div class="row carousel-item deep-purple black-text" href="#">

                                <div class="col s12 m5">
                                    <img class="img_joc center" src="${data.peliculas[i].Poster}">
                                </div>

                                <div class="col s12 m5 center">
                                    <h4 class="white-text center titol_peli_joc">${data.peliculas[i].Nombre}</h4>
                                </div>
                                
                                <div id="${data.peliculas[i].ImdbID}" class="form-joc col s6 center">
                                    <form>
                                        <label class="opcions-joc">
                                            <input name="resposta" type="radio" value="${data.peliculas[i].choice1}"/>
                                            <span class="resposta-joc">${data.peliculas[i].choice1}</span>
                                        </label>
                                        </br>
                                        <label class="opcions-joc">
                                            <input name="resposta" type="radio" value="${data.peliculas[i].choice2}"/>
                                            <span class="resposta-joc">${data.peliculas[i].choice2}</span>
                                        </label>
                                        </br>
                                        <label class="opcions-joc">
                                            <input name="resposta" type="radio" value="${data.peliculas[i].choice3}"/>
                                            <span class="resposta-joc">${data.peliculas[i].choice3}</span>
                                        </label>
                                        </br>
                                        <label class="opcions-joc">
                                            <input name="resposta" type="radio" value="${data.peliculas[i].choice4}"/>
                                            <span class="resposta-joc">${data.peliculas[i].choice4}</span>
                                        </label>
                                        </br>
                                        <label>
                                            <input name="resposta" type="radio" value="${data.peliculas[i].choice5}"/>
                                            <span class="resposta-joc">${data.peliculas[i].choice5}</span>
                                        </label>
                                    </form>
                                </div>  
                            </div>`;
            }

            //Insereix les 5 preguntes/pel·lícules
            document.getElementById("generarpreguntas").innerHTML = preguntas;
            document.getElementById("generarpreguntas").classList.add(`${data.id_partida}`);


            //Inicialitzar carousel joc 
            var carr = document.querySelectorAll('.joc-carousel');
            var instance = M.Carousel.init(carr, {
                fullWidth: true,
                indicators: true
            });
        });
}

function obtenirRankingJoc() {
    fetch('http://localhost/moviequiz-grup-1/front/PHP/controller_MQ.php?action=ranking')
        .then(response => response.json())
        .then(usuarisRanking => {
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
                                    <td><a href="#${usuari.user}" class="modal-trigger">${usuari.user}</a></td>
                                    <td>${usuari.punts}</td>
                                </tr>`;
            });

            rankingHTML += `</tbody></table>`;

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

            document.getElementById('ranking-usuaris').innerHTML = rankingHTML;
            var elems = document.querySelectorAll('.usuarisModals');
            var instances = M.Modal.init(elems, {});
        });
}