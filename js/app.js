let deck = document.querySelector(".deck"),
    card = document.querySelectorAll(".deck .card"),
    cardIcons = document.querySelectorAll(".deck .card i"),
    //restart = document.querySelector(".restart"),
   // restartIcon = document.querySelector(".restart i"),
    classMoves = document.querySelector(".moves"),
    count = 0,
    displayCards = [];
   
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

function initGame() {
    deck.addEventListener("click", function(e) {
        e.target.classList.add("open", "show");
        restartTheGame(e);
        displayCards.push(e.target);
        if(displayCards.length === 2) {
            handleMoveCounter();
            if(displayCards[0].firstElementChild.className == displayCards[1].firstElementChild.className) {
                displayCards[0].classList.add("match");
                displayCards[1].classList.add("match");
                displayCards = [];
            }else{
                setTimeout(function() {
                    displayCards[0].classList.remove("open", "show");
                    displayCards[1].classList.remove("open", "show");
                    displayCards = [];
                    console.log(displayCards);
                  }, 200);
            }
        }
        
     });
}

initGame();

// Click on the restart button to reset the game, 
// include moves counter, rating starts, timer
function restartTheGame (e) {
    let restart = document.querySelector(".restart");
        restart.addEventListener("click", function() {
            e.target.classList.remove("open", "show", "match");
            displayCards = [];
           classMoves.innerHTML =  0;
           count = 0;
        });
}

// Incrementing the moves 
function handleMoveCounter() {
    count++;
    classMoves.innerHTML = count;
}
console.log(card);
