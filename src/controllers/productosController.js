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
        /* leo un json y lo parseo */
        const productos = JSON.parse(fs.readFileSync(productosPath, "utf-8"));
        /* busco juego en base al req.params si existe renderizo la vista con el juego, sino un error */
        const producto = productos.find((producto) => producto.id == req.params.id);
        if (producto) {
            res.render("products/detalle", { producto });
        } else {
            res.send(`
                    <div style="text-align: center; padding-top:30px">
                    <h1>El producto no existe</h1>
                    <img style="width:40%;" src="/img/default-game.jpg">
                    </div>
                    `);
            }
    },

    crear: (req, res) => {
        res.render('products/creacion');
    }
}

module.exports = controlador;