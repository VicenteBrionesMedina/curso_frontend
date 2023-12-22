/**
 * JS Comprobación Datos Formulario Entrada
 * @author Vicente Briones <vbriomed@gmail.com>
 * {@link https://github.com/VicenteBrionesMedina/curso_frontend GitHub}
 */


//Inicialización Variables, Objetos y DOM
var nicknameInput;
var sizeInput;
var emailInput;
var entryForm;
var errorAlert;
var avatarItems;
var itemImg;
var avatarContainer;

//Funciones Evento
function checkForm(event){
    //Comprobar Formulario
    if (nicknameInput.value.match(/(?<!\S)[0-9]/)){
        nicknameInput.focus();
        event.preventDefault();
        errorAlert.innerText = "El usuario no puede comenzar con un numero";
        return false;
    }
    else if (sizeInput.value == "0"){
       sizeInput.focus();
       event.preventDefault();
       errorAlert.innerText = "Selecciona un tamaño de juego";
       return false;
    }
    userData(nicknameInput, sizeInput, emailInput);
    userHistory(nicknameInput);
    return true;
}

function imgMoving(event) {
    itemImg = event.target;
}

function changeImg(event) {
    avatarContainer.src = itemImg.src
}

function chargeDom() {
    //Capturar Elementos
    nicknameInput = document.getElementById("nickname");
    sizeInput = document.getElementById("size");
    emailInput = document.getElementById("email")
    entryForm = document.getElementById("entryForm");
    errorAlert = document.getElementById("error");
    avatarItems = document.getElementsByClassName("avatarImgItem");
    avatarContainer = document.getElementById("avatarImg");

    //Comprobar Error Game.html
    if (sessionStorage.getItem("error") != null) {
        errorAlert.innerText = sessionStorage.getItem("error");
        sessionStorage.removeItem("error");
    }
    
    entryForm.addEventListener("submit", checkForm);

    //Drag And Drop
    for (let item of avatarItems) {
        item.addEventListener("dragstart", imgMoving)
    }

    avatarContainer.addEventListener("dragover", event => {event.preventDefault()});
    avatarContainer.addEventListener("drop", changeImg)
}

//Carga Eventos
document.addEventListener("DOMContentLoaded", chargeDom)

geolacationData();