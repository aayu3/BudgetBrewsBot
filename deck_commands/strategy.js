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
    name: 'strategy',
    description : "Filter Decks by Strategy",
    execute(msg, decks, args) {
      let messageContents = sanitizeCommand(msg);
      if (messageContents[0] == "strategy") {
        let strategy = messageContents[1];
        let results = deckFormat.filterByStrategy(strategy, decks);
        if (results.length == 0) {
          msg.reply("No decks were found with that strategy.");
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

