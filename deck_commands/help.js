const { prefix } = require('../../config.json');

// function to sanitize msgs and return an array of commands and arguments
// returns 0 if the message is not a command
// i.e `!mute @jeff` becomes ['mute', 'jeff'];

function sanitizeCommand(msg) {
    if (!msg.content.startsWith(prefix)) return 0;
    let sanitized = msg.content.replace(prefix,'');
    return sanitized.split(" ");
  }

module.exports = {
    name: 'help',
    description : "List all of my commands or info about a specific command.",
    aliases: ['commands'],
	  usage: '<command name>',
    execute(msg, supporters, args) {
      let messageContents = sanitizeCommand(msg);
      if (messageContents[0] == "website") {
        msg.reply("https://aayu3.github.io/ATBotJSONDependencies/");
      }
    }
}

