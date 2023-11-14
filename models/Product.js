
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Product = sequelize.define('Product', {
  code: DataTypes.STRING,
  product: DataTypes.STRING,
  presentation: DataTypes.STRING,
  cost_price: DataTypes.STRING,
  sale_price: DataTypes.STRING,
  existence: DataTypes.NUMBER,
}, {
  tableName: 'product', // Nombre de la tabla en la base de datos
  timestamps: false, // Deshabilita las marcas de tiempo
});

module.exports = Product;


