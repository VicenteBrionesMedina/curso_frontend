/**
 * JS Juego
 * @author Vicente Briones <vbriomed@gmail.com>
 * {@link https://github.com/VicenteBrionesMedina/curso_frontend GitHub}
 */

var markStarted = false;
var adjacent = [];
var markedIds = [];
var panelSize;
var markedColor;
var intervalId;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function completeUserForm() {
    document.getElementById("nickname").value = nickname;
    document.getElementById("avatarImage").src = avatarImage;
    panelSize = parseInt(size);
}

function modifyGamePanel() {
    document.getElementById("game").style.gridTemplateColumns="repeat(" + size + ", 1fr)";
    document.getElementById("game").style.gridTemplateRows="repeat(" + size + ", 1fr)";
    
    let items = "";
    let color = ["red", "green"];
    let randomColor = 0;
    for (let index = 0; index < panelSize*panelSize; index++) {
        if (index % 2 > 0) {
            randomColor = getRandomInt(2);
        }
        items += `<div class="itemContainer" draggable="false"><div id="${index}" class="item ${color[randomColor]}" draggable="false"></div></div>`;
    }
    document.getElementById("game").innerHTML = items;
}

function getAdjacent(id) {
    adjacent = [];
    //Superior Adjacent
    if ((id - panelSize) >= 0) {
        adjacent.push(id - panelSize);
    }
    //Inferior Adjacent
    if ((id + panelSize) < (panelSize * panelSize)) {
        adjacent.push(id + panelSize);
    }
    //Left Adjacent
    if ((id % panelSize) > 0) {
        adjacent.push(id - 1);
    }
    //Right Adjacent
    if (((id + 1) % panelSize) > 0) {
        adjacent.push(id + 1);
    }
}

function countdown() {
    let timeLeft = parseInt(document.getElementById("time").value) - 1;
    document.getElementById("time").value = timeLeft;
    if (timeLeft == 0) {
        clearInterval(intervalId);
        //Finish Events
        const items = document.getElementsByClassName("item");
        for (let item of items) {
            item.removeEventListener("mousedown", markStart);
            item.removeEventListener("mouseover", marking);
        }
        document.removeEventListener("mouseup", markStop);
        //Change Z-Index
        document.getElementById("gameFinished").classList.add("gameFinishedColor")
        document.getElementById("gameFinished").style.zIndex = "2";
        document.getElementById("game").style.zIndex = "1";
        document.getElementById("newGame").addEventListener("click", (event) => location.reload());
    }
}

function gameEvents() {
    const items = document.getElementsByClassName("item");
    for (let item of items) {
        item.addEventListener("mousedown", markStart);
        item.addEventListener("mouseover", marking);
    }
    document.addEventListener("mouseup", markStop);
    //Countdown
    intervalId = setInterval(countdown, 1000);
}

function markStart(event) {
    let item = event.target;
    console.log(item.id);
    let itemContainer = event.target.parentElement;
    if (item.classList.contains("red")){
        markedColor = "red";
        itemContainer.classList.add("red");
    }
    else {
        markedColor = "green";
        itemContainer.classList.add("green");
    }
    if (!markStarted) {
        markStarted = true;
    }
    //Save Marked Ids
    markedIds.push(parseInt(item.id));
    //Calculate Ajacent
    getAdjacent(parseInt(item.id));
}

function marking(event) {
    if (markStarted){
        let item = event.target;
        let newId = parseInt(item.id);
        if (adjacent.includes(newId) && item.classList.contains(markedColor)) {
            let itemContainer = event.target.parentElement;
            if (item.classList.contains("red")) {
                itemContainer.classList.add("red");
            }
            else {
                itemContainer.classList.add("green");
            }
            markedIds.push(parseInt(item.id));
            getAdjacent(parseInt(item.id))
        }
    }
}

function markStop(event) {
    markStarted = false;
    adjacent = [];
    const pointsInput = document.getElementById("points");
    if (markedIds.length > 1) {
        pointsInput.value = parseInt(pointsInput.value) + markedIds.length
    }
    //Change Marked Ids
    for (let index = 0; index < markedIds.length; index++) {
        let markedItem = document.getElementById(markedIds[index]);
        markedItem.parentElement.classList.remove(markedColor);
        let color = ["red", "green"];
        let randomColor = getRandomInt(2);
        markedItem.classList.remove(markedColor);
        markedItem.classList.add(color[randomColor]);
    }
    markedIds = [];
}

//Obtener Datos Usuario
getUserData();

//Combrobar Datos Usuario
if (!checkUserData()) {
    location = "index.html";
}

//Completar Formulario
completeUserForm();

//Modificar Panel
modifyGamePanel();

//Añadir Eventos Juego
gameEvents();