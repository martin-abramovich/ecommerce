window.addEventListener("load",function() {
    let formulario = document.querySelector("form.reservation");

    formulario.addEventListener("submit", function(e){

    let errores = [];

    let campoNombre = document.querySelector("input.name");

    if (campoNombre.value == ""){
        errores.push("El campo del nombre tiene que estar completo");
    } else if (campoNombre.value.length < 3){
        errores.push ("El campo del nombre debe tener al menos 3 caracteres");
    }

    let campoContrasena = document.querySelector("input.password");

    if (campoContrasena.value == ""){
        errores.push("El campo de la contrasena tiene que estar completo");
    } else if (campoContrasena.value.length < 8){
        errores.push ("El campo del nombre debe tener al menos 8 caracteres");
    }

    if (errores.length > 0){
        e.preventDefault();

        let ulErrores = document.querySelector("div.errores ul")
        for (let i=0; i<errores.length; i++)

        ulErrores.innerHTML += "<li>" +  errores[i] + "</li>";
    }
    })
})