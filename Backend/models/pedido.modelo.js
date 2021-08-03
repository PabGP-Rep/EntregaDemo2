const {Model,DataTypes} = require('sequelize');
const sequelize = require('../db/conexion')
class Pedidodb extends Model{}

Pedidodb.init( {
    ID_PEDIDO:{ 
        type:DataTypes.INTEGER,
        allowNull: false
    },
    USERNAME : {
        type: DataTypes.STRING,
        allowNull: false
    },
    ID_PRODUCTO : {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    CANTIDAD: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    SUB_TOTAL: {
        type: DataTypes.FLOAT,
        allowNull: false
    },


},
{
    sequelize,
    modelName:'Pedidodb',
    tableName: 'PEDIDOS',
    timestamps:false,
    createdAt:false,
    updatedAt:false
})

module.exports = Pedidodb;
