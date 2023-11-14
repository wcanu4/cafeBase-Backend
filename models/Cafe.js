const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Cafe = sequelize.define('Cafe', {
  libra: DataTypes.STRING,
  precio: DataTypes.STRING,
  cosecha: DataTypes.STRING,
}, {
  tableName: 'cafe', // Nombre de la tabla en la base de datos
  timestamps: false, // Deshabilita las marcas de tiempo
});

module.exports = Cafe;