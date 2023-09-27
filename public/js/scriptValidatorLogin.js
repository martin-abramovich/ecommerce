document.getElementById("form_login").addEventListener("submit", function(event) {
    event.preventDefault();
    let emailInput = document.getElementById("emailInput").value;
    let passInput = document.getElementById("passInput").value;
    if (emailInput === "" || passInput === "") {
        alert("Por favor, completa todos los campos.");
    } else {
        this.submit();
    }
});
