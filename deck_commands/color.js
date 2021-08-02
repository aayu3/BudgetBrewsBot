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
    name: 'color',
    description : "Filter decks by their color, if there is an argument like atmost, includes/atleast, exact it will apply that argument to the input, otherwise it will default to an exact matching.",
    usage: '<filter> <colors>',
    execute(msg, decks, args) {
      let messageContents = sanitizeCommand(msg);
      if (messageContents[0] == "color") {
        if (messageContents.length == 3) {
          let colors = messageContents[2];
          let results;
          let passed = false;
          if (messageContents[1].toLowerCase() == "atmost") {
            results = deckFormat.filterByColorAtMost(colors, decks);
            passed = true;
          } else if (messageContents[1].toLowerCase() == "includes" || messageContents[1].toLowerCase() == "atleast") {
            results = deckFormat.filterByColorIncludes(colors, decks);
            passed = true;
          } else if (messageContents[1].toLowerCase() == "exact") {
            results = deckFormat.filterByColorExact(colors, decks);
            passed = true;
          } 
          if (passed) {
            if (results.length == 0) {
              msg.reply("No decks were found with that exact color specification.");
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
        } else if (messageContents.length == 2) {
          // Default to exact matching
          let colors = messageContents[1];
          let results = deckFormat.filterByColorExact(colors, decks);
          if (results.length == 0) {
            msg.reply("No decks were found with that exact color specification.");
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
}

