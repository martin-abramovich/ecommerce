document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault()
    let nameInput = document.getElementById("nameInput").value;
    let apellidoInput = document.getElementById("apellidoInput").value;
    let emailInput = document.getElementById("emailInput").value;
    let passInput = document.getElementById("passInput").value;
    if (usuario === "" || contrasena === "") {
        alert("Por favor, completa todos los campos.");
         // Evita que se envíe el formulario
    }
});
