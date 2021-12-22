/* Mostrar un missatge si l'usuari que s'està registrant hi existeix a la BD */
if (document.getElementById('registrar') != null) {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Usuari ja existent',
        showConfirmButton: false,
        timer: 1500
    });
}

//Fer que el boto [<-] redirigeixi a la pagina inicial (index.php)
document.getElementById("back").addEventListener("click", function (e) {
    window.location.href = "http://moviequiz1.alumnes.inspedralbes.cat/";
});

