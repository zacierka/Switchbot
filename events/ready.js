const { DataTypes } = require('sequelize');

module.exports = async (client) => {
  /* Need to sync all Models here */
  const PummelScore = client.sequelize.define('PummelScore', {
    memberID: DataTypes.STRING(60), // discord user id
    score: DataTypes.INTEGER,
  }, {
    timestamps: false
  });

  const Member = client.sequelize.define('Member', {
    memberID: DataTypes.STRING(45), // discord user id
    memberName: DataTypes.STRING(60), // username
  }, {
    timestamps: false
  });

  client.sequelize.models.Member.sync().then(() => console.log("Member Table Created")).catch(() => console.log(err));
  client.sequelize.models.PummelScore.sync().then(() => console.log("PummelScore Table Created")).catch(() => console.log(err));

  console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);
}