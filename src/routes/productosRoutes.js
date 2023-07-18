const productosController = require('./../controllers/productosController')

const express = require('express');
const router = express.Router();

router.get('/', productosController.index);

router.get('/carrito', productosController.carrito);

router.get('/detalle', productosController.detalle);

router.get('/crear', productosController.crear);


module.exports = router;