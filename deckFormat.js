const fs = require('fs');

// Declare emotes for formatting
const manaEmotes = {
    "W" : "<:mana_w:616041768458387497>",
    "U" : "<:mana_u:616041768739405824>",
    "B" : "<:mana_b:616041768416182354>",
    "R" : "<:mana_r:616041768617771017>",
    "G" : "<:mana_g:616041769783787520>"
}



// Setting up FS variables
let rawdata = fs.readFileSync("decks.json");
supporters = JSON.parse(rawdata);

module.exports = {
// parses all the files in the folder into JSON objects
    // prints supporter info before the image
    printDeck: function (deck) {
        let strRep = "__**" + deck.NAME + "**__\n";
        strRep = strRep + deck.LINK + "\n";
        strRep = strRep + "Commanders: " + deck.COMMANDERS + '\n';
        strRep = strRep + "Colors: " +  deck.COLORS.split("").map(x => manaEmotes[x]).join("") + "\n";
        strRep = strRep + "Strategy: " + deck.STRATEGIES;
        return strRep
    },

    printMultiDecks: function(decks) {
        let strs = [];
        str = "";
        for (var i = 0; i < decks.length; i++) {
            if (str.length <= 2000 && str.length >= 1800) {
                str = str.substring(0, str.length - 1);
                strs.push(str);
                str = "";
            }
            let deck = decks[i];
            str = str + "__**" + deck.NAME + "**__ ";
            str = str + deck.COLORS.split("").map(x => manaEmotes[x]).join("") + " ";
            str = str + "Link: " + deck.LINK;
            str = str + "\n";
        }
        strs.push(str);
        return strs;
    },

    // assumes the input is legal

    filterByName: function(str, decks) {
        let filtered = [];
        for (var i = 0; i < decks.length; i++) {
            let deck = decks[i];
            if (deck.hasOwnProperty("NAME")) {                
            if (deck.NAME.toLowerCase().includes(str.toLowerCase())) {
                filtered.push(deck);
            }
        }
        }
        return filtered;
    },

    filterByStrategy: function(strategy, decks) {
        let filtered = [];
        for (var i = 0; i < decks.length; i++) {
            let deck = decks[i];
            if (deck.hasOwnProperty("STRATEGIES")) {
            if (deck.STRATEGIES.toLowerCase().includes(strategy.toLowerCase())) {
                filtered.push(deck);
            }
        }
        }
        return filtered;
    },

    filterByCommanders: function (commanders, decks) {
        let filtered = [];
        for (var i = 0; i < decks.length; i++) {
            let deck = decks[i];
            if (deck.hasOwnProperty("COMMANDERS")) {
            if (deck.COMMANDERS.toLowerCase().includes(commanders.toLowerCase())) {
                filtered.push(deck);
            }
        }
        }
        return filtered;
    },
    filterByColorExact: function (colors, decks) {
        // Regardless of order
        let filtered = [];
        for (var i = 0; i < decks.length; i++) {
            let deck = decks[i];
            if (deck.hasOwnProperty("COLORS")) {
            let deckColorArray = deck.COLORS.split("").sort();
            let colorArray = colors.toUpperCase().split("").sort();
            if (JSON.stringify(deckColorArray) == JSON.stringify(colorArray)) {
                filtered.push(deck);
            }
        }
        }
        return filtered;
    },
    filterByColorAtMost: function (colors, decks) {
        // Regardless of order
        let filtered = [];
        for (var i = 0; i < decks.length; i++) {
            let deck = decks[i];
            if (deck.hasOwnProperty("COLORS")) {
            let deckColorArray = deck.COLORS.split("");
            let colorArray = colors.toUpperCase().split(""); 
            if (deckColorArray.length > colorArray) {
                continue;
            } else {
                let tempMap = {}
                colorArray.forEach((el, index) => {
                    tempMap[el] = index;
                });
                var check = deckColorArray.every((el) => {
                    return tempMap[el] !== undefined; //because 0 is falsy
                });
                if (check) {
                    filtered.push(deck);
                }
            }
        }
        }
        return filtered;
    },
    filterByColorIncludes: function (colors, decks) {
        // Regardless of order
        let filtered = [];
        for (var i = 0; i < decks.length; i++) {
            let deck = decks[i];
            if (deck.hasOwnProperty("COLORS")) {
            let deckColorArray = deck.COLORS.split("");
            let colorArray = colors.toUpperCase().split(""); 
            if (deckColorArray.length < colorArray) {
                continue;
            } else {
                let tempMap = {}
                deckColorArray.forEach((el, index) => {
                    tempMap[el] = index;
                });
                var check = colorArray.every((el) => {
                    return tempMap[el] !== undefined; //because 0 is falsy
                });
                if (check) {
                    filtered.push(deck);
                }
            }
        }
        }
        return filtered;
    },
    /*
    filterBySource: function (source, supporters) {
        let filtered = [];
        for (var i = 0; i < supporters.length; i++) {
            let sup = supporters[i];
            if (sup.hasOwnProperty("Source")) {
            if (sup.Source.toLowerCase().includes(source.toLowerCase())) {
                filtered.push(sup);
            }
        }
        }
        return filtered;
    }
    */
}
