window.addEventListener("load",function() {
    let formulario = document.querySelector("form.reservation");

    formulario.addEventListener("submit", function(e){
        e.preventDefault();

    let campoNombre = document.querySelector("input.name");

    if (campoNombre.value == ""){
        alert("El campo del nombre tiene que estar completo");
    }
    })
})