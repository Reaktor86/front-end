function autoexe() {
    // вставляй сюда доп-код для диагностики. Активируется через 1 сек после загрузки
    /*console.log("Сработала автозагрузка");
    jumpToCell(playerA, 20);
    jumpToCell(playerB, 27);
    jumpToCell(playerC, 29);
    jumpToCell(playerD, 30);*/
}

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
    finished = false
    place = 0

    constructor(name, model, moveOrder) {
        this.name = name;
        this.model = model;
        this.moveOrder = moveOrder;
    }

}

let playerA = new Players(document.querySelector(".player-A"), "white", 1);
let playerB = new Players(document.querySelector(".player-B"), "white", 2);
let playerC = new Players(document.querySelector(".player-C"), "white", 3);
let playerD = new Players(document.querySelector(".player-D"), "white", 4);

playerA.label = "Игрок А";
playerB.label = "Игрок B";
playerC.label = "Игрок C";
playerD.label = "Игрок D";

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

setPower();

// задать силу

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
}

// глобальные переменные

let divScore = document.createElement("div");
let cubic = document.querySelector(".cubic");
cubic.addEventListener('click', throwCubic);
let cubicScore;
let stepsCounter = 0; // временное число, считалка ходов

showGlobalsBeforeRace();

setTimeout(autoexe, 1000);

// бросание кубика

function throwCubic() {

    if (players[current].skipMoves > 0) { // проверка на пропуск хода
        drawScore();
        console.log(players[current].label + " ПРОПУСКАЕТ ХОД");
        players[current].skipMoves--;
        setTimeout(moveIsOver, 2000);
    } else {
        cubicScore = Math.ceil(Math.random() * 6);
        // для тестов поставь здесь любое число и закомментируй предыдущую строку
        //cubicScore = 5;
        players[current].name.style.transition = ".2s";
        setTimeout(move, 2000);
        drawScore();
    }

}

function drawScore() {
    divScore.className = "cubic-score";
    if (players[current].skipMoves == 0) {
        divScore.innerHTML = "<p>" + cubicScore + "</p>";
    } else {
        divScore.innerHTML = "<p>--</p>";
    }
    let addressField = document.querySelector(".field");
    addressField.append(divScore);
}

// сменить игрока
// ВАЖНО! Этот код должен испольняться только при условии, что предыдущий ход ПОЛНОСТЬЮ завершен, иначе будут баги

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

    for (let i = 0; i < cellMap.length; i++) {

        if (cellMap[i].cellid == players[current].currentCell) { // проверить свойство nextStep у клетки, на которой сейчас сидит игрок

            switch (cellMap[i].nextStep) {
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
    }
}

// движение фишки на следующую клетку ВПРАВО

function moveOneStepRight() {
    let currentLeft = window.getComputedStyle(players[current].name).left;
    let numEl = parseInt(currentLeft.replace(/[^\d]/g, ''));
    players[current].name.style.left = numEl + 40 + "px";
}

// движение фишки на следующую клетку ВЛЕВО

function moveOneStepLeft() {
    let currentLeft = window.getComputedStyle(players[current].name).left;
    let numEl = parseInt(currentLeft.replace(/[^\d]/g, ''));
    players[current].name.style.left = numEl - 40 + "px";
}

// движение фишки на следующую клетку ВВЕРХ

function moveOneStepTop() {
    let currentTop = window.getComputedStyle(players[current].name).top;
    let numEl = parseInt(currentTop.replace(/[^\d]/g, ''));
    players[current].name.style.top = numEl - 40 + "px";
}

// движение фишки на следующую клетку ВНИЗ

function moveOneStepDown() {
    let currentTop = window.getComputedStyle(players[current].name).top;
    let numEl = parseInt(currentTop.replace(/[^\d]/g, ''));
    players[current].name.style.top = numEl + 40 + "px";
}

// движение фишки на ПЬЕДЕСТАЛ

function moveToPedestal() {
    console.log("произошел вызов функции пьедестал");
    players[current].name.style.transition = ".5s";
    playersCount--;
    players[current].finished = true;

    if (players[current].power >= 0) { // игрок дошел до финиша, займёт самое высокое возможное место
        let check = getMyWinPlace();
        for (let i = 0; i < cellMap.length; i++) {
            if ( cellMap[i].cellid == check ) {
                players[current].name.style.left = cellMap[i].coorX + "px";
                players[current].name.style.top = cellMap[i].coorY + "px";
                console.log(players[current].label + " ДОШЕЛ ДО ФИНИША");
                break;
            }
        }

    } else { // игрок проиграл и займёт последнее возможное место
        let check = getMyLosePlace();
        for (let i = 0; i < cellMap.length; i++) {
            if ( cellMap[i].cellid == check ) {
                players[current].name.style.left = cellMap[i].coorX + "px";
                players[current].name.style.top = cellMap[i].coorY + "px";
                console.log(players[current].label + " ВЫЛЕТЕЛ С ТРАССЫ");
                break;
            }
        }
    }
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

// проверка условия по окончании хода

function getConditionAfterMove() {
    
    for (let i = 0; i < cellMap.length; i++) {

        if (cellMap[i].cellid == players[current].currentCell) { // если нашлась НОМЕРНАЯ клетка, начнется проверка свойства TYPE

            switch (cellMap[i].type) {
                case "arrow":
                    console.log(players[current].label + " на стрелке");
                    setTimeout( executeTeleport, 500);
                    setTimeout( getConditionAfterMove, 1000);
                    break;
                case "yellow":
                    console.log(players[current].label + " на желтой клетке ХОДИТ ЕЩЕ РАЗ");
                    setTimeout( executeYellow, 500);
                    break;
                case "green":
                    console.log(players[current].label + " на зеленой клетке ПРОПУСТИТ ХОД");
                    setTimeout( executeGreen, 500);
                    break;
                case "checkpoint":
                    console.log(players[current].label + " на чекпойнте");
                    setTimeout(moveIsOver, 500);
                    break;
                case "red":
                    console.log(players[current].label + " на красной клетке");
                    setTimeout( executeRed, 500);
                    break;
                case "finish":
                    console.log(players[current].label + " на финише");
                    setTimeout(moveToPedestal, 1000);
                    setTimeout(moveIsOver, 3000);
                    break;
                default:
                    console.log(players[current].label + " на обычной клетке");
                    setTimeout(moveIsOver, 500);
                    break;
            }
            return; // закончить перебор
        }
    }
}

// телепортация фишки

function executeTeleport() {
    if (players[current].currentCell != 0) {
        players[current].name.style.transition = ".5s";
    }
    let tar = cellMap[players[current].currentCell];
    if (players[current].currentCell != 0) {
        players[current].currentCell += tar.idChange;
    }
    players[current].name.style.left = cellMap[tar.teleportTo].coorX + "px";
    players[current].name.style.top = cellMap[tar.teleportTo].coorY + "px";
}

// RED функция красной клетки - назад к чекпойнту, -1 ед силы

function executeRed() {
    players[current].power--;
    if (players[current].power < 0) {
        console.log("Энергия меньше нуля");
        setTimeout(moveIsOver, 3000);
        setTimeout(moveToPedestal, 1000);
    } else {
        console.log("Энергии осталось: " + players[current].power);
        executeTeleport();
        moveIsOver();
    }
}

// YELLOW функция желтой клетки - дополнительный ход

function executeYellow() {
    players[current].bonusMoves++;
    changePlayer();
}

// GREEN функция зеленой клетки - пропуск хода

function executeGreen() {
    players[current].skipMoves++;
    moveIsOver();
}

// исполняется по окончании хода

function moveIsOver() {

    changePlayer();
    divScore.remove();

    while (players[current].finished == true) {
        console.log(players[current].label + " отсутствует на поле");
        changePlayer();
    }

    if (playersCount < 2) {
        raceIsOver();
    } else {
        console.log(players[current].label + " ХОДИТ");
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
}

// прыжок на определённую клетку

function jumpToCell(player, cell) {
    console.log(player.label + " телепорт на клетку " + cell);
    player.name.style.left = cellMap[cell].coorX + "px";
    player.name.style.top = cellMap[cell].coorY + "px";
    player.currentCell = cell;
}