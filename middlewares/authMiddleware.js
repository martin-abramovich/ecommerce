function authMiddleware(req, res, next){

    if(req.session.user != undefined) {
        next();
    } else {
        res.send('Esta página es solo para usuarios. Regístrese o inicie sesión.');
    } 
}

module.exports = authMiddleware;