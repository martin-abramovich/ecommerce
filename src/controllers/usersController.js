const controladorUsers = 
{

        iniciarSesion: (req, res) => {
                res.render("login");
        },   

        registrarse: (req, res) => {
                res.render("registro");
        }
}

module.exports = controladorUsers;
