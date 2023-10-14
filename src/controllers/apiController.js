const db = require('../database/models');
const Sequelize = require('sequelize');

module.exports = {
    users: (req, res) => {
        db.usuario
            .findAll({
                attributes: { exclude: ['clave'] }
            })
            .then(usuarios => {
                return res.status(200).json({
                    count: usuarios.length,
                    users: usuarios,
                    status: 200
                });
            })
    },
    findUser: (req, res) => {
        db.usuario
            .findByPk(req.params.id, {
                attributes: { exclude: ['clave'] } 
            })
            .then(usuario => {
                return res.status(200).json({
                    user: usuario,
                    status: 200
                });
            })
    },
    products: (req, res) => {
        db.producto
            .findAll()
            .then(productos => {
                // Consulta para contar productos por categoría
                db.producto.findAll({
                    attributes: [
                        'categoria_id',
                        [db.sequelize.fn('COUNT', 'id'), 'product_count']
                    ],
                    group: ['categoria_id']
                }).then(categoryCounts => {
                    const countsByCategory = {};
    
                    // Obtener nombres de categorías
                    const categoryIds = categoryCounts.map(categoryCount => categoryCount.categoria_id);
    
                    db.categoria.findAll({
                        where: {
                            id: categoryIds
                        }
                    }).then(categories => {
                        const categoryMap = {};
    
                        categories.forEach(category => {
                            categoryMap[category.id] = category.nombre;
                        });
    
                        categoryCounts.forEach(categoryCount => {
                            countsByCategory[categoryMap[categoryCount.categoria_id]] = categoryCount.dataValues.product_count;
                        });
    
                        return res.status(200).json({
                            count: productos.length,
                            products: productos,
                            countsByCategory: countsByCategory,
                            status: 200
                        });
                    });
                });
            });
        
    },
    categories: (req, res) => {
        db.categoria
            .findAll({
               
                attributes: {
                    // Seleccionar las columnas que deseas incluir en la respuesta
                    exclude: ['venta_id']
                }
            })
            .then(categorias => {
                return res.status(200).json({
                    total: categorias.length,
                    status: 200,
                    data: categorias  // Devolver los resultados con las claves foráneas resueltas
                });
            })
    },
    product: (req, res) => {
       db.producto
          .findByPk(req.params.id)
          .then(producto => {
             return res.status(200).json({
                data: producto,
                status: 200
            });
        })
}
}