const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Ventas = sequelize.define('Ventas', {
  nit: DataTypes.STRING,
  nombre: DataTypes.STRING,
  code: DataTypes.STRING,
  product: DataTypes.STRING,
  sale_price: DataTypes.DECIMAL(10, 2),
  vender: DataTypes.INTEGER,
  total: DataTypes.DECIMAL(10, 2),
  fecha: DataTypes.DATE, // Puedes utilizar DataTypes.DATE para el campo de fecha
}, {
  tableName: 'ventas', // Nombre de la tabla en la base de datos
  timestamps: false, // Deshabilita las marcas de tiempo si no las necesitas
});

module.exports = Ventas;