/*JS Comprobación Datos Formulario Entrada*/

//Inicialización Variables, Objetos y DOM
const nicknameInput = document.getElementById("nickname");
const sizeInput = document.getElementById("size");
const entryForm = document.getElementById("entryForm");
const errorAlert = document.getElementById("error");

//Funciones Evento
function checkForm(event){
    //Comprobar Formulario
    if (nicknameInput.value.length == 0){
        console.log("No hay nombre");
        nicknameInput.focus();
        event.preventDefault();
        errorAlert.innerText = "El usuario no puede estar vacío";
        return false;
    }
    else if (sizeInput.value == "0"){
       console.log("No se selecciono tamaño de panel");
       sizeInput.focus();
       event.preventDefault();
       errorAlert.innerText = "Selecciona un tamaño de juego";
       return false;
    }
    return true;
}

//Carga Eventos
entryForm.addEventListener("submit", checkForm);