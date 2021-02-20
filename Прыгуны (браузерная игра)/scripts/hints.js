// отключаемые подсказки

let hintLine = []; // вставляй сюда строки с названиями функций, которые надо выполнить друг за другом

// то, что должно выполниться по окончании всех подсказок:
// свойство с названием "script" обязательно!!!

let nextScript = {
    script: function () {},
    showed: function () {},
    popup: function () {},
};

// какие подсказки уже высвечивались?

let showedHintLegend = false;
let showedHintRed = false;
let showedHintAttack = false;
let showedHintLog = false;
let showedHintZone = false;
// подсказки на использование предметов
let showedHintUseMagnet = false;
let showedHintUseSMagnet = false;
let showedHintUseShield = false;
let showedHintUseIShield = false;
let showedHintUseTrap = false;
let showedHintUseHatched = false;
let showedHintUseVampire = false;
let showedHintUseIMP = false;
let showedHintUseMop = false;

function startHintLine() {

    if (hintLine.length > 0) console.log(hintLine);
    nextScript.showed();

    if (skipTutorial) {
        hintLine = [];
        nextScript.script();
        nextScript.script = function () {};
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
        case "hintZone":
            hintZone();
            break;
        case "hintUseMagnet":
            hintUseMagnet();
            break;
        case "hintUseSMagnet":
            hintUseMagnet(true);
            break;
        case "hintUseShield":
            hintUseShield();
            break;
        case "hintUseIShield":
            hintUseShield(true);
            break;
        case "hintUseTrap":
            hintUseTrap();
            break;
        case "hintUseHatched":
            hintUseHatched();
            break;
        case "hintUseVampire":
            hintUseVampire();
            break;
        case "hintUseIMP":
            hintUseIMP();
            break;
        case "hintUseMop":
            hintUseMop();
            break;
        case "hintUseCover":
            hintUseCover();
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
    nextScript.showed();

    if (hintLine.length > 0 && skipTutorial === false) {
        startHintLine();
    } else {
        nextScript.script();
        nextScript.script = function () {};
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
    showPopup(char, charCont, 395, 300);
    char.style.left = "-106px";
    char.style.top = "-421px";
    charMessage2.innerHTML = "<i>" + "Здесь у нас информационное табло.<br>Можно посмотреть, кто на каком месте, цвет фишки, уровень силы и финансовое положение.<br><br>Стало быть, ты стартуешь <b>последним</b>. Фишка у тебя <b>белая</b>, силы <b>2 единицы</b>, а денег… хм… похоже, что карманы твои дырявые!" + "<i>";
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
    showPopup(char, charCont, 395, 165);
    char.style.left = "225px";
    char.style.top = "386px";
    charMessage2.innerHTML = "<i>" + "Если забыл, что означают цветные клетки, ты всегда можешь посмотреть легенду." + "<i>";
    charArrow.style.display = "block";
    charArrow.style.left = "360px";
    charArrow.style.top = "176px";
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
    charMessage2.innerHTML = "<i>" + "Впереди маячит красная клетка.<br>Нарвёшься на такую – улетишь вверх ногами на ближайший чекпойнт! К тому же, потеряешь 1 единицу силы.<br>Кончатся силы – <b>вылетишь с трассы…</b> и будешь весь день полоть мои грядки!" + "<i>";
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
    showPopup(char, charCont, 395, 240);
    char.style.left = "630px";
    char.style.top = "-400px";
    charMessage2.innerHTML = "<i>" + "На клетке сидит другой игрок. Возможно, их даже больше одного!<br>Атакуй соперника, чтобы <b>пойти ещё раз.</b> Соперник при этом <b>пропустит ход.</b><br>Во время атаки твоя фишка расходует<br><b>1 единицу силы.</b>" + "<i>";
    charArrow.style.display = "block";
    charArrow.style.left = "275px";
    charArrow.style.top = "254px";
    let rot = "rotate(51deg)";
    charArrow.style.transform = rot;
    animArrow = setInterval(animateArrow, 600, rot);
    charOK.addEventListener("click", pressHintClose, {once: true});
    // блок
    shopOverlay.style.display = "block";
    shopOverlay.style.zIndex = "1020";
    shopOverlay.style.background = "none";
    charOK.addEventListener("click", resetOverlayShop, {once: true});
}

function resetOverlayShop() {
    invHint.style.zIndex = "1010";
    shopOverlay.style.display = "none";
    shopOverlay.style.zIndex = "1400";
    shopOverlay.style.background = "rgba(0, 0, 0, 0.4)";
}

function hintUseVampire() {
    console.log("hintUseVampire");
    invHint.style.right = "41px";
    invHint.style.top = "97px";
    invHint.style.borderBottomLeftRadius = "20px";
    invHint.style.borderBottomRightRadius = "20px";
    invHintText.innerHTML = "Добавлен новый вид атаки: <b>вампирские клыки.</b><br><br>Чтобы перейти в режим вампира, щёлкните по иконке с клыками.<br><br>Чтобы выйти из режима вампира, щёлкните по этой же иконке ещё раз.";
    showPopup(invHint, invHintCont, 390, 250);
    invHintArrow.style.display = "block";
    invHintArrow.style.left = "275px";
    invHintArrow.style.top = "260px";
    let rot = "rotate(51deg)";
    invHintArrow.style.transform = rot;
    animUseArrow = setInterval(animateUseArrow, 600, rot);
    // блок
    setTimeout(function () {
        invHint.style.zIndex = "1030";
        shopOverlay.style.display = "block";
        shopOverlay.style.zIndex = "1020";
        shopOverlay.style.background = "none";
        invHintOK.addEventListener("click", resetOverlayShop, {once: true});
    }, 1);
}

function hintUseHatched() {
    console.log("hintUseHatched");
    invHint.style.right = "41px";
    invHint.style.top = "77px";
    invHint.style.borderBottomLeftRadius = "20px";
    invHint.style.borderBottomRightRadius = "20px";
    invHintText.innerHTML = "Вы стоите на <b>штрих-клетке</b>, а значит, можно выбросить соперника с трассы!<br><br>Чтобы войти в режим сильной атаки, щёлкните по иконке с кулаком.<br><br>Чтобы выйти из режима сильной атаки, щёлкните по этой же иконке ещё раз.";
    showPopup(invHint, invHintCont, 390, 265);
    invHintArrow.style.display = "block";
    invHintArrow.style.left = "275px";
    invHintArrow.style.top = "278px";
    let rot = "rotate(51deg)";
    invHintArrow.style.transform = rot;
    animUseArrow = setInterval(animateUseArrow, 600, rot);
    // блок
    setTimeout(function () {
        invHint.style.zIndex = "1030";
        shopOverlay.style.display = "block";
        shopOverlay.style.zIndex = "1020";
        shopOverlay.style.background = "none";
        invHintOK.addEventListener("click", resetOverlayShop, {once: true});
    }, 1);
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

function hintZone() {
    console.log("hintZone");
    gamePause();
    showPopup(char, charCont, 395, 390);
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "Иногда, если прыгун сильно отстал, ему даётся специальный бонус, чтобы не скучал – <b>удвоение очков на кубике.</b><br><br>Очки будут удваиваться, пока он не выйдет из зоны отставания.<br><br>Узнать отстающего прыгуна можно по значку молнии." + "<i>";
    charArrow.style.display = "none";
    charImg.setAttribute("src", "img/help/help-zone.png");
    charImg.style.display = "block";
    charImg.style.height = "65px";
    charOK.addEventListener("click", pressHintClose, {once: true});
    charOK.addEventListener("click", pressHintZone, {once: true});
}

function pressHintZone() {
    charImg.style.display = "none";
    gameResume();
}

// подсказки на использование предметов

let invHint = document.querySelector(".js-inv-hint");
let invHintCont = document.querySelector(".js-inv-hint .js-popup-content");
let invHintText = document.querySelector(".js-inv-hint .inv-hint__text");
let invHintArrow = document.querySelector(".js-inv-hint .inv-hint__arrow");
let invHintOK = document.querySelector(".js-inv-hint .js-button-ok");
invHintOK.addEventListener("click", pressHintUseClose);

function hintUseMagnet(sup) {
    console.log("hintUseMagnet");
    invHint.style.right = "23%";
    invHint.style.top = "59%";
    invHint.style.borderBottomLeftRadius = "120px";
    invHint.style.borderBottomRightRadius = "20px";
    if (sup) {
        invHintText.innerHTML = "Супер-магнит добавлен в Ваш инвентарь.";
    } else {
        invHintText.innerHTML = "Теперь можно использовать магнит! Чтобы сделать ход с магнитом, щёлкните здесь.";
    }
    showPopup(invHint, invHintCont, 390, 175);
    invHintArrow.style.display = "block";
    invHintArrow.style.left = "-19px";
    invHintArrow.style.top = "167px";
    let rot = "rotate(78deg)";
    invHintArrow.style.transform = rot;
    animUseArrow = setInterval(animateUseArrow, 600, rot);
}

function hintUseShield(iron) {
    console.log("hintUseShield");
    invHint.style.right = "57%";
    invHint.style.top = "62%";
    invHint.style.borderBottomLeftRadius = "20px";
    invHint.style.borderBottomRightRadius = "120px";
    if (iron) {
        invHintText.innerHTML = "Железный щит добавлен в Ваш инвентарь.";
    } else {
        invHintText.innerHTML = "Щёлкните здесь, чтобы мгновенно надеть щит. Подгадайте момент между ходами соперников, либо используйте перед своим ходом.";
    }
    showPopup(invHint, invHintCont, 390, 175);
    invHintArrow.style.display = "block";
    invHintArrow.style.left = "276px";
    invHintArrow.style.top = "211px";
    let rot = "rotate(0deg)";
    invHintArrow.style.transform = rot;
    animUseArrow = setInterval(animateUseArrow, 600, rot);
}

function hintUseTrap() {
    console.log("hintUseTrap");
    invHint.style.right = "46%";
    invHint.style.top = "57%";
    invHint.style.borderBottomLeftRadius = "20px";
    invHint.style.borderBottomRightRadius = "120px";
    invHintText.innerHTML = "Щёлкните по иконке капкана, чтобы установить капкан.";
    showPopup(invHint, invHintCont, 390, 175);
    invHintArrow.style.display = "block";
    invHintArrow.style.left = "300px";
    invHintArrow.style.top = "183px";
    let rot = "rotate(18deg)";
    invHintArrow.style.transform = rot;
    animUseArrow = setInterval(animateUseArrow, 600, rot);
}

function hintUseIMP() {
    console.log("hintUseIMP");
    invHint.style.right = "36%";
    invHint.style.top = "59%";
    invHint.style.borderBottomLeftRadius = "20px";
    invHint.style.borderBottomRightRadius = "120px";
    invHintText.innerHTML = "Щёлкните по иконке невозможного кубика, чтобы сделать им ход.<br>Помните! У вас 3 попытки на всю игру.";
    showPopup(invHint, invHintCont, 390, 190);
    invHintArrow.style.display = "block";
    invHintArrow.style.left = "307px";
    invHintArrow.style.top = "222px";
    let rot = "rotate(80deg)";
    invHintArrow.style.transform = rot;
    animUseArrow = setInterval(animateUseArrow, 600, rot);
}

function hintUseMop() {
    console.log("hintUseMop");
    invHint.style.right = "46%";
    invHint.style.top = "50%";
    invHint.style.borderBottomLeftRadius = "20px";
    invHint.style.borderBottomRightRadius = "120px";
    invHintText.innerHTML = "Поздравляем с приобретением <b>швабры!</b> С её помощью можно навсегда удалить любую красную клетку с трассы.<br><br>Щёлкните по швабре, чтобы начать удаление.<br><br>Помните! Фокус работает 1 раз за всю игру.";
    showPopup(invHint, invHintCont, 390, 250);
    invHintArrow.style.display = "block";
    invHintArrow.style.left = "336px";
    invHintArrow.style.top = "245px";
    let rot = "rotate(18deg)";
    invHintArrow.style.transform = rot;
    animUseArrow = setInterval(animateUseArrow, 600, rot);
}

function hintUseCover() {
    console.log("hintUseCover");
    invHint.style.right = "36%";
    invHint.style.top = "27%";
    invHint.style.borderBottomLeftRadius = "120px";
    invHint.style.borderBottomRightRadius = "20px";
    invHintText.innerHTML = "На этой трассе можно укрыться от черепа в специальном ответвлении. Он туда за Вами не пойдёт.";
    showPopup(invHint, invHintCont, 390, 197);
    invHintArrow.style.display = "block";
    invHintArrow.style.left = "-58px";
    invHintArrow.style.top = "145px";
    let rot = "rotate(108deg)";
    invHintArrow.style.transform = rot;
    animUseArrow = setInterval(animateUseArrow, 600, rot);
}

function pressHintUseClose() {
    console.log("pressHintUseCLose");
    hidePopup(invHint, invHintCont);
    clearInterval(animUseArrow);
    invHintArrow.style.display = "none";
    nextScript.showed();

    if (hintLine.length > 0 && skipTutorial === false) {
        startHintLine();
    } else {
        nextScript.script();
        nextScript.script = function () {};
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
