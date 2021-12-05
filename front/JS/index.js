$(document).ready(function() {
    $('input#input_text, textarea#textarea1').characterCounter();
});

document.getElementById("btn_search").addEventListener("click", function(e) {
    var input = document.getElementById("search").value;
    let valoracio;
    fetch(`https://www.omdbapi.com/?apikey=5149518a&s=${input}&type=movie`).
    then(res => res.json()).
    then(data => {
        var text_movie = "";
        for (var i = 0; i < data.Search.length; i++) {
            var idMovie = "movie" + i;
            let data_movie = data.Search[i];
            text_movie += imprimirPelisModals(data_movie, idMovie);
            document.getElementById("resultat").innerHTML = text_movie;
        }

        document.getElementById("resultat").addEventListener("click", function(e) {
            if (e.target.classList == "material-icons") {
                id = e.target.parentElement.href.split("#")[1];
                num = id.split("e")[1];
                eliminarModals(data.Search);
                document.getElementById(id).innerHTML = generarModal(data.Search[num]);
                var instances = M.Modal.init(document.querySelectorAll(".modal"), {});

                document.getElementById("formRadio").addEventListener("click", function(e){
                    valoracio = e.target.parentElement.querySelector("[name='valoracio']").value;
                    console.log()
                })
        
        
                document.getElementById("btn-guardar").addEventListener("click", function(e){
                    let favorito = (e.target.parentElement.querySelector("[name='fav']").value == "on") ? true : false ;
                    let comentario = e.target.parentElement.querySelector("#comentario").value;
                    console.log(valoracio + " " + favorito + " " + comentario);
                });
            }
        });


    })

})

/* Cards */
function imprimirPelisModals(data_movie, id) {
    var txt = `<div class="col s6 m4 l3" id="divpelis" class="divpelis">
                <div class="card">
                    <div class="card-image">
                        <img class="poster" src="${data_movie.Poster}">
                        <a class="btn-floating halfway-fab modal-trigger waves-effect waves-light red" href="#${id}"><i class="material-icons">add</i></a>
                    </div>

                    <div class="card-content card-title">
                        <span>${data_movie.Title}</span><br>
                        <span>${data_movie.Year}</span>
                    </div>
                </div>
                <div id="${id}" class="modal"></div>
            </div>`;
    return txt;
}

function generarModal(nom) {
    var modalHtml = `<div class="modal-content">
                        <h4 class="center-align cyan-text text-darken-3 ">${nom.Title}</h4>
                        <div>
                            <label>
                                <input type="checkbox" id="fav" name="fav"/>
                                <span>Afegir a pel·lícules favorites? </span>
                            </label>
                        </div>

                        <div class="input-field">
                            <textarea id="comentario" class="materialize-textarea" data-length="200"></textarea>
                            <label for="comentario">Comentari</label>
                        </div>

                        <div id="formRadio">
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

                        <button id="btn-guardar">Guardar</button>
                    </div>
                    <div class="modal-footer">
                        <a href="#!" class="btn modal-close red "><i class="material-icons red">close</i></a>
                    </div>`;
    return modalHtml;
}

function eliminarModals(data) {
    for(let i = 0; i<data.length; i++){
        document.getElementById("movie"+i).innerHTML = "";
    }
}