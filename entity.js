/* This entity class will be the base class to both our player and cpu classes. They both share similiar things such as
Cards, */

export class Entity {
    constructor(cardInfoTextElement, moneyElement, imageID) {
        // Initialize to null since it doesn't have a card yet.
        this.card = null;

        // Save the element on screen which will hold the card info text and set it to empty.
        this.cardInfoText = document.getElementById(cardInfoTextElement);
        this.cardInfoText.textContent = "";

        // Save the image element as well.
        this.imageID = document.getElementById(imageID);

        // Save a card info variable to have the monster name, attack, defense, on hand.
        this.cardInfo = "";

        // Save element containing money to manage funds.
        this.moneyElement = document.getElementById(moneyElement);

        // Why is this needed? Example, after we raise bet, we could end up betting the last money the player has. 
        this.gameOverCheck = false;
    }
    

    // Use setters and getters for the cpus simple interface. The first 2 functions will help the card info text element on screen show the card info.
    SetCardInfoText(text) { 
        this.cardInfoText.textContent = text;
    }

    GetCardInfoText() {
        return this.cardInfoText;
    }


    
    // This function sets the image id on screen so we can see the card via a spread operator thanks to es6.
    SetImageID(...imageData) {
        this.imageID.setAttribute(imageData[0], imageData[1]);
    }



    // These next three actually HOLD the card info. The monster name, attack, etc.
    SetCardInfo(text) { 
        this.cardInfo = text;
    }

    AddToCardInfo(text) {
        this.cardInfo += text;
    }

    GetCardInfo() {
        return this.cardInfo;
    }



    // These next four are for the use of cards.
    SetCard(card) {
        this.card = card;
        // this.PrintCard();
    }

    GetCard() {
        return this.card;
    }

    DeleteCard() {
        this.card = null;
    }

    // Test function to display card.
    PrintCard() {
        console.log("Card " + this.card.Name + " " + this.card.AttackPoints + " " + this.card.DefensePoints + " " + this.card.Imgsrc + " "
            + this.card.Level + " " + this.card.Rank + " " + this.card.Type + " " + this.card.Attribute);
    }




    // The next 3 are vital since the game pretty much functions are money and gambling.
    IncreaseMoneyElement(value) {
        this.moneyElement.textContent = parseInt(this.moneyElement.textContent) + parseInt(value);
    }


    DecreaseMoneyElement(value) {
        this.moneyElement.textContent = parseInt(this.moneyElement.textContent) - parseInt(value);
    }


    GetMoneyElement() {
        return this.moneyElement;
    }



    // The next 2 are probably the most vital because they help the losing functionality.
    SetGameOverCheck(value) {
        this.gameOverCheck = value;
    }

    GetGameOverCheck() { 
        return this.gameOverCheck;
    }
}