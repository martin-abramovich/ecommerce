const fs = require('fs');
const path = require('path');
const productosPath = path.join(__dirname, "../data/productos.json");

const controlador = {
    index: function (req, res) {
        /* leo un json y lo parseo */
        const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));
        res.render("index", {productos});
      },

    carrito: (req, res) => {
        res.render('products/carrito');
    },

    detalle: (req, res) => {
        res.render('products/detalle');
    },

    crear: (req, res) => {
        res.render('products/creacion');
    }
}

module.exports = controlador;