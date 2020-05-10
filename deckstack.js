// Simple stack data structure for handling the yugioh deck.
export class DeckStack {
    constructor(deckFactoryClass) {
        // The deck will be a stack of course since both players will get cards from top of a faced down deck. So set an empty array.
        this.deck = [];

        // Set a cap for the deck size since yugioh decks have a limit (40-60).
        this.max = 10;

        // Save the deck factory.
        this.deckFactoryClass = deckFactoryClass;
    }

    // Use the factory to get the deck that will be chosen by the player via the selectable options with the id choiceOfDeck in index.html.
    LoadDeck(index) {
        // Get the deck then shuffle it.
        this.deck = this.deckFactoryClass.DeckFactoryMethod(index);
        this.Shuffle();
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

    Push(...cardData) {
        // Check if max is reached. If so, return early.
        if (this.deck.length >= this.max) {
            // Test log.
            console.log("Maximum " + this.max + " has been reached for stack, because stack length is " + this.deck.length);
            console.log("So the card " + name + " cannot be added!\n");
            return;
        }

        // If not, simply push to the stack.
        this.deck.push(this.SetCardData(cardData[0], cardData[1], cardData[2], cardData[3], cardData[4], cardData[5], cardData[6], cardData[7], cardData[8]));
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
    SetCardData(...cardData) {
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
}