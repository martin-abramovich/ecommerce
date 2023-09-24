function authMiddleware(req, res, next){

    if(req.session.user != undefined) {
        next();
    } else {
        res.send(`
        <div style="text-align: center; padding-top:30px">
        <h1>Esta página es solo para usuarios :(</h1>
        <p><a href="/users/registro">Registrate</a> o <a href="/users/login">iniciá sesión</a></p>
        <img style="width:40%;" src="https://www.fizzcreations.com/wp-content/uploads/2022/10/2146-Minions-Comic-Ons-Face-on.png">
        </div>
    `);
    } 
}

module.exports = authMiddleware;