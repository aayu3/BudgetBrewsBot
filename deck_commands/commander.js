const deckFormat = require("../deckFormat.js");

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
    name: 'commander',
    description : "Filter decks by their commander.",
    usage: "<commander_name>",
    execute(msg, decks, args) {
      let messageContents = sanitizeCommand(msg);
      if (messageContents[0] == "commander") {
        let commander = messageContents.slice(1).join(" ");
        let results = deckFormat.filterByCommanders(commander, decks);
        if (results.length == 0) {
          msg.reply("No decks were found with that commander.");
        } else if (results.length == 1) {
          let formatedDeck = deckFormat.printDeck(results[0]);
          msg.channel.send(formatedDeck);
        } else {
          let messages = deckFormat.printMultiDecks(results);
          for (var i = 0; i < messages.length; i++) {
            msg.channel.send(messages[i]);
          }
        }
      } 
    }
}

