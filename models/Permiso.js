const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Permiso = sequelize.define('Permiso', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user', // Nombre de la tabla de usuario referenciada
      key: 'id', // Clave principal de la tabla de usuario referenciada
    },
  },
  rol: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  compras: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'No', // Valor predeterminado para compras
  },
  ventas: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'No', // Valor predeterminado para ventas
  },
  inventario: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'No', // Valor predeterminado para inventario
  },
  procesos: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'No', // Valor predeterminado para procesos
  },
  reportes: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'No', // Valor predeterminado para reportes
  },
  usuarios: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'No', // Valor predeterminado para usuarios
  },
  bodega: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'No', // Valor predeterminado para usuarios
  },
}, {
  tableName: 'permiso', // Nombre de la tabla en la base de datos
  timestamps: false, // Deshabilita las marcas de tiempo
});

module.exports = Permiso;
