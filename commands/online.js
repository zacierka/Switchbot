const MQ = require("../internal/pubsub/AMPQHandler");
const msgq = new MQ(process.env.MC_QUEUE);
const { checkCooldown } = require('../internal/utilities/cooldown');

exports.run = (client, message, args) => {
    if(checkCooldown(message.author.id, message)) {
        return;
    }
    msgq.setupConnection()
    .then(() => {
        msgq.send('ONLINE_MCREQUEST');
    });
}

exports.name = "online";
exports.alias = ["o"];