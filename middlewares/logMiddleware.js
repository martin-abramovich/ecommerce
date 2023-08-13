const fs = require('fs');

function logMiddleware(req, res, next) {
    fs.appendFileSync('log.txt', 'Se ingreso en la pagina ' + req.url);
    next();
}

module.exports = logMiddleware;