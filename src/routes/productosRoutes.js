const productosController = require('./../controllers/productosController')
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

router.get('/', productosController.index);

router.get('/carrito', productosController.carrito);

router.get('/detalle/:id', productosController.detalle);

router.get('/crear', productosController.crear);

/* form update */
router.get("/edicion/:id", productosController.getUpdateForm);
router.put("/edicion/:id", upload.single('imagen'), productosController.putUpdateForm);


module.exports = router;