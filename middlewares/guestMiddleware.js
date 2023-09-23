function guestMiddleware(req, res, next) {
    if (req.session.user == undefined) {
        next();
    } else {
        res.send(`
        <div style="text-align: center; padding-top:30px">
        <h1>¡Ya estás logueado ${req.session.user.nombre}! Seguí disfrutando de Galante.</h1>
        <p><a href="/">Volver al inicio</a></p>
        <img style="width:40%;" src="https://www.fizzcreations.com/wp-content/uploads/2022/10/2146-Minions-Comic-Ons-Face-on.png">
        </div>
    `);
    }
}

module.exports = guestMiddleware;
