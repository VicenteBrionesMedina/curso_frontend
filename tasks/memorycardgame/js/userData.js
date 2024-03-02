/**
 * JS User Data Management
 * @author Vicente Briones <vbriomed@gmail.com>
 * {@link https://github.com/VicenteBrionesMedina/curso_frontend GitHub}
 */


var user;
var difficulty;
var quantity;
var avatarImage;

// sessionStorage
function userData(user, difficulty, quantity, selectedAvatarContainer) {
    sessionStorage.setItem("user", user.value);
    sessionStorage.setItem("difficulty", difficulty.value);
    sessionStorage.setItem("quantity", quantity.value);
    sessionStorage.setItem("avatarImage", selectedAvatarContainer.src);
}

function getUserData() {
    user = sessionStorage.getItem("user");
    difficulty = sessionStorage.getItem("difficulty");
    quantity = sessionStorage.getItem("quantity");
    avatarImage = sessionStorage.getItem("avatarImage");
}

function checkUserData() {
    if (user == null) {
        sessionStorage.setItem("error", "No se han introducido los datos del usuario");
        return false;
    }
    return true;
}

// localStorage
function userHistory(user) {
    let history;
    if (localStorage.getItem("history") == null) {
        history = [];
    }
    else {
        history = JSON.parse(localStorage.getItem("history"));
    }
    let userRecord = {
        user: user.value,
        date: Date.now()
    }
    history.push(userRecord);
    localStorage.setItem("history", JSON.stringify(history));
}