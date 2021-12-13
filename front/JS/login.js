/* Inicialitzar modals */
document.getElementById("btn_login").addEventListener("click", function (e) {
    var instances = M.Modal.init(document.querySelector(".login"), {});
})


// LOGIN

let u = document.getElementById("usuari").value;
let c = document.getElementById("pwd").value;

const datosLogin = new FormData();
datosLogin.append("usuari", u);
datosLogin.append("pwd", c);

/*fetch(`../PHP/header.phh`, {
    method: "POST",
    body: datosLogin
})

    .then(response => response.json())

    .then(data => {

        console.log(data);

        // Usuari
        if (data.exito == true) {
            document.getdocument.getElementById("btn-guardar").classList.remove("disabled");
            document.getElementById("diverror").classList.remove("oculto");
            document.getElementById("resultat").classList.remove("oculto");

        }// NO usuari
        else {
            document.getElementById("btn-guardar").classList.add("disabled");
            document.getElementById("diverror").classList.add("oculto");
        }

    });*/



document.getElementById("btn_entrar").addEventListener("click", function () {
    let usu = document.getElementById("usuari").value;
    let pwd = document.getElementById("pwd").value;

    const datosLogin = new FormData();
    datosLogin.append("usuari", usu);
    datosLogin.append("pwd", pwd);

    fetch('http://localhost/moviequiz-grup-1/front/PHP/controller_MQ.php?action=login', {
        method: "POST",
        body: datosLogin
    }).then(response => response.json()).then(data => {
        console.log(data);
        if (data.exito == true) {
            console.log("hola");
            let loginHTML = `<div id="info-usuari" class="col s12">a</div>`;
            document.getElementById("btn_login").classList.add("oculto");
            document.getElementById("carrousel-fotos").classList.add("oculto");
            document.getElementById("carrousel-titol").classList.add("oculto");
            document.getElementById("apartadoCarrousel").insertAdjacentHTML("afterbegin", loginHTML)
            document.getElementById("info-usuari").innerHTML = codigoHTMLuser(data);
        } else {
            console.log("adios");

        }
    });
})


function codigoHTMLuser(datos) {
    let text = `<div class="row">
                    <h3>¡Hola ${datos.nombre}!</h3>
                    <br>
                    <div class="col s3 m3 l3">
                        <img src="${datos.imagen}">
                    </div>

                    <div class="col s6 m6 l6 dades_usuari">
                        <p>${datos.nombre}<p>
                        <p>${datos.puntuacion}<p>

                        
                    </div>

                    <div class="col s3 m3 l3">
                        <a class="btn-small waves-effect waves-light" id="btn_search"><i class="material-icons">search</i></a>
                    </div>

                    
                </div>`;
    return text;
}