const Sequelize = require('sequelize');
require('dotenv').config();
const db =  new Sequelize(`mysql://${process.env.DB_ADDR}`);

db.authenticate().then(() => {
    console.log('Connection established successfully.');
    db.sync()
      .then(sync => console.log("Syncd"))
      .catch(err => console.log(err));
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });