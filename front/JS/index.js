document.getElementById("btn_search").addEventListener("click", function (e) {
    var txt = document.getElementById("search").value;
    console.log(txt);
    fetch(`https://www.omdbapi.com/?apikey=5149518a&s=${txt}&type=movie`).then(res =>
        res.json()).then(data => {
            var text_movie = "";
            for (var i = 0; i < 10; i++) {
                var id = "movie" + i;
                let data_movie = data.Search[i];
                text_movie += imprimirpelis(data_movie, id);
                imprimirmodals(data_movie, id);
            }
            document.getElementById("resultat").innerHTML = text_movie;

            /* Modals */
            var instances = M.Modal.init(document.querySelectorAll(".modal"), {});


        })

})

/* Cards */
function imprimirpelis(data_movie, id) {
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
            </div>`;
    return txt;
}


function imprimirmodals(data_movie, id) {
    var txt = `<div id="${id}" class="modal">
                    <div class="modal-content">
                        <h4 class="center-align cyan-text text-darken-3 ">${data_movie.Title}</h4>
                    </div>
                    <div class="modal-footer">
                        <a href="#!" class="btn modal-close red "><i class="material-icons red">close</i></a>
                    </div>
                </div>`;
    document.body.insertAdjacentHTML("beforeend", txt);
}









