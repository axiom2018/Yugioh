// Declare a class.
class Card 
{
    constructor(cardName, attackPoints, defensePoints) {
        // Set the cards name, attack, and defense points in constructor.
        this.nameOfCard = cardName;
        this.attackPointsOfCard = attackPoints;
        this.defensePointsOfCard = defensePoints;
    }

    ShowName() {
        console.log("Card name: " + this.nameOfCard);
    }

    ShowAttackPoints() {
        console.log("Attack points: " + this.attackPointsOfCard);
    }

    ShowDefensePoints() {
        console.log("Defense points: " + this.defensePointsOfCard);
    }

    ShowInfo() {
        console.log(this.nameOfCard + " has " + this.attackPointsOfCard + " attack points and " + this.defensePointsOfCard + " defense points.");
    }
}

class DarkMagician extends Card
{
    constructor() {
        // The super method below makes us call base class constructor.
        super("Dark Magician", 2500, 2100);
    }

    Attack() {
        console.log(this.nameOfCard + " has attacked with " + this.attackPointsOfCard + " attack points!");
    }
}

// Declare dark magician object.
myDarkMagician = new DarkMagician;

// Attack.
myDarkMagician.Attack();