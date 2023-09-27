document.getElementById("form_register").addEventListener("submit", function(event) {
    event.preventDefault()
    let nameInput = document.getElementById("nameInput").value;
    let apellidoInput = document.getElementById("apellidoInput").value;
    let emailInput = document.getElementById("emailInput").value;
    let passInput = document.getElementById("passInput").value;
    if (nameInput === "" || apellidoInput === "" || emailInput === "" || passInput === "") {
        alert("Por favor, completa todos los campos.");
    } else {
        this.submit();
    }
});
