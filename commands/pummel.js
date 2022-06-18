const Pummel = require('../internal/storage/models/PummelScore');
const { MessageEmbed } = require('discord.js');
const { checkCooldown } = require('../internal/utilities/cooldown');
exports.run = (client, message, args) => {
    if(checkCooldown(message.author.id, message)) {
        return;
    }
    if (args.length == 0) {
        client.sequelize.query("CALL PummelLeaderboard()")
            .then((results) => {
                //console.log(results);
                var trophies = [":first_place:", ":second_place:", ":third_place:"];
                var leaderboard = "";
                for (var i = 0; i < results.length; i++) {
                    if (trophies.length > i) {
                        var str = `${trophies[i]} ${results[i].memberName} ${results[i].score}\n`
                        leaderboard += str;
                        trophies.splice(i, 0);
                    } else {
                        var str = `${results[i].memberName} ${results[i].score}\n`
                        leaderboard += str
                    }
                }
                const embed = new MessageEmbed()
                    .setColor('#2c40d3')
                    .setDescription(leaderboard)
                    .setTimestamp()
                    .setTitle('Pummel Party Leaderboard')
                    .setFooter({
                        text: 'ebotclique'
                    });
                message.channel.send({
                    embeds: [embed]
                });
            }).catch(err => console.log(err));
    } else if((args.length == 2) && (args[0] == "winner")) { // also check to see if the message contains a mention
        const member = message.mentions.members.first()
        const user = member.user;
        if(user === undefined) {
            return;
        }
        if(!member.roles.cache.some(role => role.name === '𝔈 𝔅𝔬𝔶 ℭ𝔩𝔦𝔮𝔲𝔢')) {
            return;
        }

        client.sequelize.query("CALL PummelWinner(:userid, :userName)", 
        {replacements: { userid: user.id, userName: user.username}})
        .then((results) => {
            if(results[0].score == 1) {
                message.channel.send(`:trophy: ${user.username} now has ${results[0].score} win`);
            } else {
                message.channel.send(`:trophy: ${user.username} now has ${results[0].score} wins`);
            }
        }).catch(err => console.log(err));
    }
}

exports.name = "pummel";
exports.alias = [];