let deck = document.querySelector(".deck"),
    card = document.querySelectorAll(".deck .card"),
	cardIcons = document.querySelectorAll(".deck .card i"),
	//convertCardIconsToArray = Array.from(cardIcons),
	convertCardIconsToArray = Array.from(card),
    classMoves = document.querySelector(".moves"),
    count = 0,
    displayCards = [],
    listOfStarsContainer = document.querySelector(".stars"),
    listOfStars = document.querySelectorAll(".stars li"),
    modal = document.getElementById("dialog-modal-container"),
    btn = document.getElementById("btn"),
    winningCards = [],
    starModalNum = 5,
    timerClass = 0,
	timer = document.getElementById("timer"),
    storeTimer;

//let shuffleIcons = Array.from(cardIcons);
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// testing to put the shuffle card in the card innerHTML
function cardInnerHTML() {
	let arrayIcons = shuffle(convertCardIconsToArray);
	let convertArrayToNodeList = arrayIcons.forEach(function(element) {
		deck.append(element);
	});
	return convertArrayToNodeList;
}

function initGame() {
	cardInnerHTML();
    deck.addEventListener("click", function(e) {
  		//setTimer();
        e.target.classList.add("open", "show");
        restartTheGame(e);
        displayCards.push(e.target);
        if(displayCards.length === 2) {
            handleMoveCounter();
            if(displayCards[0].firstElementChild.className == displayCards[1].firstElementChild.className) {
                matchedCards();
                winningCards.push(e.target);
                winningCards.push(e.target);
                handleWinningCards();
                displayCards = [];
            }else{
                setTimeout(notMatchedCards, 100);
            }
        }
        
     });
}

initGame();

// Adding timer
function setTimer() {
    storeTimer = setInterval(function() {
        timerClass++;
        timer.innerHTML = `${timerClass}`;
        console.log(timerClass);
    }, 1000);
}

// match card 
function matchedCards() {
    displayCards[0].classList.add("match");
    displayCards[1].classList.add("match");
}

// NOt matched 
function notMatchedCards() {
    displayCards[0].classList.remove("open", "show");
    displayCards[1].classList.remove("open", "show");
    displayCards = [];
}

// Incrementing the moves 
function handleMoveCounter() {
    count++;
    classMoves.innerHTML = count;
    handleUpdateRatingStars();
}

// Rating starts
function handleUpdateRatingStars() {
    if(count > 10 && count < 14) {
        listOfStars[0].style.display = "none";
        starModalNum = 4;
    }else if(count > 13 && count < 16) {
        listOfStars[0].style.display = "none";
        listOfStars[1].style.display = "none";
        starModalNum = 3;
    }else if(count > 15 && count < 19) {
        listOfStars[0].style.display = "none";
        listOfStars[1].style.display = "none";
        listOfStars[2].style.display = "none";
        starModalNum = 2;
    }else if(count > 18) {
        listOfStars[0].style.display = "none";
        listOfStars[1].style.display = "none";
        listOfStars[2].style.display = "none";  
        listOfStars[3].style.display = "none"; 
        starModalNum = 1; 
    }else {
        starModalNum = 5;
        return listOfStarsContainer;
        
    }
}


// If for match card to win
function handleWinningCards() {
    if(winningCards.length === 16) {
        clearTimeout(storeTimer);
        openModal();
    }
}  

// display modal
function openModal() {
    modal.style.display = "block";
    getStarMoveTimerValue();
}

// display the stars, moves, timer on the modal
function getStarMoveTimerValue() {
    let moveModal = document.getElementById("move-modal"),
        starModal = document.getElementById("star-modal"),
        timerModal = document.getElementById("timer-modal");
        moveModal.innerHTML =  `Moves: ${count}`;
        starModal.innerHTML = `Stars: ${starModalNum}`;
        timerModal.innerHTML = `Timer: ${timerClass}`;
}

/*--Handle reset after click on the restart button-- */

// Handle reset the moves count
function ResetMoveCounter() {
    classMoves.innerHTML =  0;
    count = 0;
    handleResetRatingStars();
}

// handle reset the rating stars
function handleResetRatingStars() {
    if(listOfStars[3].style.display = "none") {
        listOfStars[3].style.display = "inline";
        listOfStars[2].style.display = "inline";
        listOfStars[1].style.display = "inline";
        listOfStars[0].style.display = "inline";
        starModalNum = 4;
    }else if(listOfStars[2].style.display ="none"){
        listOfStars[2].style.display = "inline";
        listOfStars[1].style.display = "inline";
        listOfStars[0].style.display = "inline";
        starModalNum = 3;
    }else if(listOfStars[1].style.display = "none") {
        listOfStars[1].style.display = "inline";
        listOfStars[0].style.display = "inline";
        starModalNum = 2;
    }else if(listOfStars[0].style.display = "none") {
        listOfStars[0].style.display = "inline";
        starModalNum = 1;
    }else {
        // both below are correct
		return listOfStarsContainer;
       // listOfStarsContainer.style.display = "inline";
    }
}


// Reset timer
function handleResetTimer() {
    timerClass = 0;
    storeTimer = setInterval(function() {
        timerClass++;
        timer.innerHTML = `${timerClass} Seconds`;
        console.log(timerClass);
    }, 1000);
}

// Click on the restart button to reset the game, 
function restartTheGame (e) {
    let restart = document.querySelector(".restart");
        restart.addEventListener("click", function() {
            e.target.classList.remove("open", "show", "match");
            displayCards = [];
            ResetMoveCounter();
            winningCards = [];
            handleWinningCards();
        });
}

/*--Handle start a replay game--*/
// handle play agian button
function handlePlayAgainBtn() {
    closeModal();
    removeOpenShowMatch();
    restartTheGame(card);
    ResetMoveCounter();
    winningCards = [];
    handleWinningCards();
  //  handleResetTimer();
}

// Close modal
function closeModal() {
    modal.style.display = "none";
}


// 
function removeOpenShowMatch() {
    card.forEach(function(element) {
        element.classList.remove("open", "show", "match");
        console.log(element.classList);
    });
}

