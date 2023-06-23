const controlador = {
    index: (req, res) => {

        res.render('index');
    },

    carrito: (req, res) => {
        res.render('carrito');
    },

    detalle: (req, res) => {
        res.render('detalle');
    }


}

module.exports = controlador;