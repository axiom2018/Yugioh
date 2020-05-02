// Simple stack data structure for handling the yugioh deck.
export class DeckStack {
    constructor() {
        // The deck will be a stack of course since both players will get cards from top of a faced down deck. So set an empty array.
        this.deck = [];

        // Set a cap for the deck size since yugioh decks have a limit (40-60).
        this.max = 15;

        // Initialize all of the cards.
        this.deck.push(this.CreateCard("Blue-Eyes White Dragon", 3000, 2500, "images/blueeyes.png", 8, "Dragon", "Light"));
        this.deck.push(this.CreateCard("Dark Magician", 2500, 2100, "images/darkmagician.png", 7, "Spellcaster", "Dark"));
        this.deck.push(this.CreateCard("Lightpulsar Dragon", 2500, 1500, "images/lightpulsardragon.png", 6, "Dragon", "Light"));
        this.deck.push(this.CreateCard("Chaos Dragon Levianeer", 3000, 0, "images/chaosdragonlevianeer.png", 8, "Dragon", "Dark"));
        this.deck.push(this.CreateCard("Curse Of Dragon", 2000, 1500, "images/curseofdragon.png", 5, "Dragon", "Dark"));
        this.deck.push(this.CreateCard("Adamancipator Analyzer", 1500, 700, "images/adamancipatoranalyzer.png", 4, "Rock", "Earth"));
        this.deck.push(this.CreateCard("Uni-Zombie", 1300, 0, "images/unizombie.png", 3, "Zombie", "Dark"));
        this.deck.push(this.CreateCard("Hitotsu-Me Giant", 1200, 1000, "images/hitotsumegiant.png", 4, "Beast-Warrior", "Earth"));
        this.deck.push(this.CreateCard("TrapTrix Genlisea", 1200, 1600, "images/traptrixgenlisea.png", 4, "Plant", "Earth"));
    }

    // Using the fisher-yates shuffle algorithm to shuffle the deck.
    Shuffle() {
        // This var will keep track of the index we'll initially pick to switch.
        let switchIndex;
        
        // Hold the card of course.
        let card;
        
        // We'll start from the top of the stack and this will be the index.
        let currentIndex;

        // Start the for loop from the back, just like the PrintDeckInStackForm works.
        for (currentIndex = this.deck.length - 1; currentIndex > 0; --currentIndex) {
            // Get the switch index a random value according to the length.
            switchIndex = Math.floor(Math.random() * (currentIndex + 1));

            // Save the card we have at the back.
            card = this.deck[currentIndex];

            // Switch the card we have at the back with the card we randomly selected.
            this.deck[currentIndex] = this.deck[switchIndex];

            // Put the card we had at the back in the random index we got.
            this.deck[switchIndex] = card;
        }
    }

    /* Data we need to store on each monster card:
    
    1) Name.
    2) Attack points.
    3) Defence points.
    4) The images. 
    5) Levels
    6) Type.
    7) Attributes. */

    Push(name, attackPoints, defensePoints, imgSrc, level, type, attribute) {
        // Check if max is reached. If so, return early.
        if (this.deck.length >= this.max) {
            // Test log.
            console.log("Maximum " + this.max + " has been reached for stack, because stack length is " + this.deck.length);
            console.log("So the card " + name + " cannot be added!\n");
            return;
        }

        // If not, simply push to the stack.
        this.deck.push(this.CreateCard(name, attackPoints, defensePoints, imgSrc, level, type, attribute));
    }

    // Typical stack function.
    Pop() {
        // Check if empty, if so, return early.
        if(this.deck.length <= 0) {
            console.log("No more cards remain in the deck!\n");
            return;
        }

        // Return the top value.
        return this.deck.pop();
    }

    // Simply show stack contents in console.
    PrintDeckInStackForm() {
        for(let i = this.deck.length - 1; i >= 0; --i) {
            console.log(this.deck[i]);
        }
    }

    // Referenced in card manager constructor for the cpu.
    GetDeck() {
        return this.deck;
    }

    // Card creation function, core to the game working.
    CreateCard(name, attackPoints, defensePoints, imgSrc, level, type, attribute) {
        return { 
            Name:name, 
            AttackPoints: attackPoints,
            DefensePoints: defensePoints,
            Imgsrc: imgSrc,
            Level: level,
            Type: type,
            Attribute: attribute
        }
    }
}