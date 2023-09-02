function ventasData(sequelize, Datatypes){

    let tabla = 'venta';

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
        monto: {
            type: Datatypes.DECIMAL(20, 6),
            allowNull: false,
        },
        direccion: {
            type: Datatypes.STRING(50),
            allowNull: false,
        },
        ciudad: {
            type: Datatypes.STRING(50),
            allowNull: false,
        },
        fecha: {
            type: Datatypes.DATE,
            allowNull: false,
        },
        enviar_domicilio: {
            type: Datatypes.BOOLEAN,
            allowNull: false,
        },
        medio_pago: {
            type: Datatypes.ENUM('Y', 'N'),
            allowNull: false,
        },
    }

    let config = {tableName: 'venta', camelCase: false, timestamps: false};

    const ventas = sequelize.define(tabla, campos, config);

    ventas.associate = function(modelos){
        ventas.hasMany(modelos.producto, {as: "productos", foreignKey: 'venta_id' });
    }

    return ventas;
}

module.exports = ventasData;