const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();



// Initiate Gacha pool

/*
var supporters = [];
var weapons = [];
request(url, options, (error, res, body) => {
    if (error) {
        return  console.log(error)
    };
    if (!error && res.statusCode == 200) {
        supporters = body;
        
    };
});

const weaponurl = "https://aayu3.github.io/ATBotJSONDependencies/weapons.json";
request(weaponurl, options, (error, res, body) => {
  if (error) {
      return  console.log(error)
  };

  if (!error && res.statusCode == 200) {
      weapons = body;
      
  };
});



//get files ready
/*
let rawdata = fs.readFileSync("supporters.json");
supporters = JSON.parse(rawdata);
*/
let rawdata = fs.readFileSync("decks.json");
decks = JSON.parse(rawdata);


const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
});
client.deck_commands = new Discord.Collection();


// Load commands in adminitrative_commands
//const admincommandFiles = fs.readdirSync('./administrative_commands').filter(file => file.endsWith(".js"));

/* Add them to the collection
for (const file of admincommandFiles) {
  const command = require(`./administrative_commands/${file}`);
  client.admin_commands.set(command.name, command);
}
*/

// Load commands in supporter_commands
const deckcommandFiles = fs.readdirSync('./deck_commands').filter(file => file.endsWith(".js"));

// Add them to the collection
for (const file of deckcommandFiles) {
  const command = require(`./deck_commands/${file}`);
  client.deck_commands.set(command.name, command);
}




// function to sanitize msgs and return an array of commands and arguments
// returns 0 if the message is not a command
// i.e `!mute @jeff` becomes ['mute', 'jeff'];
const prefix = "!";

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
  console.log('The Bot is ready!')
});






// list emote command
client.on('message', (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift();

  if (client.deck_commands.has(command)) {
    try {
      client.deck_commands.get(command).execute(msg, decks, args);
    } catch (error) {
      console.error(error);
      msg.reply("Error trying to execute this command.");
    }
  } else {
    return;
  }
});

client.on('message', (msg) => {
    if (msg.author.bot && msg.content.includes("Link: ")) {
      msg.suppressEmbeds(true);
    }
});
// Token Change
