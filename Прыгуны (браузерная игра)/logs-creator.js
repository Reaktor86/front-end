function getNewTimeString() {
    let date = new Date();
    let dateStr = date.toString();
    return dateStr.substr(16,2) + ":" + dateStr.substr(19,2) + ":" + dateStr.substr(22,2);
}

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
    p2.innerHTML = " попал на ";
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
    p2.innerHTML = " попал на ";
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
    p2.innerHTML = " попал на ";
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
    p2.innerHTML = " достиг ";
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

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " попал на ";
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

    let p4 = document.createElement("p");
    p4.innerHTML = "-1 ед. силы";
    pathDiv.append(p4);

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
    p3.innerHTML = "чекпойнт";
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

function messageAttackNoOne() {

// Игрок X отказался от конфликта

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " отказался от конфликта";
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
    p2.innerHTML = " ФИНИШИРОВАЛ!";
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messageLose() {

// Игрок X СОШЁЛ С ДИСТАНЦИИ!

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.style.color = "red";
    p2.innerHTML = " СОШЁЛ С ДИСТАНЦИИ!";
    pathDiv.append(p2);

    setTimeout( function () {
        pathDiv.style.boxShadow = "none";
        pathDiv.style.opacity = "1";
    } , 20);
}

function messagePlace(place) {

// Игрок X занял y место

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " занял ";
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
    p3.innerHTML = " сорвалась атака: противник одет в ";
    pathDiv.append(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = "броню";
    p1.style.color = "#abc5f4";
    pathDiv.append(p4);

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
    p2.innerHTML = " нацепил ";
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
        p3.innerHTML = " нарвался на ";
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
    p2.innerHTML = " выхватил ";
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
    p2.innerHTML = " зарядился ";
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

function messageSpeedOver() {

// Игрок X остался без молнии

    createNewLog();
    let pathDiv = pathLog.querySelector(".log__message");

    let p1 = document.createElement("p");
    p1.className = "log__player";
    p1.innerHTML = players[current].label;
    pathDiv.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = " остался без ";
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
    p2.innerHTML = " упёрся лбом в ";
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
