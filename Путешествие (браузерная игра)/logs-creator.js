function getNewTimeString() {
    let date = new Date();
    let dateStr = date.toString();
    return dateStr.substr(16,2) + ":" + dateStr.substr(19,2) + ":" + dateStr.substr(22,2);
}

let addressLog = document.querySelector(".log");
let newMessage = document.createElement("div");
let newTime = document.createElement("p");

setTimeout(createFirstLog, 500);
function createFirstLog() {
    /*<div class="log__message"></div>*/
    newMessage.className = "log__message";
    addressLog.prepend(newMessage);
    let addressDiv = addressLog.querySelector(".log__message");

    /*<p class="log__time">21:21:00</p>*/
    newTime.className = "log__time";
    newTime.innerHTML = getNewTimeString();
    addressDiv.append(newTime);

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = "ИГРА НАЧАЛАСЬ!";
    addressDiv.append(p1);

    messageMoving();
}

function createNewLog() {
    let clonenewMessage = newMessage.cloneNode(true);
    clonenewMessage.innerHTML = "";
    addressLog.prepend(clonenewMessage);
    let addressDiv = addressLog.querySelector(".log__message");

    let clonenewTime = newTime.cloneNode(true);
    clonenewTime.innerHTML = getNewTimeString();
    addressDiv.append(clonenewTime);
}

function messageMoving() {

// Игрок X ходит

    createNewLog();
    let addressDiv = addressLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    addressDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " ходит";
    addressDiv.append(p2);
}

function messageArrow() {

// Игрок X движется по стрелке

    createNewLog();
    let addressDiv = addressLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    addressDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " движется по стрелке";
    addressDiv.append(p2);
}

function messageYellow() {

// Игрок X попал на жёлтую клетку и ходит ещё раз

    createNewLog();
    let addressDiv = addressLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    addressDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " попал на ";
    addressDiv.append(p2);

    let p3 = document.createElement("p");
    p3.style.color = "yellow";
    p3.innerHTML = "жёлтую клетку";
    addressDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = " и ходит ещё раз";
    addressDiv.append(p4);
}

function messageGreen() {

// Игрок X попал на зелёную клетку и пропустит ход

    createNewLog();
    let addressDiv = addressLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    addressDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " попал на ";
    addressDiv.append(p2);

    let p3 = document.createElement("p");
    p3.style.color = "green";
    p3.innerHTML = "зелёную клетку";
    addressDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = " и пропустит ход";
    addressDiv.append(p4);
}

function messageCheckpoint() {

// Игрок X достиг чекпойнта

    createNewLog();
    let addressDiv = addressLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    addressDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " достиг ";
    addressDiv.append(p2);

    let p3 = document.createElement("p");
    p3.style.color = "#308ae3";
    p3.innerHTML = "чекпойнта";
    addressDiv.append(p3);
}

function messageRed() {

// Игрок X попал на красную клетку! -1 ед. энергии

    createNewLog();
    let addressDiv = addressLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    addressDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " попал на ";
    addressDiv.append(p2);

    let p3 = document.createElement("p");
    p3.style.color = "red";
    p3.innerHTML = "красную клетку! ";
    addressDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = "-1 ед. силы";
    addressDiv.append(p4);
}

function messageReturnCheckpoint() {

// Игрок X возвращается на чекпойнт

    createNewLog();
    let addressDiv = addressLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    addressDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " возвращается на ";
    addressDiv.append(p2);

    let p3 = document.createElement("p");
    p3.style.color = "#308ae3";
    p3.innerHTML = "чекпойнт";
    addressDiv.append(p3);
}

function messageSkipMove() {

// Игрок X ПРОПУСКАЕТ ХОД

    createNewLog();
    let addressDiv = addressLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    addressDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " ПРОПУСКАЕТ ХОД";
    addressDiv.append(p2);
}

function messageAttack(rival) {

// Игрок X АТАКУЕТ Игрок Y!

    createNewLog();
    let addressDiv = addressLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    addressDiv.append(p1);

    let p2 = document.createElement("p");
    p2.style.color = "red";
    p2.innerHTML = " АТАКУЕТ ";
    addressDiv.append(p2);

    let p3 = document.createElement("p");
    p3.className = "log__player";
    p3.innerHTML = rival.label + "!";
    addressDiv.append(p3);
}

function messageAttackResult(rival) {

// Игрок Y пропустит ход, а Игрок X ходит ещё раз

    createNewLog();
    let addressDiv = addressLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = rival.label;
    addressDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " пропустит ход, а ";
    addressDiv.append(p2);

    let p3 = document.createElement("p");
    p3.className = "log__player";
    p3.innerHTML = players[current].label;
    addressDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = " ходит ещё раз";
    addressDiv.append(p4);
}

function messageAttackCancel(rival) {

// Игрок X передумал атаковать Игрок Y

    createNewLog();
    let addressDiv = addressLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    addressDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " передумал атаковать ";
    addressDiv.append(p2);

    let p3 = document.createElement("p");
    p3.className = "log__player";
    p3.innerHTML = rival.label + "!";
    addressDiv.append(p3);
}

function messageAttackNoOne() {

// Игрок X отказался от конфликта

    createNewLog();
    let addressDiv = addressLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    addressDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " отказался от конфликта";
    addressDiv.append(p2);
}

function messageFinished() {

// Игрок X ФИНИШИРОВАЛ!

    createNewLog();
    let addressDiv = addressLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    addressDiv.append(p1);

    let p2 = document.createElement("p");
    p2.style.color = "orange";
    p2.innerHTML = " ФИНИШИРОВАЛ!";
    addressDiv.append(p2);
}

function messageLose() {

// Игрок X СОШЁЛ С ДИСТАНЦИИ!

    createNewLog();
    let addressDiv = addressLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    addressDiv.append(p1);

    let p2 = document.createElement("p");
    p2.style.color = "red";
    p2.innerHTML = " СОШЁЛ С ДИСТАНЦИИ!";
    addressDiv.append(p2);
}

function messagePlace(place) {

// Игрок X занял y место

    createNewLog();
    let addressDiv = addressLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    addressDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " занял ";
    addressDiv.append(p2);

    let p3 = document.createElement("p");
    p3.style.color = "orange";
    p3.innerHTML = place;
    addressDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = " место";
    addressDiv.append(p4);
}

function messageCritic() {

// У Игрок А критическая ситуация

    createNewLog();
    let addressDiv = addressLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.innerHTML = "У ";
    addressDiv.append(p1);

    let p2 = document.createElement("p");
    p2.className = "log__player";
    p2.innerHTML = players[current].label;
    addressDiv.append(p2);

    let p3 = document.createElement("p");
    p3.style.color = "red";
    p3.innerHTML = " критическая ситуация";
    addressDiv.append(p3);
}