function guestMiddleware(req, res, next){

    if(req.session.user == undefined) {
        next();
    } else {
        res.send('¡Ya estás logueado ' + req.session.user.nombre + '! Seguí disfrutando de Galante.');
    } 
}

module.exports = guestMiddleware;