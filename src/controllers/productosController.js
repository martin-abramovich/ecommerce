const fs = require('fs');
const path = require('path');
const productosPath = path.join(__dirname, "../data/productos.json");
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

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

    },
    creados: (req,res) =>{
        let ola = req.body
        console.log(ola)
    }
}

module.exports = controlador;