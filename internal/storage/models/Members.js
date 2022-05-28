const { DataTypes } = require('sequelize');
const db = require('../storage');

const Member = db.define('Member', {
    memberID: DataTypes.STRING(45), // discord user id
    memberName: DataTypes.STRING(60), // username
  }, {
    timestamps: false
  });

module.exports = Member