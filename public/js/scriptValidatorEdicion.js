document.getElementById("editProductForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let titulo = document.getElementById("titulo").value;
    let precio = document.getElementById("precio").value;
    let descripcion = document.getElementById("descripcion").value;

    if (titulo === "" || descripcion === "") {
        alert("El titulo o la descripción están vacías");
    } else if (precio == "" || isNaN(precio)) {
        alert("El precio debe ser un número válido");
    } else {
        this.submit(); 
    }
});