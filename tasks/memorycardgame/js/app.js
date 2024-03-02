/**
 * JS Check Entry Form Data
 * @author Vicente Briones <vbriomed@gmail.com>
 * {@link https://github.com/VicenteBrionesMedina/curso_frontend GitHub}
 */


//Initialization Variables, Objects and DOM
var userInput;
var difficultySelect;
var quantitySelect;
var entryForm;
var errorAlert;
var avatarItems;
var itemImg;
var selectedAvatarContainer;

//Event functions
function checkForm(event){
    //Check Form
    if (userInput.value.match(/(?<!\S)[0-9]/)){
        userInput.focus();
        event.preventDefault();
        errorAlert.innerText = "El usuario no puede comenzar con un numero";
        return false;
    }
    else if (difficultySelect.value == "0"){
       difficultySelect.focus();
       event.preventDefault();
       errorAlert.innerText = "Selecciona una dificultad";
       return false;
    }
    else if (quantitySelect.value == "0"){
        quantitySelect.focus();
        event.preventDefault();
        errorAlert.innerText = "Selecciona una cantidad de cartas";
        return false;
     }
    userData(userInput, difficultySelect, quantitySelect, selectedAvatarContainer);
    userHistory(userInput);
    return true;
}

function imgMoving(event) {
    itemImg = event.target;
}

function changeImg(event) {
    selectedAvatarContainer.src = itemImg.src
}

function chargeDom() {
    //Get Elements
    userInput = document.getElementById("userInput");
    difficultySelect = document.getElementById("difficultySelect");
    quantitySelect = document.getElementById("quantitySelect")
    entryForm = document.getElementById("entryForm");
    errorAlert = document.getElementById("error");
    avatarItems = document.getElementsByClassName("avatarItemImg");
    selectedAvatarContainer = document.getElementById("selectedAvatarImg");

    //Check Game.html Error
    if (sessionStorage.getItem("error") != null) {
        errorAlert.innerText = sessionStorage.getItem("error");
        sessionStorage.removeItem("error");
    }
    
    entryForm.addEventListener("submit", checkForm);

    //Drag And Drop
    for (let item of avatarItems) {
        item.addEventListener("dragstart", imgMoving)
    }

    selectedAvatarContainer.addEventListener("dragover", event => {event.preventDefault()});
    selectedAvatarContainer.addEventListener("drop", changeImg)
}

//Charge Events
document.addEventListener("DOMContentLoaded", chargeDom)