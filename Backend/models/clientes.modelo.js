const sequelize = require("../db/conexion");
const {Model,DataTypes} = require('sequelize');
class Clientedb extends Model{}
Clientedb.init({
    NOMBRE1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    NOMBRE2: {
        type: DataTypes.STRING,
        allowNull:true
    },
    PAPEL: {
        type: DataTypes.STRING,
        allowNull: false
    },    
    APELLIDO1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    APELLIDO2: {
        type: DataTypes.STRING,
        allowNull:false
    },
    USERNAME: {
        primaryKey: true,
        type:DataTypes.STRING,
        allowNull:false
    },
    DIRECCION: {
        type:DataTypes.STRING,
        allowNull:false
    },
    ENVIOS: {
        type:DataTypes.STRING,
        allowNull:false
    },
    PAIS: {
        type:DataTypes.STRING,
        allowNull:false
    },
    FORMA_PAGO: {
        type:DataTypes.STRING,
        allowNull:false
    },
    PROPIETARIO_TARJETA: {
        type: DataTypes.STRING,
        allowNull:false
    },
    NUM_TARJETA: {
        type: DataTypes.INTEGER,
        allowNull:false        
    },
    CADUCIDAD: {
        type:DataTypes.STRING,
        allowNull:false
    },
    PASSWORD_USUARIO: {
        type:DataTypes.STRING,
        allowNull:false
    },
    CVV: {
        type: DataTypes.STRING,
        allowNull:false
    },
    MAIL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TELEFONO: {
        type: DataTypes.STRING,
        allowNull:true
    },
    
}, {
    sequelize,
    modelName:'Clientedb',
    tableName: 'CLIENTES',
    timestamps:false,
    createdAt:false,
    updatedAt:false
 })

module.exports = Clientedb