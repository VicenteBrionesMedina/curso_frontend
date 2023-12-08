/*JS Comprobación Datos Formulario Entrada*/

//Inicialización Variables, Objetos y DOM
const nicknameInput = document.getElementById("nickname");
const sizeInput = document.getElementById("size");
const entryForm = document.getElementById("entryForm");
const errorAlert = document.getElementById("error");

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
    return true;
}

//Carga Eventos
entryForm.addEventListener("submit", checkForm);