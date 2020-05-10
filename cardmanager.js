// Main card manager class.
export class CardManager {
    constructor(player, cpu, deckstack) {
        // Save the player to start, then the elements.
        this.player = player;

        // Save the cpu, then the elements for cpu and give the deck as well.
        this.cpu = cpu;
        this.cpu.SaveElements();

        // Initially set to false, because when user first arrives to the page, they haven't dueled at all.
        this.duelBegun = false;

        // Set an empty array to hold the card objects later.
        this.deck = [];

        // Save the stack.
        this.stack = deckstack;

        // Set the pay-to-play bet requirement when the player wants a card to begin a round.
        this.cost = 50;

        // This will hold the mandatory bet of 50 from both sides when player gets a card.
        this.currentBet = 0;

        // Save the value to bet as a variable in the class. The cpu MUST know about this number to know what it must match to keep playing.
        this.valueToBet = 0;

        /* When the last hand button is displayed that means either the player or cpu is about to lose. But both of their
        functionalities differ regarding the message displayed on screen and other things. So we'll have a function in
        this variable to use when ready. */
        this.lastHandFunction = null;

        // Test variable.
        this.testClassObj = null;
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
        // this.cpuMoneyElement = document.getElementById("cpuMoney");

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

        // Get the deck text and deck selectors here.
        this.deckChoiceText = document.getElementById("deckChoicesText");
        this.deckSelectors = document.getElementById("choiceOfDeck");
    }

    // Add the functions to buttons.
    ApplyFunctions() {
        // Ready the self variable for later use.
        var self = this;

        // Add the function ToggleDuelState to the duel button to start the duel, then the GivePlayerACard function to the get card button, etc.
        this.duelButton.addEventListener("click", function(){ self.ToggleDuelState(); })
        this.getCardButton.addEventListener("click", function(){ self.GivePlayerACard(); })
        this.raiseBetButton.addEventListener("click", function(){ self.RaiseBet(); })
        this.foldButton.addEventListener("click", function(){ self.FoldHand(); })
        this.getResultButton.addEventListener("click", function(){ self.GetResult(); })
        this.refreshButton.addEventListener("click", function(){ self.Refresh(); })
        this.lastHandButton.addEventListener("click", function(){ self.lastHandFunction(); })
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

        // Now just hide the deck choice text and deck selectors text.
        this.deckChoiceText.style.display = "none";
        this.deckSelectors.style.display = "none";
        
        // Call the stack and let it use the factory for the deck we've selected.
        this.stack.LoadDeck(this.deckSelectors.selectedIndex);

        // Set the deck for the cpu.
        this.cpu.SetDeck(this.stack.GetDeck());
    }

    // When player isn't confident in the card and doesn't want to risk losing more money.
    FoldHand() {
        // Update text to show they folded the hand!
        this.textIdElement.textContent = "Hand lost due to fold. Get another card to try again!";

        // Set player card into text to empty.
        this.player.SetCardInfoText("");

        // Since the PLAYER gives up. The current bet money goes to cpu.
        this.cpu.GetMoneyElement().textContent = parseInt(this.cpu.GetMoneyElement().textContent) + parseInt(this.currentBet);

        // Set the current bet to be 0 now since this hand is over.
        this.currentBet = 0;

        // Same with the current pool text.
        this.currentPool.textContent = 0;

        // We must be sure to place the cards BACK in the stack.
        this.stack.Push(this.player.GetCard().Name, this.player.GetCard().AttackPoints, this.player.GetCard().DefensePoints, this.player.GetCard().Imgsrc,
            this.player.GetCard().Level, this.player.GetCard().Rank, this.player.GetCard().Link, this.player.GetCard().Type, this.player.GetCard().Attribute);

        this.stack.Push(this.cpu.GetCard().Name, this.cpu.GetCard().AttackPoints, this.cpu.GetCard().DefensePoints, this.cpu.GetCard().Imgsrc,
            this.cpu.GetCard().Level, this.cpu.GetCard().Rank, this.cpu.GetCard().Link, this.cpu.GetCard().Type, this.cpu.GetCard().Attribute);

        // Set these temporary card variables back to null.
        this.player.DeleteCard();
        this.cpu.DeleteCard();

        // Also the image source for the player card must be changed back to the default.
        this.player.SetImageID("src", "images/cardback.png");

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
        if(parseInt(this.valueToBet) > this.cpu.GetMoneyElement().textContent) {
            // Save cpu money in variable.
            let cpuMoney = parseInt(this.cpu.GetMoneyElement().textContent);

            // Now set the value to 0 since the value player BET is more than the cpu really HAS.
            this.cpu.GetMoneyElement().textContent = 0;

            // Return remaining cpu money to be used in get result to know how much to add to pool.
            return cpuMoney;
        }

        // If the value isn't greater, and cpu can MATCH the bet, apply the bet to it then.
        else 
        {
            // Subtract the value to bet FROM the cpus money. 
            this.cpu.GetMoneyElement().textContent = parseInt(this.cpu.GetMoneyElement().textContent) - this.valueToBet;
        }

        // Return the value to bet because cpu was able to match it.
        return this.valueToBet;
    }

    // The final function called to resolve the bets placed.
    HandleResult(moneyElementOne, moneyElementTwo, firstMessage, secondMessage, attacksEqual = false) {
        // Can the cpu attack?
        if(this.cpu.GetState().CanAllow()) {
            // If so, display cpu card if player goes for it.
            this.cpu.SetImageID("src", this.cpu.GetCard().Imgsrc);
            
            // Add the money to the pool.
            this.currentPool.textContent = parseInt(this.currentPool.textContent) + parseInt(this.HandleCpuMoney()); 

            // Display the given attack message.
            this.textIdElement.textContent = firstMessage;

            // Show the cpu's card info. 
            this.cpu.SetCardInfoText(this.cpu.GetCardInfo());

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
        let playerCardAttack = this.player.GetCard().AttackPoints; 

        // Now the cpu card attack.
        let cpuCardAttack = this.cpu.GetCard().AttackPoints;

        // Use if statements to check who wins this hand.
        if(playerCardAttack > cpuCardAttack) {
            // Call to handle the rest. this.playerMoneyElement for both.
            this.HandleResult(this.player.GetMoneyElement(), this.player.GetMoneyElement(), 
                "You win! Cpu card not strong enough, hit refresh button to play again!",
                "You win! Cpu folds, hit refresh button to play again!");
        }

        else if(cpuCardAttack > playerCardAttack) {
            this.HandleResult(this.cpu.GetMoneyElement(), this.player.GetMoneyElement(), 
                "Cpu has beaten you, hit refresh button to play again!",
                "You win! Cpu folds, hit refresh button to play again!");
        }

        else {
            this.HandleResult(this.cpu.GetMoneyElement(), this.player.GetMoneyElement(), 
                "Draw! Both monsters have same attack! And cpu attacked.",
                "Draw! Both monsters have same attack! And cpu did NOT attack.", true);
        }

        // Now just empty the current pool.
        this.currentPool.textContent = 0;

        // Resets the cards, and the bets.
        this.PostHandCleanUp();

        console.log("Player game over value is " + this.player.GetGameOverCheck());
        console.log("Cpu game over value is " + this.cpu.GetGameOverCheck());

        // Check for playerGameOverCheck ig it's true, if so, the player MIGHT have lost. Changed PME here too, accessed text content. goc
        if(this.player.GetGameOverCheck() && (parseInt(this.player.GetMoneyElement().textContent)) <= 0) {
            console.log("Player loses! Game over!\n");
            this.textIdElement.textContent = "Bro you LOST bro. You're looking weak out here. Refresh the page and try again!";
            this.getResultButton.style.display = "none";
            return;
        }

        // Check for playerGameOverCheck ig it's true, if so, the player MIGHT have lost.
        if(this.cpu.GetGameOverCheck() && (parseInt(this.cpu.GetMoneyElement().textContent)) <= 0) {
            console.log("Cpu loses! Game over!\n");
            this.textIdElement.textContent = "Victory! Celebrate your Yugioh abilities with a beer. Refresh the page to play again.";
            this.getResultButton.style.display = "none";
            return;
        }

        // The game over checks could have been true, but the player or cpu didn't actually lose, so set them back to false.
        this.player.SetGameOverCheck(false);
        this.cpu.SetGameOverCheck(false);

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
        this.player.SetCardInfoText("");
        this.cpu.SetCardInfoText("");

        // Since the cards are back in the deck, set both image sources back to the default states.
        this.player.SetImageID("src", "images/cardback.png");
        this.cpu.SetImageID("src", "images/cardback.png");
    
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
        this.player.SetCardInfo(this.player.GetCardInfoText().textContent);
        this.player.SetCardInfo(this.player.GetCard().Name + "\n");

        /* This is where we distinguish between normal cards with levels and xyz monsters with ranks. By default, if a card has a level, it will be assigned 0
        rank. So check if rank is 0, if so, it has a level. If rank is not 0, card doesn't have a level, BUT a rank. */
        if(this.player.GetCard().Rank > 0) {
            this.player.AddToCardInfo(this.player.GetCard().Rank + " rank\n");
        }

        else if(this.player.GetCard().Level > 0) {
            this.player.AddToCardInfo(this.player.GetCard().Level + " *\n");
        }

        // Check with an else statement if BOTH are 0, if that's true, it is a link monster which has neither level nor rank, but a link condition.

        this.player.AddToCardInfo("Attack: " + this.player.GetCard().AttackPoints + "\n");

        // Also remember link monsters have no defense points. Prepare for that as well.
        if(this.player.GetCard().Link > 0) {
            this.player.AddToCardInfo("LINK - " + this.player.GetCard().Link + "\n");
        } 

        // If it's not, it has defense points instead.
        else {
            this.player.AddToCardInfo("Defense: " + this.player.GetCard().DefensePoints + "\n");
        }

        this.player.AddToCardInfo("Type: " + this.player.GetCard().Type + "\n");
        this.player.AddToCardInfo("Attribute: " + this.player.GetCard().Attribute + "\n");
    


        // this.cpu.SetCardInfoText(this.cpu.GetCardInfo());
        this.cpu.SetCardInfo(this.cpu.GetCardInfoText()); // .cpuCardInfoText.textContent
        this.cpu.SetCardInfo(this.cpu.GetCard().Name + "\n");

        // Do the same for the cpu card.
        if(this.cpu.GetCard().Rank > 0) {
            this.cpu.AddToCardInfo(this.cpu.GetCard().Rank + " rank\n");
        }

        else if(this.cpu.GetCard().Level > 0) {
            this.cpu.AddToCardInfo(this.cpu.GetCard().Level + " *\n");
        }

        this.cpu.AddToCardInfo("Attack: " + this.cpu.GetCard().AttackPoints + "\n");

        // Apply link as well.
        if(this.cpu.GetCard().Link > 0) {
            this.cpu.AddToCardInfo("LINK - " + this.cpu.GetCard().Link + "\n");
        }

        else {
            this.cpu.AddToCardInfo("Defense: " + this.cpu.GetCard().DefensePoints + "\n");
        }

        this.cpu.AddToCardInfo("Type: " + this.cpu.GetCard().Type + "\n");
        this.cpu.AddToCardInfo("Attribute: " + this.cpu.GetCard().Attribute + "\n");
    }

    GivePlayerACard() {
        // Simple clear for testing.
        console.clear();

        // Get a card from the stack for player. 
        this.player.SetCard(this.stack.Pop());

        // Then one for cpu. Save the card first, do NOT display it.
        this.cpu.SetCard(this.stack.Pop());

        // Get the card details and display all of them in the players space to the left hand side, and the cpus right side.
        this.PrepareCardInfo();

        // Show the player card info on screen since its card is displayed.
        this.player.SetCardInfoText(this.player.GetCardInfo());

        // Set the player zone to it's card.
        this.player.SetImageID("src", this.player.GetCard().Imgsrc); 

        // Then just shuffle and print the deck.
        console.log("\n\n");
        this.stack.Shuffle();
        this.stack.PrintDeckInStackForm();

        // Finally since we give out a card, we must decrement money from the player and cpu. 
        let playerMoney = this.player.GetMoneyElement().textContent - this.cost;
        let cpuMoney = this.cpu.GetMoneyElement().textContent - this.cost;

        // EVERY time we get a card, we know for a fact 50 will be taken from both competitors.
        this.currentBet = this.cost * 2;
        console.log("Current bet: " + this.currentBet);

        // We have the current bet ready, and that's the value we display in the pool, so lets do that.
        this.currentPool.textContent = parseInt(this.currentPool.textContent) + parseInt(this.currentBet);

        // Then set it on screen.
        this.player.GetMoneyElement().textContent = playerMoney;
        this.cpu.GetMoneyElement().textContent = cpuMoney;

        console.log("Players current money is " + parseInt(this.player.GetMoneyElement().textContent));
        console.log("Cpus current money is " + parseInt(this.cpu.GetMoneyElement()));

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
        if(parseInt(this.valueToBet) > this.player.GetMoneyElement().textContent) {
            // If we can't, return.
            return;
        }

        // Subtract the value to bet FROM the players money.
        this.player.DecreaseMoneyElement(this.valueToBet);

        // Add the money to the pool.
        this.currentPool.textContent = parseInt(this.currentPool.textContent) + parseInt(this.valueToBet);

        // Next let the cpu decide if it wants to take the bet or fold.
        this.cpu.RaiseOrFold(this.valueToBet);

        // Check if player money is 0. PME
        if(parseInt(this.player.GetMoneyElement().textContent) <= 0) {
            // Set the boolean to true so when hand is done, it checks to see if player lost.
            this.player.SetGameOverCheck(true);
            console.log("Player this is your LAST bet. Value is " + this.player.GetGameOverCheck());
        }

        // Check if cpu money is 0. 
        if(parseInt(this.valueToBet) >= parseInt(this.cpu.GetMoneyElement().textContent)) {
            // Set the boolean to true so when hand is done, it checks to see if cpu lost.
            this.cpu.SetGameOverCheck(true);
            console.log("Cpu this is your last bet. Value is " + this.cpu.GetGameOverCheck());
        }
    }

    // Execute Last Hand functionality if player or cpu might lose.
    LastHandFunctionality() {
        // Call the function saved.
        this.lastHandFunction();
    }

    // If the player has $50 left, but can still place a bet, this is their last hand. Be prepared for that case! 
    LastHandForPlayer() {
        // First reveal the cpu card.
        this.cpu.SetImageID("src", this.cpu.GetCard().Imgsrc);

        // Show the cpu's card info. 
        this.cpu.SetCardInfoText(this.cpu.GetCardInfo());

        // No need to check if the cpu is ALLOWED to attack or has changed its state to attack. So begin comparisons of attack points. Get the attacks to start. pc
        let playerCardAttack = this.player.GetCard().AttackPoints; 
        let cpuCardAttack = this.cpu.GetCard().AttackPoints;

        // Check if player actually won this.
        if(playerCardAttack > cpuCardAttack) {
            // If the player did win, simply assign the pool value to the players money total. 
            this.player.IncreaseMoneyElement(this.currentPool.textContent);

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
            this.cpu.GetMoneyElement().textContent = parseInt(this.cpu.GetMoneyElement().textContent) + parseInt(this.currentPool.textContent);

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
            this.player.IncreaseMoneyElement(halfMoneyFromPool);
            this.cpu.GetMoneyElement().textContent = parseInt(this.cpu.GetMoneyElement().textContent) + halfMoneyFromPool;

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
        this.cpu.SetImageID("src", this.cpu.GetCard().Imgsrc);

        // Show the cpu's card info. 
        this.cpu.SetCardInfoText(this.cpu.GetCardInfo());

        // No need to check if the cpu is ALLOWED to attack or has changed its state to attack. So begin comparisons of attack points. Get the attacks to start. 
        let playerCardAttack = this.player.GetCard().AttackPoints; 
        let cpuCardAttack = this.cpu.GetCard().AttackPoints;

        // Check if cpu actually won this.
        if(cpuCardAttack > playerCardAttack) {
            // If the cpu did win, simply assign the pool value to the players money total.
            this.cpu.GetMoneyElement().textContent = parseInt(this.cpu.GetMoneyElement().textContent) + parseInt(this.currentPool.textContent);

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
            this.player.IncreaseMoneyElement(this.currentPool.textContent);

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
            this.player.IncreaseMoneyElement(halfMoneyFromPool);
            this.cpu.GetMoneyElement().textContent = parseInt(this.cpu.GetMoneyElement().textContent) + halfMoneyFromPool;

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
        // Must give the player card back to the deck or stack. pc
        this.stack.Push(this.player.GetCard().Name, this.player.GetCard().AttackPoints, this.player.GetCard().DefensePoints, this.player.GetCard().Imgsrc,
            this.player.GetCard().Level, this.player.GetCard().Rank, this.player.GetCard().Link, this.player.GetCard().Type, this.player.GetCard().Attribute);
        
        // Same with the cpu card.
        this.stack.Push(this.cpu.GetCard().Name, this.cpu.GetCard().AttackPoints, this.cpu.GetCard().DefensePoints, this.cpu.GetCard().Imgsrc,
            this.cpu.GetCard().Level, this.cpu.GetCard().Rank, this.cpu.GetCard().Link, this.cpu.GetCard().Type, this.cpu.GetCard().Attribute);
        
        // Set both the player and cpu cards to null. 
        this.player.DeleteCard();
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
        // To decide WHO wins, let's check who has hit 0 with their money. z pme
        let playerMoney = this.player.GetMoneyElement().textContent;
        let cpuMoney = this.cpu.GetMoneyElement().textContent; // cpuMoneyElement.textContent;
        
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