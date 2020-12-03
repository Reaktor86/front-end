// отключаемые подсказки

let hintLine = []; // вставляй сюда строки с названиями функций, которые надо выполнить друг за другом

// то, что должно выполниться по окончании всех подсказок:
// свойство с названием "script" обязательно!!!

let nextScript = {};

// какие подсказки уже высвечивались?

let showedHintLegend = false;
let showedHintRed = false;
let showedHintAttack = false;
let showedHintLog = false;
let showedHintShop = false;
let showedHintMagnet = false;
let showedHintSMagnet = false;
let showedHintShield = false;
let showedHintIShield = false;
let showedHintVampire = false;
let showedHintFore = false;
let showedHintUseMagnet = false;
let showedHintUseShield = false;

function startHintLine() {

    if (skipTutorial == true) {
        hintLine = [];
        nextScript.script();
        return;
    }

    switch (hintLine[0]) {
        case "hintRaceBegin":
            hintRaceBegin();
            break;
        case "hintPedestal":
            hintPedestal();
            break;
        case "hintInfoTable":
            hintInfoTable();
            break;
        case "hintLog":
            hintLog();
            break;
        case "hintLegend":
            hintLegend();
            break;
        case "hintRed":
            hintRed();
            break;
        case "hintAttack":
            hintAttack();
            break;
        case "hintFore":
            hintFore();
            break;
        case "hintUseMagnet":
            hintUseMagnet();
            break;
        case "hintUseShield":
            hintUseShield();
            break;
    }

    hintLine.shift();
}

// закрытие любого персонажного окна с подсказкой

function pressHintClose() {
    console.log("pressHintClose");
    char.classList.remove("zindex-hard");
    overlayHard.style.display = "none";
    hidePopup(char, charCont);
    clearInterval(animArrow);

    if (hintLine.length > 0 && skipTutorial === false) {
        startHintLine();
    } else {
        nextScript.script();
    }
}

// ПОДСКАЗКИ

function hintRaceBegin() {
    console.log("hintRaceBegin");
    showPopup(char, charCont, 395, 176);
    char.style.left = "-221px";
    char.style.top = "256px";
    charMessage2.innerHTML = "<i>" + "Отсюда вы все начинаете гонку. Твоя фишка с буквой " + "<b>" + "D" + "</b>" + "<i>";
    charArrow.style.display = "block";
    charArrow.style.left = "-26px";
    charArrow.style.top = "171px";
    let rot = "rotate(98deg)";
    charArrow.style.transform = rot;
    animArrow = setInterval(animateArrow, 600, rot);
    charOK.addEventListener("click", pressHintClose, {once: true});
}

function hintPedestal() {
    console.log("hintPedestal");
    showPopup(char, charCont, 395, 176);
    char.style.left = "0";
    char.style.top = "-530px";
    charMessage2.innerHTML = "<i>" + "Хочешь блистать на вершине пьедестала? Гони без тормозов!" + "<i>";
    charArrow.style.display = "block";
    charArrow.style.left = "-123px";
    charArrow.style.top = "-4px";
    let rot = "rotate(140deg)";
    charArrow.style.transform = rot;
    animArrow = setInterval(animateArrow, 600, rot);
    charOK.addEventListener("click", pressHintClose, {once: true});
}

function hintInfoTable() {
    console.log("hintInfoTable");
    showPopup(char, charCont, 395, 258);
    char.style.left = "-106px";
    char.style.top = "-421px";
    charMessage2.innerHTML = "<i>" + "Здесь у нас информационное табло.<br>Можно посмотреть, кто на каком месте, цвет фишки, уровень силы и финансовое положение. Стало быть, ты стартуешь 4-м. Фишка у тебя белая, силы 2 единицы, а денег… хм… похоже, что карманы твои дырявые!" + "<i>";
    charArrow.style.display = "block";
    charArrow.style.left = "413px";
    charArrow.style.top = "125px";
    let rot = "rotate(-63deg)";
    charArrow.style.transform = rot;
    animArrow = setInterval(animateArrow, 600, rot);
    charOK.addEventListener("click", pressHintClose, {once: true});
}

function hintLog() {
    console.log("hintLog");
    showPopup(char, charCont, 395, 200);
    createFirstLog();
    showedHintLog = true;
    char.style.left = "-106px";
    char.style.top = "37px";
    charMessage2.innerHTML = "<i>" + "Обращай внимание на текстовую трансляцию. Так ты будешь понимать, что происходит." + "<i>";
    charArrow.style.display = "block";
    charArrow.style.left = "413px";
    charArrow.style.top = "37px";
    let rot = "rotate(-60deg)";
    charArrow.style.transform = rot;
    animArrow = setInterval(animateArrow, 600, rot);
    charOK.addEventListener("click", pressHintClose, {once: true});
}

function hintLegend() {
    console.log("hintLegend");
    hidePopup(help, helpCont, true);
    showPopup(char, charCont, 395, 139);
    char.style.left = "176px";
    char.style.top = "386px";
    charMessage2.innerHTML = "<i>" + "Если забыл, что означают цветные клетки, ты всегда можешь посмотреть легенду." + "<i>";
    charArrow.style.display = "block";
    charArrow.style.left = "347px";
    charArrow.style.top = "150px";
    let rot = "rotate(25deg)";
    charArrow.style.transform = rot;
    animArrow = setInterval(animateArrow, 600, rot);
    charOK.style.display = "none";
    overlaySettings.style.display = "block";
    helpButton.addEventListener("click", pressHintLegends, {once: true});
    charOK.addEventListener("click", pressHintClose, {once: true});
}

function pressHintLegends() {
    console.log("pressHintLegends");
    charOK.style.display = "block";
    overlaySettings.style.display = "none";
    hidePopup(char, charCont);
    helpOk.addEventListener("click", pressHintClose, {once: true});
}

function hintRed() {
    console.log("hintRed");
    showPopup(char, charCont, 395, 259);
    char.style.left = "-486px";
    char.style.top = "3px";
    charMessage2.innerHTML = "<i>" + "Впереди маячит красная клетка.<br>Нарвёшься на такую – улетишь вверх ногами на ближайший чекпойнт! К тому же, потеряешь 1 единицу силы.<br>Кончатся силы – вылетишь с трассы… и будешь весь день полоть мои грядки!" + "<i>";
    charArrow.style.display = "block";
    charArrow.style.left = "154px";
    charArrow.style.top = "-203px";
    let rot = "rotate(-7deg)";
    charArrow.style.transform = rot;
    animArrow = setInterval(animateArrow, 600, rot);
    charOK.addEventListener("click", pressHintClose, {once: true});
}

function hintAttack() {
    console.log("hintAttack");
    showPopup(char, charCont, 395, 220);
    char.style.left = "630px";
    char.style.top = "-327px";
    charMessage2.innerHTML = "<i>" + "На клетке сидит другой игрок. Возможно, их даже больше одного!<br>Атакуй соперника, чтобы пойти ещё раз. Соперник при этом пропустит ход.<br>Во время атаки твоя фишка расходует<br>1 единицу силы." + "<i>";
    charArrow.style.display = "block";
    charArrow.style.left = "275px";
    charArrow.style.top = "231px";
    let rot = "rotate(39deg)";
    charArrow.style.transform = rot;
    animArrow = setInterval(animateArrow, 600, rot);
    charOK.style.display = "none";
    AttackOnceYes.addEventListener("click", pressHintAttack);
    AttackOnceNo.addEventListener("click", pressHintAttack);
}

function pressHintAttack() {
    console.log("pressHintAttack");
    charOK.style.display = "block";
    AttackOnceYes.removeEventListener("click", pressHintAttack);
    AttackOnceNo.removeEventListener("click", pressHintAttack);
    pressHintClose();
}

function hintFore() {
    console.log("hintFore");
    let player = findHuman();
    if (player.place == 4) {
        showPopup(char, charCont, 395, 430);
    } else {
        showPopup(char, charCont, 395, 325);
    }
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "У первого прыгуна " + "<b>" + "ФОРА." + "</b><br><br>" + "В прошлый раз он финишировал первым, поэтому сейчас ходит 3 раза подряд!<br><br>Прыгун на второй позиции ходит 2 раза подряд.<br><br>Последние два опоздуна ходят по 1 разу." + "<i>";
    charArrow.style.display = "none";
    if (player.place == 4) {
        charMessage3.style.display = "block";
        charMessage3.innerHTML = "<i>" + "Я понимаю. Не всем нравится стартовать последним. Поэтому так важно занять первое место! Выиграешь эту гонку - и в следующий раз фора твоя." + "</i>";
        charOK.addEventListener("click", pressHintFore, {once: true});
    }
    charOK.addEventListener("click", pressHintClose, {once: true});
}

function pressHintFore() {
    charMessage3.style.display = "none";
}

// подсказки на использование предметов

let invHint = document.querySelector(".js-inv-hint");
let invHintCont = document.querySelector(".js-inv-hint .js-popup-content");
let invHintText = document.querySelector(".js-inv-hint .inv-hint__text");
let invHintArrow = document.querySelector(".js-inv-hint .inv-hint__arrow");
document.querySelector(".js-inv-hint .js-button-ok").addEventListener("click", pressHintUseClose);

function hintUseMagnet() {
    console.log("hintUseMagnet");
    invHint.style.right = "23%";
    invHint.style.top = "59%";
    invHint.style.borderBottomLeftRadius = "120px";
    invHint.style.borderBottomRightRadius = "20px";
    invHintText.innerHTML = "Теперь можно использовать магнит! Чтобы сделать ход с магнитом, щёлкните здесь.";
    showPopup(invHint, invHintCont, 390, 175);
    invHintArrow.style.display = "block";
    invHintArrow.style.left = "-19px";
    invHintArrow.style.top = "167px";
    let rot = "rotate(78deg)";
    invHintArrow.style.transform = rot;
    animUseArrow = setInterval(animateUseArrow, 600, rot);
}

function hintUseShield() {
    console.log("hintUseShield");
    invHint.style.right = "59%";
    invHint.style.top = "62%";
    invHint.style.borderBottomLeftRadius = "20px";
    invHint.style.borderBottomRightRadius = "120px";
    invHintText.innerHTML = "Щёлкните здесь, чтобы мгновенно надеть щит. Подгадайте момент между ходами соперников, либо используйте перед своим ходом.";
    showPopup(invHint, invHintCont, 390, 175);
    invHintArrow.style.display = "block";
    invHintArrow.style.left = "276px";
    invHintArrow.style.top = "211px";
    let rot = "rotate(0deg)";
    invHintArrow.style.transform = rot;
    animUseArrow = setInterval(animateUseArrow, 600, rot);
}

function pressHintUseClose() {
    console.log("pressHintUseCLose");
    hidePopup(invHint, invHintCont);
    clearInterval(animUseArrow);
    invHintArrow.style.display = "none";

    if (hintLine.length > 0 && skipTutorial === false) {
        startHintLine();
    } else {
        nextScript.script();
    }
}

/*
Шаблон добавления подсказки в движок

if (players[current].type === "human" && showedHintLegend === false) { // условие появления
    nextScript = {
        script: function () {
            showedHintLegend = true; // подсказка показана
            moveIsOver(); // что надо активировать после нажатия кнопки
        }
    };
    hintLine.push("hintLegend");
    startHintLine();
    return;
}
*/
