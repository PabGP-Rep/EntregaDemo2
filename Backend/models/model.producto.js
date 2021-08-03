const { Sequelize, DataTypes, Model, Deferrable } = require('sequelize');
const sequelize = require('../db/conexion');
const Categoria = require('./model.categoria');

class Producto extends Model {}

Producto.init({
  // Model attributes are defined here
  ID_PRODUCTO: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  ID_CATEGORIA: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Categoria,
      key: 'ID_CATEGORIA',
      deferrable: Deferrable.INITIALLY_IMMEDIATE      
    }
  },
  NOMBRE: {
    type: DataTypes.STRING,
    allowNull: false    
  },
  PRECIO: {
    type: DataTypes.FLOAT,
    allowNull: false    
  },
  IMAGEN: {
    type: DataTypes.STRING       
  }
}, {
  // Other model options go here  
  modelName: 'Producto', // We need to choose the model name
  tableName: 'PRODUCTOS',
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  sequelize, // We need to pass the connection instance
});

module.exports = Producto;