document.getElementById("editProductForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let titulo = document.getElementById("titulo").value;
    let precio = document.getElementById("precio").value;
    let descripcion = document.getElementById("descripcion").value;

    if (titulo === "" && precio === "" && descripcion === "") {
        alert("Debes realizar al menos un cambio antes de guardar.");
         // Evita que se envíe el formulario si no se realiza ningún cambio.
    }

    if (precio !== "" && isNaN(precio)) {
        alert("El precio debe ser un número válido");
    }
});