const db = require('../src/database/models');

function obtenerProductoPorId(id) {
    return db.producto.findByPk(id)
      .then(function (producto) {
        return producto;
      })
      .catch(function (error) {
        console.error(error);
        throw new Error('Error al buscar el producto');
      });
  }
  
  function checkProductOwnership(req, res, next) {
    const userId = req.session.user.id;
    const productId = req.params.id;
  
    obtenerProductoPorId(productId)
      .then(function (product) {
        if (!product || product.usuario_id !== userId) {
          return res.status(403).send(`
          <div style="text-align: center; padding-top:30px">
          <h1>Solo el creador del producto puede editarlo o eliminarlo :(</h1>
          <p><a href="/">Volver al inicio</a></p>
          <img style="width:40%;" src="https://www.fizzcreations.com/wp-content/uploads/2022/10/2146-Minions-Comic-Ons-Face-on.png">
          </div>
      `);
        }
        next();
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).send('Error al buscar el producto');
      });
  }
  
  module.exports = checkProductOwnership;
  