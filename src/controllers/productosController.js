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
    product: (req,res) =>{
        res.send("ola")
    }


}

module.exports = controlador;