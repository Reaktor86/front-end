let popupOver = document.querySelector(".popup__overlay");

// универсальная функция для открытия любого попапа
function showPopup(main, content, width, height) {
    popupOver.style.display = "block";
    main.style.display = "block";
    setTimeout(function () {
        main.style.width = width + "px";
        main.style.height = height + "px";
        setTimeout(function () {
            content.style.display = "block";
            main.style.transition = "0s";
        }, 300);
    }, 1)
}

// универсальная функция для закрытия любого попапа
function hidePopup(main, content) {
    main.style.transition = ".3s";
    popupOver.style.display = "none";
    main.style.display = "none";
    main.style.width = "1px";
    main.style.height = "1px";
    content.style.display = "none";
}

// атаковать игрока ценой 1 ед силы?

let AttackOnce = document.querySelector(".js-attack-once");
let AttackOnceCont = document.querySelector(".js-attack-once .popup__content");
let AttackOnceRival = document.querySelector(".js-attack-once .span__imp"); // Игрок Х
let AttackOnceNow = document.querySelector(".js-attack-once .js-popup-now"); // численное
let AttackOnceAfter = document.querySelector(".js-attack-once .js-popup-after"); // численное
let AttackOnceYes = document.querySelector(".js-attack-once .js-popup-confirm"); // ДА
let AttackOnceNo = document.querySelector(".js-attack-once .js-popup-decline"); // НЕТ
let AttackOnceOther = document.querySelector(".js-attack-once .js-popup-other"); // Выбрать другого
AttackOnceYes.addEventListener("click", pressAttackYes);
AttackOnceNo.addEventListener("click", pressAttackNo);
AttackOnceOther.addEventListener("click", pressOtherRival);

function popupAttackOnce(selectedRival) {
    console.log("активировалась атака на игрока " + selectedRival.label);
    showPopup(AttackOnce, AttackOnceCont, 338, 227);
    AttackOnceRival.innerHTML = selectedRival.label;
    AttackOnceNow.innerHTML = "" + players[current].power;
    AttackOnceAfter.innerHTML = "" + (players[current].power - 1);
}

// соперников двое! Кого атаковать?

let AttackDouble = document.querySelector(".js-attack-double");
let AttackDoubleCont = document.querySelector(".js-attack-double .popup__content");
let AttackDoubleR1 = document.querySelector(".js-attack-double .js-popup-r1");
let AttackDoubleR2 = document.querySelector(".js-attack-double .js-popup-r2");
let AttackDoubleCancel = document.querySelector(".js-attack-double .js-popup-cancel");
AttackDoubleR1.addEventListener("click", pressAttackOne);
AttackDoubleR2.addEventListener("click", pressAttackTwo);
AttackDoubleCancel.addEventListener("click", pressAttackCancel);

function popupAttackDouble() {
    console.log("popupAttackDouble");
    showPopup(AttackDouble, AttackDoubleCont, 338, 227);
    AttackDoubleR1.innerHTML = playerRival[0].label;
    AttackDoubleR2.innerHTML = playerRival[1].label;
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
    showPopup(AttackTriple, AttackTripleCont, 338, 227);
    AttackTripleR1.innerHTML = playerRival[0].label;
    AttackTripleR2.innerHTML = playerRival[1].label;
    AttackTripleR3.innerHTML = playerRival[2].label;
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
    AttackImpMess.innerHTML = "Нет силы! Нельзя атаковать соперников";
}

// предупреждение о низкой энергии

function popupLowEnergy() {
    console.log("popupLowEnergy");
    showPopup(AttackImp, AttackImpCont, 338, 150);
    AttackImpHead.innerHTML = "Предупреждение!";
    AttackImpMess.innerHTML = "Силы кончились. Красная клетка приведёт к поражению!";
}

// атака невозможна - чекпойнт

function popupAttackImpCP() {
    console.log("popupAttackImpCP");
    showPopup(AttackImp, AttackImpCont, 338, 150);
    AttackImpHead.innerHTML = "Атака невозможна!";
    AttackImpMess.innerHTML = "Нельзя атаковать соперников на чекпойнте";
}












