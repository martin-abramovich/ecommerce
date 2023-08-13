const productosController = require('./../controllers/productosController');
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Configuración del almacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        cb(null, `product-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

// Rutas
router.get('/', productosController.index);
router.get('/carrito', productosController.carrito);
router.get('/detalle/:id', productosController.detalle);
router.get('/crear', productosController.crear);
router.post('/crear', upload.single('imagen'), productosController.creados);
router.get("/edicion/:id", productosController.getUpdateForm);
router.put("/edicion/:id", upload.single('imagen'), productosController.putUpdateForm);
router.delete("/delete/:id", productosController.delete);

module.exports = router;