/* Carrusel amb les pel·lícules millor valorades */
obtenermejorvaloracion();

/* Mostrar resultats de la búsqueda */
document.getElementById("btn_search").addEventListener("click", function (e) {
    document.getElementById("resultat").classList.remove("oculto");
    document.getElementById("ocultardivsearch").classList.remove("oculto");
    var input = document.getElementById("search").value;
    let valoracio;


    fetch(`https://www.omdbapi.com/?apikey=5149518a&s=${input}&type=movie`).
        then(res => res.json()).
        then(data => {
            var text_movie = "  ";
            for (var i = 0; i < data.Search.length; i++) {
                var idMovie = "movie" + i;
                let data_movie = data.Search[i];
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

                    //Habilitar o no el boto de guarda comentari/valoracio/favorit en funcio de si l'usuari ha fet login
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
})



/* Cards */
function imprimirPelisCards(data_movie, id) {
    var txt = `<div class="col s6 m4 l3" id="${data_movie.imdbID}" class="divpelis">
                <div class="card">
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
        for (var i = 0; i < pelisGuardadas.length; i++) {
            if (document.getElementById(pelisValorades[i].idPelicula) != null) {
                document.querySelector(`#${pelisValorades[i].idPelicula} a`).setAttribute("disabled", '');
            }
        }
    });
}

function obtenermejorvaloracion() {

    fetch('http://localhost/moviequiz-grup-1/front/PHP/controller_MQ.php?action=pelismillorvalorades', {
    }).then(response => response.json()).then(data => {

        document.getElementById("carrousel-fotos").innerHTML = generarcarrrousel(data);

        var imgs = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(imgs, {
            numVisible: 6,
            padding: 2,
        });

    });
}

function generarcarrrousel(data) {
    var carrousel = "";
    for (let i = 0; i < data.length; i++) {
        carrousel += `<a class="carousel-item" href="#"><img src="${data[i].img}" height="320px"></a>`;
    }
    return carrousel;
}


document.getElementById("btn-joc").addEventListener("click", function (e) {
    //Inicialitzar modal joc 
    var joc = document.querySelectorAll('.joc');
    var instances = M.Modal.init(joc, {});
    generarjuego();
    generarpreguntas();
    console.log("generarpreguntas()");

})




/*                                    
</div >

<div class="carousel-item deep-purple black-text" href="#one!">
<h2>First Panel</h2>
<p class="white-text">${data.peliculas[0].Nombre}</p>
</div>
<div class="carousel-item deep-purple black-text" href="#two!">
<h2>Second Panel</h2>
<p class="white-text">This is your second panel</p>
</div>
<div class="carousel-item  deep-purple white-text" href="#three!">
<h2>Third Panel</h2>
<p class="white-text">This is your third panel</p>
</div>
<div class="carousel-item  deep-purple white-text" href="#four!">
<h2>Fourth Panel</h2>
<p class="white-text">This is your fourth panel</p>
</div>
<div class="carousel-item deep-purple white-text" href="#four!">
<h2>Fifth Panel</h2>
<p class="white-text">This is your fourth panel</p>
</div>
*/



function generarjuego() {
    let juego = `
                        <div class="modal-content joc-modal">
                            <div class="header-joc center">
                                <h4><i class="material-icons">games</i> MINIJOC <i class="material-icons">games</i> </h4>
                                <h6>En quin any es va estrenar aquesta pel·lícula?</h6>
                            </div>
                                <div class="carousel joc-carousel carousel-slider center black-text">
                                    <div id="generarpreguntas">
                                </div>
                        </div>
                        <!--<div class="modal-footer">
                            <a href="#!" class="btn modal-close red "><i class="material-icons red">close</i></a>
                        </div>-->`;
    console.log(juego);
    document.getElementById("modaljoc").innerHTML = juego;



};

function generarpreguntas() {
    fetch('http://localhost/moviequiz-grup-1/back/sql/JSON/output_generar_partida.json').then(response => response.json())
        .then(data => {
            console.log(data);
            let preguntas;
            for (let i = 0; i < data.peliculas.length; i++) {
                preguntas += `<div class="carousel-item deep-purple black-text" href="#">
                                    <h2>Minijoc</h2>
                                    <p class="white-text left">${data.peliculas[i].Nombre}</p>
                                    <img style="width: 30%" class="left" src="${data.peliculas[i].Poster}">
                                    <div id="formRadio">
                                    </br>

                                        <label>
                                            <input name="resposta" type="radio" value="${data.peliculas[i].choice1}"/>
                                            <span>${data.peliculas[i].choice1}</span>
                                        </label>
                                        </br>
                                        <label>
                                            <input name="resposta" type="radio" value="${data.peliculas[i].choice2}"/>
                                            <span>${data.peliculas[i].choice2}</span>
                                        </label>
                                        </br>
                                        <label>
                                            <input name="resposta" type="radio" value="${data.peliculas[i].choice3}"/>
                                            <span>${data.peliculas[i].choice3}</span>
                                        </label>
                                        </br>
                                        <label>
                                            <input name="resposta" type="radio" value="${data.peliculas[i].choice4}"/>
                                            <span>${data.peliculas[i].choice4}</span>
                                        </label>
                                    </div>

                                </div>`;

                document.getElementById("generarpreguntas").innerHTML = preguntas;
            }
            //Inicialitzar carousel joc 
            var carr = document.querySelectorAll('.joc-carousel');
            var instance = M.Carousel.init(carr, {
                fullWidth: true,
                indicators: true
            });
        });


}
