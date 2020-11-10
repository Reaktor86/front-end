//автозапуск

window.onload = function() {
    console.log("Сработала автозагрузка");
    /*players[0].type = "human";
    players[1].type = "human";
    players[2].type = "human";*/

    setTimeout(function () { // с этой функции начинаются все скрипты в игре
        showPopup(enterName, enterNameCont, 300, 200, true);
        console.log("Вызвалось окно ввода имени");
    }, 100);
}

// глобальные константы

const divScore = document.querySelector(".move__info-p")
const cubic = document.querySelector(".cubic");
const overlayCubic = document.querySelector(".overlay__cubic");
const costYellow = 350;
const costRed = 600;
const costGreen = 1000;
const costBlue = 1600;
const costBrown = 2300;
const costBlack = 3000;
const powerWhite = 2;
const powerYellow = 3;
const powerRed = 4;
const powerGreen = 5;
const powerBlue = 6;
const powerBrown = 8;
const powerBlack = 10;

// глобальные переменные
let cubicScore;
let stepsCounter = 0; // считалка ходов
let stId; // запоминает id клетки, с которой игрок начал движение
let playerRival = []; // массив текущих соперников
let selectedRival; // выбранный игроком соперник
let gameSpeed = 1.6; // скорость игры. 1 - быстрая, 1.6 - нормальная
let raceInterrupt = false; // решил ли человеческий игрок досрочно закончить трассу
let isPedestal1Free = true;
let isPedestal2Free = true;
let isPedestal3Free = true;
let isPedestal4Free = true;
let playersCount = 4;
let current = 0; // индекс текущего игрока

class Players {

    type = "human"
    aiType = "balanced"
    capital = 0
    power = 0
    bonusMoves = 0
    skipMoves = 0
    currentCell = 0
    protection = true // защита от атак на чекпойнте, пьедестале, старте и т.п.
    finished = false
    place = 0 // какое место занял?
    shiftPos = 1 // если на одной клетке много соперников: смещение на ступень. По умолчанию ступень = 1, самое высокое 4

    constructor(name, label, model, moveOrder, type) {
        this.name = name;
        this.model = model;
        this.moveOrder = moveOrder;
        this.label = label;
        this.type = type;
    }
}

let nameList = [];
generateNames();

function generateNames() {
    // не должно быть повторов, первая буква в каждом имени разная
    let namesIndex;

    for (let i = 0; i < 4; i++) {

        let letters = []; // вычисление первых букв каждого имени в массиве nameList
        for (let j = 0; j < nameList.length; j++) {
            letters.push( nameList[j][0] );
        }

        do {
            namesIndex = Math.floor( Math.random() * names.length);
        } while ( nameList.includes( names[namesIndex] ) || letters.includes( names[namesIndex][0] ) );
        nameList.push( names[namesIndex] );
    }

    //задать имена в табло
    let name1 = document.querySelector(".info__player-label--A");
    name1.innerHTML = nameList[0];
    let name2 = document.querySelector(".info__player-label--B");
    name2.innerHTML = nameList[1];
    let name3 = document.querySelector(".info__player-label--C");
    name3.innerHTML = nameList[2];
}

let playerA = new Players(document.querySelector(".player-A"), nameList[0],"white", 1, "comp");
let playerB = new Players(document.querySelector(".player-B"), nameList[1],"white", 2, "comp");
let playerC = new Players(document.querySelector(".player-C"), nameList[2],"white", 3, "comp");
let playerD = new Players(document.querySelector(".player-D"), "Игрок D","white", 4, "human");

playerA.name.setAttribute("title", playerA.label);
playerB.name.setAttribute("title", playerB.label);
playerC.name.setAttribute("title", playerC.label);
playerD.name.setAttribute("title", playerD.label);
playerA.name.style.backgroundImage = "url(\"img/token_a_white.png\")";
playerB.name.style.backgroundImage = "url(\"img/token_b_white.png\")";
playerC.name.style.backgroundImage = "url(\"img/token_c_white.png\")";
playerD.name.style.backgroundImage = "url(\"img/token_d_white.png\")";
playerA.name.style.zIndex = "504";
playerB.name.style.zIndex = "503";
playerC.name.style.zIndex = "502";
playerD.name.style.zIndex = "501";

let players = [playerA, playerB, playerC, playerD];

setMoveOrder();

// задать порядок, в котором будут ходить игроки

function setMoveOrder() {
    players.sort(function(a, b){
        return a.moveOrder - b.moveOrder
    })
}

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

refreshSelect();

function refreshSelect() {
    let players = document.querySelectorAll(".info__player");
    for (let i = 0; i < players.length; i++) {
        players[i].classList.remove("info__player-select");
    }
    players[current].classList.add("info__player-select");
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
                players[i].power = powerWhite;
                break;
            case "yellow":
                players[i].power = powerYellow;
                break;
            case "red":
                players[i].power = powerRed;
                break;
            case "green":
                players[i].power = powerGreen;
                break;
            case "blue":
                players[i].power = powerBlue;
                break;
            case "brown":
                players[i].power = powerBrown;
                break;
            case "black":
                players[i].power = powerBlack;
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
                if (players[j].finished == true) {
                    continue;
                }
                powerset[j][i].classList.remove("powercell__off");
                powerset[j][i].classList.add("powercell__on");
            }
            for (let x = players[j].power; x < 10; x++) {
                if (players[j].finished == true) {
                    continue;
                }
                powerset[j][x].classList.remove("powercell__on");
                powerset[j][x].classList.add("powercell__off");
            }
        }
    }
}

// НАЧАЛО ИГРЫ

function gameStart() {

    showGlobalsBeforeRace();
// расстановка фишек по местам

    setTimeout( function () {
        for( let i = 0; i < players.length; i++) {
            players[i].name.style.visibility = "visible";
            players[i].name.style.left = "160px";
        }
        players[0].name.style.top = "560px";
        players[1].name.style.top = "600px";
        players[2].name.style.top = "640px";
        players[3].name.style.top = "680px";
    }, 100);

// создать лог
    setTimeout( function () {
        createFirstLog();
        if (players[current].type == "comp") {
            divScore.innerHTML = "ход компьютера";
        }

// сюда можно вписывать чит-коды
        /*jumpToCell(playerA, 34);
        jumpToCell(playerB, 33);
        jumpToCell(playerC, 34);
        jumpToCell(playerD, 17);*/

    }, 1000);

// задать бросок кубика
    if (players[current].type == "comp") {
        setTimeout(throwCubic, 4000);
    } else {
        moveInfoHuman();
    }
}

// бросание кубика
// чтобы бросить на любое число, введи в консоль throwCubic(число)

function throwCubic(num) {

    stId = players[current].currentCell;

    if (players[current].type == "human") {
        divScore.innerHTML = "";
        overlayCubic.style.display = "block";
    }

    if (players[current].skipMoves > 0) { // проверка на пропуск хода
        console.log(players[current].label + " ПРОПУСКАЕТ ХОД");
        skipInfo();
        messageSkipMove();
        players[current].skipMoves--;
        setTimeout(function () {
            setNail(players[current].name, players[current].skipMoves);
        }, gameSpeed * 2000);
        setTimeout(moveIsOver, gameSpeed * 2000);
    } else {

    if (typeof num == "number") { // условие для чит-кода
        cubicScore = num;
    } else {
        cubicScore = Math.ceil(Math.random() * 6); // святая святых! бросание кубика
        //cubicScore = 2;
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
                    cubic.setAttribute("src", "img/cubic_x.png");
            }
        }, 1500)

        console.log("На кубике: " + cubicScore);
        players[current].name.style.transition = gameSpeed * 0.2 + "s";
        players[current].protection = false;
        setTimeout(unshiftTokens, gameSpeed * 2200);
        setTimeout(move, gameSpeed * 2200);
    }
}

function moveInfoComp() {
    divScore.classList.remove("move__info-yours");
    divScore.classList.remove("move__info-skip");
    divScore.innerHTML = "ход компьютера";
    overlayCubic.style.display = "block";
    setTimeout(throwCubic, gameSpeed * 2000);
}

function moveInfoHuman() {
    divScore.classList.add("move__info-yours");
    divScore.classList.remove("move__info-skip");
    divScore.innerHTML = "ваш ход!";
    overlayCubic.style.display = "none";
    cubic.addEventListener('click', throwCubic, {once: true});
}

function skipInfo() {
    divScore.classList.remove("move__info-yours");
    divScore.classList.add("move__info-skip");
    divScore.innerHTML = "пропуск";
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
        players[current].name.style.zIndex = "505";
        stepsCounter++;

        if( stepsCounter < cubicScore ){
            setTimeout( move, 350 * gameSpeed);
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

    switch (Map01[getCellId].stopCondition) {
        case "start":
            executeTeleport();
            return true;
        case "pedestal":
            stepsCounter = cubicScore;
            return false;
        default:
            moveOneStep();
            return true;
    }
}

// движение фишки на следующую клетку

function moveOneStep() {
    let nextId = players[current].currentCell + 1;
    players[current].name.style.left = Map01[nextId].coorX + "px";
    players[current].name.style.top = Map01[nextId].coorY + "px";
}

// визуальное смещение фишки, если на клетке есть соперники

function shiftTokens(count) {

    let dir = Map01[players[current].currentCell].shift
    console.log("смещение текущего игрока = " + dir);

    switch (count) { // сколько игроков на клетке, на которую current player попал?
        case 1:
            players[current].shiftPos = 2;
            players[current].name.style.zIndex = "502";
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
            players[current].name.style.zIndex = "503";
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
            players[current].name.style.zIndex = "504";
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
    let dir = Map01[players[current].currentCell].shift // направление смещения
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
        let curShift = window.getComputedStyle(spec[i].name).zIndex;
        spec[i].name.style.zIndex = "" + (curShift - 1);
        let testIndex = window.getComputedStyle(spec[i].name).zIndex;
        console.log("zIndex = " + testIndex);
    }
    players[current].name.style.marginTop = "-12px";
    players[current].name.style.marginLeft = "-2px";
    players[current].shiftPos = 1;
}


// движение фишки на ПЬЕДЕСТАЛ

function moveToPedestal() {
    console.log("произошел вызов функции пьедестал");
    players[current].name.style.transition = gameSpeed * 0.5 + "s";
    playersCount--;
    players[current].finished = true;
    players[current].protection = true;
    players[current].currentCell = -1;
    setNail(players[current].name, 0);
    console.log("Защита = true");

    if (players[current].power >= 0) { // игрок дошел до финиша, займёт самое высокое возможное место
        let check = getMyWinPlace(players[current]);
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
        let check = getMyLosePlace(players[current]);
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
    if (raceInterrupt == false && playersCount > 1) {
        probablyEnd();
    } else {
        console.log("probablyEnd не сработал: игра прервана человеком, либо осталось мало игроков");
        if (playersCount == 1) {
            setTimeout(moveIsOver, 2000);
        }
    }
}

// активируется, если человек не прервал заезд, и если игроков больше 1
function probablyEnd() {
    if (players[current].type == "human" && players[current].place == 1) {
        setTimeout(popupFirst, 1000);
        console.log("Финишировал человек, занявший 1-е место");
    } else if (players[current].type == "comp") {
        setTimeout(pressFirst, 1000);
        console.log("Финишировал компьютер");
    } else {
        console.log("Финишировал человек, занял место 2-4");
        console.log("Условие для popupEndrace соответствует? " + (playersCount == 2 || playersCount == 3) );
        if (players[current].type == "human" && ( playersCount == 2 || playersCount == 3) ) {
            popupEndrace();
        } else {
            console.log("moveisover активирован из probablyEnd");
            setTimeout(moveIsOver, 2500);
        }
    }
}

// каким я дошёл до финиша?

function getMyWinPlace(current) {
    console.log("проверка каким я дошел до финиша");
    if (isPedestal1Free) {
        isPedestal1Free = false;
        current.place = 1;
        return "fin1";
    } else if (isPedestal2Free) {
        isPedestal2Free = false;
        current.place = 2;
        return "fin2";
    } else if (isPedestal3Free) {
        isPedestal3Free = false;
        current.place = 3;
        return "fin3";
    } else {
        isPedestal4Free = false;
        current.place = 4;
        return "fin4";
    }
}

// насколько сильно я опозорился?

function getMyLosePlace(current) {
    console.log("проверка на позор");
    if (isPedestal4Free) {
        isPedestal4Free = false;
        current.place = 4;
        return "fin4";
    } else if (isPedestal3Free) {
        isPedestal3Free = false;
        current.place = 3;
        return "fin3";
    } else if (isPedestal2Free) {
        isPedestal2Free = false;
        current.place = 2;
        return "fin2";
    } else {
        isPedestal1Free = false;
        current.place = 1;
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
            setTimeout(shiftTokens, 100 * gameSpeed, playerRival.length); // смещение фишки после приземления на клетку с соперниками
            setTimeout(getConflictStatus, 500 * gameSpeed, check); // внутри активируется popup и getCellType
        } else {
            setTimeout(getCellType, 500 * gameSpeed);
        }

        if (playerRival.length == 1) {
            playerRival[0].name.style.zIndex = "501";
        }

        if (playerRival.length == 0) {
            players[current].name.style.zIndex = "501";
        }

    } else { // игрок на стрелке
        setTimeout(getCellType, 500 * gameSpeed); // внутри активируется getConditionAfterMove
    }
}

// проверка условия на клетке //

function getCellType() {

    let getCellId = players[current].currentCell;
    switch (Map01[getCellId].type) {
        case "arrow":
            console.log(players[current].label + " на стрелке");
            messageArrow();
            executeTeleport();
            setTimeout( getConditionAfterMove, 500 * gameSpeed);
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

            if (players[current].type == "human") {
                popupFinished();
            } else {
                pressFinished();
            }

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

// проверка статуса конфликта: защищен ли игрок, достаточно ли энергии, сколько соперников, игрок человек или компьютер

function getConflictStatus(check) {

    if ( check == false ) { // если соперники защищены, атаки не произойдет

        if (players[current].power > 0) { // если у игрока достаточно энергии

            switch (playerRival.length) { // проверка, если соперников несколько
                case 1:
                    selectedRival = playerRival[0];

                    if (players[current].type == "human") {
                        popupAttackOnce(selectedRival);
                    } else {
                        makeDecision("attackOrNot");
                    }

                    break;
                case 2:

                    if (players[current].type == "human") {
                        popupAttackDouble(); // активирует attackOne, attackTwo, attackCancel, кнопку Выбрать другого
                    } else {
                        makeDecision("attackWho");
                    }

                    break;
                case 3:

                    if (players[current].type == "human") {
                        popupAttackTriple(); // активирует attackOne, attackTwo, attackThree, attackCancel, кнопку Выбрать другого
                    } else {
                        makeDecision("attackWho");
                    }
                    break;
            }

        } else { // если у игрока энергия меньше 1-цы
            if (playerRival.length > 0) {

                if (players[current].type == "human") {
                    popupAttackImp(); // активирует getCellType
                } else {
                    pressAttackImp();
                }

            } else {
                setTimeout(getCellType, 500 * gameSpeed);
            }
        }

    } else { // соперники защищены - атаковать нельзя

        let getCellId = players[current].currentCell;
        if (Map01[getCellId].type == "checkpoint") {

            if (players[current].type == "human") {
                popupAttackImpCP(); // активирует getCellType
            } else {
                pressAttackImp();
            }

        } else {
            setTimeout(getCellType, 500 * gameSpeed);
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

// НАЖАТИЕ КНОПОК
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

        if (players[current].type == "human") {
            popupLowEnergy();
        } else {
            pressAttackImp();
        }

        messageCritic();
    } else {
        refreshPowercells();
        console.log(players[current].label + ": сила теперь = " + players[current].power);
        setTimeout(getCellType, 500 * gameSpeed);
    }
}
// атака на 1 соперника: сказал нет

function pressAttackNo() {
    hidePopup(AttackOnce, AttackOnceCont);
    AttackOnceOther.style.display = "none";
    console.log(players[current].label + " отказался от конфликта");
    messageAttackCancel(selectedRival);
    setTimeout(getCellType, 500 * gameSpeed);
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
    setTimeout(getCellType, 500 * gameSpeed);
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
    setTimeout(getCellType, 500 * gameSpeed);
    if (players[current].power == 0) {
        refreshPowercells();
        console.log(players[current].label + ": сила теперь = " + players[current].power);
    }
}

// поражение

function pressLose() {
    console.log("pressLose");
    hidePopup(Lose, LoseCont);
    setTimeout(moveToPedestal, 1000 * gameSpeed);
}

// финишировал

function pressFinished() {
    console.log("pressFinished");
    hidePopup(Finished, FinishedCont);
    moveToPedestal();
}

// пришел первым

function pressFirst() {
    console.log("pressFirst");
    hidePopup(Finished, FinishedCont);
    if (players[current].type == "human" && ( playersCount == 2 || playersCount == 3) ) {
        popupEndrace();
    } else if (players[current].type == "comp") {
        setTimeout(moveIsOver, 2000);
    }
}

// игрок хочет досмотреть заезд

function pressWatch() {
    console.log("pressWatch");
    hidePopup(Endrace, EndraceCont);
    moveIsOver();
}

// игрок прервал заезд

function pressNext() {
    console.log("pressNext");
    hidePopup(Endrace, EndraceCont);
    raceInterrupt = true;

    // создаем массив игроков, которые еще не финишировали
    let array = [];
    for (let i = 0; i < players.length; i++) {
        if (players[i].finished == false) {
            array.push(players[i]);
            console.log("Найден игрок для обработки: " + players[i].label);
        }
    }

    // перераспределяем их в правильном порядке
    array.sort((prev, next) => next.currentCell - prev.currentCell);

    // водружаем их на пьедестал
    setTimeout(function () {
        for (let i = 0; i < array.length; i++) {
            array[i].name.style.transition = gameSpeed * 0.5 + "s";
            let check = getMyWinPlace(array[i]);
            for (let j = 0; j < Map01.length; j++) {
                if ( Map01[j].cellid == check ) {
                    array[i].name.style.left = Map01[j].coorX + "px";
                    array[i].name.style.top = Map01[j].coorY + "px";
                    break;
                }
            }
        }
    }, 500);
    setTimeout(raceIsOver, 2000);
}

// нажал ОК в итогах заезда

function pressRankOK() {
    console.log("pressRankOK");
    hidePopup(Ranktable, RanktableCont);
    let moneyA = document.querySelector(".info__player-moneyA");
    let moneyB = document.querySelector(".info__player-moneyB");
    let moneyC = document.querySelector(".info__player-moneyC");
    let moneyD = document.querySelector(".info__player-moneyD");
    moneyA.innerHTML = "$ " + players[0].capital;
    moneyB.innerHTML = "$ " + players[1].capital;
    moneyC.innerHTML = "$ " + players[2].capital;
    moneyD.innerHTML = "$ " + players[3].capital;
    popupShop();
}

// телепортация фишки

function executeTeleport() {

    let start = players[current].currentCell; // сохранить значение, откуда он телепортируется
    let tar = Map01[start]; // сохранить объект-клетку, с которой телепортируется
    stId = start;

    if (start != 0) {
        players[current].name.style.transition = gameSpeed * 0.5 + "s";
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
    players[current].bonusMoves = 0;
    if (players[current].power < 0) {
        console.log("ПОРАЖЕНИЕ!");

        if (players[current].type == "human") {
            popupLose();
        } else {
            pressLose();
        }
    } else {
        console.log(players[current].label + ": сила теперь = " + players[current].power);
        setTimeout(refreshPowercells, 500 * gameSpeed);
        players[current].protection = true;
        console.log("Защита = true");
        executeTeleport();
        messageReturnCheckpoint();
        setTimeout(checkShiftAfterRed, 500 * gameSpeed);
        if (players[current].power == 0) {
            setTimeout(messageCritic, 500 * gameSpeed);
        }
    }
}

// проверка смещения фишки после красной клетки

function checkShiftAfterRed() {
    let rivalsArray = getRivalsArray();
    if (rivalsArray.length > 0) {
        setTimeout(shiftTokens, 100 * gameSpeed, rivalsArray.length);
    }
    if (players[current].power == 0) {

        if (players[current].type == "human") {
            popupLowEnergy();
        } else {
            pressAttackImp();
        }

    } else {
        setTimeout(moveIsOver, 500 * gameSpeed);
    }
}

// YELLOW функция желтой клетки - дополнительный ход

function executeYellow() {
    players[current].bonusMoves++;
    messageYellow();

    if (players[current].type == "human") {
        console.log("Бросает человек executeYellow");
        moveInfoHuman();
    } else {
        moveInfoComp();
        console.log("Бросает компьютер executeYellow");
    }

    changePlayer();

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
        let glowNew = players[current].name.querySelector(".player__glow");
        glowNew.classList.add("player__glow-act");
        refreshSelect();
        if (players[current].type == "human") {
            console.log("Бросает человек moveIsOver");
            moveInfoHuman();
        } else {
            moveInfoComp();
            console.log("Бросает компьютер moveIsOver");
        }
    }
}

// исполняется по окончании заезда

function raceIsOver() {
    console.log("ЗАЕЗД ОКОНЧЕН");
    if (raceInterrupt == false) {
        moveToPedestal();
    }
    popupRank();
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
}

// прыжок на определённую клетку

function jumpToCell(player, cell) {
    console.log(player.label + " телепорт на клетку " + cell);
    player.name.style.left = Map01[cell].coorX + "px";
    player.name.style.top = Map01[cell].coorY + "px";
    player.currentCell = cell;
}

