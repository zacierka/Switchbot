/*

  Need to work on this to minimize code in main file

 */
const { Sequelize } = require('sequelize');
module.exports = new Sequelize(`mysql://${process.env.DB_ADDR}`);