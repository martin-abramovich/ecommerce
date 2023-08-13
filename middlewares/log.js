function usersLog (req,res,next){
    res.locals.islogged = false;

    if(req.session.user)
        res.locals.islogged = true;

    next();
}

module.exports = usersLog;