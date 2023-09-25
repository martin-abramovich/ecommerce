formularioCreateProduct.addEventListener('submit', (event) => {
    event.preventDefault()
    if (confirm('Vas a crear un nuevo producto. Estas seguro?')){
        formularioCreateProduct.submit()
    } else {
        alert('No has creado ningun producto')
    }

});

document.getElementById("productForm").addEventListener("submit", function(event) {
    let titulo = document.getElementById("titulo").value;
    let precio = document.getElementById("precio").value;
    let descripcion = document.getElementById("descripcion").value;

    if (nombre === "" || precio === "" || descripcion === "") {
        alert("Todos los campos son obligatorios");
        event.preventDefault(); // Evita que se envíe el formulario
    }

    if (isNaN(precio)) {
        alert("El precio debe ser un número válido");
        event.preventDefault();
    }
});