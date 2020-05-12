import { Entity } from './entity.js'

// This will be the opponent of the player in the game of course.
export class Cpu extends Entity {
    // Cpu MUST be given the deck of cards because it'll make proper decisions based on which cards are still in the deck.
    constructor(stateContext) {
        // Call the base classes constructor
        super("cpuCardInfoText", "cpuMoney", "cpuImage");

        // Set deck to null until it's properly set.
        this.deck = null;

        // Save the current value to bet if the cpu decides to go for it.
        this.valueToBet = 0;

        // Save the state pattern as well.
        this.stateSystem = stateContext;
    }

    SaveElements() {
        // Get the cpu money element off screen as well as the current pool for referencing.
        this.getResultButton = document.getElementById("getResult"); 
        this.raiseBetButton = document.getElementById("RaiseBet");  
        this.foldButton = document.getElementById("Fold"); 
        this.betSelectors = document.getElementById("betsToMake");
        this.textIdElement = document.getElementById("instructionsUpdate"); 
    }


    GetState() {
        return this.stateSystem;
    }

    // Save the deck so the cpu can properly make a decision.
    SetDeck(deck) {
        this.deck = deck;
    }


    

    RaiseOrFold(valueToBet) {
        // Sort the deck before the cpu makes its decision.
        this.InsertionSort();

        // Save the value to bet.
        this.valueToBet = valueToBet;

        // Now we place the card in a loop and see where it falls regarding attack points.
        this.DetermineMove();
    }

    InsertionSort() {
        // A simple non recursive algorithm to sort. Insertion sort "back tracks", meaning it looks behind it to begin making comparisons.
        for(let i = 1; i < this.deck.length; ++i) {
            // Get index 1 since the loop begins at index 1.
            let key = this.deck[i];
            // Then look behind at index 0.
            let j = i - 1;

            // This asks 2 questions. 1) Is j still in proper array range? 0 to n. 2) Is the attack points of the card j (behind card i) GREATER than i.
            while(j >= 0 && this.deck[j].AttackPoints > key.AttackPoints) {
                // If so, let's begin shifting things over. Set what's in FRONT of j, TO j.
                this.deck[j + 1] = this.deck[j];

                // Then decrement it to continue comparisons.
                j = j - 1;
            }

            // Then place the key in by plusing j.
            this.deck[j + 1] = key;
        }
    }

    /* After insertion sort occurs, let's decide how the cpu moves. The concept is simple. Let's say we have 3 cards:
    HitotsuMe Giant, Curse of Dragon, and Blue eyes in the deck. The player could be holding a Dark Magician. 
    
    The attack points of all (including the magician) are 1200, 2000, 3000, and 2500. This function will say "Okay 
    the Dark Magician is better than HitotsuMe Giant, Curse of Dragon, but NOT better than the blue eyes. It's better
    than 2 cards that remain in the deck. There's a total of 2, so being better than 2 cards overall in a pile of 3
    
    It's a simple concept of yugioh players. If they see a card with extremely high attack they're likely to believe that
    the card won't be bested in a head to head challenge against another card. */ 
    DetermineMove() {
        // Get index variable to count how many cards the cpu card is greater than. Increment it everytime the cpu's card IS better.
        let index = 0;

        // Go over the whole thing with a for of loop.
        for(let deckCard of this.deck) {
            // If the card at index 0, 1, etc less than or equal to the card the cpu has? If so, the cpu has a chance of beating it or making a stalemate.
            if(deckCard.AttackPoints <= this.card.AttackPoints) {
                // So increment the index for the later part of the algorithm.
                ++index;
            }

            // If the card is greater, we found in this sorted array, our limits, break immediately.
            else {
                break;
            }
        }

        /* Let the cpu finish deciding by this process. The deck is in order by the time we get here. Calculate the low, high and midpoint. For example, 
        if we have a deck of 5, cpu has a card and player has a card, that leaves 3 cards in the deck. We WON'T be considering the players card because on 
        screen the player can't even see the CPU's card. So that wouldn't be fair. The cpu would consider the remaining 3 in the deck and they're in order.
        That's good because we'll get the low which is 0, high (in this example it'll be 3) and midpoint (which will be 1 in this example). Then if the card
        the cpu drew was say Curse of Dragon, and the player has the Blue Eyes White Dragon, that means the cpu's Curse of Dragon would be stronger or equal
        to 2 cards in the deck of 3. Those cards, obviously in order, are HitotsuMe Giant (1200), Adamancipator Analyzer (1500), and Dark Magician (2500).
        Our index will be 2, and the midpoint will be 1. If the index is greater than the midpoint, we'll let the cpu go for it and match the bet to see
        if it can win. If it's lower, it folds. If equal to midpoint, then it'll decide in some not so direct manner. */
        let low = 0;
        let high = this.deck.length;
        let midpoint = Math.floor((low + high) / 2);
        
        // Display message to screen.
        this.textIdElement.textContent = "Cpu making its decision!";

        // Use if statements to check the decision. Here cpu is confident so it can raise the bet.
        if(index > midpoint) {
            // The cpu decided to attack, set it's state to allow now.
            this.stateSystem.ChangeStateToAllow();
        }

        else if(index < midpoint) {
            /* Since the cpu decided to fold we must make sure the state reflects Deny, as in "It doesn't matter if the cpu card is stronger, the cpu
            already decided to fold. Cpu can't see that the players card is potentially weaker than it's own card." */
            this.stateSystem.ChangeStateToDeny();
        }

        /* If the index is equal than it doesn't really know what to do. If a human was playing, there choice to attack or not will vary on unknown options.
        So allow the cpu to decide randomly. */
        else { 
            // Get random number, either 1 or 0.
            let value = this.GetRandomNumber();

            // Display message to screen.
            this.textIdElement.textContent = "Cpu unsure on betting or folding!";

            // Use switch to assist putting the value to use.
            switch(value)
            {
                case 0:
                    // The cpu backed off, set it's state to deny.
                    this.stateSystem.ChangeStateToDeny();
                    break;
                case 1:
                    // The cpu decided to attack, set it's state to allow now.
                    this.stateSystem.ChangeStateToAllow();
                    break;
                default:
                    break;
            }
        }

        // We'll need to set the get result button to be seen and other currently displayed buttons to be hidden.
        this.getResultButton.style.display = "block";
        this.raiseBetButton.style.display = "none";
        this.foldButton.style.display = "none";
        this.betSelectors.style.display = "none";
    }

    GetRandomNumber() {
        return Math.floor(Math.random() * Math.floor(2));
    }
}
