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
    userData(nicknameInput, sizeInput, emailInput)
    userHistory(nicknameInput)
    return true;
}

function chargeDom() {
    //Capturar Elementos
    nicknameInput = document.getElementById("nickname");
    sizeInput = document.getElementById("size");
    emailInput = document.getElementById("email")
    entryForm = document.getElementById("entryForm");
    errorAlert = document.getElementById("error");

    //Comprobar Error Game.html
    if (sessionStorage.getItem("error") != null) {
        errorAlert.innerText = sessionStorage.getItem("error");
        sessionStorage.removeItem("error");
    }
    
    entryForm.addEventListener("submit", checkForm);
}

//Carga Eventos
document.addEventListener("DOMContentLoaded", chargeDom)

geolacationData();