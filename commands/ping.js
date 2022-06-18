exports.run = (client, message, args) => {
    if(message.author.id != client.application.owner)
        message.channel.send("pong!").catch(console.error);
}

exports.name = "ping";
exports.alias = [];