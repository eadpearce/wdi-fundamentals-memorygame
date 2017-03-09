/*
     __      __  _____  __      __   ____    ____     __  __     ______     ____    __      __  _____
    /  \  .'  / / ___/ /  \  .'  / .' _  '  / __  \  / / / /   .' _____'  .' _  '  /  \  .'  / / ___/
   / /| ' ./ / / /__  / /| ' ./ / / /  / / / /__/ / / /_/ /   / / _____  / /__/ / / /| ' ./ / / /__
  / / |_.'/ / / ___/ / / |_.'/ / / /  / / / __  .'  \   .'   / / /_  _/ /  __  / / / |_.'/ / / ___/
 / /     / / / /__  / /     / / / /__/ / / /  ' '   / /     / /___/ /  / /  / / / /     / / / /__
/_/     /_/ /____/ /_/     /_/  \____.' /_/  /_/   /_/      \_____.'  /_/  /_/ /_/     /_/ /____/

*/

// Fisher-Yates shuffle function from http://stackoverflow.com/a/6274398
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

// save the game board in a variable
var gameBoard = document.querySelector('#game-board');

// make the divs for the cards
var createCards = function() { 
	for (var x = 0; x < 24; x++) {
		newCard = document.createElement('div');
		newCard.className = 'card';
		newCard.id = 'card'+x;
		gameBoard.appendChild(newCard);
	}
};
// call the function
createCards();

// set up card values 
// now using cards from all four suits! 
var cards1 = ['queen-spades','queen-clubs','queen-diamonds','queen-hearts',
	'king-spades','king-clubs','king-diamonds','king-hearts',
	'jack-spades','jack-clubs','jack-diamonds','jack-hearts',];

// make doubles of them - like playing with two decks 
var cards = cards1.concat(cards1);

// shuffle the values in the cards array
shuffle(cards);
// array to compare 2 flipped cards
var cardsInPlay = []; 
var turnsMade = 0; 
document.getElementById('turns').innerText = turnsMade;
// win if correctPairs = 12
var correctPairs = 0; 
document.getElementById('pairs').innerText = correctPairs;
// array to check if same card was clicked twice 
var cardsInPlayID = [];
var cardElement = document.getElementsByClassName('card');
var createBoard = function() {
	for (var i = cards.length-1; i >= 0; i--) {
		// set card-type to those in the cards array
		cardElement[i].setAttribute('card-type', cards[i]);
		cardElement[i].setAttribute('in-play', 'false');
		cardElement[i].setAttribute('correct', 'false');
	}
}
// call the function 
createBoard();

var isTwoCards = function() {

  	// since isTwoCards runs every time we click a card, use this to add to turnsMade value
  	turnsMade++;
  	// and then update the turns div on the page 
  	document.getElementById('turns').innerText = turnsMade;

  	// update the number of correct pairs
  	document.getElementById('pairs').innerText = correctPairs;

	// do the rest of this code UNLESS the card clicked is already in a flipped matching pair (correct=true)
	if (this.getAttribute('correct') === 'false') {

		// change cards' in-play attribute to true 
	  	this.setAttribute('in-play','true');

	  	// add card-type to cardsInPlay array 
	  	cardsInPlay.push(this.getAttribute('card-type'));

	  	// adds the unique card ID to cardsInPlayID array
	  	cardsInPlayID.push(this.getAttribute('id')); 

	  	// check cardsInPlayID to see if player clicked same card twice then flip card back over
	  	if (cardsInPlayID.length === 2 && cardsInPlayID[0] === cardsInPlayID[1]) {
			flipCards(); } 

		// otherwise do this
		else {
		  // show image when clicked depending on card type 
		  	if (this.getAttribute('card-type') === 'king-hearts') {
		  		this.innerHTML = '<img src="images/king-hearts.png" width="150" alt="King of Hearts"/>';
		  	} else if (this.getAttribute('card-type') === 'king-diamonds') {
		  		this.innerHTML = '<img src="images/king-diamonds.png" width="150" alt="King of Diamonds"/>';
		  	} else if (this.getAttribute('card-type') === 'king-clubs') {
		  		this.innerHTML = '<img src="images/king-clubs.png" width="150" alt="King of Clubs"/>';
		  	} else if (this.getAttribute('card-type') === 'king-spades') {
		  		this.innerHTML = '<img src="images/king-spades.png" width="150" alt="King of Spades"/>';
		  	} else if (this.getAttribute('card-type') === 'queen-hearts') {  	
		  		this.innerHTML = '<img src="images/queen-hearts.png" width ="150" alt="Queen of Hearts"/>';
		  	} else if (this.getAttribute('card-type') === 'queen-diamonds') {  	
		  		this.innerHTML = '<img src="images/queen-diamonds.png" width ="150" alt="Queen of Diamonds"/>';
		  	} else if (this.getAttribute('card-type') === 'queen-clubs') {  	
		  		this.innerHTML = '<img src="images/queen-clubs.png" width ="150" alt="Queen of Clubs"/>';
		  	} else if (this.getAttribute('card-type') === 'queen-spades') {  	
		  		this.innerHTML = '<img src="images/queen-spades.png" width ="150" alt="Queen of Spades"/>';
		  	} else if (this.getAttribute('card-type') === 'jack-hearts') {  	
		  		this.innerHTML = '<img src="images/jack-hearts.png" width ="150" alt="Jack of Hearts"/>';
		  	} else if (this.getAttribute('card-type') === 'jack-diamonds') {  	
		  		this.innerHTML = '<img src="images/jack-diamonds.png" width ="150" alt="Jack of Diamonds"/>';
		  	} else if (this.getAttribute('card-type') === 'jack-clubs') {  	
		  		this.innerHTML = '<img src="images/jack-clubs.png" width ="150" alt="Jack of Clubs"/>';
		  	} else if (this.getAttribute('card-type') === 'jack-spades') {  	
		  		this.innerHTML = '<img src="images/jack-spades.png" width ="150" alt="Jack of Spades"/>';
		  	}
		  	// run the isMatch function to check for a match 
		  	isMatch();
		}
	}
}

var isMatch = function() {

// if you have two cards in play, check for a match in the cardsInPlay array
  	if (cardsInPlay.length === 2) {

		// if there is a match between the two in-play cards ...
		if (cardsInPlay[0] === cardsInPlay[1]) {
			// add 1 to the correct pairs counter ...
			correctPairs++;
			document.getElementById('pairs').innerText = correctPairs;
			// and check for a win ...
			if (correctPairs === 12) {
				document.getElementById('win').innerText = "You win!";
				document.querySelector('button').innerText = "Play again"
			}
			// then set the matched cards' in-play attributes to false so they can't be flipped back
			for (var i = cardElement.length-1; i >=0; i--) {
				if (cardElement[i].getAttribute('in-play')==='true') {
				cardElement[i].setAttribute('in-play','false');
				cardElement[i].setAttribute('correct','true');
				}
			}

		// if there isn't a match:
		} else { 
			// wait .5 sec then flip wrong cards back 
			// BUG: if player clicks another card before timer has run out the in-play value will not reset
			setTimeout(flipCards, 500);
		}
	    // clear cards in play arrays for your next try
	    cardsInPlayID = [];
	    cardsInPlay = [];
  	}
}

// add the event listener for each card 
// when a card is clicked the function isTwoCards will be executed
for (var i=0; i<cards.length; i++) {
	// will only run the function if the card clicked is NOT already part of a matching pair
    if (cardElement[i].getAttribute('correct') === 'false') {
    	cardElement[i].addEventListener('click', isTwoCards); 
    }
}

// reset button - function to clear the board and shuffle the cards for another try
var clearAllCards = function() {
	for (var i = cardElement.length-1; i >=0; i--) {
		cardElement[i].innerHTML = '';
	}
	shuffle(cards);
	createBoard();
	cardsInPlay =[];
	turnsMade = 0;
  	document.getElementById('turns').innerText = turnsMade;
	correctPairs = 0;
  	document.getElementById('pairs').innerText = correctPairs;
	document.getElementById('win').innerText = "";

}

// flip a non-matching pair back over 
var flipCards = function() {
	for (var i = cardElement.length-1; i >=0; i--) {
		if (cardElement[i].getAttribute('in-play') === 'true') {
			cardElement[i].setAttribute('in-play','false');
			cardElement[i].innerHTML = '';
			// clear cards in play
	    	cardsInPlayID = [];
	    	cardsInPlay = [];
		}
	}
}
