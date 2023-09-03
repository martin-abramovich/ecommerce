function usuarioData(sequelize, Datatypes){

    let tabla = 'usuario';

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
        email: {
            type: Datatypes.STRING(50),
            allowNull: false,
        },
        clave: {
            type: Datatypes.STRING(100),
            allowNull: false,
        },
        telefono: {
            type: Datatypes.STRING(50),
        },
        imagen: {
            type: Datatypes.STRING(255),
            allowNull: false,
        },
        administrador: {
            type: Datatypes.BOOLEAN,
            allowNull: false,
        },
        fecha_creacion: {
            type: Datatypes.DATE,
            allowNull: false,
        },
        fecha_eliminacion: {
            type: Datatypes.DATE,
        },
    }

    let config = {tableName: 'usuario', camelCase: false, timestamps: false};

    const usuarios = sequelize.define(tabla, campos, config);

    usuarios.associate = function(modelos){
        usuarios.hasMany(modelos.producto, {as: "productos", foreignKey: 'usuario_id' });
        usuarios.hasMany(modelos.puntuacion, {as: "puntuaciones", foreignKey: 'usuario_id' });
    }

    return usuarios;
}

module.exports = usuarioData;