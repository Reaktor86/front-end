setTimeout(function () {
// вставляй сюда доп-код для диагностики
    console.log("Сработала автозагрузка");
    /*jumpToCell(playerA, 27);
    jumpToCell(playerB, 27);
    jumpToCell(playerC, 27);
    jumpToCell(playerD, 27);*/
}, 1000);

// подготовка

let isPedestal1Free = true;
let isPedestal2Free = true;
let isPedestal3Free = true;
let isPedestal4Free = true;
let playersCount = 4;

class Players {

    power = 0
    bonusMoves = 0
    skipMoves = 0
    currentCell = 0
    protection = true // защита от атак на чекпойнте, пьедестале, старте и т.п.
    finished = false
    place = 0 // какое место занял?
    shiftPos = 1 // позиция, если на одной клетке много соперников, по умолчанию 1, самое высокое 4

    constructor(name, label, model, moveOrder) {
        this.name = name;
        this.model = model;
        this.moveOrder = moveOrder;
        this.label = label;
    }
}

let playerA = new Players(document.querySelector(".player-A"), "Игрок A","white", 1);
let playerB = new Players(document.querySelector(".player-B"), "Игрок B","white", 2);
let playerC = new Players(document.querySelector(".player-C"), "Игрок C","white", 3);
let playerD = new Players(document.querySelector(".player-D"), "Игрок D","white", 4);

playerA.name.style.backgroundImage = "url(\"img/token_a_white.png\")";
playerB.name.style.backgroundImage = "url(\"img/token_b_white.png\")";
playerC.name.style.backgroundImage = "url(\"img/token_c_white.png\")";
playerD.name.style.backgroundImage = "url(\"img/token_d_white.png\")";

let players = [playerA, playerB, playerC, playerD];

setMoveOrder();

// задать порядок, в котором будут ходить игроки

function setMoveOrder() {
    players.sort(function(a, b){
        return a.moveOrder - b.moveOrder
    })
}

let current = 0;

// расстановка фишек по местам

players[0].name.style.left = "160px";
players[0].name.style.top = "560px";
players[1].name.style.left = "160px";
players[1].name.style.top = "600px";
players[2].name.style.left = "160px";
players[2].name.style.top = "640px";
players[3].name.style.left = "160px";
players[3].name.style.top = "680px";

// свечение current player и анимация

let playerGlow = document.querySelectorAll(".player__glow");

for (let i = 0; i < playerGlow.length; i++) {
    setInterval( function () {
        playerGlow[i].classList.add("player__glow-end");
        setTimeout( function () {
            playerGlow[i].classList.remove("player__glow-end");
            playerGlow[i].classList.add("player__glow-start");
        }, 500);
        setTimeout( function () {
            playerGlow[i].classList.remove("player__glow-start");
        }, 1000);
    }, 1000);
}

// канцелярские кнопки на фишках

function setNail(playerName, skip) {
    console.log("Будет поставлен гвоздик: " + skip);
    let addressNail = playerName.querySelector(".player__nail");
    switch (skip) {
        case 0:
            addressNail.classList.remove("player__nail-act");
            break;
        case 1:
            addressNail.setAttribute("src", "img/nail-1.png");
            addressNail.classList.add("player__nail-act");
            break;
        case 2:
            addressNail.setAttribute("src", "img/nail-2.png");
            addressNail.classList.add("player__nail-act");
            break;
        default:
            addressNail.setAttribute("src", "img/nail-3.png");
            addressNail.classList.add("player__nail-act");
    }
}

// задать энергию

let powerA = [
    document.querySelector(".powercell--a1"),
    document.querySelector(".powercell--a2"),
    document.querySelector(".powercell--a3"),
    document.querySelector(".powercell--a4"),
    document.querySelector(".powercell--a5"),
    document.querySelector(".powercell--a6"),
    document.querySelector(".powercell--a7"),
    document.querySelector(".powercell--a8"),
    document.querySelector(".powercell--a9"),
    document.querySelector(".powercell--a10"),
]

let powerB = [
    document.querySelector(".powercell--b1"),
    document.querySelector(".powercell--b2"),
    document.querySelector(".powercell--b3"),
    document.querySelector(".powercell--b4"),
    document.querySelector(".powercell--b5"),
    document.querySelector(".powercell--b6"),
    document.querySelector(".powercell--b7"),
    document.querySelector(".powercell--b8"),
    document.querySelector(".powercell--b9"),
    document.querySelector(".powercell--b10"),
]

let powerC = [
    document.querySelector(".powercell--c1"),
    document.querySelector(".powercell--c2"),
    document.querySelector(".powercell--c3"),
    document.querySelector(".powercell--c4"),
    document.querySelector(".powercell--c5"),
    document.querySelector(".powercell--c6"),
    document.querySelector(".powercell--c7"),
    document.querySelector(".powercell--c8"),
    document.querySelector(".powercell--c9"),
    document.querySelector(".powercell--c10"),
]

let powerD = [
    document.querySelector(".powercell--d1"),
    document.querySelector(".powercell--d2"),
    document.querySelector(".powercell--d3"),
    document.querySelector(".powercell--d4"),
    document.querySelector(".powercell--d5"),
    document.querySelector(".powercell--d6"),
    document.querySelector(".powercell--d7"),
    document.querySelector(".powercell--d8"),
    document.querySelector(".powercell--d9"),
    document.querySelector(".powercell--d10"),
]

let powerset = [powerA, powerB, powerC, powerD];

setPower();

function setPower() {
    for (let i = 0; i < players.length; i++) {

        switch (players[i].model) {
            case "white":
                players[i].power = 2;
                break;
            case "yellow":
                players[i].power = 3;
                break;
            case "red":
                players[i].power = 4;
                break;
            case "green":
                players[i].power = 5;
                break;
            case "blue":
                players[i].power = 6;
                break;
            case "brown":
                players[i].power = 8;
                break;
            case "black":
                players[i].power = 10;
                break;
        }
    }
    refreshPowercells();
}

// обновить ячейки энергии - сработает, только если энергия игрока не опустилась меньше нуля

function refreshPowercells() {
    if ( players[current].power >= 0 ) {
        for (let j = 0; j < powerset.length; j++) {
            for (let i = 0; i < players[j].power; i++) {
                powerset[j][i].classList.remove("powercell__off");
                powerset[j][i].classList.add("powercell__on");
            }
            for (let x = players[j].power; x < 10; x++) {
                powerset[j][x].classList.remove("powercell__on");
                powerset[j][x].classList.add("powercell__off");
            }
        }
    }
}

// разное

let divScore = document.createElement("div");
let cubic = document.querySelector(".cubic");
let cubicScore;
cubic.addEventListener('click', throwCubic, {once: true});
let stepsCounter = 0; // считалка ходов
let stId; // запоминает id клетки, с которой игрок начал движение
let cpId; // какой id чекпойнта в загруженной карте?
for (let i = 0; i < Map01.length; i++) {
    if (Map01[i].type == "checkpoint") {
        cpId = Map01[i].cellid;
        break;
    }
}
let playerRival = [];
let selectedRival;

showGlobalsBeforeRace();

// НАЧАЛО ИГРЫ

moveInfo();

// бросание кубика
// чтобы бросить на любое число, введи в консоль throwCubic(число)

function throwCubic(num) {

    stId = players[current].currentCell;
    divScore.remove();

    if (players[current].skipMoves > 0) { // проверка на пропуск хода
        console.log(players[current].label + " ПРОПУСКАЕТ ХОД");
        skipInfo();
        messageSkipMove();
        players[current].skipMoves--;
        setTimeout(function () {
            setNail(players[current].name, players[current].skipMoves);
        }, 2000);
        setTimeout(moveIsOver, 2000);
    } else {

    if (typeof num == "number") { // условие для чит-кода
        cubicScore = num;
    } else {
        cubicScore = Math.ceil(Math.random() * 6); // святая святых! бросание кубика
    }

    //анимация
        cubic.setAttribute("src", "img/cubic_spin.gif");
        setTimeout( function () {
            switch (cubicScore) {
                case 1:
                    cubic.setAttribute("src", "img/cubic_1.png");
                    break;
                case 2:
                    cubic.setAttribute("src", "img/cubic_2.png");
                    break;
                case 3:
                    cubic.setAttribute("src", "img/cubic_3.png");
                    break;
                case 4:
                    cubic.setAttribute("src", "img/cubic_4.png");
                    break;
                case 5:
                    cubic.setAttribute("src", "img/cubic_5.png");
                    break;
                case 6:
                    cubic.setAttribute("src", "img/cubic_6.png");
                    break;
                default:
                    cubic.setAttribute("src", "img/cubic_1.png");
            }
        }, 1500)

        console.log("На кубике: " + cubicScore);
        players[current].name.style.transition = ".2s";
        players[current].protection = false;
        setTimeout(unshiftTokens, 3000);
        setTimeout(move, 3000);
    }
}

function moveInfo() {
//ваш ход!
    divScore.className = "move-info";
    divScore.innerHTML = "<p>ваш ход!</p>";
    let addressField = document.querySelector(".field");
    addressField.append(divScore);
    let addressP = divScore.querySelector("p");
    addressP.className = "move-info__yours";
}

function skipInfo() {
//пропуск
    divScore.remove();
    divScore.className = "move-info";
    divScore.innerHTML = "<p>пропуск</p>";
    let addressField = document.querySelector(".field");
    addressField.append(divScore);
    let addressP = divScore.querySelector("p");
    addressP.className = "move-info__skip";
}

// сменить игрока
// ВАЖНО! Этот код должен исполняться только при условии, что предыдущий ход ПОЛНОСТЬЮ завершен, иначе будут баги

function changePlayer() {

    if (players[current].bonusMoves == 0) { // проверка на доп-ходы
        current++;
        if (current == 4) {
            current = 0;
        }
        console.log("смена игрока");
    } else {
        players[current].bonusMoves--;
    }
}

// движение фишки на определенное число ходов после броска кубика
// ОСТОРОЖНО! Активирует саму себя несколько раз

function move() {

    if ( getNextMoveDirection() ) { // выполняется, если игрок еще не дошёл до финиша
        players[current].currentCell++;
        stepsCounter++;

        if( stepsCounter < cubicScore ){
            setTimeout( move, 300 );
        }
    }

    // выполняется в момент окончания движения:

    if (stepsCounter == cubicScore) {
        stepsCounter = 0;
        showGlobals();
        getConditionAfterMove(); // выход из функции move
    }
}

// определение направления движения + совершение движения

function getNextMoveDirection() {

    let getCellId = players[current].currentCell;

    switch (Map01[getCellId].nextStep) {
        case "top":
            moveOneStepTop();
            return true;
        case "left":
            moveOneStepLeft();
            return true;
        case "right":
            moveOneStepRight();
            return true;
        case "down":
            moveOneStepDown();
            return true;
        case "start":
            executeTeleport();
            return true;
        case "pedestal":
            stepsCounter = cubicScore;
            return false;
    }
}

// движение фишки на следующую клетку ВПРАВО

function moveOneStepRight() {
    let currentLeft = window.getComputedStyle(players[current].name).left;
    let numEl = parseInt(currentLeft.replace(/[px]/g, ''));
    players[current].name.style.left = numEl + 40 + "px";
}

// движение фишки на следующую клетку ВЛЕВО

function moveOneStepLeft() {
    let currentLeft = window.getComputedStyle(players[current].name).left;
    let numEl = parseInt(currentLeft.replace(/[px]/g, ''));
    players[current].name.style.left = numEl - 40 + "px";
}

// движение фишки на следующую клетку ВВЕРХ

function moveOneStepTop() {
    let currentTop = window.getComputedStyle(players[current].name).top;
    let numEl = parseInt(currentTop.replace(/[px]/g, ''));
    players[current].name.style.top = numEl - 40 + "px";
}

// движение фишки на следующую клетку ВНИЗ

function moveOneStepDown() {
    let currentTop = window.getComputedStyle(players[current].name).top;
    let numEl = parseInt(currentTop.replace(/[px]/g, ''));
    players[current].name.style.top = numEl + 40 + "px";
}

// визуальное смещение фишки, если на клетке есть соперники

function shiftTokens(count) {

    let dir = Map01[players[current].currentCell].shift
    console.log("смещение текущего игрока = " + dir);

    switch (count) { // сколько игроков на клетке, на которую current player попал?
        case 1:
            players[current].shiftPos = 2;
            switch (dir) {
                case "up":
                    players[current].name.style.marginTop = "-25px";
                    break;
                case "down":
                    players[current].name.style.marginTop = "1px";
                    break;
                case "right":
                    players[current].name.style.marginLeft = "11px";
                    break;
                case "left":
                    players[current].name.style.marginLeft = "-15px";
                    break;
            }
            break;

        case 2:
            players[current].shiftPos = 3;
            switch (dir) {
                case "up":
                    players[current].name.style.marginTop = "-38px";
                    break;
                case "down":
                    players[current].name.style.marginTop = "14px";
                    break;
                case "right":
                    players[current].name.style.marginLeft = "24px";
                    break;
                case "left":
                    players[current].name.style.marginLeft = "-28px";
                    break;
            }
            break;

        case 3:
            players[current].shiftPos = 4;
            switch (dir) {
                case "up":
                    players[current].name.style.marginTop = "-51px";
                    break;
                case "down":
                    players[current].name.style.marginTop = "27px";
                    break;
                case "right":
                    players[current].name.style.marginLeft = "37px";
                    break;
                case "left":
                    players[current].name.style.marginLeft = "-41px";
                    break;
            }
            break;
    }
}

// сброс смещения фишки

function unshiftTokens() {
    let pos = players[current].shiftPos;
    console.log("ступень текущего игрока: " + pos)
    let rivalsArray = getRivalsArray();
    let dir = Map01[players[current].currentCell].shift
    let spec = []; // массив, в котором будут храниться игроки, у которых надо уменьшить shiftPos

    for (let i = 0; i < rivalsArray.length; i++) { // собрать всех игроков, которые занимают позицию выше, чем current player

        if (rivalsArray[i].shiftPos > pos) {

            console.log(rivalsArray[i].label + " будет смещен");
            spec.push(rivalsArray[i]);
            let cutTop = window.getComputedStyle(rivalsArray[i].name).marginTop;
            let numTop = parseInt(cutTop.replace(/[px]/g, ''));
            console.log("marginTop " + numTop);
            let cutLeft = window.getComputedStyle(rivalsArray[i].name).marginLeft;
            let numLeft = parseInt(cutLeft.replace(/[px]/g, ''));
            console.log("marginLeft " + numLeft);

            switch (dir) {
                case "up":
                    rivalsArray[i].name.style.marginTop = numTop + 13 + "px";
                    break;
                case "down":
                    rivalsArray[i].name.style.marginTop = numTop - 13 + "px";
                    break;
                case "right":
                    rivalsArray[i].name.style.marginLeft = numLeft - 13 + "px";
                    break;
                case "left":
                    rivalsArray[i].name.style.marginLeft = numLeft + 13 + "px";
                    break;
            }
        }
    }

    for (let i = 0; i < spec.length; i++) { // уменьшить показатель позиции
        console.log("уменьшается ступень для " + spec[i].label)
        spec[i].shiftPos--;
    }
    players[current].name.style.marginTop = "-12px";
    players[current].name.style.marginLeft = "-2px";
    players[current].shiftPos = 1;
}


// движение фишки на ПЬЕДЕСТАЛ

function moveToPedestal() {
    console.log("произошел вызов функции пьедестал");
    players[current].name.style.transition = ".5s";
    playersCount--;
    players[current].finished = true;
    players[current].protection = true;
    players[current].currentCell = -1;
    console.log("Защита = true");

    if (players[current].power >= 0) { // игрок дошел до финиша, займёт самое высокое возможное место
        let check = getMyWinPlace();
        for (let i = 0; i < Map01.length; i++) {
            if ( Map01[i].cellid == check ) {
                players[current].name.style.left = Map01[i].coorX + "px";
                players[current].name.style.top = Map01[i].coorY + "px";
                console.log(players[current].label + " ДОШЕЛ ДО ФИНИША");
                messageFinished();
                break;
            }
        }

    } else { // игрок проиграл и займёт последнее возможное место
        let check = getMyLosePlace();
        for (let i = 0; i < Map01.length; i++) {
            if ( Map01[i].cellid == check ) {
                players[current].name.style.left = Map01[i].coorX + "px";
                players[current].name.style.top = Map01[i].coorY + "px";
                console.log(players[current].label + " ВЫЛЕТЕЛ С ТРАССЫ");
                messageLose();
                break;
            }
        }
    }
    messagePlace(players[current].place);
}

// каким я дошёл до финиша?

function getMyWinPlace() {
    console.log("проверка каким я дошел до финиша");
    if (isPedestal1Free) {
        isPedestal1Free = false;
        players[current].place = 1;
        return "fin1";
    } else if (isPedestal2Free) {
        isPedestal2Free = false;
        players[current].place = 2;
        return "fin2";
    } else if (isPedestal3Free) {
        isPedestal3Free = false;
        players[current].place = 3;
        return "fin3";
    } else {
        isPedestal4Free = false;
        players[current].place = 4;
        return "fin4";
    }
}

// насколько сильно я опозорился?

function getMyLosePlace() {
    console.log("проверка на позор");
    if (isPedestal4Free) {
        isPedestal4Free = false;
        players[current].place = 4;
        return "fin4";
    } else if (isPedestal3Free) {
        isPedestal3Free = false;
        players[current].place = 3;
        return "fin3";
    } else if (isPedestal2Free) {
        isPedestal2Free = false;
        players[current].place = 2;
        return "fin2";
    } else {
        isPedestal1Free = false;
        players[current].place = 1;
        return "fin1";
    }
}

// проверка состояния по окончании хода
// ОСТОРОЖНО! Если игрок переместился по стрелке, функция активируется еще раз

function getConditionAfterMove() {

    let getCellId = players[current].currentCell;

    if (Map01[getCellId].type != "arrow" ) { // выполняется, если игрок не на стрелке

        if (stId < cpId && getCellId >= cpId) { // игрок пересек чекпойнт
            messageCheckpoint();
        }

        playerRival = getRivalsArray(); // работа с соперниками на клетке
        let check = false;
        if (playerRival.length > 0) {
            console.log("Соперников: " + playerRival.length);
            check = getProtectionStatus(playerRival);
            setTimeout(shiftTokens, 50, playerRival.length); // смещение фишки после приземления на клетку с соперниками
            setTimeout(getConflictStatus, 500, check); // внутри активируется popup и getCellType
        } else {
            setTimeout(getCellType, 500);
        }

    } else { // игрок на стрелке
        setTimeout(getCellType, 500); // внутри активируется getConditionAfterMove
    }
}

// проверка условия на клетке //
// не забыть поставить таймаут 500!!!

function getCellType() {

    let getCellId = players[current].currentCell;
    switch (Map01[getCellId].type) {
        case "arrow":
            console.log(players[current].label + " на стрелке");
            messageArrow();
            executeTeleport();
            setTimeout( getConditionAfterMove, 500);
            break;
        case "yellow":
            console.log(players[current].label + " на желтой клетке ХОДИТ ЕЩЕ РАЗ");
            executeYellow();
            break;
        case "green":
            console.log(players[current].label + " на зеленой клетке ПРОПУСТИТ ХОД");
            executeGreen(); // завершение хода
            break;
        case "checkpoint":
            console.log(players[current].label + " на чекпойнте");
            players[current].protection = true;
            console.log("Защита = true");
            moveIsOver();
            break;
        case "red":
            console.log(players[current].label + " на красной клетке");
            executeRed(); // завершение хода
            break;
        case "finish":
            console.log(players[current].label + " на финише");
            moveToPedestal();
            moveIsOver();
            break;
        default:
            console.log(players[current].label + " на обычной клетке");
            moveIsOver();
            break;
    }
}

// посчитать соперников

function getRivalsArray() {

    let rivalsArray = [];
    // посчитать соперников и занести их в массив
    for (let i = 0; i < players.length; i++) {
        if (players[i].currentCell == players[current].currentCell && players[i].name != players[current].name) {
            rivalsArray.push(players[i]);
        }
    }
    return rivalsArray;
}

// проверка статуса конфликта

function getConflictStatus(check) {

    if ( check == false ) { // если соперники защищены, атаки не произойдет

        if (players[current].power > 0) { // если у игрока достаточно энергии

            switch (playerRival.length) { // проверка, если соперников несколько
                case 1:
                    selectedRival = playerRival[0];
                    popupAttackOnce(selectedRival);
                    break;
                case 2:
                    popupAttackDouble(); // активирует attackOne, attackTwo, attackCancel, кнопку Выбрать другого
                    break;
                case 3:
                    popupAttackTriple(); // активирует attackOne, attackTwo, attackThree, attackCancel, кнопку Выбрать другого
                    break;
            }

        } else { // если у игрока энергия меньше 1-цы
            if (playerRival.length > 0) {
                popupAttackImp(); // активирует getCellType
            } else {
                setTimeout(getCellType, 500);
            }
        }

    } else { // соперники защищены - атаковать нельзя

        let getCellId = players[current].currentCell;
        if (Map01[getCellId].type == "checkpoint") {
            popupAttackImpCP(); // активирует getCellType
        } else {
            setTimeout(getCellType, 500);
        }

    }

}

// узнать, есть ли в массиве rivalsArray хотя бы один игрок с защитой от атаки

function getProtectionStatus(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].protection == true) {
            return true;
        }
    }
    return false;
}

// атака на 1 соперника: сказал да

function pressAttackYes() {

    hidePopup(AttackOnce, AttackOnceCont);
    AttackOnceOther.style.display = "none";
    console.log(selectedRival.label + " пропустит ход, а " + players[current].label + " ходит ещё раз");
    messageAttack(selectedRival);
    messageAttackResult(selectedRival);
    selectedRival.skipMoves++;
    setNail(selectedRival.name, selectedRival.skipMoves);
    players[current].bonusMoves++;
    players[current].power--;
    if (players[current].power == 0) {
        popupLowEnergy();
        messageCritic();
    } else {
        refreshPowercells();
        console.log(players[current].label + ": сила теперь = " + players[current].power);
        setTimeout(getCellType, 500);
    }
}
// атака на 1 соперника: сказал нет

function pressAttackNo() {
    hidePopup(AttackOnce, AttackOnceCont);
    AttackOnceOther.style.display = "none";
    console.log(players[current].label + " отказался от конфликта");
    messageAttackCancel(selectedRival);
    setTimeout(getCellType, 500);
}

// атака: выбрал первого

function pressAttackOne() {
    hidePopup(AttackDouble, AttackDoubleCont);
    hidePopup(AttackTriple, AttackTripleCont);
    selectedRival = playerRival[0];
    AttackOnceOther.style.display = "block";
    popupAttackOnce(selectedRival);
}

// атака: выбрал второго

function pressAttackTwo() {
    hidePopup(AttackDouble, AttackDoubleCont);
    hidePopup(AttackTriple, AttackTripleCont);
    selectedRival = playerRival[1];
    AttackOnceOther.style.display = "block";
    popupAttackOnce(selectedRival);
}

// атака: выбрал третьего

function pressAttackThree() {
    hidePopup(AttackTriple, AttackTripleCont);
    selectedRival = playerRival[2];
    AttackOnceOther.style.display = "block";
    popupAttackOnce(selectedRival);
}

// атака: отказался от любых атак (нажал Отмена)

function pressAttackCancel() {
    console.log(players[current].label + " отказался от конфликта");
    hidePopup(AttackDouble, AttackDoubleCont);
    hidePopup(AttackTriple, AttackTripleCont);
    messageAttackNoOne();
    setTimeout(getCellType, 500);
}

// атака: выбрать другого

function pressOtherRival() {
    hidePopup(AttackOnce, AttackOnceCont);
    hidePopup(AttackDouble, AttackDoubleCont);
    hidePopup(AttackTriple, AttackTripleCont);
    switch (playerRival.length) {
        case 2:
            popupAttackDouble();
            break;
        case 3:
            popupAttackTriple();
            break;
    }
}

// атака невозможна

function pressAttackImp() {
    console.log("Нажат ОК");
    hidePopup(AttackImp, AttackImpCont);
    setTimeout(getCellType, 500);
    if (players[current].power == 0) {
        refreshPowercells();
        console.log(players[current].label + ": сила теперь = " + players[current].power);
    }
}

// телепортация фишки

function executeTeleport() {
    let start = players[current].currentCell; // сохранить значение, откуда он телепортируется
    let tar = Map01[start]; // сохранить объект-клетку, с которой телепортируется
    stId = start;

    if (start != 0) {
        players[current].name.style.transition = ".5s";
    }
    if (start != 0) {
        players[current].currentCell += tar.idChange;
    }
// у игрока изменился currentCell
    console.log("Телепорт с " + start + " на " + Map01[tar.teleportTo].cellid);
    players[current].name.style.left = Map01[tar.teleportTo].coorX + "px";
    players[current].name.style.top = Map01[tar.teleportTo].coorY + "px";
}

// RED функция красной клетки - назад к чекпойнту, -1 ед энергии

function executeRed() {
    messageRed();
    players[current].power--;
    if (players[current].power < 0) {
        console.log("ПОРАЖЕНИЕ!");
        setTimeout(moveIsOver, 3000);
        setTimeout(moveToPedestal, 1000);
    } else {
        console.log(players[current].label + ": сила теперь = " + players[current].power);
        setTimeout(refreshPowercells, 500);
        players[current].protection = true;
        console.log("Защита = true");
        executeTeleport();
        messageReturnCheckpoint();
        setTimeout(checkShiftAfterRed, 500);
    }
}

// проверка смещения фишки после красной клетки

function checkShiftAfterRed() {
    let rivalsArray = getRivalsArray();
    if (rivalsArray.length > 0) {
        setTimeout(shiftTokens, 50, rivalsArray.length);
    }
    if (players[current].power == 0) {
        popupLowEnergy();
    } else {
        setTimeout(moveIsOver, 55);
    }
}

// YELLOW функция желтой клетки - дополнительный ход

function executeYellow() {
    players[current].bonusMoves++;
    messageYellow();
    moveInfo();
    changePlayer();
    cubic.addEventListener('click', throwCubic, {once: true});
}

// GREEN функция зеленой клетки - пропуск хода

function executeGreen() {
    players[current].skipMoves++;
    setNail(players[current].name, players[current].skipMoves);
    messageGreen();
    moveIsOver();
}

// исполняется по окончании хода

function moveIsOver() {

    let glowOld = players[current].name.querySelector(".player__glow");
    glowOld.classList.remove("player__glow-act");

    changePlayer();

    while (players[current].finished == true) {
        console.log(players[current].label + " отсутствует на поле");
        changePlayer();
    }

    if (playersCount < 2) {
        raceIsOver();
    } else {
        console.log(players[current].label + " ХОДИТ");
        messageMoving();
        moveInfo();
        let glowNew = players[current].name.querySelector(".player__glow");
        glowNew.classList.add("player__glow-act");
        cubic.addEventListener('click', throwCubic, {once: true});
    }
}

// исполняется по окончании заезда

function raceIsOver() {
    console.log("ЗАЕЗД ОКОНЧЕН");
    moveToPedestal();
    console.log("Результаты заезда: ");
    console.log(playerA.label + " занял место: " + playerA.place);
    console.log(playerB.label + " занял место: " + playerB.place);
    console.log(playerC.label + " занял место: " + playerC.place);
    console.log(playerD.label + " занял место: " + playerD.place);
}

// ДИАГНОСТИКА

function showGlobals() {
    console.log("Считалка ходов (должна быть = 0): " + stepsCounter);
    console.log(players[current].label + " на клетке №: " + players[current].currentCell);
}

function showGlobalsBeforeRace() {
    console.log(playerA.label + " сила: " + playerA.power);
    console.log(playerB.label + " сила: " + playerA.power);
    console.log(playerC.label + " сила: " + playerA.power);
    console.log(playerD.label + " сила: " + playerA.power);
    console.log(cpId);
}

// прыжок на определённую клетку

function jumpToCell(player, cell) {
    console.log(player.label + " телепорт на клетку " + cell);
    player.name.style.left = Map01[cell].coorX + "px";
    player.name.style.top = Map01[cell].coorY + "px";
    player.currentCell = cell;
}

