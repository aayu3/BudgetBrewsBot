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
    name: 'decks',
    description : 'Displays all decks in the database',
    usage : '',
    guildOnly: true,
    execute(msg, decks, args) {
      let messageContents = sanitizeCommand(msg);
      if (messageContents[0] == "deck") {
        let messages = deckFormat.printMultiDecks(decks);
        for (var i = 0; i < messages.length; i++) {
          msg.channel.send(messages[i]);
        }
    }
  }
}
