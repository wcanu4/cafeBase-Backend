

const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Asegúrate de ajustar la ruta según la configuración de tu proyecto y la conexión a la base de datos.

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nit: {
    type: DataTypes.STRING,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  correo: {
    type: DataTypes.STRING,
  },
  direccion: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'cliente', // Nombre de la tabla en la base de datos
  timestamps: false, // Desactiva las columnas createdAt y updatedAt
});

module.exports = Cliente;
