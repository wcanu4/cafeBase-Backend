
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Store = sequelize.define('Store', {
  departure: DataTypes.STRING,
  coat: DataTypes.STRING,
  amount: DataTypes.STRING,
  available: DataTypes.STRING,
  used: DataTypes.STRING,
  harvest: DataTypes.STRING,
  date: DataTypes.STRING,
}, {
  tableName: 'store', // Nombre de la tabla en la base de datos
  timestamps: false, // Deshabilita las marcas de tiempo
});

module.exports = Store;

