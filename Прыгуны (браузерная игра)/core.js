//автозапуск

window.onload = function() {
    console.log("Сработала автозагрузка");

    setTimeout(function () { // ПОЯВЛЕНИЕ МЕНЮ
        let loading = document.querySelector(".loading");
        if (loading) loading.remove();
        startMenu.style.display = "flex";
        loadSlots();
    }, 500);

    /*setTimeout(function () {
        let loading = document.querySelector(".loading");
        if (loading) loading.remove();
        startMap(9);
        skipTutorial = true;
        players[1].aiType = "risky";
        players[2].aiType = "careful";
        gameSpeed = 1;
    }, 500);*/

    /*setTimeout(function () {
        popupMap11WinGeneral();
    }, 1800);*/

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
// копилка
const mbPanel = document.querySelector(".moneybag");
const mbPanelSteps = {
    step1: document.querySelector(".moneybag__step--1"),
    step2: document.querySelector(".moneybag__step--2"),
    step3: document.querySelector(".moneybag__step--3"),
    step4: document.querySelector(".moneybag__step--4"),
    step5: document.querySelector(".moneybag__step--5"),
    step6: document.querySelector(".moneybag__step--6"),
    step7: document.querySelector(".moneybag__step--7"),
    step8: document.querySelector(".moneybag__step--8"),
    step9: document.querySelector(".moneybag__step--9"),
    step10: document.querySelector(".moneybag__step--10"),
}

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
const branchE1 = document.querySelector(".branch-E1");
const branchE2 = document.querySelector(".branch-E2");
const branchE3 = document.querySelector(".branch-E3");
const branchF1 = document.querySelector(".branch-F1");
const branchF2 = document.querySelector(".branch-F2");
const branchF3 = document.querySelector(".branch-F3");
const branchG1 = document.querySelector(".branch-G1");
const branchG2 = document.querySelector(".branch-G2");
const branchH1 = document.querySelector(".branch-H1");
const branchH2 = document.querySelector(".branch-H2");
const powerWhite = 2;
const powerYellow = 3;
const powerRed = 4;
const powerGreen = 5;
const powerBlue = 6;
const powerBrown = 8;
const powerBlack = 10;
const bombTimer = 16;
// цены
const costWhite = 0;
const costYellow = 350;
const costRed = 600;
const costGreen = 1000;
const costBlue = 1500;
const costBrown = 2100;
const costBlack = 2700;
const costMagnet = 50;
const costSMagnet = 200;
const costShield = 50;
const shieldPower = 30;
const costIShield = 150;
const ishieldPower = 80;
const costTrap = 200;
const trapPower = 400;
const costVampire = 150;
const costImp = 990;
const costManipulator = 5000;
const sellMagnet = 30;
const sellSMagnet = 100;
const sellShield = 30;
const sellIShield = 80;
const sellVampire = 80;
const sellTrap = 100;
const sellMop = 200;
const mbPrize1 = 60;
const mbPrize2 = 30;

// глобальные переменные
let name1;
let name2;
let name3;
let userName; // временное хранение имен игроков
let cubicScore; // очки на кубике
let stepsCounter = 0; // считалка ходов
let stId; // запоминает id клетки, с которой игрок начал движение
let cellIndex; // запоминает индекс клетки, на которой стоит текущий игрок
let playerRival = []; // массив текущих соперников
let selectedRival; // выбранный игроком соперник
let selectedCell; // выбранная клетка
let selectedCellPath;
let gameSpeed = 1.4; // скорость игры. 1 - быстрая, 1.4 - нормальная
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
let mbOver = false; // закончила ли работу копилка
let branch1 = branchA1; // адреса до бранчей, с которыми в данный момент работает игрок
let branch2 = branchA2;
let branch3 = branchA3;
let skipTutorial = false;
let cameFromBlack = false; // игрок пришёл на кнопку pressAttackImp с чёрной клетки
let animArrow; // состояние анимационной красной стрелки в popupHint
let animUseArrow; // состояние анимационной красной стрелки в hintUse
let vampired = false; // произошёл вампирский укус - переменная используется для активации обработки игрока-владельца клыков
let pedestalPlayer; // какого игрока сейчас отправляем на пьедестал
let moneybagStep = 1; // на каком шаге сейчас находится копилка
let reputation = 0; // репутация юзера в текущей игре
let firstBite = true; // показывать ли попап popupSkullBite
let secondBite = true;
let mapRestarted = false; // карта была перезапущена (трассы 12,13,14)
let gameTime = 0; // отсчёт времени. Начинает считать, когда игрок нажимает ОК на окне знакомства с Императором, и в момент загрузки игры
let lastZIndex; // запомнить последний zIndex фишки
let lastBuy; // модель фишки, купленная человеком - используется для появления сообщения об этом
let winner; // победитель прыгунов на 11 трассе
let winnerImg;
let impGiven; // произошёл ли уже процесс передачи imp
let impUse = false; // игрок использовал imp (нужно для баг-фикса тупиковой ветки)

// концовка трассы 15
let escape = false; // игра в режиме "побега"
let escapedWhite = false; // false - белая фишка не добралась до финиша; true - добралась
let escapedChamp = false;
let hostageAlone = false; // баг фикс, чтобы бомба не тикала лишний раз после финиша чемпиона

// система рейтинга

let ratingMass = [];

class RatingRow {
    constructor(name, money, map, rep, time, date) {
        this.name = name;
        this.money = money;
        this.map = map;
        this.rep = rep;
        this.time = time;
        this.date = date;
    }
}

function createRatingRow(player) {
    let map;
    for (let i = 0; i < mapList.length; i++) {
        if (mapList[i] == curMap) {
            map = i + 1;
            break;
        }
    }

    let gametimeStr = getGameTime(gameTime);

    let date = new Date();
    let dateStr = date.toString();
    let timeStr = dateStr.substr(11, 4) + " " + dateStr.substr(4, 3) + " " + dateStr.substr(8,2) + " " + dateStr.substr(16,2) + ":" + dateStr.substr(19,2);

    let row = new RatingRow(player.label, player.capital, map, reputation, gametimeStr, timeStr);
    ratingMass.push(row);
    console.log("Создана новая строка в рейтинге: ");
    console.log(row);
}

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
let getRating = JSON.parse(localStorage.getItem("jumpers-rating"));
if (getRating) {
    ratingMass = getRating;
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
let conditionsCount = 5; // кол-во открытых условий, макс 18
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
let knowJoker = false;
let knowBone = false;

// список карт и их параметров
// (!!! Индекс карты в mapList должен соответствовать индексу её параметров в mapParamList !!! )

const mapList = [
    Map01,
    Map02,
    Map03,
    Map04,
    Map05,
    Map06,
    Map07,
    Map08,
    Map09,
    Map10,
    Map11,
    Map12,
    Map13,
    Map14,
    Map15,
]

const mapParamList = [
    Map01param,
    Map02param,
    Map03param,
    Map04param,
    Map05param,
    Map06param,
    Map07param,
    Map08param,
    Map09param,
    Map10param,
    Map11param,
    Map12param,
    Map13param,
    Map14param,
    Map15param,
]
let curMap = mapList[0]; // текущая карта
let curMapParam = mapParamList[0]; // параметры текущей карты

class Players {

    type = "human"
    aiType = "balanced"
    power = 0
    bonusMoves = 0
    skipMoves = 0
    moves = 0
    currentCell = 0 // id текущей клетки, высчитывается во время движения, если 0 то значит на старте
    protection = true // защита от атак на чекпойнте, пьедестале, старте и т.п.
    armor = 0 // текущий уровень щита игрока
    iron = false // надет ли железный щит
    circle = 0 // к игроку вернулся ход после полного круга, исп. для снятия щита
    finished = false
    shiftPos = 1 // если на одной клетке много соперников: смещение на ступень. По умолчанию ступень = 1, самое высокое 4
    fore = false // надо ли писать в логе про фору
    buyCount = 0 // магазин: сколько раз покупал что-то несколько трасс подряд
    dream = "none" // магазин: есть ли "цель на модель", если есть, то какая
    speed = -1 // сколько осталось ходов с молнией: -1 ничего не произойдет, 0 по скрипту вылезет сообщение, 3 при попадании на молнию
    catchUp = false // правило бонуса отстающему; игнорируется, если есть молния
    reverse = false // ходит обратно
    nextCond = "none" // для клеток с двумя условиями: какое второе условие выполнить после выполнения первого
    entity = "none" // сущность фишки: обычная(none), череп(skull), супер-фишка(sup)

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
    mopCheck = false // случилась ли на данной трассе проверка швабры
    imp = 0
    impUsed = false // применял ли комп-игрок на данной трассе невозможный кубик
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

function setNames(humanName) {

    if (!humanName) {
        userName = "Игрок D";
    } else {
        userName = humanName;
    }

    let nameList = [];
    // не должно быть повторов, совпадений с именем юзера, первая буква в каждом имени разная
    let namesIndex;

    for (let i = 0; i < 4; i++) {

        let letters = []; // вычисление первых букв каждого имени в массиве nameList
        for (let j = 0; j < nameList.length; j++) {
            letters.push( nameList[j][0] );
        }

        do {
            namesIndex = Math.floor( Math.random() * names.length);
        } while ( nameList.includes( names[namesIndex] ) || letters.includes( names[namesIndex][0] ) || names[namesIndex] === userName );
        nameList.push( names[namesIndex] );
    }
    name1 = nameList[0];
    name2 = nameList[1];
    name3 = nameList[2];
}

function createPlayers(name1, name2, name3, name4) {
    playerA = new Players(document.querySelector(".player-A"), "A", name1,"white", 1, "comp");
    playerB = new Players(document.querySelector(".player-B"), "B", name2,"white", 2, "comp");
    playerC = new Players(document.querySelector(".player-C"), "C", name3,"white", 3, "comp");
    playerD = new Players(document.querySelector(".player-D"), "D", name4,"white", 4, "human");

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

        if (players[i].entity !== "none") {
            players[i].power = 10000;
            continue;
        }
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

    console.log("Сила установлена из setPower");
}

// обновить ячейки силы

function refreshPowercells() {

    for (let j = 0; j < players.length; j++) {
        if (players[j].finished || players[j].power < 0) {
            continue;
        }
        // зажигаем все ячейки
        for (let i = 0; i < 10; i++) {
            powerset[j][i].style.background = "#E0EAFF";
            powerset[j][i].style.boxShadow = "0 0 3px #BAD2FF, inset 0 0 2px 1px #89AEF9";
        }

        if (players[j].power <= 10) {
            // гасим некоторые ячейки, если сила меньше 10
            for (let x = players[j].power; x < 10; x++) {
                powerset[j][x].style.background = "#2B4370";
                powerset[j][x].style.boxShadow = "inset 0 0 2px 1px #1B2434";
            }
        } else if (players[j].power == 11) {
            // сила 11, ячейки фиолетовые
            for (let x = 0; x < 10; x++) {
                powerset[j][x].style.background = "#f4e4ff";
                powerset[j][x].style.boxShadow = "0 0 3px #e5b9ff, inset 0 0 2px 1px #9744c9";
            }
        } else {
            // сила больше 11, ячейки красные
            for (let x = 0; x < 10; x++) {
                powerset[j][x].style.background = "#ffe4e4";
                powerset[j][x].style.boxShadow = "0 0 3px #ff9292, inset 0 0 2px 1px #ff0e0e";
            }
        }
    }
}

// задать фишкам цвета (визуально)

function setTokenColors() {

    if (curMapParam.bone) {
        // форс на чёрную фишку в супер-игре
        players[3].model = "black";
    }

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

    if (playersCount > 2) {

// место 1
        setInfoModelColor(players[0], tableToken1);
        tableMoney1.innerHTML = "$ " + players[0].capital;
        tableName1.innerHTML = players[0].label;

// место 2
        setInfoModelColor(players[1], tableToken2);
        tableMoney2.innerHTML = "$ " + players[1].capital;
        tableName2.innerHTML = players[1].label;

        document.querySelector(".info__player--I").style.display = "flex";
        document.querySelector(".info__player--II").style.display = "flex";
        document.querySelector(".info__place4").innerHTML = "IV";
        document.querySelector(".info__place3").innerHTML = "III";
    } else {
        // код для 2-х игроков
        document.querySelector(".info__player--I").style.display = "none";
        document.querySelector(".info__player--II").style.display = "none";
        document.querySelector(".info__place4").innerHTML = "II";
        document.querySelector(".info__place3").innerHTML = "I";
    }

// место 3
    setInfoModelColor(players[2], tableToken3);
    tableMoney3.innerHTML = "$ " + players[2].capital;
    tableName3.innerHTML = players[2].label;

// место 4
    setInfoModelColor(players[3], tableToken4);
    tableMoney4.innerHTML = "$ " + players[3].capital;
    tableName4.innerHTML = players[3].label;
}

// указать цвет фишки в табло (в т.ч. в popupWhatInv)

function setInfoModelColor(player, tablePath, what) {

    if (player.entity === "skull") {
        tablePath.style.display = "none";
        let root = tablePath.closest(".info__player");
        root.querySelector(".info__skull").style.display = "block";
        root.querySelector(".info__player-power").style.visibility = "hidden";
        root.querySelector(".info__player-right").style.visibility = "hidden";
        return;
    } else {
        tablePath.style.display = "flex";
        tablePath.style.background = "none";
        if (!what) {
            let root = tablePath.closest(".info__player");
            let skull = root.querySelector(".info__skull");
            if (skull) {
                skull.style.display = "none";
                root.querySelector(".info__player-power").style.visibility = "visible";
                root.querySelector(".info__player-right").style.visibility = "visible";
            }
        }
    }

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
            tablePath.style.backgroundColor = "#339c29";
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

    if ( player.name.classList.contains("player-A") ) {
        tablePath.innerHTML = "<p>" + "A" + "</p>";
    } else if ( player.name.classList.contains("player-B") ) {
        tablePath.innerHTML = "<p>" + "B" + "</p>";
    } else if ( player.name.classList.contains("player-C") ) {
        tablePath.innerHTML = "<p>" + "C" + "</p>";
    } else {
        tablePath.innerHTML = "<p>" + "D" + "</p>";
    }

    if (player.entity === "sup") {
        tablePath.style.background = "linear-gradient(to bottom right, #ffdc1a, #ffdc1a, #4921ff, #ff2121, #ff2121)";
        let root = tablePath.closest(".info__player");
        root.querySelector(".info__player-power").style.visibility = "hidden";
        root.querySelector(".info__player-right").style.visibility = "hidden";
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
        images = document.querySelectorAll(".inventory--field .inventory-item img, .inventory--field .inventory--manipulator img");
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
            itemsMass[i].removeEventListener("click", useIMP);
            itemsMass[i].removeEventListener("click", useMop);
            itemsMass[i].removeEventListener("click", useTrap);
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

    if (player.imp > 0 && !invImp.querySelector("img") ) {
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
                item.addEventListener("click", useTrap);
                break;
            case "Невозможный кубик":
                item.addEventListener("click", useIMP);
                break;
            case "Швабра":
                item.addEventListener("click", useMop);
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

function destroyMap(restart) {
    console.log("удаление карты");
    let elems = document.querySelectorAll(".cell, .cell-finish, .cell-deadend, .cell-arrow-node, .cell-jail, .cell-chest, .log__message");
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
    lookButton.style.display = "none";
    surrenderBtn.style.display = "none";
    mbPanel.style.display = "none";
    tokenOpacityOff();
    if (!restart) {
        inventoryBonus.style.visibility = "hidden";
        let path = document.querySelectorAll(".info__player-bonus");
        path.forEach(function (item) {
            item.style.visibility = "hidden";
        });
    }

    let invArray = document.querySelectorAll(".overlay__invblock, .overlay__shield, .cubic__icon");
    invArray.forEach(function (item) {
        item.style.display = "none";
    });
}

// подготовка поля к загрузке карты

function setUpField() {
    console.log("Подготовка поля");

// удаление элементов главного меню

    logo.style.display = "none";
    jungles.style.display = "none";
    copyright.style.display = "none";
    startMenu.style.display = "none";

// загрузка базовых элементов

    document.querySelector(".container").style.width = "1190px";
    field.style.width = "880px";
    if (curMap === Map01) field.style.backgroundImage = "url(\"img/bg/field_bg1.jpg\")";
    rightBlock.style.display = "flex";
    document.querySelector(".info__cont").style.display = "flex";
    overlayCubic.style.display = "block";
    cubic.style.display = "block";
    cubic.querySelector("img").setAttribute("src", "img/cubic/cubic_start.png");
    kbThrowCubicOff();
    inventoryField.style.display = "flex";
    mbPanel.style.display = "none";
    let mbSteps = document.querySelectorAll(".moneybag__step");
    mbSteps.forEach(function (item) {
        item.style.visibility = "visible";
    });
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
    stepsCounter = 0;
    playerRival = [];
    branchOver = false;
    mbOver = false;
    cameFromBlack = false;
    gamePaused = false;
    pausePromise = {};
    hintLine = [];
    nextScript = {
        script: function () {},
        showed: function () {},
        popup: function () {},
    };
    vampired = false;
    moneybagStep = 1;
    escape = false;
    escapedWhite = false;
    escapedChamp = false;
    hostageAlone = false;
    impUse = false;

    // удаление свечения
    for (let i = 0; i < players.length; i++) {
        players[i].name.querySelector(".player__glow").classList.remove("player__glow-act");
        if (players[i].entity === "skull") {
            players[i].name.style.backgroundImage = "url(\"img/tokens/skull.png\")";
        }
    }

// сюда можно вписывать чит-коды
    /*players[0].model = "yellow";
    players[1].model = "red";
    players[2].model = "yellow";
    players[3].model = "yellow";*/
    /*players[0].capital = 6000;
    players[1].capital = 200;
    players[2].capital = 200;
    players[3].capital = 200;*/
    /*for (let i = 0; i < players.length; i++) {
        players[i].magnets = 2;
        players[i].smagnets = 1;
        players[i].ishields = 1;
        players[i].shields = 1;
        players[i].trap = true;
        players[i].vampire = true;
        players[i].mop = true;
        players[i].imp = 3;
    }*/
    /*players[0].place = 2;
    players[1].place = 3;
    players[2].place = 4;
    players[3].place = 1;*/
    /*players[0].model = "brown";
    players[1].model = "black";
    players[2].model = "brown";
    players[3].model = "black";
    players[0].magnets = 2;
    players[0].smagnets = 1;*/
    /*players[3].ishields = 1;
    players[3].shields = 2;
    players[3].trap = true;
    players[3].vampire = true;
    players[3].imp = 3;*/
}

// восстановление клеток после манипулятора // только для BONEWORLD!!!

function resetCells() {
    for (let i = 0; i < curMap.length; i++) {
        if (curMap[i].type === "green") curMap[i].type = false;
        if (curMap[i].type === "trapD") curMap[i].type = false;
        if (curMap[i].trapPath) curMap[i].trapPath = false;
    }
    for (let i = 0; i < curMapParam.greenId.length; i++) {
        let index = getCellIndexById(curMapParam.greenId[i]);
        if (curMap[index].type !== "green") curMap[index].type = "green";
        console.log("Клетка " + curMap[index].cellid + " теперь green");
    }
}

// загрузка карты // перед активацией убедись, что curMap именно тот, который надо загрузить

function loadMap(map, mapParam, status, restart) {
    console.log("loadMap");

/*
status:
 -start. Начало уровня
 -finish. Сохранилось в момент, когда появляется попап ranking. При загрузке активируется скрипт, который должен запуститься при нажатии на OK попапа ranking
 -over. Игрок полностью закончил игру - в этом случае открывается попап rating
 -finish11, finish15. Игрок полностью закончил игру, но при этом остаётся несколько попапов, которые он должен посмотреть перед тем, как появится rating.

restart (boolean)
 Трасса была перезапущена на картах 12,13,14,15
*/

    if (restart) {
        mapRestarted = true;
    } else {
        mapRestarted = false;
    }

    if (map === Map01) reputation = 0;
    if (map === Map12 || map === Map14 ) {
        playersCount = 2;
    } else {
        playersCount = 4;
    }
    if (map === Map15) originalMap15();

    // игра сохранится, если трасса загружается впервые (не из меню загрузки), либо с рестарта
    if (!status && !restart) {
        if (map === Map01 || map === Map12) {
            // сохранение в новый слот, проверка на свободный слот
            prepareToSaveNewSlot();
        }
        gameSave("start");
    }

// название и фон трассы

    document.querySelector(".map-name").innerHTML = mapParam.mapName;
    if (map === Map01 || map === Map06) field.style.backgroundImage = "url(\"img/bg/field_bg1.jpg\")";
    if (map === Map02 || map === Map07) field.style.backgroundImage = "url(\"img/bg/field_bg2.jpg\")";
    if (map === Map03 || map === Map08) field.style.backgroundImage = "url(\"img/bg/field_bg3.jpg\")";
    if (map === Map04 || map === Map09) field.style.backgroundImage = "url(\"img/bg/field_bg4.jpg\")";
    if (map === Map05 || map === Map10) field.style.backgroundImage = "url(\"img/bg/field_bg5.jpg\")";
    if (map === Map11) field.style.backgroundImage = "url(\"img/bg/field_bg6.jpg\")";
    if (map === Map12 || map === Map13 || map === Map14) field.style.backgroundImage = "url(\"img/bg/field_bg7.jpg\")";
    if (map === Map15) field.style.backgroundImage = "url(\"img/bg/field_bg8.jpg\")";

    if (status === "over") {
        popupRating("end");
        return;
    }

    if (status === "final15") {
        popupMap15End1();
        return;
    }

    if (status === "final11") {
        pressRankOK();
        return;
    }

// загрузка педестала

    if (mapParam.bone) {
        pedestal.style.display = "none";
    } else {
        pedestal.style.left = mapParam.pedestalX + "px";
        pedestal.style.top = mapParam.pedestalY + "px";
        pedestal.style.display = "block";
    }

// фикс положения карты

    if (!restart) {
        if (map === Map01) {
            mapShift(40, 0);
        }
        if (map === Map03) {
            mapShift(40, 20);
        }
        if (map === Map05) {
            mapShift(0, -20);
        }
        if (map === Map08) {
            mapShift(20, 0);
        }
        if (map === Map09) {
            mapShift(20, 0);
        }
        if (map === Map11) {
            mapShift(-20, 0);
        }
        if (map === Map13) {
            mapShift(20, 60);
        }
        if (map === Map15) {
            mapShift(0, -20);
        }
    }

// загрузка клеток

    for (let i = 0; i < map.length; i++) {
        let cell = drawCell(map[i].type, map[i].num, map[i].bonus);
        field.append(cell);
        cell.style.left = map[i].coorX + "px";
        cell.style.top = map[i].coorY + "px";
    }

// загрузка стрелок

    let arrows = document.querySelector(".arrows");
    arrows.setAttribute("src", mapParam.arrowsUrl);
    arrows.style.left = mapParam.arrowsX + "px";
    arrows.style.top = mapParam.arrowsY + "px";

// загрузка бранчей

    loadBranches();

// загрузка призового фонда

    let prize = document.querySelector(".prize");
    prize.style.display = "block";
    prize.style.right = mapParam.prizeX + "px";
    prize.style.top = mapParam.prizeY + "px";

    let spanp1 = prize.querySelector(".span__p1");
    let spanp2 = prize.querySelector(".span__p2");
    let spanp3 = prize.querySelector(".span__p3");
    let spanp4 = prize.querySelector(".span__p4");
    let prizep1 = prize.querySelector(".prize__p1");
    let prizep2 = prize.querySelector(".prize__p2");
    let prizep3 = prize.querySelector(".prize__p3");
    let prizep4 = prize.querySelector(".prize__p4");

    if (mapParam.bone) {
        spanp1.innerHTML = "Гонорар";
        spanp2.style.display = "none";
        spanp3.style.display = "none";
        spanp4.style.display = "none";
        prizep2.style.display = "none";
        prizep3.style.display = "none";
        prizep4.style.display = "none";
    } else {
        spanp1.innerHTML = "1 место";
        spanp2.innerHTML = "2 место";
        prizep2.innerHTML = "$ " + mapParam.prize2;
        spanp3.innerHTML = "3 место";
        prizep3.innerHTML = "$ " + mapParam.prize3;
        spanp4.innerHTML = "4 место";
        prizep4.innerHTML = "$ " + mapParam.prize4;
        spanp2.style.display = "block";
        spanp3.style.display = "block";
        spanp4.style.display = "block";
        prizep2.style.display = "block";
        prizep3.style.display = "block";
        prizep4.style.display = "block";
    }
    prizep1.innerHTML = "$ " + mapParam.prize1;

    loadTokens(map, mapParam, restart);
    if (status !== "restart" && !restart) {
        if (curMap !== Map13 && curMap !== Map14) {
            // баг фикс: сила восстанавливалась при переходе на карты 13 и 14, если они загружались впервые
            setPower();
        }
    }

    // чит-коды для энергии и AI TYPE

    /*players[0].power = 1;
    players[1].power = 1;
    players[2].power = 1;
    players[3].power = 1;*/
    /*players[0].type = "human";
    players[1].type = "human";
    players[2].type = "human";*/

    // конец чит-кодов
    
    refreshPowercells();

    // удаление всех блоков инвентаря и оверлеев кубика

    let invArray = document.querySelectorAll(".overlay__invblock, .overlay__shield, .cubic__icon");
    invArray.forEach(function (item) {
        item.style.display = "none";
    });

    // восстановить блоки там, где нужно
    blockHumanInv(true);

    if (!restart) {
        setInfoTable(); // загружено табло справа
        cleanInventory();
        refreshRep(); // обновление шкалы репутации
        fillInventory(); // обновлен инвентарь игрока Д
    }
    if (status !== "finish") {
        refreshTableSelect(); // обновлено свечение текущего игрока в табло
        setTimeout(function () {
            setTokensPosition(map, mapParam);
        }, 1000 * gameSpeed);
    }

// правило ФОРЫ

    /*if (curMap !== Map01) {
        players[0].bonusMoves = 2;
        players[0].fore = true;
        players[1].bonusMoves = 1;
        players[1].fore = true;
    }*/

// разблокировка условий для popupHelp
    if (!restart) unlockHelp(map);

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
    if (knowJoker) document.querySelector(".help__item--joker").style.display = "block";
    if (knowBone) document.querySelector(".help__item--bone").style.display = "block";
    kbPauseOn();

// начать игру // условия появления всплывающих окон

    if (restart) return;

    if (status === "start" || !status) {

        switch (map) {
            case Map01:
                hintLine = ["hintRaceBegin", "hintPedestal", "hintInfoTable", "hintLog"];
                nextScript.script = function () {
                        setTimeout(gameStart, 500 * gameSpeed);
                    }
                setTimeout(startHintLine, 1800 * gameSpeed);
                break;
            case Map02:
                setTimeout(popupNewcondBranch, 1800 * gameSpeed); // также запускает speed и surprise
                break;
            case Map03:
                setTimeout(popupNewcondOrange, 1800 * gameSpeed); // также запускает black
                break;
            case Map04:
                setTimeout(popupHalfway, 1800 * gameSpeed); // также запускает bonus и starOr
                break;
            case Map05:
                nextScript.popup = function () {
                        popupNewcondSpeed(true); // также запускает deadend
                    }
                setTimeout(tryGiftIMP, 1800 * gameSpeed);
                break;
            case Map06:
                nextScript.popup = function () {
                        popupMap06News(); // также запускает blueArrows
                    }
                setTimeout(tryGiftIMP, 1800 * gameSpeed);
                break;
            case Map07:
                nextScript.popup = function () {
                    popupNewcondStarRed();
                }
                setTimeout(tryGiftIMP, 1800 * gameSpeed);
                break;
            case Map08:
                nextScript.popup = function () {
                    popupNewcondMB(); // также запускает popupNewcondHatched
                }
                setTimeout(tryGiftIMP, 1800 * gameSpeed);
                break;
            case Map09:
                nextScript.popup = function () {
                    popupMap09();
                }
                setTimeout(tryGiftIMP, 1800 * gameSpeed);
                break;
            case Map10:
                nextScript.popup = function () {
                    gameStart();
                }
                setTimeout(tryGiftIMP, 1800 * gameSpeed);
                break;
            case Map11:
                nextScript.popup = function () {
                    gameStart();
                }
                setTimeout(tryGiftIMP, 1800 * gameSpeed);
                break;
            case Map12:
                setTimeout(popupMap12, 1800 * gameSpeed);
                break;
            case Map13:
                setTimeout(popupMap13, 1800 * gameSpeed);
                break;
            case Map14:
                setTimeout(popupMap14, 1800 * gameSpeed);  // также запускает магнит-презент и новое условие
                break;
            case Map15:
                setTimeout(popupItemsHelp, 1800 * gameSpeed);
                break;
            default:
                setTimeout(gameStart, 1800 * gameSpeed);
        }
        return;
    }

    if (status === "restart") {
        setTimeout(gameStart, 1800 * gameSpeed);
        return;
    }

    // статус "finish"
    pressRankOK();
}

// загрузка фишек

function loadTokens(map, mapParam, restart) {

    if (mapParam.bone) {
        for (let i = 0; i < players.length; i++) {
            if (players[i].letter === "A") players[i].place = 1;
            if (players[i].letter === "B") players[i].place = 2;
            if (players[i].letter === "C") players[i].place = 3;
            if (players[i].letter === "D") {
                players[i].place = 4;
                players[i].mop = false;
                players[i].manipulator = true;
                players[i].type = "human";
            } else {
                players[i].type = "comp";
            }
        }
    }

    players.sort(function(a, b){ // сортировка игроков в массиве по занимаемому месту
        return a.place - b.place
    });

    players[0].name.style.zIndex = "504";
    players[1].name.style.zIndex = "503";
    players[2].name.style.zIndex = "502";
    players[3].name.style.zIndex = "501";

    resetMargin();

    for (let i = 0; i < players.length; i++) {
        players[i].finished = false;
        players[i].shiftPos = 1;
        players[i].skipMoves = 0;
        players[i].bonusMoves = 0;
        players[i].skipMoves = 0;
        players[i].moves = 0;
        players[i].armor = 0;
        players[i].iron = false;
        players[i].circle = 0;
        if (!restart) players[i].bonusMoney = 0;
        players[i].speed = -1;
        players[i].catchUp = false;
        players[i].reverse = false;
        players[i].impUsed = false;
        players[i].mopCheck = false;
        players[i].entity = "none";
        players[i].nextCond = "none";
        players[i].currentCell = 0;
        players[i].protection = true;

        // удаление насадок, если есть
        removeShield(players[i]);
        setNail(players[i].name, players[i].skipMoves);
        players[i].name.querySelector(".player__speed").style.display = "none";
        players[i].name.querySelector(".player__vampire").style.display = "none";
        players[i].name.querySelector(".player__fist").style.display = "none";
        players[i].name.style.display = "block";
        players[i].name.style.transform = "none";
        let thanks = players[i].name.querySelector(".player__thanks");
        if (thanks) thanks.style.display = "none";
    }

    tokenOpacityOff(); // убрать прозрачность, если есть
    setTokenColors(); // фишки цветные

    if (mapParam.bone) {

        if (map === Map14) {
            players[2].currentCell = 221;
            // баг фикс: череп не кусал игрока на клетке 0
        }

        if (map === Map15) {
            for (let i = 0; i < 3; i++) {
                players[i].entity = "sup";
                players[i].name.style.backgroundImage = "url(\"img/tokens/token-sup.png\")";
            }
        } else {
            for (let i = 0; i < 3; i++) {
                players[i].entity = "skull";
                players[i].name.style.backgroundImage = "url(\"img/tokens/skull.png\")";
            }
        }

        if (playersCount > 2) {
            for (let i = 0; i < 3; i++) {
                let letter;

                if (players[i].entity === "skull") {
                    if (i == 0) letter = "I";
                    if (i == 1) letter = "II";
                    if (i == 2) letter = "III";
                    players[i].label = "Череп " + letter;
                    players[i].name.setAttribute("title", "Череп " + letter );
                } else {
                    if (i == 0) letter = "A";
                    if (i == 1) letter = "B";
                    if (i == 2) letter = "C";
                    players[i].label = "Супер-фишка " + letter;
                    players[i].name.setAttribute("title", "Супер-фишка " + letter );
                }
            }
            if (map === Map15) {
                document.querySelector(".player-A .player__label").innerHTML = "Супер-фишка A";
                document.querySelector(".player-B .player__label").innerHTML = "Супер-фишка B";
                document.querySelector(".player-C .player__label").innerHTML = "Супер-фишка C";
            } else {
                document.querySelector(".player-A .player__label").innerHTML = "Череп I";
                document.querySelector(".player-B .player__label").innerHTML = "Череп II";
                document.querySelector(".player-C .player__label").innerHTML = "Череп III";
            }
        } else {
            // код для 2-х игроков
            players[2].label = "Череп";
            players[2].name.setAttribute("title", "Череп");
            document.querySelector(".player-C .player__label").innerHTML = "Череп";
            current = 2;
            players[0].finished = true;
            players[1].finished = true;
        }
    } // конец кода для костяного мира
}

// расстановка фишек по местам перед началом

function setTokensPosition(map, mapParam) {
    if (mapParam.bone) {
        // костяной мир, трассы 13, 15
        if (playersCount > 2) {
            for( let i = 0; i < players.length; i++) {
                players[i].name.style.visibility = "visible";
                players[i].name.style.left = map[i].coorX + "px";
                players[i].name.style.top = map[i].coorY + "px";
            }
        } else {
            // костяной мир, трассы 12, 14
            players[0].name.style.visibility = "hidden";
            players[1].name.style.visibility = "hidden";
            players[2].name.style.visibility = "visible";
            players[3].name.style.visibility = "visible";
            players[2].name.style.left = map[0].coorX + "px";
            players[2].name.style.top = map[0].coorY + "px";
            players[3].name.style.left = map[1].coorX + "px";
            players[3].name.style.top = map[1].coorY + "px";
        }
    } else {
        // стандартное расположение
        for( let i = 0; i < players.length; i++) {
            players[i].name.style.visibility = "visible";
            players[i].name.style.left = map[i].coorX + "px";
            players[i].name.style.top = map[i].coorY + "px";
        }
    }
}

// разблокировка условий для окна help

function unlockHelp(map) {
    conditionsCount = 5;

    if (map === Map01) return;

    knowBranch = true;
    knowJoker = true;
    knowSpeed = true;
    conditionsCount += 3;

    if (map === Map02) return;

    knowOrange = true;
    knowBlack = true;
    conditionsCount += 2;

    if (map === Map03) return;

    knowBonus = true;
    knowStarOr = true;
    conditionsCount += 2;

    if (map === Map04) return;

    knowDeadend = true;
    conditionsCount++;

    if (map === Map05) return;

    knowArrowBlue = true;
    conditionsCount++;

    if (map === Map06) return;

    knowStarRed = true;
    conditionsCount++;

    if (map === Map07) return;

    knowMoneybag = true;
    knowHatched = true;
    conditionsCount += 2;

    if (map === Map14 || map === Map15) {
        knowBone = true;
        conditionsCount++;
    }
}

// загрузка параметров магазина

function loadShopParameters(reset) {

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
    let human = findHuman();
    if (human.magnets + human.smagnets > 0) {
        invMagnetsBlock();
    }
    cleanInventory(true);
    fillInventory(true);

// разблокировка предметов
    unlockStuff();
    function unlockStuff() {
        if (curMap === Map01) return;

        unlockMagnet = true;

        if (curMap === Map02 || curMap === Map03) return;

        unlockShield = true;

        if (curMap === Map04) return;

        knowAction = true;

        if (curMap === Map05) return;

        unlockSMagnet = true;
        unlockTrap = true;

        if (curMap === Map06) return;

        unlockIShield = true;

        if (curMap === Map07) return;

        unlockVampire = true;

        if (curMap === Map08 || curMap === Map09 || curMap === Map10) return;

        unlockManipulator = true;
        unlockImp = true;
        knowAction = false;
    }

    if (unlockMagnet) {
        let pathImg = document.querySelector(".shop__items-item--magnet img");
        pathImg.setAttribute("src", "img/inv-magnet.png");
        pathImg.style.margin = "-13px 8px 0 0";
        document.querySelector(".shop__items-item--magnet p").style.display = "block";
        let path = document.querySelector(".shop__items-item--magnet");
        path.addEventListener("click", pressShopMagnet);
        unlockItem( path );
    }

    if (unlockSMagnet) {
        let pathImg = document.querySelector(".shop__items-item--smagnet img");
        pathImg.setAttribute("src", "img/inv-smagnet.png");
        pathImg.style.margin = "-13px 8px 0 0";
        document.querySelector(".shop__items-item--smagnet p").style.display = "block";
        let path = document.querySelector(".shop__items-item--smagnet");
        path.addEventListener("click", pressShopSMagnet);
        unlockItem( path );
    }

    if (unlockShield) {
        let pathImg = document.querySelector(".shop__items-item--shield img");
        pathImg.setAttribute("src", "img/inv-shield.png");
        pathImg.style.margin = "-13px 8px 0 0";
        document.querySelector(".shop__items-item--shield p").style.display = "block";
        let path = document.querySelector(".shop__items-item--shield");
        path.addEventListener("click", pressShopShield);
        unlockItem( path );
    }

    if (unlockIShield) {
        let pathImg = document.querySelector(".shop__items-item--ishield img");
        pathImg.setAttribute("src", "img/inv-ishield.png");
        pathImg.style.margin = "-13px 8px 0 0";
        document.querySelector(".shop__items-item--ishield p").style.display = "block";
        let path = document.querySelector(".shop__items-item--ishield");
        path.addEventListener("click", pressShopIShield);
        unlockItem( path );
    }

    if (unlockTrap) {
        let pathImg = document.querySelector(".shop__items-item--trap img");
        pathImg.setAttribute("src", "img/inv-trap.png");
        pathImg.style.margin = "-13px 8px 0 0";
        document.querySelector(".shop__items-item--trap p").style.display = "block";
        let path = document.querySelector(".shop__items-item--trap");
        path.addEventListener("click", pressShopTrap);
        unlockItem( path );
    }

    if (unlockVampire) {
        let pathImg = document.querySelector(".shop__items-item--vampire img");
        pathImg.setAttribute("src", "img/inv-vampire.png");
        pathImg.style.margin = "-13px 8px 0 0";
        document.querySelector(".shop__items-item--vampire p").style.display = "block";
        let path = document.querySelector(".shop__items-item--vampire");
        path.addEventListener("click", pressShopVampire);
        unlockItem( path );
    }

    if (unlockImp) {
        let pathImg = document.querySelector(".shop__items-item--imp img");
        pathImg.setAttribute("src", "img/inv-imp.png");
        pathImg.style.margin = "-13px 8px 0 0";
        document.querySelector(".shop__items-item--imp p").style.display = "block";
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

    // активация подсказок генерала
    if (curMap === Map11) {
        activateAskGeneral();
    } else {
        deactivateAskGeneral();
    }

// появление акции с элитными фишками
    if (knowAction && !impGiven) {
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

    if (reset) return;
    if (curMap === Map01) hintShop();
    if (curMap === Map02) hintMagnet();
    if (curMap === Map04) hintAction();
    if (curMap === Map06) hintSMagnet();
    if (curMap === Map07) hintIShield();
    if (curMap === Map08) hintVampire();
}

function unlockItem(path) {
    path.addEventListener("click", activateButtonBuy);
    path.addEventListener("click", selectItemShop);
    path.style.cursor = "pointer";
    path.addEventListener("mouseover", addItemMouseover);
    path.addEventListener("mouseout", addItemMouseout);
}

// обновление шкалы репутации

function refreshRep() {
    let rep = document.querySelectorAll(".inventory-rep__div img");
    rep.forEach(function (item) {
        item.style.visibility = "hidden";
    });

    if (reputation == 0) return;
    document.querySelector(".inventory-rep1").style.visibility = "visible";
    if (reputation == 1) return;
    document.querySelector(".inventory-rep2").style.visibility = "visible";
    if (reputation == 2) return;
    document.querySelector(".inventory-rep3").style.visibility = "visible";
    if (reputation == 3) return;
    document.querySelector(".inventory-rep4").style.visibility = "visible";
    if (reputation == 4) return;
    document.querySelector(".inventory-rep5").style.visibility = "visible";
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

    if (curMapParam.branchE) {
        branchE1.style.display = "block";
        branchE2.style.display = "block";
        branchE1.style.left = curMapParam.branchE1X + "px";
        branchE1.style.top = curMapParam.branchE1Y + "px";
        branchE1.style.transform = curMapParam.branchE1ROTATE;
        branchE2.style.left = curMapParam.branchE2X + "px";
        branchE2.style.top = curMapParam.branchE2Y + "px";
        branchE2.style.transform = curMapParam.branchE2ROTATE;
        if (curMapParam.branchE3) {
            branchE3.style.display = "block";
            branchE3.style.left = curMapParam.branchE3X + "px";
            branchE3.style.top = curMapParam.branchE3Y + "px";
            branchE3.style.transform = curMapParam.branchE3ROTATE;
        }
    }

    if (curMapParam.branchF) {
        branchF1.style.display = "block";
        branchF2.style.display = "block";
        branchF1.style.left = curMapParam.branchF1X + "px";
        branchF1.style.top = curMapParam.branchF1Y + "px";
        branchF1.style.transform = curMapParam.branchF1ROTATE;
        branchF2.style.left = curMapParam.branchF2X + "px";
        branchF2.style.top = curMapParam.branchF2Y + "px";
        branchF2.style.transform = curMapParam.branchF2ROTATE;
        if (curMapParam.branchF3) {
            branchF3.style.display = "block";
            branchF3.style.left = curMapParam.branchF3X + "px";
            branchF3.style.top = curMapParam.branchF3Y + "px";
            branchF3.style.transform = curMapParam.branchF3ROTATE;
        }
    }

    if (curMapParam.branchG) {
        branchG1.style.display = "block";
        branchG2.style.display = "block";
        branchG1.style.left = curMapParam.branchG1X + "px";
        branchG1.style.top = curMapParam.branchG1Y + "px";
        branchG1.style.transform = curMapParam.branchG1ROTATE;
        branchG2.style.left = curMapParam.branchG2X + "px";
        branchG2.style.top = curMapParam.branchG2Y + "px";
        branchG2.style.transform = curMapParam.branchG2ROTATE;
    }

    if (curMapParam.branchH) {
        branchH1.style.display = "block";
        branchH2.style.display = "block";
        branchH1.style.left = curMapParam.branchH1X + "px";
        branchH1.style.top = curMapParam.branchH1Y + "px";
        branchH1.style.transform = curMapParam.branchH1ROTATE;
        branchH2.style.left = curMapParam.branchH2X + "px";
        branchH2.style.top = curMapParam.branchH2Y + "px";
        branchH2.style.transform = curMapParam.branchH2ROTATE;
    }
}

// НАЧАЛО ИГРЫ // ИГРОВОЙ ПРОЦЕСС

function gameStart() {

    showGlobals();

    // активировать кнопки контроля
    if (curMapParam.bone) {
        deactivateButtonSur();
        surrenderBtn.style.display = "block";
    } else {
        whatButton.style.display = "flex";
    }
    lookButton.style.display = "flex";

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

        if (players[current].type === "comp") {
            divScore.innerHTML = "ход компьютера";
        }

        // добавление свечения
        if (players[current].entity === "skull") {
            players[current].name.style.backgroundImage = "url(\"img/tokens/skull.gif\")";
        } else {
            players[current].name.querySelector(".player__glow").classList.add("player__glow-act");
        }

// сюда можно вписывать чит-коды
        /*if (curMap === Map01) {
            jumpToCell(playerA, 26);
            jumpToCell(playerB, 26);
            jumpToCell(playerC, 26);
            jumpToCell(playerD, 33);
        }
        if (curMap === Map02) {
            jumpToCell(playerA, 125);
            jumpToCell(playerB, 125);
            jumpToCell(playerC, 125);
            jumpToCell(playerD, 125);
        }*/
        /*if (curMap === Map03) {
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
        }*/
        /*if (curMap === Map05) {
            jumpToCell(playerA, 426);
            jumpToCell(playerB, 426);
            jumpToCell(playerC, 426);
            jumpToCell(playerD, 426);
        }*/
        /*if (curMap === Map09) {
            jumpToCell(playerA, 769);
            jumpToCell(playerB, 769);
            jumpToCell(playerC, 769);
            jumpToCell(playerD, 769);
        }*/
        /*if (curMap === Map10) {
            jumpToCell(playerA, 224);
            jumpToCell(playerB, 227);
            jumpToCell(playerC, 228);
            jumpToCell(playerD, 233);
        }*/
        /*if (curMap === Map11) {
            jumpToCell(playerA, 820);
            jumpToCell(playerB, 820);
            jumpToCell(playerC, 820);
            jumpToCell(playerD, 820);
        }*/
        /*if (curMap === Map12) {
            jumpToCell(playerC, 116);
            jumpToCell(playerD, 10);
        }*/
        /*if (curMap === Map13) {
            jumpToCell(playerA, 313);
            jumpToCell(playerB, 207);
            jumpToCell(playerC, 107);
            jumpToCell(playerD, 314);
        }*/
        /*if (curMap === Map14) {
            jumpToCell(playerC, 107);
            jumpToCell(playerD, 220);
        }*/
        /*if (curMap === Map15) {
            jumpToCell(playerA, 762);
            jumpToCell(playerB, 315);
            jumpToCell(playerC, 315);
            jumpToCell(playerD, 762);
        }*/
        //current = 3;

    }, 1000);

// задать бросок кубика

    // подсказки о предметах перед броском кубика
    let human = findHuman();
    if (showedHintUseShield === false && ( human.shields + human.ishields > 0 ) ) {
        nextScript.script = function () {
                showedHintUseShield = true;
                if (players[current].type === "comp") {
                    setTimeout(throwCubic, 4000);
                } else {
                    setTimeout(infoMoveHuman, 1000);
                }
            }
        hintLine.push("hintUseShield");
        startHintLine();
        return;
    }

    if (players[current].type === "comp") {
        setTimeout(infoMoveComp, 2000);
    } else {
        setTimeout(infoMoveHuman, 1000);
    }
}

// аргументы кубика

let cubicArgs = {
    num: false,
    magnet: false,
    sup: false,
    imp: false,
}

// бросание кубика

function throwCubic() {

    kbThrowCubicOff();
    let num = cubicArgs.num;
    let magnet = cubicArgs.magnet;
    let sup = cubicArgs.sup;
    let imp = cubicArgs.imp;

    if (gamePaused) {
        pausePromise = {
            script: function () {
                throwCubic();
                pausePromise = {};
            }
        }
        return;
    }

    stId = players[current].currentCell;

    // блокировка инвентаря

    let human = findHuman();
    if ( (human.shields + human.ishields) > 0 && human.armor == 0 && human.finished === false) {
        invShieldsBlock();
    }
    if (curMapParam.bone) {
        deactivateButtonSur();
    }

    if (players[current].type === "human") {
        divScore.innerHTML = "";
        overlayCubic.style.display = "block";
        blockHumanInv();
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
        document.querySelector(".cubic__icon--x2").style.display = "none";

        // завершение молнии
        speedOver();

        setTimeout(function () {
            setNail(players[current].name, players[current].skipMoves);
        }, gameSpeed * 1800);

        if (players[current].nextCond === "none") {
            setTimeout(function () {
                players[current].name.style.zIndex = lastZIndex;
                moveIsOver();
            }, gameSpeed * 1800);
        } else {
            // проверка 2-го условия на клетке
            setTimeout(function () {
                getCellType(true);
            }, 1800 * gameSpeed);
        }

        cubicArgs = {
            num: false,
            magnet: false,
            sup: false,
            imp: false,
        }
        return;
    }

    if (typeof num === "number") { // условие для чит-кода
        cubicScore = num;
    } else {

        let maximum;
        if (imp) {
            maximum = 9;
            impUse = true;
        } else {
            maximum = 6;
        }

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
                substitute1 = Math.ceil(Math.random() * maximum);
            } while (substitute1 == magnetScore)
            console.log("число на подстановку: " + substitute1);

            if (sup) {
                do {
                    substitute2 = Math.ceil(Math.random() * maximum);
                } while (substitute2 == magnetScore || substitute2 == substitute1)
                console.log("число на подстановку второе: " + substitute2);
            }

            cubicScore = Math.ceil(Math.random() * maximum);

            // если загадано > 6, то выполнить доп.повышение шанса для IMP:
            // если выпало 1-6, то с вероятностью 20% сгенерировать 7-9
            if (imp && magnetScore > 6 && cubicScore < 7) {
                if (getChance(20)) {
                    cubicScore = 6 + Math.ceil(Math.random() * 3);
                    console.log("Сработало увеличение шанса для IMP 20%");
                } else {
                    console.log("Увеличение шанса для IMP 20% не сработало");
                }
            }

            console.log("cubicScore что выпало на самом деле: " + cubicScore);
            if (cubicScore == substitute1 || cubicScore == substitute2) {
                cubicScore = magnetScore;
            }

            if (imp) {
                if (cubicScore > 6) {
                    setTimeout(messageIMP, 1400, true);
                } else {
                    setTimeout(messageIMP, 1400);
                }
            }

            if (cubicScore == magnetScore) {
                setTimeout(messageMagnetSuccess, 1500, sup);
            } else {
                setTimeout(messageMagnetFailed, 1500, sup);
            }

        } else { // конец хода магнитом

            cubicScore = Math.ceil(Math.random() * maximum);

            // если в IMP выпало 1-6, то с вероятностью 20% сгенерировать 7-9
            if (imp && cubicScore < 7) {
                if (getChance(20)) {
                    cubicScore = 6 + Math.ceil(Math.random() * 3);
                    console.log("Сработало увеличение шанса для IMP 20%");
                } else {
                    console.log("Увеличение шанса для IMP 20% не сработало");
                }
            }

            if (imp) {
                if (cubicScore > 6) {
                    setTimeout(messageIMP, 1500, true);
                } else {
                    setTimeout(messageIMP, 1500);
                }
            }
            // чит-код на кубик
            //cubicScore = 3;
        }
    }

    //анимация кубика
    cubic.querySelector("img").setAttribute("src", "img/cubic/cubic_spin.gif");
    setTimeout( function () {
        switch (cubicScore) {
            case 1:
                cubic.querySelector("img").setAttribute("src", "img/cubic/cubic_1.png");
                break;
            case 2:
                cubic.querySelector("img").setAttribute("src", "img/cubic/cubic_2.png");
                break;
            case 3:
                cubic.querySelector("img").setAttribute("src", "img/cubic/cubic_3.png");
                break;
            case 4:
                cubic.querySelector("img").setAttribute("src", "img/cubic/cubic_4.png");
                break;
            case 5:
                cubic.querySelector("img").setAttribute("src", "img/cubic/cubic_5.png");
                break;
            case 6:
                cubic.querySelector("img").setAttribute("src", "img/cubic/cubic_6.png");
                break;
            case 7:
                cubic.querySelector("img").setAttribute("src", "img/cubic/cubic_7.png");
                break;
            case 8:
                cubic.querySelector("img").setAttribute("src", "img/cubic/cubic_8.png");
                break;
            case 9:
                cubic.querySelector("img").setAttribute("src", "img/cubic/cubic_9.png");
                break;
            default:
                cubic.querySelector("img").setAttribute("src", "img/cubic/cubic_x.png");
        }
    }, 1400);

    console.log("На кубике: " + cubicScore);

    // молния и бонус за отставание
    setTimeout(function () {
        if (players[current].speed >= 0 && typeof players[current].currentCell !== "string") {
            cubicScore *= 2;
            console.log("Молния приумножила очки на кубике: " + cubicScore);
        } else {
            if (players[current].catchUp) {
                cubicScore *= 2;
                console.log("Бонус за отставание, очки на кубике: " + cubicScore);
            }
        }
    }, 1500);

    players[current].name.style.transition = gameSpeed * 0.2 + "s";
    players[current].protection = false;
    setTimeout(function () {
        unshiftTokens(players[current]);
    }, gameSpeed * 1700);

    // выбор направления движения для черепов в момент броска кубика
    if (players[current].entity === "skull" && curMap !== Map14) {
        let myBranch = getPlayersBranch(players[current]);
        let enemyBranch = getPlayersBranch(players[3]);
        let side = getSkullBranchSide(enemyBranch);
        if (myBranch == enemyBranch) {
            // если развилка впереди или ==, то реверс; если развилка позади, то реверс не нужен
            if (side === "forward" || side === "equal") {
                if (players[current].currentCell - players[3].currentCell > 0) players[current].reverse = true;
                console.log("Использую реверс: myBranch == enemyBranch");
            } else {
                players[current].reverse = false;
                console.log("Реверс не нужен: myBranch == enemyBranch");
            }
        } else {
            // если развилка впереди, то реверс не нужен; если развилка позади или ==, то реверс
            if (side === "behind" || side === "equal") {
                players[current].reverse = true;
                console.log("Использую реверс: myBranch != enemyBranch");
            } else {
                players[current].reverse = false;
                console.log("Реверс не нужен: myBranch != enemyBranch");
            }
        }
    }

    setTimeout(move, gameSpeed * 1700);

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

    cubicArgs = {
        num: false,
        magnet: false,
        sup: false,
        imp: false,
    }
}

function infoMoveComp() {
    divScore.classList.remove("move__info-yours");
    divScore.classList.remove("move__info-skip");
    divScore.innerHTML = "ход компьютера";
    overlayCubic.style.display = "block";

    lastZIndex = window.getComputedStyle(players[current].name).zIndex;
    players[current].name.style.zIndex = "505";
    console.log("Сохранен Zindex: " + lastZIndex + ", поставлен 505");

    cellIndex = getCellIndexById(players[current].currentCell);
    if (!mbOver && curMap[cellIndex].type === "moneybag" && players[current].protection) {
        if (moneybagStep > 10) {
            pressMBEmptyGo();
        } else {
            aiMakeDecision("skipOrNot");
        }
        return;
    }
    mbOver = false;

    getCatchBonus();
    if (players[current].speed > 0 || players[current].catchUp) {
        document.querySelector(".cubic__icon--x2").style.display = "block";
    }

    if (players[current].entity !== "none") {
        setTimeout(throwCubic, gameSpeed * 1800);
        return;
    }

    aiUseTrap();
    let mop = aiUseMop();
    let time = 0;
    if (mop) time = 2000;

    if ( aiUseIMP() ) {
        setTimeout(throwCubic, gameSpeed * 1800 + time);
        return;
    }

    if ( !aiUseMagnet() ) {
        setTimeout(throwCubic, gameSpeed * 1800 + time);
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

    lastZIndex = window.getComputedStyle(players[current].name).zIndex;
    players[current].name.style.zIndex = "505";
    console.log("Сохранен Zindex: " + lastZIndex + ", поставлен 505");

    cellIndex = getCellIndexById(players[current].currentCell);
    if (!mbOver && curMap[cellIndex].type === "moneybag" && players[current].protection) {
        if (moneybagStep > 10) {
            popupMBEmptyGo();
        } else {
            popupAskMB(moneybagStep);
        }
        return;
    }
    mbOver = false;

    // удаление блоков инвентаря
    overlayCubic.style.display = "none";
    invMagnetsUnblock();
    document.querySelector(".overlay__invblock--imp").style.display = "none";
    document.querySelector(".overlay__invblock--mop").style.display = "none";
    document.querySelector(".overlay__invblock--trap").style.display = "none";
    if (curMapParam.bone) {
        activateButtonSur();
    }

    // подсказки на использование предметов

    if (unlockMagnet && showedHintUseMagnet === false && players[current].magnets > 0) {
        showedHintUseMagnet = true;
        hintLine.push("hintUseMagnet");
    }

    if (unlockSMagnet && showedHintUseSMagnet === false && players[current].smagnets > 0) {
        showedHintUseSMagnet = true;
        hintLine.push("hintUseSMagnet");
    }

    if (unlockShield && showedHintUseShield === false && players[current].shields > 0 ) {
        showedHintUseShield = true;
        hintLine.push("hintUseShield");
    }

    if (unlockIShield && showedHintUseIShield === false && players[current].ishields > 0 ) {
        showedHintUseIShield = true;
        hintLine.push("hintUseIShield");
    }

    if (unlockTrap && showedHintUseTrap === false && players[current].trap) {
        showedHintUseTrap = true;
        hintLine.push("hintUseTrap");
    }

    if (showedHintUseIMP === false && players[current].imp > 0) {
        showedHintUseIMP = true;
        hintLine.push("hintUseIMP");
    }

    if (showedHintUseMop === false && players[current].mop) {
        showedHintUseMop = true;
        hintLine.push("hintUseMop");
    }

    if (curMap === Map14 && !mapRestarted) {
        mapRestarted = true;
        hintLine.push("hintUseCover");
    }

    startHintLine();
    getCatchBonus();
    if (players[current].speed > 0 || players[current].catchUp) {
        document.querySelector(".cubic__icon--x2").style.display = "block";
    }
    cubic.addEventListener('click', throwCubic, {once: true});
    kbThrowCubicOn();
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
                players[i].iron = false;
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
    if (stepsCounter >= cubicScore) {
        console.log(players[current].label + " на клетке №: " + players[current].currentCell);

        setTimeout(function () { // сброс некоторых параметров
            let branches = document.querySelectorAll(".branch");
            branches.forEach(function (item) {
                item.setAttribute("src", "img/branch.png");
            })
            document.querySelector(".cubic__icon--magnet").style.display = "none";
            document.querySelector(".cubic__icon--x2").style.display = "none";
            players[current].name.querySelector(".player__vampire").style.display = "none";
            players[current].name.querySelector(".player__fist").style.display = "none";
            askIMPcubic.style.display = "none";

            // завершение молнии
            speedOver();
        }, 200 * gameSpeed);

        if ( getSkullCollision() ) {
            if (players[3].power > 0) {
                setTimeout(function () {
                    popupLose("bite");
                }, 300);
            } else {
                setTimeout(function () {
                    popupLose("eaten");
                }, 300);
            }
            stepsCounter = 0;
            return;
        }
        stepsCounter = 0;
        getConditionAfterMove(); // выход из функции move
    }
}

// проверка на встречу с черепом

function getSkullCollision() {

    if (stepsCounter == 100) return true;

    let map14bugfix = false;
    if (curMap === Map14 && players[2].currentCell == 0 && players[3].currentCell == 0) {
        // баг-фикс: череп не кусал игрока на клетке 0
        map14bugfix = true;
    }

    if (curMapParam.bone && (players[current].currentCell != 0 || map14bugfix) ) {

        let rivals = getRivalsArray(players[current]);
        if (rivals.length > 0) {
            for (let i = 0; i < rivals.length; i++) {
                if ( (players[current].letter === "D" && rivals[i].entity === "skull") || (players[current].entity === "skull" && rivals[i].letter === "D") ) {
                    console.log("ЧЕРЕП!");
                    return true;
                }
            }
        }
    }
    return false;
}

// исполняется после совершения единичного шага
// true продолжает движение, false прекращает движение

function getNextMoveDirection() {

    if ( getSkullCollision() ) {
        stepsCounter = 100;
        return false;
    }

    if (branchOver === true) {
        branchOver = false;
        moveOneStep();
        return true;
    }

    cellIndex = getCellIndexById(players[current].currentCell); // вычисляем индекс клетки, на которой стоит игрок

    if ( curMap[cellIndex].type === "checkpoint" && stepsCounter != 0 && players[current].entity !== "skull") { // игрок пересекает чекпойнт
        setTimeout(messageCheckpoint, 300 * gameSpeed);
    }

    switch (curMap[cellIndex].stopCondition) {
        case "start":
            executeTeleport(curMap[cellIndex].teleportTo);
            return true;
        case "pedestal":
            pedestalPlayer = players[current];
            stepsCounter = cubicScore;
            return false; // прекращает движение
        case "branch":
            if (escape) {
                moveOneStep();
                return true;
            }
            if (players[current].entity === "skull" && curMap === Map14) {
                players[current].currentCell = 210;
                moveOneStep();
                return true;
            }
            if (players[current].entity === "skull") {
                getSkullNextDirection();
                moveOneStep();
                return true;
            }
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
            if (!players[current].reverse) {
                players[current].currentCell = curMap[cellIndex].joinTo - 1;
                console.log("Сработал Join");
            }
            moveOneStep();
            return true;
        case "deadend":
            if (players[current].reverse) {
                moveOneStep();
                return true;
            } else {
                console.log("ТУПИК");
                if (curMap[cellIndex].type !== "arrow") {
                    players[current].reverse = true;
                }
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
        case "skullBranch":
            if (players[current].entity === "skull") {
                getSkullNextDirection();
            }
            moveOneStep();
            return true;
        case "jail":
            if (escape) {
                moveOneStep();
                return true;
            } else {
                executeJail();
                return false; // прекращает движение
            }
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

    players[current].name.style.transition = ".3s";
    let dir = curMap[cellIndex].shift;
    if (!dir) return;
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

function unshiftTokens(player, hatch) {
    let currentId;
    if (hatch) {
        currentId = getCellIndexById(player.currentCell);
    } else {
        currentId = getCellIndexById(stId);
    }
    let dir = curMap[currentId].shift // направление смещения
    if (!dir) return;
    console.log("ступень текущего игрока: " + player.shiftPos);
    let rivalsArray = getRivalsArray(player);
    let spec = []; // массив, в котором будут храниться игроки, у которых надо уменьшить shiftPos

    for (let i = 0; i < rivalsArray.length; i++) { // собрать всех игроков, которые занимают позицию выше, чем current player

        if (rivalsArray[i].shiftPos > player.shiftPos) {

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
    player.name.style.marginTop = "-12px";
    player.name.style.marginLeft = "-2px";
    player.shiftPos = 1;
}

// движение фишки на ПЬЕДЕСТАЛ

function moveToPedestal(player) {
    console.log("произошел вызов функции пьедестал");
    player.name.style.transition = gameSpeed * 0.5 + "s";
    playersCount--;
    player.finished = true;
    player.protection = true;
    // сбрасываем параметры
    unshiftTokens(player, true);
    player.currentCell = 0;
    player.armor = 0;
    player.circle = 0;
    player.catchUp = false;
    player.speed = -1;
    removeShield(player);
    setNail(player.name, 0);
    player.name.querySelector(".player__speed").style.display = "none";
    document.querySelector(".cubic__icon--x2").style.display = "none";
    player.name.querySelector(".player__vampire").style.display = "none";
    player.name.querySelector(".player__fist").style.display = "none";
    console.log("Защита = true");

    if (curMapParam.bone && curMap !== Map15) {
        players[3].place = 1;
        players[0].place = 2;
        raceIsOver();
        return;
    }

    setFinishFlag(player);

    if (curMap === Map15) {
        animRemoveToken(player);

        if (!escape) {
            setTimeout(moveIsOver, 1800 * gameSpeed);
            return;
        }

        // условия завершения побега
        if (player === players[0]) {
            escapedWhite = true;
            messageEscapeSuccess(players[0]);
        }
        if (player === players[3]) {
            escapedChamp = true;
            messageEscapeSuccess(players[3]);
        }

        // оба финишировали
        if (escapedWhite && escapedChamp) {
            popupWinJumpers();
            return;
        }

        //у белой заканчивается сила, затем юзер финиширует
        if (players[0].finished && !escapedWhite && escapedChamp) {
            setTimeout(popupUserWinsHostageLose, 1000);
            return;
        }

        setTimeout(moveIsOver, 1800 * gameSpeed);
        return;
    }

    if (player.power >= 0) { // игрок дошел до финиша, займёт самое высокое возможное место
        let check = getMyWinPlace(player);
        for (let i = 0; i < curMapParam.pedestalCoords.length; i++) {
            if ( curMapParam.pedestalCoords[i].cellid == check ) {
                player.name.style.left = curMapParam.pedestalCoords[i].coorX + "px";
                player.name.style.top = curMapParam.pedestalCoords[i].coorY + "px";
                console.log(player.label + " ДОШЕЛ ДО ФИНИША");
                messageFinished();
                break;
            }
        }

    } else { // игрок проиграл и займёт последнее возможное место
        let check = getMyLosePlace(player);
        for (let i = 0; i < curMapParam.pedestalCoords.length; i++) {
            if ( curMapParam.pedestalCoords[i].cellid == check ) {
                player.name.style.left = curMapParam.pedestalCoords[i].coorX + "px";
                player.name.style.top = curMapParam.pedestalCoords[i].coorY + "px";
                console.log(player.label + " ВЫЛЕТЕЛ С ТРАССЫ");
                messageLose(player);
                break;
            }
        }
    }

    messagePlace(player, player.place);
    if (!raceInterrupt && playersCount > 1) {
        probablyEnd(player);
    } else {
        console.log("probablyEnd не сработал: игра прервана человеком, либо осталось мало игроков");
        if (playersCount == 1) {
            setTimeout(moveIsOver, 2000);
        }
    }
}

// активируется, если человек не прервал заезд, и если игроков больше 1
function probablyEnd(player) {
    if (player.type === "human" && player.place == 1) {
        setTimeout(popupFirst, 1000);
        console.log("Финишировал человек, занявший 1-е место");
    } else if (player.type === "comp") {
        setTimeout(pressFirst, 1000);
        console.log("Финишировал компьютер");
    } else {
        console.log("Финишировал человек, занял место 2-4");
        console.log("Условие для popupEndrace соответствует? " + (playersCount == 2 || playersCount == 3) );
        if (player.type === "human" && ( playersCount == 2 || playersCount == 3) ) {
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

    if ( getSkullCollision() ) {
        if (players[3].power > 0) {
            setTimeout(function () {
                popupLose("bite");
            }, 300);
        } else {
            setTimeout(function () {
                popupLose("eaten");
            }, 300);
        }
        return;
    }

    if (curMap[cellIndex].stopCondition === "jail") {
        executeJail();
        return;
    }

    // подсказка - красная клетка
    if (players[current].currentCell > 14 && players[current].currentCell < 25 && players[current].type === "human" && showedHintRed === false && curMap === Map01) {
        nextScript.script = function () {
                showedHintRed = true;
                setTimeout(getConditionAfterMove, 1);
            }
        hintLine.push("hintRed");
        startHintLine();
        return;
    }

    if (curMap[cellIndex].type === "checkpoint" && players[current].entity !== "skull") { // игрок достиг чекпойнта
        setTimeout(messageCheckpoint, 300 * gameSpeed);
    }

    if (curMap[cellIndex].stopCondition === "deadend") { // впереди тупик - игрок приземлился точно перед ним
        players[current].reverse = true;
    }

    // баг фикс: если игрок перемещается по стрелке с тупиковой ветки, то надо задать ему новый реверс
    if (curMap[cellIndex].setReverse) {
        console.log("Считываю параметр setReverse");
        if (curMap[cellIndex].setReverse === "true") {
            players[current].reverse = true;
        } else {
            players[current].reverse = false;
        }
    }

    playerRival = getRivalsArray(players[current]); // работа с соперниками на клетке
    let check = false;

    if (playerRival.length > 0) {

        console.log("Соперников: " + playerRival.length);
        check = getProtectionStatus(playerRival);

        setTimeout(function () {
            shiftTokens(playerRival.length); // смещение фишки после приземления на клетку с соперниками
        }, 50 * gameSpeed);

        if (players[current].entity !== "skull") {

            // правило раздачи денег владельцам щитов
            for (let i = 0; i < playerRival.length; i++) {
                if (playerRival[i].armor > 0) {
                    setTimeout(function () {
                        executeShieldPaid(players[current], playerRival[i]);
                    },700 * gameSpeed);
                }
            }

            setTimeout(getConflictStatus, 500 * gameSpeed, check); // внутри активируется popup и getCellType
        } else {
            setTimeout(getCellType, 500 * gameSpeed);
        }

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

function getCellType(type2, forceType) {

    if (gamePaused) {
        pausePromise = {
            arg1: type2,
            arg2: forceType,
            script: function () {
                getCellType(pausePromise.arg1, pausePromise.arg2);
                pausePromise = {};
            }
        }
        return;
    }

    if (vampired) {
        console.log("getCellType отменён: vampire");
        vampireBite();
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

    if (forceType) whatType = forceType;

    if (typeof whatType === "number") {
        console.log(players[current].label + " на клетке с бонусом/штрафом");
        executeBonus(whatType);
        setTimeout( moveIsOver, 500 * gameSpeed);
        return;
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
            if (players[current].type === "human" && curMapParam.bone && !cameFromBlack) {
                console.log(players[current].label + " на зеленой клетке");
                if (players[current].power > 0) {
                    useManip();
                } else {
                    popupManipImp();
                }
            } else {
                console.log(players[current].label + " на зеленой клетке ПРОПУСТИТ ХОД");
                cameFromBlack = false;
                executeGreen(); // завершение хода
            }
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

            if (players[current].entity !== "none") {
                if (players[current].nextCond === "none") {
                    setTimeout(moveIsOver, 500 * gameSpeed);
                } else {
                    setTimeout(function () { // активация 2-го условия на клетке
                        getCellType(true);
                    }, 500 * gameSpeed);
                }
                break;
            }

            executeBlack(); // завершение хода
            break;
        case "starOrange":
            console.log(players[current].label + " на оранжевой звезде");
            executeStar(); // завершение хода
            break;
        case "starRed": // возможно второе условие
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
        case "joker":
            console.log(players[current].label + " на джокере");
            messageJoker();
            if (players[current].type === "human") {
                popupJoker();
            } else {
                setTimeout(pressJokerOK, 1500 * gameSpeed)
            }
            break;
        case "trapA":
            console.log(players[current].label + " на капкане игрока A");
            executeTrap("A");
            break;
        case "trapB":
            console.log(players[current].label + " на капкане игрока B");
            executeTrap("B");
            break;
        case "trapC":
            console.log(players[current].label + " на капкане игрока C");
            executeTrap("C");
            break;
        case "trapD":
            console.log(players[current].label + " на капкане игрока D");
            executeTrap("D");
            break;
        case "moneybag":
            console.log(players[current].label + " на копилке");
            if (moneybagStep > 10) {
                if (players[current].type === "human") {
                    popupMBEmpty();
                } else {
                    pressMBEmpty();
                }
            } else {
                let rivals = getRivalsArray(players[current]);
                let free = true;
                for (let i = 0; i < rivals.length; i++) {
                    if (rivals[i].currentCell == players[current].currentCell) {
                        free = false;
                        break;
                    }
                }
                if (free) {
                    players[current].protection = true;
                    messageMB(players[current]);

                    // удаляем метку "бонус" с копилки
                    let bonIndex = curMapParam.bonId.indexOf(players[current].currentCell);
                    if (bonIndex >= 0) {
                        curMapParam.bonId.splice(bonIndex, 1);
                        console.log("Метка удалена, curMapParam.bonId = ");
                        console.log(curMapParam.bonId);
                    }
                }
                moveIsOver();
            }
            break;
        case "finish":
            console.log(players[current].label + " на финише");

            pedestalPlayer = players[current];
            if (players[current].type === "human") {
                popupFinished();
            } else {
                pressFinished();
            }

            break;

            // в клетке-джокере сгенерирован предмет
        case "magnet":
            players[current].magnets++;
            executeJokerGiveItem();
            break;
        case "smagnet":
            players[current].smagnets++;
            executeJokerGiveItem();
            break;
        case "shield":
            players[current].shields++;
            executeJokerGiveItem();
            break;
        case "ishield":
            players[current].ishields++;
            executeJokerGiveItem();
            break;
        case "trap":
            players[current].trap = true;
            executeJokerGiveItem();
            break;
        case "vampire":
            players[current].vampire = true;
            executeJokerGiveItem();
            break;

        default:
            if (curMap[cellIndex].bonus && players[current].entity === "none") {
                console.log(players[current].label + " на клетке с бонусом/штрафом");
                executeBonus();
                setTimeout( moveIsOver, 500 * gameSpeed);
            } else {
                if (curMap[cellIndex].type === "hatched") {
                    console.log(players[current].label + " на штрих-клетке");
                } else {
                    console.log(players[current].label + " на обычной клетке");
                }
                moveIsOver();
            }
            break;
    }
}

function executeBonus(surprise) {
    let bonus;
    if (surprise) {
        bonus = surprise;
    } else {
        bonus = curMap[cellIndex].bonus;
    }
    messageBonus(bonus);
    players[current].bonusMoney += bonus;

    setInfoBonus(players[current]);
    bonusAnimate(players[current], bonus);

    // отражение бонуса в юзербаре
    let human = findHuman();
    if (players[current] === human) {
        setBonus(players[current]);
    }
}

// отражение бонуса в юзербаре // используется для функции executeBonus и в капкане

function setBonus(player) {
    inventoryBonus.style.visibility = "visible";
    if (player.bonusMoney > 0) {
        inventoryBonus.style.color = "#34ff64";
        inventoryBonus.innerHTML = "+ " + player.bonusMoney + "$";
    } else if (player.bonusMoney < 0) {
        inventoryBonus.style.color = "#f73a3a";
        let money = Math.abs(player.bonusMoney);
        inventoryBonus.innerHTML = "- " + money + "$";
    } else {
        inventoryBonus.style.visibility = "hidden";
    }
}

// отражение бонуса в правой панели

function setInfoBonus(player) {

    let info = document.querySelectorAll(".info__cont .info__token p");
    info.forEach(function (item) {
        if (item.innerHTML === player.letter) {
            let temp = item.closest(".info__player");
            let path = temp.querySelector(".info__player-bonus");
            let money = player.bonusMoney;
            if (money > 0) {
                money = "+" + money;
                path.style.color = "#34ff64";
            } else if (money < 0) {
                path.style.color = "#f73a3a";
            } else {
                path.style.visibility = "hidden";
                return;
            }
            path.innerHTML = money;
            path.style.visibility = "visible";
        }
    });
}

// анимация бонуса на фишке

function bonusAnimate(player, money) {

    let coef = 1;
    if (Math.abs(money) > 90) {
        coef = 2;
    }

    let bon = document.createElement("p");
    bon.classList.add("player__bonus");

    if (coef == 2) {
        bon.style.transition = "3s";
    } else {
        bon.style.transition = "1.5s";
    }

    if (money > 0) {
        money = "+" + money;
        bon.style.color = "#00ff3c";
    } else {
        bon.style.color = "#ff4141";
    }
    bon.innerHTML = "" + money;
    player.name.append(bon);

    setTimeout(function () {
        bon.style.left = "65px";
        bon.style.top = "-8px";
    }, 20);

    setTimeout(function () {
        bon.style.opacity = "0";
        bon.style.fontSize = "17px";
    }, 800 * coef);

    setTimeout(function () {
        bon.remove();
    }, 1500 * coef);
}

function executeJokerGiveItem() {

    if (players[current].type === "human") {
        cleanInventory();
        fillInventory();
        blockHumanInv();
    } else {
        fillWhatInventory();
    }
    setTimeout(moveIsOver, 500 * gameSpeed);
}

function executeArrow() {

    if (curMap[cellIndex].bonus) {
        console.log(players[current].label + " на клетке также есть бонус/штраф");
        messageBonus(curMap[cellIndex].bonus);
        players[current].bonusMoney += curMap[cellIndex].bonus;
        setInfoBonus(players[current]);
        bonusAnimate(players[current], curMap[cellIndex].bonus)

        let human = findHuman();
        if (players[current] === human) {
            setBonus(players[current]);
        }
    }

    if (curMap[cellIndex].arrowSkull && players[current].type === "human") {
        setTimeout(moveIsOver, 500 * gameSpeed);
        return;
    }

    messageArrow();
    executeTeleport(curMap[cellIndex].teleportTo);
    if (curMap[cellIndex].passCP) {
        setTimeout(messageCheckpoint, 500 * gameSpeed);
    }
    setTimeout( getConditionAfterMove, 500 * gameSpeed);
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
        executeLose();
    } else {
        console.log(players[current].label + ": сила теперь = " + players[current].power);
        setTimeout(refreshPowercells, 500 * gameSpeed);

        // только для красной клетки
        if (!escape) players[current].reverse = false;
        players[current].protection = true;
        console.log("Защита = true");
        messageReturnCheckpoint();
        setTimeout(function () {
            executeTeleport(curMap[cellIndex].teleportTo);
        }, 1000 * gameSpeed);
        setTimeout(checkShiftAfterRed, 1500 * gameSpeed);

        if (players[current].power == 0) {
            setTimeout(messageCritic, 1500 * gameSpeed);
        }
    }
}

// проверка смещения фишки после красной клетки

function checkShiftAfterRed() {
    cellIndex = getCellIndexById(players[current].currentCell);
    let rivalsArray = getRivalsArray(players[current]);
    if (rivalsArray.length > 0) {
        setTimeout(function () {
            shiftTokens(rivalsArray.length)
        }, 50 * gameSpeed );
    }

    if (curMapParam.bone && getSkullCollision() ) {
        if (players[3].power > 0) {
            setTimeout(function () {
                popupLose("bite");
            }, 300);
        } else {
            setTimeout(function () {
                popupLose("eaten");
            }, 300);
        }
        return;
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
        executeLose();
    } else {
        console.log(players[current].label + ": сила теперь = " + players[current].power);
        setTimeout(refreshPowercells, 500 * gameSpeed);

        if (players[current].power == 0) {
            setTimeout(messageCritic, 500 * gameSpeed);
        }

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
    players[current].name.querySelector(".player__vampire").style.display = "none";

    if (orange) {
        players[current].bonusMoves += 2;
        messageOrange();
    } else {
        players[current].bonusMoves++;
        messageYellow();
    }

    if (players[current].type === "human") {
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

    if (players[current].entity === "none") {
        if (red) {
            players[current].power += 2;
        } else {
            players[current].power++;
        }

        messageStar(red);
        refreshPowercells();
    }

    if (players[current].nextCond === "none") {
        moveIsOver();
    } else {
        setTimeout(function () { // активация 2-го условия на клетке
            getCellType(true);
        }, 500 * gameSpeed);
    }
}

// активация молнии

function executeSpeed() {
    players[current].speed = 3;
    players[current].name.querySelector(".player__speed p").innerHTML = "3";
    players[current].name.querySelector(".player__speed").style.display = "flex";
    messageSpeed();
    moveIsOver();
}

// проверка и завершение молнии

function speedOver() {
    if (players[current].speed == 2) {
        players[current].name.querySelector(".player__speed p").innerHTML = "2";
    }
    if (players[current].speed == 1) {
        players[current].name.querySelector(".player__speed p").innerHTML = "1";
    }
    if (players[current].speed == 0) {
        messageSpeedOver();
        let path = players[current].name.querySelector(".player__speed");
        path.style.display = "none";
        players[current].speed = -1;
    }
}

function executeArrowBlue() {
    messageArrowBlue();
    players[current].catchUp = false;
    document.querySelector(".cubic__icon--magnet").style.display = "none";
    if (players[current].type === "human") {
        infoMoveHuman(true);
    } else {
        if ( !aiUseMagnet() ) {
            setTimeout(throwCubic, gameSpeed * 1000);
        }
    }
}

function executeTrap(owner) {

    if (players[current].letter === owner) {
        messageTrapSelf();
    } else {

        if (players[current].entity === "none") {
            players[current].bonusMoney -= trapPower;
            setInfoBonus(players[current]);
            bonusAnimate(players[current], (trapPower * -1) );
        }

        for (let i = 0; i < players.length; i++) {

            if (players[i].letter === owner) {

                if (players[current].entity !== "none") {
                    messageTrapSuccess(players[3]);
                    break;
                }

                players[i].bonusMoney += trapPower;
                setInfoBonus(players[i]);
                messageTrapSuccess(players[i]);
                bonusAnimate(players[i], trapPower);

                let human = findHuman();
                if (players[current] === human) {
                    setBonus(players[current]);
                }
                if (players[i] === human) {
                    setBonus(players[i]);
                }
                break;
            }
        }
        // удалить капкан
        let index = getCellIndexById(players[current].currentCell);
        curMap[index].trapPath.querySelector("img").remove();
        let num = document.createElement("p");
        num.innerHTML = curMap[index].num;
        curMap[index].trapPath.append(num);
        curMap[index].type = "none";
        curMap[index].trapPath = "none";
        setTimeout(messageTrapRemove, 800, curMap[index].num);

        if (!curMapParam.bone) {
            // удаляем метку "плохая" с клетки
            let badIndex = curMapParam.badId.indexOf(players[current].currentCell);
            if (badIndex >= 0) {
                curMapParam.badId.splice(badIndex, 1);
                console.log("Метка удалена, curMapParam.badId = ");
                console.log(curMapParam.badId);
            }
        }
    }
    players[current].skipMoves++;
    setNail(players[current].name, players[current].skipMoves);
    setTimeout(moveIsOver, 2500 * gameSpeed);
}

// копилка

function executeMoneybag() {
    messageMByes();
    // анимация удаления ячейки
    let path = "step" + moneybagStep;
    let animMB;
    setTimeout(function () {
        mbPanelSteps[path].style.visibility = "hidden";
    }, 150);
    animMB = setInterval(function () {
        mbPanelSteps[path].style.visibility = "visible";
        setTimeout(function () {
            mbPanelSteps[path].style.visibility = "hidden";
        }, 150);
    }, 300);
    setTimeout(function () {
        clearInterval(animMB);
        mbPanelSteps[path].style.visibility = "hidden";
    }, 2400);

    if (moneybagStep < 6) {
        players[current].bonusMoney += mbPrize1;
        bonusAnimate(players[current], mbPrize1);
    } else {
        players[current].bonusMoney += mbPrize2;
        bonusAnimate(players[current], mbPrize2);
        players[current].power++;
        setTimeout(refreshPowercells, 400);
    }
    if (players[current].type === "human") {
        setBonus(players[current]);
    }
    moneybagStep++;
    setInfoBonus(players[current]);

    // молния
    if (players[current].speed > 0) {
        players[current].speed--;
        console.log("Speed = " + players[current].speed);
        // завершение молнии
        speedOver();
    }

    setTimeout(moveIsOver, 2000 * gameSpeed);
}

function executeJail() {
    stepsCounter = 0;
    if (players[current].type === "human") {
        setTimeout(jailUser, 500 * gameSpeed);
    } else {
        setTimeout(jailSuper, 500 * gameSpeed);
    }
}

function executeLose() {
    console.log("ПОРАЖЕНИЕ!");
    pedestalPlayer = players[current];
    if (escape && players[current] === players[0]) {
        hostagePowerOver();
        return;
    }
    if (players[current].type === "human") {
        popupLose();
    } else {
        pressLose();
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
    if (players[current].type === "human") {
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
    } else if (branchid === "d") {
        branch1 = branchD1;
        branch2 = branchD2;
        branch3 = branchD3;
    } else if (branchid === "e") {
        branch1 = branchE1;
        branch2 = branchE2;
        branch3 = branchE3;
    } else if (branchid === "f") {
        branch1 = branchF1;
        branch2 = branchF2;
        branch3 = branchF3;
    } else if (branchid === "g") {
        branch1 = branchG1;
        branch2 = branchG2;
    } else {
        branch1 = branchH1;
        branch2 = branchH2;
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

// ЧЕРЕП: выбор направления на развилке

function getSkullNextDirection() {

    // на какой ветке сидит противник
    let branch = getPlayersBranch(players[3]);
    let temp = branch;

    // вычисляем последние 2 цифры id черепа
    let curId = players[current].currentCell;
    if (curId.toString().length > 2) {
        curId = curId.toString();
        curId = curId.substr(curId.length - 2);
    }

    // если ветка есть в vars, то повернуть на неё
    // если ветки нет в vars, то повернуть на максимальную
    if (!curMap[cellIndex].vars.includes(+branch)) {
        branch = Math.max.apply(null, curMap[cellIndex].vars);
        console.log("Найдена ближайшая ветка: " + branch);
    } else {
        console.log("Ветка есть в массиве vars, без изменений: " + branch);
    }

    players[current].currentCell = +(branch.toString() + curId);

    // настройка реверса
    if (players[current].currentCell - players[3].currentCell > 0) {
        let mybranch = getPlayersBranch(players[current]);
        if (temp == 1 && curMap == Map13 && mybranch != 1) {
            players[current].reverse = false;
            console.log("Сработал багфикс реверса на трассе 13, ветка 1 - getSkullNextDirection");
        } else {
            players[current].reverse = true;
            console.log("Использую реверс - getSkullNextDirection");
        }
    }

    // багфикс на трассе 13
    if ( (players[current].currentCell == 425 && branch == 4) || (players[current].currentCell == 627 && branch == 6) || (players[current].currentCell == 830 && branch == 8) ) {
        players[current].reverse = false;
        console.log("Сработал багфикс реверса на трассе 13");
    }
    console.log("ЧЕРЕП: currentCell = " + players[current].currentCell);
}

// ЧЕРЕП: определить, в какой стороне находится ветка с человеком

function getSkullBranchSide(humanBranch) {
    // найти id клеток, где есть vars с веткой человека
    let varsCollect = [];
    for (let i = 0; i < curMapParam.brId.length; i++) {
        let index = getCellIndexById(curMapParam.brId[i]);
        if (curMap[index].vars.includes(+humanBranch)) {
            varsCollect.push(curMapParam.brId[i]);
        }
    }
    console.log("найдены id клеток с vars с веткой человека:");
    console.log(varsCollect);

    // если vars несколько, то выбрать ту, на которую он быстрее наступит
    let goalId = Math.max.apply(null, varsCollect);
    console.log("Выбрана развилка: " + goalId);
    if (varsCollect.length > 1) {
        for (let i = 0; i < varsCollect.length; i++) {
            if (varsCollect[i] - players[3].currentCell < 0) continue; // не берем развилки, которые позади
            if (varsCollect[i] - players[3].currentCell < goalId - players[3].currentCell) goalId = varsCollect[i];
        }
        console.log("Развилок больше 1, выбор пересмотрен: " + goalId);
    }

    // выяснить, впереди эта развилка находится, или позади
    if (players[current].currentCell - goalId > 0) {
        console.log("Развилка позади");
        return "behind";
    } else if (players[current].currentCell - goalId == 0) {
        console.log("Я на развилке");
        return "equal";
    } else {
        console.log("Развилка впереди");
        return "forward";
    }
}

// ИСПОЛЬЗОВАНИЕ ПРЕДМЕТОВ
// магнит

function useMagnet() {
    console.log("Нажат useMagnet");
    magName.innerHTML = "Ход магнитом";
    magName.style.color = "white";
    magText.innerHTML = "Вероятность появления этого числа будет увеличена" + "<b>" + " в 2 раза." + "</b>";
    let magImp = document.querySelectorAll(".use__magnet--imp");
    if (cubicArgs.imp) {
        magImp.forEach(function (item) {
            item.style.display = "block";
        });
    } else {
        magImp.forEach(function (item) {
            item.style.display = "none";
        });
    }
    showPopup(mag, magCont, 315, 390);
}

function useSMagnet() {
    console.log("Нажат useMagnet");
    magName.innerHTML = "Ход СУПЕР-магнитом";
    magName.style.color = "red";
    magText.innerHTML = "Вероятность появления этого числа будет увеличена" + "<b>" + " в 3 раза." + "</b>";
    let magImp = document.querySelectorAll(".use__magnet--imp");
    if (cubicArgs.imp) {
        magImp.forEach(function (item) {
            item.style.display = "block";
        });
    } else {
        magImp.forEach(function (item) {
            item.style.display = "none";
        });
    }
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
        player.iron = true;
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
        if (player.magnets + player.smagnets > 0) {
            invMagnetsBlock();
        }
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

// невозможный кубик

function useIMP() {
    console.log("Нажат useIMP");
    askIMPMoves.innerHTML = players[current].imp;
    showPopup(askIMP, askIMPCont, 338, 225);
}

// швабра

function useMop() {
    console.log("Нажат useMop");
    showPopup(askMop, askMopCont, 338, 225);
    deactivateButtonMop();
    let reds = document.querySelectorAll(".cell-red");
    reds.forEach(function (item) {
        cellCollect.push(item);
        activateCell(item);
    });
    overlayPrepare();
}

// капкан

let cellCollect = [];

function useTrap() {
    console.log("Нажат useTrap");
    showPopup(askTrap, askTrapCont, 338, 185);
    deactivateButtonTrap();
    collectCells();
    overlayPrepare();
}

// манипулятор

function useManip() {
    console.log("useManip");
    showPopup(manip, manipCont, 338, 306);
    manipNow.innerHTML = "<b>" + players[current].power + "</b>";
    manipAfter.innerHTML = "<b>" + (players[current].power - 1) + "</b>";
    deactivateButtonManip();
    collectCells();
    overlayPrepare();
}

// собрать свободные клетки (для trap и manipulator)

function collectCells() {
    let empty = document.querySelectorAll(".cell");
    let rivals = [];
    cellCollect = [];
    players.forEach(function (item) {
        rivals.push(item.currentCell);
    });
    for (let i = 0; i < curMap.length; i++) {
        if ( rivals.includes(curMap[i].cellid) ) continue;
        if ( (!curMap[i].type || curMap[i].type === "none") && !curMap[i].bonus) {
            for (let k = 0; k < empty.length; k++) {
                let x = window.getComputedStyle(empty[k]).left;
                let y = window.getComputedStyle(empty[k]).top;
                if (curMap[i].coorX + "px" === x && curMap[i].coorY + "px" === y) {
                    cellCollect.push(empty[k]);
                    activateCell(empty[k]);
                }
            }
        }
    }
}

// КОНЕЦ БЛОКА С ПРЕДМЕТАМИ

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

    // финал трассы 15
    if (escape) {
        if (players[current].power > 0) {
            popupSharePower();
        } else {
            getCellType();
        }
        return;
    }

    if (check) { // если соперники защищены, атаки не произойдет

        let getCellId = getCellIndexById(players[current].currentCell);

        if (curMap[getCellId].type === "checkpoint") {
            if (players[current].type === "human") {
                popupAttackImpCP(); // активирует getCellType
            } else {
                pressAttackImp(); // активирует getCellType
            }
            return;
        }

        if (curMap[getCellId].type === "moneybag" || moneybagStep > 10) {
            if (players[current].type === "human") {
                popupAttackImpMB(); // активирует getCellType
            } else {
                pressAttackImp(); // активирует getCellType
            }
            return;
        }

        setTimeout(getCellType, 500 * gameSpeed);
        return;
    }

    if (curMap === Map15) {
        if (players[current].type === "human") {
            console.log("юзер сел на супер-фишку");
            startSuperConflict("attackSuper");
            return;
        }

        // определить, есть ли в массиве юзер
        let humanTrue = false;
        for (let i = 0; i < playerRival.length; i++) {
            if (playerRival[i] === players[3]) humanTrue = true;
        }

        if (humanTrue) {
            console.log("супер-фишка села на юзера");
            startSuperConflict("attackUser");
        } else {
            setTimeout(getCellType, 500 * gameSpeed);
        }
        return;
    }
/*
    !! правила проверок !!
    виды атак:
    1. Обычная. Требует силу > 0, противника без брони
    2. Вампир. Требует противника без брони
    3. Кулак. Штрих-клетка, сильная модель фишки
 */

    // отсеиваем игроков без кулака, вампира и силы
    if (players[current].power < 1 && !players[current].vampire && curMap[cellIndex].type !== "hatched") {

        if (players[current].type === "comp") {
            pressAttackImp(); // активирует getCellType
        } else {
            popupAttackImp();
        }
        return;
    }

    executeConflict();
}

function executeConflict() {
    // свитч по кол-ву противников на клетке
    switch (playerRival.length) {
        case 1:
            selectedRival = playerRival[0];

            // атака на соперника со щитом, не на штрих-клетке
            if (selectedRival.armor > 0 && curMap[cellIndex].type !== "hatched") {
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

                // подсказки на виды атак
                if (showedHintAttack === false) {
                    showedHintAttack = true;
                    hintLine.push("hintAttack");
                }

                if (unlockVampire && showedHintUseVampire === false && players[current].vampire) {
                    showedHintUseVampire = true;
                    hintLine.push("hintUseVampire");
                }

                if (showedHintUseHatched === false && curMap[cellIndex].type === "hatched") {
                    showedHintUseHatched = true;
                    hintLine.push("hintUseHatched");
                }
                startHintLine();

            } else {
                aiMakeDecision("attackOrNot");
            }

            break;
        case 2:

            if (players[current].type === "human") {
                popupAttackDouble(); // активирует attackOne, attackTwo, attackCancel, кнопку Выбрать другого

                // подсказка - атака
                if (showedHintAttack === false) {
                    nextScript.showed = function () {
                        showedHintAttack = true;
                    }
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
                    nextScript.showed = function () {
                        showedHintAttack = true;
                    }
                    hintLine.push("hintAttack");
                    startHintLine();
                }

            } else {
                aiMakeDecision("attackWho");
            }
            break;
    }
}

function executeShieldPaid(attacking, defender) { // в формате players[i]
    console.log("executeShieldPaid");
    let paid;
    if (defender.iron) {
        paid = ishieldPower;
    } else {
        paid = shieldPower;
    }

    attacking.bonusMoney -= paid;
    defender.bonusMoney += paid;
    setInfoBonus(attacking);
    setInfoBonus(defender);
    if (attacking.letter === "D") {
        setBonus(attacking);
    }
    if (defender.letter === "D") {
        setBonus(defender);
    }
    bonusAnimate(attacking, (paid * -1) );
    bonusAnimate(defender, paid);

    messageShieldPaid(attacking, defender, paid);
}

// алгоритм конфликта с супер-фишками

function startSuperConflict(type, dontExecuteConflict) {

    // настройка уровня штрафа
    let minus = 1;
    if (vampired) minus--;
    if (curMap[cellIndex].type === "hatched" && players[3].armor > 0) minus++;
    vampired = false;

    if (type === "attackSuper") {
        // сверху юзер
        if ( (players[3].vampire || curMap[cellIndex].type === "hatched") && !dontExecuteConflict ) {
            executeConflict();
            return;
        }

        if (curMap[cellIndex].type === "hatched") {
            messageSuper("hatch");
            if (players[3].armor < 1) minus++;
        } else {
            messageSuper("super");
        }
        if (players[3].armor > 0) {
            minus--;
            messageSuperShield();
        }
        executeSuper(minus, "attackSuper");
    }

    if (type === "attackUser") {
        // сверху супер-фишка

        players[current].bonusMoves++;
        messageSuper("user");
        if (players[3].armor > 0) {
            minus--;
            messageSuperShield();
        }
        executeSuper(minus + 1, "attackUser");
    }
}

function executeSuper(minus, type) {
    players[3].power -= minus;
    if (players[3].power < 0) {
        console.log("ПОРАЖЕНИЕ!");
        popupLose();
    } else {
        console.log(players[3].label + ": сила теперь = " + players[3].power);
        setTimeout(refreshPowercells, 500 * gameSpeed);

        if (curMap[cellIndex].type === "hatched" && type === "attackUser") {
            // сверху супер-фишка
            popupLose("map15hatch");
            return;
        }

        if (players[3].power == 0) {
            popupLowEnergy();
            messageCritic();
        } else {
            setTimeout(getCellType,800 * gameSpeed);
        }
    }
}

// НАЖАТИЕ КНОПОК
// атака на 1 соперника: сказал да

function pressAttackYes() {
    console.log("Нажат pressAttackYes");

    if (selectedRival.entity === "sup") {
        showPopup(alarm, alarmCont, 338, 200, true);
        alarmHeading.innerHTML = "Атака невозможна";
        alarmMessage.innerHTML = "Противник слишком силён. Попробуйте атаку вампирскими клыками или кулаком.";
        return;
    }

    if (selectedRival.armor > 0) {
        showPopup(alarm, alarmCont, 338, 200, true);
        alarmHeading.innerHTML = "Атака невозможна";
        alarmMessage.innerHTML = "Соперник одет в броню.<br>Попробуйте сильную атаку (иконка с кулаком).";
        return;
    }

    // проверка на достаточность силы
    if (players[current].power == 0) {
        if (players[current].type === "human") {
            showPopup(alarm, alarmCont, 338, 200, true);
            alarmHeading.innerHTML = "Мало силы";
            alarmMessage.innerHTML = "Недостаточно сил для такой атаки.<br>Попробуйте другую.";
        }
        return;
    }
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

// атака ВАМПИР

function pressVampireYes() {

    if (!vampired && selectedRival.entity === "sup") {
        hidePopup(AttackOnce, AttackOnceCont);
        AttackOnceOther.style.display = "none";
        vampired = true;
        console.log("открыто сюрприз-окно");
        showPopup(surprise, surpriseCont, 338, 200, true);
        surpriseOK.addEventListener("click", pressSurpriseOK);
        surpriseOK.removeEventListener("click", pressHostagePowerOK);
        surpriseHead.innerHTML = "Неожиданные последствия";
        surpriseText.innerHTML = "Благодаря вампирским клыкам Вы ходите ещё раз, но сил от них не прибавилось.";
        return;
    }

    if (selectedRival.entity === "sup") {
        console.log("ВАМПИР!");
        players[3].bonusMoves++;
        players[3].vampire = false;
        players[3].power--;
        cleanInventory();
        fillInventory();
        startSuperConflict("attackSuper", true);
        return;
    }

    if (selectedRival.armor > 0) {
        showPopup(alarm, alarmCont, 338, 200, true);
        alarmHeading.innerHTML = "Чуть не сломал зубы!";
        alarmMessage.innerHTML = "Соперник одет в броню.<br>Попробуйте сильную атаку (иконка с кулаком).";
        return;
    }

    hidePopup(AttackOnce, AttackOnceCont);
    AttackOnceOther.style.display = "none";
    console.log("ВАМПИР!");
    console.log(selectedRival.label + " пропустит ход, а " + players[current].label + " ходит ещё раз");
    messageVampire(selectedRival);
    messageVampireResult(selectedRival);
    players[current].name.querySelector(".player__vampire").style.display = "block";

    // разбираемся с игроком-жертвой укуса
    selectedRival.power--;
    vampired = true;

    if (selectedRival.power < 0) {
        console.log(selectedRival.label + " не выдержал укуса. ПОРАЖЕНИЕ!");
        pedestalPlayer = selectedRival;
        if (selectedRival.type === "human") {
            popupLose("vampired", players[current]);
        } else {
            pressLose(); // если игроков осталось не меньше 2, то в конце всех необходимых действий выполняется moveIsOver с включенным vampired = true
        }
    } else {
        console.log(selectedRival.label + ": сила теперь = " + selectedRival.power);
        setTimeout(refreshPowercells, 500 * gameSpeed);
        selectedRival.skipMoves++;
        setNail(selectedRival.name, selectedRival.skipMoves);

        if (selectedRival.type === "human" && selectedRival.power == 0) {
            popupLowEnergy(); // в конце активируется getCellType
        } else {
            setTimeout(getCellType, 500 * gameSpeed);
        }
    }
}

function vampireBite() {
    console.log("vampireBite");
    vampired = false;
    // разбираемся с игроком-владельцем клыков
    players[current].power++;
    refreshPowercells();
    players[current].vampire = false;
    players[current].bonusMoves++;
    console.log(players[current].label + ": сила теперь = " + players[current].power);

    if (players[current].type === "human") {
        cleanInventory();
        fillInventory();
    }
    setTimeout(getCellType, 500 * gameSpeed);
}

// атака УДАЛЕНИЕ

function pressHatchedYes() {

    console.log("Нажат pressHatchedYes");

    // проверка на модель фишки
    if (players[current].model !== "blue" && players[current].model !== "brown" && players[current].model !== "black") {
        showPopup(alarm, alarmCont, 338, 200, true);
        alarmHeading.innerHTML = "Атака невозможна";
        alarmMessage.innerHTML = "Этот вид атаки требует синюю, коричневую<br>или чёрную модель фишки.<br><br>Попробуйте другую атаку.";
        return;
    }

    // проверка на достаточность силы
    let after;
    if (selectedRival.armor > 0) {
        after = players[current].power - 6;
    } else {
        after = players[current].power - 5;
    }
    if (after < 0) {
        showPopup(alarm, alarmCont, 338, 200, true);
        alarmHeading.innerHTML = "Мало силы";
        alarmMessage.innerHTML = "Недостаточно сил для такой атаки.<br>Попробуйте другую.";
        return;
    }

    // проверка на железную броню
    if (selectedRival.iron) {
        showPopup(alarm, alarmCont, 338, 200, true);
        alarmHeading.innerHTML = "Атака кулаком невозможна";
        alarmMessage.innerHTML = "Соперник одет в <b>железный</b> щит.<br>Он защищает от любых атак.";
        return;
    }

    console.log("АТАКА КУЛАКОМ!");
    hidePopup(AttackOnce, AttackOnceCont);
    AttackOnceOther.style.display = "none";
    players[current].name.querySelector(".player__fist").style.display = "block";
    messageHatched(selectedRival);
    players[current].power = after;
    console.log(players[current].label + ": сила теперь = " + players[current].power);
    refreshPowercells();
    if (selectedRival.entity !== "sup") {
        players[current].bonusMoves++;
    }
    selectedRival.power = -1;
    pedestalPlayer = selectedRival;
    if (selectedRival.type === "human") {
        popupLose("hatched", players[current]);
    } else {
        pressLose(); // если игроков осталось не меньше 2, то в конце всех необходимых действий выполняется moveIsOver
    }
}

// атака на 1 соперника: сказал нет

function pressAttackNo() {
    hidePopup(AttackOnce, AttackOnceCont);
    AttackOnceOther.style.display = "none";
    console.log(players[current].label + " отказался от конфликта");
    if (selectedRival.entity === "sup") {
        startSuperConflict("attackSuper", true);
    } else {
        messageAttackCancel(selectedRival);
        setTimeout(getCellType, 500 * gameSpeed);
    }
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
            // фикс бага, когда черная клетка срабатывает 2 раза
            if (curMap[cellIndex].type === "green") {
                // фикс бага, когда после предупреждении о невозможности исп. манипулятора зеленая клетка не срабатывает
                setTimeout(executeGreen, 500 * gameSpeed);
            } else {
                setTimeout(moveIsOver, 500 * gameSpeed);
            }
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

// финишировал

function pressFinished() {
    console.log("pressFinished");
    hidePopup(Finished, FinishedCont);
    moveToPedestal(pedestalPlayer);
}

// пришел первым

function pressFirst() {
    console.log("pressFirst");
    hidePopup(Finished, FinishedCont);
    if (pedestalPlayer.type === "human" && ( playersCount == 2 || playersCount == 3) ) {
        popupEndrace();
    } else if (pedestalPlayer.type === "comp") {
        setTimeout(moveIsOver, 1800);
    }
}

// игрок хочет досмотреть заезд

function pressWatch() {
    console.log("pressWatch");
    hidePopup(Endrace, EndraceCont);
    moveIsOver();
    cleanInventory();
    // удаление всех блоков инвентаря и оверлеев кубика

    let invArray = document.querySelectorAll(".overlay__invblock, .overlay__shield, .cubic__icon");
    invArray.forEach(function (item) {
        item.style.display = "none";
    });
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
            array[i].name.style.transition = gameSpeed * 0.4 + "s";
            array[i].currentCell = 0;
            setNail(array[i].name, 0);
            removeShield(array[i]);
            array[i].name.querySelector(".player__speed").style.display = "none";
            document.querySelector(".cubic__icon--x2").style.display = "none";
            array[i].name.querySelector(".player__vampire").style.display = "none";
            array[i].name.querySelector(".player__fist").style.display = "none";
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
    setTimeout(raceIsOver, 1800);
}

// нажал ОК в итогах заезда

function pressRankOK() {
    console.log("pressRankOK");
    hidePopup(Ranktable, RanktableCont);

    if (escape) {
        // завершение игры в конце 15 трассы
        if (!escapedWhite || !escapedChamp) {
            // недопобеда
            endGame();
        } else {
            // победа
            destroyMap();
            hideSomeElems();
            popupMap15End1();
        }
        return;
    }

    Ranktable1Bonus.style.display = "none";
    Ranktable2Bonus.style.display = "none";
    Ranktable3Bonus.style.display = "none";
    Ranktable4Bonus.style.display = "none";
    tableMoney1.innerHTML = "$ " + players[0].capital;
    tableMoney2.innerHTML = "$ " + players[1].capital;
    tableMoney3.innerHTML = "$ " + players[2].capital;
    tableMoney4.innerHTML = "$ " + players[3].capital;
    destroyMap();

    if (curMap === Map05) {
        popupMap05Warning();
        return;
    }
    if (curMap === Map06) {
        whosMOP();
        return;
    }

    if (curMap === Map09) {
        popupMap09End();
        return;
    }

    if (curMap === Map10) {
        popupMap10End();
        return;
    }

    if (curMap === Map11) {
        for (let i = 0; i < players.length; i++) {
            if (players[i].letter === "A") players[i].place = 1;
            if (players[i].letter === "B") players[i].place = 2;
            if (players[i].letter === "C") players[i].place = 3;
            if (players[i].letter === "D") players[i].place = 4;
        }
        players.sort(function(a, b){
            return a.place - b.place;
        });
        winner = getWinner();
        if (winner === players[3]) {
            popupMap11Win();
        } else {
            winnerImg = getTokenImg(winner.name);
            popupMap11Lose();
        }
        hideSomeElems();
        return;
    }

    if (curMap === Map14) {
        hideSomeElems();
        popupMap14End();
        return;
    }

    if (curMapParam.bone) {
        switchMaps();
        setUpField();
        setTimeout(function () {
            loadMap(curMap, curMapParam);
        }, 500 * gameSpeed);
        return;
    }

    popupShop();
}

// исполняется по окончании хода

function moveIsOver() {
    console.log("активировался moveIsOver");

    if (vampired && playersCount > 1) {
        console.log("moveIsOver отменён: vampire");
        vampireBite();
        return;
    }

    // сброс некоторых параметров
    document.querySelector(".cubic__icon--magnet").style.display = "none";
    askIMPcubic.style.display = "none";
    impUse = false;

    // подсказка - легенда
    if (players[current].type === "human" && showedHintLegend === false && curMap === Map01) {
        nextScript.script = function () {
            showedHintLegend = true;
            setTimeout(moveIsOver, 1);
        }
        hintLine.push("hintLegend");
        startHintLine();
        return;
    }

    players[current].catchUp = false;
    players[current].moves++;

    // удаление свечения
    for (let i = 0; i < players.length; i++) {
        players[i].name.querySelector(".player__glow").classList.remove("player__glow-act");
        if (players[i].entity === "skull") {
            players[i].name.style.backgroundImage = "url(\"img/tokens/skull.png\")";
        }
    }

    //смена игрока
    changePlayer();
    while (players[current].finished) {
        console.log(players[current].label + " отсутствует на поле");
        changePlayer();
    }

    // разблокировка щитов у человека, активация проверки щитов у компьютера
    let human = findHuman();
    if (human.armor == 0 && !human.finished && curMap !== Map12 && curMap !== Map13 && curMap !== Map14) {
        invShieldsUnblock();
    }
    for (let i = 0; i < players.length; i++) {
        if (players[i].type === "comp" && players[i].finished === false && players[i].armor == 0 && players[i].label !== players[current].label && players[i].entity === "none") {
            setTimeout(function () {
                aiUseShield(players[i]);
            }, 200 * gameSpeed);
        }
    }

    // завершение трассы
    if (playersCount < 2 && curMap !== Map15) {
        raceIsOver();
    } else {
        // переход хода
        console.log(players[current].label + " ХОДИТ");
        messageMoving();

        // добавление свечения
        if (players[current].entity === "skull") {
            players[current].name.style.backgroundImage = "url(\"img/tokens/skull.gif\")";
        } else {
            players[current].name.querySelector(".player__glow").classList.add("player__glow-act");
        }

        refreshTableSelect();
        if (players[current].type === "human") {

            // бомба тикает, когда игрок меняется на чемпиона, либо когда сработал hostageAlone
            if (escape && (current == 3 || hostageAlone) ) {
                if (document.querySelector(".cell-chest p").innerHTML == 0) {
                    bombBlast();
                    return;
                } else {
                    setTimeout(setBomb, 50);
                }
            }
            if (!escapedWhite && escapedChamp) hostageAlone = true;

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
    if (raceInterrupt === false && !curMapParam.bone) {
        moveToPedestal(players[current]);
    }
    whatButton.style.display = "none";
    lookButton.style.display = "none";
    surrenderBtn.style.display = "none";
    tokenOpacityOff();
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

// попытка дать игроку невозможный кубик

function tryGiftIMP() {

    let gift = testGiftIMP();
    if (gift === "IMPtoHuman") {
        popupIMPToHuman();
    } else if (gift === "IMPtoComp") {
        popupIMPToComp();
    } else {
        nextScript.popup();
    }
}

function testGiftIMP() {

    if (impGiven) {
        console.log("Уже был IMP, попапа не будет");
        return false;
    }

    // выяснить, купил ли человек элитную фишку, дать ему кубик
    let human = findHuman();
    if (human.model === "brown" || human.model === "black") {
        human.imp = 3;
        console.log("Человек купил элиту первым, будет IMP");
        return "IMPtoHuman";
    }

    // выяснить, купил ли один из компьютеров элитную фишку, дать ему кубик
    for (let i = 0; i < players.length; i++) {
        if (players[i] === human) continue;
        if (players[i].model === "brown" || players[i].model === "black") {
            players[i].imp = 3;
            console.log("Комп " + players[i].label + " купил элиту первым");
            return "IMPtoComp";
        }
    }
    console.log("Никто не купил элиту, IMP не будет");
    return false;
}

// чья швабра?

function whosMOP() {
    let winner = getWinner();
    winner.mop = true;

    let human = findHuman();
    if (winner === human) {
        popupMOPToHuman();
    } else {
        popupMOPToComp();
    }
}

// определить победителя

function getWinner() {
    let player = players[0];
    for (let i = 1; i < players.length; i++) {
        if (players[i].capital > player.capital) {
            player = players[i];
            continue;
        }
        // если капитал одинаковый, сравниваются модели фишек
        if (players[i].capital == player.capital) {
            let steps = ["white", "yellow", "red", "green", "blue", "brown", "black"];
            let pl1 = steps.indexOf(players[i].model);
            let pl2 = steps.indexOf(player.model);
            if (pl1 > pl2) player = players[i];
        }
    }
    console.log("Определён победитель: " + player.label);
    return player;
}

// перезапуск трассы с черепом

function restartMap() {
    console.log("Перезапуск трассы");
    for (let i = 0; i < players.length; i++) {
        players[i].name.querySelector(".player__glow").classList.remove("player__glow-act");
        if (players[i].entity === "skull") {
            players[i].name.style.backgroundImage = "url(\"img/tokens/skull.png\")";
        }
        players[i].name.style.transition = gameSpeed * 0.8 + "s";
        players[i].currentCell = 0;
    }

    gamePaused = false;
    pausePromise = {};
    current = 0;
    destroyMap(true);
    resetCells();
    loadMap(curMap, curMapParam, false, true);
    if (labelsOn) {
        labels.forEach(function (item) {
            item.style.display = "block";
        });
    }
    let places = document.querySelectorAll(".info__place");
    let finishes = document.querySelectorAll(".info__finish");
    for (let i = 0; i < places.length; i++) {
        places[i].style.display = "block";
        finishes[i].style.display = "none";
    }
    setTimeout(gameStart, 1500 * gameSpeed);
}

// супер-фишка дошла до тюрьмы

function jailSuper() {
    console.log("Супер-фишка дошла до пленницы");
    gameSave("over");
    document.querySelector(".cell-jail img").style.transform = "scaleX(-0.3)";
    document.querySelector(".player-" + players[current].letter + " .player__label").style.display = "none";

    setTimeout(function () {
        document.querySelector(".cell-jail").style.backgroundImage = "none";
    }, 1700);

    setTimeout(popupJailSuper, 2500);
}

// человек дошёл до тюрьмы

function jailUser() {
    console.log("Человек дошёл до пленницы");
    document.querySelector(".cell-jail img").style.transform = "scaleX(-0.3)";
    document.querySelector(".player-" + players[current].letter + " .player__label").style.display = "none";

    // анимация исчезания супер-фишек
    setTimeout(function () {
        for (let i = 0; i < 3; i++) {
            players[i].name.style.transition = ".3s";
            players[i].name.style.transform = "rotate(300deg) scale(1.5)";
            players[i].name.style.transition = "1s";
            setNail(players[i].name, 0);
            setTimeout(function () {
                players[i].name.style.transform = "rotate(1400deg) scale(0.1)";
            }, 300);
            document.querySelector(".player-" + players[i].letter + " .player__label").style.display = "none";
            setTimeout(function () {
                players[i].name.style.display = "none";
            }, 1300);
        }
    },2200);

    setTimeout(function () {
        popupJailHuman();
        document.querySelector(".info__player--I").style.display = "none";
        document.querySelector(".info__player--II").style.display = "none";
        document.querySelector(".info__player--III").style.display = "none";

        // перемещение фишки, которая станет белой
        players[0].name.style.transition = ".2s";
        players[0].name.style.left = "440px";
        players[0].name.style.top = "528px";
        players[0].name.style.transform = "none";
    }, 4000);
}

// поднять бомбу

function riseBomb() {
    hidePopup(char, charCont);

    setTimeout(function () {
        document.querySelector(".chest__bottom").style.visibility = "visible";
        document.querySelector(".chest__cap").style.visibility = "visible";
        document.querySelector(".chest__bomb").style.visibility = "visible";
        document.querySelector(".cell-chest").style.backgroundImage = "none";
    }, 500);

    setTimeout(function () {
        document.querySelector(".chest__bomb").style.bottom = "29px";
    }, 1700);

    setTimeout(function () {
        setBomb();
    }, 3400);

    setTimeout(function () {
        popupJailBomb();
    }, 3800);
}

// изменить показания бомбы

function setBomb() {
    let time = document.querySelector(".cell-chest p").innerHTML;
    if (time === "??") {
        time = bombTimer;
    } else {
        time--;
    }
    if (time < 10) {
        time = "0" + time;
    }

    document.querySelector(".cell-chest p").innerHTML = "" + time;
    document.querySelector(".cell-chest p").style.transition = "0s";
    setTimeout(function () {
        document.querySelector(".cell-chest p").style.transform = "scale(1.2)";
    },17);
    setTimeout(function () {
        document.querySelector(".cell-chest p").style.transition = ".5s";
    }, 34);
    setTimeout(function () {
        document.querySelector(".cell-chest p").style.transform = "scale(1)";
    }, 51);

    if (time < 4) {
        document.querySelector(".cell-chest p").style.color = "#ff0c0c";
    }
    console.log("Время на бомбе: " + time);
}

// начать побег из замка

function startEscape() {
    console.log("Активация режима побега");
    hidePopup(char, charCont);
    remixMap15();
    let blast = document.createElement("img");
    blast.setAttribute("src", "img/chest/chest-bomb-blast.png");
    blast.classList.add("blast");
    document.querySelector(".cell-chest").append(blast);

    // подготовка фишек
    players[1].finished = true;
    players[2].finished = true;
    players[0].name.style.transition = ".2s";
    players[0].power = 2;
    players[0].skipMoves = 0;
    players[0].bonusMoves = 0;
    players[0].protection = false;
    players[0].shift = 1;
    players[0].place = 2;
    players[0].entity = "none";
    players[0].type = "human";
    players[0].reverse = true;
    players[0].catchUp = false;
    players[0].speed = -1;
    players[0].currentCell = 763;
    players[0].magnets = 0;
    players[0].smagnets = 0;
    players[0].shields = 0;
    players[0].ishields = 0;
    players[0].trap = false;
    players[0].vampire = false;
    players[0].imp = 0;
    players[0].mop = false;
    players[0].name.style.backgroundImage = "url(\"img/tokens/token-white.png\")";
    players[0].name.style.left = "440px";
    players[0].name.style.top = "528px";
    document.querySelector(".player-" + players[0].letter + " .player__label").innerHTML = "Пленница";
    players[0].label = "Пленница";
    document.querySelector(".cell-jail").style.backgroundImage = "none";
    players[0].name.style.display = "block";
    players[3].reverse = true;
    players[3].currentCell = 763;
    players[3].place = 1;
    players[3].shields = 0;
    players[3].ishields = 0;
    players[3].trap = false;
    players[3].vampire = false;
    resetMargin();

    // настройка табло справа
    refreshPowercells();
    tableName1.innerHTML = "Пленница";
    tableToken1.style.background = "white";
    let root = tableToken1.closest(".info__player");
    root.querySelector(".info__player-power").style.visibility = "visible";
    document.querySelector(".info__player--I").style.display = "flex";
    surrenderBtn.style.display = "none";
    if (labelsOn) {
        document.querySelector(".player-D .player__label").style.display = "block";
        document.querySelector(".player-A .player__label").style.display = "block";
    }

    // настройка правил и старт побега
    escape = true;
    current = 3;
    playersCount = 2;
    setTimeout(function () {
        // удаление всех блоков инвентаря и оверлеев кубика
        let invArray = document.querySelectorAll(".overlay__invblock, .overlay__shield, .cubic__icon");
        invArray.forEach(function (item) {
            item.style.display = "none";
        });

        // восстановить блоки там, где нужно
        blockHumanInv(true);
        cleanInventory();
        fillInventory();

        messageStartEscape();
        infoMoveHuman();
    }, 1000);
}

// у пленницы кончилась сила

function hostagePowerOver() {
    console.log("У заложницы закончилась сила");
    showPopup(surprise, surpriseCont, 338, 165, true);
    surpriseOK.removeEventListener("click", pressSurpriseOK);
    surpriseOK.addEventListener("click", pressHostagePowerOK);
    surpriseHead.innerHTML = "Силы закончились!";
    surpriseText.innerHTML = "Пленница не смогла добраться до выхода.";
}

// взрыв бомбы

function bombBlast() {
    console.log("Бомба взрывается");
    let blast = document.querySelector(".cell-chest .blast");
    blast.style.visibility = "visible";
    blast.style.transform = "scale(1)";

    setTimeout(function () {
        if (escapedChamp && !escapedWhite) {
            // дошёл только юзер, пленница погибла
            popupUserWinsHostageLose();
        } else {
            // не добрались оба, либо взорвался юзер
            popupLose("blast");
        }
    }, 2000);
}

// завершение последней трассы и подведение итогов

function endGame() {
    console.log("ПОДВЕДЕНИЕ ИТОГОВ");
    hidePopup(char, charCont);
    cleanInventory();
    overlayCubic.style.display = "none";
    invMagnetsUnblock();
    invShieldsUnblock();
    hideSomeElems();
    document.querySelector(".overlay__invblock--imp").style.display = "none";
    document.querySelector(".overlay__invblock--mop").style.display = "none";
    document.querySelector(".overlay__invblock--trap").style.display = "none";
    let invArray = document.querySelectorAll(".overlay__invblock, .overlay__shield, .cubic__icon");
    invArray.forEach(function (item) {
        item.style.display = "none";
    });
    let rep = document.querySelectorAll(".inventory-rep__div img");
    rep.forEach(function (item) {
        item.style.visibility = "hidden";
    });
    createRatingRow(players[3]);
    localStorage.setItem("jumpers-rating", JSON.stringify(ratingMass));
    popupRating("end");
}
