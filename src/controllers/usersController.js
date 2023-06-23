const controladorUsers = 
{

        iniciarSesion: (req, res) => {
                res.render("user/login");
        },   

        registrarse: (req, res) => {
                res.render("register");
        }
}

module.exports = controladorUsers;
