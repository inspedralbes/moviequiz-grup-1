/* Inicialitzar modals */
document.getElementById("btn_login").addEventListener("click", function (e) {
    var instances = M.Modal.init(document.querySelector(".login"), {});
})

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
            document.getElementById("apartadoCarrousel").insertAdjacentHTML("afterbegin", loginHTML);
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

                    <div class="dades_usuari center-align>
                        
                        <div class="row">
                            <div class="col s4 m4 l4"> 
                                <label for="alias">Nom</label>
                                <input disabled id="nom" type="text" class="validate" value="${datos.nombre}">

                                <label for="email">Correu</label>
                                <input disabled id="email" type="email" class="validate" value="${datos.email}">
                            
                                <label for="puntuacio">Karma</label>
                                <input disabled id="puntuacio" type="text" class="validate" value="${datos.puntuacion}">

                                <input id="alias" type="hidden" value="${datos.usuari}">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col s3 m3 l3 center-align">
                                <a class="btn-small waves-effect waves-light" id="btn_search"><i class="material-icons">create</i></a>
                                <a class="btn-small waves-effect waves-light" id="btn_search"><i class="material-icons">save</i></a>
                            </div>
                        </div>

                    
                </div>`;
    return text;
}