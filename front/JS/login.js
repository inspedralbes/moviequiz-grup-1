    /* Inicialitzar modals */  
    document.getElementById("btn_login").addEventListener("click", function (e) {
        var instances = M.Modal.init(document.querySelectorAll(".login"), {});
    })


    // LOGIN

    let u = document.getElementById("usuari").value;
    let c = document.getElementById("pwd").value;

    const datosLogin = new FormData();
    datosLogin.append("usuari", u);
    datosLogin.append("pwd", c);
    
    fetch(`../PHP/header.phh`, {
        method: "POST",
        body: datosLogin
    })

    .then(response => response.json())

    .then(data => {
        
        console.log(data);

        /* Usuari */
        if (data.exito == true) {
            document.getElementById("diverror").classList.remove("disabled");
            document.getElementById("diverror").classList.remove("oculto");
            document.getElementById("resultat").classList.remove("oculto");

        }/* NO usuari */
        else {
            document.getElementById("diverror").classList.add("disabled");
            document.getElementById("diverror").classList.add("oculto");
        }

    });

   

