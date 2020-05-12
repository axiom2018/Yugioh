// Factory pattern, using es6.

// Need the create card function to make this process a lot easier to manage, regarding the array of object we're creating. Use the rest operator of es6.
function CreateCard(...cardData) {
    return { 
        Name:cardData[0], 
        AttackPoints: cardData[1],
        DefensePoints: cardData[2],
        Imgsrc: cardData[3],
        Level: cardData[4],
        Rank: cardData[5],
        Link: cardData[6],
        Type: cardData[7],
        Attribute: cardData[8]
    }
}

// First deck, no theme to it.
function GenericDeck() {
    // Create an array.
    let deck = [];

    // Begin pushing back the cards to the array.
    deck.push(CreateCard("Blue-Eyes White Dragon", 3000, 2500, "images/genericdeck/blueeyes.png", 8, 0, 0, "Dragon", "Light"));
    deck.push(CreateCard("Dark Magician", 2500, 2100, "images/genericdeck/darkmagician.png", 7, 0, 0, "Spellcaster", "Dark"));
    deck.push(CreateCard("Lightpulsar Dragon", 2500, 1500, "images/genericdeck/lightpulsardragon.png", 6, 0, 0, "Dragon", "Light"));
    deck.push(CreateCard("Chaos Dragon Levianeer", 3000, 0, "images/genericdeck/chaosdragonlevianeer.png", 8, 0, 0, "Dragon", "Dark"));
    deck.push(CreateCard("Curse Of Dragon", 2000, 1500, "images/genericdeck/curseofdragon.png", 5, 0, 0, "Dragon", "Dark"));
    deck.push(CreateCard("Adamancipator Analyzer", 1500, 700, "images/genericdeck/adamancipatoranalyzer.png", 4, 0, 0, "Rock", "Earth"));
    deck.push(CreateCard("Uni-Zombie", 1300, 0, "images/genericdeck/unizombie.png", 3, 0, 0, "Zombie", "Dark"));
    deck.push(CreateCard("Hitotsu-Me Giant", 1200, 1000, "images/genericdeck/hitotsumegiant.png", 4, 0, 0, "Beast-Warrior", "Earth"));
    deck.push(CreateCard("TrapTrix Genlisea", 1200, 1600, "images/genericdeck/traptrixgenlisea.png", 4, 0, 0, "Plant", "Earth"));
    deck.push(CreateCard("Blackwing - Zephyros the Elite", 1600, 1000, "images/genericdeck/blackwingzephyrostheelite.png", 4, 0, 0, "Winged Beast", "Dark"));

    return deck;
}

// Second deck, shaddoll cards from a recently released structure deck: https://www.tradingcardmint.com/product-category/yugioh/structure-deck-shaddoll-showdown/
function DeckShadollDeck() {
    // Create an array.
    let deck = [];

    // Begin pushing back the cards to the array.
    deck.push(CreateCard("El Shaddoll Apkallone", 2500, 2000, "images/shaddollshowdown/elshaddollapkallone.png", 6, 0, 0, "Spellcaster", "Dark"));
    deck.push(CreateCard("Reeshaddoll Wendi", 1500, 1000, "images/shaddollshowdown/reeshaddollwendi.png", 3, 0, 0, "Psychic", "Wind"));
    deck.push(CreateCard("El Shaddoll Constructor", 2800, 2500, "images/shaddollshowdown/elshaddollconstruct.png", 8, 0, 0, "Fairy", "Light"));
    deck.push(CreateCard("Naelshaddoll Ariel", 1000, 1800, "images/shaddollshowdown/naelshaddollariel.png", 4, 0, 0, "Pyschic", 0, "Water"));
    deck.push(CreateCard("Armageddon Knight", 1400, 1200, "images/shaddollshowdown/armageddonknight.png", 4, 0, 0, "Warrior", "Dark"));
    deck.push(CreateCard("Shaddoll Falco", 600, 1400, "images/shaddollshowdown/shaddollfalco.png", 2, 0, 0, "Spellcaster", "Dark"));
    deck.push(CreateCard("Kuribandit", 1000, 700, "images/shaddollshowdown/kuribandit.png", 3, 0, 0, "Fiend", "Dark"));
    deck.push(CreateCard("Dark Armed Dragon", 2800, 1000, "images/shaddollshowdown/darkarmeddragon.png", 7, 0, 0, "Dragon", "Dark"));
    deck.push(CreateCard("Shaddoll Squamata", 1800, 1000, "images/shaddollshowdown/shaddollsquamata.png", 4, 0, 0, "Spellcaster", "Dark"));
    deck.push(CreateCard("Performage Trick Clown", 1600, 1200, "images/shaddollshowdown/performagetrickclown.png", 4, 0, 0, "Spellcaster", "Light"));

    return deck;
}

// Third deck, this technically includes mixed cards with no real theme as far as I can tell, see here: https://www.tradingcardmint.com/product-category/yugioh/duel-overload/
function DuelOverloadDeck() {
    // Create an array.
    let deck = [];

    // Begin pushing back the cards to the array.
    deck.push(CreateCard("Union Carrier", 1000, 0, "images/dueloverload/unioncarrier.png", 0, 0, 2, "Machine", "Light"));
    deck.push(CreateCard("Ferocious Flame Swordsman", 1300, 0, "images/dueloverload/ferociousflameswordsman.png", 0, 0, 2, "Warrior", "Fire"));
    deck.push(CreateCard("Madolche Magileine", 1400, 1200, "images/dueloverload/madolchemagileine.png", 4, 0, 0, "Spellcaster", "Earth"));
    deck.push(CreateCard("Bujinki Ahashima", 1500, 0, "images/dueloverload/bujinkiahashima.png", 0, 0, 2, "Beast-Warrior", "Light"));
    deck.push(CreateCard("Sky Striker Ace - Zeke", 1500, 0, "images/dueloverload/skystrikeracezeke.png", 0, 0, 2, "Machine", "Dark"));
    deck.push(CreateCard("Destiny HERO - Celestial", 1600, 1400, "images/dueloverload/destinyherocelestial.png", 4, 0, 0, "Warrior", "Dark"));
    deck.push(CreateCard("Scrap Orthros", 1700, 1100, "images/dueloverload/scraporthros.png", 4, 0, 0, "Beast", "Earth"));
    deck.push(CreateCard("Cyber Dragon Infinity", 2100, 1600, "images/dueloverload/cyberdragoninfinity.png", 0, 6, 0, "Machine", "Light"))
    deck.push(CreateCard("Vanity's Ruler", 2500, 1600, "images/dueloverload/vanitysruler.png", 8, 0, 0, "Fairy", "Light"));
    deck.push(CreateCard("Dark Anthelion Dragon", 3000, 2500, "images/dueloverload/darkantheliondragon.png", 0, 7, 0, "Dragon", "Dark"));

    return deck;
}

// Fourth deck from a set mainly consisting of plants, found here: https://www.tradingcardmint.com/product-category/yugioh/secret-slayers/
function SecretSlayers() {
    // Create an array.
    let deck = [];

    // Begin pushing back the cards to the array.
    deck.push(CreateCard("Lonefire Blossom", 500, 1400, "images/secretslayers/lonefireblossom.png", 3, 0, 0, "Plant", "Fire"));
    deck.push(CreateCard("Rose Lover", 800, 800, "images/secretslayers/roselover.png", 1, 0, 0, "Plant", "Earth"));
    deck.push(CreateCard("Primula The Rikka Fairy", 800, 1800, "images/secretslayers/primulatherikkafairy.png", 4, 0, 0, "Plant", "Water"));
    deck.push(CreateCard("Mudan The Rikka Fairy", 1000, 2400, "images/secretslayers/mudantherikkafairy.png", 6, 0, 0, "Plant", "Water"));
    deck.push(CreateCard("Snowdrop The Rikka Fairy", 1200, 2600, "images/secretslayers/snowdroptherikkafairy.png", 8, 0, 0, "Plant", "Water"));
    deck.push(CreateCard("Cyclamen The Rikka Fairy", 1800, 800, "images/secretslayers/cyclamentherikkafairy.png", 4, 0, 0, "Plant", "Water"));
    deck.push(CreateCard("Koa'ki Meiru Guardian", 1900, 1200, "images/secretslayers/koakimeiruguardian.png", 4, 0, 0, "Rock", "Earth"));
    deck.push(CreateCard("Adamancipator Risen - Leonite", 2400, 2200, "images/secretslayers/adamancipatorrisenleonite.png", 6, 0, 0, "Rock", "Fire"));
    deck.push(CreateCard("Talaya, Princess of Cherry Blossoms", 2800, 1200, "images/secretslayers/talayaprincessofcherryblossoms.png", 8, 0, 0, "Plant", "Water"));
    deck.push(CreateCard("Adamancipator Risen - Dragite", 3000, 2200, "images/secretslayers/adamancipatorrisendragite.png", 8, 0, 0, "Rock", "Water"));

    return deck;
}

// Export class for use in deckstack.
export class DeckFactoryClass {
    // Set up the factory function.
    DeckFactoryMethod(index) {
        // Like all factories, the request will be processed via index and a switch.
        switch(index) {
            case 0:
                return GenericDeck();
            case 1:
                return DeckShadollDeck();
            case 2:
                return DuelOverloadDeck();
            case 3:
                return SecretSlayers();
            default:
                break;
        }
    }
}