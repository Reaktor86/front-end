function autoexe() {
    // вставляй сюда доп-код для диагностики. Активируется через 1 сек после загрузки
    console.log("Сработала автозагрузка");
    /*jumpToCell(playerA, 27);
    jumpToCell(playerB, 27);
    jumpToCell(playerC, 27);
    jumpToCell(playerD, 27);*/
    //setTimeout(createNewLog, 2000);
    //setInterval(messageRed, 2000);
    //setTimeout(messageRed, 500);
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
    protection = false
    finished = false
    place = 0
    checkpoint = false

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
        messageSkipMove();
        players[current].skipMoves--;
        setTimeout(moveIsOver, 2000);
    } else {
        cubicScore = Math.ceil(Math.random() * 6);
        // для тестов поставь здесь любое число и закомментируй предыдущую строку
        //cubicScore = 2;
        players[current].name.style.transition = ".2s";
        players[current].protection = false;
        console.log("Защита = false");
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
    console.log("На кубике: " + cubicScore);
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

    let getCellId = players[current].currentCell;

    switch (cellMap[getCellId].nextStep) {
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
    players[current].protection = true;
    console.log("Защита = true");

    if (players[current].power >= 0) { // игрок дошел до финиша, займёт самое высокое возможное место
        let check = getMyWinPlace();
        for (let i = 0; i < cellMap.length; i++) {
            if ( cellMap[i].cellid == check ) {
                players[current].name.style.left = cellMap[i].coorX + "px";
                players[current].name.style.top = cellMap[i].coorY + "px";
                console.log(players[current].label + " ДОШЕЛ ДО ФИНИША");
                messageFinished();
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

// проверка условия по окончании хода

function getConditionAfterMove() {

    let getCellId = players[current].currentCell;

    setTimeout(getConflictStatus, 500);

        switch (cellMap[getCellId].type) {
            case "arrow":
                console.log(players[current].label + " на стрелке");
                messageArrow();
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
                players[current].protection = true;
                console.log("Защита = true");
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
}

// атака на соперника

function getConflictStatus() {

    let rivalsArray = [];
    let check = false;

    // посчитать соперников и занести их в массив
    for (let i = 0; i < players.length; i++) {
        if (players[i].currentCell == players[current].currentCell && players[i].name != players[current].name) {
            rivalsArray.push(players[i]);
        }
    }

    if (rivalsArray.length > 0) {
        console.log("Соперников: " + rivalsArray.length);
        check = getProtectionStatus(rivalsArray);
    }

    if ( check == false ) { // если соперники защищены, атаки не произойдет

        if (players[current].power > 0) { // если у игрока достаточно энергии

            switch (rivalsArray.length) { // проверка, если соперников несколько
                case 1:
                    startAttack(rivalsArray[0]);
                    break;
                case 2:
                    for (;;) {
                        let choice = prompt("Соперников несколько! Введите 1, чтобы атаковать " + rivalsArray[0].label + ", либо 2, чтобы атаковать " + rivalsArray[1].label);
                        if (choice == 1) {
                            startAttack(rivalsArray[0]);
                            break;
                        } else if (choice == 2) {
                            startAttack(rivalsArray[1]);
                            break;
                        } else if (choice == null) {
                            console.log(players[current].label + " отказался от конфликта");
                            break;
                        } else {
                            alert("Неправильное значение! Попробуйте снова");
                        }
                    }
                    break;
                case 3:
                    for (;;) {
                        let choice = +prompt("Соперников много! Введите 1, чтобы атаковать " + rivalsArray[0].label + ", 2, чтобы атаковать " + rivalsArray[1].label + ", либо 3, чтобы атаковать " + rivalsArray[2].label);
                        if (choice == 1) {
                            startAttack(rivalsArray[0]);
                            break;
                        } else if (choice == 2) {
                            startAttack(rivalsArray[1]);
                            break;
                        } else if (choice == 3) {
                            startAttack(rivalsArray[2]);
                            break;
                        } else if (choice == null) {
                            console.log(players[current].label + " отказался от конфликта");
                            break;
                        } else {
                            alert("Неправильное значение! Попробуйте снова");
                        }
                    }
                    break;
            } // конец проверки на несколько соперников

        } else { // если у игрока энергия меньше 1-цы
            if (rivalsArray.length > 0) {
                alert("Нельзя атаковать игроков! Нет энергии");
            }
        }

    } else { // соперники защищены - атаковать нельзя

        let getCellId = players[current].currentCell;
        if (cellMap[getCellId].type == "checkpoint") {
            alert("Нельзя атаковать игроков на чекпойнте");
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

// атака на соперника

function startAttack(rival) {

    console.log("активировалась атака на игрока" + rival.label);

    if ( confirm("Атаковать " + rival.label + " ценой 1 ед. энергии?") ) {
        console.log(rival.label + " пропустит ход, а " + players[current].label + " ходит ещё раз");
        messageAttack(rival);
        messageAttackResult(rival);
        divScore.remove();
        rival.skipMoves++;
        players[current].bonusMoves++;
        players[current].power--;
        if (players[current].power == 0) {
            alert("Энергии больше нет! Красная клетка приведёт к поражению!");
        }
        refreshPowercells();
        console.log(players[current].label + ": энергия теперь = " + players[current].power);
    } else {
        console.log(players[current].label + " отказался от конфликта");
        messageAttackCancel(rival);
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

// RED функция красной клетки - назад к чекпойнту, -1 ед энергии

function executeRed() {
    messageRed();
    players[current].power--;
    if (players[current].power < 0) {
        console.log("ПОРАЖЕНИЕ!");
        setTimeout(moveIsOver, 3000);
        setTimeout(moveToPedestal, 1000);
    } else {
        console.log(players[current].label + ": энергия теперь = " + players[current].power);
        players[current].protection = true;
        console.log("Защита = true");
        if (players[current].power == 0) {
            alert("Энергии больше нет! Красная клетка приведёт к поражению!");
        }
        setTimeout(refreshPowercells, 500);
        executeTeleport();
        messageReturnCheckpoint();
        moveIsOver();
    }
}

// YELLOW функция желтой клетки - дополнительный ход

function executeYellow() {
    players[current].bonusMoves++;
    messageYellow();
    divScore.remove();
    changePlayer();
}

// GREEN функция зеленой клетки - пропуск хода

function executeGreen() {
    players[current].skipMoves++;
    messageGreen();
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
        messageMoving();
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
    console.log(playerA.label + " энергия: " + playerA.power);
    console.log(playerB.label + " энергия: " + playerA.power);
    console.log(playerC.label + " энергия: " + playerA.power);
    console.log(playerD.label + " энергия: " + playerA.power);
}

// прыжок на определённую клетку

function jumpToCell(player, cell) {
    console.log(player.label + " телепорт на клетку " + cell);
    player.name.style.left = cellMap[cell].coorX + "px";
    player.name.style.top = cellMap[cell].coorY + "px";
    player.currentCell = cell;
}

