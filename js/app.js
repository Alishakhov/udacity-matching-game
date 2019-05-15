let deck = document.querySelector(".deck");
let card = document.querySelectorAll(".card");

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
        // e.target.style.background = "yellow";
        e.target.classList.add("open", "show");
         console.log("the card is clicked");
     });
}

initGame();
console.log(card);


