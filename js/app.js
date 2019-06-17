let deck = document.querySelector(".deck"),
    card = document.querySelectorAll(".deck .card"),
	cardIcons = document.querySelectorAll(".deck .card i"),
	convertCardToArray = Array.from(card),
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
	storeTimer,
	modalH1 = document.getElementById("dialog-modal-h1"),
	modalH2 = document.getElementById("dialog-modal-h2");

//let shuffleIcons = Array.from(cardIcons);
function shuffle(array) {
	let currentIndex = array.length, 
		temporaryValue, 
		randomIndex;
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
function convertArrayToNodeList() {
	let arrayIcons = shuffle(convertCardToArray);
	let nodeList = arrayIcons.forEach(function(element) {
		deck.append(element);
	});
	return nodeList;
}

// Beginning of the game
function initGame() {
	convertArrayToNodeList();
    deck.addEventListener("click", e => {
  		//setTimer();
        e.target.classList.add("open", "show");
        restartTheGame(e);
        displayCards.push(e.target);
        // go home do the disable the count below
        if(displayCards.length === 2) {
            handleMoveCounter();
            if(displayCards[0].firstElementChild.className == displayCards[1].firstElementChild.className) {
                matchedCards();
                winningCards.push(e.target);
                winningCards.push(e.target);
                handleWinningCards();
                displayCards = [];
            }else{
                setTimeout(notMatchedCards, 700);
            }
        }
        
     });
}

initGame();

// Adding timer
/*function setTimer() {
    storeTimer = setInterval(function() {
        timerClass++;
        timer.innerHTML = `${timerClass}`;
        console.log(timerClass);
    }, 1000);
}*/
function setTimer() {
	let min = 0
    storeTimer = setInterval(function() {
        timerClass++;
		timer.innerHTML = `${timerClass} seconds`;
        console.log(timerClass);
    }, 1000);
}

// match card 
function matchedCards() {
    displayCards[0].classList.add("match");
    displayCards[1].classList.add("match");
}

// Not matched 
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
/*function handleUpdateRatingStars() {
    if(count > 10 && count < 14) {
		listOfStars[0].style.display = "none";
		fourStars();
        starModalNum = 4;
    }else if(count > 13 && count < 16) {
        listOfStars[0].style.display = "none";
		listOfStars[1].style.display = "none";
		threeStars();
        starModalNum = 3;
    }else if(count > 15 && count < 19) {
        listOfStars[0].style.display = "none";
        listOfStars[1].style.display = "none";
		listOfStars[2].style.display = "none";
		twoStars();
        starModalNum = 2;
    }else if(count > 18) {
        listOfStars[0].style.display = "none";
        listOfStars[1].style.display = "none";
        listOfStars[2].style.display = "none";  
        listOfStars[3].style.display = "none"; 
		starModalNum = 1; 
		oneStars();
    }else {
		starModalNum = 5;
		fiveStars();
        return listOfStarsContainer;
        
    }
}*/

function handleUpdateRatingStars() {
    if(count > 10 && count < 14) {
		listOfStars[0].style.color = "#eee";
		fourStars();
        starModalNum = 4;
    }else if(count > 13 && count < 16) {
        listOfStars[0].style.color = "#eee";
		listOfStars[1].style.color = "#eee";
		threeStars();
        starModalNum = 3;
    }else if(count > 15 && count < 19) {
        listOfStars[0].style.color = "#eee";
        listOfStars[1].style.color = "#eee";
		listOfStars[2].style.color = "#eee";
		twoStars();
        starModalNum = 2;
    }else if(count > 18) {
        listOfStars[0].style.color = "#eee";
        listOfStars[1].style.color = "#eee";
        listOfStars[2].style.color = "#eee";
        listOfStars[3].style.color = "#eee";
		starModalNum = 1; 
		oneStars();
    }else {
		starModalNum = 5;
		fiveStars();
        return listOfStarsContainer;
        
    }
}

// Check for winning the game 
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
        starModal = document.getElementById("star-modal");
    //    timerModal = document.getElementById("timer-modal");
        moveModal.innerHTML =  `Moves: ${count}`;
        starModal.innerHTML = `Stars: ${starModalNum}`;
    //    timerModal.innerHTML = `Timer: ${timerClass}`;
}

// Modal display content when hit stars
function fiveStars() {
	modalH2.innerHTML = "&#128525;";
	modalH1.innerHTML = "YEAH! YOU'RE OWESOME";
}

// Modal display content when hit four stars
function fourStars() {
	modalH2.innerHTML = "&#128516;";
	modalH1.innerHTML = "YOU'RE GOOD!";
}

// Modal display content when hit three stars
function threeStars() {
	modalH2.innerHTML = "&#128527;";
	modalH1.innerHTML = "I can do better next time";
}

// Modal display content when hit three stars
function twoStars() {
	modalH2.innerHTML = "&#128531;";
	modalH1.innerHTML = "I can't give up on this!";
}

// Modal display content when hit three stars
function oneStars() {
	modalH2.innerHTML = "&#128557;";
	modalH1.innerHTML = "What??? One star!!!";
}

/*--Handle reset after click on the restart button-- */

// Handle reset the moves count
function ResetMoveCounter() {
    classMoves.innerHTML =  0;
    count = 0;
    handleResetRatingStars();
}

// handle reset the rating stars
/*function handleResetRatingStars() {
    if(listOfStars[3].style.display = "none") {
        listOfStars[3].style.display = "inline";
        listOfStars[2].style.display = "inline";
        listOfStars[1].style.display = "inline";
		listOfStars[0].style.display = "inline";
		fourStars();
        starModalNum = 4;
    }else if(listOfStars[2].style.display ="none"){
        listOfStars[2].style.display = "inline";
        listOfStars[1].style.display = "inline";
		listOfStars[0].style.display = "inline";
		threeStars();
        starModalNum = 3;
    }else if(listOfStars[1].style.display = "none") {
        listOfStars[1].style.display = "inline";
		listOfStars[0].style.display = "inline";
		twoStars();
        starModalNum = 2;
    }else if(listOfStars[0].style.display = "none") {
		listOfStars[0].style.display = "inline";
		oneStars();
        starModalNum = 1;
    }else {
		// both below are correct
		fiveStars();
		return listOfStarsContainer;
       // listOfStarsContainer.style.display = "inline";
    }
}*/
// Changed star color instead of display = none
function handleResetRatingStars() {
    if(listOfStars[3].style.color = "#eee") {
        listOfStars[3].style.color = "rgb(228, 206, 15)";
        listOfStars[2].style.color = "rgb(228, 206, 15)";
        listOfStars[1].style.color = "rgb(228, 206, 15)";
		listOfStars[0].style.color = "rgb(228, 206, 15)";
		fourStars();
        starModalNum = 4;
    }else if(listOfStars[2].style.color = "#eee"){
        listOfStars[2].style.color = "rgb(228, 206, 15)";
        listOfStars[1].style.color = "rgb(228, 206, 15)";
		listOfStars[0].style.color = "rgb(228, 206, 15)";
		threeStars();
        starModalNum = 3;
    }else if(listOfStars[1].style.color = "#eee") {
        listOfStars[1].style.color = "rgb(228, 206, 15)";
		listOfStars[0].style.color = "rgb(228, 206, 15)";
		twoStars();
        starModalNum = 2;
    }else if(listOfStars[0].style.color = "#eee") {
		listOfStars[0].style.color = "rgb(228, 206, 15)";
		oneStars();
        starModalNum = 1;
    }else {
		// both below are correct
		fiveStars();
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
        restart.addEventListener("click", () => {
            e.target.classList.remove("open", "show", "match");
			displayCards = [];
			convertArrayToNodeList();
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
	convertArrayToNodeList();
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


// this is for play again afte the winning
function removeOpenShowMatch() {
    card.forEach(element => {
        element.classList.remove("open", "show", "match");
        console.log(element.classList);
    });
}

