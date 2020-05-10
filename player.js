import { Entity } from './entity.js'

// The player will have it's own class to manage its functionality.
export class Player extends Entity {
    constructor() {
        // Call the base classes constructor.
        super("playerCardInfoText", "playerMoney", "playerImage");
    }
}