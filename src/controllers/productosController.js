const fs = require('fs');
const path = require('path');
const productosPath = path.join(__dirname, '../data/productos.json');

function readProductos() {
    const data = fs.readFileSync(productosPath, 'utf-8');
    return JSON.parse(data);
}

function writeProductos(productos) {
    fs.writeFileSync(productosPath, JSON.stringify(productos, null, ' '));
}

const controlador = {
    index: function (req, res) {
        const productos = readProductos();
        res.render('index', { productos });
    },

    carrito: (req, res) => {
        res.render('products/carrito');
    },

    detalle: function (req, res) {
        const productos = readProductos();
        const producto = productos.find((producto) => producto.id == req.params.id);
        if (producto) {
            res.render('products/detalle', { producto });
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
    },
    creados: function (req, res) {
        const productos = readProductos();
        const nuevoProducto = {
            id: productos[productos.length - 1].id + 1,
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            imagen: req.file ? `/img/${req.file.filename}` : '/img/default-game.jpg',
        };
        productos.push(nuevoProducto);
        writeProductos(productos);
        res.redirect('/');
    },
    getUpdateForm: function (req, res) {
        const productos = readProductos();
        const producto = productos.find((producto) => producto.id == req.params.id);
        if (producto) {
            res.render('products/edicion', { producto });
        } else {
            res.send(`
                <div style="text-align: center; padding-top:30px">
                <h1>El producto a editar no existe</h1>
                <img style="width:40%;" src="/img/default-game.jpg">
                </div>
            `);
        }
    },
    putUpdateForm: function (req, res) {
        const productos = readProductos();
        const producto = productos.find((producto) => producto.id == req.params.id);
        if (producto) {
            producto.titulo = req.body.titulo;
            producto.imagen = req.file ? `/img/${req.file.filename}` : producto.imagen;
            producto.precio = req.body.precio;
            producto.descripcion = req.body.descripcion;
            writeProductos(productos);
            res.redirect('/');
        } else {
            res.send(`
                <div style="text-align: center; padding-top:30px">
                <h1>El producto no se puede editar</h1>
                <img style="width:40%;" src="/img/default-game.jpg">
                </div>
            `);
        }
    },
    delete: function (req, res) {
        let productos = readProductos();
        const idproductos = parseInt(req.params.id);
        productos = productos.filter((i) => i.id !== idproductos);
        writeProductos(productos);
        res.redirect('/');
    },
};

module.exports = controlador;