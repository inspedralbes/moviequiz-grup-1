
document.getElementById("btn_search").addEventListener("click", function (e) {
    var txt = document.getElementById("search").value;
    console.log(txt);
    fetch(`https://www.omdbapi.com/?apikey=5149518a&s=${txt}`).then(res =>
        res.json()).then(data => {

            var text_movie = "";
            for (var i = 0; i < 10; i++) {
                let data_movie = data.Search[i];
                text_movie += imprimirpelis(data_movie);
            }
            document.getElementById("resultat").innerHTML = text_movie;
        })



})

function imprimirpelis(data_movie) {
    var txt = `<div id="divpelis" class="divpelis">
                    <h3 class="titulo">${data_movie.Title}</h3>
                    <h3 class="year">${data_movie.Year}</h3>
                    <img class="poster" src="${data_movie.Poster}">
                </div>`;
    return txt;
}
