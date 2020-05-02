// Main card manager class.
export class CardManager {
    constructor(cpu, deckstack) {
        // Initially set to false, because when user first arrives to the page, they haven't dueled at all.
        this.duelBegun = false;

        // Set an empty array to hold the card objects later.
        this.deck = [];
        
        // Save the image variables for player and cpu via id to change images of cards.
        this.playerImageID = document.getElementById("playerImage");
        this.cpuImageID = document.getElementById("cpuImage");

        // Save the stack.
        this.stack = deckstack;

        // Set the pay-to-play bet requirement when the player wants a card to begin a round.
        this.cost = 50;

        // This will hold the mandatory bet of 50 from both sides when player gets a card.
        this.currentBet = 0;

        // Save the value to bet as a variable in the class. The cpu MUST know about this number to know what it must match to keep playing.
        this.valueToBet = 0;

        /* When the player presses the getCard button, the cpu card can't be immediately revealed. They'll see their odds of winning the hand. Just
        save the card and display after final bet placed.*/
        this.playerCard = null;

        /* Why is this needed? Example, after we raise bet, we could end up betting the last money the player has. */
        this.playerGameOverCheck = false;
        this.cpuGameOverCheck = false;

        /* When the last hand button is displayed that means either the player or cpu is about to lose. But both of their
        functionalities differ regarding the message displayed on screen and other things. So we'll have a function in
        this variable to use when ready. */
        this.lastHandFunction = null;

        // Test variable.
        this.testClassObj = null;
        
        this.stack.Shuffle();
        this.stack.PrintDeckInStackForm();

        // Save the cpu, then the elements for cpu and give the deck as well.
        this.cpu = cpu;
        this.cpu.SaveElements();
        this.cpu.SetDeck(this.stack.GetDeck());
    }

    // The buttons have id's assigned and in order to get elements by id, we'll need to do so with the id tag.
    SaveElements() {
        // Save the variables for the buttons via ids, we'll have to make some visible/invisible.
        this.duelButton = document.getElementById("beginDuelButton");
        this.getCardButton = document.getElementById("getCardForPlayer");
        
        // Hide GetCard button by default when game starts.
        this.getCardButton.style.display = "none";

        // Save get result button because it's for when the cpu makes a decision if it can win or lose and initially hide it.
        this.getResultButton = document.getElementById("getResult");
        this.getResultButton.style.display = "none";

        // Save the refresh hand button as well and hide it.
        this.refreshButton = document.getElementById("Refresh");
        this.refreshButton.style.display = "none";

        // Save the text for money.
        this.playerMoneyElement = document.getElementById("playerMoney");
        this.cpuMoneyElement = document.getElementById("cpuMoney");

        // Save text for the current pool money.
        this.currentPool = document.getElementById("poolTotalMoney");

        // Save the text element as well for updating instructions on what to do.
        this.textIdElement = document.getElementById("instructionsUpdate");

        // Save the raise bet and fold hand buttons for post getCard functionality and hide them both.
        this.raiseBetButton = document.getElementById("RaiseBet");
        this.foldButton = document.getElementById("Fold");
        this.raiseBetButton.style.display = "none";
        this.foldButton.style.display = "none";

        // Save button meant for the players last hand and hide it.
        this.lastHandButton = document.getElementById("LastHand");
        this.lastHandButton.style.display = "none";

        // Now save the selector to let player bet money and hide it as well.
        this.betSelectors = document.getElementById("betsToMake");
        this.betSelectors.style.display = "none";

        // Save the 2 spaces where we'll display all the card info for both player and cpu, then set them to empty strings.
        this.playerCardInfoText = document.getElementById("playerCardInfoText");
        this.cpuCardInfoText = document.getElementById("cpuCardInfoText");
        // this.playerCardInfoText.textContent = "";
        this.cpuCardInfoText.textContent = "";

        // Ready strings to be used to save card info.
        this.playerCardInfo = "";
        this.cpuCardInfo = "";
    }

    // Add the functions to buttons.
    ApplyFunctions() {
        // Ready the self variable for later use.
        var self = this;

        // Add the function ToggleDuelState to the duel button to start the duel.
        this.duelButton.addEventListener("click", function(){
            self.ToggleDuelState();
        })

        // Add the GivePlayerACard function to get card button.
        this.getCardButton.addEventListener("click", function(){
            self.GivePlayerACard();
        })

        // Then continue to get the rest of the functions assigned.
        this.raiseBetButton.addEventListener("click", function(){
            self.RaiseBet();
        })

        this.foldButton.addEventListener("click", function(){
            self.FoldHand();
        })

        this.getResultButton.addEventListener("click", function(){
            self.GetResult();
        })

        this.refreshButton.addEventListener("click", function(){
            self.Refresh();
        })

        this.lastHandButton.addEventListener("click", function(){
            self.lastHandFunction();
        })
    }

    PrintMonsterCards() {
        for(let i = 0; i < this.deck.length; ++i) {
            console.log(this.deck[i]);
        }
    }

    // Need a function to alter the ability to duel, so after user presses the button to begin the duel.
    ToggleDuelState() {
        // Check if it's already true, if so, return function early.
        if(this.duelBegun == true) {
            return;
        }

        // Set to true.
        this.duelBegun = true;

        // Since it's true, we need to display all of the buttons. Begin with the get card button.
        this.getCardButton.style.display = "block";

        // Then of course since we already started the game, hide the begin duel button.
        this.duelButton.style.display = "none";
    }

    // When player isn't confident in the card and doesn't want to risk losing more money.
    FoldHand() {
        // Update text to show they folded the hand!
        this.textIdElement.textContent = "Hand lost due to fold. Get another card to try again!";

        // Set player card into text to empty.
        this.playerCardInfoText.textContent = "";

        // Since the PLAYER gives up. The current bet money goes to cpu.
        this.cpuMoneyElement.textContent = parseInt(this.cpuMoneyElement.textContent) + parseInt(this.currentBet);

        // Set the current bet to be 0 now since this hand is over.
        this.currentBet = 0;

        // Same with the current pool text.
        this.currentPool.textContent = 0;

        // We must be sure to place the cards BACK in the stack.
        this.stack.Push(this.playerCard.Name, this.playerCard.AttackPoints, this.playerCard.DefensePoints, this.playerCard.Imgsrc,
            this.playerCard.Level, this.playerCard.Type, this.playerCard.Attribute);

        this.stack.Push(this.cpu.GetCard().Name, this.cpu.GetCard().AttackPoints, this.cpu.GetCard().DefensePoints, this.cpu.GetCard().Imgsrc,
            this.cpu.GetCard().Level, this.cpu.GetCard().Type, this.cpu.GetCard().Attribute);

        // Set these temporary card variables back to null.
        this.playerCard = null;
        this.cpu.DeleteCard();

        // Also the image source for the player card must be changed back to the default.
        this.playerImageID.setAttribute("src", "images/cardback.png");

        // Message, shuffle, and print stack to screen.
        console.clear();
        console.log("Reprinting stack after fold!\n");
        this.stack.Shuffle();
        this.stack.PrintDeckInStackForm();

        // At the end, make the buttons and selector dissappear.
        this.raiseBetButton.style.display = "none";
        this.foldButton.style.display = "none";
        this.betSelectors.style.display = "none";

        // Make the get card button REAPPEAR.
        this.getCardButton.style.display = "block";

        // Call game over and see if after we folded, that we lost or simultaneous loss occurred.
        this.GameOver();
    }

    HandleCpuMoney() {
        // If value to bet is greater than the cpu money, let cpu just bet the rest of what it has.
        if(parseInt(this.valueToBet) > this.cpuMoneyElement.textContent) {
            // Save cpu money in variable.
            let cpuMoney = parseInt(this.cpuMoneyElement.textContent);

            // Now set the value to 0 since the value player BET is more than the cpu really HAS.
            this.cpuMoneyElement.textContent = 0;

            // Return remaining cpu money to be used in get result to know how much to add to pool.
            return cpuMoney;
        }

        // If the value isn't greater, and cpu can MATCH the bet, apply the bet to it then.
        else 
        {
            // Subtract the value to bet FROM the cpus money. 
            this.cpuMoneyElement.textContent = parseInt(this.cpuMoneyElement.textContent) - this.valueToBet;
        }

        // Return the value to bet because cpu was able to match it.
        return this.valueToBet;
    }

    // The final function called to resolve the bets placed.
    HandleResult(moneyElementOne, moneyElementTwo, firstMessage, secondMessage, attacksEqual = false) {
        // Can the cpu attack?
        if(this.cpu.GetState().CanAllow()) {
            // If so, display cpu card if player goes for it.
            this.cpuImageID.setAttribute("src", this.cpu.GetCard().Imgsrc);
            
            // Add the money to the pool.
            this.currentPool.textContent = parseInt(this.currentPool.textContent) + parseInt(this.HandleCpuMoney()); 

            // Display the given attack message.
            this.textIdElement.textContent = firstMessage;

            // Show the cpu's card info. 
            this.cpuCardInfoText.textContent = this.cpuCardInfo;

            // If default arg is false, just add money to the first element.
            if(attacksEqual == false) {
                // Now get the amount in the money pool and add it in.
                moneyElementOne.textContent = parseInt(moneyElementOne.textContent) + parseInt(this.currentPool.textContent);
            }

            // However if it's true, we need to do extra steps since the attacks of the cards are equal.
            else {
                console.log("in else cuz attack equals is " + attacksEqual);
                // Get half money from pool.
                let halfMoneyFromPool = parseInt(this.currentPool.textContent) / 2;

                // Add it to both elements.
                moneyElementOne.textContent = parseInt(moneyElementOne.textContent) + halfMoneyFromPool;
                moneyElementTwo.textContent = parseInt(moneyElementTwo.textContent) + halfMoneyFromPool;
            }
        }

        // Or if it can't attack.
        else{
             /* If the cpu didn't decide to attack, we CANNOT give half of the pool to both player and cpu. Why? If the player presses 
             getcard, that's 50 from each participant so the pool is at 100. Player raises the attack about $50, making pool 150, BETTING.
             But cpu backs out. Since the cpu didn't risk, the pool money goes to the player. */
             console.log("Testing else statement.\n");

            // Display non attack message.
            this.textIdElement.textContent = secondMessage;

             // Now get the amount in the money pool and add it in.
             moneyElementTwo.textContent = parseInt(moneyElementTwo.textContent) + parseInt(this.currentPool.textContent);
        }
    }

    GetResult() {
        /* 3 conditions that can happen. Player wins (their card attack is greater than the cpu's card attack), Cpu wins (cpu card attack is greater
        than the players card attack), or their both equal. First let's check for player win but first let's get the player card and we have it
        saved here in this class already, get the attack from it. */
        let playerCardAttack = this.playerCard.AttackPoints;

        // Now the cpu card attack.
        let cpuCardAttack = this.cpu.GetCard().AttackPoints;

        // Use if statements to check who wins this hand.
        if(playerCardAttack > cpuCardAttack) {
            // Call to handle the rest.
            this.HandleResult(this.playerMoneyElement, this.playerMoneyElement, 
                "You win! Cpu card not strong enough, hit refresh button to play again!",
                "You win! Cpu folds, hit refresh button to play again!");
        }

        else if(cpuCardAttack > playerCardAttack) {
            // Call to handle the rest.
            this.HandleResult(this.cpuMoneyElement, this.playerMoneyElement, 
                "Cpu has beaten you, hit refresh button to play again!",
                "You win! Cpu folds, hit refresh button to play again!");
        }

        else {
            // Call to handle the rest.
            this.HandleResult(this.cpuMoneyElement, this.playerMoneyElement, 
                "Draw! Both monsters have same attack! And cpu attacked.",
                "Draw! Both monsters have same attack! And cpu did NOT attack.", true);
        }

        // Now just empty the current pool.
        this.currentPool.textContent = 0;

        // Resets the cards, and the bets.
        this.PostHandCleanUp();

        console.log("Player game over value is " + this.playerGameOverCheck);
        console.log("Cpu game over value is " + this.cpuGameOverCheck);

        // Check for playerGameOverCheck ig it's true, if so, the player MIGHT have lost.
        if(this.playerGameOverCheck && (parseInt(this.playerMoneyElement.textContent)) <= 0) {
            console.log("Player loses! Game over!\n");
            this.textIdElement.textContent = "Bro you LOST bro. You're looking weak out here. Refresh the page and try again!";
            this.getResultButton.style.display = "none";
            return;
        }

        // Check for playerGameOverCheck ig it's true, if so, the player MIGHT have lost.
        if(this.cpuGameOverCheck && (parseInt(this.cpuMoneyElement.textContent)) <= 0) {
            console.log("Cpu loses! Game over!\n");
            this.textIdElement.textContent = "Victory! Celebrate your Yugioh abilities with a beer. Refresh the page to play again.";
            this.getResultButton.style.display = "none";
            return;
        }

        // The game over checks could have been true, but the player or cpu didn't actually lose, so set them back to false.
        this.playerGameOverCheck = false;
        this.cpuGameOverCheck = false;

        // Show the refresh hand button.
        this.refreshButton.style.display = "block";

        // And hide the get result button.
        this.getResultButton.style.display = "none";
    }

    Refresh() {
        // Refresh console for testing and print the deck.
        console.clear();
        this.stack.Shuffle();
        this.stack.PrintDeckInStackForm();

        // Clear the text for the card info.
        this.playerCardInfoText.textContent = "";
        this.cpuCardInfoText.textContent = "";

        // Since the cards are back in the deck, set both image sources back to the default states.
        this.playerImageID.setAttribute("src", "images/cardback.png");
        this.cpuImageID.setAttribute("src", "images/cardback.png");
    
        // Show the get card button.
        this.getCardButton.style.display = "block";

        // Empty the instructions string.
        this.textIdElement.textContent = "";

        // Make the refresh hand button invisible.
        this.refreshButton.style.display = "none";
    }

    // Show card info like attack/defense points, etc on screen.
    PrepareCardInfo() {
        // Create a string for both sets of data to be shown.
        this.playerCardInfo = this.playerCardInfoText.textContent;
        this.playerCardInfo = this.playerCard.Name + "\n";
        this.playerCardInfo += this.playerCard.Level + " *\n";
        this.playerCardInfo += "Attack: " + this.playerCard.AttackPoints + "\n";
        this.playerCardInfo += "Defense: " + this.playerCard.DefensePoints + "\n";
        this.playerCardInfo += "Type: " + this.playerCard.Type + "\n";
        this.playerCardInfo += "Attribute: " + this.playerCard.Attribute + "\n";
    
        this.cpuCardInfo = this.cpuCardInfoText.textContent;
        this.cpuCardInfo = this.cpu.GetCard().Name + "\n";
        this.cpuCardInfo += this.cpu.GetCard().Level + " star\n";
        this.cpuCardInfo += "Attack: " + this.cpu.GetCard().AttackPoints + "\n";
        this.cpuCardInfo += "Defense: " + this.cpu.GetCard().DefensePoints + "\n";
        this.cpuCardInfo += "Type: " + this.cpu.GetCard().Type + "\n";
        this.cpuCardInfo += "Attribute: " + this.cpu.GetCard().Attribute + "\n";
    }

    GivePlayerACard() {
        // Simple clear for testing.
        console.clear();

        // Get a card from the stack for player.
        this.playerCard = this.stack.Pop();

        // Then one for cpu. Save the card first, do NOT display it.
        this.cpu.SetCard(this.stack.Pop());

        // Get the card details and display all of them in the players space to the left hand side, and the cpus right side.
        this.PrepareCardInfo();

        // Show the player card info on screen since its card is displayed.
        this.playerCardInfoText.textContent = this.playerCardInfo;

        // Set the player zone to it's card.
        this.playerImageID.setAttribute("src", this.playerCard.Imgsrc);

        // Then just shuffle and print the deck.
        console.log("\n\n");
        this.stack.Shuffle();
        this.stack.PrintDeckInStackForm();

        // Finally since we give out a card, we must decrement money from the player and cpu.
        let playerMoney = this.playerMoneyElement.textContent - this.cost;
        let cpuMoney = this.cpuMoneyElement.textContent - this.cost;

        // EVERY time we get a card, we know for a fact 50 will be taken from both competitors.
        this.currentBet = this.cost * 2;
        console.log("Current bet: " + this.currentBet);

        // We have the current bet ready, and that's the value we display in the pool, so lets do that.
        this.currentPool.textContent = parseInt(this.currentPool.textContent) + parseInt(this.currentBet);

        // Then set it on screen.
        this.playerMoneyElement.textContent = playerMoney;
        this.cpuMoneyElement.textContent = cpuMoney;

        console.log("Players current money is " + parseInt(this.playerMoneyElement.textContent));
        console.log("Cpus current money is " + parseInt(this.cpuMoneyElement.textContent));

        // Display new text on screen regarding what to do next.
        this.textIdElement.textContent = "You see your card to the left. Raise the bet or fold your hand.";

        // Set get card button to none since we just GOT the card.
        this.getCardButton.style.display = "none";

        /* Check players money. After we press the GivePlayerACard button (that has a cost of 50), player could have 0. If true,
        this is their last hand. */
        if(playerMoney <= 0) {
            // Show button.
            this.lastHandButton.style.display = "block"; 

            // Save the proper function.
            this.lastHandFunction = this.LastHandForPlayer;
        }

        else if(cpuMoney <= 0) {
            // Show button.
            this.lastHandButton.style.display = "block";
           
            // Save the proper function.
            this.lastHandFunction = this.LastHandForCpu;
        }

        // If this is not the case, display the normal buttons.
        else {
            // Now display all necessary elements.
            this.raiseBetButton.style.display = "block";
            this.foldButton.style.display = "block";
            this.betSelectors.style.display = "block";
        }
    }

    RaiseBet() {
        // To raise the bet, we must be able to get the value out of the selector. 
        this.valueToBet = this.betSelectors.options[this.betSelectors.selectedIndex].textContent;

        // Check if we can even bet the requested amount according to the players current money.
        if(parseInt(this.valueToBet) > this.playerMoneyElement.textContent) {
            // If we can't, return.
            return;
        }

        // Subtract the value to bet FROM the players money. 
        this.playerMoneyElement.textContent = parseInt(this.playerMoneyElement.textContent) - this.valueToBet;

        // Add the money to the pool.
        this.currentPool.textContent = parseInt(this.currentPool.textContent) + parseInt(this.valueToBet);

        // Next let the cpu decide if it wants to take the bet or fold.
        this.cpu.RaiseOrFold(this.valueToBet);

        // Check if player money is 0. 
        if(parseInt(this.playerMoneyElement.textContent) <= 0) {
            // Set the boolean to true so when hand is done, it checks to see if player lost.
            this.playerGameOverCheck = true;
            console.log("Player this is your LAST bet. Value is " + this.playerGameOverCheck);
        }

        // Check if cpu money is 0. 
        if(parseInt(this.valueToBet) >= parseInt(this.cpuMoneyElement.textContent)) {
            // Set the boolean to true so when hand is done, it checks to see if cpu lost.
            this.cpuGameOverCheck = true;
            console.log("Cpu this is your last bet. Value is " + this.cpuGameOverCheck);
        }
    }

    // Execute Last Hand functionality if player or cpu might lose.
    LastHandFunctionality() {
        // Call the function saved.
        this.lastHandFunction();
    }

    // If the player has $50 left, but can still place a bet, this is their last hand. Be prepared for that case! 
    LastHandForPlayer() {
        console.log("test");
        // First reveal the cpu card.
        this.cpuImageID.setAttribute("src", this.cpu.GetCard().Imgsrc);

        // No need to check if the cpu is ALLOWED to attack or has changed its state to attack. So begin comparisons of attack points. Get the attacks to start.
        let playerCardAttack = this.playerCard.AttackPoints;
        let cpuCardAttack = this.cpu.GetCard().AttackPoints;

        // Check if player actually won this.
        if(playerCardAttack > cpuCardAttack) {
            // If the player did win, simply assign the pool value to the players money total.
            this.playerMoneyElement.textContent = parseInt(this.playerMoneyElement.textContent) + parseInt(this.currentPool.textContent);

            // Empty pool.
            this.currentPool.textContent = 0;

            // Give a message for avoiding defeat.
            this.textIdElement.textContent = "You narrowly escape defeat...good.";

            // Make the button invisible again.
            this.lastHandButton.style.display = "none";

            // Must make the refresh hand button reappear as well.
            this.refreshButton.style.display = "block";
        }
        
        // If the player loses.
        else if(cpuCardAttack > playerCardAttack) {
            // Take what's in the pool and give it to the cpu.
            this.cpuMoneyElement.textContent = parseInt(this.cpuMoneyElement.textContent) + parseInt(this.currentPool.textContent);

            // Empty pool.
            this.currentPool.textContent = 0;

            // Give a message for winning.
            this.textIdElement.textContent = "Cpu has defeated you in your last hand! Refresh page to play again.";

            // Make the button invisible again.
            this.lastHandButton.style.display = "none";
        }

        else if(playerCardAttack == cpuCardAttack) {
            console.log("EQUAL ATTACK");
            // Get half money from pool.
            let halfMoneyFromPool = parseInt(this.currentPool.textContent) / 2;

            // Add it to both elements.
            this.playerMoneyElement.textContent = parseInt(this.playerMoneyElement.textContent) + halfMoneyFromPool;
            this.cpuMoneyElement.textContent = parseInt(this.cpuMoneyElement.textContent) + halfMoneyFromPool;

            // Empty pool.
            this.currentPool.textContent = 0;

            // Give a message for drawing
            this.textIdElement.textContent = "That was a close one, you've managed a draw.";

            // Make the button invisible again.
            this.lastHandButton.style.display = "none";

            // Must make the refresh hand button reappear as well.
            this.refreshButton.style.display = "block";
        }

        // Call function to push cards back to deck as well as other things.
        this.PostHandCleanUp();
    }

    LastHandForCpu() {
        // First reveal the cpu card.
        this.cpuImageID.setAttribute("src", this.cpu.GetCard().Imgsrc);

        // Show the cpu's card info. 
        this.cpuCardInfoText.textContent = this.cpuCardInfo;

        // No need to check if the cpu is ALLOWED to attack or has changed its state to attack. So begin comparisons of attack points. Get the attacks to start.
        let playerCardAttack = this.playerCard.AttackPoints;
        let cpuCardAttack = this.cpu.GetCard().AttackPoints;

        // Check if cpu actually won this.
        if(cpuCardAttack > playerCardAttack) {
            // If the cpu did win, simply assign the pool value to the players money total.
            this.cpuMoneyElement.textContent = parseInt(this.cpuMoneyElement.textContent) + parseInt(this.currentPool.textContent);

            // Empty pool.
            this.currentPool.textContent = 0;

            // Give a message for avoiding defeat.
            this.textIdElement.textContent = "Cpu has a close call but remains in the game!";

            // Make the button invisible again.
            this.lastHandButton.style.display = "none";

            // Must make the refresh hand button reappear as well.
            this.refreshButton.style.display = "block";
        }
        
        // If the cpu loses.
        else if(playerCardAttack > cpuCardAttack) {
            // Take what's in the pool and give it to the player.
            this.playerMoneyElement.textContent = parseInt(this.playerMoneyElement.textContent) + parseInt(this.currentPool.textContent);

            // Empty pool.
            this.currentPool.textContent = 0;

            // Give a message for winning.
            this.textIdElement.textContent = "You win! You might be a somewhat decent gambler. Refresh page to play again.";

            // Make the button invisible again.
            this.lastHandButton.style.display = "none";
        }

        else if(playerCardAttack == cpuCardAttack) {
            console.log("cpu equal!\n");
            // Get half money from pool.
            let halfMoneyFromPool = parseInt(this.currentPool.textContent) / 2;

            // Add it to both elements.
            this.playerMoneyElement.textContent = parseInt(this.playerMoneyElement.textContent) + halfMoneyFromPool;
            this.cpuMoneyElement.textContent = parseInt(this.cpuMoneyElement.textContent) + halfMoneyFromPool;

            // Empty pool.
            this.currentPool.textContent = 0;

            // Give a message for drawing
            this.textIdElement.textContent = "Cpu had a close call but it's still in the game!";

            // Make the button invisible again.
            this.lastHandButton.style.display = "none";

            // Must make the refresh hand button reappear as well.
            this.refreshButton.style.display = "block";
        }

        // Call function to push cards back to deck as well as other things.
        this.PostHandCleanUp();
    }

    PostHandCleanUp() {
        // Must give the player card back to the deck or stack.
        this.stack.Push(this.playerCard.Name, this.playerCard.AttackPoints, this.playerCard.DefensePoints, this.playerCard.Imgsrc,
            this.playerCard.Level, this.playerCard.Type, this.playerCard.Attribute);
        
        // Same with the cpu card.
        this.stack.Push(this.cpu.GetCard().Name, this.cpu.GetCard().AttackPoints, this.cpu.GetCard().DefensePoints, this.cpu.GetCard().Imgsrc,
            this.cpu.GetCard().Level, this.cpu.GetCard().Type, this.cpu.GetCard().Attribute);
        
        // Set both the player and cpu cards to null.
        this.playerCard = null;
        this.cpu.DeleteCard();

        // For TESTING purposes, print the deck we have in the stack and the cpu's saved deck and see if they match, they must.
        this.stack.PrintDeckInStackForm();
        this.cpu.PrintSavedDeck();

        // Reset current bet and value to bet.
        this.currentBet = 0;
        this.valueToBet = 0;
    }

    // Referenced in FoldHand() function.
    GameOver() {
        // To decide WHO wins, let's check who has hit 0 with their money. 
        let playerMoney = this.playerMoneyElement.textContent;
        let cpuMoney = this.cpuMoneyElement.textContent;
        
        if(playerMoney <= 0) {
            // If it's 0, we simply have to display a losing message.
            this.textIdElement.textContent = "Player LOSES! Thanks for playing. Refresh to play again.";

            // Set all elements to be hidden.
            this.TurnElementsOff();
        }

        else if(cpuMoney <= 0) {
            // Player has beaten the cpu, give winning message.
            this.textIdElement.textContent = "Victory! Congratulations! Refresh to play again.";

            // Set all elements to be hidden.
            this.TurnElementsOff();
        }
    }

    // Referenced in GameOver() function.
    TurnElementsOff() {
        // Now set all elements to none to hide them.
        this.getCardButton.style.display = "none";
        this.raiseBetButton.style.display = "none";
        this.foldButton.style.display = "none";
        this.betSelectors.style.display = "none";
    }
}