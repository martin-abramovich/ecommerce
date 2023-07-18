const controlador = {
    index: (req, res) => {

        res.render('index');
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