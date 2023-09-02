function puntuacionData(sequelize, Datatypes){

    let tabla = 'puntuacion';

    let campos = {
        id: {
            type: Datatypes.TINYINT,
            primaryKey: true,
            autoIncrement: true,
        },
        calificacion: {
            type: Datatypes.INTEGER,
            allowNull: false,
        },
        comentario: {
            type: Datatypes.STRING(50),
            allowNull: false,
        },
        usuario_id: {
            type: Datatypes.INTEGER,
            allowNull: false,
        },
    }

    let config = {tableName: 'puntuacion', camelCase: false, timestamps: false};

    const puntuaciones = sequelize.define(tabla, campos, config);

    puntuaciones.associate = function(modelos){
        puntuaciones.belongsTo(modelos.usuario, {as: "usuarios", foreignKey: 'usuario_id' });
    }

    return puntuaciones;
}

module.exports = puntuacionData;