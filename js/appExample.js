/*Comprobación de Datos*/

//Capturar Valor Nobre
const nicknameInput = document.getElementById("nickname");
console.log(nicknameInput.nodeType);
nicknameInput.value = "Vicente";
console.log(nicknameInput.value)

//Capturar Valor Select
const inputSize = document.getElementById("size");
console.log(inputSize.value)
console.log(inputSize.options[inputSize.selectedIndex].text);

//Eventos
function test(){
    console.log("Evento Click")
}