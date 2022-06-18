const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { checkCooldown } = require('../internal/utilities/cooldown');

exports.run = (client, message, args) => {
    if(checkCooldown(message.author.id, message)) {
        return;
    }
    // inside a command, event listener, etc.
    var embed = new MessageEmbed()
        .setColor('#B96819')
        .setThumbnail('https://servers-live.fivem.net/servers/icon/m3x69d/-541801529.png')
        .setTimestamp()
        .setTitle('No, Not in City')
        .setFooter({
            text: 'ebotclique'
        });
    let url = `http://${process.env.RP_ADDR}`;

    let settings = {
        method: "Get"
    };
    var isDerek = false;

    fetch(url, settings)
        .then(res => res.text())
        .then((text) => {
            const player_list = JSON.parse(text);
            var isDerek = false;
            for (var i = 0; i < player_list.length; i++) {
                if (player_list[i].name == "Revik") {
                    embed.setTitle("Yes, in the City");
                }
            }
            message.channel.send({ embeds: [embed] });
        });
}

exports.name = "derek";
exports.alias = [];