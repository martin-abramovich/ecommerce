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

    let config = {camelCase: false, timestamps: false};

    const categorias = sequelize.define(tabla, campos, config);
    return categorias;
}

module.exports = categoriasData;