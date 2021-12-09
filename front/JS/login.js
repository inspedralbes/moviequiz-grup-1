    /* Inicialitzar modals */
    document.getElementById("btn_login").addEventListener("click", function(e) {
        var instances = M.Modal.init(document.querySelectorAll(".login"), {});
    })


    // LOGIN
    document.getElementById("btn_entrar").addEventListener("click", function() {
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
            } else {
                console.log("adios");
            }
        });
    })