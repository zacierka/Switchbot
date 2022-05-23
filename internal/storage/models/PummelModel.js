const { DataTypes } = require('sequelize');
const db = require('../storage');

const Pummel = db.define('pummel', {
	username: DataTypes.STRING, // discord user id
	score: DataTypes.INTEGER,
});

module.exports = Pummel