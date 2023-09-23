function authMiddleware(req, res, next){

    if(req.session.user != undefined) {
        next();
    } else {
        res.send('Esta página es solo para usuarios. Regístrese y venda su arte');
    } 
}

module.exports = authMiddleware;