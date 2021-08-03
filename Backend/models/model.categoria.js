const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../db/conexion');

class Categoria extends Model {}

Categoria.init({
  // Model attributes are defined here
  ID_CATEGORIA: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  NOMBRE: {
    type: DataTypes.STRING,
    allowNull: false   
  },
  IMAGEN: {
    type: DataTypes.STRING    
  }
}, {
  // Other model options go here  
  modelName: 'Categoria', // We need to choose the model name
  tableName: 'CATEGORIAS',
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  sequelize, // We need to pass the connection instance
});

module.exports = Categoria;