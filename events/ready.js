const PummelModel = require('../internal/storage/models/PummelModel');

module.exports = async (client) => {
    /* Need to sync all Models here */
    PummelModel.sync();
    console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);
}