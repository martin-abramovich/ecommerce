function productosData(sequelize, Datatypes){

    let tabla = 'producto';

    let campos = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          nombre: {
            type: Datatypes.STRING(50),
            allowNull: false,
          },
          descripcion: {
            type: Datatypes.STRING(50),
            allowNull: false,
          },
          precio: {
            type: Datatypes.DECIMAL(20, 6),
            allowNull: false,
          },
          imagen: {
            type: Datatypes.STRING(50),
            allowNull: false,
          },
          estado: {
            type: Datatypes.ENUM('Y', 'N'),
            allowNull: false,
          },
          fecha_creacion: {
            type: Datatypes.DATE,
            allowNull: false,
          },
          fecha_modificacion: {
            type: Datatypes.DATE,
          },
          fecha_eliminacion: {
            type: Datatypes.DATE,
          },
          venta_id: {
            type: Datatypes.INTEGER,
          },
          usuario_id: {
            type: Datatypes.INTEGER,
            allowNull: false,
          },
          categoria_id: {
            type: Datatypes.TINYINT,
            allowNull: false,
          },
    };

    let config = {camelCase: false, timestamps: false};

    const productos = sequelize.define(tabla, campos, config);

    /* productos.associate = function(modelos){
      productos.belongsTo(modelos.categoria, {as: "categorias", foreignKey: 'categoria_id' });
      productos.belongsTo(Usuario, { foreignKey: 'usuario_id' });
      productos.belongsTo(Venta, { foreignKey: 'venta_id' });
    } */

    return productos;
}

module.exports = productosData;