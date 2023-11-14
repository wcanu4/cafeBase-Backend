const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  document: DataTypes.INTEGER,
  phone: DataTypes.INTEGER,
  mail: DataTypes.STRING,
  addres: DataTypes.STRING,
  creation: DataTypes.STRING,
  user: DataTypes.STRING,
  rol: DataTypes.STRING,
  pass: DataTypes.STRING,
  state: DataTypes.STRING,
}, {
  tableName: 'user', // Nombre de la tabla en la base de datos
  timestamps: false, // Deshabilita las marcas de tiempo
});

module.exports = User;

