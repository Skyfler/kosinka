(function() {
	
	'use strict';

	var cards = [
		{
			name: '2',
			colour: 'spades',
			weight: 2
		},
		{
			name: '3',
			colour: 'spades',
			weight: 3
		},
		{
			name: '4',
			colour: 'spades',
			weight: 4
		},
		{
			name: '5',
			colour: 'spades',
			weight: 5
		},
		{
			name: '6',
			colour: 'spades',
			weight: 6
		},
		{
			name: '7',
			colour: 'spades',
			weight: 7
		},
		{
			name: '8',
			colour: 'spades',
			weight: 8
		},
		{
			name: '9',
			colour: 'spades',
			weight: 9
		},
		{
			name: '10',
			colour: 'spades',
			weight: 10
		},
		{
			name: 'jack',
			colour: 'spades',
			weight: 11
		},
		{
			name: 'queen',
			colour: 'spades',
			weight: 12
		},
		{
			name: 'king',
			colour: 'spades',
			weight: 13
		},
		{
			name: 'ace',
			colour: 'spades',
			weight: 1
		},
		{
			name: '2',
			colour: 'hearts',
			weight: 2
		},
		{
			name: '3',
			colour: 'hearts',
			weight: 3
		},
		{
			name: '4',
			colour: 'hearts',
			weight: 4
		},
		{
			name: '5',
			colour: 'hearts',
			weight: 5
		},
		{
			name: '6',
			colour: 'hearts',
			weight: 6
		},
		{
			name: '7',
			colour: 'hearts',
			weight: 7
		},
		{
			name: '8',
			colour: 'hearts',
			weight: 8
		},
		{
			name: '9',
			colour: 'hearts',
			weight: 9
		},
		{
			name: '10',
			colour: 'hearts',
			weight: 10
		},
		{
			name: 'jack',
			colour: 'hearts',
			weight: 11
		},
		{
			name: 'queen',
			colour: 'hearts',
			weight: 12
		},
		{
			name: 'king',
			colour: 'hearts',
			weight: 13
		},
		{
			name: 'ace',
			colour: 'hearts',
			weight: 1
		},
		{
			name: '2',
			colour: 'clubs',
			weight: 2
		},
		{
			name: '3',
			colour: 'clubs',
			weight: 3
		},
		{
			name: '4',
			colour: 'clubs',
			weight: 4
		},
		{
			name: '5',
			colour: 'clubs',
			weight: 5
		},
		{
			name: '6',
			colour: 'clubs',
			weight: 6
		},
		{
			name: '7',
			colour: 'clubs',
			weight: 7
		},
		{
			name: '8',
			colour: 'clubs',
			weight: 8
		},
		{
			name: '9',
			colour: 'clubs',
			weight: 9
		},
		{
			name: '10',
			colour: 'clubs',
			weight: 10
		},
		{
			name: 'jack',
			colour: 'clubs',
			weight: 11
		},
		{
			name: 'queen',
			colour: 'clubs',
			weight: 12
		},
		{
			name: 'king',
			colour: 'clubs',
			weight: 13
		},
		{
			name: 'ace',
			colour: 'clubs',
			weight: 1
		},
		{
			name: '2',
			colour: 'diamonds',
			weight: 2
		},
		{
			name: '3',
			colour: 'diamonds',
			weight: 3
		},
		{
			name: '4',
			colour: 'diamonds',
			weight: 4
		},
		{
			name: '5',
			colour: 'diamonds',
			weight: 5
		},
		{
			name: '6',
			colour: 'diamonds',
			weight: 6
		},
		{
			name: '7',
			colour: 'diamonds',
			weight: 7
		},
		{
			name: '8',
			colour: 'diamonds',
			weight: 8
		},
		{
			name: '9',
			colour: 'diamonds',
			weight: 9
		},
		{
			name: '10',
			colour: 'diamonds',
			weight: 10
		},
		{
			name: 'jack',
			colour: 'diamonds',
			weight: 11
		},
		{
			name: 'queen',
			colour: 'diamonds',
			weight: 12
		},
		{
			name: 'king',
			colour: 'diamonds',
			weight: 13
		},
		{
			name: 'ace',
			colour: 'diamonds',
			weight: 1
		}
	]

	var dropfields = [];

	var mouseLeftDown = false;
	var mouseDownCordsX = 0;
	var mouseDownCordsY = 0;
	var dragCardsElems = [];
	var dragCardsElemsCoords = [];
	var gameEnd;
	var closedDeck;
	var openedDeck;

	var container = document.querySelector('[data-component="solitaireContainer"]');

	var newGameBtn = container.querySelector('[data-component="newGameBtn"]');

	initPage();

	function initPage() {
		
		createDropfields();
		createCardElems();
		
		container.addEventListener('mousedown', mouseDownTrue);
		container.addEventListener('mousedown', flipCardOnClosedDeck);
		container.addEventListener('mousedown', openCardOnClick);
		container.addEventListener('contextmenu', autoCollectDecks);
		container.addEventListener('mouseup', mouseDownFalse);
		container.addEventListener('mousemove', dragCard);
		newGameBtn.addEventListener('click',startNewGame);
		
		startNewGame();
		
	}
	
	function startNewGame() {
		
		gameEnd = false;
		randomizeCards();
		
	}
	
	function autoCollectDecks(e) {
		
		if (gameEnd) {
			return;
		}
		
		e.preventDefault();
		
		var finalDropdileds = [];
		var tempDropfields = [];
		
		for (var i = 0; i < dropfields.length; i++) {
			
			switch (dropfields[i].type) {
				case 'temp':
				case 'openedDeck':
					tempDropfields.push(dropfields[i]);
					break;
				case 'final':
					finalDropdileds.push(dropfields[i]);
					break;
			}
			
		}
		
		for (var i = 0; i < finalDropdileds.length; i++) {
			for (var j = 0; j < tempDropfields.length; j++) {
				
				var lastCard = tempDropfields[j].cardsOnTop[tempDropfields[j].cardsOnTop.length - 1];

				if (lastCard) {
					if ((dropRuleCheck(lastCard, finalDropdileds[i]))&&(lastCard.visibility != 'closed')) {
						
						placeCard(lastCard,  finalDropdileds[i]);
						if (isWin()) {
							return;
						}
						i = 0;
						j = -1;
						
					}
				}
				
			}
		}
		
	}


	function createDropfields() {
		
		for (var i = 0; i < 13; i++) {
			
			var dropzone = document.createElement('div');
			dropzone.dataset.component = 'dropzone';
			dropzone.style.zIndex = 0;
			container.appendChild(dropzone);
			dropfields[i] = {elem: dropzone, cardsOnTop: []};
			
			if (i < 4) {
				dropzone.style.top = '40px';
				dropzone.style.left = container.offsetWidth - (dropzone.offsetWidth * (i + 1))  - (15 * (i + 1)) + 'px';
				dropfields[i].type = 'final';
			} else if (i < 11) {
				dropzone.style.top = '300px';
				dropzone.style.left = (container.offsetWidth / 7) * (i - 3) - ((container.offsetWidth / 7) / 2) - (dropzone.offsetWidth / 2) + 'px';
				dropfields[i].type = 'temp';
			} else if (i < 12) {
				dropzone.style.top = '40px';
				dropzone.style.left = '15px';
				dropfields[i].type = 'closedDeck';
				
				closedDeck = dropfields[i];
			} else {
				dropzone.style.top = '40px';
				dropzone.style.left = dropzone.offsetWidth + 30 + 'px';
				dropfields[i].type = 'openedDeck';
				
				openedDeck = dropfields[i];
			}
			
		}
		
	}


	function createCardElems() {
		
		for (var i = 0; i < cards.length; i++) {
			
			var card = document.createElement('div');
			
			card.dataset.component = 'card';
			card.style.left = '0px';
			card.style.top = '0px';
			card.style.zIndex = 1;

			cards[i].elem = card;
			
			container.appendChild(card);
		}
		
	}

	function isWin() {
		
		for (var i = 0; i < dropfields.length; i ++) {
			if ((dropfields[i].type == 'final')&&(dropfields[i].cardsOnTop.length < 13)) {
				return false;
			}
		}
		
		gameEnd = true;
		alert('Вы выйграли!');
		return true;
		
	}

	function randomizeCards() {
		
		var tempCards = cards.slice(0);
		
		for (var i = 0; i < cards.length; i++) {
			cards[i].placedOn = false;
			closeCard(cards[i]);
		}

		var j = 1;
		for (var i = 0; i < dropfields.length; i++) {
			
			dropfields[i].cardsOnTop = [];
			
			if (dropfields[i].type == 'temp') {
				
				while (dropfields[i].cardsOnTop.length < j) {
					var randomCardIndex = getRandomInt(0, tempCards.length - 1);
					placeCard(tempCards[randomCardIndex], dropfields[i]);
					tempCards.splice(randomCardIndex, 1);
				}
				
				openCard(dropfields[i].cardsOnTop[dropfields[i].cardsOnTop.length - 1]);
				j++;
			}
			
			if (dropfields[i].type == 'closedDeck') {
				
				while (dropfields[i].cardsOnTop.length < 24) {
					var randomCardIndex = getRandomInt(0, tempCards.length - 1);
					placeCard(tempCards[randomCardIndex], dropfields[i]);
					tempCards.splice(randomCardIndex, 1);
				}
				
			}
			
		}

	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function openCardOnClick(e) {
		
		if ((e.which == 1)&&(e.target.dataset.component == 'card')&&(!gameEnd)) {
			
			var card = cards[findIndexByElem(cards, e.target)];
			var dropzone = card.placedOn;
			
			if((dropzone != closedDeck)&&(card.visibility == 'closed')) {
							
				if (dropzone.cardsOnTop[dropzone.cardsOnTop.length - 1] == card) {
					openCard(card);
				}
				
			}
			
		}
		
	}

	function flipCardOnClosedDeck(e) {
		
		if ((e.which == 1)&&(e.target.dataset.component == 'card')&&(cards[findIndexByElem(cards, e.target)].placedOn == closedDeck)) {
			
			openCard(cards[findIndexByElem(cards, e.target)]);
			placeCard(cards[findIndexByElem(cards, e.target)], openedDeck);
			
		} else if ((e.which == 1)&&(e.target.dataset.component == 'dropzone')&&(dropfields[findIndexByElem(dropfields, e.target)] == closedDeck)&&(closedDeck.cardsOnTop.length == 0)&&(openedDeck.cardsOnTop.length > 0)) {
			
			while (openedDeck.cardsOnTop.length > 0) {
				closeCard(openedDeck.cardsOnTop[openedDeck.cardsOnTop.length - 1]);
				placeCard(openedDeck.cardsOnTop[openedDeck.cardsOnTop.length - 1], closedDeck);
			}
			
		}		
		
	}

	function openCard(card) {
		
		card.visibility = 'opened';
		card.elem.style.backgroundPosition = getBackgroundPosition(card.colour, card.weight);
		card.elem.classList.remove('closed');

	}

	function getBackgroundPosition(colour, weight) {

		var top, left;

		left = weight * -100 + 100;
		switch (colour) {
			case 'spades':
				top = -300;
				break;
			case 'clubs':
				top = -100;
				break;
			case 'hearts':
				top = 0;
				break;
			case 'diamonds':
				top = -200;
				break;
		}

		return left + '% ' + top + '%';

	}

	function closeCard(card) {
		card.visibility = 'closed';
		card.elem.classList.add('closed');
		card.elem.style.backgroundPosition = '';
	}

	function mouseDownTrue(e) {
		
		e.preventDefault();
		
		if ((e.which == 1)&&(e.target.dataset.component == 'card')&&(cards[findIndexByElem(cards, e.target)].visibility == 'opened')&&(!gameEnd)) {
			
			dragCardsElems[0] = e.target;
			dragCardsElems[0].style.zIndex = parseInt(dragCardsElems[0].style.zIndex) + 100;
			
			dragCardsElemsCoords[0] = {
				left: parseFloat(dragCardsElems[0].style.left),
				top: parseFloat(dragCardsElems[0].style.top)
			}
			
			var currCard = cards[findIndexByElem(cards, e.target)];
			
			if (currCard.placedOn) {
				
				var indexOfCurrCard = currCard.placedOn.cardsOnTop.indexOf(currCard);

				if (currCard.placedOn.cardsOnTop.length - 1 > indexOfCurrCard) {
					
					for (var i = indexOfCurrCard + 1, j = 1; i < currCard.placedOn.cardsOnTop.length; i++, j++) {
						
						dragCardsElems[j] = currCard.placedOn.cardsOnTop[i].elem;
						
						dragCardsElemsCoords[j] = {
							left: parseFloat(dragCardsElems[j].style.left),
							top: parseFloat(dragCardsElems[j].style.top)
						}
						
						dragCardsElems[j].style.zIndex = parseInt(dragCardsElems[j].style.zIndex) + 100;
						
					}
					
				}
				
			}
			
			mouseLeftDown = true;
			mouseDownCordsX = e.clientX;
			mouseDownCordsY = e.clientY;
			
		}
		
	}

	function mouseDownFalse(e) {
		
		if (e.which == 1) {
			
			mouseLeftDown = false;
			
			if(dragCardsElems.length > 0 ) {
				dropCard(e);
				dragCardsElems.length = 0;
				dragCardsElemsCoords.length = 0;
			}

		}
		
	}

	function dragCard(e) {
		
		if (mouseLeftDown == true) {
			
			var moveX = e.clientX - mouseDownCordsX;
			var moveY = e.clientY - mouseDownCordsY;
			
			for (var i = 0; i < dragCardsElems.length; i++) {
				dragCardsElems[i].style.left = dragCardsElemsCoords[i].left + moveX + 'px';
				dragCardsElems[i].style.top = dragCardsElemsCoords[i].top + moveY + 'px';
			}
			
		}
		
	}

	function findIndexByElem(obj, element) {
		
		for (var i = 0; i < obj.length && obj[i].elem !== element; i++);
		return i;
		
	}

	function placeCardBack() {
		
		for (var i = 0; i < dragCardsElems.length; i++) {
			dragCardsElems[i].style.zIndex = parseInt(dragCardsElems[i].style.zIndex) - 100;
			dragCardsElems[i].style.left = dragCardsElemsCoords[i].left + 'px';
			dragCardsElems[i].style.top = dragCardsElemsCoords[i].top + 'px';
		}
		
	}

	function dropCard(e) {
		
		var dragedCardElem = document.elementFromPoint(e.clientX, e.clientY);
		dragedCardElem.hidden = true;
		
		var elem = document.elementFromPoint(e.clientX, e.clientY);
		
		if ((elem.dataset.component == 'dropzone')||(elem.dataset.component == 'card')){
			
			if (elem.dataset.component == 'card') {
				var currDropzone = cards[findIndexByElem(cards, elem)].placedOn;
			} else {
				var currDropzone = dropfields[findIndexByElem(dropfields, elem)];
			}
			var currCard = cards[findIndexByElem(cards, dragCardsElems[0])];
			
			if ((currCard.placedOn == currDropzone)||(!dropRuleCheck(currCard, currDropzone))) {
				placeCardBack();
				dragedCardElem.hidden = false;
				return;
			}
			
			for (var i = 0; i < dragCardsElems.length; i++) {
				
				currCard = cards[findIndexByElem(cards, dragCardsElems[i])];
				placeCard(currCard, currDropzone);
				
			}
			
		} else {
			placeCardBack();
		}	
		
		dragedCardElem.hidden = false;
		
		if ((currDropzone)&&(currDropzone.type == 'final')) {
			isWin();
		}

	}

	function placeCard(card, dropzone) {
		
		if (card.placedOn) {
			card.placedOn.cardsOnTop.length--;
		}
			
		card.elem.style.zIndex = dropzone.cardsOnTop.length + 1;
		card.elem.style.left = dropzone.elem.style.left;
				
		if (dropzone.type == 'temp') {
			if (dropzone.cardsOnTop.length == 0) {
				card.elem.style.top = parseFloat(dropzone.elem.style.top) + 'px';
			} else if (dropzone.cardsOnTop[dropzone.cardsOnTop.length - 1].visibility == 'opened') {
				card.elem.style.top = parseFloat(dropzone.cardsOnTop[dropzone.cardsOnTop.length - 1].elem.style.top) + 25 + 'px';
			} else {
				card.elem.style.top = parseFloat(dropzone.cardsOnTop[dropzone.cardsOnTop.length - 1].elem.style.top) + 5 + 'px';
			}
		} else {
			card.elem.style.top = parseFloat(dropzone.elem.style.top) + 'px';
		}
		
		dropzone.cardsOnTop.push(card);
		card.placedOn = dropzone;
		
	}

	function checkCardColor(card) {
		
		switch (card.colour) {
			
			case 'diamonds':
			case 'hearts':
				return 'red';
				
			case 'spades':
			case 'clubs':
				return 'black';
				
		}
		
	}

	function dropRuleCheck(card, dropzone) {
		
		switch (dropzone.type) {
			
			case 'temp':
			
				//return true;
			
				if (dropzone.cardsOnTop.length == 0) {
					
					if (card.name === 'king') {
						return true;
					} else {
						return false;
					}
					
				}

				if (checkCardColor(card) != checkCardColor(dropzone.cardsOnTop[dropzone.cardsOnTop.length - 1])) {
					
					if (card.weight == (dropzone.cardsOnTop[dropzone.cardsOnTop.length - 1].weight - 1)) {
						return true;
					}

					return false;
					
				} else {
					
					return false;
					
				}
				
			case 'final':
			
				//return true;
			
				if (dragCardsElems.length > 1) {
					return false;
				}
			
				if (dropzone.cardsOnTop.length == 0) {
					
					if (card.name === 'ace') {
						return true;
					} else {
						return false;
					}
					
				}
				
				if (card.colour == dropzone.cardsOnTop[dropzone.cardsOnTop.length - 1].colour) {
					
					if (card.weight == (dropzone.cardsOnTop[dropzone.cardsOnTop.length - 1].weight + 1)) {
						return true;
					}
					
					return false;
					
				} else {
					
					return false;
					
				}
			
			default: return false;
				
		}
		
	}
	
})();