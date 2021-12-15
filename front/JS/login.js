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
            document.getElementById("btn_login").classList.add("oculto");
            document.getElementById("carrousel-fotos").classList.add("oculto");
            document.getElementById("carrousel-titol").classList.add("oculto");

            document.getElementById("info-usuari").classList.remove("oculto");
            document.getElementById("info-usuari").innerHTML = codigoHTMLuser(data);
            document.getElementById("btn_save").classList.add("oculto");

            document.getElementById("btn_edit").addEventListener("click", function (e) {
                document.getElementById("nom_us").removeAttribute("disabled");
                document.getElementById("email_us").removeAttribute("disabled");
                document.getElementById("canviar_img_usr").classList.remove("oculto");
                document.getElementById("img_usr_label").classList.remove("oculto");
                document.getElementById("btn_save").classList.remove("oculto");
                document.getElementById("btn_edit").classList.add("oculto");
            })

            document.getElementById("btn_save").addEventListener("click", function (e) {
                document.getElementById("nom_us").setAttribute("disabled", "");
                document.getElementById("email_us").setAttribute("disabled", "");
                document.getElementById("canviar_img_usr").classList.add("oculto");
                document.getElementById("img_usr_label").classList.add("oculto");
                document.getElementById("btn_edit").classList.remove("oculto");
                document.getElementById("btn_save").classList.add("oculto");
            })

            document.getElementById("resultat_header").innerHTML = codigoHTMLheaderuser(data);


        } else {
            console.log("error"); //FALLO al inciar sesion - falta
        }
    });
})

function codigoHTMLheaderuser(datos) {
    let text = `<li class="usuario_header">${datos.usuari}</li>
                <li><img class="img_header circle responsive-img" src="${datos.imagen}"></li>
                <li><a id="btn_logout" href="logout.php" class="modal-trigger waves-effect waves-light btn">LOGOUT</a></li>`;
    return text;
}



function codigoHTMLuser(datos) {
    let text = `<div class="row">
                    <div class="col s3 m3 l3 centrar">
                        <h3>¡Hola ${datos.nombre}!</h3>
                        <img src="${datos.imagen}" class="circle responsive-img">
                    </div>

                    <div class="dades_usuari center-align>
                        
                        <div class="row">
                            <div class="col s4 m4 l4"> 
                                <label class="white_font" for="alias">Nom</label>
                                <input disabled id="nom_us" type="text" class="white_font" value="${datos.nombre}">

                                <label class="white_font" for="email">Correu</label>
                                <input disabled id="email_us" type="email" class="white_font" value="${datos.email}">
                            
                                <label class="white_font" for="puntuacio">Karma</label>
                                <input disabled id="puntuacio_us" type="text" class="white_font" value="${datos.puntuacion}">

                                <label class="white_font oculto" id="img_usr_label" for="imatge">Imatge</label>

                                <div class="file-field input-field oculto" id="canviar_img_usr">
                                    <div class="btn-small">
                                        <input type="file" multiple accept="image/*"><i class="material-icons">insert_photo</i></input>
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input class="file-path" type="text" class="white_font">
                                    </div>
                                </div>

                                <input id="alias" type="hidden" value="${datos.usuari}">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col s3 m3 l3 center-align">
                                <a class="btn-small waves-effect waves-light" id="btn_edit"><i class="material-icons">create</i></a>
                                <a class="btn-small waves-effect waves-light" id="btn_save"><i class="material-icons">save</i></a>
                            </div>
                        </div>

                    
                </div>`;
    return text;
}