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

    fetch('http://localhost/moviequiz-grup-1/front/PHP/login.php', {
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
    let text = `<div>
                    <p>¡Hola ${datos.nombre}!</p>
                    <img src="${datos.imagen}">
                </div>`;
    return text;
}