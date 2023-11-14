// config.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('cafebase', 'waltercanu', '123456789', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

module.exports = sequelize;



