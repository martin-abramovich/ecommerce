function categoriasData(sequelize, Datatypes){

    let tabla = 'categoria';

    let campos = {
        id: {
            type: Datatypes.TINYINT,
            primaryKey: true,
            autoIncrement: true,
          },
          nombre: {
            type: Datatypes.STRING(50),
            allowNull: false,
          }
    }

    let config = {tableName: 'categoria', camelCase: false, timestamps: false};

    const categorias = sequelize.define(tabla, campos, config);

    categorias.associate = function(modelos){
      categorias.hasMany(modelos.producto, {as: "productos", foreignKey: 'categoria_id' });
    }

    return categorias;
}

module.exports = categoriasData;