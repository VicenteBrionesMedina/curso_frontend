/**
 * JS Gestión Datos Usuario
 * @author Vicente Briones <vbriomed@gmail.com>
 * {@link https://github.com/VicenteBrionesMedina/curso_frontend GitHub}
 */


var nickname;
var size;
var email;
var geolocationTxt;

//sessionStorage
function userData(nickname, size, email) {
    sessionStorage.setItem("nickname", nickname.value);
    sessionStorage.setItem("size", size.value);
    sessionStorage.setItem("email", email.value);
    sessionStorage.setItem("geolocationTxt", geolocationTxt.value);
}

function getUserData() {
    nickname = sessionStorage.getItem("nickname");
    size = sessionStorage.getItem("size");
    email = sessionStorage.getItem("email");
}

function checkUserData() {
    if (nickname == null) {
        sessionStorage.setItem("error", "No se han introducido los datos del usuario");
        return false;
    }
    return true;
}

function geolacationData() {
    if (!navigator.geolocation) {
        geolocationTxt = "El navegador no es compatible con 'Geolocation API'";
    }
    else {
        navigator.geolocation.getCurrentPosition(
            (position) => {geolocationTxt = "Latitud: " + position.coords.latitude + ", Longitud: " + position.coords.longitude},
            () => {geolocationTxt = "La geolocalizacion no se ha podido realizar"}
        )
    }
}

//localStorage
function userHistory(nickname) {
    let history;
    if (localStorage.getItem("history") == null) {
        history = [];
    }
    else {
        history = JSON.parse(localStorage.getItem("history"));
    }
    let userRecord = {
        user: nickname.value,
        date: Date.now()
    }
    history.push(userRecord);
    localStorage.setItem("history", JSON.stringify(history));
}