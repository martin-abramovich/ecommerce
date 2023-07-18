const usersController = require('./../controllers/usersController')

const express = require('express');
const router = express.Router();

router.get('/registro',usersController.registrarse);
router.post('/registro', usersController.create)

router.get('/login',usersController.iniciarSesion);


module.exports = router;