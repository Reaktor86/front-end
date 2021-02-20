

const pathLog = document.querySelector(".log");

function createNewLog(noTime) {
    /*<div class="log__message"></div>*/
    let newMessage = document.createElement("div");
    newMessage.className = "log__message";
    pathLog.prepend(newMessage);

    if (!noTime) {
        /*<p class="log__time">21:21:00</p>*/
        let pathDiv = pathLog.querySelector(".log__message");
        let newTime = document.createElement("p");
        newTime.className = "log__time";
        newTime.innerHTML = getNewTimeString();
        pathDiv.append(newTime);
    }
}

function createFirstLog() {

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = "ИГРА НАЧАЛАСЬ!";
    pathDiv.append(p1);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);

    messageMoving();
}

function messageGameSaved() {

    createNewLog(true);
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.innerHTML = "ИГРА СОХРАНЕНА";
    p1.style.color = "yellow";
    pathDiv.append(p1);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageGameLoaded() {

    createNewLog(true);
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.innerHTML = "ИГРА ЗАГРУЖЕНА";
    p1.style.color = "yellow";
    pathDiv.append(p1);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageMoving() {

// Игрок X ходит

    if (players[current].fore === true) {
        if (players[current].place == 1) {
            messageFore1();
        }
        if (players[current].place == 2) {
            messageFore2();
        }
        players[current].fore = false;
        return;
    }

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " ходит";
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageArrow() {

// Игрок X движется по стрелке

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " движется по стрелке";
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageYellow() {

// Игрок X попал на жёлтую клетку и ходит ещё раз

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " попадает на ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.style.color = "yellow";
    p3.innerHTML = "жёлтую клетку";
    pathDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = " и ходит ещё раз";
    pathDiv.append(p4);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageOrange() {

// Игрок X попал на оранжевую клетку и ходит ещё 2 раза

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " попадает на ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.style.color = "orange";
    p3.innerHTML = "оранжевую клетку";
    pathDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = " и ходит ещё 2 раза";
    pathDiv.append(p4);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageGreen() {

// Игрок X попал на зелёную клетку и пропустит ход

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " попадает на ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.style.color = "green";
    p3.innerHTML = "зелёную клетку";
    pathDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = " и пропустит ход";
    pathDiv.append(p4);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageCheckpoint() {

// Игрок X достиг чекпойнта

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " достигает ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.style.color = "#308ae3";
    p3.innerHTML = "чекпойнта";
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageRed(black) {

// Игрок X попал на красную клетку! -1 ед. энергии

    if (curMap === Map15 && black && players[current].entity === "sup") {
        return;
    }

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " попадает на ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    if (black) {
        p3.style.color = "#766aa2";
        p3.innerHTML = "чёрную клетку! ";
    } else {
        p3.style.color = "red";
        p3.innerHTML = "красную клетку! ";
    }
    pathDiv.append(p3);

    if (curMap !== Map15) {
        let p4 = document.createElement("p");
        p4.innerHTML = "-1 ед. силы";
        pathDiv.append(p4);
    }

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageReturnCheckpoint() {

// Игрок X возвращается на чекпойнт

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " возвращается на ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.style.color = "#308ae3";
    if (curMap[cellIndex].teleportTo == 0) {
        p3.innerHTML = "старт";
    } else {
        p3.innerHTML = "чекпойнт";
    }
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageSkipMove() {

// Игрок X ПРОПУСКАЕТ ХОД

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " ПРОПУСКАЕТ ХОД";
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageAttack(rival) {

// Игрок X АТАКУЕТ Игрок Y!

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.style.color = "red";
    p2.innerHTML = " АТАКУЕТ ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.className = "log__player";
    p3.innerHTML = rival.label + "!";
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageAttackResult(rival) {

// Игрок Y пропустит ход, а Игрок X ходит ещё раз

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = rival.label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " пропустит ход, а ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.className = "log__player";
    p3.innerHTML = players[current].label;
    pathDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = " ходит ещё раз";
    pathDiv.append(p4);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageVampire(rival) {

// Игрок X УКУСИЛ Игрок Y!

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.style.color = "red";
    p2.innerHTML = " КУСАЕТ ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.className = "log__player";
    p3.innerHTML = rival.label + "!";
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageVampireResult(rival) {

// Игрок Y теряет 1 ед.силы и пропустит ход, а Игрок X получает 1 ед.силы и ходит ещё раз

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = rival.label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " теряет 1 ед.силы и пропустит ход, а ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.className = "log__player";
    p3.innerHTML = players[current].label;
    pathDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = " получает 1 ед.силы и ходит ещё раз";
    pathDiv.append(p4);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageAttackCancel(rival) {

// Игрок X передумал атаковать Игрок Y

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " передумал атаковать ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.className = "log__player";
    p3.innerHTML = rival.label + "!";
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageHatchCancel(rival) {

// Игрок X не смог атаковать Игрок Y

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " не смог атаковать ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.className = "log__player";
    p3.innerHTML = rival.label;
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageAttackNoOne() {

// Игрок X отказался от конфликта

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " отказывается от конфликта";
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageFinished() {

// Игрок X ФИНИШИРОВАЛ!

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.style.color = "orange";
    p2.innerHTML = " ФИНИШИРУЕТ!";
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageLose(player) {

// Игрок X СОШЁЛ С ДИСТАНЦИИ!

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = player.label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.style.color = "red";
    p2.innerHTML = " СХОДИТ С ДИСТАНЦИИ!";
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messagePlace(player, place) {

// Игрок X занял y место

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = player.label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " занимает ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.style.color = "orange";
    p3.innerHTML = place;
    pathDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = " место";
    pathDiv.append(p4);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageCritic() {

// У Игрок А критическая ситуация

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.innerHTML = "У ";
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.className = "log__player";
    p2.innerHTML = players[current].label;
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.style.color = "red";
    p3.innerHTML = " критическая ситуация";
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageFore1() {

// Игрок X в тот раз пришёл 1-м, поэтому ходит 3 раза подряд

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " в тот раз пришёл 1-м, поэтому ходит ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.style.color = "orange";
    p3.innerHTML = "3 раза подряд";
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageFore2() {

// Игрок X в тот раз пришёл 2-м, поэтому ходит 2 раза подряд

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " в тот раз пришёл 2-м, поэтому ходит ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.style.color = "orange";
    p3.innerHTML = "2 раза подряд";
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageBranchIn() {

// Игрок X должен выбрать путь

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " должен выбрать путь";
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageBranchOut() {

// Игрок X выбрал путь

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " выбрал путь";
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageMagnet(sup) {

// Ход магнитом

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.innerHTML = "Ход ";
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    if (sup) {
        p2.innerHTML = "супер-магнитом";
    } else {
        p2.innerHTML = "магнитом";
    }
    p2.style.color = "#308ae3";
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageMagnetSuccess(sup) {

// Магнит сработал! Загадано: x Выпало: x

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    if (sup) {
        p1.innerHTML = "Супер-магнит сработал! ";
    } else {
        p1.innerHTML = "Магнит сработал! ";
    }
    p1.style.color = "#6bec4d";
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = "Загадано: " + "<b>" + magnetScore + "</b>" + " Выпало: " + "<b>" + cubicScore + "</b>";
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageMagnetFailed(sup) {

// Магнит не сработал! Загадано: x Выпало: x

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    if (sup) {
        p1.innerHTML = "Супер-магнит не сработал! ";
    } else {
        p1.innerHTML = "Магнит не сработал! ";
    }
    p1.style.color = "#ff0000";
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = "Загадано: " + "<b>" + magnetScore + "</b>" + " Выпало: " + "<b>" + cubicScore + "</b>";
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageAttackArmor() {

// У Игрок X сорвалась атака: противник одет в броню

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.innerHTML = "У ";
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.className = "log__player";
    p2.innerHTML = players[current].label;
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.innerHTML = " сорвалась атака: соперник одет в ";
    pathDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = "броню";
    p4.style.color = "#abc5f4";
    pathDiv.append(p4);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageShieldPaid(attacking, defender, paid) {
    // Игрок X забирает $ 30 у Игрок Y

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = defender.label;
    pathDiv.append(p1);

    let p3 = document.createElement("p");
    p3.innerHTML = " забирает " + paid + "$";
    p3.style.color = "#abc5f4";
    pathDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = " у ";
    pathDiv.append(p4);

    let p2 = document.createElement("p");
    p2.className = "log__player";
    p2.innerHTML = attacking.label;
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageArmorOn(player, iron) {

// Игрок X нацепил броню

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = player.label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " надевает ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    if (iron) {
        p3.innerHTML = "железную броню";
        p3.style.color = "#a262e4";
    } else {
        p3.innerHTML = "броню";
        p3.style.color = "#abc5f4";
    }
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageArmorOff(player) {

// Броня Игрок X пришла в негодность

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p2 = document.createElement("p");
    p2.innerHTML = "Броня ";
    pathDiv.append(p2);

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = player.label;
    pathDiv.append(p1);

    let p3 = document.createElement("p");
    p3.innerHTML = " пришла в негодность";
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageBonus(bonus) {

// Игрок X получил бонус +y $
// Игрок X нарвался на штраф -y $

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p3 = document.createElement("p");
    if (bonus > 0) {
        p3.innerHTML = " получит ";
        pathDiv.append(p3);

        let p4 = document.createElement("p");
        p4.innerHTML = "бонус +" + bonus + " $";
        p4.style.color = "#6bec4d";
        pathDiv.append(p4);
    } else {
        p3.innerHTML = " нарывается на ";
        pathDiv.append(p3);

        let p4 = document.createElement("p");
        p4.innerHTML = "штраф -" + bonus + " $";
        p4.style.color = "#ff0000";
        pathDiv.append(p4);
    }

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageStar(red) {

// Игрок X выхватил оранжевую звезду! +1 ед. силы

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " ловит ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    if (red) {
        p3.innerHTML = "красную звезду! ";
        p3.style.color = "#ff0000";
    } else {
        p3.innerHTML = "оранжевую звезду! ";
        p3.style.color = "#ff6f00";
    }
    pathDiv.append(p3);

    let p4 = document.createElement("p");
    if (red) {
        p4.innerHTML = "+2 ед. силы ";
    } else {
        p4.innerHTML = "+1 ед. силы ";
    }
    pathDiv.append(p4);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageSpeed() {

// Игрок X зарядился МОЛНИЕЙ. Очки на кубике x2 следующие 3 хода!

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " заряжается ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.innerHTML = "МОЛНИЕЙ. ";
    p3.style.color = "#308ae3";
    pathDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = "Очки на кубике x2 следующие 3 хода!";
    pathDiv.append(p4);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageJoker() {

// Клетка-джокер!

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p3 = document.createElement("p");
    p3.innerHTML = "Клетка-джокер!";
    p3.style.color = "#a262e4";
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageJokerOK() {

// Игрок X открывает сюрприз: тип

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p2 = document.createElement("p");
    p2.innerHTML = "Сюрприз: ";
    p2.style.color = "#a262e4";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    if (selectedType === "yellow") {
        p3.innerHTML = "ЖЁЛТАЯ КЛЕТКА";
    }
    if (selectedType === "orange") {
        p3.innerHTML = "ОРАНЖЕВАЯ КЛЕТКА";
    }
    if (selectedType === "green") {
        p3.innerHTML = "ЗЕЛЁНАЯ КЛЕТКА";
    }
    if (selectedType === "red") {
        p3.innerHTML = "КРАСНАЯ КЛЕТКА";
    }
    if (selectedType === "black") {
        p3.innerHTML = "ЧЁРНАЯ КЛЕТКА";
    }
    if (selectedType === "starOrange") {
        p3.innerHTML = "ОРАНЖЕВАЯ ЗВЕЗДА";
    }
    if (selectedType === "starRed") {
        p3.innerHTML = "КРАСНАЯ ЗВЕЗДА";
    }
    if (selectedType === "speed") {
        p3.innerHTML = "МОЛНИЯ";
    }
    if (typeof selectedType === "number") {
        if (selectedType < 0) {
            p3.innerHTML = "ШТРАФ";
        } else {
            p3.innerHTML = "БОНУС";
        }
    }
    if (selectedType === "magnet") {
        p3.innerHTML = "получен предмет МАГНИТ";
    }
    if (selectedType === "smagnet") {
        p3.innerHTML = "получен предмет СУПЕР-МАГНИТ";
    }
    if (selectedType === "shield") {
        p3.innerHTML = "получен предмет ЩИТ";
    }
    if (selectedType === "ishield") {
        p3.innerHTML = "получен предмет ЖЕЛЕЗНЫЙ ЩИТ";
    }
    if (selectedType === "trap") {
        p3.innerHTML = "получен предмет КАПКАН";
    }
    if (selectedType === "vampire") {
        p3.innerHTML = "получен предмет ВАМПИРСКИЕ КЛЫКИ";
    }
    if (!selectedType) {
        p3.innerHTML = "предмет не получен";
        p3.style.color = "#ff0000";
    }
    pathDiv.append(p3);

    if (!selectedType) {
        let p4 = document.createElement("p");
        p4.innerHTML = " (инвентарь игрока переполнен)";
        pathDiv.append(p4);
    }

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageSpeedOver() {

// Игрок X остался без молнии

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " остаётся без ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.innerHTML = "МОЛНИИ";
    p3.style.color = "#308ae3";
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageDeadend() {

// Игрок X упёрся лбом в стенку

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " упирается лбом в ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.innerHTML = "стенку";
    p3.style.color = "#00c779";
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageArrowBlue() {

// Игрок X должен выполнить условие на синей стрелке

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " должен выполнить условие на ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.innerHTML = "синей стрелке";
    p3.style.color = "#225cff";
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageBuyModel(player, model) {

// Игрок X покупает [жёлтую] фишку

    createNewLog(true);
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = player.label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " покупает ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    switch (model) {
        case "yellow":
            p3.innerHTML = "ЖЁЛТУЮ";
            p3.style.color = "#facb3a";
            break;
        case "red":
            p3.innerHTML = "КРАСНУЮ";
            p3.style.color = "#ff2121";
            break;
        case "green":
            p3.innerHTML = "ЗЕЛЁНУЮ";
            p3.style.color = "#3db623";
            break;
        case "blue":
            p3.innerHTML = "СИНЮЮ";
            p3.style.color = "#216dff";
            break;
        case "brown":
            p3.innerHTML = "КОРИЧНЕВУЮ";
            p3.style.color = "#af7c5a";
            break;
        case "black":
            p3.innerHTML = "ЧЁРНУЮ";
            p3.style.color = "#909090";
            break;
    }
    pathDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = " фишку";
    pathDiv.append(p4);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageCatch() {

    // Игрок X далеко ПОЗАДИ! Очки на кубике x2

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " отстаёт от соперников! ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.innerHTML = "Очки на кубике x2";
    p3.style.color = "#308ae3";
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageIMP(yes) {

// Невозможный кубик сработал! Выпало: x

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    if (players[current].type === "human") {
        p1.innerHTML = "Невозможный кубик ";
    } else {
        p1.innerHTML = "Секретный предмет ";
    }
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    if (yes) {
        p2.innerHTML = "сработал! ";
        p2.style.color = "#6bec4d";
    } else {
        p2.innerHTML = "не сработал! ";
        p2.style.color = "#ff0000";
    }
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.innerHTML = " Выпало: " + "<b>" + cubicScore + "</b>";
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageIMPmove() {

// Ход невозможным кубиком

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p2 = document.createElement("p");
    p2.innerHTML = "Ход ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    if (players[current].type === "human") {
        p3.innerHTML = "невозможным кубиком";
    } else {
        p3.innerHTML = "секретным предметом";
    }
    p3.style.color = "#fff64d";
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageMop(num) {

// Игрок X удалил красную клетку № Y

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " УДАЛЯЕТ ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.innerHTML = "красную клетку ";
    p3.style.color = "#ff0000";
    pathDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = "№ " + num;
    pathDiv.append(p4);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageTrap(num) {

// Игрок X поставил КАПКАН на клетку № Y

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " размещает ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.innerHTML = "КАПКАН ";
    p3.style.color = "#c9712e";
    pathDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = "на клетке № " + num;
    pathDiv.append(p4);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageTrapSelf() {

// Игрок X попадает в свой же КАПКАН! Пропустит ход

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " попадает в свой же ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.innerHTML = "КАПКАН! ";
    p3.style.color = "#c9712e";
    pathDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = "Теперь пропустит ход";
    pathDiv.append(p4);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageTrapSuccess(owner) {

// Игрок X попадает в КАПКАН! Игрок X выплатит Игрок Y 400$ и пропустит ход

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " попадает в ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.innerHTML = "КАПКАН! ";
    p3.style.color = "#c9712e";
    pathDiv.append(p3);

    if (players[current].entity !== "none") {
        let p5 = document.createElement("p");
        p5.innerHTML = "Пропустит ход";
        pathDiv.append(p5);

    } else {
        let p4 = document.createElement("p");
        p4.className = "log__player";
        p4.innerHTML = players[current].label;
        pathDiv.append(p4);

        let p5 = document.createElement("p");
        p5.innerHTML = " выплатит ";
        pathDiv.append(p5);

        let p6 = document.createElement("p");
        p6.className = "log__player";
        p6.innerHTML = owner.label;
        pathDiv.append(p6);

        let p7 = document.createElement("p");
        p7.innerHTML = " " + trapPower + "$ и пропустит ход";
        pathDiv.append(p7);
    }

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageTrapRemove(num) {

// КАПКАН на клетке № ХХ разобран

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.innerHTML = "КАПКАН ";
    p1.style.color = "#c9712e";
    pathDiv.append(p1);

    let p4 = document.createElement("p");
    p4.innerHTML = "на клетке № " + num + " разобран";
    pathDiv.append(p4);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageHatched(rival) {

// Игрок Х ВЫКИНУЛ Игрок Y с трассы!

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " УДАЛЯЕТ ";
    p2.style.color = "#ff0000";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.className = "log__player";
    p3.innerHTML = rival.label;
    pathDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = " с трассы!";
    pathDiv.append(p4);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageMB(player) {

// Игрок X попал в КОПИЛКУ

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = player.label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " попадает в ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.innerHTML = "КОПИЛКУ";
    p3.style.color = "#b7ff35";
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageMBno() {

// Игрок X не стал пользоваться КОПИЛКОЙ

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " выходит из ";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.innerHTML = "КОПИЛКИ";
    p3.style.color = "#b7ff35";
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageMByes() {

// Игрок X взял из КОПИЛКИ бонус: +40$ +1 ед.силы

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " берёт из ";
    pathDiv.append(p2);

    let p5 = document.createElement("p");
    p5.innerHTML = "КОПИЛКИ";
    p5.style.color = "#b7ff35";
    pathDiv.append(p5);

    let p6 = document.createElement("p");
    p6.innerHTML = " бонус: ";
    pathDiv.append(p6);

    let p3 = document.createElement("p");
    p3.style.color = "#6bec4d";
    if (moneybagStep < 6) {
        p3.innerHTML = "+" + mbPrize1 + "$";
        pathDiv.append(p3);
    } else {
        p3.innerHTML = "+" + mbPrize2 + "$";
        pathDiv.append(p3);
        let p4 = document.createElement("p");
        p4.style.color = "#95caff";
        p4.innerHTML = " +1 ед.силы";
        pathDiv.append(p4);
    }

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageManip(num) {

// Игрок X переместил зелёную клетку № X

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " переместил зелёную клетку № " + num;
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageSkull() {

// Игрок X УКУШЕН черепом!

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[3].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    if (players[3].power < 0) {
        p2.innerHTML = " СЪЕДЕН ЧЕРЕПОМ!";
    } else {
        p2.innerHTML = " УКУШЕН ЧЕРЕПОМ!";
    }
    p2.style.color = "#ff0000";
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageSuper(type) {

// Вы попали на супер-фишку! -1 ед. силы
// На Вас встала супер-фишка! -2 ед. силы

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    let p4 = document.createElement("p");

    if (type === "user") {
        p2.innerHTML = "На Вас встала ";
        pathDiv.append(p2);

        p3.innerHTML = "супер-фишка! ";
        p3.style.color = "#ffb637";
        pathDiv.append(p3);

        p4.innerHTML = "-2 ед. силы";
        pathDiv.append(p4);
    }

    if (type === "super") {
        p2.innerHTML = "Вы попали на ";
        pathDiv.append(p2);

        p3.innerHTML = "супер-фишку! ";
        p3.style.color = "#ffb637";
        pathDiv.append(p3);

        p4.innerHTML = "-1 ед. силы";
        pathDiv.append(p4);
    }

    if (type === "hatch") {
        p2.innerHTML = "Вы попали на ";
        pathDiv.append(p2);

        p3.innerHTML = "супер-фишку ";
        p3.style.color = "#ffb637";
        pathDiv.append(p3);

        p4.innerHTML = "в ЗОНЕ ЗАХВАТА! -2 ед. силы";
        pathDiv.append(p4);
    }

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageSuperShield() {

// Ваша броня снизила урон на 1 ед.

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.innerHTML = "Ваша ";
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = "броня";
    p2.style.color = "#abc5f4";
    pathDiv.append(p2);

    let p3 = document.createElement("p");
    p3.innerHTML = " снизила урон на 1 ед.";
    pathDiv.append(p3);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageStartEscape() {

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = "ПОБЕГ НАЧИНАЕТСЯ! ";
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = "Успейте дойти до финиша вдвоём за " + bombTimer + " ходов";
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);

    messageMoving();
}

function messageHostageLose() {

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " не смогла дойти до выхода";
    p2.style.color = "red";
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageEscapeSuccess(player) {

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = player.label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " УСПЕВАЕТ СБЕЖАТЬ!";
    p2.style.color = "orange";
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}