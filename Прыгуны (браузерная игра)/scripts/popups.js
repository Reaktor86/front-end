const overlay = document.querySelector(".overlay__popup");
const overlayHard = document.querySelector(".overlay__popup-hard");
const overlaySettings = document.querySelector(".overlay__cover-settings");

// универсальная функция для открытия любого попапа
function showPopup(main, content, width, height, hard, wait) {
    if (hard) {
        overlayHard.style.display = "block";
        kbPauseOff();
    } else {
        overlay.style.display = "block";
    }
    main.style.display = "block";
    let time = 400;
    if (wait) {
        time = 800;
    }
    setTimeout(function () {
        main.style.width = width + "px";
        main.style.height = height + "px";
        setTimeout(function () {
            if (content) content.style.display = "block";
            main.style.transition = "0s";
        }, time);
    }, 17);
}

// универсальная функция для закрытия любого попапа
function hidePopup(main, content, hard, wait) {
    content.style.display = "none";
    main.style.transition = ".4s";
    main.style.display = "none";
    main.style.width = "1px";
    main.style.height = "1px";
    if (hard) {
        kbPauseOn();
        if (wait) {
            setTimeout(function () {
                overlayHard.style.display = "none";
            },100);
        } else {
            overlayHard.style.display = "none";
        }
    } else {
        overlay.style.display = "none";
    }


}

// рядовое сообщение с предупреждением

let alarm = document.querySelector(".js-alarm");
let alarmCont = document.querySelector(".js-alarm .js-popup-content");
let alarmHeading = document.querySelector(".js-alarm-heading");
let alarmMessage = document.querySelector(".js-alarm-message");
document.querySelector(".js-alarm .js-popup-ok").addEventListener("click", pressOk);

function pressOk() {
    console.log("Нажат ОК");
    hidePopup(alarm, alarmCont, true);
}

// сюрприз с клыками

let surprise = document.querySelector(".js-surprise");
let surpriseCont = document.querySelector(".js-surprise .js-popup-content");
let surpriseHead = document.querySelector(".js-surprise .js-alarm-heading");
let surpriseText = document.querySelector(".js-surprise .js-alarm-message");
let surpriseOK = document.querySelector(".js-surprise .js-popup-ok");

function pressSurpriseOK() {
    console.log("Нажат ОК");
    hidePopup(surprise, surpriseCont, true);
    pressVampireYes();
}

function pressHostagePowerOK() {
    console.log("Нажат ОК");
    hidePopup(surprise, surpriseCont, true);
    setTimeout(function () {
        animRemoveToken(players[0]);
    }, 500);
    playersCount--;
    players[0].finished = true;
    setFinishFlag(players[0]);
    setTimeout(messageHostageLose, 1600);
    if (playersCount > 0) {
        // белая кончаются силы, юзер играет дальше
        setTimeout(moveIsOver, 2000);
    } else {
        // юзер сбежал, белая кончаются силы
        setTimeout(popupUserWinsHostageLose, 2000);
    }
}

// атаковать игрока ценой 1 ед силы?

let AttackOnce = document.querySelector(".js-attack-once");
let AttackOnceCont = document.querySelector(".js-attack-once .popup__content");
let AttackOnceRival = document.querySelector(".js-attack-once .span__imp"); // Игрок Х
let AttackOnceNow = document.querySelector(".js-attack-once .js-popup-now b"); // численное
let AttackOnceAfter = document.querySelector(".js-attack-once .js-popup-after b"); // численное
let AttackOnceYes = document.querySelector(".js-attack-once .js-popup-confirm"); // ДА
let AttackOnceNo = document.querySelector(".js-attack-once .js-popup-decline"); // НЕТ
let AttackOnceOther = document.querySelector(".js-attack-once .js-popup-other"); // Выбрать другого
let AttackOnceVamp = document.querySelector(".js-attack-once .hard-attack--vampire"); // Кнопка вампира
let AttackOnceFist = document.querySelector(".js-attack-once .hard-attack--fist"); // Кнопка кулака
let AttackOnceH2 = document.querySelector(".js-attack-once .popup__head h2"); // Возможность атаки
let AttackOnceWhat = document.querySelector(".js-attack-once .popup__whattodo"); // Что сделать с игроком
let AttackOnceShield = document.querySelector(".js-attack-once .popup__shield"); // У соперника щит
AttackOnceNo.addEventListener("click", pressAttackNo);
AttackOnceOther.addEventListener("click", pressOtherRival);

function popupAttackOnce(selectedRival) {
    console.log("атака на игрока " + selectedRival.label);
    AttackOnceRival.innerHTML = selectedRival.label;
    AttackOnceShield.style.visibility = "hidden";
    AttackOnceNow.innerHTML = "" + players[current].power;
    AttackOnceAfter.innerHTML = "" + (players[current].power - 1);
    vampireTakeoff();
    hatchedTakeoff();
    AttackOnceYes.addEventListener("click", pressAttackYes);
    AttackOnceWhat.innerHTML = "Атаковать ценой 1 ед. силы?";
    AttackOnceH2.innerHTML = "Возможность атаки";

    if (curMap[cellIndex].type === "hatched" || players[current].vampire) {
        showPopup(AttackOnce, AttackOnceCont, 350, 315);
        AttackOnceVamp.style.display = "block";
        AttackOnceFist.style.display = "block";
        AttackOnceVamp.setAttribute("src", "img/empty.png");
        AttackOnceFist.setAttribute("src", "img/empty.png");
    } else {
        showPopup(AttackOnce, AttackOnceCont, 350, 265);
        AttackOnceVamp.style.display = "none";
        AttackOnceFist.style.display = "none";
    }

    if (players[current].vampire) {
        vampireOff();
        AttackOnceVamp.setAttribute("src", "img/inv-vampire.png");
    }

    if (curMap[cellIndex].type === "hatched") {
        hatchedOff();
        AttackOnceFist.setAttribute("src", "img/fist.png");
    }
}

function vampireOn() {
    AttackOnceVamp.removeEventListener("click", vampireOn);
    AttackOnceVamp.addEventListener("click", vampireOff);
    AttackOnceVamp.removeEventListener("mouseover", addHardAttackMouseover);
    AttackOnceVamp.removeEventListener("mouseout", addHardAttackMouseout);
    if (curMap[cellIndex].type === "hatched") {
        hatchedOff();
    }
    AttackOnceH2.innerHTML = "Режим вампира";
    let coef = 1;
    if (selectedRival.entity === "sup") {
        AttackOnceWhat.innerHTML = "ОТКАЗ ОТ АТАКИ МОЖЕТ ЛИШИТЬ СИЛЫ";
        if (players[current].armor < 1) coef = 0;
    } else {
        AttackOnceWhat.innerHTML = "Атаковать и забрать 1 ед. силы?";
    }
    AttackOnceNow.innerHTML = "" + players[current].power;
    AttackOnceAfter.innerHTML = "" + (players[current].power + coef);
    AttackOnceVamp.style.boxShadow = "0 0 4px 4px red inset";
    AttackOnceYes.removeEventListener("click", pressAttackYes);
    AttackOnceYes.addEventListener("click", pressVampireYes);
}

function vampireOff() {
    AttackOnceVamp.removeEventListener("click", vampireOff);
    AttackOnceVamp.addEventListener("click", vampireOn);
    AttackOnceVamp.addEventListener("mouseover", addHardAttackMouseover);
    AttackOnceVamp.addEventListener("mouseout", addHardAttackMouseout);
    AttackOnceH2.innerHTML = "Возможность атаки";
    let coef = 1;
    if (selectedRival.entity === "sup") {
        AttackOnceWhat.innerHTML = "ОТКАЗ ОТ АТАКИ МОЖЕТ ЛИШИТЬ СИЛЫ";
        if (players[current].armor > 0) coef = 0;
    } else {
        AttackOnceWhat.innerHTML = "Атаковать ценой 1 ед. силы?";
    }
    AttackOnceNow.innerHTML = "" + players[current].power;
    AttackOnceAfter.innerHTML = "" + (players[current].power - coef);
    AttackOnceVamp.style.boxShadow = "none";
    AttackOnceYes.removeEventListener("click", pressVampireYes);
    AttackOnceYes.addEventListener("click", pressAttackYes);
}

function hatchedOn() {
    AttackOnceFist.removeEventListener("click", hatchedOn);
    AttackOnceFist.addEventListener("click", hatchedOff);
    AttackOnceFist.removeEventListener("mouseover", addHardAttackMouseover);
    AttackOnceFist.removeEventListener("mouseout", addHardAttackMouseout);
    if (players[current].vampire) {
        vampireOff();
    }
    AttackOnceH2.innerHTML = "Атака на штрих-клетке";
    if (selectedRival.entity === "sup") {
        AttackOnceWhat.innerHTML = "ОТКАЗ ОТ АТАКИ МОЖЕТ ЛИШИТЬ СИЛЫ";
    } else {
        AttackOnceWhat.innerHTML = "Удалить с трассы ценой 5 ед. силы?";
    }
    AttackOnceNow.innerHTML = "" + players[current].power;
    if (selectedRival.armor > 0) {
        AttackOnceAfter.innerHTML = "" + (players[current].power - 6);
        AttackOnceShield.style.visibility = "visible";
    } else {
        AttackOnceAfter.innerHTML = "" + (players[current].power - 5);
        AttackOnceShield.style.visibility = "hidden";
    }
    AttackOnceFist.style.boxShadow = "0 0 4px 4px red inset";
    AttackOnceYes.removeEventListener("click", pressAttackYes);
    AttackOnceYes.addEventListener("click", pressHatchedYes);
}

function hatchedOff() {
    AttackOnceFist.removeEventListener("click", hatchedOff);
    AttackOnceFist.addEventListener("click", hatchedOn);
    AttackOnceFist.addEventListener("mouseover", addHardAttackMouseover);
    AttackOnceFist.addEventListener("mouseout", addHardAttackMouseout);
    AttackOnceH2.innerHTML = "Возможность атаки";
    let coef = 1;
    if (selectedRival.entity === "sup") {
        AttackOnceWhat.innerHTML = "ОТКАЗ ОТ АТАКИ МОЖЕТ ЛИШИТЬ СИЛЫ";
        if (players[current].armor > 0) coef = 0;
    } else {
        AttackOnceWhat.innerHTML = "Атаковать ценой 1 ед. силы?";
    }
    AttackOnceNow.innerHTML = "" + players[current].power;
    AttackOnceAfter.innerHTML = "" + (players[current].power - coef);
    AttackOnceFist.style.boxShadow = "none";
    AttackOnceShield.style.visibility = "hidden";
    AttackOnceYes.removeEventListener("click", pressHatchedYes);
    AttackOnceYes.addEventListener("click", pressAttackYes);
}

// снять все эффекты с кнопок
function vampireTakeoff() {
    AttackOnceVamp.removeEventListener("click", vampireOff);
    AttackOnceVamp.removeEventListener("click", vampireOn);
    AttackOnceVamp.removeEventListener("mouseover", addHardAttackMouseover);
    AttackOnceVamp.removeEventListener("mouseout", addHardAttackMouseout);
    AttackOnceVamp.style.boxShadow = "none";
    AttackOnceVamp.style.cursor = "default";
    AttackOnceYes.removeEventListener("click", pressHatchedYes);
    AttackOnceYes.removeEventListener("click", pressVampireYes);
}

function hatchedTakeoff() {
    AttackOnceFist.removeEventListener("click", hatchedOff);
    AttackOnceFist.removeEventListener("click", hatchedOn);
    AttackOnceFist.removeEventListener("mouseover", addHardAttackMouseover);
    AttackOnceFist.removeEventListener("mouseout", addHardAttackMouseout);
    AttackOnceFist.style.boxShadow = "none";
    AttackOnceFist.style.cursor = "default";
    AttackOnceYes.removeEventListener("click", pressHatchedYes);
    AttackOnceYes.removeEventListener("click", pressVampireYes);
}

// копилка

let askMB = document.querySelector(".js-mb");
let askMBCont = document.querySelector(".js-mb .js-popup-content");
let askMBPowerText = document.querySelector(".js-mb .popup__mb-text--power");
let askMBPower = document.querySelector(".js-mb .js-mb-pow b");
let askMBMoney = document.querySelector(".js-mb .js-mb-money b");
document.querySelector(".js-mb .js-button-yes").addEventListener("click", pressAskMBYes);
document.querySelector(".js-mb .js-button-no").addEventListener("click", pressAskMBNo);

function popupAskMB(step) {
    console.log("popupAskMB");
    if (step < 6) {
        askMBPowerText.style.visibility = "hidden";
        askMBPower.style.visibility = "hidden";
        askMBMoney.innerHTML = "+" + mbPrize1 + "$";
    } else {
        askMBPowerText.style.visibility = "visible";
        askMBPower.style.visibility = "visible";
        askMBMoney.innerHTML = "+" + mbPrize2 + "$";
    }
    showPopup(askMB, askMBCont, 300, 280);
}

// если копилку не использует, то код активирует сам себя ещё раз, но уже без проверки копилки
// если копилку использует, то активируется executeMB
// внутри executeMB активируется moveisover

function pressAskMBYes() {
    console.log("pressAskMBYes");
    hidePopup(askMB, askMBCont);
    executeMoneybag();
    mbOver = true;
}

function pressAskMBNo() {
    console.log("pressAskMBNo");
    hidePopup(askMB, askMBCont);
    players[current].protection = false;
    mbOver = true;
    messageMBno();

    if (players[current].type === "human") {
        infoMoveHuman();
    } else {
        infoMoveComp();
    }

    // если сверху был ещё игрок, то он автоматически попадает в копилку
    let rivals = getRivalsArray(players[current]);
    if (rivals.length > 0) {
        let rival = rivals.find(item => item.shiftPos == 2);
        if (rival) {
            rival.protection = true;
            messageMB(rival);
            return;
        }
    }

    // возвращаем метку "бонус"
    curMapParam.bonId.push(curMap[cellIndex].cellid);
    console.log("Метка добавлена, curMapParam.bonId = ");
    console.log(curMapParam.bonId);
}

// клетка-джокер сюрприз

let joker = document.querySelector(".js-joker");
let jokerCont = document.querySelector(".js-joker .popup__content");
let jokerStop = document.querySelector(".js-joker .js-button-ok");
let jokerImg = document.querySelector(".js-joker .new-condition__flex > div");
let jokerH2 = document.querySelector(".js-joker .new-condition__flex h2");
let jokerText = document.querySelector(".js-joker .new-condition__text");
let jokerFull = document.querySelector(".js-joker .new-condition__full");
let selectedType;

function popupJoker() {
    console.log("popupJoker");
    showPopup(joker, jokerCont, 315, 265);

    let img = jokerImg.querySelector(".joker-img");
    if (img) jokerImg.querySelector(".joker-img").remove();
    let div = jokerImg.querySelector(".joker-img");
    if (div) jokerImg.querySelector(".joker-img").remove();
    deactivateButtonRival(jokerStop);
    img = document.createElement("img");
    img.setAttribute("src", "img/joker.gif");
    img.classList.add("joker-img");
    jokerImg.append(img);
    jokerH2.innerHTML = "??????";
    jokerText.innerHTML = "";
    jokerStop.innerHTML = "Остановить";
    jokerFull.style.display = "none";

    setTimeout(function () {
        activateButtonRival(jokerStop);
        jokerStop.addEventListener("click", pressJokerStop, {once: true});
        //jokerStop.addEventListener("click", pressJokerStop);
    }, 1500);
}

function pressJokerStop() {
    console.log("pressJokerStop");
    deactivateButtonRival(jokerStop);
    jokerImg.querySelector(".joker-img").remove();
    let type = generateSurprise();
    selectedType = type;
    let delay = 1000;

    if (type === "yellow") {
        jokerH2.innerHTML = "ЖЁЛТАЯ КЛЕТКА";
        setTimeout(function () { jokerText.innerHTML = "Ходите ещё раз" }, delay);
    }
    if (type === "orange") {
        jokerH2.innerHTML = "ОРАНЖЕВАЯ КЛЕТКА";
        setTimeout(function () { jokerText.innerHTML = "Ходите ещё 2 раза" }, delay);
    }
    if (type === "green") {
        jokerH2.innerHTML = "ЗЕЛЁНАЯ КЛЕТКА";
        setTimeout(function () { jokerText.innerHTML = "Пропустите ход" }, delay);
    }
    if (type === "red") {
        jokerH2.innerHTML = "КРАСНАЯ КЛЕТКА";
        setTimeout(function () { jokerText.innerHTML = "-1 ед. силы<br>Возвращайтесь на чекпойнт" }, delay);
    }
    if (type === "black") {
        jokerH2.innerHTML = "ЧЁРНАЯ КЛЕТКА";
        setTimeout(function () { jokerText.innerHTML = "-1 ед. силы" }, delay);
    }
    if (type === "starOrange") {
        jokerH2.innerHTML = "ОРАНЖЕВАЯ ЗВЕЗДА";
        setTimeout(function () { jokerText.innerHTML = "+1 ед. силы" }, delay);
    }
    if (type === "starRed") {
        jokerH2.innerHTML = "КРАСНАЯ ЗВЕЗДА";
        setTimeout(function () { jokerText.innerHTML = "+2 ед. силы" }, delay);
    }
    if (type === "speed") {
        jokerH2.innerHTML = "МОЛНИЯ";
        setTimeout(function () { jokerText.innerHTML = "Следующие 3 хода очки на кубике x2" }, delay);
    }
    let bonus = false;
    if (typeof type === "number") {
        if (type < 0) {
            jokerH2.innerHTML = "ШТРАФ";
            setTimeout(function () { jokerText.innerHTML = "Уменьшите капитал на указанное число" }, delay);
        } else {
            jokerH2.innerHTML = "БОНУС";
            setTimeout(function () { jokerText.innerHTML = "Увеличьте капитал на указанное число" }, delay);
        }
        bonus = type;
        selectedType = type;
        type = "bonus";
    }

    let isItItem = false;
    let img = document.createElement("img");
    if (type === "magnet") {
        jokerH2.innerHTML = "МАГНИТ";
        setTimeout(function () { jokerText.innerHTML = "<b>Бонусный предмет</b><br>Увеличивает вероятность выпадения нужного числа на кубике" }, delay);
        img.setAttribute("src", "img/inv-magnet.png");
        isItItem = true;
        checkInventory("magnet");
    }
    if (type === "smagnet") {
        jokerH2.innerHTML = "СУПЕР-МАГНИТ";
        setTimeout(function () { jokerText.innerHTML = "<b>Бонусный предмет</b><br>Увеличивает вероятность выпадения нужного числа на кубике" }, delay);
        img.setAttribute("src", "img/inv-smagnet.png");
        isItItem = true;
        checkInventory("magnet");
    }
    if (type === "shield") {
        jokerH2.innerHTML = "ЩИТ";
        setTimeout(function () { jokerText.innerHTML = "<b>Бонусный предмет</b><br>Защищает от слабых атак соперников" }, delay);
        img.setAttribute("src", "img/inv-shield.png");
        isItItem = true;
        checkInventory("shield");
    }
    if (type === "ishield") {
        jokerH2.innerHTML = "ЖЕЛЕЗНЫЙ ЩИТ";
        setTimeout(function () { jokerText.innerHTML = "<b>Бонусный предмет</b><br>Защищает от слабых атак соперников" }, delay);
        img.setAttribute("src", "img/inv-ishield.png");
        isItItem = true;
        checkInventory("shield");
    }
    if (type === "trap") {
        jokerH2.innerHTML = "КАПКАН";
        setTimeout(function () { jokerText.innerHTML = "<b>Бонусный предмет</b><br>Возможность задержать и ограбить соперника" }, delay);
        img.setAttribute("src", "img/inv-trap.png");
        isItItem = true;
        checkInventory("trap");
    }
    if (type === "vampire") {
        jokerH2.innerHTML = "ВАМПИРСКИЕ КЛЫКИ";
        setTimeout(function () { jokerText.innerHTML = "<b>Бонусный предмет</b><br>Возможность забрать силу у соперника" }, delay);
        img.setAttribute("src", "img/inv-vampire.png");
        isItItem = true;
        checkInventory("vampire");
    }

    let cell;
    if (isItItem) {
        cell = document.createElement("div");
        cell.classList.add("joker-img", "cell-joker-item");
        cell.append(img);
    } else {
        cell = drawCell(type, "", bonus, true);
    }
    jokerImg.append(cell);

    setTimeout(function () {
        jokerStop.innerHTML = "OK";
        activateButtonRival(jokerStop);
        jokerStop.addEventListener("click", pressJokerOK, {once: true});
    }, 1500);
}

function pressJokerOK() {
    hidePopup(joker, jokerCont);

    if (players[current].type === "comp") {
        selectedType = generateSurprise();
        if (players[current].entity === "none") {
            checkInventory(selectedType);
        }
    }

    console.log("Сгенерирован сюрприз: " + selectedType);
    messageJokerOK();

    // вещи, которые не актуальны для черепа или супер-фишки
    let surArray = [
        "black",
        "starOrange",
        "starRed",
        "magnet",
        "smagnet",
        "shield",
        "ishield",
        "trap",
        "vampire",
    ]

    setTimeout(function () {

        if (players[current].type === "comp" && curMapParam.bone && (surArray.includes(selectedType) || typeof selectedType === "number")) {
            getCellType();
            return;
        }

        getCellType(false, selectedType);

    }, 500 * gameSpeed);
}

// проверить инвентарь игрока перед тем, как давать предмет // меняет глобальные переменные!

function checkInventory(item) {
    let check = true;
    if (item === "magnet" || item === "smagnet") {
        if (players[current].magnets + players[current].smagnets > 2) check = false;
    }
    if (item === "shield" || item === "ishield") {
        if (players[current].shields + players[current].ishields > 2) check = false;
    }
    if (item === "trap") {
        if (players[current].trap) check = false;
    }
    if (item === "vampire") {
        if (players[current].vampire) check = false;
    }

    if (!check) {
        selectedType = "none";
        setTimeout(function () {
            jokerFull.style.display = "block";
        }, 1000);
    }
}

// соперников двое! Кого атаковать?

let AttackDouble = document.querySelector(".js-attack-double");
let AttackDoubleCont = document.querySelector(".js-attack-double .popup__content");
let AttackDoubleR1 = document.querySelector(".js-attack-double .js-popup-r1");
let AttackDoubleR2 = document.querySelector(".js-attack-double .js-popup-r2");
let AttackDoubleCancel = document.querySelector(".js-attack-double .js-popup-cancel");
AttackDoubleCancel.addEventListener("click", pressAttackCancel);

function popupAttackDouble() {
    console.log("popupAttackDouble");
    let shieldPath1 = document.querySelector(".js-attack-double .popup__button-img-r1");
    let shieldPath2 = document.querySelector(".js-attack-double .popup__button-img-r2");

    if (playerRival[0].iron) {
        shieldPath1.setAttribute("src", "img/inv-ishield.png");
    } else {
        shieldPath1.setAttribute("src", "img/inv-shield.png");
    }
    if (playerRival[1].iron) {
        shieldPath2.setAttribute("src", "img/inv-ishield.png");
    } else {
        shieldPath2.setAttribute("src", "img/inv-shield.png");
    }

    if (playerRival[0].armor > 0 && curMap[cellIndex].type !== "hatched") {
        deactivateButtonRival(AttackDoubleR1);
        shieldPath1.style.visibility = "visible";
        AttackDoubleR1.removeEventListener("click", pressAttackOne);
    } else {
        activateButtonRival(AttackDoubleR1);
        shieldPath1.style.visibility = "hidden";
        AttackDoubleR1.addEventListener("click", pressAttackOne);
    }
    if (playerRival[1].armor > 0 && curMap[cellIndex].type !== "hatched") {
        deactivateButtonRival(AttackDoubleR2);
        shieldPath2.style.visibility = "visible";
        AttackDoubleR2.removeEventListener("click", pressAttackTwo);
    } else {
        activateButtonRival(AttackDoubleR2);
        shieldPath2.style.visibility = "hidden";
        AttackDoubleR2.addEventListener("click", pressAttackTwo);
    }
    AttackDoubleR1.innerHTML = playerRival[0].label;
    AttackDoubleR2.innerHTML = playerRival[1].label;
    showPopup(AttackDouble, AttackDoubleCont, 350, 245);
}

// куча соперников! Кого атаковать?

let AttackTriple = document.querySelector(".js-attack-triple");
let AttackTripleCont = document.querySelector(".js-attack-triple .popup__content");
let AttackTripleR1 = document.querySelector(".js-attack-triple .js-popup-r1");
let AttackTripleR2 = document.querySelector(".js-attack-triple .js-popup-r2");
let AttackTripleR3 = document.querySelector(".js-attack-triple .js-popup-r3");
let AttackTripleCancel = document.querySelector(".js-attack-triple .js-popup-cancel");
AttackTripleR1.addEventListener("click", pressAttackOne);
AttackTripleR2.addEventListener("click", pressAttackTwo);
AttackTripleR3.addEventListener("click", pressAttackThree);
AttackTripleCancel.addEventListener("click", pressAttackCancel);

function popupAttackTriple() {
    console.log("popupAttackTriple");
    let shieldPath1 = document.querySelector(".js-attack-triple .popup__button-img-r1");
    let shieldPath2 = document.querySelector(".js-attack-triple .popup__button-img-r2");
    let shieldPath3 = document.querySelector(".js-attack-triple .popup__button-img-r3");

    if (playerRival[0].iron) {
        shieldPath1.setAttribute("src", "img/inv-ishield.png");
    } else {
        shieldPath1.setAttribute("src", "img/inv-shield.png");
    }
    if (playerRival[1].iron) {
        shieldPath2.setAttribute("src", "img/inv-ishield.png");
    } else {
        shieldPath2.setAttribute("src", "img/inv-shield.png");
    }
    if (playerRival[2].iron) {
        shieldPath3.setAttribute("src", "img/inv-ishield.png");
    } else {
        shieldPath3.setAttribute("src", "img/inv-shield.png");
    }

    if (playerRival[0].armor > 0 && curMap[cellIndex].type !== "hatched") {
        deactivateButtonRival(AttackTripleR1);
        shieldPath1.style.visibility = "visible";
        AttackTripleR1.removeEventListener("click", pressAttackOne);
    } else {
        activateButtonRival(AttackTripleR1);
        shieldPath1.style.visibility = "hidden";
        AttackTripleR1.addEventListener("click", pressAttackOne);
    }
    if (playerRival[1].armor > 0 && curMap[cellIndex].type !== "hatched") {
        deactivateButtonRival(AttackTripleR2);
        shieldPath2.style.visibility = "visible";
        AttackTripleR2.removeEventListener("click", pressAttackTwo);
    } else {
        activateButtonRival(AttackTripleR2);
        shieldPath2.style.visibility = "hidden";
        AttackTripleR2.addEventListener("click", pressAttackTwo);
    }
    if (playerRival[2].armor > 0 && curMap[cellIndex].type !== "hatched") {
        deactivateButtonRival(AttackTripleR3);
        shieldPath3.style.visibility = "visible";
        AttackTripleR3.removeEventListener("click", pressAttackThree);
    } else {
        activateButtonRival(AttackTripleR3);
        shieldPath3.style.visibility = "hidden";
        AttackTripleR3.addEventListener("click", pressAttackThree);
    }
    AttackTripleR1.innerHTML = playerRival[0].label;
    AttackTripleR2.innerHTML = playerRival[1].label;
    AttackTripleR3.innerHTML = playerRival[2].label;
    showPopup(AttackTriple, AttackTripleCont, 350, 245);
}

function activateButtonRival(path) {
    console.log("Кнопка соперник активна");
    path.style.cursor = "pointer";
    path.style.background = "#ffbb55";
    path.style.fontWeight = "bold";
    path.addEventListener("mouseover", addButtonMouseover);
    path.addEventListener("mouseout", addButtonMouseout);
}

function deactivateButtonRival(path) {
    console.log("Кнопка соперник не активна");
    path.style.cursor = "default";
    path.style.background = "#7d7d7d";
    path.style.fontWeight = "normal";
    path.removeEventListener("mouseover", addButtonMouseover);
    path.removeEventListener("mouseout", addButtonMouseout);
}

// атака невозможна

let AttackImp = document.querySelector(".js-attack-imp");
let AttackImpCont = document.querySelector(".js-attack-imp .popup__content");
let AttackImpHead = document.querySelector(".js-attack-imp .js-attack-head");
let AttackImpMess = document.querySelector(".js-attack-imp .js-attack-imp-message");
let AttackImpOk = document.querySelector(".js-attack-imp .js-popup-ok");
AttackImpOk.addEventListener("click", pressAttackImp);

// атака невозможна - нет энергии

function popupAttackImp() {
    console.log("popupAttackImp");
    showPopup(AttackImp, AttackImpCont, 338, 150);
    AttackImpHead.innerHTML = "Атака невозможна!";
    AttackImpMess.innerHTML = "Нет силы! Нельзя атаковать соперников.";
}

function popupManipImp() {
    console.log("popupManipImp");
    showPopup(AttackImp, AttackImpCont, 338, 150);
    AttackImpHead.innerHTML = "Манипулятор отключён";
    AttackImpMess.innerHTML = "Нет силы. Нельзя перемещать зелёные клетки.";
    cameFromBlack = true;
}

// атака невозможна - противник одет в броню

function popupAttackArmor() {
    console.log("popupAttackArmor");
    showPopup(AttackImp, AttackImpCont, 338, 150);
    AttackImpHead.innerHTML = "Атака невозможна!";
    if (selectedRival.iron) {
        AttackImpMess.innerHTML = "Соперник одет в железную броню: <b>-" + ishieldPower + "$</b>";
    } else {
        AttackImpMess.innerHTML = "Соперник одет в броню: <b>-" + shieldPower + "$</b>";
    }
}

// поделиться силой

let share = document.querySelector(".popup__share");
let shareCont = document.querySelector(".popup__share .popup__content");

function popupSharePower() {
    console.log("popupSharePower");
    showPopup(share, shareCont, 350, 175);
    let friend;
    if (current == 3) {
        friend = players[0];
    } else {
        friend = players[3];
    }
    document.querySelector(".popup__share .share__text").innerHTML = "Поделиться с " + "<b>" + friend.label + "</b>" + " 1 ед. силы?";
}

document.querySelector(".popup__share .js-button-no").addEventListener("click", function () {
    console.log("Ответ Нет");
    hidePopup(share, shareCont);
    setTimeout(getCellType, 500 * gameSpeed);
});

document.querySelector(".popup__share .js-button-yes").addEventListener("click", function () {
    console.log("Ответ Да");
    hidePopup(share, shareCont);
    players[current].power--;
    let friend;
    if (current == 3) {
        friend = players[0];
    } else {
        friend = players[3];
    }
    friend.power++;
    setTimeout(function () {
        refreshPowercells();
        friend.name.querySelector(".player__thanks").style.display = "block";
        if (players[current].power == 0) {
            popupLowEnergy();
        } else {
            getCellType();
        }
    }, 500 * gameSpeed);

    setTimeout(function () {
        friend.name.querySelector(".player__thanks").style.display = "none";
    }, 7000);
});

// предупреждение о низкой энергии

function popupLowEnergy() {
    if (curMapParam.bone && !escape) {
        if (curMap !== Map15) {
            pressSkullOKNext = {
                script: function () {
                    pressAttackImp();
                }
            }
            popupSkullDanger();
        } else {
            pressAttackImp();
        }
        return;
    }
    console.log("popupLowEnergy");
    showPopup(AttackImp, AttackImpCont, 338, 165);
    AttackImpHead.innerHTML = "Предупреждение!";
    AttackImpMess.innerHTML = "Силы кончились. Красная или чёрная клетка приведут к поражению!";
}

// атака невозможна

function popupAttackImpCP() {
    console.log("popupAttackImpCP");
    showPopup(AttackImp, AttackImpCont, 338, 150);
    AttackImpHead.innerHTML = "Атака невозможна!";
    AttackImpMess.innerHTML = "Нельзя атаковать соперников на чекпойнте.";
}

function popupAttackImpMB() {
    console.log("popupAttackImpMB");
    showPopup(AttackImp, AttackImpCont, 338, 150);
    AttackImpHead.innerHTML = "Копилка занята";
    AttackImpMess.innerHTML = "Соперник уже занял копилку.";
}

function popupMBEmptyGo() {
    console.log("popupMBEmptyGo");
    showPopup(AttackImp, AttackImpCont, 338, 160);
    AttackImpHead.innerHTML = "Копилка пуста";
    AttackImpMess.innerHTML = "В копилке не осталось бонусов, можно идти дальше.";
    AttackImpOk.removeEventListener("click", pressAttackImp);
    AttackImpOk.addEventListener("click", pressMBEmptyGo, {once: true});
}

function pressMBEmptyGo() {
    console.log("pressMBEmptyGo");
    hidePopup(AttackImp, AttackImpCont);
    AttackImpOk.addEventListener("click", pressAttackImp);
    players[current].protection = false;
    mbOver = true;
    if (players[current].type === "human") {
        infoMoveHuman();
    } else {
        infoMoveComp();
    }
}

function popupMBEmpty() {
    console.log("popupMBEmpty");
    showPopup(AttackImp, AttackImpCont, 338, 150);
    AttackImpHead.innerHTML = "Копилка пуста";
    AttackImpMess.innerHTML = "В копилке не осталось бонусов.";
    AttackImpOk.removeEventListener("click", pressAttackImp);
    AttackImpOk.addEventListener("click", pressMBEmpty, {once: true});
}

function pressMBEmpty() {
    console.log("pressMBEmpty");
    hidePopup(AttackImp, AttackImpCont);
    AttackImpOk.addEventListener("click", pressAttackImp);
    players[current].protection = false;
    mbOver = true;
    moveIsOver();
}

// ПОРАЖЕНИЕ

let Lose = document.querySelector(".js-lose");
let LoseCont = document.querySelector(".js-lose .popup__content");
let LoseH2 = document.querySelector(".js-lose .popup__head h2");
let LoseImg = document.querySelector(".js-lose .popup__winlose-flex img");
let LoseText = document.querySelector(".js-lose .lose__text");
let LoseOk = document.querySelector(".js-lose .js-popup-ok");

function popupLose(loseType, player) {
    console.log("popupLose");
    LoseH2.innerHTML = "ПОРАЖЕНИЕ";
    LoseText.innerHTML = "Повезёт в другой раз...";
    LoseImg.setAttribute("src", "img/cry.gif");
    LoseImg.style.padding = "0";

    if (curMapParam.bone && loseType !== "map15hatch" && loseType !== "blast" && loseType !== "eaten") {
        players[3].power--;
        if (players[3].power >= 0) {
            gameSave("restart");
        } else {
            players[3].capital += players[3].bonusMoney;
            gameSave("over");
        }
        LoseOk.innerHTML = "OK";
        LoseH2.innerHTML = "КИРДЫК";
        LoseImg.setAttribute("src", "img/dead.png");
        LoseOk.removeEventListener("click", pressLose);
        LoseOk.addEventListener("click", pressLoseSkull);
    } else {
        LoseOk.innerHTML = "Узнать место";
        LoseOk.addEventListener("click", pressLose);
        LoseOk.removeEventListener("click", pressLoseSkull);
    }

    switch (loseType) {
        case "hatched":
            LoseText.innerHTML = "<b>" + player.label + "</b> выкинул Вас с трассы.";
            break;
        case "vampired":
            LoseText.innerHTML = "Вы не выдержали вампирского укуса от <b>" + player.label + "</b>";
            break;
        case "bite":
            LoseH2.innerHTML = "УКУШЕН";
            LoseText.innerHTML = "- 1 единица силы.";
            LoseImg.setAttribute("src", "img/tokens/skull.gif");
            LoseImg.style.padding = "17px 27px";
            LoseOk.innerHTML = "Заново";
            messageSkull();
            break;
        case "eaten":
            players[3].power--;
            players[3].capital += players[3].bonusMoney;
            gameSave("over");
            LoseH2.innerHTML = "СЪЕДЕН";
            LoseText.innerHTML = "Вы погибли в неравном бою.";
            LoseImg.setAttribute("src", "img/tokens/skull.gif");
            LoseImg.style.padding = "17px 27px";
            LoseOk.innerHTML = "OK";
            messageSkull();
            LoseOk.removeEventListener("click", pressLose);
            LoseOk.addEventListener("click", pressLoseSkull);
            break;
        case "map15hatch":
            if (players[3].power >= 0) {
                LoseH2.innerHTML = "ВЫБРОШЕН";
                LoseText.innerHTML = "<b>Супер-фишка</b> поймала Вас на штрих-клетке.";
                LoseOk.innerHTML = "Заново";
                gameSave("restart");
            } else {
                players[3].power--;
                players[3].capital += players[3].bonusMoney;
                gameSave("over");
                LoseH2.innerHTML = "КИРДЫК";
                LoseOk.innerHTML = "OK";
                LoseText.innerHTML = "<b>Супер-фишка</b> поймала Вас на штрих-клетке.";
                LoseImg.setAttribute("src", "img/dead.png");
            }
            LoseOk.removeEventListener("click", pressLose);
            LoseOk.addEventListener("click", pressLoseSkull);
            break;
        case "blast":
            players[3].capital += players[3].bonusMoney;
            gameSave("over");
            LoseH2.innerHTML = "БУМ!!!";
            LoseOk.innerHTML = "OK";
            LoseText.innerHTML = "Вы погибли от взрыва бомбы.";
            LoseImg.setAttribute("src", "img/dead.png");
            LoseOk.removeEventListener("click", pressLose);
            LoseOk.addEventListener("click", pressLoseSkull);
            break;
    }
    showPopup(Lose, LoseCont, 340, 217);
}

function pressLoseSkull() {
    console.log("pressLoseSkull");
    hidePopup(Lose, LoseCont);

    if (escape && players[3].power >= 0) {
        endGame();
        return;
    }

    if (players[3].power >= 0) {
        refreshPowercells();
    } else {
        endGame();
        return;
    }

    if (curMap === Map15) {
        restartMap();
        return;
    }

    pressSkullOKNext = {
        script: function () {
            restartMap();
        }
    }

    if (firstBite && players[3].power > 5) {
        popupSkullBite();
        return;
    }
    if (secondBite && players[3].power < 6 && players[3].power > 0) {
        popupSkullSecond();
        return;
    }
    if (players[3].power == 0) {
        popupSkullDanger();
        return;
    }
    restartMap();
}

function pressLose() {
    console.log("pressLose");
    hidePopup(Lose, LoseCont);
    setTimeout(function () {
        moveToPedestal(pedestalPlayer);
    }, 1000 * gameSpeed);
}

// ФИНИШИРОВАЛ

let Finished = document.querySelector(".js-win");
let FinishedCont = document.querySelector(".js-win .popup__content");
let FinishedOk = document.querySelector(".js-win .js-popup-ok");
let FinishedWrite = document.querySelector(".js-winlose-write");
let FinishedH2 = document.querySelector(".js-win h2");
let FinishedImg = document.querySelector(".js-win .popup__winlose-flex img");

function popupFinished() {
    FinishedOk.removeEventListener("click", pressFirst);
    FinishedOk.addEventListener("click", pressFinished);
    console.log("popupFinished");
    if (escape) {
        FinishedH2.innerHTML = "ВЫХОД";
    } else {
        FinishedH2.innerHTML = "ПОБЕДА";
    }
    FinishedWrite.style.display = "block";
    FinishedImg.setAttribute("src", "img/finished.gif");
    if (curMapParam.bone) {
        FinishedOk.innerHTML = "OK";
    } else {
        FinishedOk.innerHTML = "Узнать место";
    }
    showPopup(Finished, FinishedCont, 338, 217);
}

// Пришел первым

function popupFirst() {
    FinishedOk.removeEventListener("click", pressFinished);
    FinishedOk.addEventListener("click", pressFirst);
    console.log("popupFirst");
    FinishedH2.innerHTML = "ПЕРВОЕ МЕСТО!";
    FinishedWrite.style.display = "none";
    FinishedImg.setAttribute("src", "img/trophy.png");
    FinishedOk.innerHTML = "ОГОНЬ!";
    showPopup(Finished, FinishedCont, 338, 217);
}

// Посмотреть как доиграют?

let Endrace = document.querySelector(".js-endrace");
let EndraceCont = document.querySelector(".js-endrace .popup__content");
let EndraceWatch = document.querySelector(".js-button-watch");
let EndraceNext = document.querySelector(".js-button-next");
EndraceWatch.addEventListener("click", pressWatch);
EndraceNext.addEventListener("click", pressNext);

function popupEndrace() {
    console.log("popupEndrace");
    showPopup(Endrace, EndraceCont, 338, 144);
}

// помощь

let helpButton = document.querySelector(".settings__help");
let help = document.querySelector(".js-help");
let helpCont = document.querySelector(".js-help .popup__content");
let helpOk = document.querySelector(".js-help .js-popup-ok");
helpButton.addEventListener("click", popupHelp);
helpOk.addEventListener("click", popupHelpClose);

function popupHelp() {
    console.log("Помощь открыта");
    gamePause();
    if (conditionsCount < 7) {
        showPopup(help, helpCont, 385, 505, true);
    } else if (conditionsCount == 7 || conditionsCount == 8) {
        showPopup(help, helpCont, 750, 385, true);
    } else if (conditionsCount == 9 || conditionsCount == 10) {
        showPopup(help, helpCont, 750, 445, true);
    } else if (conditionsCount == 11 || conditionsCount == 12) {
        showPopup(help, helpCont, 750, 515, true);
    } else if (conditionsCount == 13 || conditionsCount == 14) {
        showPopup(help, helpCont, 750, 570, true);
    } else if (conditionsCount == 15 || conditionsCount == 16) {
        showPopup(help, helpCont, 750, 627, true);
    } else {
        showPopup(help, helpCont, 750, 724, true);
    }
}

function popupHelpClose() {
    console.log("Помощь закрыта");
    gameResume();
    hidePopup(help, helpCont, true);
}

// настройки

document.querySelector(".start-menu__set").addEventListener("click", function () {
    popupSettings(true);
});
let setButton = document.querySelector(".settings__options");
let settings = document.querySelector(".js-settings");
let settingsCont = document.querySelector(".js-settings .popup__content");
let settingsOk = document.querySelector(".js-settings .js-popup-ok");
setButton.addEventListener("click", function () {
    popupSettings();
});
settingsOk.addEventListener("click", popupSettingsClose);
document.querySelector(".js-settings .js-popup-report").addEventListener("click", function () {
    window.open('https://vk.com/topic-83053553_46718914', '_blank');
});

function popupSettings(menu) {
    console.log("Настройки открыты");
    gamePause();
    if (menu) {
        document.querySelector(".popup__settings .settings__timer-h2").style.display = "none";
        document.querySelector(".popup__settings .settings__timer").style.display = "none";
        showPopup(settings, settingsCont, 447, 408, true);
    } else {
        document.querySelector(".popup__settings .settings__timer-h2").style.display = "block";
        document.querySelector(".popup__settings .settings__timer").style.display = "block";
        showPopup(settings, settingsCont, 447, 460, true);
    }

}

function popupSettingsClose() {
    console.log("Настройки закрыты");
    gameResume();
    hidePopup(settings, settingsCont, true);
}

// настройки окно - скорость

let setOpt1a = document.querySelector(".js-sett-opt1-a");
let setOpt1b = document.querySelector(".js-sett-opt1-b");
let setOpt1Par = document.querySelector(".js-sett-opt1-par");
setOpt1a.addEventListener("click", pressSpeedFast);
setOpt1b.addEventListener("click", pressSpeedFast);

function pressSpeedFast() {
    setOpt1Par.innerHTML = "Быстрая";
    gameSpeed = 1;
    console.log("Скорость игры = быстрая");
    setOpt1a.removeEventListener("click", pressSpeedFast);
    setOpt1b.removeEventListener("click", pressSpeedFast);
    setOpt1a.addEventListener("click", pressSpeedNormal);
    setOpt1b.addEventListener("click", pressSpeedNormal);
}

function pressSpeedNormal() {
    setOpt1Par.innerHTML = "Нормальная";
    gameSpeed = 1.4;
    console.log("Скорость игры = нормальная");
    setOpt1a.removeEventListener("click", pressSpeedNormal);
    setOpt1b.removeEventListener("click", pressSpeedNormal);
    setOpt1a.addEventListener("click", pressSpeedFast);
    setOpt1b.addEventListener("click", pressSpeedFast);
}

// настройки окно - обучение

let setOpt2a = document.querySelector(".js-sett-opt2-a");
let setOpt2b = document.querySelector(".js-sett-opt2-b");
let setOpt2Par = document.querySelector(".js-sett-opt2-par");
setOpt2a.addEventListener("click", pressTutorialSkip);
setOpt2b.addEventListener("click", pressTutorialSkip);

function pressTutorialSkip() {
    setOpt2Par.innerHTML = "Да";
    skipTutorial = true;
    console.log("Пропуск обучения = да");
    setOpt2a.removeEventListener("click", pressTutorialSkip);
    setOpt2b.removeEventListener("click", pressTutorialSkip);
    setOpt2a.addEventListener("click", pressTutorialOn);
    setOpt2b.addEventListener("click", pressTutorialOn);
}

function pressTutorialOn() {
    setOpt2Par.innerHTML = "Нет";
    skipTutorial = false;
    console.log("Пропуск обучения = нет");
    setOpt2a.removeEventListener("click", pressTutorialOn);
    setOpt2b.removeEventListener("click", pressTutorialOn);
    setOpt2a.addEventListener("click", pressTutorialSkip);
    setOpt2b.addEventListener("click", pressTutorialSkip);
}

// настройки окно - имена над фишками

let setOpt3a = document.querySelector(".js-sett-opt3-a");
let setOpt3b = document.querySelector(".js-sett-opt3-b");
let setOpt3Par = document.querySelector(".js-sett-opt3-par");
let labels = document.querySelectorAll(".player__label");
setOpt3a.addEventListener("click", pressLabelsOff);
setOpt3b.addEventListener("click", pressLabelsOff);

function pressLabelsOn() {
    setOpt3Par.innerHTML = "Вкл.";
    console.log("Имена над фишками = вкл");
    labels.forEach(function (item) {
        item.style.display = "block";
    });
    labelsOn = true;
    setOpt3a.removeEventListener("click", pressLabelsOn);
    setOpt3b.removeEventListener("click", pressLabelsOn);
    setOpt3a.addEventListener("click", pressLabelsOff);
    setOpt3b.addEventListener("click", pressLabelsOff);
}

function pressLabelsOff() {
    setOpt3Par.innerHTML = "Откл.";
    console.log("Имена над фишками = откл");
    labels.forEach(function (item) {
        item.style.display = "none";
    });
    labelsOn = false;
    setOpt3a.removeEventListener("click", pressLabelsOff);
    setOpt3b.removeEventListener("click", pressLabelsOff);
    setOpt3a.addEventListener("click", pressLabelsOn);
    setOpt3b.addEventListener("click", pressLabelsOn);
}

// Пауза

let pausePromise = {};

let pausePopup = document.querySelector(".pause");
document.querySelector(".pause button").addEventListener("click", pressPauseOff);
document.querySelector(".settings__pause").addEventListener("click", pressPauseOn);

function pressPauseOn() {
// игру на паузу
    gamePause();
    overlayHard.style.display = "block";
    pausePopup.style.display = "flex";
}

function pressPauseOff() {
//снять с паузы
    overlayHard.style.display = "none";
    pausePopup.style.display = "none";
    gameResume();
}

function gamePause() {
    gamePaused = true;
    console.log("ИГРА НА ПАУЗЕ");
}

function gameResume() {
    gamePaused = false;
    console.log("ИГРА ВОЗОБНОВЛЕНА");
    if (pausePromise.script) {
        pausePromise.script();
    }
}

// ШАБЛОН НА ПАУЗУ
/*
if (gamePaused) {
    pausePromise = {
        arg1: magnet, // если в функции есть аргументы
        arg2: sup,
        script: function () {
            throwCubic(false, pausePromise.arg1, pausePromise.arg2);
            pausePromise = {};
        }
    }
    return;
}
*/

// настройки - инфо
let final = document.querySelector(".js-final");
let finalCont = document.querySelector(".js-final .js-popup-content");
let finalOK = document.querySelector(".js-final .js-popup-ok");
let finalH2 = document.querySelector(".js-final .popup__head h2");

document.querySelector(".settings__info").addEventListener("click", function () {
    console.log("Нажат Info");
    showPopup(final, finalCont, 385, 278, true);
    finalOK.innerHTML = "OK";
    finalH2.innerHTML = "ПРЫГУНЫ (JUMPERS)";
    gamePause();
    finalOK.addEventListener("click", pressFinalIngame, {once: true});
})

function pressFinalIngame() {
    console.log("pressFinalIngame");
    hidePopup(final, finalCont, true);
    gameResume();
}

function pressFinalEndgame() {
    console.log("pressFinalEndgame");
    hidePopup(final, finalCont, true);
    location.href = location.href;
}

// настройки - закончить

document.querySelector(".settings__end").addEventListener("click", popupEnd);
let end = document.querySelector(".js-end");
let endCont = document.querySelector(".js-end .js-popup-content");
document.querySelector(".js-end .js-popup-no").addEventListener("click", function () {
    console.log("End NO");
    hidePopup(end, endCont, true);
    gameResume();
});
document.querySelector(".js-end .js-popup-yes").addEventListener("click", function () {
    location.href = location.href;
});

function popupEnd() {
    console.log("popupEnd");
    showPopup(end, endCont, 338, 200, true);
    gamePause();
}

// введите имя

let enterName = document.querySelector(".js-enter-name");
let enterNameCont = document.querySelector(".js-enter-name .popup__content");
let enterNameInput = document.querySelector(".player__name-input");
let enterNameErr = document.querySelector(".player__name-err");
document.querySelector(".start-menu__new").addEventListener("click", function () {
    if (slotParams.busy == 10) {
        console.log("вызвалось окно - слишком много слотов");
        showPopup(alarm, alarmCont, 338, 200, true);
        alarmHeading.innerHTML = "Слоты сохранения переполнены";
        alarmMessage.innerHTML = "Чтобы начать новую игру, в меню <b>ЗАГРУЗКА</b> удалите любой слот";
    } else {
        popupEnterName();
    }
});
document.querySelector(".js-enter-name .popup__button--cancel").addEventListener("click", pressEnterNameClose);
document.querySelector(".js-enter-name .js-popup-ok").addEventListener("click", pressEnterName);
enterNameInput.addEventListener("focus", function () {
    enterNameErr.style.visibility = "hidden";
    enterNameErr.style.opacity = "0.1";
});

function popupEnterName() {
    showPopup(enterName, enterNameCont, 310, 223, true);
    startMenu.style.display = "none";
    console.log("Вызвалось окно ввода имени");
}

function pressEnterName(x) {

    x.preventDefault();
    console.log("Нажал ввод имени");
    console.log("Введено имя: " + enterNameInput.value);

    if (enterNameInput.value.length > 15 || enterNameInput.value.length < 2) {
        enterNameErr.style.visibility = "visible";
        enterNameErr.style.opacity = "1";
    } else {
        userName = enterNameInput.value;
        document.querySelector(".js-welcome .span-name").innerHTML = userName;
        hidePopup(enterName, enterNameCont, true);
        popupWelcome();
    }
}

function pressEnterNameClose(x) {
    x.preventDefault();
    console.log("pressEnterNameClose");
    hidePopup(enterName, enterNameCont, true);
    startMenu.style.display = "flex";
}

// загрузка - окно

let loadGame = document.querySelector(".js-load");
let loadGameCont = document.querySelector(".js-load .js-popup-content");
document.querySelector(".start-menu__load").addEventListener("click", popupLoad);
document.querySelector(".js-load .js-popup-cancel").addEventListener("click", pressLoadCancel);
let loadGameRemove = document.querySelector(".js-load .js-popup-remove");
loadGameRemove.addEventListener("click", popupLoadConfirmRemove);
let loadGameOk = document.querySelector(".js-load .js-popup-ok");

function unselectLoadTr() {
    let tr = document.querySelectorAll(".load__cont tr");
    tr.forEach(function (item) {
        item.classList.remove("tr--select");
    });
}

function popupLoad() {
    console.log("popupLoad");
    if (slotParams.busy > 6) {
        showPopup(loadGame, loadGameCont, 450, 516, true);
        document.querySelector(".load__cont").style.height = "328px"
    } else {
        showPopup(loadGame, loadGameCont, 450, 404, true);
        document.querySelector(".load__cont").style.height = "213px"
    }
    gamePause();
}

function pressLoadCancel() {
    console.log("pressLoadCancel");
    hidePopup(loadGame, loadGameCont, true);
    deactivateLoad();
    unselectLoadTr();
    loadGameRemove.style.display = "none";
    gameResume();
}

function pressLoadOK() {
    console.log("pressLoadOK");
    hidePopup(loadGame, loadGameCont, true);
    deactivateLoad();
    unselectLoadTr();
    loadGameRemove.style.display = "none";
    currentSlot = slotSelected;
    gameLoad(slotSelected);
}

function pressLoadRemove() {
    console.log("pressLoadRemove");
    hidePopup(loadConf, loadConfCont, true);
    overlayHard.style.zIndex = "1500";
    document.querySelector(".tr--select").remove();
    deactivateLoad();
    let key = "jumpers-slot" + slotSelected;
    let slot = "slot" + slotSelected;
    localStorage.removeItem(key);
    slotParams[slot] = "free";
    slotParams.busy--;
    localStorage.setItem("jumpers-slotStatus", JSON.stringify(slotParams));
    if (slotParams.busy == 0) {
        document.querySelector(".load__empty").style.display = "block";
        loadGameRemove.style.display = "none";
    }
}

function activateLoad() {
    console.log("Кнопка загрузить активна");
    loadGameOk.addEventListener("click", pressLoadOK);
    loadGameOk.style.cursor = "pointer";
    loadGameOk.style.background = "#ffbb55";
    loadGameOk.style.fontWeight = "bold";
    loadGameOk.addEventListener("mouseover", addButtonMouseover);
    loadGameOk.addEventListener("mouseout", addButtonMouseout);
}

function deactivateLoad() {
    console.log("Кнопка загрузить не активна");
    loadGameOk.removeEventListener("click", pressLoadOK);
    loadGameOk.style.cursor = "default";
    loadGameOk.style.background = "#7d7d7d";
    loadGameOk.style.fontWeight = "normal";
    loadGameOk.removeEventListener("mouseover", addButtonMouseover);
    loadGameOk.removeEventListener("mouseout", addButtonMouseout);
}

let loadConf = document.querySelector(".js-load-confirm");
loadConf.style.zIndex = "1610";
let loadConfCont = document.querySelector(".js-load-confirm .js-popup-content");
document.querySelector(".js-load-confirm .js-popup-no").addEventListener("click", function () {
    console.log("pressLoadConfirmNo");
    hidePopup(loadConf, loadConfCont, true);
    overlayHard.style.zIndex = "1500";
});

function popupLoadConfirmRemove() {
    console.log("popupLoadConfirmRemove");
    showPopup(loadConf, loadConfCont, 338, 200, true);
    overlayHard.style.zIndex = "1600";
    document.querySelector(".load__confirm-content").innerHTML = "Вы действительно хотите удалить это сохранение?";
    let player = document.querySelector(".js-load .tr--select .load__label").innerHTML;
    document.querySelector(".load__confirm-slot b").innerHTML = "СЛОТ " + slotSelected + ", " + player;
    document.querySelector(".js-load-confirm .js-popup-yes").addEventListener("click", pressLoadRemove);
}

// рейтинг

let rating = document.querySelector(".js-rating");
let ratingCont = document.querySelector(".js-rating .js-popup-content");
let ratingOK = document.querySelector(".js-rating .js-popup-ok");
document.querySelector(".start-menu__rating").addEventListener("click", popupRating);
let ratingClearConf = document.querySelector(".js-rating-confirm");
ratingClearConf.style.zIndex = "1610";
let ratingClearConfCont = document.querySelector(".js-rating-confirm .js-popup-content");
let ratingClear = document.querySelector(".js-rating .js-popup-clear");
ratingClear.addEventListener("click", function () {
    showPopup(ratingClearConf, ratingClearConfCont, 338, 210, true);
    overlayHard.style.zIndex = "1600";
});
document.querySelector(".js-rating-confirm .js-popup-no").addEventListener("click", function () {
    hidePopup(ratingClearConf, ratingClearConfCont, true);
    overlayHard.style.zIndex = "1500";
});
document.querySelector(".js-rating-confirm .js-popup-yes").addEventListener("click", function () {
    ratingMass = [];
    localStorage.removeItem("jumpers-rating");
    drawRating();
    hidePopup(ratingClearConf, ratingClearConfCont, true);
    overlayHard.style.zIndex = "1500";
});

function popupRating(gameEnd) {
    showPopup(rating, ratingCont, 710, 606, true);
    if (gameEnd === "end") {
        setTimeout(function () {
            ratingOK.addEventListener("click", pressRatingOKEnd);
        }, 1500);
        ratingOK.removeEventListener("click", pressRatingOK);
        ratingRemoveBtn();
        destroyMap();
        let players = document.querySelectorAll(".player");
        players.forEach(function (item) {
            item.style.visibility = "hidden";
        });
        document.querySelector(".info__cont").style.display = "none";
        console.log("Открыт рейтинг из конца игры");
    } else {
        ratingOK.addEventListener("click", pressRatingOK);
        ratingOK.removeEventListener("click", pressRatingOKEnd);
        if (ratingMass.length == 0) {
            ratingRemoveBtn();
        } else {
            ratingAddBtn();
        }
        console.log("Открыт рейтинг из главного меню");
    }
    setTimeout(function () {
        drawRating(gameEnd);
    }, 400);
}

// отразить данные из массива ratingMass

function drawRating(gameEnd) {
    let items = rating.querySelectorAll(".rating__item");
    items.forEach(function (item) {
        if (!item.classList.contains("rating__empty")) item.remove();
    });
    if (ratingMass.length == 0) {
        rating.querySelector(".rating__empty").style.display = "flex";
        ratingRemoveBtn();
        return;
    }
    rating.querySelector(".rating__empty").style.display = "none";
    let table = rating.querySelector(".rating__table");

    // добавляем метку себя в массив
    if (gameEnd === "end") {
        ratingMass[ratingMass.length - 1].self = true;
    }

    // сортировка рейтинга по репутации
    if (ratingMass.length > 0) {
        ratingMass.sort(function(x1,x2) {
            if (x1.rep < x2.rep) return 1;
            if (x1.rep > x2.rep) return -1;
            // при равных reputation сортируем по money
            if (x1.money < x2.money) return 1;
            if (x1.money > x2.money) return -1;
            // при равных money сортируем по трассе
            if (x1.map < x2.map) return 1;
            if (x1.map > x2.map) return -1;
            return 0;
        });
    }

    for (let i = 0; i < ratingMass.length; i++) {
        let div = document.createElement("div");
        div.classList.add("rank__item", "rating__item");

        // выделяем себя
        if (gameEnd === "end" && ratingMass[i].self) {
            div.classList.add("rank-selected");
            ratingMass[i].self = false;
        }

        table.append(div);
        let tableDiv = rating.querySelector(".rating__item:last-child");

        let par = document.createElement("p");
        par.classList.add("rating__place");
        par.innerHTML = "" + (i + 1);
        tableDiv.append(par);

        par = document.createElement("p");
        par.classList.add("rating__name");
        par.innerHTML = ratingMass[i].name;
        tableDiv.append(par);

        par = document.createElement("p");
        par.classList.add("rating__money");
        par.innerHTML = ratingMass[i].money;
        tableDiv.append(par);

        par = document.createElement("p");
        par.classList.add("rating__map");
        par.innerHTML = ratingMass[i].map;
        tableDiv.append(par);

        div = document.createElement("div");
        div.classList.add("rating__rep-div");
        tableDiv.append(div);
        let divRep = tableDiv.querySelector(".rating__rep-div");

        if (ratingMass[i].rep == 0) {
            let no = document.createElement("p");
            no.innerHTML = "нет";
            no.style.margin = "0";
            divRep.append(no);
        }
        for (let k = 0; k < ratingMass[i].rep; k++) {
            let img = document.createElement("img");
            img.classList.add("rating__rep");
            img.setAttribute("src", "img/rep.png");
            divRep.append(img);
        }

        par = document.createElement("p");
        par.classList.add("rating__time");
        par.innerHTML = ratingMass[i].time;
        tableDiv.append(par);

        par = document.createElement("p");
        par.classList.add("rating__date");
        par.innerHTML = ratingMass[i].date;
        if (!ratingMass[i].date) {
            par.innerHTML = "2021 Jan 01 19:04";
        }
        tableDiv.append(par);
    }

    // перемотка на себя
    if (gameEnd === "end") {
        setTimeout(function () {
            document.querySelector(".popup__rating .rank-selected").scrollIntoView();
        }, 1000);
    }
}

function ratingAddBtn() {
    let ratingFlex = document.querySelector(".js-rating .popup__button-flex");
    ratingClear.style.display = "block";
    ratingFlex.classList.remove("popup__button-center");
}

function ratingRemoveBtn() {
    let ratingFlex = document.querySelector(".js-rating .popup__button-flex");
    ratingClear.style.display = "none";
    ratingFlex.classList.add("popup__button-center");
}

function pressRatingOK() {
    console.log("pressRatingOK");
    hidePopup(rating, ratingCont, true);
}

function pressRatingOKEnd() {
    console.log("pressRatingOKEnd");
    hidePopup(rating, ratingCont, true);
    showPopup(final, finalCont, 385, 278, true);
    finalH2.innerHTML = "Спасибо за игру!";
    finalOK.innerHTML = "Выход";
    finalOK.addEventListener("click", pressFinalEndgame, {once: true});
}

// WELCOME

let welcome = document.querySelector(".js-welcome");
let welcomeCont = document.querySelector(".js-welcome .popup__content");
let welcomeOk = document.querySelector(".js-welcome .js-popup-ok");
let welcomeFlex = document.querySelector(".js-welcome .welcome-flex");
welcomeOk.addEventListener("click", popupFeatures, {once: true});

function popupWelcome() {
    showPopup(welcome, welcomeCont, 370, 400, true);
    console.log("Вызвалось окно Welcome");
}

function popupFeatures() {
    welcomeFlex.style.marginLeft = "-320px";
    setTimeout(function () {
        welcomeOk.addEventListener("click", pressFeaturesClose);
    }, 500);
    console.log("Нажал popupFeatures");
}

function pressFeaturesClose() {
    hidePopup(welcome, welcomeCont, true);
    setNamesInnerPopup();
    showPopup(popupNames, popupNamesCont, 330, 290, true);
    console.log("popupNames");
}

function setNamesInnerPopup() {
    /*popupNamesOther.removeEventListener("click", setNamesInnerPopup);
    setTimeout(function () {
        popupNamesOther.addEventListener("click", setNamesInnerPopup);
    }, 200);*/

    setNames(userName);
    document.querySelector(".js-set-names .js-set-names-a b").innerHTML = name1;
    document.querySelector(".js-set-names .js-set-names-b b").innerHTML = name2;
    document.querySelector(".js-set-names .js-set-names-c b").innerHTML = name3;
}

// подтвердить имена соперников

let popupNames = document.querySelector(".js-set-names");
let popupNamesCont = document.querySelector(".js-set-names .js-popup-content");
let popupNamesOther = document.querySelector(".js-set-names .js-other");
popupNamesOther.addEventListener("click", setNamesInnerPopup);
document.querySelector(".js-set-names .js-ok").addEventListener("click", function () {
    console.log("setAi");
    createPlayers(name1, name2, name3, userName);
    hidePopup(popupNames, popupNamesCont, true);
    showPopup(setAi, setAiCont, 424, 383, true);
    tableName1.innerHTML = name1;
    tableName2.innerHTML = name2;
    tableName3.innerHTML = name3;
    tableName4.innerHTML = userName;
});

// настройка интеллекта соперников

let setAi = document.querySelector(".js-setAi");
let setAiCont = document.querySelector(".js-setAi .popup__content");
// кнопки сброс и готово
let setAiReady = document.querySelector(".js-setAi .js-popup-ok");
let setAiReset = document.querySelector(".js-setAi .js-popup-reset");
setAiReady.addEventListener("click", pressAiReady);
setAiReset.addEventListener("click", pressAiReset);
// кнопки изменения ai
document.querySelector(".js-setAi-opt1-a").addEventListener("click", pressAiBUTTON1a);
document.querySelector(".js-setAi-opt1-b").addEventListener("click", pressAiBUTTON1b);
document.querySelector(".js-setAi-opt2-a").addEventListener("click", pressAiBUTTON2a);
document.querySelector(".js-setAi-opt2-b").addEventListener("click", pressAiBUTTON2b);
document.querySelector(".js-setAi-opt3-a").addEventListener("click", pressAiBUTTON3a);
document.querySelector(".js-setAi-opt3-b").addEventListener("click", pressAiBUTTON3b);
document.querySelector(".js-setAi-opt4-a").addEventListener("click", pressAiBUTTON4a);
document.querySelector(".js-setAi-opt4-b").addEventListener("click", pressAiBUTTON4b);
// надписи на кнопках
let setAiOPT1 = document.querySelector(".js-setAi-opt1");
let setAiOPT1Now = 4;
let setAiOPT2 = document.querySelector(".js-setAi-opt2");
let setAiOPT2Now = 0;
let setAiOPT3 = document.querySelector(".js-setAi-opt3");
let setAiOPT3Now = 1;
let setAiOPT4 = document.querySelector(".js-setAi-opt4");
let setAiOPT4Now = 2;
let setAiPars = ["Сбалансированный", "Рисковый", "Осторожный", "Тупой", "Разные"];
let setAiParsEng = ["balanced", "risky", "careful", "stupid"];

// ЭТА КНОПКА НАЧИНАЕТ ИГРУ!!!

function pressAiReady() {
    hidePopup(setAi, setAiCont, true);
    playerA.aiType = setAiParsEng[setAiOPT2Now];
    playerB.aiType = setAiParsEng[setAiOPT3Now];
    playerC.aiType = setAiParsEng[setAiOPT4Now];
    console.log("Установлен AI: Игрок А: " + playerA.aiType + " Игрок В: " + playerB.aiType + " Игрок С: " + playerC.aiType);
    setUpField();
    setTimeout(function () {
        showPopup(char, charCont, 383, 446);
        charOK.addEventListener("click", pressEmperorWelcome, {once:true});
        char.style.left = "-163px";
    }, 1000);
}

function pressAiBUTTON1a() {
    setAiOPT1.innerHTML = "";
    setAiOPT1.style.color = "#232323";
    setAiOPT1Now--;
    if (setAiOPT1Now == -1) {
        setAiOPT1Now = 3;
    }
    setAiOPT1.innerHTML = "" + setAiPars[setAiOPT1Now];
    setAiChangeAll();
}

function pressAiBUTTON1b() {
    setAiOPT1.innerHTML = "";
    setAiOPT1.style.color = "#232323";
    setAiOPT1Now++;
    if (setAiOPT1Now >= 4) {
        setAiOPT1Now = 0;
    }
    setAiOPT1.innerHTML = "" + setAiPars[setAiOPT1Now];
    setAiChangeAll();
}

function pressAiBUTTON2a() {
    setAiOPT2.innerHTML = "";
    setAiResetFirst();
    setAiOPT2Now--;
    if (setAiOPT2Now == -1) {
        setAiOPT2Now = 3;
    }
    setAiOPT2.innerHTML = "" + setAiPars[setAiOPT2Now];
}

function pressAiBUTTON2b() {
    setAiOPT2.innerHTML = "";
    setAiResetFirst();
    setAiOPT2Now++;
    if (setAiOPT2Now == 4) {
        setAiOPT2Now = 0;
    }
    setAiOPT2.innerHTML = "" + setAiPars[setAiOPT2Now];
}

function pressAiBUTTON3a() {
    setAiOPT3.innerHTML = "";
    setAiResetFirst();
    setAiOPT3Now--;
    if (setAiOPT3Now == -1) {
        setAiOPT3Now = 3;
    }
    setAiOPT3.innerHTML = "" + setAiPars[setAiOPT3Now];
}

function pressAiBUTTON3b() {
    setAiOPT3.innerHTML = "";
    setAiResetFirst();
    setAiOPT3Now++;
    if (setAiOPT3Now == 4) {
        setAiOPT3Now = 0;
    }
    setAiOPT3.innerHTML = "" + setAiPars[setAiOPT3Now];
}

function pressAiBUTTON4a() {
    setAiOPT4.innerHTML = "";
    setAiResetFirst();
    setAiOPT4Now--;
    if (setAiOPT4Now == -1) {
        setAiOPT4Now = 3;
    }
    setAiOPT4.innerHTML = "" + setAiPars[setAiOPT4Now];
}

function pressAiBUTTON4b() {
    setAiOPT4.innerHTML = "";
    setAiResetFirst();
    setAiOPT4Now++;
    if (setAiOPT4Now == 4) {
        setAiOPT4Now = 0;
    }
    setAiOPT4.innerHTML = "" + setAiPars[setAiOPT4Now];
}

function setAiResetFirst() {
    setAiOPT1Now = 4;
    setAiOPT1.innerHTML = "Разные";
    setAiOPT1.style.color = "#9a9a9a";
}

function setAiChangeAll() {
    setAiOPT2.innerHTML = "" + setAiPars[setAiOPT1Now];
    setAiOPT2Now = setAiOPT1Now;
    setAiOPT3.innerHTML = "" + setAiPars[setAiOPT1Now];
    setAiOPT3Now = setAiOPT1Now;
    setAiOPT4.innerHTML = "" + setAiPars[setAiOPT1Now];
    setAiOPT4Now = setAiOPT1Now;
}

function pressAiReset() {
    setAiResetFirst();
    setAiOPT2Now = 0;
    setAiOPT2.innerHTML = "Сбалансированный";
    setAiOPT3Now = 1;
    setAiOPT3.innerHTML = "Рисковый";
    setAiOPT4Now = 2;
    setAiOPT4.innerHTML = "Осторожный";
}

// RANKINGS

let Ranktable = document.querySelector(".js-rankings");
let RanktableCont = document.querySelector(".js-rankings .js-popup-content");
let Ranktable1Bonus = document.querySelector(".js-rank1-bonus");
let Ranktable2Bonus = document.querySelector(".js-rank2-bonus");
let Ranktable3Bonus = document.querySelector(".js-rank3-bonus");
let Ranktable4Bonus = document.querySelector(".js-rank4-bonus");
let RanktableOk = document.querySelector(".js-rankings .js-popup-ok");
RanktableOk.addEventListener("click", pressRankOK);

function popupRank() {

    let Ranktable1Token = document.querySelector(".js-rank1-token");
    let Ranktable1Name = document.querySelector(".js-rank1-name");
    let Ranktable1Money = document.querySelector(".js-rank1-money");
    let Ranktable1Capital = document.querySelector(".js-rank1-capital");
    let Ranktable2Token = document.querySelector(".js-rank2-token");
    let Ranktable2Name = document.querySelector(".js-rank2-name");
    let Ranktable2Money = document.querySelector(".js-rank2-money");
    let Ranktable2Capital = document.querySelector(".js-rank2-capital");
    let Ranktable3Token = document.querySelector(".js-rank3-token");
    let Ranktable3Name = document.querySelector(".js-rank3-name");
    let Ranktable3Money = document.querySelector(".js-rank3-money");
    let Ranktable3Capital = document.querySelector(".js-rank3-capital");
    let Ranktable4Token = document.querySelector(".js-rank4-token");
    let Ranktable4Name = document.querySelector(".js-rank4-name");
    let Ranktable4Money = document.querySelector(".js-rank4-money");
    let Ranktable4Capital = document.querySelector(".js-rank4-capital");

    console.log("Результаты заезда: ");
    Ranktable1Bonus.style.display = "none";
    Ranktable2Bonus.style.display = "none";
    Ranktable3Bonus.style.display = "none";
    Ranktable4Bonus.style.display = "none";
    let height = 470;

    // очистка инвентаря
    let invArray = document.querySelectorAll(".overlay__invblock, .overlay__shield");
    invArray.forEach(function (item) {
        item.style.display = "none";
    });
    cleanInventory();

    // расписываем 1 место
    for (let i = 0; i < players.length; i++) {
        if (players[i].place == 1) {
            console.log(players[i].label + " занял 1 место");
            Ranktable1Token.setAttribute("src", getTokenImg(players[i].name) );
            Ranktable1Name.innerHTML = "" + players[i].label;

            if (escape && (!escapedWhite || !escapedChamp) ) {
                // условия недопобеды на трассе 15
                Ranktable1Money.innerHTML = "1000 $";
                players[i].capital += 1000;
            } else {
                // стандартные условия
                Ranktable1Money.innerHTML = curMapParam.prize1 + " $";
                players[i].capital += (curMapParam.prize1 + players[i].bonusMoney);
            }

            if (players[i].bonusMoney != 0) {
                Ranktable1Bonus.style.display = "block";
                if (players[i].bonusMoney > 0) {
                    Ranktable1Bonus.style.color = "#29db00";
                    Ranktable1Bonus.innerHTML = "+" + players[i].bonusMoney;
                } else {
                    Ranktable1Bonus.style.color = "#ff0000";
                    Ranktable1Bonus.innerHTML = players[i].bonusMoney;
                }
            }

            Ranktable1Capital.innerHTML = players[i].capital + " $";
            break;
        }
    }

    if (!curMapParam.bone) {
        Ranktable2Token.closest(".rank__item").style.display = "flex";
        Ranktable3Token.closest(".rank__item").style.display = "flex";
        Ranktable4Token.closest(".rank__item").style.display = "flex";

        // расписываем 2 место
        for (let i = 0; i < players.length; i++) {
            if (players[i].place == 2) {
                console.log(players[i].label + " занял 2 место");
                Ranktable2Token.setAttribute("src", getTokenImg(players[i].name) );
                Ranktable2Name.innerHTML = "" + players[i].label;
                Ranktable2Money.innerHTML = curMapParam.prize2 + " $";
                if (players[i].bonusMoney != 0) {
                    Ranktable2Bonus.style.display = "block";
                    if (players[i].bonusMoney > 0) {
                        Ranktable2Bonus.style.color = "#29db00";
                        Ranktable2Bonus.innerHTML = "+" + players[i].bonusMoney;
                    } else {
                        Ranktable2Bonus.style.color = "#ff0000";
                        Ranktable2Bonus.innerHTML = players[i].bonusMoney;
                    }
                }
                players[i].capital += (curMapParam.prize2 + players[i].bonusMoney);
                Ranktable2Capital.innerHTML = players[i].capital + " $";
                break;
            }
        }

        // расписываем 3 место
        for (let i = 0; i < players.length; i++) {
            if (players[i].place == 3) {
                console.log(players[i].label + " занял 3 место");
                Ranktable3Token.setAttribute("src", getTokenImg(players[i].name) );
                Ranktable3Name.innerHTML = "" + players[i].label;
                Ranktable3Money.innerHTML = curMapParam.prize3 + " $";
                if (players[i].bonusMoney != 0) {
                    Ranktable3Bonus.style.display = "block";
                    if (players[i].bonusMoney > 0) {
                        Ranktable3Bonus.style.color = "#29db00";
                        Ranktable3Bonus.innerHTML = "+" + players[i].bonusMoney;
                    } else {
                        Ranktable3Bonus.style.color = "#ff0000";
                        Ranktable3Bonus.innerHTML = players[i].bonusMoney;
                    }
                }
                players[i].capital += (curMapParam.prize3 + players[i].bonusMoney);
                Ranktable3Capital.innerHTML = players[i].capital + " $";
                break;
            }
        }

        // расписываем 4 место
        for (let i = 0; i < players.length; i++) {
            if (players[i].place == 4) {
                console.log(players[i].label + " занял 4 место");
                Ranktable4Token.setAttribute("src", getTokenImg(players[i].name) );
                Ranktable4Name.innerHTML = "" + players[i].label;
                Ranktable4Money.innerHTML = curMapParam.prize4 + " $";
                if (players[i].bonusMoney != 0) {
                    Ranktable4Bonus.style.display = "block";
                    if (players[i].bonusMoney > 0) {
                        Ranktable4Bonus.style.color = "#29db00";
                        Ranktable4Bonus.innerHTML = "+" + players[i].bonusMoney;
                    } else {
                        Ranktable4Bonus.style.color = "#ff0000";
                        Ranktable4Bonus.innerHTML = players[i].bonusMoney;
                    }
                }
                players[i].capital += (curMapParam.prize4 + players[i].bonusMoney);
                Ranktable4Capital.innerHTML = players[i].capital + " $";
                break;
            }
        }
    } else {
        height = 300;
        Ranktable2Token.closest(".rank__item").style.display = "none";
        Ranktable3Token.closest(".rank__item").style.display = "none";
        Ranktable4Token.closest(".rank__item").style.display = "none";
    }
    showPopup(Ranktable, RanktableCont, 440, height);

    // выделяем себя
    let places = document.querySelectorAll(".js-rankings .rank__item");
    let tokens = [
        "img/tokens/token-d-white.png",
        "img/tokens/token-d-yellow.png",
        "img/tokens/token-d-red.png",
        "img/tokens/token-d-green.png",
        "img/tokens/token-d-blue.png",
        "img/tokens/token-d-brown.png",
        "img/tokens/token-d-black.png",
    ]
    for (let i = 0; i < places.length; i++) {
        places[i].classList.remove("rank-selected");
        let curImg = places[i].querySelector("img").getAttribute("src");
        if (tokens.includes(curImg)) {
            places[i].classList.add("rank-selected");
        }
    }

    // сохранение игры
    // 1. если в конце 11 трассы юзер проиграл, сохранить как "финал11"
    // 2. если в конце 11 трассы юзер выиграл, сохранить в новый слот как "финиш"
    // 3. если полная победа в прыгунах, то сохранить как "финал15"
    // 4. если "недопобеда" на трассе15, то сохранить как over
    // 4. остальные случаи - сохранить как "финиш"

    if (curMap === Map11) {
        let human = findHuman();
        let winner = getWinner();
        if (winner === human) {
            gameSave("finish");
        } else {
            gameSave("final11");
        }
        return;
    }

    if (escapedWhite && escapedChamp) {
        gameSave("final15");
        return;
    }

    if (!escapedWhite && escapedChamp) {
        gameSave("over");
        return;
    }

    gameSave("finish");
}

function getTokenImg(player) {
    let img = window.getComputedStyle(player).backgroundImage;
    let start = img.indexOf("img");
    let end = img.indexOf("png");
    return img.substring(start, end + 3);
}

// МАГАЗИН

let shopOverlay = document.querySelector(".overlay__shop");
let shop = document.querySelector(".js-shop");
let shopCont = document.querySelector(".js-shop .js-popup-content");
//инвентарь
let shopToken = document.querySelector(".shop__token-img");
let shopTokenName = document.querySelector(".shop__token-name--own");
let shopTokenClass = document.querySelector(".shop__token-class--own");
let shopCapital = document.querySelector(".shop__capital");

document.querySelector(".shop__models-model--yellow").addEventListener("click", pressShopYellow);
document.querySelector(".shop__models-model--red").addEventListener("click", pressShopRed);
document.querySelector(".shop__models-model--green").addEventListener("click", pressShopGreen);
document.querySelector(".shop__models-model--blue").addEventListener("click", pressShopBlue);
document.querySelector(".shop__models-model--brown").addEventListener("click", pressShopBrown);
document.querySelector(".shop__models-model--black").addEventListener("click", pressShopBlack);
let shopModels = document.querySelector(".shop__models-wrap");
shopModels.addEventListener("click", function (event) {
    let model = event.target.closest(".shop__models-model");
    if ( !model ) {
        console.log("Возврат на !model");
        return;
    }
    if (!shopModels.contains(model)) {
        console.log("Возврат на !shopModels");
        return;
    }
    activateButtonBuy();

// выделить модель
    unselectModel();
    model.classList.add("model--select");
    unselectItemShop();
});

// снять выделение с модели

function unselectModel() {
    let array = document.querySelectorAll(".shop__models-model");
    for (let i = 0; i < array.length; i++) {
        array[i].classList.remove("model--select");
    }
}

// выделить предмет в инвентаре магазина

function selectItemInv() {
    unselectItemInv();
    this.classList.add("item--select");
}

function unselectItemInv() {
    let array = document.querySelectorAll(".js-inv-shop .inventory-item");
    for (let i = 0; i < array.length; i++) {
        array[i].classList.remove("item--select");
    }
}

// выделить предмет в товарах магазина

function selectItemShop() {
    unselectItemShop();
    unselectModel();
    this.classList.add("item--select");
}

function unselectItemShop() {
    let array = document.querySelectorAll(".shop__items-item");
    for (let i = 0; i < array.length; i++) {
        array[i].classList.remove("item--select");
    }
}

let shopDesName = document.querySelector(".shop__des-name b");
let shopDesContent = document.querySelector(".shop__des-content");
let shopButtonBuy = document.querySelector(".shop__button--buy");
let shopButtonSell = document.querySelector(".shop__button--sell");
document.querySelector(".shop__button-over").addEventListener("click", pressShopOver);
document.querySelector(".js-shop-buy .js-popup-no").addEventListener("click", pressBuyNo);
let selectedGoods;
let selectedCost;
let selectedSellCost;

function popupShop() {
    console.log("Открыт магазин");

    setTimeout(function () {
        deactivateButtonBuy();
        unselectItemShop();
        unselectModel();
        shopDesName.innerHTML = "";
        shopDesContent.innerHTML = "";
        shopOverlay.style.display = "block";
        document.querySelector(".shop__models-model--yellow .shop__div-cost p").innerHTML = "$ " + costYellow;
        document.querySelector(".shop__models-model--red .shop__div-cost p").innerHTML = "$ " + costRed;
        document.querySelector(".shop__models-model--green .shop__div-cost p").innerHTML = "$ " + costGreen;
        document.querySelector(".shop__models-model--blue .shop__div-cost p").innerHTML = "$ " + costBlue;
        document.querySelector(".shop__models-model--brown .shop__div-cost p").innerHTML = "$ " + costBrown;
        document.querySelector(".shop__models-model--black .shop__div-cost p").innerHTML = "$ " + costBlack;
        document.querySelector(".shop__items-item--magnet p").innerHTML = "$ " + costMagnet;
        document.querySelector(".shop__items-item--smagnet p").innerHTML = "$ " + costSMagnet;
        document.querySelector(".shop__items-item--shield p").innerHTML = "$ " + costShield;
        document.querySelector(".shop__items-item--ishield p").innerHTML = "$ " + costIShield;
        document.querySelector(".shop__items-item--trap p").innerHTML = "$ " + costTrap;
        document.querySelector(".shop__items-item--vampire p").innerHTML = "$ " + costVampire;
        document.querySelector(".shop__items-item--imp p").innerHTML = "$ " + costImp;
        showPopup(shop, shopCont, 750, 740);
        loadShopParameters();
    }, 200)
}

// делает кнопку "Купить" активной

function activateButtonBuy() {
    console.log("Кнопка купить активна");
    shopButtonBuy.addEventListener("click", pressBuy);
    shopButtonBuy.style.cursor = "pointer";
    shopButtonBuy.style.background = "#ffbb55";
    shopButtonBuy.style.fontWeight = "bold";
    shopButtonBuy.addEventListener("mouseover", addButtonMouseover);
    shopButtonBuy.addEventListener("mouseout", addButtonMouseout);
}

function deactivateButtonBuy() {
    console.log("Кнопка купить не активна");
    shopButtonBuy.removeEventListener("click", pressBuy);
    shopButtonBuy.style.cursor = "default";
    shopButtonBuy.style.background = "#7d7d7d";
    shopButtonBuy.style.fontWeight = "normal";
    shopButtonBuy.removeEventListener("mouseover", addButtonMouseover);
    shopButtonBuy.removeEventListener("mouseout", addButtonMouseout);
}

// делает кнопку "Продать" активной

function activateButtonSell() {
    console.log("Кнопка продать активна");
    shopButtonSell.addEventListener("click", pressSell);
    shopButtonSell.style.cursor = "pointer";
    shopButtonSell.style.background = "#ffbb55";
    shopButtonSell.style.fontWeight = "bold";
    shopButtonSell.addEventListener("mouseover", addButtonMouseover);
    shopButtonSell.addEventListener("mouseout", addButtonMouseout);
}

function deactivateButtonSell() {
    console.log("Кнопка продать не активна");
    shopButtonSell.removeEventListener("click", pressSell);
    shopButtonSell.style.cursor = "default";
    shopButtonSell.style.background = "#7d7d7d";
    shopButtonSell.style.fontWeight = "normal";
    shopButtonSell.removeEventListener("mouseover", addButtonMouseover);
    shopButtonSell.removeEventListener("mouseout", addButtonMouseout);
}

// купить предмет

function pressBuy() {
    console.log("Нажато Купить: " + selectedGoods);
    let player = findHuman();
    if (selectedGoods === "magnet" || selectedGoods === "smagnet") {
        if (player.magnets + player.smagnets == 3) {
            popupMaximum(3, " магнитов");
            return;
        }
    }
    if (selectedGoods === "shield" || selectedGoods === "ishield") {
        if (player.shields + player.ishields == 3) {
            popupMaximum(3, " щитов");
            return;
        }
    }
    if (selectedGoods === "trap") {
        if (player.trap) {
            popupMaximum(1, " капкана");
            return;
        }
    }
    if (selectedGoods === "vampire") {
        if (player.vampire) {
            popupMaximum(1, " вамирских клыков");
            return;
        }
    }
    if (selectedGoods === "imp" && player.imp == 3) {
        popupMaximumCubic();
        return;
    }
    if (player.capital < selectedCost) {
        popupLowMoney();
        return;
    }
    if (selectedGoods === "manipulator") {
        popupManipulator();
        return;
    }
    popupBuyConfirm();
}

function popupLowMoney() {
    showPopup(alarm, alarmCont, 360, 200, true);
    let player = findHuman();
    alarmHeading.innerHTML = "Отказано";
    alarmMessage.innerHTML = "Недостаточно денег для покупки этого предмета." + "<br><br>" + "Требуется: " + "<b>" + "$ " + selectedCost + "</b>" + "<br>У Вас: " + "<span>" + "$ " + player.capital + "</span>";
    alarmMessage.querySelector("span").classList.add("span__red");
}

function popupMaximum(max, item) {
    showPopup(alarm, alarmCont, 338, 160, true);
    alarmHeading.innerHTML = "Отказано";
    alarmMessage.innerHTML = "Нельзя нести с собой больше " + max + item;
}

function popupMaximumCubic() {
    showPopup(alarm, alarmCont, 338, 160, true);
    alarmHeading.innerHTML = "Отказано";
    alarmMessage.innerHTML = "Ваш невозможный кубик полностью<br>заряжен (на 3 хода).";
}

function popupManipulator() {
    showPopup(alarm, alarmCont, 338, 150, true);
    alarmHeading.innerHTML = "Отказано";
    alarmMessage.innerHTML = "У Вас уже есть манипулятор.";
}

function popupBuyConfirm() {
    console.log("Подтверждение покупки: " + selectedGoods);
    let buyConfirm = document.querySelector(".js-shop-buy");
    let buyConfirmCont = document.querySelector(".js-shop-buy .js-popup-content");
    let buyConfirmImg = document.querySelector(".shop__confirm-content img");
    let buyConfirmP = document.querySelector(".shop__confirm-content p");
    let yes = document.querySelector(".js-shop-buy .js-popup-yes");
    yes.addEventListener("click", pressBuyYes);
    yes.removeEventListener("click", pressSellYes);

    let itemText;
    let player = findHuman();
    switch (selectedGoods) {
        case "yellow":
            itemText = "фишку &#34;Цыпа&#34;";
            buyConfirmImg.setAttribute("src", "img/tokens/token-yellow.png");
            break;
        case "red":
            itemText = "фишку &#34;Вестник&#34;";
            buyConfirmImg.setAttribute("src", "img/tokens/token-red.png");
            break;
        case "green":
            itemText = "фишку &#34;Ударник&#34;";
            buyConfirmImg.setAttribute("src", "img/tokens/token-green.png");
            break;
        case "blue":
            itemText = "фишку &#34;Сенат&#34;";
            buyConfirmImg.setAttribute("src", "img/tokens/token-blue.png");
            break;
        case "brown":
            itemText = "фишку &#34;Робеспьер&#34;";
            buyConfirmImg.setAttribute("src", "img/tokens/token-brown.png");
            break;
        case "black":
            itemText = "фишку &#34;Мальдини&#34;";
            buyConfirmImg.setAttribute("src", "img/tokens/token-black.png");
            break;
        case "magnet":
            itemText = "магнит";
            buyConfirmImg.setAttribute("src", "img/inv-magnet.png");
            break;
        case "smagnet":
            itemText = "супер-магнит";
            buyConfirmImg.setAttribute("src", "img/inv-smagnet.png");
            break;
        case "shield":
            itemText = "щит";
            buyConfirmImg.setAttribute("src", "img/inv-shield.png");
            break;
        case "ishield":
            itemText = "железный щит";
            buyConfirmImg.setAttribute("src", "img/inv-ishield.png");
            break;
        case "trap":
            itemText = "капкан";
            buyConfirmImg.setAttribute("src", "img/inv-trap.png");
            break;
        case "vampire":
            itemText = "вампирские клыки";
            buyConfirmImg.setAttribute("src", "img/inv-vampire.png");
            break;
        case "imp":
            itemText = "невозможный кубик";
            buyConfirmImg.setAttribute("src", "img/inv-imp.png");
            break;
    }

    let width = 360;
    let height = 200;

    if (selectedGoods === "imp" && player.imp > 0) {
        buyConfirmP.innerHTML = "Ваш невозможный кубик заряжен не полностью. Осталось ходов: <b>" + player.imp + "</b><br><br>Зарядить его до 3-х ходов<br>за " + "<b>" + "$ " + selectedCost + "</b>" + "?" +
            "<br><br>" + "Остаток: $ " + (player.capital - selectedCost);
        width = 380;
        height = 240;
        document.querySelector(".shop__confirm-content").style.width = "313px";
        document.querySelector(".shop__confirm-content").style.margin = "45px auto";
    } else {
        buyConfirmP.innerHTML = "Купить " + "<b>" + itemText + "</b><br>" + "за " + "<b>" + "$ " + selectedCost + "</b>" + "?" +
            "<br><br>" + "Остаток: $ " + (player.capital - selectedCost);
        document.querySelector(".shop__confirm-content").style.width = "245px";
        document.querySelector(".shop__confirm-content").style.margin = "0 auto";
    }

    showPopup(buyConfirm, buyConfirmCont, width, height, true);
}

function pressBuyYes() {
    console.log("КУПЛЕНО: " + selectedGoods);
    let player = findHuman();
    let array = document.querySelectorAll(".shop__models-model");
    for (let i = 0; i < array.length; i++) {
        array[i].classList.remove("model--select");
    }
    player.capital -= selectedCost;
    let tokens = [
        "yellow",
        "red",
        "green",
        "blue",
        "brown",
        "black",
    ];
    if (tokens.includes(selectedGoods)) {
        player.model = selectedGoods;
        lastBuy = selectedGoods;
    } else {
        switch(selectedGoods) {
            case "magnet":
                player.magnets++;
                break;
            case "smagnet":
                player.smagnets++;
                break;
            case "shield":
                player.shields++;
                break;
            case "ishield":
                player.ishields++;
                break;
            case "trap":
                player.trap = true;
                break;
            case "vampire":
                player.vampire = true;
                break;
            case "imp":
                player.imp = 3;
                break;
        }
    }
    unselectItemInv();
    unselectItemShop();
    shopDesName.innerHTML = "";
    shopDesContent.innerHTML = "";
    loadShopParameters(true);
    deactivateButtonBuy();
    hidePopup(buyConfirm, buyConfirmCont, true, true);
}

function pressBuyNo() {
    console.log("Отказ от действия");
    hidePopup(buyConfirm, buyConfirmCont, true);
}

function pressShopYellow() {
    shopDesName.innerHTML = "Фишка &#34;Цыпа&#34;"
    shopDesContent.innerHTML = "Жёлтая фишка класса «стандарт»." + "<br><br>" + "Несмотря на название, эта фишка больно щипает соперников. Причём щипает аж 3 раза! Отличный выбор для начальных трасс."
        + "<br><br>" + "<b>" + "Сила: " + "</b>" + "3" + "<br>" + "<b>" + "Мощные атаки: " + "</b>" + "нет" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costYellow;
    selectedGoods = "yellow";
    selectedCost = costYellow;
}

function pressShopRed() {
    shopDesName.innerHTML = "Фишка &#34;Вестник&#34;"
    shopDesContent.innerHTML = "Красная фишка класса «стандарт»." + "<br><br>" + "Данная модель создана для того, кто ценит результативность за приемлемые деньги. Фишка призвана доносить до соперников плохие вести… и доносит она их доходчиво!"
        + "<br><br>" + "<b>" + "Сила: " + "</b>" + "4" + "<br>" + "<b>" + "Мощные атаки: " + "</b>" + "нет" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costRed;
    selectedGoods = "red";
    selectedCost = costRed;
}

function pressShopGreen() {
    shopDesName.innerHTML = "Фишка &#34;Ударник&#34;"
    shopDesContent.innerHTML = "Зелёная фишка класса «профи»." + "<br><br>" + "Это профессиональная фишка сделана профессионалами для профессионала! В ней 2 особенности: во-первых, у неё сил на 4 атаки, во-вторых… она заставила копирайтера написать слово «профессиональный» аж 3 раза в одном предложении."
        + "<br><br>" + "<b>" + "Сила: " + "</b>" + "5" + "<br>" + "<b>" + "Мощные атаки: " + "</b>" + "нет" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costGreen;
    selectedGoods = "green";
    selectedCost = costGreen;
}

function pressShopBlue() {
    shopDesName.innerHTML = "Фишка &#34;Сенат&#34;"
    shopDesContent.innerHTML = "Синяя фишка класса «профи»." + "<br><br>" + "Это первая модель в линейке, способная проводить мощные атаки. Цена может показаться высоковатой, но это до тех пор, пока не попробуешь выкинуть соперника с трассы. С этим ощущением ничто не сравнится!"
        + "<br><br>" + "<b>" + "Сила: " + "</b>" + "6" + "<br>" + "<b>" + "Мощные атаки: " + "</b>" + "да" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costBlue;
    selectedGoods = "blue";
    selectedCost = costBlue;
}

function pressShopBrown() {
    shopDesName.innerHTML = "Фишка &#34;Робеспьер&#34;"
    shopDesContent.innerHTML = "Коричневая фишка класса «элита»." + "<br><br>" + "Модель года по версии авторитетного журнала &#34;Твоя фишка&#34;. Если ты считаешь себя мажором, перед которым все должны расступиться и поклониться в ножки, а враги обзавидоваться, то эта элитная фишка – то, что тебе нужно."
        + "<br><br>" + "<b>" + "Сила: " + "</b>" + "8" + "<br>" + "<b>" + "Мощные атаки: " + "</b>" + "да" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costBrown;
    selectedGoods = "brown";
    selectedCost = costBrown;
}

function pressShopBlack() {
    shopDesName.innerHTML = "Фишка &#34;Мальдини&#34;"
    shopDesContent.innerHTML = "Чёрная фишка класса «элита»." + "<br><br>" + "Твои соперники будут страдать!" + "<br>" + "Эта ультимативная чёрная элитная фишка порадует настоящего гуру имперских гонок! Создана для езды по особо опасным трассам с кучей красных и чёрных клеток. Ещё ею можно знатно выпиливать соперников, но… это уже на твоё усмотрение."
        + "<br><br>" + "<b>" + "Сила: " + "</b>" + "10" + "<br>" + "<b>" + "Мощные атаки: " + "</b>" + "да" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costBlack;
    selectedGoods = "black";
    selectedCost = costBlack;
}

function pressShopMagnet() {
    shopDesName.innerHTML = "Магнит"
    shopDesContent.innerHTML = "Управляй удачей!" + "<br><br>" + "Выбирай любое число на кубике, которое хочешь. При броске кубика вероятность выпадения этого числа увеличится в 2 раза."
        + "<br><br>" + "<b>" + "Максимум: " + "</b>" + "3 шт." + "<br>" + "<b>" + "Использование: " + "</b>" + "перед ходом" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costMagnet;
    selectedGoods = "magnet";
    selectedCost = costMagnet;
}

function pressShopSMagnet() {
    shopDesName.innerHTML = "Супер-магнит"
    shopDesContent.innerHTML = "Усиленный вариант магнита." + "<br><br>" + "Выбирай любое число на кубике, которое хочешь. При броске кубика вероятность выпадения этого числа увеличится в 3 раза."
        + "<br><br>" + "<b>" + "Максимум: " + "</b>" + "3 шт." + "<br>" + "<b>" + "Использование: " + "</b>" + "перед ходом" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costSMagnet;
    selectedGoods = "smagnet";
    selectedCost = costSMagnet;
}

function pressShopShield() {
    shopDesName.innerHTML = "Щит"
    shopDesContent.innerHTML = "Прикрой свой... фишка!" + "<br><br>" + "Защищает от слабых атак соперников на 1 ход. Соперник, который пытался напасть, отдаёт тебе $ " + shieldPower
        + "<br><br>" + "<b>" + "Максимум: " + "</b>" + "3 шт." + "<br>" + "<b>" + "Использование: " + "</b>" + "между ходами" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costShield;
    selectedGoods = "shield";
    selectedCost = costShield;
}

function pressShopIShield() {
    shopDesName.innerHTML = "Железный щит"
    shopDesContent.innerHTML = "Улучшенный вариант щита." + "<br><br>" + "Защищает от <b>ВСЕХ</b> атак соперников на<br>3 хода. Соперник, который пытался напасть, отдаёт тебе $ " + ishieldPower
        + "<br><br>" + "<b>" + "Максимум: " + "</b>" + "3 шт." + "<br>" + "<b>" + "Использование: " + "</b>" + "между ходами" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costIShield;
    selectedGoods = "ishield";
    selectedCost = costIShield;
}

function pressShopTrap() {
    shopDesName.innerHTML = "Капкан"
    shopDesContent.innerHTML = "Поймай соперника за хвост!" + "<br><br>" + "Установи капкан на любую свободную клетку. Соперник, который в него попался, пропускает ход и отдаёт тебе<br>$ " + trapPower
        + "<br><br>" + "<b>" + "Максимум: " + "</b>" + "1 шт." + "<br>" + "<b>" + "Использование: " + "</b>" + "перед ходом" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costTrap;
    selectedGoods = "trap";
    selectedCost = costTrap;
}

function pressShopVampire() {
    shopDesName.innerHTML = "Вампирские клыки"
    shopDesContent.innerHTML = "Почувствуй себя графом Дракулой!.. Ну, или Эдвардом - кому как нравится." + "<br><br>" + "Слабая атака больше не забирает силу. Вместо этого ты забираешь у соперника 1 единицу силы."
        + "<br><br>" + "<b>" + "Максимум: " + "</b>" + "1 шт." + "<br>" + "<b>" + "Использование: " + "</b>" + "во время атаки" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costVampire;
    selectedGoods = "vampire";
    selectedCost = costVampire;
}

function pressShopImp() {
    shopDesName.innerHTML = "Невозможный кубик"
    shopDesContent.innerHTML = "По преданию, этот артефакт был добыт три века назад воинами Империи в параллельном измерении. Геометрия данного кубика не отличается от обычного, но каким-то образом он всё-равно имеет 9 граней.<br><br>Может быть использован только 3 раза."
        + "<br><br>" + "<b>" + "Максимум: " + "</b>" + "1 шт." + "<br>" + "<b>" + "Использование: " + "</b>" + "перед ходом" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costImp;
    selectedGoods = "imp";
    selectedCost = costImp;
}

function pressShopManipulator() {
    shopDesName.innerHTML = "Устройство дистанционной манипуляции зелёным полем"
    shopDesContent.innerHTML = "Продвинутое изобретение имперских учёных. Используется для перемещения зелёных клеток на трассе. В качестве топлива использует силу фишки. Действует автоматически при попадании на зелёную клетку."
        + "<br><br>" + "<b>" + "Максимум: " + "</b>" + "1 шт." + "<br>" + "<b>" + "Использование: " + "</b>" + "после хода" + "<br>" + "<b>" + "Цена: " + "</b>" + "секретно";
    selectedGoods = "manipulator";
}

let buyConfirm = document.querySelector(".js-shop-buy");
let buyConfirmCont = document.querySelector(".js-shop-buy .js-popup-content");

// продать предмет

function pressSell() {
    let imgPath = document.querySelector(".js-inv-shop .item--select img").getAttribute("src");
    console.log("Нажато Продать: " + imgPath);
    if (imgPath === "img/inv-manipulator.png" || imgPath === "img/inv-imp.png" || (curMap !== Map11 && imgPath === "img/inv-mop.png") ) {
        // нельзя продать, если манипулятор, или имп, или (швабра и при этом карта не 11)
        showPopup(alarm, alarmCont, 338, 150, true);
        alarmHeading.innerHTML = "Отказано";
        alarmMessage.innerHTML = "Нельзя продать этот предмет.";
        return;
    }
    let buyConfirm = document.querySelector(".js-shop-buy");
    let buyConfirmCont = document.querySelector(".js-shop-buy .js-popup-content");
    let buyConfirmImg = document.querySelector(".shop__confirm-content img");
    let buyConfirmP = document.querySelector(".shop__confirm-content p");
    let yes = document.querySelector(".js-shop-buy .js-popup-yes");
    yes.removeEventListener("click", pressBuyYes);
    yes.addEventListener("click", pressSellYes);
    showPopup(buyConfirm, buyConfirmCont, 360, 200, true);
    let itemText;
    switch (imgPath) {
        case "img/inv-magnet.png":
            itemText = "магнит";
            selectedSellCost = sellMagnet;
            buyConfirmImg.setAttribute("src", "img/inv-magnet.png");
            break;
        case "img/inv-smagnet.png":
            itemText = "супер-магнит";
            selectedSellCost = sellSMagnet;
            buyConfirmImg.setAttribute("src", "img/inv-smagnet.png");
            break;
        case "img/inv-shield.png":
            itemText = "щит";
            selectedSellCost = sellShield;
            buyConfirmImg.setAttribute("src", "img/inv-shield.png");
            break;
        case "img/inv-ishield.png":
            itemText = "железный щит";
            selectedSellCost = sellIShield;
            buyConfirmImg.setAttribute("src", "img/inv-ishield.png");
            break;
        case "img/inv-trap.png":
            itemText = "капкан";
            selectedSellCost = sellTrap;
            buyConfirmImg.setAttribute("src", "img/inv-trap.png");
            break;
        case "img/inv-vampire.png":
            itemText = "вампирские клыки";
            selectedSellCost = sellVampire;
            buyConfirmImg.setAttribute("src", "img/inv-vampire.png");
            break;
        case "img/inv-mop.png":
            itemText = "швабру";
            selectedSellCost = sellMop;
            buyConfirmImg.setAttribute("src", "img/inv-mop.png");
            break;
    }
    buyConfirmP.innerHTML = "Продать " + "<b>" + itemText + "</b><br>" + "за " + "<b>" + "$ " + selectedSellCost + "</b>" + "?";
}

function pressSellYes() {
    let imgPath = document.querySelector(".js-inv-shop .item--select img").getAttribute("src");
    console.log("ПРОДАНО: " + imgPath);
    unselectItemInv();
    let player = findHuman();
    player.capital += selectedSellCost;
    switch(imgPath) {
        case "img/inv-magnet.png":
            player.magnets--;
            break;
        case "img/inv-smagnet.png":
            player.smagnets--;
            break;
        case "img/inv-shield.png":
            player.shields--;
            break;
        case "img/inv-ishield.png":
            player.ishields--;
            break;
        case "img/inv-trap.png":
            player.trap = false;
            break;
        case "img/inv-vampire.png":
            player.vampire = false;
            break;
        case "img/inv-mop.png":
            player.mop = false;
            break;
    }
    loadShopParameters(true);
    deactivateButtonSell();
    hidePopup(buyConfirm, buyConfirmCont, true, true);
}

function pressShopOver() {
    console.log("pressShopOver");
    showPopup(shopOver, shopOverCont, 338, 150, true);
}

let shopOver = document.querySelector(".js-shop-over");
let shopOverCont = document.querySelector(".js-shop-over .js-popup-content");
document.querySelector(".js-shop-over .js-popup-yes").addEventListener("click", pressShopOverYes);
document.querySelector(".js-shop-over .js-popup-no").addEventListener("click", pressShopOverNo);

function pressShopOverYes() {
    console.log("Нажато Да");
    if (curMap !== Map11) aiShopping();
    shopOverlay.style.display = "none";
    hidePopup(shopOver, shopOverCont, true);
    hidePopup(shop, shopCont);
    switchMaps();
    setUpField();
    setTimeout(function () {
        loadMap(curMap, curMapParam);
    }, 500 * gameSpeed);
}

function pressShopOverNo() {
    console.log("Нажато Нет");
    hidePopup(shopOver, shopOverCont, true);
}

// конец кода магазина

// ИСПОЛЬЗОВАНИЕ ПРЕДМЕТОВ
// магнит

let mag = document.querySelector(".js-use-magnet");
let magCont = document.querySelector(".js-use-magnet .js-popup-content");
let magName = document.querySelector(".js-use-magnet .js-head");
let magFlex = document.querySelector(".use__magnet-flex");
let magCubics = document.querySelectorAll(".use__magnet-score");
let magText = document.querySelector(".use__magnet-text2");
let magOK = document.querySelector(".js-use-magnet .js-popup-ok");
let magnetScore;
document.querySelector(".js-use-magnet .js-popup-cancel").addEventListener("click", function () {
    console.log("Ход магнитом отменен");
    hidePopup(mag, magCont);
    deactivateButtonThrow();
    unselectScore();
});

magFlex.addEventListener("click", function (event) {
    let tar = event.target.closest(".use__magnet-score");
    if ( !tar ) {
        console.log("Возврат на !tar");
        return;
    }
    activateButtonThrow();
    unselectScore();
    tar.classList.add("use__magnet-select");

    if (tar.classList.contains("use__magnet-score1")) {
        magnetScore = 1;
    }
    if (tar.classList.contains("use__magnet-score2")) {
        magnetScore = 2;
    }
    if (tar.classList.contains("use__magnet-score3")) {
        magnetScore = 3;
    }
    if (tar.classList.contains("use__magnet-score4")) {
        magnetScore = 4;
    }
    if (tar.classList.contains("use__magnet-score5")) {
        magnetScore = 5;
    }
    if (tar.classList.contains("use__magnet-score6")) {
        magnetScore = 6;
    }
    if (tar.classList.contains("use__magnet-score7")) {
        magnetScore = 7;
    }
    if (tar.classList.contains("use__magnet-score8")) {
        magnetScore = 8;
    }
    if (tar.classList.contains("use__magnet-score9")) {
        magnetScore = 9;
    }
});

function activateButtonThrow() {
    console.log("Кнопка OK магнит активна");
    magOK.addEventListener("click", pressMagnetOk);
    magOK.style.cursor = "pointer";
    magOK.style.background = "#ffbb55";
    magOK.style.fontWeight = "bold";
    magOK.addEventListener("mouseover", addButtonMouseover);
    magOK.addEventListener("mouseout", addButtonMouseout);
}

function deactivateButtonThrow() {
    console.log("Кнопка OK магнит не активна");
    magOK.removeEventListener("click", pressMagnetOk);
    magOK.style.cursor = "default";
    magOK.style.background = "#7d7d7d";
    magOK.style.fontWeight = "normal";
    magOK.removeEventListener("mouseover", addButtonMouseover);
    magOK.removeEventListener("mouseout", addButtonMouseout);
}

function pressMagnetOk() {

    if (magName.innerHTML === "Ход магнитом") {
        console.log("Ход магнитом OK");
        players[current].magnets--;
        messageMagnet();
        cubicArgs.magnet = true;
        setTimeout(throwCubic, 500);
    } else {
        console.log("Ход супер-магнитом OK");
        players[current].smagnets--;
        messageMagnet(true);
        cubicArgs.magnet = true;
        cubicArgs.sup = true;
        setTimeout(throwCubic, 500);
    }
    hidePopup(mag, magCont);
    if (players[current].type === "human") {
        divScore.innerHTML = "";
        overlayCubic.style.display = "block";
        blockHumanInv(true);
        deactivateButtonThrow();
        unselectScore();
        cleanInventory();
        fillInventory();
    } else {
        fillWhatInventory();
    }
}

function unselectScore() {
    for (let i = 0; i < magCubics.length; i++) {
        magCubics[i].classList.remove("use__magnet-select");
    }
}

// невозможный кубик

let askIMP = document.querySelector(".js-imp");
let askIMPCont = document.querySelector(".js-imp .js-popup-content");
let askIMPMoves = document.querySelector(".js-imp .popup__power-text span");
let askIMPcubic = document.querySelector(".cubic__icon--imp");
document.querySelector(".js-imp .js-popup-confirm").addEventListener("click", pressAskIMPYes);
document.querySelector(".js-imp .js-popup-decline").addEventListener("click", function () {
    console.log("Ход невозможным кубиком отменен");
    hidePopup(askIMP, askIMPCont);
});

function pressAskIMPYes() {
    console.log("Ход невозможным кубиком");
    hidePopup(askIMP, askIMPCont);
    cubicArgs.imp = true;
    players[current].imp--;
    messageIMPmove();

    if (players[current].type === "human") {
        askIMPcubic.setAttribute("src", "img/inv-imp.png");
        if (players[current].imp == 0) {
            cleanInventory();
            fillInventory();
        } else {
            document.querySelector(".overlay__invblock--imp").style.display = "block";
        }
    } else {
        askIMPcubic.setAttribute("src", "img/inv-imp-secret.png");
    }
    askIMPcubic.style.display = "block";
    console.log ("askIMPcubic включен в pressAskIMPYes");
}

// швабра

let askMop = document.querySelector(".js-mop");
let askMopCont = document.querySelector(".js-mop .js-popup-content");
let askMopYes = document.querySelector(".js-mop .js-popup-confirm");
document.querySelector(".js-mop .js-popup-cancel").addEventListener("click", function () {
    console.log("Швабра отменена");
    hidePopup(askMop, askMopCont);
    cellCollect.forEach(function (item) {
        deactivateCell(item);
        item.style.boxShadow = "inset 0 0 7px 4px rgba(158, 155, 70, 0.6)";
        item.style.cursor = "default";
        item.style.transform = "none";
    });
    overlayReset();
    cellCollect = [];
});

function pressAskMopYes() {
    console.log("MOP используется");
    players[current].mop = false;
    let index = getCellIndexById(selectedCell);
    curMap[index].type = "none";
    messageMop(curMap[index].num);

    // анимация исчезания клетки
    let animMop;
    setTimeout(function () {
        selectedCellPath.style.backgroundColor = "#FFF6DF";
    }, 150);
    animMop = setInterval(function () {
        selectedCellPath.style.backgroundColor = "#EF0000";
        setTimeout(function () {
            selectedCellPath.style.backgroundColor = "#FFF6DF";
        }, 150);
    }, 300);
    setTimeout(function () {
        clearInterval(animMop);
        selectedCellPath.style.backgroundColor = "#FFF6DF";
    }, 2400);

    // удаляем метку "плохая" с клетки
    let badIndex = curMapParam.badId.indexOf(selectedCell);
    if (badIndex >= 0) {
        curMapParam.badId.splice(badIndex, 1);
        console.log("Метка удалена, curMapParam.badId = ");
        console.log(curMapParam.badId);
    }

    if (players[current].type === "human") {
        hidePopup(askMop, askMopCont);
        cellCollect.forEach(function (item) {
            deactivateCell(item);
            item.style.boxShadow = "inset 0 0 7px 4px rgba(158, 155, 70, 0.6)";
            item.style.cursor = "default";
            item.style.transform = "none";
        });
        overlayReset();
        cleanInventory();
        fillInventory();
        cellCollect = [];
    }
}

function activateButtonMop() {
    console.log("Кнопка подтвр.MOP активна");
    askMopYes.style.cursor = "pointer";
    askMopYes.style.background = "#ffbb55";
    askMopYes.style.fontWeight = "bold";
    askMopYes.addEventListener("mouseover", addButtonMouseover);
    askMopYes.addEventListener("mouseout", addButtonMouseout);
    askMopYes.addEventListener("click", pressAskMopYes);
}

function deactivateButtonMop() {
    console.log("Кнопка подтвр.MOP не активна");
    askMopYes.style.cursor = "default";
    askMopYes.style.background = "#7d7d7d";
    askMopYes.style.fontWeight = "normal";
    askMopYes.removeEventListener("mouseover", addButtonMouseover);
    askMopYes.removeEventListener("mouseout", addButtonMouseout);
    askMopYes.removeEventListener("click", pressAskMopYes);
}

// выбрать клетку

function cellSelect() {
    for (let i = 0; i < cellCollect.length; i++) {
        if (cellCollect[i] === this) continue;
        cellCollect[i].addEventListener("mouseover", addCellMouseover);
        cellCollect[i].addEventListener("mouseout", addCellMouseout);
        cellCollect[i].addEventListener("click", cellSelect);
        cellCollect[i].style.boxShadow = "inset 0 0 7px 4px rgba(158, 155, 70, 0.6)";
        cellCollect[i].style.cursor = "default";
        cellCollect[i].style.transform = "none";
        cellCollect[i].style.zIndex = "0";
    }

    // удаление эффектов с текущей клетки
    this.removeEventListener("mouseover", addCellMouseover);
    this.removeEventListener("mouseout", addCellMouseout);
    this.removeEventListener("click", cellSelect);
    this.style.cursor = "default";
    this.style.zIndex = "1";

    for (let i = 0; i < curMap.length; i++) {
        if (curMap[i].coorX + "px" === this.style.left && curMap[i].coorY + "px" === this.style.top) {
            selectedCell = curMap[i].cellid;
            selectedCellPath = this;
            console.log("selectedCell = " + selectedCell);
        }
    }
    activateButtonMop();
    activateButtonTrap();
    activateButtonManip();
}

function activateCell(path) {
    path.addEventListener("mouseover", addCellMouseover);
    path.addEventListener("mouseout", addCellMouseout);
    path.addEventListener("click", cellSelect);
    path.style.zIndex = "1";
}

function deactivateCell(path) {
    path.removeEventListener("mouseover", addCellMouseover);
    path.removeEventListener("mouseout", addCellMouseout);
    path.removeEventListener("click", cellSelect);
    path.style.zIndex = "0";
}

// капкан

let askTrap = document.querySelector(".js-trap");
let askTrapCont = document.querySelector(".js-trap .js-popup-content");
let askTrapYes = document.querySelector(".js-trap .js-popup-confirm");
document.querySelector(".js-trap .js-popup-cancel").addEventListener("click", function () {
    console.log("Капкан отменен");
    hidePopup(askTrap, askTrapCont);
    cellCollect.forEach(function (item) {
        deactivateCell(item);
        item.style.boxShadow = "inset 0 0 7px 4px rgba(158, 155, 70, 0.6)";
        item.style.cursor = "default";
        item.style.transform = "none";
    });
    overlayReset();
    cellCollect = [];
});

function activateButtonTrap() {
    console.log("Кнопка подтвр.капкана активна");
    askTrapYes.style.cursor = "pointer";
    askTrapYes.style.background = "#ffbb55";
    askTrapYes.style.fontWeight = "bold";
    askTrapYes.addEventListener("mouseover", addButtonMouseover);
    askTrapYes.addEventListener("mouseout", addButtonMouseout);
    askTrapYes.addEventListener("click", pressAskTrapYes);
}

function deactivateButtonTrap() {
    console.log("Кнопка подтвр.капкана не активна");
    askTrapYes.style.cursor = "default";
    askTrapYes.style.background = "#7d7d7d";
    askTrapYes.style.fontWeight = "normal";
    askTrapYes.removeEventListener("mouseover", addButtonMouseover);
    askTrapYes.removeEventListener("mouseout", addButtonMouseout);
    askTrapYes.removeEventListener("click", pressAskTrapYes);
}

function pressAskTrapYes() {
    console.log("Капкан поставлен");
    players[current].trap = false;
    let index = getCellIndexById(selectedCell);
    curMap[index].type = "trap" + players[current].letter;
    curMap[index].trapPath = selectedCellPath;
    messageTrap(curMap[index].num);

    // установка иконки капкана
    selectedCellPath.querySelector("p").remove();
    let trap = document.createElement("img");
    trap.setAttribute("src", "img/inv-trap.png");
    let title = "Капкан " + players[current].label;
    trap.setAttribute("title", title);
    trap.style.width = "35px";
    selectedCellPath.append(trap);

    // анимация капкана
    let animTrap;
    setTimeout(function () {
        trap.style.visibility = "visible";
    }, 150);
    animTrap = setInterval(function () {
        trap.style.visibility = "hidden";
        setTimeout(function () {
            trap.style.visibility = "visible";
        }, 150);
    }, 300);
    setTimeout(function () {
        clearInterval(animTrap);
        trap.style.visibility = "visible";
    }, 2400);

    // отмечаем клетку как "плохую"
    if (!curMapParam.bone) {
        curMapParam.badId.push(selectedCell);
        console.log("Метка добавлена, curMapParam.badId = ");
        console.log(curMapParam.badId);
    }

    if (players[current].type === "human") {
        hidePopup(askTrap, askTrapCont);
        cellCollect.forEach(function (item) {
            deactivateCell(item);
            item.style.boxShadow = "inset 0 0 7px 4px rgba(158, 155, 70, 0.6)";
            item.style.cursor = "default";
            item.style.transform = "none";
        });
        overlayReset();
        cleanInventory();
        fillInventory();
        cellCollect = [];
    }
}

// манипулятор

let manip = document.querySelector(".js-manip");
let manipCont = document.querySelector(".js-manip .js-popup-content");
let manipNow = document.querySelector(".js-manip .js-popup-now");
let manipAfter = document.querySelector(".js-manip .js-popup-after");
let manipOk = document.querySelector(".js-manip .js-popup-confirm");
document.querySelector(".js-manip .js-popup-cancel").addEventListener("click", function () {
    console.log("Манипулятор отменен");
    hidePopup(manip, manipCont);
    cellCollect.forEach(function (item) {
        deactivateCell(item);
        item.style.boxShadow = "inset 0 0 7px 4px rgba(158, 155, 70, 0.6)";
        item.style.cursor = "default";
        item.style.transform = "none";
    });
    overlayReset();
    cellCollect = [];
    cameFromBlack = true;
    setTimeout(getCellType, 500 * gameSpeed);
});

function activateButtonManip() {
    console.log("Кнопка подтвр.манип активна");
    manipOk.style.cursor = "pointer";
    manipOk.style.background = "#ffbb55";
    manipOk.style.fontWeight = "bold";
    manipOk.addEventListener("mouseover", addButtonMouseover);
    manipOk.addEventListener("mouseout", addButtonMouseout);
    manipOk.addEventListener("click", pressAskManipYes);
}

function deactivateButtonManip() {
    console.log("Кнопка подтвр.манип не активна");
    manipOk.style.cursor = "default";
    manipOk.style.background = "#7d7d7d";
    manipOk.style.fontWeight = "normal";
    manipOk.removeEventListener("mouseover", addButtonMouseover);
    manipOk.removeEventListener("mouseout", addButtonMouseout);
    manipOk.removeEventListener("click", pressAskManipYes);
}

function pressAskManipYes() {
    console.log("Перемещение зелёной клетки");
    hidePopup(manip, manipCont);
    cellCollect.forEach(function (item) {
        deactivateCell(item);
        item.style.boxShadow = "inset 0 0 7px 4px rgba(158, 155, 70, 0.6)";
        item.style.cursor = "default";
        item.style.transform = "none";
    });
    overlayReset();
    cellCollect = [];

    players[current].power--;
    refreshPowercells();
    if (players[current].power == 0) {
        if (curMap !== Map15) {
            pressSkullOKNext = {
                script: function () {
                    setTimeout(executeManip, 400);
                }
            }
            popupSkullDanger();
        } else {
            setTimeout(executeManip, 400);
        }
        return;
    }
    setTimeout(executeManip, 400);
}

function executeManip() {
    // находим путь к текущей клетке
    let currentCellPath;
    let cells = document.querySelectorAll(".cell");
    let currentIndex = getCellIndexById(players[current].currentCell);
    let goalIndex = getCellIndexById(selectedCell);
    let x = curMap[currentIndex].coorX + "px";
    let y = curMap[currentIndex].coorY + "px";

    for (let i = 0; i < cells.length; i++) {
        let xi = window.getComputedStyle(cells[i]).left;
        let yi = window.getComputedStyle(cells[i]).top;
        if (xi === x && yi === y) {
            currentCellPath = cells[i];
            break;
        }
    }

    // убираем зелёный цвет с текущей
    currentCellPath.style.background = "#FFF6DF";
    currentCellPath.querySelector("p").style.color = "#C3C3C3";
    curMap[currentIndex].type = false;

    // анимация
    let moving = document.createElement("div");
    moving.classList.add("cell", "cell-green");
    moving.style.left = x;
    moving.style.top = y;
    moving.style.zIndex = "510";
    moving.style.transition = "1.2s";
    field.append(moving);

    setTimeout(function () {
        moving.style.left = curMap[goalIndex].coorX + "px";
        moving.style.top = curMap[goalIndex].coorY + "px";
    }, 17);

    setTimeout(function () {
        moving.remove();
        // добавляем зелёный цвет к выбранной
        selectedCellPath.style.background = "#28DD24";
        selectedCellPath.querySelector("p").style.color = "#E7E7E7";
        curMap[goalIndex].type = "green";
        messageManip(curMap[currentIndex].num);
    }, 1210);

    setTimeout(moveIsOver, 1700 * gameSpeed);
}

// подсмотреть инвентарь соперников

let whatButton = document.querySelector(".info__what");
whatButton.addEventListener("click", popupRivalsInv);
let whatinv = document.querySelector(".js-what");
let whatinvCont = document.querySelector(".js-what .js-popup-content");
document.querySelector(".js-what .js-popup-ok").addEventListener("click", pressRivalsInvOK);

function popupRivalsInv() {
    console.log("Открыт popupRivalsInv");
    showPopup(whatinv, whatinvCont, 530, 400, true);
    gamePause();
    fillWhatInventory();
}

function pressRivalsInvOK() {
    console.log("pressRivalsInvOK");
    hidePopup(whatinv, whatinvCont, true);
    gameResume();
}

function fillWhatInventory() {

    let whatinvAh2 = document.querySelector(".what__h2--A");
    let whatinvAToken = document.querySelector(".what__token--A");
    let whatinvALabel = document.querySelector(".what__label--A");
    let whatinvAItems = document.querySelector(".what__items--A");
    let whatinvAEmpty = document.querySelector(".what__items--A p");
    let whatinvBh2 = document.querySelector(".what__h2--B");
    let whatinvBToken = document.querySelector(".what__token--B");
    let whatinvBLabel = document.querySelector(".what__label--B");
    let whatinvBItems = document.querySelector(".what__items--B");
    let whatinvBEmpty = document.querySelector(".what__items--B p");
    let whatinvCh2 = document.querySelector(".what__h2--C");
    let whatinvCToken = document.querySelector(".what__token--C");
    let whatinvCLabel = document.querySelector(".what__label--C");
    let whatinvCItems = document.querySelector(".what__items--C");
    let whatinvCEmpty = document.querySelector(".what__items--C p");

    // очищаем, если там уже что-то было

    whatinvAEmpty.style.display = "block";
    whatinvBEmpty.style.display = "block";
    whatinvCEmpty.style.display = "block";
    let items = document.querySelectorAll(".what__items img");
    if (items) {
        items.forEach(function (item) {
            item.remove();
        });
    }
    
    // загружаем данные игрока А

    for (let i = 0; i < players.length; i++) {
        if (players[i].letter === "A") {

            setInfoModelColor(players[i], whatinvAToken, true);
            whatinvALabel.innerHTML = players[i].label;
            whatinvAh2.innerHTML = "Игрок А <span>(" + translateAiText(players[i]) + ")</span>";
            whatinvAh2.querySelector("span").classList.add("span__grey");

            if ( getItemsCount(players[i], true) != 0) {
                whatinvAEmpty.style.display = "none";
                whatinvCreateItems(players[i], whatinvAItems);
            }
        }
    }

    // загружаем данные игрока B

    for (let i = 0; i < players.length; i++) {
        if (players[i].letter === "B" ) {

            setInfoModelColor(players[i], whatinvBToken, true);
            whatinvBLabel.innerHTML = players[i].label;
            whatinvBh2.innerHTML = "Игрок B <span>(" + translateAiText(players[i]) + ")</span>";
            whatinvBh2.querySelector("span").classList.add("span__grey");

            if ( getItemsCount(players[i], true) != 0) {
                whatinvBEmpty.style.display = "none";
                whatinvCreateItems(players[i], whatinvBItems);
            }
        }
    }

    // загружаем данные игрока C

    for (let i = 0; i < players.length; i++) {
        if (players[i].letter === "C" ) {

            setInfoModelColor(players[i], whatinvCToken, true);
            whatinvCLabel.innerHTML = players[i].label;
            whatinvCh2.innerHTML = "Игрок C <span>(" + translateAiText(players[i]) + ")</span>";
            whatinvCh2.querySelector("span").classList.add("span__grey");

            if ( getItemsCount(players[i], true) != 0) {
                whatinvCEmpty.style.display = "none";
                whatinvCreateItems(players[i], whatinvCItems);
            }
        }
    }
}

function translateAiText(player) {
    if (player.aiType === "balanced") return "сбалансированный";
    if (player.aiType === "risky") return "рисковый";
    if (player.aiType === "careful") return "осторожный";
    if (player.aiType === "stupid") return "тупой";
}

function whatinvCreateItems(player, itemsPath) {
    for (let i = 0; i < player.magnets; i++) {
        let newImg = document.createElement("img");
        newImg.setAttribute("src", "img/inv-magnet.png");
        newImg.setAttribute("title", "Магнит");
        itemsPath.append(newImg);
    }
    for (let i = 0; i < player.smagnets; i++) {
        let newImg = document.createElement("img");
        newImg.setAttribute("src", "img/inv-smagnet.png");
        newImg.setAttribute("title", "Супер-магнит");
        itemsPath.append(newImg);
    }
    for (let i = 0; i < player.shields; i++) {
        let newImg = document.createElement("img");
        newImg.setAttribute("src", "img/inv-shield.png");
        newImg.setAttribute("title", "Щит");
        itemsPath.append(newImg);
    }
    for (let i = 0; i < player.ishields; i++) {
        let newImg = document.createElement("img");
        newImg.setAttribute("src", "img/inv-ishield.png");
        newImg.setAttribute("title", "Железный щит");
        itemsPath.append(newImg);
    }
    if (player.trap) {
        let newImg = document.createElement("img");
        newImg.setAttribute("src", "img/inv-trap.png");
        newImg.setAttribute("title", "Капкан");
        itemsPath.append(newImg);
    }
    if (player.vampire) {
        let newImg = document.createElement("img");
        newImg.setAttribute("src", "img/inv-vampire.png");
        newImg.setAttribute("title", "Вампирские клыки");
        itemsPath.append(newImg);
    }
    if (player.mop) {
        let newImg = document.createElement("img");
        newImg.setAttribute("src", "img/inv-mop-secret.png");
        newImg.setAttribute("title", "Секретный предмет");
        itemsPath.append(newImg);
    }
    if (player.imp > 0) {
        let newImg = document.createElement("img");
        newImg.setAttribute("src", "img/inv-imp-secret.png");
        newImg.setAttribute("title", "Секретный предмет");
        itemsPath.append(newImg);
    }
}

// сделать фишки прозрачными

let lookButton = document.querySelector(".info__look");
let lookButtonImg = document.querySelector(".info__look img");
lookButton.addEventListener("click", tokenOpacityOn);

function tokenOpacityOn() {
    console.log("tokenOpacityOn");
    lookButton.removeEventListener("click", tokenOpacityOn);
    lookButton.addEventListener("click", tokenOpacityOff);
    lookButtonImg.setAttribute("src", "img/icons/icon-eye-on.png");
    let tokens = document.querySelectorAll(".player");
    tokens.forEach(function (item) {
        item.style.opacity = ".4";
    });
}

function tokenOpacityOff() {
    console.log("tokenOpacityOff");
    lookButton.addEventListener("click", tokenOpacityOn);
    lookButton.removeEventListener("click", tokenOpacityOff);
    lookButtonImg.setAttribute("src", "img/icons/icon-eye-off.png");
    let tokens = document.querySelectorAll(".player");
    tokens.forEach(function (item) {
        item.style.opacity = "1";
    });
}

// сдаться

let surrenderBtn = document.querySelector(".info__control .popup__button");

let surrender = document.querySelector(".js-surrender");
let surrenderCont = document.querySelector(".js-surrender .js-popup-content");
document.querySelector(".js-surrender .js-popup-no").addEventListener("click", function () {
    console.log("surrender NO");
    hidePopup(surrender, surrenderCont, true);
    gameResume();
});
document.querySelector(".js-surrender .js-popup-yes").addEventListener("click", function () {
    console.log("surrender YES");
    hidePopup(surrender, surrenderCont, true);
    players[3].power--;
    if (players[3].power > 0) {
        refreshPowercells();
        restartMap();
    }
    if (players[3].power == 0) {
        refreshPowercells();
        if (curMap !== Map15) {
            pressSkullOKNext = {
                script: function () {
                    restartMap();
                }
            }
            popupSkullDanger();
        } else {
            restartMap();
        }
    }
    if (players[3].power < 0) {
        popupLose();
    }
});

function popupSurrender() {
    console.log("popupSurrender");
    showPopup(surrender, surrenderCont, 338, 200, true);
    gamePause();
}

function activateButtonSur() {
    console.log("Кнопка сдаться активна");
    surrenderBtn.style.cursor = "pointer";
    surrenderBtn.style.background = "none";
    surrenderBtn.style.fontWeight = "bold";
    surrenderBtn.addEventListener("mouseover", addSurMouseover);
    surrenderBtn.addEventListener("mouseout", addSurMouseout);
    surrenderBtn.addEventListener("click", popupSurrender);
}

function deactivateButtonSur() {
    console.log("Кнопка сдаться не активна");
    surrenderBtn.style.cursor = "default";
    surrenderBtn.style.background = "rgba(125,125,125,0.2)";
    surrenderBtn.style.fontWeight = "normal";
    surrenderBtn.removeEventListener("mouseover", addSurMouseover);
    surrenderBtn.removeEventListener("mouseout", addSurMouseout);
    surrenderBtn.removeEventListener("click", popupSurrender);
}

// ПЕРСОНАЖИ

let char = document.querySelector(".js-character");
let charCloud = document.querySelector(".character__cloud"); // изображение персонажа
let charCont = document.querySelector(".js-character .js-popup-content");
let charMessage1 = document.querySelector(".character__message1");
let charH2 = document.querySelector(".character__h2"); // имя персонажа
let charItem = document.querySelector(".character__item"); // изображение предмета
let charItemIcon = document.querySelector(".character__item div");
let charItemName = document.querySelector(".character__item h2");
let charMessage2 = document.querySelector(".character__message2"); // текст персонажа
let charMessage3 = document.querySelector(".character__message3"); // доп-текст
let charImg = document.querySelector(".character__img"); // дополн. изображение для диалога
let charCancel = document.querySelector(".js-character .js-button-cancel"); // отказаться платить дань
let charOK = document.querySelector(".js-character .js-button-ok"); // кнопка ОК
let charArrow = document.querySelector(".character__arrow"); // стрелка

function pressEmperorWelcome() {
    console.log("pressEmperorWelcome");
    hidePopup(char, charCont);
    charMessage1.style.display = "none";
    charMessage2.style.marginLeft = "83px";
    charMessage3.style.display = "none";
    charArrow.style.display = "block";
    startGameTime();
    setTimeout(function () {
        loadMap(curMap, curMapParam);
    }, 500);
}

function hintShop() {
    console.log("hintShop");
    showPopup(char, charCont, 395, 355, true, true);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "Добро пожаловать в магазин!<br><br>С таким капиталом ты вряд ли что-то купишь, поэтому, просто осмотрись для начала.<br><br><b>Важно:</b> цены останутся без изменений до конца чемпионата! Так что, скидки выпрашивать смысла нет – торговец попался жадный." + "<i>";
    charArrow.style.display = "none";
    charOK.addEventListener("click", pressCharClose, {once: true});
}

function hintMagnet() {
    console.log("hintMagnet");
    showPopup(char, charCont, 395, 420, true, true);
    charMessage2.innerHTML = "<i>" + "Хочешь поймать удачу на крючок? Не проблема!<br>Магнитом можно увеличить шансы на выпадение нужного количества очков на кубике. Данный магнит увеличивает шансы <b>в 2 раза.</b> Это всё равно, что нанести сразу на две грани кубика одну и ту же цифру.<br>Используй с умом." + "<i>";
    newItem("МАГНИТ", "img/inv-magnet.png");
    charOK.addEventListener("click", pressHintItem, {once: true});
}

function hintSMagnet() {
    console.log("hintSMagnet");
    showPopup(char, charCont, 395, 345, true, true);
    charMessage2.innerHTML = "<i>" + "Обычный магнит увеличивал шансы в 2 раза. А этот увеличивает их <b>в 3 раза!</b><br>Вещь – бомба. Надо быть полным лохом, чтобы проиграть с Супер-магнитом." + "<i>";
    newItem("СУПЕР-МАГНИТ", "img/inv-smagnet.png");
    charOK.addEventListener("click", pressHintItem, {once: true});
    charOK.addEventListener("click", hintTrap, {once: true});
}

function hintShield() {
    console.log("hintShield");
    showPopup(char, charCont, 395, 340, true, true);
    charMessage2.innerHTML = "<i>" + "Теперь можно защититься от атак соперника, а заодно и деньжат с него собрать! Щит хлипкий, но, как грица, чем богаты, тем и рады. Главное – вовремя надеть." + "<i>";
    newItem("ЩИТ", "img/inv-shield.png");
    charOK.addEventListener("click", pressHintItem, {once: true});
}

function hintIShield() {
    console.log("hintIShield");
    showPopup(char, charCont, 395, 375, true, true);
    charMessage2.innerHTML = "<i>" + "Этот щит гораздо надёжнее обычного, да и денег собирает больше. Хватает <b>на 3 хода</b>, защищает от <b>сильных атак</b>. Не надо беспокоиться, что придёт в негодность раньше времени! Только вовремя надеть." + "<i>";
    newItem("ЖЕЛЕЗНЫЙ ЩИТ", "img/inv-ishield.png");
    charOK.addEventListener("click", pressHintItem, {once: true});
}

function hintTrap() {
    console.log("hintTrap");
    showPopup(char, charCont, 395, 380, true, true);
    charMessage2.innerHTML = "<i>" + "Воу-воу, что это тут у нас такое опасное?..<br>Ах, это ж капкан! Его можно установить на свободную клетку и поймать недруга. Пока он будет разбираться что к чему, его можно <b>обокрасть.</b><br>Смотри, только сам не попади!" + "<i>";
    newItem("КАПКАН", "img/inv-trap.png");
    charOK.addEventListener("click", pressHintItem, {once: true});
}

function hintVampire() {
    console.log("hintVampire");
    showPopup(char, charCont, 395, 492, true, true);
    charMessage2.innerHTML = "<i>" + "На днях к нам залетел граф Дракула и оставил свои вампирские клыки. Теперь их можно купить в обычном магазине, и почувствовать власть над соперником во время гонок!..<br><br>Ладно, насчёт графа Дракулы я пошутил. Это просто крутое название нового оружия от имперских мастеров. Тактика с ним простая: наступи на врага, <b>забери</b> у него 1 единицу силы, а сам <b>ходи ещё раз.</b> Всё, как раньше… только с клыками!" + "<i>";
    newItem("ВАМПИРСКИЕ КЛЫКИ", "img/inv-vampire.png");
    charOK.addEventListener("click", pressHintItem, {once: true});
    charArrow.style.top = "248px";
}

function newItem(itemText, imgPath, manipulator) {
    char.classList.add("zindex-hard");
    overlayHard.style.background = "none";
    char.style.left = "-412px";
    char.style.top = "0";
    charArrow.style.display = "block";
    charArrow.style.left = "542px";
    charArrow.style.top = "210px";
    let rot = "rotate(-135deg)";
    charArrow.style.transform = rot;
    animArrow = setInterval(animateArrow, 600, rot);
    charMessage1.style.display = "block";
    charMessage1.innerHTML = "В магазине появился новый предмет";
    charItem.style.display = "flex";
    charItemName.innerHTML = itemText;
    let oldImg = charItemIcon.querySelector("img");
    if (oldImg) {
        oldImg.remove();
    }
    let img = document.createElement("img");
    img.setAttribute("src", imgPath);
    if (manipulator) {
        char.style.left = "0";
        charArrow.style.display = "none";
        charMessage1.style.display = "none";
        charItem.querySelector("div").style.height = "120px";
    } else {
        charItem.querySelector("div").style.height = "65px";
    }
    charItemIcon.append(img);
}

// закрытие окна с подсказкой о новом предмете в магазине

function pressHintItem() {
    console.log("pressHintItem");
    charMessage1.style.display = "none";
    charItem.style.display = "none";
    overlayHard.style.display = "none";
    overlayHard.style.background = "rgba(0, 0, 0, 0.4)";
    hidePopup(char, charCont);
    clearInterval(animArrow);
}

// закрытие окна с персонажем (не привязанным к системе hints.js)

function pressCharClose() {
    char.classList.remove("zindex-hard");
    hidePopup(char, charCont, true);
    clearInterval(animArrow);
}

// НОВОЕ УСЛОВИЕ НА ТРАССЕ

let newCond = document.querySelector(".js-new-condition");
let newCondCont = document.querySelector(".js-new-condition .js-popup-content");
let newCondImg = document.querySelector(".js-new-condition .new-condition__flex img");
let newCondH2 = document.querySelector(".js-new-condition .new-condition__flex h2");
let newCondText = document.querySelector(".js-new-condition .new-condition__text");
let newCondOK = document.querySelector(".js-new-condition .js-popup-ok");

function popupNewcondBranch() {
    console.log("popupNewcondBranch");
    showPopup(newCond, newCondCont, 400, 360);
    newCondOK.addEventListener("click", pressNewcondBranch, {once: true});
    newCondImg.setAttribute("src", "img/newcon/new-con-branch.png");
    newCondH2.innerHTML = "РАЗВИЛКА";
    newCondText.innerHTML = "Внимательно изучите пути, прежде чем сделать выбор!";
}

function pressNewcondBranch() {
    console.log("pressNewcondBranch");
    hidePopup(newCond, newCondCont, false, true);
    setTimeout(popupNewcondSpeed, 99);
}

function pressNewcondSurprise() {
    console.log("pressNewcondSurprise");
    hidePopup(newCond, newCondCont, false, true);
    setTimeout(gameStart, 500 * gameSpeed);
    /*if (curMap === Map02 && showedHintFore === false) {
        nextScript = {
            script: function () {
                showedHintFore = true;
                setTimeout(gameStart, 500 * gameSpeed);
            }
        };
        hintLine.push("hintFore");
        setTimeout(startHintLine, 99);
    }*/
}

function popupNewcondSurprise() {
    console.log("popupNewcondSurprise");
    showPopup(newCond, newCondCont, 400, 332);
    newCondOK.addEventListener("click", pressNewcondSurprise, {once: true});
    newCondImg.setAttribute("src", "img/newcon/new-con-joker.png");
    newCondH2.innerHTML = "КЛЕТКА-ДЖОКЕР";
    newCondText.innerHTML = "Внутри может оказаться <b>любое условие.</b><br>Даже такое, которое Вы ещё ни разу не видели.";
}

function popupNewcondOrange() {
    console.log("popupNewcondOrange");
    showPopup(newCond, newCondCont, 400, 295);
    newCondOK.addEventListener("click", pressNewcondOrange, {once: true});
    newCondImg.setAttribute("src", "img/newcon/new-con-orange.png");
    newCondH2.innerHTML = "ОРАНЖЕВАЯ КЛЕТКА";
    newCondText.innerHTML = "Ходи ещё 2 раза.";
}

function pressNewcondOrange() {
    console.log("pressNewcondOrange");
    hidePopup(newCond, newCondCont, false, true);
    setTimeout(popupNewcondBlack, 99);
}

function popupNewcondBlack() {
    console.log("popupNewcondBlack");
    showPopup(newCond, newCondCont, 400, 315);
    newCondOK.addEventListener("click", pressNewcond, {once: true});
    newCondImg.setAttribute("src", "img/newcon/new-con-black.png");
    newCondH2.innerHTML = "ЧЁРНАЯ КЛЕТКА";
    newCondText.innerHTML = "Минус 1 единица силы.";
}

function popupNewcondBonus() {
    console.log("popupNewcondBonus");
    showPopup(newCond, newCondCont, 400, 315);
    newCondOK.addEventListener("click", pressNewcondBonus, {once: true});
    newCondImg.setAttribute("src", "img/newcon/new-con-bonus.png");
    newCondH2.innerHTML = "БОНУСЫ И ШТРАФЫ";
    newCondText.innerHTML = "Измени размер капитала на указанное число.";
}

function pressNewcondBonus() {
    console.log("pressNewcondBonus");
    hidePopup(newCond, newCondCont, false, true);
    setTimeout(popupNewcondStarOr, 99);
}

function popupNewcondStarOr() {
    console.log("popupNewcondStarOr");
    showPopup(newCond, newCondCont, 400, 315);
    newCondOK.addEventListener("click", pressNewcond, {once: true});
    newCondImg.setAttribute("src", "img/newcon/new-con-star-or.png");
    newCondH2.innerHTML = "ОРАНЖЕВАЯ ЗВЕЗДА";
    newCondText.innerHTML = "Плюс 1 единица силы.";
}

function popupNewcondStarRed() {
    console.log("popupNewcondStarRed");
    showPopup(newCond, newCondCont, 400, 315);
    newCondOK.addEventListener("click", pressNewcond, {once: true});
    newCondImg.setAttribute("src", "img/newcon/new-con-star-red.png");
    newCondH2.innerHTML = "КРАСНАЯ ЗВЕЗДА";
    newCondText.innerHTML = "Плюс 2 единицы силы.";
}

function popupNewcondSpeed(again) {
    console.log("popupNewcondSpeed");
    newCondImg.setAttribute("src", "img/newcon/new-con-speed.png");
    if (!again) {
        newCondH2.innerHTML = "МОЛНИЯ";
        newCondText.innerHTML = "Следующие 3 хода очки на кубике<br><b>умножаются на 2.</b>";
        showPopup(newCond, newCondCont, 400, 315);
        newCondOK.addEventListener("click", pressNewcondSpeed, {once: true});
    } else {
        newCondH2.innerHTML = "МОЛНИЯ (доп. информация)";
        newCondText.innerHTML = "<b>Жёлтая и оранжевая</b> клетки не добавляют ходов с молнией.<br><b>Зелёные</b> клетки забирают ходы с молнией.<br><b>Красные</b> клетки отменяют молнию.";
        showPopup(newCond, newCondCont, 400, 348);
        newCondOK.addEventListener("click", pressNewcondSpeedAgain, {once: true});
    }
}

function pressNewcondSpeed() {
    console.log("pressNewcondSpeed");
    hidePopup(newCond, newCondCont, false, true);
    setTimeout(popupNewcondSurprise, 99);
}

function pressNewcondSpeedAgain() {
    console.log("pressNewcondSpeed");
    hidePopup(newCond, newCondCont, false, true);
    setTimeout(popupNewcondDeadend, 99);
}

function popupNewcondDeadend() {
    console.log("popupNewcondDeadend");
    showPopup(newCond, newCondCont, 400, 315);
    newCondOK.addEventListener("click", pressNewcond, {once: true});
    newCondImg.setAttribute("src", "img/newcon/new-con-deadend.png");
    newCondH2.innerHTML = "ТУПИК";
    newCondText.innerHTML = "Упёрлись в стенку? Следующий раз ходите назад, пока не вернётесь на тропу.";
}

function popupNewcondBlue() {
    console.log("popupNewcondBlue");
    showPopup(newCond, newCondCont, 400, 360);
    newCondOK.addEventListener("click", pressNewcond, {once: true});
    newCondImg.setAttribute("src", "img/newcon/new-con-blue.png");
    newCondH2.innerHTML = "СИНЯЯ СТРЕЛКА";
    newCondText.innerHTML = "С пунктом назначения разберётся удача.<br>Бросьте кубик ещё раз, чтобы определить направление.";
}

function popupNewcondMB() {
    console.log("popupNewcondMB");
    showPopup(newCond, newCondCont, 400, 360);
    newCondOK.addEventListener("click", pressNewcondMB, {once: true});
    newCondImg.setAttribute("src", "img/newcon/new-con-moneybag.png");
    newCondH2.innerHTML = "КОПИЛКА";
    newCondText.innerHTML = "Получайте крупные бонусы, пропуская ходы.<br><br>Ещё никогда моральные дилеммы не были настолько дилемными!";
}

function pressNewcondMB() {
    console.log("pressNewcondMB");
    hidePopup(newCond, newCondCont, false, true);
    setTimeout(popupNewcondHatched, 99);
}

function popupNewcondHatched() {
    console.log("popupNewcondHatched");
    showPopup(newCond, newCondCont, 400, 365);
    newCondOK.addEventListener("click", pressNewcond, {once: true});
    newCondImg.setAttribute("src", "img/newcon/new-con-hatched.png");
    newCondH2.innerHTML = "ЗОНА ЗАХВАТА";
    newCondText.innerHTML = "Возможность проведения <b>сильной атаки.</b><br>Выкиньте соперника с трассы ценой 5 единиц силы!<br><br>Требуется синяя, коричневая или чёрная фишка.";
}

function popupNewcondBones() {
    console.log("popupNewcondBones");
    hidePopup(char, charCont);
    showPopup(newCond, newCondCont, 400, 300);
    newCondOK.addEventListener("click", pressNewcond, {once: true});
    newCondImg.setAttribute("src", "img/newcon/new-con-bones.png");
    newCondH2.innerHTML = "Стрелки с большим содержанием кальция";
    newCondText.innerHTML = "По таким стрелкам могут ходить только черепа.";
}

function popupNewcondSuper() {
    console.log("popupNewcondSuper");
    hidePopup(char, charCont);
    showPopup(newCond, newCondCont, 400, 400, false, true);
    newCondOK.addEventListener("click", pressNewcond, {once: true});
    newCondImg.setAttribute("src", "img/tokens/token-sup.png");
    newCondImg.style.width = "50px";
    newCondH2.innerHTML = "СУПЕР-ФИШКИ";
    newCondText.innerHTML = "Супер-фишки намного сильнее обычных фишек, но слабее черепов.<br><br><b>Попадание на супер-фишку:</b> -1 ед. силы.<br><b>Супер-фишка попадает на Вас:</b> -2 ед. силы, супер-фишка ходит ещё раз.<br><b>Щит снижает урон</b> от супер-фишек на 1 ед. силы.<br><br>Штрих-клетки и разные атаки могут привести к интересным результатам.";
}

// регулярное закрытие со стартом игры
function pressNewcond() {
    console.log("pressNewcond");
    hidePopup(newCond, newCondCont);
    setTimeout(gameStart, 500 * gameSpeed);
}

// КОНТЕКСТНЫЕ ПОПАПЫ (появляются обязательно, но при опр. условиях)

/*
образец добавления контекстного обязательного сообщения

if ( ..... ) { // условие появления
    nextScript = {
        popup: function () {
            // что надо активировать следующим после нажатия кнопки
        }
    };
    // открытие сообщения
    return; // завершение текущей последовательности, если это нужно
}

в нажимаемой кнопке должна быть вызвана функция:
nextScript.popup();

*/

function popupIMPToHuman() {
    console.log("popupIMPToHuman");
    showPopup(char, charCont, 395, 400);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "Наконец-то элитную фишку кто-то купил!<br>Не удивлён, что первым счастливым обладателем оказался ты…<br><br>Кстати, ты прошёл по акции и получаешь НЕВОЗМОЖНЫЙ подарок." + "<i>";
    charArrow.style.display = "none";
    charImg.setAttribute("src", "img/gift.png");
    charImg.style.display = "block";
    charOK.style.width = "158px";
    charOK.innerHTML = "Забрать подарок";
    charOK.addEventListener("click", pressIMPToHuman, {once: true});
}

function pressIMPToHuman() {
    hidePopup(char, charCont, false, true);
    setTimeout(popupIMPGiving, 99);
}

function popupIMPGiving() {
    console.log("popupIMPGiving");
    showPopup(char, charCont, 395, 420);
    charMessage2.innerHTML = "<i>" + "Получи и распишись: это <b>НЕВОЗМОЖНЫЙ кубик!</b><br><br>Он был выкован из струн параллельной вселенной с помощью… квантовых флуктуаций, чё-то там … путем переработки n-мерного пространства… в кварцевый… короче, у него 9 граней! И он теперь твой. Это всё, что тебе надо знать." + "<i>";
    charImg.setAttribute("src", "img/cubic/cubic_9.png");
    charImg.style.margin = "0 auto";
    charOK.style.width = "90px";
    charOK.innerHTML = "OK";
    charOK.addEventListener("click", pressIMPGiving, {once: true});
}

function pressIMPGiving() {
    hidePopup(char, charCont);
    char.classList.remove("zindex-hard");
    charImg.style.display = "none";
    charImg.style.height = "100px";
    cleanInventory();
    fillInventory();
    blockHumanInv(true);
    impGiven = true;
    let action = document.querySelector(".shop__action");
    action.innerHTML = "";
    setTimeout(function () {
        nextScript.popup();
    }, 500 * gameSpeed);
}

function popupIMPToComp() {
    console.log("popupIMPToComp");
    let player;
    for (let i = 0; i < players.length; i++) {
        if (players[i].imp > 0) player = players[i];
    }
    impGiven = true;
    showPopup(char, charCont, 395, 310);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "Эх! <br><b>" + player.label + "</b> первым покупает элитную фишку. Теперь секретный подарок у него! Что это за подарок, он тебе не расскажет. Но его влияние ты однажды почувствуешь." + "<i>";
    charArrow.style.display = "none";
    let imgPath = getTokenImg(player.name);
    charImg.setAttribute("src", imgPath);
    charImg.style.display = "block";
    charImg.style.height = "70px";
    charOK.addEventListener("click", pressIMPGiving, {once: true});
}

function popupMOPToHuman() {
    console.log("popupMOPToHuman");
    showPopup(char, charCont, 395, 400);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "А вот и <b>победитель!</b><br><br>Ты набрал больше всех денег, поэтому, прими от нас этот ВЕЛИКОЛЕПНЫЙ подарок." + "<i>";
    charArrow.style.display = "none";
    charImg.setAttribute("src", "img/gift.png");
    charImg.style.display = "block";
    charOK.style.width = "158px";
    charOK.innerHTML = "Забрать подарок";
    charOK.addEventListener("click", pressMOPToHuman, {once: true});
}

function pressMOPToHuman() {
    hidePopup(char, charCont, false, true);
    setTimeout(popupMOPGiving, 99);
}

function popupMOPGiving() {
    console.log("popupMOPGiving");
    showPopup(char, charCont, 395, 433);
    charMessage2.innerHTML = "<i>" + "Знакомься: это – <b>швабра</b>. Правда, она ВЕЛИКОЛЕПНО выглядит?..<br><br>Что? Чего приуныл? Вижу, это совсем не то, чего ты ожидал? Попробуй швабру в действии – и сам убедишься, что она - просто огонь.<br><br>Хотя, лучше не спеши пробовать. Швабра одноразовая. Сто раз подумай, прежде чем использовать её." + "<i>";
    charImg.setAttribute("src", "img/inv-mop.png");
    charImg.style.margin = "0 auto";
    charImg.style.height = "65px";
    charOK.style.width = "90px";
    charOK.innerHTML = "OK";
    charOK.addEventListener("click", pressMOPGiving, {once: true});
}

function pressMOPGiving() {
    hidePopup(char, charCont);
    char.classList.remove("zindex-hard");
    charImg.style.display = "none";
    charImg.style.height = "100px";
    popupMap06End();
}

function popupMOPToComp() {
    console.log("popupMOPToComp");
    let player;
    for (let i = 0; i < players.length; i++) {
        if (players[i].mop) player = players[i];
    }
    showPopup(char, charCont, 395, 370);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "Вот и победитель!<br><b>" + player.label + "</b> набрал больше всех денег.<br><br>А для тебя у меня отличные новости: ты прошляпил ВЕЛИКОЛЕПНЫЙ подарок! Теперь он достался <b>" + player.label + "</b>. Уверен, эта штука попала в прямые руки." + "<i>";
    charArrow.style.display = "none";
    let imgPath = getTokenImg(player.name);
    charImg.setAttribute("src", imgPath);
    charImg.style.display = "block";
    charImg.style.height = "70px";
    charOK.addEventListener("click", pressMOPGiving, {once: true});
}

// РАЗНОЕ

function hintAction() {
    console.log("hintAction");
    showPopup(char, charCont, 440, 460, true, true);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "Эй, бойцы! Вы вообще собираетесь крутые фишки покупать?<br><br>Там продавец извёлся уже весь. Говорит, надо кормить десятерых детей! Он до того отчаялся, что объявил НЕВОЗМОЖНУЮ акцию!<br><br>Тому, кто первым купит коричневую или чёрную фишку, он отдаст БЕСПЛАТНО один <b>мощнейший артефакт.</b> По преданию, чтобы этот артефакт достать из параллельного измерения, 125 бравых бойцов старой Империи пожертвовали своими головами.<br><br>Так что … Налетай! Торопись! Покупай… шикарную продукцию от многодетного отца!" + "<i>";
    charArrow.style.display = "none";
    charOK.addEventListener("click", pressHintActionClose, {once: true});
}

function pressHintActionClose() {
    hidePopup(char, charCont, true);
    char.classList.remove("zindex-hard");
    showAction();
    knowAction = true;
    setTimeout(hintShield, 99);
}

function showAction() {
    let action = document.querySelector(".shop__action");
    action.innerHTML = "<span>" + "АКЦИЯ!" + "</span>" +  " Купи любую элитную фишку ПЕРВЫМ, и получи НЕВОЗМОЖНЫЙ подарок!";
    document.querySelector(".shop__action span").classList.add("span__red");
}

function popupHalfway() {
    console.log("hintHalfway");
    showPopup(char, charCont, 395, 310);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "Прыгуны!<br>Пройдена уже половина пути. Осталось всего 3 трассы, чтобы получить <b>ВЕЛИКОЛЕПНЫЙ секретный подарок!</b> Напомню, что для этого надо стать первым по деньгам.<br><br>За вас болеет вся Империя и мой кот Бубенчик. Не подведите!" + "<i>";
    charArrow.style.display = "none";
    charOK.addEventListener("click", pressHalfway, {once: true});
}

function pressHalfway() {
    char.classList.remove("zindex-hard");
    hidePopup(char, charCont, false, true);
    setTimeout(popupNewcondBonus, 99);
}

function popupMap06News() {
    console.log("popupMap06News");
    showPopup(char, charCont, 395, 385);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "Тревожные новости пришли с фронта.<br>Три зловредные <b>супер-фишки</b> похитили белую фишку, дочку премьер-министра, и просят за неё выкуп…<br><br>Похоже, что вы четверо со своими навыками силы отлично подойдёте для спасательной миссии! Мы разведаем больше информации об этом дерзком похищении и разработаем план.<br><br>Держим в курсе, а вы пока продолжайте чемпионат." + "<i>";
    charArrow.style.display = "none";
    charOK.addEventListener("click", pressMap06News, {once: true});
}

function pressMap06News() {
    console.log("pressMap06News");
    char.classList.remove("zindex-hard");
    hidePopup(char, charCont, false, true);
    setTimeout(popupNewcondBlue, 99);
}

function popupMap06End() {
    console.log("popupMap06End");
    showPopup(char, charCont, 430, 515);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "Я по поводу той ситуации с похищением. В общем, так...<br><br>Белую фишку удерживают в замке супер-фишек в <b>костяном мире</b> под мощной охраной. Это очень опасное место, через которое будет непросто прорваться. Нельзя проникать в замок всей толпой. Лучше скрытно обойти всю их защиту, поэтому кто-то один должен прорваться внутрь. Остальные будут прикрывать снаружи.<br><br>Вы вчетвером отправляетесь в далекое путешествие в сторону костяного мира! В замок пойдёт <b>только один</b>, самый лучший прыгун, набравший наибольшее число призовых денег.<br><br>Вся Империя будет молиться за вас." + "<i>";
    charArrow.style.display = "none";
    charOK.addEventListener("click", popupMap06End2, {once: true});
}

function popupMap06End2() {
    console.log("popupMap06End2");
    showPopup(char, charCont, 395, 285, false, true);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "Раз уж такое дело, держите каждый персонально от меня по <b>магниту и щиту</b>! В дороге пригодится." + "<i>";
    charImg.setAttribute("src", "img/inv-magnet-shield.png");
    charImg.style.display = "block";
    charImg.style.height = "60px";
    charOK.addEventListener("click", pressMap06End2, {once: true});
}

function pressMap06End2() {

    for (let i = 0; i < players.length; i++) {
        let magnets = players[i].magnets + players[i].smagnets;
        let shields = players[i].shields + players[i].ishields;
        if (magnets < 3 && shields < 3) {
            players[i].magnets++;
            players[i].shields++;
        } else {
            if (magnets < 3) {
                players[i].magnets++;
            } else {
                players[i].shields++;
            }
        }
    }

    charImg.style.display = "none";
    cleanInventory();
    fillInventory();
    blockHumanInv(true);
    pressCloseBeforeShop();
}

function pressCloseBeforeShop() {
    console.log("pressCloseBeforeShop");
    char.classList.remove("zindex-hard");
    hidePopup(char, charCont);
    popupShop();
}

function popupMap05Warning() {
    console.log("popupMap05Warning");
    showPopup(char, charCont, 395, 280);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "Впереди последняя трасса чемпионата!<br><br>Победит игрок, набравший <b>наибольшее число денег.</b> При равном количестве денег будет учитываться модель фишки.<br><br>Учти это, когда будешь совершать покупки." + "<i>";
    charArrow.style.display = "none";
    charOK.addEventListener("click", pressCloseBeforeShop, {once: true});
}

function popupMap09() {
    console.log("popupMap09");
    showPopup(char, charCont, 395, 350);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "Вы очень бодро пробираетесь через малоизученные земли Империи. Смотрю, уже добрались до подножия Великого вулкана! А там и до костяного мира недалеко.<br><br>Хорошие новости: наш военный штаб пообещал вознаграждение прыгуну, который вызволит белую фишку из плена. Их щедрость не знает границ: прыгун получит <b>5000$!</b>" + "<i>";
    charArrow.style.display = "none";
    charOK.addEventListener("click", pressCloseBeforeRace, {once: true});
}

function popupMap09End() {
    console.log("popupMap09End");
    showPopup(char, charCont, 395, 240);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "Как дела, прыгуны?<br><br>Чтобы преодолеть Великий вулкан, придётся идти сквозь его жерло. Приготовьте свои магниты!" + "<i>";
    charArrow.style.display = "none";
    charOK.addEventListener("click", pressCloseBeforeShop, {once: true});
}

function popupMap10End() {
    console.log("popupMap10End");
    showPopup(char, charCont, 430, 490);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "Внимание, прыгуны! Впереди <b>финальная трасса</b> – это бешеный спуск по склону вулкана в костяной мир. Трасса очень опасна и пожирает силу в больших количествах. За первое место дадим <b>" + Map11param.prize1 +"$</b><br><br>Чемпионом станет прыгун, у которого будет <b>больше сумма денег.</b><br><br>Вы можете <b>обновить фишку</b>, чтобы увеличить шансы на победу, но тогда у вас останется мало денег. Их может не хватить для титула чемпиона!<br><br>Вы можете <b>не обновлять фишку</b>, сэкономив деньги, но так вы рискуете занять последнее место и получить мало денег.<br><br>Выбор за вами." + "<i>";
    charArrow.style.display = "none";
    charOK.addEventListener("click", pressCloseBeforeShop, {once: true});
}

// регулярное закрытие попапа перед трассой

function pressCloseBeforeRace() {
    console.log("pressCloseBeforeRace");
    hidePopup(char, charCont);
    setTimeout(gameStart, 500 * gameSpeed);
}

// ФИНАЛ 11 трассы - ПОРАЖЕНИЕ

function popupMap11Lose() {
    console.log("popupMap11Lose");
    showPopup(char, charCont, 395, 265);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + winner.label + " набирает больше всех<br>денег: <b>$ " + winner.capital + "</b>, теперь это наш Чемпион!" + "<i>";
    charArrow.style.display = "none";
    charImg.setAttribute("src", winnerImg);
    charImg.style.display = "block";
    charImg.style.height = "70px";
    charOK.addEventListener("click", popupMap11LoseSaid, {once: true});
}

function popupMap11LoseSaid() {
    console.log("popupMap11LoseSaid");
    hidePopup(char, charCont);
    charImg.setAttribute("src", "img/jumpers-cup.png");
    charImg.style.display = "block";
    charImg.style.height = "80px";
    charCloud.setAttribute("src", winnerImg);
    charCloud.style.width = "50px";
    charCloud.style.margin = "54px 0 0 -19px";
    charMessage1.style.display = "block";
    charMessage1.innerHTML = "А вот что говорит " + winner.label + " по поводу своей победы:";
    charH2.innerHTML = winner.label.toUpperCase() + ":";
    charMessage2.innerHTML = "<i>" + getFinalPhrase(winner) + "<i>";
    if (winner.label === "Киберпанк") {
        char.style.background = "#fcf604";
    }
    showPopup(char, charCont, 395, 345, false, true);
    charOK.addEventListener("click", popupMap11LosePaid, {once: true});
}

function popupMap11LosePaid() {
    console.log("popupMap11LosePaid");
    hidePopup(char, charCont);
    charCloud.setAttribute("src", "img/chars/char-emperor.png");
    charCloud.style.width = "120px";
    charCloud.style.margin = "-48px 0 0 -53px";
    charMessage1.style.display = "none";
    charH2.innerHTML = "ИМПЕРАТОР:";
    charMessage2.innerHTML = "<i>" + "Очень жаль, но ты недостаточно изворотлив и силён для вылазки в костяной мир. На задание пойдёт наш Чемпион.<br><br>А ты можешь помочь команде, если профинансируешь дорогостоящее оборудование для спасательной миссии. Мы не заставляем! Дело добровольное." + "<i>";
    charMessage3.style.display = "block";
    charMessage3.innerHTML = "<br><b>Отдать 300 $ на финансирование спасательной операции?</b>";
    charCancel.style.display = "block";
    char.style.background = "#D6FFD2";
    charImg.style.display = "none";
    charOK.innerHTML = "Да";
    charOK.addEventListener("click", popupMap11LoseOK);
    charCancel.addEventListener("click", popupMap11LoseCancel);
    showPopup(char, charCont, 395, 400, false, true);
}

function popupMap11LoseOK() {
    console.log("popupMap11LoseOK");
    hidePopup(char, charCont);
    charMessage3.style.display = "none";
    charOK.innerHTML = "OK";
    charOK.removeEventListener("click", popupMap11LoseOK);
    charCancel.style.display = "none";
    charMessage2.innerHTML = "<i>" + "Спасибо, прыгун!<br><br>Устройство, которым мы снабдили нашего Чемпиона, очень помогло ему в бою. " + winner.label + " возвращается назад с дочкой премьер-министра и получает звание героя Империи.<br><br>Мы общими усилиями покорили костяной мир! Ура!!!" + "<i>";
    showPopup(char, charCont, 395, 340, false, true);
    players[3].capital -= 300;
    charOK.addEventListener("click", popupMap11LoseRank, {once: true});
}

function popupMap11LoseCancel() {
    console.log("popupMap11LoseCancel");
    hidePopup(char, charCont);
    charMessage3.style.display = "none";
    charOK.innerHTML = "OK";
    charOK.removeEventListener("click", popupMap11LoseOK);
    charCancel.style.display = "none";
    setTimeout(function () {
        charCloud.setAttribute("src", "img/chars/char-emperor-fuu.png");
    }, 500);
    charMessage2.innerHTML = "<i>" + "ААА НЕТ! Ну почему ты не заплатил??? Кто тебя надоумил отказаться?!<br><br>Дочка премьер-министра остаётся в костяном мире, а " + winner.label + " пропадает без вести…<br><br>Ты больше не прыгун.<br>Я больше с тобой не дружу... Фи." + "<i>";
    showPopup(char, charCont, 395, 300, false, true);
    charOK.addEventListener("click", popupMap11LoseRank, {once: true});
}

function popupMap11LoseRank() {
    hidePopup(char, charCont);
    resetPopupCharacters();
    cleanInventory();
    createRatingRow(players[3]);
    localStorage.setItem("jumpers-rating", JSON.stringify(ratingMass));
    gameSave("over");
    popupRating("end");
}

// ФИНАЛ 11 трассы - ПОБЕДА

function popupMap11Win() {
    console.log("popupMap11Win");
    showPopup(char, charCont, 395, 375);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    if (players[3].model === "black") {
        charMessage2.innerHTML = "<i>" + "Поздравляю, прыгун! Ты победил и заработал титул <b>Чемпиона!</b><br><br>Также ты получаешь особый приз! <b>" + costBlack + " $</b>" + "<i>";
        players[3].capital += costBlack;
    } else {
        charMessage2.innerHTML = "<i>" + "Поздравляю, прыгун! Ты победил и заработал титул <b>Чемпиона!</b><br><br>Также ты получаешь особый приз: <b>элитную чёрную фишку!</b>" + "<i>";
        players[3].model = "black";
    }
    charArrow.style.display = "none";
    charImg.setAttribute("src", "img/jumpers-cup.png");
    charImg.style.display = "block";
    charImg.style.height = "120px";
    charOK.addEventListener("click", popupMap11WinRep, {once: true});
}

function popupMap11WinRep() {
    console.log("popupMap11WinRep");
    hidePopup(char, charCont);
    charImg.setAttribute("src", "img/rep.png");
    charImg.style.height = "60px";
    charMessage2.innerHTML = "<i>" + "Твоя репутация повышена!<br>Прими от нас эту восхитительную звезду." + "<i>";
    showPopup(char, charCont, 395, 265, false, true);
    charOK.addEventListener("click", popupMap11WinNext, {once: true});
}

function popupMap11WinNext() {
    console.log("popupMap11WinNext");
    reputation = 1;
    refreshRep();
    hidePopup(char, charCont);
    charImg.style.display = "none";
    charMessage2.innerHTML = "<i>" + "Твои приключения на этом не заканчиваются. Скоро ты отправишься в путь до замка, который находится в <b>костяном мире!</b><br><br>Тебе предстоит проникнуть внутрь, сбежать от неубиваемых стражей-черепов и спасти белую фишку - дочку премьер-министра. Её до сих пор удерживают три супер-фишки.<br><br>В случае успеха ты получишь гонорар <b>$5000.</b>" + "<i>";
    showPopup(char, charCont, 395, 380, false, true);
    charOK.addEventListener("click", popupMap11WinGift, {once: true});
}

function popupMap11WinGift() {
    console.log("popupMap11WinGift");
    hidePopup(char, charCont);
    charMessage2.innerHTML = "<i>" + "Мы дарим тебе в путь одно инновационное устройство. Оно сложно называется, но… ты уж прости наших учёных-умников.<br><br>Эта штука поможет замедлить врагов." + "<i>";
    newItem("Устройство дистанционной манипуляции зелёным полем", "img/inv-manipulator.png", true);
    players[3].manipulator = true;
    showPopup(char, charCont, 395, 400, false, true);
    charOK.addEventListener("click", popupMap11WinGeneral, {once: true});
}

function popupMap11WinGeneral() {
    console.log("popupMap11WinGeneral");
    document.querySelector(".info__cont").style.display = "none";
    resetPopupCharacters();
    hidePopup(char, charCont);
    showPopup(char, charCont, 395, 370, false, true);
    charMessage2.innerHTML = "<i>" + "Приветствую, Чемпион!<br>Я – <b>генерал Песец</b>, гроза костяного мира. Просто чтоб ты знал: генералом меня назначили после того, как я в одиночку расправился с двумя супер-фишками, уворачиваясь от толпы разъярённых черепов.<br><br>Прошу бояться и уважать.<br><br>Будешь бояться и не уважать – не угощу пивом." + "<i>";
    addCharGeneral(true);
    charOK.addEventListener("click", popupMap11WinArm, {once: true});
}

function popupMap11WinArm() {
    console.log("popupMap11WinArm");
    showPopup(char, charCont, 395, 350);
    charMessage2.innerHTML = "<i>" + "Твоя победа в имперском чемпионате показывает, что ты хороший боец. А любому хорошему бойцу нужно хорошее вооружение.<br><br>Держи! Пригодится." + "<i>";
    char.classList.add("zindex-hard");
    addCharGeneral();
    let magnets = players[3].magnets + players[3].smagnets;
    let shields = players[3].shields + players[3].ishields;
    if (magnets < 3 && shields < 3) {
        players[3].magnets++;
        players[3].shields++;
    } else {
        if (magnets < 3) {
            players[3].magnets++;
        } else {
            players[3].shields++;
        }
    }
    charImg.setAttribute("src", "img/inv-magnet-shield.png");
    charImg.style.display = "block";
    charImg.style.height = "60px";
    charOK.addEventListener("click", pressMap11WinArm, {once: true});
}

function pressMap11WinArm() {
    console.log("pressMap11WinArm");
    charImg.style.display = "none";
    cleanInventory();
    fillInventory();
    blockHumanInv(true);
    hidePopup(char, charCont);
    popupMap11WinShop();
}

function popupMap11WinShop() {
    console.log("popupMap11WinShop");
    hidePopup(char, charCont);
    popupShop();
    showPopup(char, charCont, 395, 300, true, true);
    charMessage2.innerHTML = "<i>" + "Ничего не забыл? Если что-то надо купить, сделай это сейчас. Другой возможности не будет.<br><br>Чтобы получить мою консультацию, щёлкай по знакам вопроса." + "<i>";
    char.classList.add("zindex-hard");
    addCharGeneral();
    charImg.setAttribute("src", "img/askme.png");
    charImg.style.display = "block";
    charImg.style.height = "35px";
    charOK.addEventListener("click", pressHintItem, {once: true});
}

// подсказки генерала в магазине

function activateAskGeneral() {
    let btn = document.querySelectorAll(".shop__ask");
    btn.forEach(function (item) {
        item.style.display = "block";
    });
    if (!players[3].mop) {
        document.querySelector(".shop__ask--mop").style.display = "none";
    }
}

function deactivateAskGeneral() {
    let btn = document.querySelectorAll(".shop__ask");
    btn.forEach(function (item) {
        item.style.display = "none";
    });
}

document.querySelector(".shop__ask--magnet").addEventListener("click", function () {
    console.log("Генерал поясняет за магниты");
    showPopup(char, charCont, 395, 230, true);
    charMessage2.innerHTML = "<i>" + "Магниты – хороший выбор. Будешь точнее в своих движениях. Особенно если комбинировать с другими условиями и предметами." + "<i>";
    char.classList.add("zindex-hard");
    addCharGeneral();
    charOK.addEventListener("click", pressHintItem, {once: true});
});

document.querySelector(".shop__ask--shield").addEventListener("click", function () {
    console.log("Генерал поясняет за щиты");
    showPopup(char, charCont, 395, 230, true);
    charMessage2.innerHTML = "<i>" + "Щиты снижают урон от супер-фишек на<br>1 ед. силы. От черепов щит не спасёт. Череп – это мгновенная смерть!" + "<i>";
    char.classList.add("zindex-hard");
    addCharGeneral();
    charOK.addEventListener("click", pressHintItem, {once: true});
});

document.querySelector(".shop__ask--vampire").addEventListener("click", function () {
    console.log("Генерал поясняет за вампира");
    showPopup(char, charCont, 395, 230, true);
    charMessage2.innerHTML = "<i>" + "Вампирские клыки?.. Их ещё не тестировали в костяном мире. Неизвестно, помогут ли они вообще, поэтому, используй на свой страх и риск." + "<i>";
    char.classList.add("zindex-hard");
    addCharGeneral();
    charOK.addEventListener("click", pressHintItem, {once: true});
});

document.querySelector(".shop__ask--mop").addEventListener("click", function () {
    console.log("Генерал поясняет за швабру");
    showPopup(char, charCont, 395, 230, true);
    charMessage2.innerHTML = "<i>" + "Швабра? Не смешите мои тапочки! Смело продавай. Чтобы двигать поля в костяном мире, нужны штуки помощнее. Например, манипулятор." + "<i>";
    char.classList.add("zindex-hard");
    addCharGeneral();
    charOK.addEventListener("click", pressHintItem, {once: true});
});

document.querySelector(".shop__ask--imp").addEventListener("click", function () {
    console.log("Генерал поясняет за невозможный кубик");
    showPopup(char, charCont, 395, 230, true);
    charMessage2.innerHTML = "<i>" + "Невозможный кубик с 9-ю гранями… Вещь! Обязательно бери. В сочетании с молнией или супер-магнитами - просто бомба." + "<i>";
    char.classList.add("zindex-hard");
    addCharGeneral();
    charOK.addEventListener("click", pressHintItem, {once: true});
});

document.querySelector(".shop__ask--trap").addEventListener("click", function () {
    console.log("Генерал поясняет за капкан");
    showPopup(char, charCont, 395, 230, true);
    charMessage2.innerHTML = "<i>" + "Капкан сможет замедлить противников ненадолго. Не жди от него финансовой выгоды - жители костяного мира ничего не знают про деньги." + "<i>";
    char.classList.add("zindex-hard");
    addCharGeneral();
    charOK.addEventListener("click", pressHintItem, {once: true});
});

document.querySelector(".shop__ask--man").addEventListener("click", function () {
    console.log("Генерал поясняет за манипулятор");
    showPopup(char, charCont, 395, 230, true);
    charMessage2.innerHTML = "<i>" + "Устройство незаменимо в костяном мире! Почувствуй кайф от осознания, что в зелёные ямы будут проваливаться они, а не ты." + "<i>";
    char.classList.add("zindex-hard");
    addCharGeneral();
    charOK.addEventListener("click", pressHintItem, {once: true});
});

// сообщения во время супер-игры

function popupMap12() {
    console.log("popupMap12");
    showPopup(char, charCont, 395, 373);
    char.classList.add("zindex-hard");
    charMessage2.innerHTML = "<i>" + "Избегай черепов любыми способами! Если попадёшь под его челюсти, то лишишься 1 единицы силы, а всего у тебя 10 единиц на <b>ВЕСЬ</b> путь до замка.<br><br>Перемещай зелёные клетки под ноги врагам.<br><br>Экономь магниты.<br><br>Не трать щиты – здесь они, пока что, бесполезные." + "<i>";
    addCharGeneral();
    charOK.addEventListener("click", pressCloseBeforeRace, {once: true});
}

function popupMap13() {
    console.log("popupMap13");
    showPopup(char, charCont, 395, 255);
    char.classList.add("zindex-hard");
    charMessage2.innerHTML = "<i>" + "Ну как тебе приключение?<br>Ещё не обделался?<br>Если нет, то приготовься к суровому испытанию в запутанном лесу. Оно для настоящих солдат… Да-да, прям для тебя." + "<i>";
    addCharGeneral();
    charOK.addEventListener("click", pressCloseBeforeRace, {once: true});
}

function popupMap14() {
    console.log("popupMap14");
    showPopup(char, charCont, 395, 335);
    char.classList.add("zindex-hard");
    charMessage2.innerHTML = "<i>" + "Поздравляю! Самый сложный участок позади.<br><br>Но расслабляться рано: впереди ещё одно поле перед входом в замок. Череп тут, как заводной, ходит по кругу в одну сторону. Иногда кажется, что он просто тупой… Хотя, на самом деле, у него своя тактика. Я бы на твоём месте держал хвост трубой." + "<i>";
    addCharGeneral();
    charOK.addEventListener("click", popupMagnetPresent, {once: true});
}

function popupMagnetPresent() {
    console.log("popupMagnetPresent");
    hidePopup(char, charCont);
    showPopup(char, charCont, 395, 350, false, true);
    charMessage2.innerHTML = "<i>" + "Мы нашли способ перебрасывать гуманитарную помощь… катапультой! Много припасов таким путём не доставишь, поэтому в будущем мы постараемся наладить курьерскую доставку.<br><br>Держи презент." + "<i>";
    char.classList.add("zindex-hard");
    addCharGeneral();
    charImg.setAttribute("src", "img/inv-magnet.png");
    charImg.style.display = "block";
    charImg.style.height = "50px";
    charOK.addEventListener("click", pressMagnetPresent, {once: true});
}

function pressMagnetPresent() {
    console.log("pressMagnetPresent");
    charImg.style.display = "none";
    if (players[3].magnets + players[3].smagnets < 3) {
        players[3].magnets++;
        cleanInventory();
        fillInventory();
        invMagnetsBlock();
    }
    hidePopup(char, charCont);
    popupNewcondBones();
}

function popupMap14End() {
    console.log("popupMap14End");
    showPopup(char, charCont, 395, 288);
    char.classList.add("zindex-hard");
    charMessage2.innerHTML = "<i>" + "Вот это прорыв, которого я так долго ждал! Держи от меня вторую <b>звезду</b> – вполне заслуженно.<br>Неплохие погоны получаются." + "<i>";
    addCharGeneral();
    charImg.setAttribute("src", "img/rep.png");
    charImg.style.height = "60px";
    charImg.style.display = "block";
    charOK.addEventListener("click", popupPowerRestored, {once: true});
}

let restore = document.querySelector(".js-restore");
let restoreCont = document.querySelector(".js-restore .js-popup-content");
document.querySelector(".js-restore .js-popup-ok").addEventListener("click", function () {
    console.log("pressPowerRestored");
    hidePopup(restore, restoreCont);
    switchMaps();
    setUpField();
    setTimeout(function () {
        loadMap(curMap, curMapParam);
    }, 500 * gameSpeed);
});

function popupPowerRestored() {
    console.log("pressMap14End");
    hidePopup(char, charCont);
    reputation = 2;
    refreshRep();
    charImg.style.display = "none";
    showPopup(restore, restoreCont, 310, 210);
    players[3].power = 10;
    refreshPowercells();
}

function popupItemsHelp() {
    console.log("popupItemsHelp");
    showPopup(char, charCont, 395, 350);
    charMessage2.innerHTML = "<i>" + "Бравый курьер, который вёз тебе кучу магнитов, щитов, капканов и клыков, угодил в зелёную яму со злобной черепушкой. Вернулся весь покусанный и без груза. Так что, держи презент с нашей надёжной катапульты." + "<i>";
    char.classList.add("zindex-hard");
    addCharGeneral();
    let magnets = players[3].magnets + players[3].smagnets;
    let shields = players[3].shields + players[3].ishields;
    if (magnets < 3 && shields < 3) {
        players[3].smagnets++;
        players[3].ishields++;
    } else {
        if (magnets < 3) {
            players[3].smagnets++;
        } else {
            players[3].ishields++;
        }
    }
    charImg.setAttribute("src", "img/inv-smagnet-ishield.png");
    charImg.style.display = "block";
    charImg.style.height = "60px";
    charOK.addEventListener("click", pressItemsHelp, {once: true});
}

function pressItemsHelp() {
    console.log("pressItemsHelp");
    charImg.style.display = "none";
    cleanInventory();
    fillInventory();
    blockHumanInv(true);
    hidePopup(char, charCont);
    popupMap15();
}

function popupMap15() {
    console.log("popupMap15");
    showPopup(char, charCont, 395, 467, false, true);
    char.classList.add("zindex-hard");
    charMessage2.innerHTML = "<i>" + "Ты проник в замок, перевёл дыхание, затаившись погребе, и пробрался в логово опасных <b>супер-фишек.</b><br><br>Настало время <b>щитов!</b> Применяй их как обычно, между ходами.<br><br>Постарайся не ввязываться в драку.<br><br>Следи за <b>силой.</b> Нельзя, чтобы она кончилась.<br><br>Камера с пленницей находится в конце пути. Супер-фишки <b>ни в коем случае</b> не должны дойти до неё первыми.<br><br>Удачи, боец!" + "<i>";
    addCharGeneral();
    charOK.addEventListener("click", popupNewcondSuper, {once: true});
}

function popupSkullDanger() {
    console.log("popupSkullDanger");
    showPopup(char, charCont, 395, 222);
    charMessage2.innerHTML = "<i>" + "Ну, это уже ни в какие ворота!<br>Больше права на ошибку нет. Ещё хоть раз нарвёшься на черепушку или плохую клетку – тебе кирдык." + "<i>";
    addCharGeneral();
    charOK.addEventListener("click", pressSkullOK, {once: true});
}

function popupSkullBite() {
    console.log("popupSkullBite");
    showPopup(char, charCont, 395, 240);
    charMessage2.innerHTML = "<i>" + "Печальное зрелище!<br>Как говорил мой дед, если споткнулся и упал – это нормально. Ненормально, когда продолжаешь лежать. Так что, руки в ноги, и продолжай борьбу." + "<i>";
    addCharGeneral();
    firstBite = false;
    charOK.addEventListener("click", pressSkullOK, {once: true});
}

function popupSkullSecond() {
    console.log("popupSkullSecond");
    showPopup(char, charCont, 395, 250);
    charMessage2.innerHTML = "<i>" + "Кажись, дело запахло керосином!<br>Боец, не отчаивайся. Затяни ремень потуже. Попробуй другую тактику. Используй ресурсы только там, где они будут эффективны.<br>Удачи!" + "<i>";
    addCharGeneral();
    secondBite = false;
    charOK.addEventListener("click", pressSkullOK, {once: true});
}

function popupJailSuper() {
    console.log("popupJailSuper");
    showPopup(char, charCont, 395, 263);
    charMessage2.innerHTML = "<i>" + "Какой ужас! Они ликвидировали пленницу!..<br><br>Дочки премьер-министра больше нет… Вся Империя погрузится в траур на целый месяц. Надо было отправлять другого прыгуна." + "<i>";
    addCharGeneral();
    char.style.top = "-117px";
    charOK.addEventListener("click", endGame, {once: true});
}

function popupJailHuman() {
    console.log("popupJailHuman");
    showPopup(char, charCont, 395, 284);
    charMessage2.innerHTML = "<i>" + "Ты добрался! Невероятно! Держи звезду.<br><br>Остаётся сопроводить пленницу до выхода. Это будет несложно." + "<i>";
    addCharGeneral();
    char.style.top = "-146px";
    charImg.setAttribute("src", "img/rep.png");
    charImg.style.height = "60px";
    charImg.style.display = "block";
    setTimeout(function () {
        reputation = 3;
        refreshRep();
    }, 600);
    charOK.addEventListener("click", riseBomb, {once: true});
}

function popupJailBomb() {
    console.log("popupJailBomb");
    showPopup(char, charCont, 395, 210);
    charMessage2.innerHTML = "<i>" + "Так! Спокойно… Без резких движений…<br><br>Вам придётся поспешить, пока весь замок не взорвался." + "<i>";
    addCharGeneral();
    char.style.top = "-75px";
    charImg.style.display = "none";
    charOK.addEventListener("click", startEscape, {once: true});
}

function popupUserWinsHostageLose() {
    console.log("popupUserWinsHostageLose");
    showPopup(char, charCont, 432, 455);
    charMessage2.innerHTML = "<i>" + "Как говорил мой дед, чуть-чуть не считается!<br>Знаешь… если ты хотел перепрыгнуть яму, но чуть-чуть не допрыгнул, то не важно, насколько сильно ты старался. Ты всё равно в яме!<br><br>Пленница осталась в замке и погибла от взрыва бомбы. Вся Империя погрузится в траур на целый месяц.<br><br><b>Звезду</b> я выдам целиком, а вот <b>гонорар</b> сокращу. Хотя бы твои руки-ноги целы, и на том спасибо." + "<i>";
    addCharGeneral();
    charImg.setAttribute("src", "img/rep.png");
    charImg.style.height = "60px";
    charImg.style.display = "block";
    pressSkullOKNext = {
        script: function () {
            reputation = 4;
            refreshRep();
            popupRank();
        }
    }
    charOK.addEventListener("click", pressSkullOK, {once: true});
}

function popupWinJumpers() {
    console.log("popupWinJumpers");
    showPopup(char, charCont, 432, 334);
    charMessage2.innerHTML = "<i>" + "Так держать, Чемпион!<br>Ты выжил в неравной схватке с противником и спас пленницу. Дочка премьер-министра в безопасности.<br><br>Держи сразу две звезды на погоны." + "<i>";
    addCharGeneral();
    charImg.setAttribute("src", "img/rep-double.png");
    charImg.style.height = "60px";
    charImg.style.display = "block";
    pressSkullOKNext = {
        script: function () {
            reputation = 5;
            refreshRep();
            popupRank();
        }
    }
    charOK.innerHTML = "КРУТО!";
    charOK.addEventListener("click", pressSkullOK, {once: true});
}

function popupMap15End1() {
    console.log("popupMap15End1");
    showPopup(char, false, 1, 1);
    addCharGeneral();
    charMessage2.innerHTML = "<i>" + "Теперь поболтаем с глазу на глаз.<br>Открою маленький секрет. Я хотел назначить тебя полковником, но в последний момент передумал. Слишком ты крутой прыгун! Ещё на моё место будешь метить.<br>Поэтому обойдёшься гонораром в $5000.<br>Договорились?..<br>Договорились.<br><br>Кстати… держи обещанное пиво." + "<i>";
    setTimeout(function () {
        charCloud.setAttribute("src", "img/chars/char-general-smile.png");
    }, 1000);
    setTimeout(function () {
        showPopup(char, charCont, 427, 446);
    }, 2400);
    setTimeout(function () {
        charImg.style.display = "block";
        charOK.innerHTML = "За победу!";
        charOK.addEventListener("click", popupMap15End2, {once: true});
    }, 3400);
    charImg.style.display = "none";
    charImg.setAttribute("src", "img/chars/beer.png");
    charImg.style.height = "100px";
}

function popupMap15End2() {
    console.log("popupMap15End2");
    hidePopup(char, charCont);
    resetPopupCharacters();
    showPopup(char, charCont, 395, 220, false, true);
    charMessage2.innerHTML = "<i>" + "Моё почтение, " + players[3].label + "! Провозглашаю тебя <b>героем Империи!</b> Можешь собой гордиться.<br<br>А ещё тебе причитается особая имперская привилегия." + "<i>";
    charOK.innerHTML = "Получить привилегию";
    charOK.style.width = "173px";
    charArrow.style.display = "none";
    charOK.addEventListener("click", popupMap15End3, {once: true});
}

function popupMap15End3() {
    console.log("popupMap15End3");
    hidePopup(char, charCont);
    showPopup(char, charCont, 395, 400, false, true);
    charMessage2.innerHTML = "<i>" + "В любой момент ты можешь прийти ко мне на приём и погладить моего кота Бубенчика. Только смотри, против шерсти не гладь, а то он кусается." + "<i>";
    charOK.innerHTML = "OK";
    charImg.setAttribute("src", "img/chars/cat.png");
    charImg.style.height = "170px";
    charOK.style.width = "90px";
    pressSkullOKNext = {
        script: function () {
            gameSave("over");
            endGame();
        }
    }
    setTimeout(function () {
        charOK.addEventListener("click", pressSkullOK, {once: true});
        charImg.style.display = "block";
    }, 1000);
}

let pressSkullOKNext = {
    script: function () {}
}

function pressSkullOK() {
    console.log("pressSkullOK");
    hidePopup(char, charCont);
    pressSkullOKNext.script();
}
