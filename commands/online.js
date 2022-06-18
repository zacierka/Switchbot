const MQ = require("../internal/pubsub/AMPQHandler");
const msgq = new MQ(process.env.MC_QUEUE);
const { checkCooldown } = require('../internal/utilities/cooldown');
const { MessageEmbed } = require('discord.js');
const { QueryTypes } = require('sequelize');
exports.run = (client, message, args) => {
    if(checkCooldown(message.author.id, message)) {
        return;
    }
    var embed = new MessageEmbed()
                    .setColor('#39fc03')
                    .setTimestamp()
                    .setTitle('Minecraft Server Status')
                    .setFooter({
                        text: 'ebotclique'
                    });
    client.sequelize.query("SELECT `status` from `minecraft`.`status` WHERE `state` = 'ACTIVE' LIMIT 1;", {type: QueryTypes.SELECT})
            .then((results) => {
                if(results[0]['status'] == "OFFLINE") {
                    embed.setDescription("The Server is OFFLINE");
                    embed.setColor('#911313');
                    message.channel.send({
                        embeds: [embed]
                    });
                } else if(results[0]['status'] == "ONLINE") {
                    msgq.setupConnection()
                    .then(() => {
                        msgq.send('ONLINE_MCREQUEST');
                    });
                }  else if(results[0]['status'] == "CLOSED") {
                    embed.setDescription("The Server is CLOSED. Server will be back up when 1.19 releases.");
                    embed.setColor('#8b15c2');
                    message.channel.send({
                        embeds: [embed]
                    });
                }
            }).catch(err => console.log(err));
}

exports.name = "online";
exports.alias = ["o"];