let deck = document.querySelector(".deck"),
    card = document.querySelectorAll(".deck .card"),
    cardIcons = document.querySelectorAll(".deck .card i"),
    restart = document.querySelector(".restart"),
    restartIcon = document.querySelector(".restart i"),
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
        displayCards.push(e.target);
        if(displayCards.length === 2) {
            if(displayCards[0].firstElementChild.className === displayCards[1].firstElementChild.className) {
                displayCards[0].classList.add("open", "show", "match");
                displayCards[1].classList.add("open", "show", "match");
                displayCards = [];
            }else{
                console.log("not match");
                displayCards = [];
            }
        }
        
     });
}

initGame();
console.log(card);

