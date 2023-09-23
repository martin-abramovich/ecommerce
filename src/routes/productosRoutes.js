const productosController = require('./../controllers/productosController');
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require('../database/models');
const authMiddleware = require('../../middlewares/authMiddleware');
const userMiddleware = require('../../middlewares/checkProductOwnership');
const checkProductOwnership = require('../../middlewares/checkProductOwnership');

const upload = multer();

// Rutas
router.get('/', productosController.index);
router.get('/carrito', productosController.carrito);
router.get('/detalle/:id', productosController.detalle);
router.get('/crear', authMiddleware, productosController.crear);
router.post('/crear', upload.single('imagen'), productosController.creados);
router.get("/edicion/:id", checkProductOwnership, productosController.getUpdateForm);
router.put("/edicion/:id", upload.single('imagen'), productosController.putUpdateForm);
router.delete("/delete/:id", checkProductOwnership, productosController.delete);
router.get("/administrador", productosController.admin)

module.exports = router;