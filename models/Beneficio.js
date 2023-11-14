
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Beneficio = sequelize.define('Beneficio', {
partida: DataTypes.STRING,
quintales: DataTypes.STRING,
despulpado: DataTypes.STRING,
fermentacion: DataTypes.STRING,
lavado: DataTypes.STRING,
secado : DataTypes.STRING,
pergamino: DataTypes.STRING,
fecha_final : DataTypes.STRING,
d1: DataTypes.STRING,
d2: DataTypes.STRING,
f1: DataTypes.STRING,
f2: DataTypes.STRING,
l1: DataTypes.STRING,
l2: DataTypes.STRING,
s1: DataTypes.STRING,
s2: DataTypes.STRING,

}, {
  tableName: 'beneficio', // Nombre de la tabla en la base de datos
  timestamps: false, // Deshabilita las marcas de tiempo
});

module.exports = Beneficio;


