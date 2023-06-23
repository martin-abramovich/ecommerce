const usersController = require('./../controllers/usersController')

const express = require('express');
const router = express.Router();

router.get('/register',usersController.registrarse);

router.get('/login',usersController.iniciarSesion);


module.exports = router;