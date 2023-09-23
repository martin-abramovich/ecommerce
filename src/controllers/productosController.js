const fs = require('fs');
const db = require('../database/models');
const { clear } = require('console');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const cloudinaryConfig = {
    cloud_name: 'dgmxc8fal',
    api_key: '658928733417987',
    api_secret: 'CYEYZept3jVWxd829y_AsxNsp1E'
};
cloudinary.config(cloudinaryConfig);

function buscarIdPorMail(email) {
    return db.usuario.findOne({ where: { email: email } })
      .then((usuarioEncontrado) => {
        return usuarioEncontrado;
      })
      .catch((error) => {
        throw new Error('Error al buscar el usuario por email');
      });
}  

const controlador = {
    index: function (req, res) {
        db.producto.findAll().then((resultado) => {
            res.render('index', { productos: resultado });
        });
    },

    carrito: (req, res) => {
        res.render('products/carrito');
    },

    detalle: function (req, res) {
        db.producto.findByPk(req.params.id)
          .then(function (producto) {
            if (!producto) {
              return res.send(`
                <div style="text-align: center; padding-top:30px">
                  <h1>El producto no existe</h1>
                  <img style="width:40%;" src="https://matob.web.id/random/wp-content/uploads/sites/2/2021/12/error-404-NOT-FOUND.jpg">
                </div>
              `);
            }
            return res.render('products/detalle', { producto });
          })
          .catch(function (error) {
            console.error(error);
            res.status(500).send('Error al buscar el producto');
          });
    },

    crear: (req, res) => {
        db.categoria.findAll()
        .then((cat) => {
            return res.render('products/creacion', {categorias: cat});
        })
        
    },
    creados: function (req, res) {
        let img = "https://facultadeducacion.uft.cl/wp-content/uploads/2020/08/arts.jpg";
        if (req.file) {
          const imageBuffer = req.file.buffer;
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const customFilename = 'product' + uniqueSuffix;
          const folder = 'ecommerce_dh/productos';
      
          const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', folder: folder, public_id: customFilename }, (error, result) => {
            if (error) {
              console.error('Error during upload: ', error);
            } else {
              console.log('Upload successful: ', result);
            }
          });
      
          streamifier.createReadStream(imageBuffer).pipe(stream);
          img = `https://res.cloudinary.com/dgmxc8fal/image/upload/ecommerce_dh/productos/${customFilename}`;
        } 
      
        buscarIdPorMail(req.session.user.email)
          .then((usuario) => {
            if (usuario) {
              // Ahora que tenemos el usuario, podemos crear el producto
              return db.producto.create({
                nombre: req.body.titulo,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                imagen: img,
                estado: 'N', // corregir
                fecha_creacion: Date.now(),
                usuario_id: usuario.id, // Usamos usuario.id aquí
                categoria_id: 1 // corregir
              });
            } else {
              console.log('Usuario no encontrado');
              throw new Error('Usuario no encontrado');
            }
          })
          .then((productoCreado) => {
            // Producto creado con éxito
            console.log('Producto creado:', productoCreado.toJSON());
            res.redirect('/');
          })
          .catch((error) => {
            console.error('Error:', error.message);
            res.redirect('/');
          });
        },      
    getUpdateForm: function (req, res) {
        let pedidoProducto = db.producto.findByPk(req.params.id);
        let pedidoCategoria = db.categoria.findAll();

        Promise.all([pedidoProducto, pedidoCategoria])
        .then(function([producto, categorias]){
            if(!producto){
                return res.send(`
                <div style="text-align: center; padding-top:30px">
                <h1>El producto a editar no existe</h1>
                <img style="width:40%;" src="/img/default-game.jpg">
                </div>
            `);
            }
            return res.render('products/edicion', { producto: producto, categorias: categorias});
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Error al buscar el producto');
        });
    },
    putUpdateForm: function (req, res) {
        //HAY COSAS QUE CORREGIR
        db.producto.update({
            nombre: req.body.titulo,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            imagen: req.file ? `/img/${req.file.filename}` : 'https://facultadeducacion.uft.cl/wp-content/uploads/2020/08/arts.jpg',
            estado: 'N', // corregir
            fecha_creacion: Date.now(),
            usuario_id: 1, // corregir
            categoria_id: 1 // corregir
        }, {
            where: {
                id: req.params.id
            }
        })
        res.redirect('/detalle/' + req.params.id);
    },
    delete: function (req, res) {
        db.producto.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/');
    },
    admin: (req,res)=>{
        res.render("administrador")

      },
};

module.exports = controlador;