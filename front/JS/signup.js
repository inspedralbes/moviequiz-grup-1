/*document.getElementById("back").addEventListener("click", function (e) {
    window.history.go(-1);
});*/

if(document.getElementById('registrar') != null){
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Usuari ja existent',
        showConfirmButton: false,
        timer: 1500
    });
}