// Require the necessary discord.js classes

const { Client, Intents, Collection } = require('discord.js');
const Sequelize = require('sequelize');

const config = require("../config.js");
const fs = require("fs");
require('dotenv').config();

// console.log = function() {} // DISABLES LOGGING TO CONSOLE FOR PROD
// Create a new client instance
const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
]});


client.config = config;

client.sequelize = new Sequelize(`mysql://${process.env.DB_ADDR}`);

client.sequelize.authenticate()
    .then(() =>console.log('Logged in to DB!'))
    .catch(err => console.log(err));

client.commands = new Collection();

const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`../events/${file}`);
  client.on(eventName, event.bind(null, client));
}

const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];

  const command = require(`../commands/${file}`);

  console.log(`Attempting to load command ${commandName}`);

  client.commands.set(commandName, command);

  if(command.alias.length > 0) {
    command.alias.forEach(function (alias, index) {
      console.log(`Attempting to load alias ${alias} command ${commandName}`);
      client.commands.set(alias, command);
    });
  }
}

client.login(process.env.token);
