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
        /* leo un json y lo parseo */
        const productos = JSON.parse(fs.readFileSync(productosPath, "utf-8"));
        /* busco producto en base al req.params si existe renderizo la vista con el producto, sino un error */
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
    },
    creados: (req,res) =>{
        /* leo un json y lo parseo */
        const productos = JSON.parse(fs.readFileSync(productosPath, "utf-8"));
        /* creo una variable para generar el nuevo producto del req.body */
        let nuevoProducto = {
          id: (productos[productos.length-1].id)+1,
          titulo: req.body.titulo,
          descripcion: req.body.descripcion,
          precio: req.body.precio,
          /* if ternario para preguntar si viene imagen que la escriba, sino que se quede con la por default */
          imagen: req.file
            ? `/img/${req.file.filename}`
            : "/img/default-game.jpg",
        };
        /* agrego ese producto al listado */
        productos.push(nuevoProducto);
        /* convierto a json nuevamente y escribo el archivo games.json */
        const productosJSON = JSON.stringify(productos, null, " ");
        fs.writeFileSync(productosPath, productosJSON);
        res.redirect("/");
    },
    getUpdateForm: function (req, res) {
        /* traigo el listado de productos para filtrar por el req.params */
        const productos = JSON.parse(fs.readFileSync(productosPath, "utf-8"));
        const producto = productos.find((producto) => producto.id == req.params.id);
        /* si lo encuentra que me muestre la vista sino que me muestre un error */
        if (producto) {
          res.render("products/edicion", { producto });
        } else {
          res.send(`
                <div style="text-align: center; padding-top:30px">
                <h1>El producto a editar no existe</h1>
                <img style="width:40%;" src="/img/default-game.jpg">
                </div>
                `);
        }
      },
      /* proceso de edición de producto */
      putUpdateForm: function (req, res) {
        /* busco el producto a editar  */
        const productos = JSON.parse(fs.readFileSync(productosPath, "utf-8"));
        const producto = productos.find((producto) => producto.id == req.params.id);
        /* si lo encuentra le cambio los valores permitiendo conservar la imagen anterior si no quiere cambiarla */
        if (producto) {
            console.log("hola");
            producto.titulo = req.body.titulo;
            producto.imagen = req.file ? `/img/${req.file.filename}` : producto.imagen;
            producto.precio = req.body.precio;
            producto.descripcion = req.body.descripcion;
            /* escribo el json nuevamente y redirecciono */
            fs.writeFileSync(productosPath, JSON.stringify(productos, null, " "));
            res.redirect("/");
        } else {
            res.send(`
            <div style="text-align: center; padding-top:30px">
            <h1>El producto no se puede editar</h1>
            <img style="width:40%;" src="/img/default-game.jpg">
            </div>
            `);
        }
      }
}

module.exports = controlador;