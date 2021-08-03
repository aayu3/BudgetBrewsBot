const deckFormat = require("../deckFormat.js");
const fs = require('fs');
const converter = require('json-2-csv');

// function to sanitize msgs and return an array of commands and arguments
// returns 0 if the message is not a command
// i.e `!mute @jeff` becomes ['mute', 'jeff'];
const prefix = "!";

function sanitizeCommand(msg) {
    if (!msg.content.startsWith(prefix)) return 0;
    let sanitized = msg.content.replace(prefix,'');
    return sanitized.split(" ");
  }

module.exports = {
    name: 'adddeck',
    description : 'Add a deck to the database.\n Example: `!adddeck Yeetsan 2; G; https://google.com; Yisan | Commander 2; Proactive; Kamui, Walking Ballista`',
    usage : '<deck_name>, <colors>, <link>, <commanders>, <strategy>, <authors>',
    execute(msg, decks, args) {
      let messageContents = sanitizeCommand(msg);
      if (messageContents[0] == "adddeck") {
        let deckInfo = messageContents.slice(1).join(" ").split(";");
        console.log(deckInfo)
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = mm + '/' + dd + '/' + yyyy;
        let deck = {
          "NAME": deckInfo[0].trim(),
          "COLORS" : deckInfo[1].trim(),
          "LINK" : deckInfo[2].trim(),
          "COMMANDERS" : deckInfo[3].trim(),
          "STRATEGIES" : deckInfo[4].trim(),
          "AUTHORS" : deckInfo[5].trim(),
          "UPDATED" : today.trim(),
          "LIST STATUS" : "Active"
        };
        console.log(deck);
        decks.push(deck);
        let content = JSON.stringify(decks);
        fs.writeFile('deck.json', content, (error) => { console.log("unable to add deck.")});
        converter.json2csv(decks, (err, csv) => {
          if (err) {
              throw err;
          }
          // write CSV to a file
          fs.writeFile('decks.csv', csv, (error) => { console.log("unable to add deck.")});
        });
    }
  }
}
