const productosController = require('./../controllers/productosController');
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require('../database/models');
const authMiddleware = require('../../middlewares/authMiddleware');
const userMiddleware = require('../../middlewares/checkProductOwnership');
const checkProductOwnership = require('../../middlewares/checkProductOwnership');
const cart = require('../../public/js/cart');

const upload = multer();

// Rutas
router.get('/', productosController.index);
router.get('/carrito', productosController.carrito);
router.get('/detalle/:id', productosController.detalle);
router.get('/crear', authMiddleware, productosController.crear);
router.post('/crear', upload.single('imagen'), productosController.creados);
router.get("/edicion/:id", authMiddleware, checkProductOwnership, productosController.getUpdateForm);
router.put("/edicion/:id", upload.single('imagen'), productosController.putUpdateForm);
router.delete("/delete/:id", authMiddleware, checkProductOwnership, productosController.delete);
router.get("/administrador", productosController.admin)
router.get('/buscar', productosController.buscar);

// Carrito
router.post("/agregar-al-carrito/:id", productosController.addToCart);
router.get('/carrito', (req, res) => {
    const cartItems = cart.getCart();
    res.render('carrito', { cart: cartItems });
});
router.post('/eliminar-del-carrito', (req, res) => {
    const productId = req.body.productId;
    cart.removeFromCart(productId);
    res.redirect('/carrito');
});
router.post('/vaciar-carrito', (req, res) => {
    cart.clearCart();
    res.redirect('/carrito');
});

module.exports = router;