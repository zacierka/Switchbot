const fs = require("fs");
require('dotenv').config();
const fetch = require('node-fetch');

// const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
// for (const file of events) {
//   const eventName = file.split(".")[0];
//   console.log(eventName);
// }


let url = `http://${process.env.RP_ADDR}`;

    let settings = { method: "Get" };
    let isDerek = false;

    fetch(url, settings)
        .then(res => res.text())
        .then((text) => {
            const player_list = JSON.parse(text);
            for(var i = 0; i < player_list.length; i++)
            {
              if(player_list[i].name == "Revik")
                isDerek = true;
            }
        });

        console.log(isDerek);