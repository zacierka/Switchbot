const { DataTypes } = require('sequelize');
const db = require('../storage');

const PummelScore = db.define('PummelScore', {
	memberID: DataTypes.STRING(60), // discord user id
	score: DataTypes.INTEGER,
  }, {
	timestamps: false
  });

module.exports = PummelScore