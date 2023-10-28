/*Calculo de Años Felinos*/
var edadhumana = 0;
for (let edadgato = 1; edadgato < 22; edadgato++){
    if (edadgato == 1){
        edadhumana = 15
    } else if (edadgato == 2) {
        edadhumana = 24
    } else {
        edadhumana = edadhumana + 4
    }
    console.log(edadgato + " " + edadhumana)
}