const Pummel = require('../internal/storage/models/PummelModel');
exports.run = (client, message, args) => {


    if(args.length == 0) {
        Pummel.findAll({
            attributes: ['username', 'score'],
            order: [
                ['score', 'DESC']
            ]
        })
        .then(pummel =>  {
            console.log("All users:", JSON.stringify(pummel, null, 2));
        })
        .catch(err => console.log(err));
    }
}

exports.name = "pummel";