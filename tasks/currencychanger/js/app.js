/*JS Functionalities*/

/*Varible Initialization*/
const knownCurrency = document.getElementById("known-currency");
const unknownCurrency = document.getElementById("unknown-currency");
const knownAmount = document.getElementById("known-amount");
const unknownAmount = document.getElementById("unknown-amount");
const summary = document.getElementById("summary");
const convertButton = document.getElementById("convert-button");
const errorAlert = document.getElementById("error");

var dolarAmount;

/*Conversion Function*/
function convertCurrency(event) {
    if (knownAmount.value.match(/^(?:0|[1-9]\d*)(\.\d+)?$/)) {

        if (knownCurrency.value == "0") {
            dolarAmount = parseFloat(knownAmount.value);
        }
        else if (knownCurrency.value == "1") {
            dolarAmount = parseFloat(knownAmount.value) * 1.09;
        }
        else if (knownCurrency.value == "2") {
            dolarAmount = parseFloat(knownAmount.value) * 0.00115;
        }
        else if (knownCurrency.value == "3") {
            dolarAmount = parseFloat(knownAmount.value) * 0.20;
        }
        
        if (unknownCurrency.value == "1") {
            dolarAmount *= 0.92;
        }
        else if (unknownCurrency.value == "2") {
            dolarAmount *= 870;
        }
        else if (unknownCurrency.value == "3") {
            dolarAmount *= 4.94;
        }

        unknownAmount.value = +dolarAmount.toFixed(2);

        summary.innerText = knownAmount.value + knownCurrency.options[knownCurrency.selectedIndex].text.match(/\(([^)]+)\)/g) + " = " + unknownAmount.value + unknownCurrency.options[unknownCurrency.selectedIndex].text.match(/\(([^)]+)\)/g);

    }
    else if (knownAmount.value.match(/^-?\d+(\.\d+)?$/)) {
        knownAmount.focus();
        event.preventDefault();
        errorAlert.innerText = "El Monto debe ser mayor a 0";
    }
    else if (knownAmount.value.match(/^\s*$/)){
        knownAmount.focus();
        event.preventDefault();
        errorAlert.innerText = "El Monto no puede estar vacio";
    }
    else {
        knownAmount.focus();
        event.preventDefault();
        errorAlert.innerText = "El Monto no puede contener letras o caracteres especiales";
    }
}

/*Function Call*/
convertButton.addEventListener("click", convertCurrency);
