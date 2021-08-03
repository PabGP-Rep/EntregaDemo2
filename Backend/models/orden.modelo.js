const {Model,DataTypes} = require('sequelize');
const sequelize = require('../db/conexion');


class Ordendb extends Model{};

Ordendb.init( {
    ID_ORDEN: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_PEDIDO: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    USERNAME: {
        type: DataTypes.STRING,
        allowNull: false
    },
    STATUS: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TOTAL: {
        type: DataTypes.FLOAT,
        allowNull:false
    }
},
{
    sequelize,
    modelName:'Ordendb',
    tableName: 'ORDENES',
    timestamps:false,
    createdAt:false,
    updatedAt:false
}) 

module.exports = Ordendb;