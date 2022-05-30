const MQ = require("../internal/pubsub/AMPQHandler");

//figure out the import here for send to queue
const msgq = new MQ(process.env.MC_QUEUE);

exports.run = (client, message, args) => {
    msgq.setupConnection()
    .then(() => {
        msgq.send('ONLINE_MCREQUEST');
    });
}

exports.name = "online";
exports.alias = ["o"];