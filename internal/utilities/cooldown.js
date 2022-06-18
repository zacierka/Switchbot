
const talkedRecently = new Set();
var ret = false;
module.exports.checkCooldown = function (userID, msg) { 
    if(userID == process.env.OWNERID) {
        return;
    }
    if (talkedRecently.has(userID)) {
        msg.reply("try again in a few seconds").then(msg => {
            setTimeout(() => msg.delete(), 10000) // TODO move to config file
        });
        ret = true;
    } else {
        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(userID);
        setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(userID);
        }, 15000); // TODO move to config file
        ret = false;
    }
    return ret;
};