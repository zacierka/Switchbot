const {
  Model
} = require('sequelize');
const {
  Sequelize,
  DataTypes
} = require('sequelize');
require('dotenv').config();
const db = new Sequelize(`mysql://${process.env.DB_ADDR}`);

const PummelScore = db.define('PummelScore', {
  memberID: DataTypes.STRING(60), // discord user id
  score: DataTypes.INTEGER,
}, {
  timestamps: false
});

const Member = db.define('Member', {
  memberID: DataTypes.STRING(45), // discord user id
  memberName: DataTypes.STRING(60), // username
}, {
  timestamps: false
});

function ConnectandAuthenticate() {
  db.authenticate().then(() => {

    db.models.Member.sync();
    db.models.PummelScore.sync();
  
    console.log('Connection established successfully.');
  
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });
}

function BulkCreatePummelScore() {

  PummelScore.bulkCreate([{
      memberID: "1234",
      score: 5
    },
    {
      memberID: "12345",
      score: 5
    },
    {
      memberID: "12346",
      score: 6
    },
    {
      memberID: "12347",
      score: 3
    },
    {
      memberID: "12348",
      score: 2
    }
  ]).then(() => console.log("Pummel data have been saved"));
}

function BulkCreateMember() {

  Member.bulkCreate([{
      memberID: "1234",
      memberName: "T1"
    },
    {
      memberID: "12345",
      memberName: "T2"
    },
    {
      memberID: "12346",
      memberName: "T3"
    },
    {
      memberID: "12347",
      memberName: "T4"
    },
    {
      memberID: "12348",
      memberName: "T5"
    }
  ]).then(() => console.log("Pummel data have been saved"));
}

function getScoreboard() {
      db.query("CALL PummelLeaderboard()")
      .then((results) => {
        console.log(results);
                var trophies = [":1st_place_medal:", ":2nd_place_medal:", ":3rd_place_medal:"]
                var leaderboard = "```";
                for(var i = 0; i < results.length; i++) {
                    if(trophies.length > 0) {
                        var str = `${trophies[i]} ${results[i].memberName} ${results[i].score}\n`
                        leaderboard += str;
                        trophies.splice(i, 1);
                    } else {
                        var str = `${results[i].memberName} ${results[i].score}\n`
                        leaderboard += str
                    }
                }
                leaderboard += "```";
                console.log(leaderboard);
      }).catch(err => console.log(err));

      return []
}

ConnectandAuthenticate();
BulkCreatePummelScore();
BulkCreateMember();
getScoreboard();