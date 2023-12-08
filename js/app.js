/*Comprobación de Datos*/

const nicknameInput = document.getElementById("nickname");
console.log(nicknameInput.nodeType);
//nicknameInput.value = "Vicente";
console.log(nicknameInput.value)

const inputSize = document.getElementById("size");
console.log(inputSize.value)
console.log(inputSize.options[inputSize.selectedIndex].text);