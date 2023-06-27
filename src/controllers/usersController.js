const controladorUsers = {
  iniciarSesion: (req, res) => {
    res.render("users/login");
  },

  registrarse: (req, res) => {
    res.render("users/registro");
  },
};

module.exports = controladorUsers;
