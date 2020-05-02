/* State Pattern

This state pattern for the cpu is necessary because it assists in processing who wins a hand. Ex: If the player has a Dark Magician (2500 attack)
and the cpu has a Curse of Dragon (2000) attack, the cpu will process that the Curse of Dragon isn't bad and will go for it. It will raise the bet. But
it'll still come up losing. So in the GetResult() function in CardManager, we can reference this state system. The cpu has to see if it decided to go for it 
or not and take money if it indeed did. */
export class Context {
    constructor() {
        // Set an array of states up to begin.
        this.states = [new Allow(), new Deny()];

        // Set a default state.
        this.currentState = this.states[0];
    }

    // Specific state request change.
    ChangeStateToAllow() {
        // Check if it's allow already.
        if(this.currentState == this.states[0]) {
            // If so, job done, return early.
            return;
        }

        // If not, set it to allow.
        this.currentState = this.states[0];
    }

    // Specific state request change.
    ChangeStateToDeny() {
        // Check if it's deny already.
        if(this.currentState == this.states[1]) {
            // If so, job done, return early.
            return;
        }

        // If not, set it to deny.
        this.currentState = this.states[1];
    }

    // Return the current states value.
    CanAllow() {
        return this.currentState.CanAllow();
    }
}

// Base class for state pattern.
class Participate {
    constructor(canAllow) {
        this.canAllow = canAllow;
    }
}

// Dervived classes inheriting from the base class.
class Allow extends Participate {
    constructor() {
        // Pass in true because this class obviously will let the cpu take part in the gamble.
        super(true);
    }

    // Function to call to check state.
    CanAllow() {
        return this.canAllow;
    }
}

class Deny extends Participate {
    constructor() {
        // Pass in false because cpu won't take part in the gamble.
        super(false);
    }

    // Function to call to check state.
    CanAllow() {
        return this.canAllow;
    }
}