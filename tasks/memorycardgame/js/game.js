/**
 * JS Game
 * @author Vicente Briones <vbriomed@gmail.com>
 * {@link https://github.com/VicenteBrionesMedina/curso_frontend GitHub}
 */

const deckSection = document.getElementsByClassName("deck");
const gameSection = document.getElementById("game");
const deck = document.getElementsByClassName("card");
const movesCounter = document.getElementById("movesCounter");

const cardHerosImages = ["Captain America Logo.png", "Iron Man Logo.png", "Spider-Man Logo.png", "Thor Logo.png", 
"Star Lord Logo.png", "Ant Man Logo.png", "Black Panther Logo.png", ];
const cardVillainImages = ["Red Skull Logo.png", "Mandarin Logo.png", "Dr Octopus Logo.png", "Loki Logo.png", 
"Thanos Logo.png", "Ghost Logo.png", "Killmonger Logo.png"];
var panelSize;
var timerIntervalId;
var cardIntervalId;
var wrongCards;
var time;
var indexClasess = [];
var bombed = false;
var randomImages = [];
var markedCards = [];

// Math Functions
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
// ----------

// Game Functions
function completeUserForm() {
    document.getElementById("nickname").value = user;
    document.getElementById("nickname").addEventListener('input', resizeInput);
    resizeInput.call(document.getElementById("nickname"));
    document.getElementById("avatarImage").src = avatarImage;
    quantity = parseInt(quantity);
}

function resizeInput() {
    this.style.width = this.value.length + "ch";
}

function modifyGamePanel() {
    // Create Grid
    gameSection.style.gridTemplateColumns = "repeat(" + quantity + ", 1fr)";
    gameSection.style.gridTemplateRows = "repeat(" + quantity + ", 1fr)";
    
    // Add Random Images to Each Card
    let cards = "";
    let randomIndex = 0;
    for (let index = 0; randomImages.length < (quantity * quantity) - 1; index++) {
        randomIndex = getRandomInt(cardHerosImages.length);
        let checker = checkQuantity(randomIndex);
        if (checker == true) {
            indexClasess.push(index);
            randomImages.push({id: index, 
                            image: cardHerosImages[randomIndex]});
            randomImages.push({id: index, 
                            image: cardVillainImages[randomIndex]});
        }
    }
    if (quantity % 2 != 0) {
        randomImages.push({id: "bomb", 
                        image: "Bomb.png"});
    }
    else {
        let checker = checkQuantity
        if (checker == true) {
            randomImages.push({id: (quantity * quantity), 
                            image: cardHerosImages[randomIndex]});
            randomImages.push({id: (quantity * quantity), 
                            image: cardVillainImages[randomIndex]});
        }
    }
    
    shuffle(randomImages);

    // Create Cards
    for (let index = 0; index < (quantity * quantity); index++) {
        let image = randomImages[index].image;
        let indexClass = randomImages[index].id;
        cards += `<div id="${index}" class="card ${indexClass}" draggable="false"><img src="./img/${image}"></div>`;
    }
    gameSection.innerHTML = cards;
}

// Determine Card Quantity
function checkQuantity(randomIndex) {
    let checker = true;
    if (quantity == 3) {
        for (let i = 0; i < randomImages.length; i++) {
            if (randomImages[i].image == cardHerosImages[randomIndex]) {
                checker = false;
            } 
        }
    }
    else if (quantity == 4) {  
        let index = [];      
        for (let images of randomImages) {
            if (images.image == cardHerosImages[randomIndex]){
                index.push(1);
            }
            if (index.length == 2) {
                checker = false;
                break;
            }
        }
    }
    else if (quantity == 5) {
        let index = [];  
        for (let i = 0; i < randomImages.length; i++) {
            if (randomImages[i].image == cardHerosImages[randomIndex]) {
                index.push(1);
            }
            if (index.length == 3) {
                checker = false;
                break;
            }
        }
        deckSection[0].style.width = "90em"
        deckSection[0].style.height = "90em"
    }
    return checker
}

// Flip Cards and Start Card Events
function flipCard(event) {
    let card = event.target;
    markedCards.push(card)
    if (markedCards.length > 1 && markedCards[0].id == markedCards[1].id) {
       markedCards.pop(); 
    }
    // Flip Cards
    if (markedCards.length == 2) {
        for (let card of markedCards) {
            card.classList.remove("marked");
            card.classList.add("flip");
        }
        // Compare Cards and Continue Game
        compareCards();
        markedCards = [];
        movesCounter.innerText = parseInt(movesCounter.innerText) - 1;
    }
    else {
        // Mark Clicked Cards
        card.classList.add("marked");
    }
    checkEndGame();
}

// Compare Cards and Check Bomb
function compareCards() {
    let pointsCounter = document.getElementById("pointsCounter");
    // Check Bomb
    let bomb;
    if (markedCards[0].classList[1] == "bomb" || markedCards[1].classList[1] == "bomb") {
        bomb = document.getElementsByClassName("bomb")[0]
        bomb.classList.add("marked");
        randomIndex = getRandomInt(indexClasess.length);
        bombedCards = document.getElementsByClassName(indexClasess[randomIndex].toString());
        for (let card of bombedCards) {
            card.classList.add("marked");
            card.classList.add("flip");  
            card.classList.add("match")      
        }
        let bombIndex = markedCards.indexOf(bomb);
        markedCards.splice(bombIndex, 1, document.getElementsByClassName("bait")[0]);
    }

    // Start Countdown for Wrong Cards
    if (markedCards[0].classList[1] != markedCards[1].classList[1]) {
        wrongCards = markedCards;
        for (let card of deck) {
        card.removeEventListener("click", flipCard);
        }
        cardIntervalId = setInterval(cardFlipCountdown, 1000);        
    }
    // Mark Correct Cards
    else {
        for (const card of markedCards) {
            card.classList.add("marked");
            card.classList.add("match");
        }
        pointsCounter.innerText = parseInt(pointsCounter.innerText) + 1;
    }
}

// Start the Countdown to Flip Cards
function cardFlipCountdown() {
    // Countdown
    let timeLeft = time - 1;
    time = timeLeft;
    if (timeLeft <= 0) {
        time = parseInt(difficulty);
        clearInterval(cardIntervalId);

        // Finish Flip
        wrongCards[0].classList.remove("flip");
        wrongCards[1].classList.remove("flip");
        for (let card of deck) {
        card.addEventListener("click", flipCard);
        }
    }
}

// Verify If Game Over
function checkEndGame() {
    let matchCards = document.getElementsByClassName("match");
    // All Cards Matched
    if (matchCards.length == (quantity * quantity)) {
        displayModal()
    }
    // No More Moves
    else if (movesCounter.innerText == "0") {
        displayModal();
    }
    // All Cards Matched Except Bomb
    else if (matchCards.length == (quantity * quantity) - 1) {
        displayModal();
    }
}

// Display Modal to Finish Game
function displayModal() {
    //Finish Events
    for (let card of deck) {
        card.removeEventListener("click", flipCard);
    }

    // Display Modal
    modal.style.display = "block";
    if (movesCounter.innerText == "0") {
        document.getElementsByClassName("modalContent")[0].innerHTML = `
        <h2>Juego Terminado</h2>
        <p>Se te han acabado los movimientos.</p>
        <img src="./img/Spider-Man Sad.png" alt="Vault boy givin the thumbs up from the game fall out" class="modalImg">
        <button id="playAgainBtn">¿Jugar de Nuevo?</button>
        `;
        
    }
    else {
        clearInterval(timerIntervalId);
    }
    playAgainBtn.addEventListener("click", (event) => location.reload());
}

function gameEvents() {
    // Start Time Depending on Difficulty
    time = parseInt(difficulty);
    checkDifficulty();

    // Add Click Event Lister to Cards
    for (let card of deck) {
        card.addEventListener("click", flipCard);
    }
}

// Determine Game Difficulty
function checkDifficulty() {
    if (quantity == 3) {
        if (difficulty == 3) {
            movesCounter.innerText = 20
        }
        else if (difficulty == 2) {
            movesCounter.innerText = 15
        }
        else if (difficulty == 1) {
            movesCounter.innerText = 10
        }
    }
    else if (quantity == 4) {
        if (difficulty == 3) {
            movesCounter.innerText = 30
        }
        else if (difficulty == 2) {
            movesCounter.innerText = 25
        }
        else if (difficulty == 1) {
            movesCounter.innerText = 20
        }
    }
    else if (quantity == 5) {
        if (difficulty == 3) {
            movesCounter.innerText = 50
        }
        else if (difficulty == 2) {
            movesCounter.innerText = 40
        }
        else if (difficulty == 1) {
            movesCounter.innerText = 30
        }
    }
}
// ----------

// Get User Data
getUserData();

// Check User Data
if (!checkUserData()) {
    location = "index.html";
}

// Complete Form
completeUserForm();

// Modify Panel
modifyGamePanel();

// Add Game Events
gameEvents();