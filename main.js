// The main.js will import other scripts.
import { CardManager } from './cardmanager.js'
import { Cpu } from './cpu.js'
import { Context } from './statecontext.js'
import { DeckStack } from './deckstack.js'

// Initialize the card manager with cpu. Cpu needs state system to function as well so we provide it just that.
const cm = new CardManager(new Cpu(new Context), new DeckStack);

// Save the elements or get the id's of all the buttons in index.html.
cm.SaveElements();

/* The old method of properly calling the right functions when we pressed a button, had us (inside the index.html file), reference a cardmanager object in
cardmanager.js. But since we're clearly using es6 and decided to start the code here in main.js, we won't be able to just call the cardmanager.js script 
in index.html simply by referencing it such as: "<script src="cardmanager.js"> </script>" and have it initialize the old object at the bottom that was: 
"myCardManager = new CardManager;" and then reference it in index.html. Here we'll use javascript to assign the buttons functions to carry out. */
cm.ApplyFunctions();
