document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let titulo = document.getElementById("titulo").value;
    let precio = document.getElementById("precio").value;
    let descripcion = document.getElementById("descripcion").value;

    if (titulo === "" || precio === "" || descripcion === "") {
        alert("Todos los campos son obligatorios");
        event.preventDefault(); // Evita que se envíe el formulario
    } else if (isNaN(precio)) {
        alert("El precio debe ser un número válido");
        event.preventDefault();
    } else {
        this.submit();
    }
});