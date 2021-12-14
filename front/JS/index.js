/* Carrusel */
document.addEventListener("DOMContentLoaded", function () {
    var imgs = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(imgs, {
        numVisible: 10,
        padding: 2,
    });
});

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
                text_movie += imprimirPelisModals(data_movie, idMovie);
                document.getElementById("resultat").innerHTML = text_movie;
            }

            document.getElementById("resultat").addEventListener("click", function (e) {
                if (e.target.classList == "material-icons") {
                    id = e.target.parentElement.href.split("#")[1];
                    numPeli = id.split("e")[1];
                    eliminarModals(data.Search);
                    document.getElementById(id).innerHTML = generarModal(data.Search[numPeli]);
                    var instances = M.Modal.init(document.querySelectorAll(".modal"), {});

                    if (document.getElementById("info-usuari").innerHTML != "") {
                        document.getElementById("btn-guardar").classList.remove("disabled");
                        document.getElementById("diverror").classList.add("oculto");
                        document.getElementById("resultat").classList.remove("oculto");
                    }

                    document.getElementById("formRadio").addEventListener("click", function (e) {
                        valoracio = e.target.parentElement.querySelector("[name='valoracio']").value;
                    })

                    document.getElementById("btn-guardar").addEventListener("click", function (e) {
                        let favorito = e.target.parentElement.querySelector("[name='fav']").checked;
                        let comentario = e.target.parentElement.querySelector("#comentario").value;
                        let nomUsuari = document.getElementById('alias').value;

                        const datosLogin = new FormData();
                        datosLogin.append("valoracio", valoracio);
                        datosLogin.append("favorit", favorito);
                        datosLogin.append("comentari", comentario);
                        datosLogin.append('nom-peli', data.Search[numPeli].Title);
                        datosLogin.append('any-peli', data.Search[numPeli].Year);
                        datosLogin.append('img-peli', data.Search[numPeli].Poster);
                        datosLogin.append('nom-usuari', nomUsuari);

                        fetch('http://localhost/moviequiz-grup-1/front/PHP/controller_MQ.php?action=valoracio', {
                            method: "POST",
                            body: datosLogin
                        }).then(response => {
                            console.log(response);
                        });
                    });
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
                        <a id="btn-modal" class="btn-floating halfway-fab modal-trigger waves-effect waves-light red" href="#${id}"><i class="material-icons">add</i></a>
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

function generarModal(nom) {
    var modalHtml = `<div class="modal-content center-align">
                        <h4 class="center-align cyan-text text-darken-3 ">${nom.Title}</h4>
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

function obtenerPelisGuardadasUsuario() {
    let user = document.getElementById("alias").value;

    const datos = new FormData();
    datos.append("user", user);

    fetch('http://localhost/moviequiz-grup-1/front/PHP/controller_MQ.php?action=pelisValoradesUsuari', {
        method: "POST",
        body: datos
    }).then(response => response.json())
        .then(pelisGuardadas => {
            for (var i = 0; i < pelisGuardadas.length; i++) {
                document.querySelector(`#${pelisGuardadas[i].idPelicula} a`).setAttribute("disabled", '');
            }
        });
}