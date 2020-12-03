//автозапуск

window.onload = function() {
    console.log("Сработала автозагрузка");

    setTimeout(function () { // ПОЯВЛЕНИЕ МЕНЮ
        startMenu.style.display = "flex";
        loadSlots();
    }, 500);

    /*setTimeout(function () {
        createPlayers();
        resetPopupCharacters();
        setUpField();
        loadMap(curMap, curMapParam);
        skipTutorial = true;
        players[1].aiType = "risky";
        players[2].aiType = "careful";
        //gameSpeed = 1;
    }, 500);*/

    /*setTimeout(function () {
        gameStart();
    }, 2000);*/

    /*setTimeout(function () {
        unlockMagnet = true;
        unlockShield = true;
        unlockSMagnet = true;
        unlockIShield = true;
        unlockTrap = true;
        unlockVampire = true;
        //popupIMPToHuman();
    }, 1000);*/
}

// глобальные константы

const divScore = document.querySelector(".move__info-p")
const cubic = document.querySelector(".cubic");
const overlayCubic = document.querySelector(".overlay__cubic");
const field = document.querySelector(".field");
// стартовое меню
const logo = document.querySelector(".logo");
const jungles = document.querySelector(".jungles");
const pedestal = document.querySelector(".pedestal");
const rightBlock = document.querySelector(".right-block");
const startMenu = document.querySelector(".start-menu");
const copyright = document.querySelector(".copyright");
// табло справа
const tableName1 = document.querySelector(".info__player-label--A");
const tableName2 = document.querySelector(".info__player-label--B");
const tableName3 = document.querySelector(".info__player-label--C");
const tableName4 = document.querySelector(".info__player-label--D");
const tableToken1 = document.querySelector(".info__token--A");
const tableToken2 = document.querySelector(".info__token--B");
const tableToken3 = document.querySelector(".info__token--C");
const tableToken4 = document.querySelector(".info__token--D");
const tableMoney1 = document.querySelector(".info__player-moneyA");
const tableMoney2 = document.querySelector(".info__player-moneyB");
const tableMoney3 = document.querySelector(".info__player-moneyC");
const tableMoney4 = document.querySelector(".info__player-moneyD");
// инвентарь
const inventoryField = document.querySelector(".js-inv-field");
const inventoryShop = document.querySelector(".js-inv-shop");
const inventoryBonus = document.querySelector(".inventory--bonus");

const branchA1 = document.querySelector(".branch-A1");
const branchA2 = document.querySelector(".branch-A2");
const branchA3 = document.querySelector(".branch-A3");
const branchB1 = document.querySelector(".branch-B1");
const branchB2 = document.querySelector(".branch-B2");
const branchB3 = document.querySelector(".branch-B3");
const branchC1 = document.querySelector(".branch-C1");
const branchC2 = document.querySelector(".branch-C2");
const branchC3 = document.querySelector(".branch-C3");
const branchD1 = document.querySelector(".branch-D1");
const branchD2 = document.querySelector(".branch-D2");
const branchD3 = document.querySelector(".branch-D3");
const powerWhite = 2;
const powerYellow = 3;
const powerRed = 4;
const powerGreen = 5;
const powerBlue = 6;
const powerBrown = 8;
const powerBlack = 10;
const costWhite = 0;
const costYellow = 350;
const costRed = 600;
const costGreen = 1000;
const costBlue = 1600;
const costBrown = 2300;
const costBlack = 3000;
const costMagnet = 50;
const costSMagnet = 200;
const costShield = 50;
const costIShield = 200;
const costTrap = 250;
const costVampire = 250;
const costImp = 990;
const costManipulator = 5000;

// глобальные переменные
let cubicScore;
let stepsCounter = 0; // считалка ходов
let stId; // запоминает id клетки, с которой игрок начал движение
let cellIndex; // запоминает индекс клетки, на которой стоит текущий игрок
let playerRival = []; // массив текущих соперников
let selectedRival; // выбранный игроком соперник
let gameSpeed = 1.5; // скорость игры. 1 - быстрая, 1.5 - нормальная
let gamePaused = false;
let labelsOn = true; // имена над фишками
let raceInterrupt = false; // решил ли человеческий игрок досрочно закончить трассу
let isPedestal1Free = true;
let isPedestal2Free = true;
let isPedestal3Free = true;
let isPedestal4Free = true;
let playersCount = 4;
let current = 0; // индекс текущего игрока
let branchOver = false; // закончил ли работу бранч
let branch1 = branchA1; // адреса до бранчей, с которыми в данный момент работает игрок
let branch2 = branchA2;
let branch3 = branchA3;
let skipTutorial = false;
let cameFromBlack = false; // игрок пришёл на кнопку pressAttackImp с чёрной клетки
let animArrow; // состояние анимационной красной стрелки в popupHint
let animUseArrow; // состояние анимационной красной стрелки в hintUse

// сохранение игры
let slotParams = {
    slot1: "free",
    slot2: "free",
    slot3: "free",
    slot4: "free",
    slot5: "free",
    slot6: "free",
    slot7: "free",
    slot8: "free",
    slot9: "free",
    slot10: "free",
    busy: 0,
}
let getSlotStatus = JSON.parse(localStorage.getItem("jumpers-slotStatus"));
if (getSlotStatus) {
    slotParams.slot1 = getSlotStatus.slot1;
    slotParams.slot2 = getSlotStatus.slot2;
    slotParams.slot3 = getSlotStatus.slot3;
    slotParams.slot4 = getSlotStatus.slot4;
    slotParams.slot5 = getSlotStatus.slot5;
    slotParams.slot6 = getSlotStatus.slot6;
    slotParams.slot7 = getSlotStatus.slot7;
    slotParams.slot8 = getSlotStatus.slot8;
    slotParams.slot9 = getSlotStatus.slot9;
    slotParams.slot10 = getSlotStatus.slot10;
    slotParams.busy = getSlotStatus.busy;
}

let currentSlot = 1; // текущий слот, в который будет сохраняться игра
let slotSelected = 1; // слот, который выбрал игрок в меню

//что игрок открыл при прохождении
let unlockMagnet = false;
let unlockSMagnet = false;
let unlockShield = false;
let unlockIShield = false;
let unlockTrap = false;
let unlockVampire = false;
let unlockImp = false;
let unlockMop = false;
let unlockManipulator = false;
let conditionsCount = 5; // кол-во открытых условий, макс 16
let knowBranch = false;
let knowOrange = false;
let knowBlack = false;
let knowArrowBlue = false;
let knowBonus = false;
let knowStarOr = false;
let knowStarRed = false;
let knowMoneybag = false;
let knowSpeed = false;
let knowDeadend = false;
let knowHatched = false;
let knowAction = false;

// список карт и их параметров
// (!!! Индекс карты в mapList должен соответствовать индексу её параметров в mapParamList !!! )

const mapList = [
    Map01,
    Map02,
    Map03,
    Map04,
    Map05,
    Map06,
]

const mapParamList = [
    Map01param,
    Map02param,
    Map03param,
    Map04param,
    Map05param,
    Map06param,
]
let curMap = mapList[0]; // текущая карта
let curMapParam = mapParamList[0]; // параметры текущей карты

class Players {

    type = "human"
    aiType = "balanced"
    power = 0
    bonusMoves = 0
    skipMoves = 0
    currentCell = 0 // id текущей клетки, высчитывается во время движения, если 0 то значит на старте
    protection = true // защита от атак на чекпойнте, пьедестале, старте и т.п.
    armor = 0 // щит игрока
    circle = 0 // к игроку вернулся ход после полного круга, исп. для снятия щита
    finished = false
    shiftPos = 1 // если на одной клетке много соперников: смещение на ступень. По умолчанию ступень = 1, самое высокое 4
    fore = false // надо ли писать в логе про фору
    buyCount = 0 // магазин: сколько раз покупал что-то несколько трасс подряд
    aside = 0 // магазин: используется для правила отложенной цели
    dream = "none" // магазин: есть ли "цель на модель", если есть, то какая
    speed = -1 // сколько осталось ходов с молнией: -1 ничего не произойдет, 0 по скрипту вылезет сообщение, 3 при попадании на молнию
    reverse = false // ходит обратно
    nextCond = "none" // для клеток с двумя условиями: какое второе условие выполнить после выполнения первого

//инвентарь
    capital = 0
    bonusMoney = 0 // подсчёт бонусов во время трассы
    magnets = 0
    smagnets = 0
    shields = 0
    ishields = 0
    trap = false
    vampire = false
    mop = false
    imp = false
    manipulator = false

    constructor(name, letter, label, model, place, type) {
        this.name = name; // адрес DOM-элемента
        this.letter = letter; // буква фишки
        this.model = model; // цвет фишки
        this.place = place; // какое место занял?
        this.label = label; // имя в табло
        this.type = type; // человек или компьютер
    }
}

// создать игроков

let playerA, playerB, playerC, playerD;
let players;

function createPlayers(humanName) {

    if (!humanName) {
        humanName = "Игрок D";
    }

    let nameList = [];
    // не должно быть повторов, первая буква в каждом имени разная
    let namesIndex;

    for (let i = 0; i < 4; i++) {

        let letters = []; // вычисление первых букв каждого имени в массиве nameList
        for (let j = 0; j < nameList.length; j++) {
            letters.push( nameList[j][0] );
        }

        do {
            namesIndex = Math.floor( Math.random() * names.length);
        } while ( nameList.includes( names[namesIndex] ) || letters.includes( names[namesIndex][0] ) || nameList.includes(humanName) );
        nameList.push( names[namesIndex] );
    }

    playerA = new Players(document.querySelector(".player-A"), "A", nameList[0],"white", 1, "comp");
    playerB = new Players(document.querySelector(".player-B"), "B", nameList[1],"white", 2, "comp");
    playerC = new Players(document.querySelector(".player-C"), "C", nameList[2],"white", 3, "comp");
    playerD = new Players(document.querySelector(".player-D"), "D", humanName,"white", 4, "human");

    playerA.name.setAttribute("title", playerA.label);
    playerB.name.setAttribute("title", playerB.label);
    playerC.name.setAttribute("title", playerC.label);
    playerD.name.setAttribute("title", playerD.label);
    document.querySelector(".player-A .player__label").innerHTML = playerA.label;
    document.querySelector(".player-B .player__label").innerHTML = playerB.label;
    document.querySelector(".player-C .player__label").innerHTML = playerC.label;
    document.querySelector(".player-D .player__label").innerHTML = playerD.label;

    players = [playerA, playerB, playerC, playerD];
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

function refreshTableSelect() {
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

// подготовка табло с энергией

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

// задать фишкам цвета (визуально)

function setTokenColors() {
    for (let i = 0; i < players.length; i++) {

        if ( players[i].name.classList.contains("player-A") ) {

            switch (players[i].model) {
                case "white":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-a-white.png\")";
                    break;
                case "yellow":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-a-yellow.png\")";
                    break;
                case "red":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-a-red.png\")";
                    break;
                case "green":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-a-green.png\")";
                    break;
                case "blue":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-a-blue.png\")";
                    break;
                case "brown":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-a-brown.png\")";
                    break;
                case "black":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-a-black.png\")";
                    break;
            }

        } else if ( players[i].name.classList.contains("player-B") ) {

            switch (players[i].model) {
                case "white":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-b-white.png\")";
                    break;
                case "yellow":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-b-yellow.png\")";
                    break;
                case "red":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-b-red.png\")";
                    break;
                case "green":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-b-green.png\")";
                    break;
                case "blue":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-b-blue.png\")";
                    break;
                case "brown":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-b-brown.png\")";
                    break;
                case "black":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-b-black.png\")";
                    break;
            }

        } else if ( players[i].name.classList.contains("player-C") ) {

            switch (players[i].model) {
                case "white":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-c-white.png\")";
                    break;
                case "yellow":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-c-yellow.png\")";
                    break;
                case "red":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-c-red.png\")";
                    break;
                case "green":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-c-green.png\")";
                    break;
                case "blue":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-c-blue.png\")";
                    break;
                case "brown":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-c-brown.png\")";
                    break;
                case "black":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-c-black.png\")";
                    break;
            }

        } else {

            switch (players[i].model) {
                case "white":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-d-white.png\")";
                    break;
                case "yellow":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-d-yellow.png\")";
                    break;
                case "red":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-d-red.png\")";
                    break;
                case "green":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-d-green.png\")";
                    break;
                case "blue":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-d-blue.png\")";
                    break;
                case "brown":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-d-brown.png\")";
                    break;
                case "black":
                    players[i].name.style.backgroundImage = "url(\"img/tokens/token-d-black.png\")";
                    break;
            }
        }
    }
}

// загрузка табло справа

function setInfoTable() {

// место 1

    setInfoModelColor(players[0], tableToken1);

    if ( players[0].name.classList.contains("player-A") ) {
        tableToken1.innerHTML = "<p>" + "A" + "</p>";
    } else if ( players[0].name.classList.contains("player-B") ) {
        tableToken1.innerHTML = "<p>" + "B" + "</p>";
    } else if ( players[0].name.classList.contains("player-C") ) {
        tableToken1.innerHTML = "<p>" + "C" + "</p>";
    } else {
        tableToken1.innerHTML = "<p>" + "D" + "</p>";
    }

    tableMoney1.innerHTML = "$ " + players[0].capital;
    tableName1.innerHTML = players[0].label;


// место 2

    setInfoModelColor(players[1], tableToken2);

    if ( players[1].name.classList.contains("player-A") ) {
        tableToken2.innerHTML = "<p>" + "A" + "</p>";
    } else if ( players[1].name.classList.contains("player-B") ) {
        tableToken2.innerHTML = "<p>" + "B" + "</p>";
    } else if ( players[1].name.classList.contains("player-C") ) {
        tableToken2.innerHTML = "<p>" + "C" + "</p>";
    } else {
        tableToken2.innerHTML = "<p>" + "D" + "</p>";
    }

    tableMoney2.innerHTML = "$ " + players[1].capital;
    tableName2.innerHTML = players[1].label;

// место 3

    setInfoModelColor(players[2], tableToken3);

    if ( players[2].name.classList.contains("player-A") ) {
        tableToken3.innerHTML = "<p>" + "A" + "</p>";
    } else if ( players[2].name.classList.contains("player-B") ) {
        tableToken3.innerHTML = "<p>" + "B" + "</p>";
    } else if ( players[2].name.classList.contains("player-C") ) {
        tableToken3.innerHTML = "<p>" + "C" + "</p>";
    } else {
        tableToken3.innerHTML = "<p>" + "D" + "</p>";
    }

    tableMoney3.innerHTML = "$ " + players[2].capital;
    tableName3.innerHTML = players[2].label;

// место 4

    setInfoModelColor(players[3], tableToken4);

    if ( players[3].name.classList.contains("player-A") ) {
        tableToken4.innerHTML = "<p>" + "A" + "</p>";
    } else if ( players[3].name.classList.contains("player-B") ) {
        tableToken4.innerHTML = "<p>" + "B" + "</p>";
    } else if ( players[3].name.classList.contains("player-C") ) {
        tableToken4.innerHTML = "<p>" + "C" + "</p>";
    } else {
        tableToken4.innerHTML = "<p>" + "D" + "</p>";
    }

    tableMoney4.innerHTML = "$ " + players[3].capital;
    tableName4.innerHTML = players[3].label;
}

// указать цвет фишки в табло (в т.ч. в popupWhatInv)

function setInfoModelColor(player, tablePath) {
    switch (player.model) {
        case "white":
            tablePath.style.backgroundColor = "white";
            break;
        case "yellow":
            tablePath.style.backgroundColor = "#a38e29";
            break;
        case "red":
            tablePath.style.backgroundColor = "#a83333";
            break;
        case "green":
            tablePath.style.backgroundColor = "#68a845";
            break;
        case "blue":
            tablePath.style.backgroundColor = "#3d68a3";
            break;
        case "brown":
            tablePath.style.backgroundColor = "#55280b";
            break;
        case "black":
            tablePath.style.backgroundColor = "#000000";
            break;
    }
}

// очистить инвентарь

function cleanInventory(shop) {
    let images;
    let itemsMass;
    if (shop) {
        images = inventoryShop.querySelectorAll("img");
        itemsMass = inventoryShop.querySelectorAll(".inventory-item");
        deactivateButtonSell();
    } else {
        images = inventoryField.querySelectorAll("img");
        itemsMass = inventoryField.querySelectorAll(".inventory-item");
    }

    if (images) {
        for (let i = 0; i < images.length; i++) {
            images[i].remove();
        }
    }

    if (itemsMass) {
        for (let i = 0; i < itemsMass.length; i++) {
            itemsMass[i].style.cursor = "default";
            itemsMass[i].removeEventListener("mouseover", addItemMouseover);
            itemsMass[i].removeEventListener("mouseout", addItemMouseout);
            itemsMass[i].removeEventListener("click", useMagnet);
            itemsMass[i].removeEventListener("click", useSMagnet);
            itemsMass[i].removeEventListener("click", useShield);
            itemsMass[i].removeEventListener("click", useIShield);
            if (shop) {
                itemsMass[i].removeEventListener("click", selectItemInv);
                itemsMass[i].removeEventListener("click", activateButtonSell);
            }
        }
    }
}

// загрузка инвентаря // применять только на ПУСТОЙ инвентарь!!!

function fillInventory(shop) {
    let invMagnet1;
    let invMagnet2;
    let invMagnet3;
    let invShield1;
    let invShield2;
    let invShield3;
    let invTrap;
    let invVampire;
    let invImp;
    let invMop;
    let invManipulator;
    if (shop) {
        invMagnet1 = document.querySelector(".js-inv-shop .inventory--magnet1");
        invMagnet2 = document.querySelector(".js-inv-shop .inventory--magnet2");
        invMagnet3 = document.querySelector(".js-inv-shop .inventory--magnet3");
        invShield1 = document.querySelector(".js-inv-shop .inventory--shield1");
        invShield2 = document.querySelector(".js-inv-shop .inventory--shield2");
        invShield3 = document.querySelector(".js-inv-shop .inventory--shield3");
        invTrap = document.querySelector(".js-inv-shop .inventory--trap");
        invVampire = document.querySelector(".js-inv-shop .inventory--vampire");
        invImp = document.querySelector(".js-inv-shop .inventory--imp");
        invMop = document.querySelector(".js-inv-shop .inventory--mop");
        invManipulator = document.querySelector(".js-inv-shop .inventory--manipulator");
    } else {
        invMagnet1 = document.querySelector(".js-inv-field .inventory--magnet1");
        invMagnet2 = document.querySelector(".js-inv-field .inventory--magnet2");
        invMagnet3 = document.querySelector(".js-inv-field .inventory--magnet3");
        invShield1 = document.querySelector(".js-inv-field .inventory--shield1");
        invShield2 = document.querySelector(".js-inv-field .inventory--shield2");
        invShield3 = document.querySelector(".js-inv-field .inventory--shield3");
        invTrap = document.querySelector(".js-inv-field .inventory--trap");
        invVampire = document.querySelector(".js-inv-field .inventory--vampire");
        invImp = document.querySelector(".js-inv-field .inventory--imp");
        invMop = document.querySelector(".js-inv-field .inventory--mop");
        invManipulator = document.querySelector(".js-inv-field .inventory--manipulator");
    }

// магниты
    let player = findHuman();
    if (player.magnets > 0) {
        invMagnetsBlock();
        for (let i = 0; i < player.magnets; i++) {
            if ( !invMagnet1.querySelector("img") ) {
                setItemToFreeSlot(invMagnet1, "img/inv-magnet.png", "Магнит", shop);
            } else if ( !invMagnet2.querySelector("img") ) {
                setItemToFreeSlot(invMagnet2, "img/inv-magnet.png", "Магнит", shop);
            } else {
                setItemToFreeSlot(invMagnet3, "img/inv-magnet.png", "Магнит", shop);
            }
        }
    }

// супер-магниты
    if (player.smagnets > 0) {
        invMagnetsBlock();
        for (let i = 0; i < player.smagnets; i++) {
            if ( !invMagnet1.querySelector("img") ) {
                setItemToFreeSlot(invMagnet1, "img/inv-smagnet.png", "Супер-магнит", shop);
            } else if ( !invMagnet2.querySelector("img") ) {
                setItemToFreeSlot(invMagnet2, "img/inv-smagnet.png", "Супер-магнит", shop);
            } else {
                setItemToFreeSlot(invMagnet3, "img/inv-smagnet.png", "Супер-магнит", shop);
            }
        }
    }

// щиты
    if (player.shields > 0) {
        for (let i = 0; i < player.shields; i++) {
            if ( !invShield1.querySelector("img") ) {
                setItemToFreeSlot(invShield1, "img/inv-shield.png", "Щит", shop);
            } else if ( !invShield2.querySelector("img") ) {
                setItemToFreeSlot(invShield2, "img/inv-shield.png", "Щит", shop);
            } else {
                setItemToFreeSlot(invShield3, "img/inv-shield.png", "Щит", shop);
            }
        }
    }

// железные щиты
    if (player.ishields > 0) {
        for (let i = 0; i < player.ishields; i++) {
            if ( !invShield1.querySelector("img") ) {
                setItemToFreeSlot(invShield1, "img/inv-ishield.png", "Железный щит", shop);
            } else if ( !invShield2.querySelector("img") ) {
                setItemToFreeSlot(invShield2, "img/inv-ishield.png", "Железный щит", shop);
            } else {
                setItemToFreeSlot(invShield3, "img/inv-ishield.png", "Железный щит", shop);
            }
        }
    }

    if (player.trap === true && !invTrap.querySelector("img") ) {
        setItemToFreeSlot(invTrap, "img/inv-trap.png", "Капкан", shop);
    }

    if (player.vampire === true && !invVampire.querySelector("img") ) {
        setItemToFreeSlot(invVampire, "img/inv-vampire.png", "Вампирские клыки (только при атаке)", shop);
    }

    if (player.imp === true && !invImp.querySelector("img") ) {
        setItemToFreeSlot(invImp, "img/inv-imp.png", "Невозможный кубик", shop);
    }

    if (player.mop === true && !invMop.querySelector("img") ) {
        setItemToFreeSlot(invMop, "img/inv-mop.png", "Швабра", shop);
    }

    if (player.manipulator === true && !invManipulator.querySelector("img") ) {
        setItemToFreeSlot(invManipulator, "img/inv-manipulator.png", "Манипулятор зелёным полем (автоматически)", shop);
    }
}

// добавить предмет в свободный слот

function setItemToFreeSlot(item, imgPath, title, shop) {

    let img = document.createElement("img");
    img.setAttribute("src", imgPath);
    img.setAttribute("title", title);
    item.append(img);

    if (shop) {
        item.addEventListener("click", activateButtonSell);
        item.addEventListener("click", selectItemInv);
    }

    // если предмент - вампир или манипулятор на игровом поле, то не выполнять следующий код
    if ( (imgPath === "img/inv-vampire.png" || imgPath === "img/inv-manipulator.png") && !shop) {
        return;
    }
    item.style.cursor = "pointer";
    item.addEventListener("mouseover", addItemMouseover);
    item.addEventListener("mouseout", addItemMouseout);

    if (!shop) {
        switch (title) {
            case "Магнит":
                item.addEventListener("click", useMagnet);
                break;
            case "Супер-магнит":
                item.addEventListener("click", useSMagnet);
                break;
            case "Щит":
                item.addEventListener("click", useShield);
                break;
            case "Железный щит":
                item.addEventListener("click", useIShield);
                break;
            case "Капкан":
                break;
            case "Невозможный кубик":
                break;
            case "Швабра":
                break;
        }
    }
}

// переключение на следующую карту

function switchMaps() {
    let getCurMapIndex;
    for (let i = 0; i < mapList.length; i++) {
        if (mapList[i] == curMap) {
            getCurMapIndex = i;
        }
    }
    curMap = mapList[getCurMapIndex + 1];
    curMapParam = mapParamList[getCurMapIndex + 1];
}

// подготовка к загрузке новой карты

function destroyMap() {
    let elems = document.querySelectorAll(".cell, .cell-finish, .cell-deadend, .cell-arrow-node, .log__message");
    for (let i = 0; i < elems.length; i++) {
        elems[i].remove();
    }

    let arrows = document.querySelector(".arrows");
    arrows.removeAttribute("src");

    let branches = document.querySelectorAll(".branch");
    for (let i = 0; i < branches.length; i++) {
        branches[i].style.display = "none";
    }

    let prizep = document.querySelectorAll(".prize__p1, .prize__p2, .prize__p3, .prize__p4");
    for (let i = 0; i < prizep.length; i++) {
        prizep[i].innerHTML = "";
    }
    whatButton.style.display = "none";
    inventoryBonus.style.visibility = "hidden";
}

// подготовка поля к загрузке карты

function setUpField() {

// удаление элементов главного меню

    field.style.width = "840px";
    field.style.backgroundImage = "url(\"img/field_bg.jpg\")";
    rightBlock.style.display = "flex";
    logo.style.display = "none";
    jungles.style.display = "none";
    copyright.style.display = "none";
    startMenu.style.display = "none";

// загрузка базовых элементов

    overlayCubic.style.display = "block";
    cubic.style.display = "block";
    cubic.setAttribute("src", "img/cubic/cubic_start.png");
    inventoryField.style.display = "flex";
    let places = document.querySelectorAll(".info__place");
    let finishes = document.querySelectorAll(".info__finish");
    for (let i = 0; i < places.length; i++) {
        places[i].style.display = "block";
        finishes[i].style.display = "none";
    }

// сброс одноразовых пременных

    isPedestal1Free = true;
    isPedestal2Free = true;
    isPedestal3Free = true;
    isPedestal4Free = true;
    raceInterrupt = false;
    current = 0;
    playersCount = 4;
    stepsCounter = 0;
    playerRival = [];
    branchOver = false;
    cameFromBlack = false;
    gamePaused = false;
    pausePromise = {};
    hintLine = [];
    nextScript = {};

// сюда можно вписывать чит-коды
    /*players[0].model = "yellow";
    players[0].dream = "red";
    players[1].model = "red";
    players[2].model = "yellow";
    players[3].model = "yellow";
    players[0].capital = 1000;*/
    /*players[1].capital = 40;
    players[2].capital = 250;
    players[3].capital = 1200;
    players[3].magnets = 2;
    players[0].ishields = 1;
    players[1].magnets = 1;
    players[2].smagnets = 1;
    players[2].magnets = 2;
    players[2].shields = 2;
    players[3].shields = 1;*/
}

// загрузка карты // перед активацией убедись, что curMap именно тот, который надо загрузить

function loadMap(map, mapParam, status) {

    if (!status) {
        if (map === Map01) {
            // выяснить, какой слот свободный, установить currentSlot в соответствии со свободным, установить в объекте слот как busy, сохранить параметры
            for (let i = 1; i < 11; i++) {
                let slot = "slot" + i;
                if (slotParams[slot] === "free") {
                    currentSlot = i;
                    slotParams[slot] = "busy";
                    slotParams.busy++;
                    localStorage.setItem("jumpers-slotStatus", JSON.stringify(slotParams));
                    break;
                }
            }
        }
        gameSave("start");
        messageGameSaved();
    }

// отображение названия карты

    document.querySelector(".map-name").innerHTML = mapParam.mapName;

// загрузка педестала

    pedestal.style.left = mapParam.pedestalX + "px";
    pedestal.style.top = mapParam.pedestalY + "px";
    pedestal.style.display = "block";

// фикс положения карты

    if (map === Map03) {
        mapShift(40, 20);
    }
    if (map === Map05) {
        mapShift(-20, -20);
    }

// загрузка клеток

    for (let i = 0; i < map.length; i++) {
        let cell = document.createElement("div");
        if (map[i].type === "finish") {
            cell.classList.add("cell-finish");
            cell.style.backgroundImage = "url(\"img/finish.bmp\")";
        } else if (map[i].type === "deadend") {
            cell.classList.add("cell-deadend");
            cell.style.backgroundImage = "url(\"img/dead-end.bmp\")";
        } else if (map[i].type === "arrowNode") {
            cell.classList.add("cell-arrow-node");
        } else {
            cell.classList.add("cell");
            let img = document.createElement("img");
            cell.innerHTML = "<p>" + map[i].num + "</p>";

            switch (map[i].type) {
                case "start":
                    cell.classList.add("cell-start");
                    break;
                case "arrow":
                    cell.classList.add("cell-arrow");
                    break;
                case "yellow":
                    cell.classList.add("cell-yellow");
                    break;
                case "orange":
                    cell.classList.add("cell-orange");
                    break;
                case "green":
                    cell.classList.add("cell-green");
                    break;
                case "red":
                    cell.classList.add("cell-red");
                    break;
                case "checkpoint":
                    cell.innerHTML = "<div>" + "<p>" + map[i].num + "</p>" + "</div>";
                    cell.classList.add("cell-checkpoint");
                    break;
                case "black":
                    cell.classList.add("cell-black");
                    break;
                case "starOrange":
                    cell.innerHTML = "";
                    img.setAttribute("src", "img/star-orange.svg");
                    img.style.position = "absolute";
                    cell.append(img);
                    break;
                case "starRed":
                    cell.innerHTML = "";
                    img.setAttribute("src", "img/star-red.svg");
                    img.style.position = "absolute";
                    cell.append(img);
                    break;
                case "speed":
                    cell.innerHTML = "";
                    img.setAttribute("src", "img/speed.png");
                    img.style.width = "32px";
                    img.style.position = "absolute";
                    cell.append(img);
                    break;
            }
        }

        field.append(cell);

        if (map[i].bonus) {
            let cellPath = field.querySelector(".cell:last-child");
            let p = document.createElement("p");
            p.classList.add("cell__bonus");
            if (map[i].bonus > 0) {
                p.innerHTML = "+" + map[i].bonus;
                p.style.color = "#00BB07";
            } else {
                p.innerHTML = map[i].bonus;
                p.style.color = "#9e0000";
            }
            cellPath.append(p);
        }

        cell.style.left = map[i].coorX + "px";
        cell.style.top = map[i].coorY + "px";
    }

// загрузка стрелок

    let arrows = document.querySelector(".arrows");
    arrows.setAttribute("src", curMapParam.arrowsUrl);
    arrows.style.left = mapParam.arrowsX + "px";
    arrows.style.top = mapParam.arrowsY + "px";

// загрузка бранчей

    loadBranches();

// загрузка призового фонда

    let prize = document.querySelector(".prize");
    prize.style.display = "block";

    let spanp1 = prize.querySelector(".span__p1");
    let spanp2 = prize.querySelector(".span__p2");
    let spanp3 = prize.querySelector(".span__p3");
    let spanp4 = prize.querySelector(".span__p4");
    let prizep1 = prize.querySelector(".prize__p1");
    let prizep2 = prize.querySelector(".prize__p2");
    let prizep3 = prize.querySelector(".prize__p3");
    let prizep4 = prize.querySelector(".prize__p4");
    spanp1.innerHTML = "1 место";
    prizep1.innerHTML = "$ " + mapParam.prize1;
    spanp2.innerHTML = "2 место";
    prizep2.innerHTML = "$ " + mapParam.prize2;
    spanp3.innerHTML = "3 место";
    prizep3.innerHTML = "$ " + mapParam.prize3;
    spanp4.innerHTML = "4 место";
    prizep4.innerHTML = "$ " + mapParam.prize4;

// загрузка фишек

    players.sort(function(a, b){ // сортировка игроков в массиве по занимаемому месту
        return a.place - b.place
    });

    players[0].name.style.zIndex = "504";
    players[1].name.style.zIndex = "503";
    players[2].name.style.zIndex = "502";
    players[3].name.style.zIndex = "501";

    for (let i = 0; i < players.length; i++) {
        players[i].finished = false;
        players[i].shiftPos = 1;
        players[i].skipMoves = 0;
        players[i].bonusMoves = 0;
        players[i].skipMoves = 0;
        players[i].armor = 0;
        players[i].circle = 0;
        players[i].bonusMoney = 0;
        players[i].speed = -1;
        players[i].reverse = false;

        // удаление насадок, если есть
        removeShield(players[i]);
        setNail(players[i].name, players[i].skipMoves);
        let path = players[i].name.querySelector(".player__speed");
        path.style.display = "none";
    }

    let human = findHuman();
    if (human.shields + human.ishields > 0) {
        invShieldsBlock(); // заблокирован инвентарь щитов
    }
    setPower(); // у фишек есть значение power

// чит-коды для энергии и AI TYPE

    /*players[0].power = 1;
    players[1].power = 1;
    players[2].power = 1;
    players[3].power = 1;
    refreshPowercells();*/
    /*players[0].type = "human";
    players[1].type = "human";
    players[2].type = "human";*/

// конец чит-кодов

    setTokenColors(); // фишки цветные
    setInfoTable(); // загружено табло справа
    refreshTableSelect(); // обновлено свечение текущего игрока в табло
    cleanInventory();
    fillInventory(); // обновлен инвентарь игрока Д

// правило ФОРЫ

    if (curMap !== Map01) {
        players[0].bonusMoves = 2;
        players[0].fore = true;
        players[1].bonusMoves = 1;
        players[1].fore = true;
    }

// расстановка фишек по местам

    if (status === "start" || status === undefined) {
        setTimeout( function () {
            for( let i = 0; i < players.length; i++) {
                players[i].name.style.visibility = "visible";
                players[i].name.style.left = curMap[i].coorX + "px";
                players[i].name.style.top = curMap[i].coorY + "px";
            }

        }, 1000 * gameSpeed);
    }

// разблокировка условий для popupHelp
    unlockHelp();
    function unlockHelp() {
        conditionsCount = 5;
        if (curMap === Map01) {
            return;
        }

        knowBranch = true;
        conditionsCount++;

        if (curMap === Map02) {
            return;
        }

        knowOrange = true;
        knowBlack = true;
        conditionsCount += 2;

        if (curMap === Map03) {
            return;
        }

        knowBonus = true;
        knowStarOr = true;
        conditionsCount += 2;

        if (curMap === Map04) {
            return;
        }

        knowSpeed = true;
        knowDeadend = true;
        conditionsCount += 2;

        if (curMap === Map05) {
            return;
        }

        knowArrowBlue = true;
        conditionsCount++;

        if (curMap === Map06) {
            return;
        }

        knowStarRed = true;
        conditionsCount++;

        if (curMap === Map07) {
            return;
        }

        knowMoneybag = true;
        knowHatched = true;
        conditionsCount += 2;
    }

    if (knowBranch) document.querySelector(".help__item--branch").style.display = "block";
    if (knowOrange) document.querySelector(".help__item--orange").style.display = "block";
    if (knowBlack) document.querySelector(".help__item--black").style.display = "block";
    if (knowBonus) document.querySelector(".help__item--bonus").style.display = "block";
    if (knowStarOr) document.querySelector(".help__item--star-or").style.display = "block";
    if (knowStarRed) document.querySelector(".help__item--star-red").style.display = "block";
    if (knowSpeed) document.querySelector(".help__item--speed").style.display = "block";
    if (knowDeadend) document.querySelector(".help__item--dead-end").style.display = "block";
    if (knowArrowBlue) document.querySelector(".help__item--arrow-blue").style.display = "block";
    if (knowMoneybag) document.querySelector(".help__item--moneybag").style.display = "block";
    if (knowHatched) document.querySelector(".help__item--hatched").style.display = "block";

// начать игру // условия появления всплывающих окон

    if (status === "start" || status === undefined) {

        switch (curMap) {
            case Map01:
                hintLine = ["hintRaceBegin", "hintPedestal", "hintInfoTable", "hintLog"];
                nextScript = {
                    script: function () {
                        setTimeout(gameStart, 500 * gameSpeed);
                    }
                }
                setTimeout(startHintLine, 2000 * gameSpeed);
                break;
            case Map02:
                setTimeout(popupNewcondBranch, 2000 * gameSpeed);
                break;
            case Map03:
                setTimeout(popupNewcondOrange, 2000 * gameSpeed); // также запускает black
                break;
            case Map04:
                setTimeout(popupHalfway, 2000 * gameSpeed); // также запускает bonus и starOr
                break;
            case Map05:
                nextScript = {
                    popup: function () {
                        popupNewcondSpeed(); // также запускает deadend
                    }
                };
                setTimeout(tryGiftIMP, 2000 * gameSpeed);
                break;
            case Map06:
                nextScript = {
                    popup: function () {
                        popupMap06News(); // также запускает blueArrows
                    }
                };
                setTimeout(tryGiftIMP, 2000 * gameSpeed);
                break;
            default:
                setTimeout(gameStart, 2000 * gameSpeed);
        }
    } else {
        // запускается, если в статусе загрузки указано "finish"
        pressRankOK();
    }

}

// загрузка параметров магазина

function loadShopParameters() {

    let player = findHuman();
    console.log("Загружаются параметры магазина");
    switch (player.model) {
        case "white":
            shopToken.setAttribute("src", "img/tokens/token-d-white.png");
            shopTokenName.innerHTML = "Белая";
            shopTokenClass.innerHTML = "базовая";
            break;
        case "yellow":
            shopToken.setAttribute("src", "img/tokens/token-d-yellow.png");
            shopTokenName.innerHTML = "Цыпа";
            shopTokenClass.innerHTML = "стандарт";
            break;
        case "red":
            shopToken.setAttribute("src", "img/tokens/token-d-red.png");
            shopTokenName.innerHTML = "Вестник";
            shopTokenClass.innerHTML = "стандарт";
            break;
        case "green":
            shopToken.setAttribute("src", "img/tokens/token-d-green.png");
            shopTokenName.innerHTML = "Ударник";
            shopTokenClass.innerHTML = "профи";
            break;
        case "blue":
            shopToken.setAttribute("src", "img/tokens/token-d-blue.png");
            shopTokenName.innerHTML = "Сенат";
            shopTokenClass.innerHTML = "профи";
            break;
        case "brown":
            shopToken.setAttribute("src", "img/tokens/token-d-brown.png");
            shopTokenName.innerHTML = "Робеспьер";
            shopTokenClass.innerHTML = "элита";
            break;
        case "black":
            shopToken.setAttribute("src", "img/tokens/token-d-black.png");
            shopTokenName.innerHTML = "Мальдини";
            shopTokenClass.innerHTML = "элита";
            break;
    }

    shopCapital.innerHTML = "$ " + player.capital;
    cleanInventory(true);
    fillInventory(true);

// разблокировка предметов
    unlockStuff();
    function unlockStuff() {
        if (curMap === Map01) {
            return;
        }

        unlockMagnet = true;
        if (showedHintMagnet === false) {
            hintMagnet();
            showedHintMagnet = true;
        }

        if (curMap === Map02 || curMap === Map03) {
            return;
        }

        unlockShield = true;
        if (showedHintShield === false) {
            showedHintShield = true;
        }

        if (curMap === Map04 || curMap === Map05) {
            return;
        }

        knowAction = true;
        unlockSMagnet = true;
        unlockTrap = true;
        if (showedHintSMagnet === false) {
            hintSMagnet();
            showedHintSMagnet = true;
        }

        if (curMap === Map06) {
            return;
        }

        unlockIShield = true;
        if (showedHintIShield === false) {
            hintIShield();
            showedHintIShield = true;
        }

        if (curMap === Map07) {
            return;
        }

        unlockVampire = true;
        if (showedHintVampire === false) {
            hintVampire();
            showedHintVampire = true;
        }

        if (curMap === Map08 || curMap === Map09 || curMap === Map10) {
            return;
        }

        unlockManipulator = true;
    }

    if (unlockMagnet) {
        let pathImg = document.querySelector(".shop__items-item--magnet img");
        pathImg.setAttribute("src", "img/inv-magnet.png");
        pathImg.style.height = "65%";
        let path = document.querySelector(".shop__items-item--magnet");
        path.addEventListener("click", pressShopMagnet);
        unlockItem( path );
    }

    if (unlockSMagnet) {
        let pathImg = document.querySelector(".shop__items-item--smagnet img");
        pathImg.setAttribute("src", "img/inv-smagnet.png");
        pathImg.style.height = "65%";
        let path = document.querySelector(".shop__items-item--smagnet");
        path.addEventListener("click", pressShopSMagnet);
        unlockItem( path );
    }

    if (unlockShield) {
        let pathImg = document.querySelector(".shop__items-item--shield img");
        pathImg.setAttribute("src", "img/inv-shield.png");
        pathImg.style.height = "65%";
        let path = document.querySelector(".shop__items-item--shield");
        path.addEventListener("click", pressShopShield);
        unlockItem( path );
    }

    if (unlockIShield) {
        let pathImg = document.querySelector(".shop__items-item--ishield img");
        pathImg.setAttribute("src", "img/inv-ishield.png");
        pathImg.style.height = "65%";
        let path = document.querySelector(".shop__items-item--ishield");
        path.addEventListener("click", pressShopIShield);
        unlockItem( path );
    }

    if (unlockTrap) {
        let pathImg = document.querySelector(".shop__items-item--trap img");
        pathImg.setAttribute("src", "img/inv-trap.png");
        pathImg.style.height = "65%";
        let path = document.querySelector(".shop__items-item--trap");
        path.addEventListener("click", pressShopTrap);
        unlockItem( path );
    }

    if (unlockVampire) {
        let pathImg = document.querySelector(".shop__items-item--vampire img");
        pathImg.setAttribute("src", "img/inv-vampire.png");
        pathImg.style.height = "65%";
        let path = document.querySelector(".shop__items-item--vampire");
        path.addEventListener("click", pressShopVampire);
        unlockItem( path );
    }

    if (unlockImp) {
        let pathImg = document.querySelector(".shop__items-item--imp img");
        pathImg.setAttribute("src", "img/inv-imp.png");
        pathImg.style.height = "65%";
        let path = document.querySelector(".shop__items-item--imp");
        path.addEventListener("click", pressShopImp);
        unlockItem( path );
    }

    if (unlockManipulator) {
        let pathImg = document.querySelector(".shop__items-item--manipulator img");
        pathImg.setAttribute("src", "img/inv-manipulator.png");
        pathImg.style.height = "65%";
        let path = document.querySelector(".shop__items-item--manipulator");
        path.addEventListener("click", pressShopManipulator);
        unlockItem( path );
    }

// появление акции с элитными фишками
    let imp = true;
    for (let i = 0; i < players.length; i++) {
        if (players[i].imp) {
            imp = false;
            break;
        }
    }
    if (knowAction && imp) {
        showAction();
    }

// установка запрета на покупку определенных фишек

    let blocks = [
        document.querySelector(".overlay__model--yellow"),
        document.querySelector(".overlay__model--red"),
        document.querySelector(".overlay__model--green"),
        document.querySelector(".overlay__model--blue"),
        document.querySelector(".overlay__model--brown"),
        document.querySelector(".overlay__model--black"),
    ]

    let tokens = [
        "white",
        "yellow",
        "red",
        "green",
        "blue",
        "brown",
        "black",
    ]

    for (let i = 0; i < blocks.length; i++) {
        if (player.model === tokens[i]) {
            break;
        }
        blocks[i].style.display = "block";
    }
}

function unlockItem(path) {
    path.addEventListener("click", activateButtonBuy);
    path.addEventListener("click", selectItemShop);
    path.style.cursor = "pointer";
    path.addEventListener("mouseover", addItemMouseover);
    path.addEventListener("mouseout", addItemMouseout);
}

// загрузка бранчей

function loadBranches() {
    if (curMapParam.branchA) {
        branchA1.style.display = "block";
        branchA2.style.display = "block";
        branchA1.style.left = curMapParam.branchA1X + "px";
        branchA1.style.top = curMapParam.branchA1Y + "px";
        branchA1.style.transform = curMapParam.branchA1ROTATE;
        branchA2.style.left = curMapParam.branchA2X + "px";
        branchA2.style.top = curMapParam.branchA2Y + "px";
        branchA2.style.transform = curMapParam.branchA2ROTATE;
        if (curMapParam.branchA3) {
            branchA3.style.display = "block";
            branchA3.style.left = curMapParam.branchA3X + "px";
            branchA3.style.top = curMapParam.branchA3Y + "px";
            branchA3.style.transform = curMapParam.branchA3ROTATE;
        }
    }

    if (curMapParam.branchB) {
        branchB1.style.display = "block";
        branchB2.style.display = "block";
        branchB1.style.left = curMapParam.branchB1X + "px";
        branchB1.style.top = curMapParam.branchB1Y + "px";
        branchB1.style.transform = curMapParam.branchB1ROTATE;
        branchB2.style.left = curMapParam.branchB2X + "px";
        branchB2.style.top = curMapParam.branchB2Y + "px";
        branchB2.style.transform = curMapParam.branchB2ROTATE;
        if (curMapParam.branchB3) {
            branchB3.style.display = "block";
            branchB3.style.left = curMapParam.branchB3X + "px";
            branchB3.style.top = curMapParam.branchB3Y + "px";
            branchB3.style.transform = curMapParam.branchB3ROTATE;
        }
    }

    if (curMapParam.branchC) {
        branchC1.style.display = "block";
        branchC2.style.display = "block";
        branchC1.style.left = curMapParam.branchC1X + "px";
        branchC1.style.top = curMapParam.branchC1Y + "px";
        branchC1.style.transform = curMapParam.branchC1ROTATE;
        branchC2.style.left = curMapParam.branchC2X + "px";
        branchC2.style.top = curMapParam.branchC2Y + "px";
        branchC2.style.transform = curMapParam.branchC2ROTATE;
        if (curMapParam.branchC3) {
            branchC3.style.display = "block";
            branchC3.style.left = curMapParam.branchC3X + "px";
            branchC3.style.top = curMapParam.branchC3Y + "px";
            branchC3.style.transform = curMapParam.branchC3ROTATE;
        }
    }

    if (curMapParam.branchD) {
        branchD1.style.display = "block";
        branchD2.style.display = "block";
        branchD1.style.left = curMapParam.branchD1X + "px";
        branchD1.style.top = curMapParam.branchD1Y + "px";
        branchD1.style.transform = curMapParam.branchD1ROTATE;
        branchD2.style.left = curMapParam.branchD2X + "px";
        branchD2.style.top = curMapParam.branchD2Y + "px";
        branchD2.style.transform = curMapParam.branchD2ROTATE;
        if (curMapParam.branchD3) {
            branchD3.style.display = "block";
            branchD3.style.left = curMapParam.branchD3X + "px";
            branchD3.style.top = curMapParam.branchD3Y + "px";
            branchD3.style.transform = curMapParam.branchD3ROTATE;
        }
    }
}

// НАЧАЛО ИГРЫ // ИГРОВОЙ ПРОЦЕСС

function gameStart() {

    showGlobalsBeforeRace();

    // активировать кнопку "подсмотреть инвентарь"
    whatButton.style.display = "flex";

    // включить имена над фишками
    if (labelsOn) {
        labels.forEach(function (item) {
            item.style.display = "block";
        });
    }

// создать лог

    setTimeout( function () {

        if (showedHintLog === false) {
            createFirstLog();
        }
        showedHintLog = false;

        if (players[current].type == "comp") {
            divScore.innerHTML = "ход компьютера";
        }
        let glowNew = players[current].name.querySelector(".player__glow");
        glowNew.classList.add("player__glow-act");

// сюда можно вписывать чит-коды
        /*if (curMap === Map01) {
            jumpToCell(playerA, 26);
            jumpToCell(playerB, 26);
            jumpToCell(playerC, 26);
            jumpToCell(playerD, 33);
        }
        if (curMap === Map02) {
            jumpToCell(playerA, 121);
            jumpToCell(playerB, 121);
            jumpToCell(playerC, 121);
            jumpToCell(playerD, 247);
        }
        if (curMap === Map03) {
            jumpToCell(playerA, 328);
            jumpToCell(playerB, 227);
            jumpToCell(playerC, 227);
            jumpToCell(playerD, 542);
        }
        if (curMap === Map04) {
            jumpToCell(playerA, 18);
            jumpToCell(playerB, 18);
            jumpToCell(playerC, 18);
            jumpToCell(playerD, 863);
        }
        if (curMap === Map06) {
            jumpToCell(playerA, 239);
            jumpToCell(playerB, 239);
            jumpToCell(playerC, 239);
            jumpToCell(playerD, 242);
        }*/

        //foreOff();

    }, 1000);

// задать бросок кубика

    // подсказки о предметах перед броском кубика
    let human = findHuman();
    if (showedHintUseShield === false && ( human.shields + human.ishields > 0 ) ) {
        nextScript = {
            script: function () {
                showedHintUseShield = true;
                if (players[current].type === "comp") {
                    setTimeout(throwCubic, 4000);
                } else {
                    setTimeout(infoMoveHuman, 1000);
                }
            }
        };
        hintLine.push("hintUseShield");
        startHintLine();
        return;
    }

    if (players[current].type === "comp") {
        setTimeout(throwCubic, 4000);
    } else {
        setTimeout(infoMoveHuman, 1000);
    }
}

// бросание кубика

function throwCubic(num, magnet, sup) {

    if (gamePaused) {
        pausePromise = {
            arg1: magnet,
            arg2: sup,
            script: function () {
                throwCubic(false, pausePromise.arg1, pausePromise.arg2);
                pausePromise = {};
            }
        }
        return;
    }

    stId = players[current].currentCell;

    // блокировка щитов, если человек в данный момент их не использует
    let human = findHuman();
    if ( (human.shields + human.ishields) > 0 && human.armor == 0 && human.finished === false) {
        invShieldsBlock();
    }

    if (players[current].type === "human") {
        divScore.innerHTML = "";
        overlayCubic.style.display = "block";
        if (players[current].magnets > 0 || players[current].smagnets > 0) {
            invMagnetsBlock();
        }
    }

    // молния
    if (players[current].speed > 0 && typeof players[current].currentCell !== "string") {
        players[current].speed--;
        console.log("Speed = " + players[current].speed);
    }

    // проверка на пропуск хода
    if (players[current].skipMoves > 0) {
        console.log(players[current].label + " ПРОПУСКАЕТ ХОД");
        infoSkip();
        messageSkipMove();
        players[current].skipMoves--;

        // завершение молнии
        if (players[current].speed == 0) {
            messageSpeedOver();
            let path = players[current].name.querySelector(".player__speed");
            path.style.display = "none";
            players[current].speed = -1;
        }

        setTimeout(function () {
            setNail(players[current].name, players[current].skipMoves);
        }, gameSpeed * 2000);

        if (players[current].nextCond === "none") {
            setTimeout(moveIsOver, gameSpeed * 2000);
        } else {
            // проверка 2-го условия на клетке
            setTimeout(function () {
                getCellType(true);
            }, 2000 * gameSpeed);
        }
    } else {

        if (typeof num == "number") { // условие для чит-кода
            cubicScore = num;
        } else {

            if (magnet) { // ход магнитом
                console.log("загадано: " + magnetScore);
                let substitute1;
                let substitute2;
                let icon = document.querySelector(".cubic__icon--magnet");
                icon.style.display = "block";
                if (sup) {
                    icon.setAttribute("src", "img/inv-smagnet.png");
                } else {
                    icon.setAttribute("src", "img/inv-magnet.png");
                }

                do {
                    substitute1 = Math.ceil(Math.random() * 6);
                } while (substitute1 == magnetScore)
                console.log("число на подстановку: " + substitute1);

                if (sup) {
                    do {
                        substitute2 = Math.ceil(Math.random() * 6);
                    } while (substitute2 == magnetScore || substitute2 == substitute1)
                    console.log("число на подстановку второе: " + substitute2);
                }

                cubicScore = Math.ceil(Math.random() * 6);
                console.log("cubicScore что выпало на самом деле: " + cubicScore);
                if (cubicScore == substitute1 || cubicScore == substitute2) {
                    cubicScore = magnetScore;
                }

                let arg = false;
                if (sup) {
                    arg = true;
                }
                if (cubicScore == magnetScore) {
                    setTimeout(messageMagnetSuccess, 1500, arg);
                } else {
                    setTimeout(messageMagnetFailed, 1500, arg);
                }

            } else {
                cubicScore = Math.ceil(Math.random() * 6); // святая святых! стандартное бросание кубика
                //cubicScore = 1;
            }
        }

        //анимация кубика
        cubic.setAttribute("src", "img/cubic/cubic_spin.gif");
        setTimeout( function () {
            switch (cubicScore) {
                case 1:
                    cubic.setAttribute("src", "img/cubic/cubic_1.png");
                    break;
                case 2:
                    cubic.setAttribute("src", "img/cubic/cubic_2.png");
                    break;
                case 3:
                    cubic.setAttribute("src", "img/cubic/cubic_3.png");
                    break;
                case 4:
                    cubic.setAttribute("src", "img/cubic/cubic_4.png");
                    break;
                case 5:
                    cubic.setAttribute("src", "img/cubic/cubic_5.png");
                    break;
                case 6:
                    cubic.setAttribute("src", "img/cubic/cubic_6.png");
                    break;
                case 7:
                    cubic.setAttribute("src", "img/cubic/cubic_7.png");
                    break;
                case 8:
                    cubic.setAttribute("src", "img/cubic/cubic_8.png");
                    break;
                case 9:
                    cubic.setAttribute("src", "img/cubic/cubic_9.png");
                    break;
                default:
                    cubic.setAttribute("src", "img/cubic/cubic_x.png");
            }
        }, 1500);

        console.log("На кубике: " + cubicScore);

        // молния
        setTimeout(function () {
            if (players[current].speed >= 0 && typeof players[current].currentCell !== "string") {
                cubicScore *= 2;
                console.log("Молния приумножила очки на кубике: " + cubicScore);
            }
        }, 1600);
        players[current].name.style.transition = gameSpeed * 0.2 + "s";
        players[current].protection = false;
        setTimeout(unshiftTokens, gameSpeed * 2200);
        setTimeout(move, gameSpeed * 2200);

        // отметка о том, что ячейка на старте теперь свободна
        if (players[current].currentCell == 0) {
            let x = window.getComputedStyle(players[current].name).left;
            let y = window.getComputedStyle(players[current].name).top;
            for (let i = 0; i < curMap.length; i++) {
                if (curMap[i].coorX + "px" === x && curMap[i].coorY + "px" === y) {
                    curMap[i].busy = false;
                    break;
                }
            }
        }
    }
}

function infoMoveComp() {
    divScore.classList.remove("move__info-yours");
    divScore.classList.remove("move__info-skip");
    divScore.innerHTML = "ход компьютера";
    overlayCubic.style.display = "block";
    if ( !aiUseMagnet() ) {
        setTimeout(throwCubic, gameSpeed * 2000);
    }
}

function infoMoveHuman(blue) {
    if (blue) {
        divScore.classList.remove("move__info-yours");
        divScore.innerHTML = "бросьте ещё раз";
    } else {
        divScore.classList.add("move__info-yours");
        divScore.innerHTML = "ваш ход!";
    }
    divScore.classList.remove("move__info-skip");
    overlayCubic.style.display = "none";
    invMagnetsUnblock();

    // подсказки на использование предметов

    if (showedHintUseMagnet === false && ( players[current].magnets + players[current].smagnets > 0) ) {
        nextScript = {
            script: function () {
                showedHintUseMagnet = true;
            }
        };
        hintLine.push("hintUseMagnet");
        startHintLine();
    }

    if (showedHintUseShield === false && ( players[current].shields + players[current].ishields > 0 ) ) {
        nextScript = {
            script: function () {
                showedHintUseShield = true;
            }
        };
        hintLine.push("hintUseShield");
        startHintLine();
    }

    cubic.addEventListener('click', throwCubic, {once: true});
}

function infoSkip() {
    divScore.classList.remove("move__info-yours");
    divScore.classList.add("move__info-skip");
    divScore.innerHTML = "пропуск";
}

function infoBranch() {
    divScore.classList.add("move__info-yours");
    divScore.classList.remove("move__info-skip");
    divScore.innerHTML = "остаток: " + (cubicScore - stepsCounter);
}

// сменить игрока
// ВАЖНО! Этот код должен исполняться только при условии, что предыдущий ход ПОЛНОСТЬЮ завершен, иначе будут баги

function changePlayer() {

    // проверка на доп-ходы
    if (players[current].bonusMoves > 0) {
        players[current].bonusMoves--;
        return;
    }

    /*
    у всех игроков со щитом внутри увеличивается показатель circle при change player
    если у какого-то игрока circle = 4, то его щит -1, circle = 0
    если щит = 0, то он снимается
    не важно, сколько игроков на поле: circle все равно будет правильно считаться

     */

    for (let i = 0; i < players.length; i++) {
        if (players[i].armor > 0) {
            players[i].circle++;
            console.log(players[i].label + " circle = " + players[i].circle);
        }
        if (players[i].circle > 3) {
            players[i].armor--;
            console.log(players[i].label + " armor = " + players[i].armor);

            // регулировка высоты железного щита
            if (players[i].type === "human") {
                let slot = document.querySelectorAll(".overlay__shield");
                for (let k = 0; k < slot.length; k++) {
                    if ( window.getComputedStyle(slot[k]).backgroundColor === "rgba(230, 0, 255, 0.3)" ) {
                        if (players[i].armor == 2) {
                            slot[k].style.height = "24px";
                        } else if (players[i].armor == 1) {
                            slot[k].style.height = "12px";
                        } else {
                            slot[k].style.height = "35px";
                        }
                    }
                }
            }

            players[i].circle = 0;
            if (players[i].armor == 0) {
                messageArmorOff(players[i]);
                removeShield(players[i]);
            }
        }
    } // конец обработки щита

    current++;
    if (current == 4) {
        current = 0;
    }
    console.log("смена игрока");
}

// движение фишки на определенное число ходов после броска кубика
// ОСТОРОЖНО! Активирует саму себя несколько раз

function move() {

    if (gamePaused) {
        pausePromise = {
            script: function () {
                move();
                pausePromise = {};
            }
        }
        return;
    }

    // если игрок на arrowNode
    if (typeof players[current].currentCell === "string") {
        for (let i = 0; i < curMap[cellIndex].dir1.length; i++) {
            if (cubicScore == curMap[cellIndex].dir1[i]) {
                executeTeleport(curMap[cellIndex].tele1);
                setTimeout( getConditionAfterMove, 600 * gameSpeed);
                return;
            }
        }
        for (let i = 0; i < curMap[cellIndex].dir2.length; i++) {
            if (cubicScore == curMap[cellIndex].dir2[i]) {
                executeTeleport(curMap[cellIndex].tele2);
                setTimeout( getConditionAfterMove, 600 * gameSpeed);
                return;
            }
        }
        for (let i = 0; i < curMap[cellIndex].dir3.length; i++) {
            if (cubicScore == curMap[cellIndex].dir3[i]) {
                executeTeleport(curMap[cellIndex].tele3);
                setTimeout( getConditionAfterMove, 600 * gameSpeed);
                return;
            }
        }
    }

    // выполняется, если игрок не на стоп-клетке // если ничто не мешает, фишка сдвинется на 1 клетку
    if ( getNextMoveDirection() ) {
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

        // завершение молнии
        if (players[current].speed == 0) {
            messageSpeedOver();
            let path = players[current].name.querySelector(".player__speed");
            path.style.display = "none";
            players[current].speed = -1;
        }

        getConditionAfterMove(); // выход из функции move

        setTimeout(function () { // сброс некоторых параметров
            let branches = document.querySelectorAll(".branch");
            branches.forEach(function (item) {
                item.setAttribute("src", "img/branch.png");
            })
            document.querySelector(".cubic__icon--magnet").style.display = "none";
        }, 500 * gameSpeed);
    }
}

// исполняется после совершения единичного шага

function getNextMoveDirection() {

    if (branchOver === true) {
        branchOver = false;
        moveOneStep();
        return true;
    }

    cellIndex = getCellIndexById(players[current].currentCell); // вычисляем индекс клетки, на которой стоит игрок

    if ( curMap[cellIndex].type === "checkpoint" && stepsCounter != 0) { // игрок пересекает чекпойнт
        setTimeout(messageCheckpoint, 300 * gameSpeed);
    }

    switch (curMap[cellIndex].stopCondition) {
        case "start":
            executeTeleport(curMap[cellIndex].teleportTo);
            return true;
        case "pedestal":
            stepsCounter = cubicScore;
            return false; // прекращает движение
        case "branch":
            if (players[current].reverse) {
                players[current].reverse = false;
                players[current].currentCell = curMap[cellIndex].reverseTo - 1;
                moveOneStep();
                return true;
            } else {
                executeBranch(curMap[cellIndex].branchid);
                return false; // прекращает движение
            }
        case "join":
            players[current].currentCell = curMap[cellIndex].joinTo - 1;
            console.log("Сработал Join");
            moveOneStep();
            return true;
        case "deadend":
            if (players[current].reverse) {
                moveOneStep();
                return true;
            } else {
                console.log("ТУПИК");
                players[current].reverse = true;
                stepsCounter = cubicScore;
                messageDeadend();
                return false; // прекращает движение
            }
        case "reverse":
            if (players[current].reverse) {
                console.log("Сработал reverse");
                players[current].currentCell = curMap[cellIndex].reverseTo + 1;
                moveOneStep();
            } else {
                moveOneStep();
            }
            return true;
        default:
            moveOneStep();
            return true;
    }
}

// движение фишки на следующую клетку

function moveOneStep() {
    if (players[current].reverse) {
        players[current].currentCell--;
    } else {
        players[current].currentCell++;
    }
    let index = getCellIndexById(players[current].currentCell);
    players[current].name.style.left = curMap[index].coorX + "px";
    players[current].name.style.top = curMap[index].coorY + "px";
}

// визуальное смещение фишки, если на клетке есть соперники

function shiftTokens(count) {

    let dir = curMap[cellIndex].shift
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
    let currentId = getCellIndexById(stId);
    let pos = players[current].shiftPos;
    console.log("ступень текущего игрока: " + pos)
    let rivalsArray = getRivalsArray();
    let dir = curMap[currentId].shift // направление смещения
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
    players[current].currentCell = 0;
    players[current].armor = 0;
    players[current].circle = 0;
    removeShield(players[current]);
    setNail(players[current].name, 0);
    let path = players[current].name.querySelector(".player__speed");
    path.style.display = "none";
    console.log("Защита = true");

    if (players[current].power >= 0) { // игрок дошел до финиша, займёт самое высокое возможное место
        let check = getMyWinPlace(players[current]);
        for (let i = 0; i < curMapParam.pedestalCoords.length; i++) {
            if ( curMapParam.pedestalCoords[i].cellid == check ) {
                players[current].name.style.left = curMapParam.pedestalCoords[i].coorX + "px";
                players[current].name.style.top = curMapParam.pedestalCoords[i].coorY + "px";
                console.log(players[current].label + " ДОШЕЛ ДО ФИНИША");
                messageFinished();
                break;
            }
        }

    } else { // игрок проиграл и займёт последнее возможное место
        let check = getMyLosePlace(players[current]);
        for (let i = 0; i < curMapParam.pedestalCoords.length; i++) {
            if ( curMapParam.pedestalCoords[i].cellid == check ) {
                players[current].name.style.left = curMapParam.pedestalCoords[i].coorX + "px";
                players[current].name.style.top = curMapParam.pedestalCoords[i].coorY + "px";
                console.log(players[current].label + " ВЫЛЕТЕЛ С ТРАССЫ");
                messageLose();
                break;
            }
        }
    }

// добавляем финишный флажок в инфо
    let info = document.querySelector(".info .info__player-select");
    info.querySelector("img").style.display = "block";
    info.querySelector("p").style.display = "none";

    messagePlace(players[current].place);
    if (raceInterrupt === false && playersCount > 1) {
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
    if (players[current].type === "human" && players[current].place == 1) {
        setTimeout(popupFirst, 1000);
        console.log("Финишировал человек, занявший 1-е место");
    } else if (players[current].type === "comp") {
        setTimeout(pressFirst, 1000);
        console.log("Финишировал компьютер");
    } else {
        console.log("Финишировал человек, занял место 2-4");
        console.log("Условие для popupEndrace соответствует? " + (playersCount == 2 || playersCount == 3) );
        if (players[current].type === "human" && ( playersCount == 2 || playersCount == 3) ) {
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

    // вычислить индекс клетки, на которой находится игрок
    cellIndex = getCellIndexById(players[current].currentCell);

    if (curMap[cellIndex].type === "arrow" ) { // выполняется, если игрок на стрелке
        setTimeout(getCellType, 500 * gameSpeed);
        return;
    }

    if ( curMap[cellIndex].type === "checkpoint" ) { // игрок достиг чекпойнта
        setTimeout(messageCheckpoint, 300 * gameSpeed);
    }

    if ( curMap[cellIndex].stopCondition === "deadend" ) { // впереди тупик - игрок приземлился точно перед ним
        players[current].reverse = true;
    }

    // подсказка - красная клетка
    if (players[current].currentCell > 14 && players[current].currentCell < 25 && players[current].type === "human" && showedHintRed === false && curMap === Map01) {
        nextScript = {
            script: function () {
                showedHintRed = true;
                getConditionAfterMove();
            }
        };
        hintLine.push("hintRed");
        startHintLine();
        return;
    }

    playerRival = getRivalsArray(); // работа с соперниками на клетке
    let check = false;
    if (playerRival.length > 0) {
        console.log("Соперников: " + playerRival.length);
        check = getProtectionStatus(playerRival);
        setTimeout(function () {
            shiftTokens(playerRival.length); // смещение фишки после приземления на клетку с соперниками
        }, 50 * gameSpeed);
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
}

// проверка условия на клетке //

function getCellType(type2) {

    if (gamePaused) {
        pausePromise = {
            arg1: type2,
            script: function () {
                getCellType(pausePromise.arg1);
                pausePromise = {};
            }
        }
        return;
    }

    console.log("Активировался getCellType");
    let whatType;

    if (type2) {
        whatType = players[current].nextCond;
        players[current].nextCond = "none";
        cellIndex = getCellIndexById(players[current].currentCell);
        console.log ("nextCond очищен, будет выполнено условие 2");
    } else {
        // проверка, есть ли на клетке второе условие
        if (curMap[cellIndex].type2) {
            players[current].nextCond = curMap[cellIndex].type2;
            console.log ("сработал nextCond: " + players[current].nextCond);
        }
        whatType = curMap[cellIndex].type;
    }

    switch (whatType) {
        case "arrow":
            console.log(players[current].label + " на стрелке");
            executeArrow();
            break;
        case "yellow":
            console.log(players[current].label + " на желтой клетке ХОДИТ ЕЩЕ РАЗ");
            executeYellow();
            break;
        case "green": // возможно второе условие
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
        case "orange":
            console.log(players[current].label + " на оранжевой клетке");
            executeYellow(true);
            break;
        case "black": // возможно второе условие
            console.log(players[current].label + " на чёрной клетке");
            executeBlack(); // завершение хода
            break;
        case "starOrange":
            console.log(players[current].label + " на оранжевой звезде");
            executeStar(); // завершение хода
            break;
        case "starRed":
            console.log(players[current].label + " на красной звезде");
            executeStar(true); // завершение хода
            break;
        case "speed":
            console.log(players[current].label + " на молнии");
            executeSpeed(); // завершение хода
            break;
        case "arrowNode":
            console.log(players[current].label + " на узле синей стрелки");
            executeArrowBlue();
            break;
        case "finish":
            console.log(players[current].label + " на финише");

            if (players[current].type === "human") {
                popupFinished();
            } else {
                pressFinished();
            }

            break;
        default:
            if (curMap[cellIndex].bonus) {
                console.log(players[current].label + " на клетке с бонусом/штрафом");
                messageBonus(curMap[cellIndex].bonus);
                players[current].bonusMoney += curMap[cellIndex].bonus;

                let human = findHuman();
                if (players[current] === human) {
                    inventoryBonus.style.visibility = "visible";
                    if (players[current].bonusMoney >= 0) {
                        inventoryBonus.style.color = "#34ff64";
                        inventoryBonus.innerHTML = "+ " + players[current].bonusMoney + "$";
                    } else {
                        inventoryBonus.style.color = "#f73a3a";
                        let money = Math.abs(players[current].bonusMoney);
                        inventoryBonus.innerHTML = "- " + money + "$";
                    }
                }

                setTimeout( moveIsOver, 600 * gameSpeed);
            } else {
                console.log(players[current].label + " на обычной клетке");
                moveIsOver();
            }
            break;
    }
}

function executeArrow() {
    messageArrow();
    executeTeleport(curMap[cellIndex].teleportTo);
    if (curMap[cellIndex].passCP) {
        setTimeout(messageCheckpoint, 500 * gameSpeed);
    }
    unshiftTokens();
    setTimeout( getConditionAfterMove, 600 * gameSpeed);
}

// RED функция красной клетки - назад к чекпойнту, -1 ед энергии

function executeRed() {

    messageRed();
    players[current].bonusMoves = 0;
    players[current].speed = -1;
    let path = players[current].name.querySelector(".player__speed");
    path.style.display = "none";
    players[current].power--;
    if (players[current].power < 0) {
        console.log("ПОРАЖЕНИЕ!");

        if (players[current].type === "human") {
            popupLose();
        } else {
            pressLose();
        }
    } else {
        console.log(players[current].label + ": сила теперь = " + players[current].power);
        setTimeout(refreshPowercells, 500 * gameSpeed);

        // только для красной клетки
        players[current].protection = true;
        console.log("Защита = true");
        setTimeout(function () {
            executeTeleport(curMap[cellIndex].teleportTo);
        }, 1000 * gameSpeed);
        messageReturnCheckpoint();
        setTimeout(checkShiftAfterRed, 1500 * gameSpeed);

        if (players[current].power == 0) {
            setTimeout(messageCritic, 1500 * gameSpeed);
        }
    }
}

// проверка смещения фишки после красной клетки

function checkShiftAfterRed() {
    cellIndex = getCellIndexById(players[current].currentCell);
    let rivalsArray = getRivalsArray();
    if (rivalsArray.length > 0) {
        setTimeout(function () {
            shiftTokens(rivalsArray.length)
        }, 50 * gameSpeed );
    }
    if (players[current].power == 0) {

        if (players[current].type === "human") {
            popupLowEnergy();
        } else {
            pressAttackImp(); // активирует getCellType
        }

    } else {
        setTimeout(moveIsOver, 500 * gameSpeed);
    }
}

// BLACK функция чёрной клетки -1 ед. силы

function executeBlack() {
    messageRed(true);
    players[current].power--;
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

        if (players[current].type === "human" && players[current].power == 0) {
            cameFromBlack = true;
            popupLowEnergy();
        } else {
            if (players[current].nextCond === "none") {
                setTimeout(moveIsOver, 1500 * gameSpeed);
            } else {
                setTimeout(function () { // активация 2-го условия на клетке
                    getCellType(true);
                }, 500 * gameSpeed);
            }
        }
    }
}

// YELLOW функция желтой клетки - дополнительный ход

function executeYellow(orange) {
    if (orange) {
        players[current].bonusMoves += 2;
        messageOrange();
    } else {
        players[current].bonusMoves++;
        messageYellow();
    }

    if (players[current].type == "human") {
        console.log("Бросает человек executeYellow");
        infoMoveHuman();
    } else {
        infoMoveComp();
        console.log("Бросает компьютер executeYellow");
    }

    changePlayer();
}

// GREEN функция зеленой клетки - пропуск хода

function executeGreen() {
    players[current].skipMoves++;
    setNail(players[current].name, players[current].skipMoves);
    messageGreen();
    moveIsOver(); // второе условие на клетке активируется после первого пропуска
}

// STAR функция звезды - прибавление сил

function executeStar(red) {

    if (red) {
        players[current].power += 2;
    } else {
        players[current].power++;
    }

    messageStar(red);
    refreshPowercells();
    moveIsOver();
}

function executeSpeed() {
    players[current].speed = 3;
    let path = players[current].name.querySelector(".player__speed");
    path.style.display = "block";
    messageSpeed();
    moveIsOver();
}

function executeArrowBlue() {
    messageArrowBlue();
    if (players[current].type === "human") {
        infoMoveHuman(true);
    } else {
        setTimeout(throwCubic, 1000 * gameSpeed);
    }
}

// BRANCH выбор направления движения

function executeBranch(branchid) {

    if (stepsCounter == cubicScore) {
        return;
    }

    players[current].name.style.zIndex = "505";
    console.log(players[current].label + " должен выбрать направление");
    messageBranchIn();
    if (players[current].type == "human") {
        infoBranch();
    }
    turnOnBranch(branchid);
}

// BRANCH включение определенного бранча

function turnOnBranch(branchid) {

    if (branchid === "a") {
        branch1 = branchA1;
        branch2 = branchA2;
        branch3 = branchA3;
    } else if (branchid === "b") {
        branch1 = branchB1;
        branch2 = branchB2;
        branch3 = branchB3;
    } else if (branchid === "c") {
        branch1 = branchC1;
        branch2 = branchC2;
        branch3 = branchC3;
    } else {
        branch1 = branchD1;
        branch2 = branchD2;
        branch3 = branchD3;
    }

    branch1.setAttribute("src", "img/branch-anim.gif");
    branch2.setAttribute("src", "img/branch-anim.gif");
    branch3.setAttribute("src", "img/branch-anim.gif");
    branch1.style.zIndex = "510";
    branch2.style.zIndex = "510";
    branch3.style.zIndex = "510";

    if (players[current].type === "human") {
        branch1.style.cursor = "pointer";
        branch2.style.cursor = "pointer";
        branch3.style.cursor = "pointer";
        branch1.addEventListener("click", pressBranchA);
        branch2.addEventListener("click", pressBranchB);
        branch3.addEventListener("click", pressBranchC);
    } else {
        aiMakeDecision("whichBranch");
    }
}

function pressBranchA() {
    branchSelect(1);
}
function pressBranchB() {
    branchSelect(2);
}
function pressBranchC() {
    branchSelect(3);
}

// BRANCH игрок выбрал направление движения

function branchSelect(choose) {

    let temp = [branch1, branch2, branch3]
    for (let i = 0; i < temp.length; i++) {
        temp[i].setAttribute("src", "img/branch.png");
        temp[i].style.cursor = "default";
        temp[i].removeEventListener("click", pressBranchA);
        temp[i].removeEventListener("click", pressBranchB);
        temp[i].removeEventListener("click", pressBranchC);
    }

    if (choose == 1) {
        players[current].currentCell += 100;
        branch1.setAttribute("src", "img/branch-selected.png");
    } else if (choose == 2) {
        players[current].currentCell += 200;
        branch2.setAttribute("src", "img/branch-selected.png");
    } else {
        players[current].currentCell += 300;
        branch3.setAttribute("src", "img/branch-selected.png");
    }

    branchOver = true;
    console.log("Сработал Branch. currentCell у игрока = " + players[current].currentCell);
    messageBranchOut();
    if (players[current].type === "human") {
        divScore.innerHTML = "";
    }
    setTimeout(function () {
        move();
        let branches = document.querySelectorAll(".branch");
        branches.forEach(function (item) {
            item.style.zIndex = "499";
        })
    }, 300 * gameSpeed);
}


// ИСПОЛЬЗОВАНИЕ ПРЕДМЕТОВ
// магнит

function useMagnet() {
    console.log("Нажат useMagnet");
    magName.innerHTML = "Ход магнитом";
    magName.style.color = "white";
    magText.innerHTML = "Вероятность появления этого числа будет увеличена" + "<b>" + " в 2 раза." + "</b>";
    showPopup(mag, magCont, 315, 390);
}

function useSMagnet() {
    console.log("Нажат useMagnet");
    magName.innerHTML = "Ход СУПЕР-магнитом";
    magName.style.color = "red";
    magText.innerHTML = "Вероятность появления этого числа будет увеличена" + "<b>" + " в 3 раза." + "</b>";
    showPopup(mag, magCont, 315, 390);
}

// щит

function useShield() {
    console.log("Нажат useShield");
    let invShield1 = document.querySelector(".js-inv-field .inventory--shield1");
    let invShield2 = document.querySelector(".js-inv-field .inventory--shield2");
    let invShield3 = document.querySelector(".js-inv-field .inventory--shield3");
    let slot;
    if (window.getComputedStyle(invShield1).boxShadow === "rgb(0, 255, 0) 0px 0px 3px 2px inset") {
        slot = document.querySelector(".overlay__shield--1");
        slot.style.display = "block";
    }
    if (window.getComputedStyle(invShield2).boxShadow === "rgb(0, 255, 0) 0px 0px 3px 2px inset") {
        slot = document.querySelector(".overlay__shield--2");
        slot.style.display = "block";
    }
    if (window.getComputedStyle(invShield3).boxShadow === "rgb(0, 255, 0) 0px 0px 3px 2px inset") {
        slot = document.querySelector(".overlay__shield--3");
        slot.style.display = "block";
    }
    let player = findHuman();
    executeShield(player, "wood", slot);
}

function useIShield() {
    console.log("Нажат useIShield");
    let invShield1 = document.querySelector(".js-inv-field .inventory--shield1");
    let invShield2 = document.querySelector(".js-inv-field .inventory--shield2");
    let invShield3 = document.querySelector(".js-inv-field .inventory--shield3");
    let slot;
    if (window.getComputedStyle(invShield1).boxShadow === "rgb(0, 255, 0) 0px 0px 3px 2px inset") {
        slot = document.querySelector(".overlay__ishield--1");
        slot.style.display = "block";
    }
    if (window.getComputedStyle(invShield2).boxShadow === "rgb(0, 255, 0) 0px 0px 3px 2px inset") {
        slot = document.querySelector(".overlay__ishield--2");
        slot.style.display = "block";
    }
    if (window.getComputedStyle(invShield3).boxShadow === "rgb(0, 255, 0) 0px 0px 3px 2px inset") {
        slot = document.querySelector(".overlay__ishield--3");
        slot.style.display = "block";
    }
    let player = findHuman();
    executeShield(player, "iron", slot);
}

function executeShield(player, type, slot) { // player в формате players[i]
    console.log("executeShield");

    // ставим блок на остальные щиты
    if (player.type === "human") {
        invs1.style.display = "block";
        invs2.style.display = "block";
        invs3.style.display = "block";
        if (slot.classList.contains("overlay__shield--1") || slot.classList.contains("overlay__ishield--1")) {
            invs1.style.backgroundColor = "transparent";
        }
        if (slot.classList.contains("overlay__shield--2") || slot.classList.contains("overlay__ishield--2")) {
            invs2.style.backgroundColor = "transparent";
        }
        if (slot.classList.contains("overlay__shield--3") || slot.classList.contains("overlay__ishield--3")) {
            invs3.style.backgroundColor = "transparent";
        }
    }

    let pathShield = player.name.querySelector(".player__shield");
    pathShield.style.display = "block";
    if (type === "wood") {
        player.armor += 1;
        player.shields--;
        pathShield.setAttribute("src", "img/armor-wood.png");
        messageArmorOn(player, false);
    } else {
        player.armor += 3;
        player.ishields--;
        pathShield.setAttribute("src", "img/armor-iron.png");
        messageArmorOn(player, true);
    }
    if (player.type === "comp") {
        fillWhatInventory();
    }
}

// удалить щит с игрока

function removeShield(player) {

    console.log("щит удалён");
    let pathShield = player.name.querySelector(".player__shield");
    pathShield.style.display = "none";

    if (player.type === "human") {
        invShieldsUnblock();
        invs1.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
        invs2.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
        invs3.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
        let slots = document.querySelectorAll(".overlay__shield");
        for (let i = 0; i < slots.length; i++) {
            slots[i].style.display = "none";
        }
        cleanInventory();
        fillInventory();
    }
}

// проверка статуса конфликта: защищен ли игрок, достаточно ли энергии, сколько соперников, игрок человек или компьютер

function getConflictStatus(check) { // check - если true, соперник защищен protection

    if (gamePaused) {
        pausePromise = {
            arg1: check,
            script: function () {
                getConflictStatus(pausePromise.arg1);
                pausePromise = {};
            }
        }
        return;
    }

    if ( check === true ) { // если соперники защищены, атаки не произойдет

        let getCellId = getCellIndexById(players[current].currentCell);
        if (curMap[getCellId].type === "checkpoint") {

            if (players[current].type === "human") {
                popupAttackImpCP(); // активирует getCellType
            } else {
                pressAttackImp(); // активирует getCellType
            }

        } else {
            setTimeout(getCellType, 500 * gameSpeed);
        }
        return;
    }

    if (players[current].power < 1) { // если у игрока недостаточно энергии

        if (playerRival.length > 0) {

            if (players[current].type === "human") {
                popupAttackImp();
            } else {
                pressAttackImp(); // активирует getCellType
            }

        } else {
            setTimeout(getCellType, 500 * gameSpeed);
        }
        return;
    }

    switch (playerRival.length) { // проверка, если соперников несколько
        case 1:
            selectedRival = playerRival[0];

            // атака на соперника со щитом
            if (selectedRival.armor > 0) {
                if (players[current].type === "human") {
                    popupAttackArmor();
                } else {
                    pressAttackImp(); // активирует getCellType
                }
                messageAttackArmor();
                break;
            }

            if (players[current].type === "human") {
                popupAttackOnce(selectedRival);

                // подсказка - атака
                if (showedHintAttack === false) {
                    nextScript = {
                        script: function () {
                            showedHintAttack = true;
                        }
                    };
                    hintLine.push("hintAttack");
                    startHintLine();
                }

            } else {
                aiMakeDecision("attackOrNot");
            }

            break;
        case 2:

            if (players[current].type === "human") {
                popupAttackDouble(); // активирует attackOne, attackTwo, attackCancel, кнопку Выбрать другого

                // подсказка - атака
                if (showedHintAttack === false) {
                    nextScript = {
                        script: function () {
                            showedHintAttack = true;
                        }
                    };
                    hintLine.push("hintAttack");
                    startHintLine();
                }

            } else {
                aiMakeDecision("attackWho");
            }

            break;
        case 3:

            if (players[current].type === "human") {
                popupAttackTriple(); // активирует attackOne, attackTwo, attackThree, attackCancel, кнопку Выбрать другого

                // подсказка - атака
                if (showedHintAttack === false) {
                    nextScript = {
                        script: function () {
                            showedHintAttack = true;
                        }
                    };
                    hintLine.push("hintAttack");
                    startHintLine();
                }

            } else {
                aiMakeDecision("attackWho");
            }
            break;
    }
}

// узнать, есть ли в массиве rivalsArray хотя бы один игрок с защитой от атаки

function getProtectionStatus(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].protection === true) {
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
    refreshPowercells();
    console.log(players[current].label + ": сила теперь = " + players[current].power);

    if (players[current].power == 0) {

        if (players[current].type === "human") {
            popupLowEnergy();
        } else {
            pressAttackImp(); // активирует getCellType
        }

        messageCritic();
    } else {
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
    console.log("Нажат ОК pressAttackImp");
    hidePopup(AttackImp, AttackImpCont);
    if (players[current].nextCond === "none") {
        if (cameFromBlack) {
            setTimeout(moveIsOver, 500 * gameSpeed);
        } else {
            setTimeout(getCellType, 500 * gameSpeed);
        }
        cameFromBlack = false;
    } else {
        // проверка 2-го условия на клетке
        setTimeout(function () {
            getCellType(true);
        }, 500 * gameSpeed);
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
    if (players[current].type === "human" && ( playersCount == 2 || playersCount == 3) ) {
        popupEndrace();
    } else if (players[current].type === "comp") {
        setTimeout(moveIsOver, 2000);
    }
}

// игрок хочет досмотреть заезд

function pressWatch() {
    console.log("pressWatch");
    hidePopup(Endrace, EndraceCont);
    moveIsOver();
    cleanInventory();
}

// игрок прервал заезд

function pressNext() {
    console.log("pressNext");
    cleanInventory();
    hidePopup(Endrace, EndraceCont);
    raceInterrupt = true;

    // создаем массив игроков, которые еще не финишировали
    let array = [];
    for (let i = 0; i < players.length; i++) {
        if (players[i].finished === false) {
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
            array[i].currentCell = 0;
            setNail(array[i].name, 0);
            let check = getMyWinPlace(array[i]);
            for (let j = 0; j < curMapParam.pedestalCoords.length; j++) {
                if ( curMapParam.pedestalCoords[j].cellid === check ) {
                    array[i].name.style.left = curMapParam.pedestalCoords[j].coorX + "px";
                    array[i].name.style.top = curMapParam.pedestalCoords[j].coorY + "px";
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
    Ranktable1Bonus.style.display = "none";
    Ranktable2Bonus.style.display = "none";
    Ranktable3Bonus.style.display = "none";
    Ranktable4Bonus.style.display = "none";
    tableMoney1.innerHTML = "$ " + players[0].capital;
    tableMoney2.innerHTML = "$ " + players[1].capital;
    tableMoney3.innerHTML = "$ " + players[2].capital;
    tableMoney4.innerHTML = "$ " + players[3].capital;

    if (curMap === Map05) {
        popupMap05Warning();
        destroyMap();
        return;
    }
    if (curMap === Map06) {
        whosMOP();
        destroyMap();
        return;
    }

    popupShop();
}

// исполняется по окончании хода

function moveIsOver() {

// подсказка - легенда

    if (players[current].type === "human" && showedHintLegend === false && curMap === Map01) {
        nextScript = {
            script: function () {
                showedHintLegend = true;
                moveIsOver();
            }
        };
        hintLine.push("hintLegend");
        startHintLine();
        return;
    }

    // удаление свечения
    let glowOld = players[current].name.querySelector(".player__glow");
    glowOld.classList.remove("player__glow-act");

    //смена игрока
    changePlayer();
    while (players[current].finished === true) {
        console.log(players[current].label + " отсутствует на поле");
        changePlayer();
    }

    // разблокировка щитов у человека, активация проверки щитов у компьютера
    let human = findHuman();
    if (human.armor == 0 && human.finished === false) {
        invShieldsUnblock();
    }
    for (let i = 0; i < players.length; i++) {
        if (players[i].type === "comp" && players[i].finished === false && players[i].armor == 0 && players[i].label !== players[current].label) {
            aiUseShield(players[i]);
        }
    }

    // завершение трассы
    if (playersCount < 2) {
        raceIsOver();
    } else {
        // переход хода
        console.log(players[current].label + " ХОДИТ");
        messageMoving();
        let glowNew = players[current].name.querySelector(".player__glow");
        glowNew.classList.add("player__glow-act");
        refreshTableSelect();
        if (players[current].type === "human") {
            console.log("Бросает человек moveIsOver");
            infoMoveHuman();
        } else {
            infoMoveComp();
            console.log("Бросает компьютер moveIsOver");
        }
    }
}

// исполняется по окончании заезда

function raceIsOver() {
    console.log("ЗАЕЗД ОКОНЧЕН");
    if (raceInterrupt === false) {
        moveToPedestal();
    }
    cleanInventory();
    whatButton.style.display = "none";
    inventoryBonus.style.visibility = "hidden";
    divScore.classList.remove("move__info-yours");
    divScore.classList.remove("move__info-skip");
    divScore.innerHTML = "";
    // выключить имена над фишками
    labels.forEach(function (item) {
        item.style.display = "none";
    });
    popupRank();
}

