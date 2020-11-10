const overlay = document.querySelector(".overlay__popup");
const overlayHard = document.querySelector(".overlay__popup-hard");

// универсальная функция для открытия любого попапа
function showPopup(main, content, width, height, hard) {
    if (hard == true) {
        console.log("Сработал overlayHard");
        overlayHard.style.display = "block";
    } else {
        console.log("Сработал overlay");
        overlay.style.display = "block";
    }
    main.style.display = "block";
    setTimeout(function () {
        main.style.width = width + "px";
        main.style.height = height + "px";
        setTimeout(function () {
            content.style.display = "block";
            main.style.transition = "0s";
        }, 400);
    }, 5);
}

// универсальная функция для закрытия любого попапа
function hidePopup(main, content, hard) {
    if (hard == true) {
        console.log("overlayHard отключен");
        overlayHard.style.display = "none";
    } else {
        console.log("overlay отключен");
        overlay.style.display = "none";
    }
    main.style.transition = ".4s";
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
    console.log("атака на игрока " + selectedRival.label);
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

// ПОРАЖЕНИЕ

let Lose = document.querySelector(".js-lose");
let LoseCont = document.querySelector(".js-lose .popup__content");
let LoseOk = document.querySelector(".js-lose .js-popup-ok");
LoseOk.addEventListener("click", pressLose);

function popupLose() {
    console.log("popupLose");
    showPopup(Lose, LoseCont, 338, 217);
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
    FinishedH2.innerHTML = "ПОБЕДА";
    FinishedWrite.style.display = "block";
    FinishedImg.setAttribute("src", "img/finished.gif");
    FinishedOk.innerHTML = "Узнать место";
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
    showPopup(help, helpCont, 385, 500, true);
}

function popupHelpClose() {
    console.log("Помощь закрыта");
    hidePopup(help, helpCont, true);
}

// настройки

let setButton = document.querySelector(".settings__options");
let settings = document.querySelector(".js-settings");
let settingsCont = document.querySelector(".js-settings .popup__content");
let settingsOk = document.querySelector(".js-settings .js-popup-ok");
setButton.addEventListener("click", popupSettings);
settingsOk.addEventListener("click", popupSettingsClose);

function popupSettings() {
    console.log("Настройки открыты");
    showPopup(settings, settingsCont, 424, 327, true);
}

function popupSettingsClose() {
    console.log("Настройки закрыты");
    hidePopup(settings, settingsCont, true);
}

// настройки окно - скорость

let setOpt1a = document.querySelector(".js-sett-opt1-a");
let setOpt1b = document.querySelector(".js-sett-opt1-b");
let setOptPar = document.querySelector(".js-sett-opt1-par")
setOpt1a.addEventListener("click", pressSpeedFast);
setOpt1b.addEventListener("click", pressSpeedFast);

function pressSpeedFast(x) {
    setOptPar.innerHTML = "Быстрая";
    gameSpeed = 1;
    console.log("Скорость игры = быстрая");
    setOpt1a.removeEventListener("click", pressSpeedFast);
    setOpt1b.removeEventListener("click", pressSpeedFast);
    setOpt1a.addEventListener("click", pressSpeedNormal);
    setOpt1b.addEventListener("click", pressSpeedNormal);
}

function pressSpeedNormal(x) {
    setOptPar.innerHTML = "Нормальная";
    gameSpeed = 1.6;
    console.log("Скорость игры = нормальная");
    setOpt1a.removeEventListener("click", pressSpeedNormal);
    setOpt1b.removeEventListener("click", pressSpeedNormal);
    setOpt1a.addEventListener("click", pressSpeedFast);
    setOpt1b.addEventListener("click", pressSpeedFast);
}

// введите имя

let enterName = document.querySelector(".js-enter-name");
let enterNameCont = document.querySelector(".js-enter-name .popup__content");
let enterNameOk = document.querySelector(".js-enter-name .js-popup-ok");
let enterNameInput = document.querySelector(".player__name-input");
let enterNameErr = document.querySelector(".player__name-err");
enterNameOk.addEventListener("click", pressEnterName);
enterNameInput.addEventListener("focus", function () {
    enterNameErr.style.visibility = "hidden";
    enterNameErr.style.opacity = "0.1";
});

function pressEnterName(x) {

    x.preventDefault();
    console.log("Нажал ввод имени");
    console.log("Введено имя: " + enterNameInput.value);

    if (enterNameInput.value.length > 15 || enterNameInput.value.length < 2) {
        enterNameErr.style.visibility = "visible";
        enterNameErr.style.opacity = "1";
    } else {
        playerD.label = enterNameInput.value;
        let name4 = document.querySelector(".info__player-label--D");
        name4.innerHTML = enterNameInput.value;
        playerD.name.setAttribute("title", enterNameInput.value);
        hidePopup(enterName, enterNameCont, true);
        showPopup(setAi, setAiCont, 424, 383, true);
        console.log("Вызвалось окно изменения AI соперников");
    }
}

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
    gameStart();
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
let RanktableOk = document.querySelector(".js-rankings .js-popup-ok");
RanktableOk.addEventListener("click", pressRankOK);

function popupRank() {
    showPopup(Ranktable, RanktableCont, 440, 440);
    console.log("Результаты заезда: ");

    // расписываем 1 место
    for (let i = 0; i < players.length; i++) {
        if (players[i].place == 1) {
            console.log(players[i].label + " занял 1 место");
            Ranktable1Token.setAttribute("src", getTokenImg(players[i].name) );
            Ranktable1Name.innerHTML = "" + players[i].label;
            Ranktable1Money.innerHTML = Map01prise1 + " $";
            players[i].capital += Map01prise1;
            Ranktable1Capital.innerHTML = players[i].capital + " $";
            break;
        }
    }

    // расписываем 2 место
    for (let i = 0; i < players.length; i++) {
        if (players[i].place == 2) {
            console.log(players[i].label + " занял 2 место");
            Ranktable2Token.setAttribute("src", getTokenImg(players[i].name) );
            Ranktable2Name.innerHTML = "" + players[i].label;
            Ranktable2Money.innerHTML = Map01prise2 + " $";
            players[i].capital += Map01prise2;
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
            Ranktable3Money.innerHTML = Map01prise3 + " $";
            players[i].capital += Map01prise3;
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
            Ranktable4Money.innerHTML = Map01prise4 + " $";
            players[i].capital += Map01prise4;
            Ranktable4Capital.innerHTML = players[i].capital + " $";
            break;
        }
    }
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
let shopCapital = document.querySelector(".shop__capital");
document.querySelector(".shop__goods-wrap--models").addEventListener("click", activateButtonBuy, {once: true});
document.querySelector(".shop__goods-model--yellow").addEventListener("click", pressShopYellow);
document.querySelector(".shop__goods-model--red").addEventListener("click", pressShopRed);
document.querySelector(".shop__goods-model--green").addEventListener("click", pressShopGreen);
document.querySelector(".shop__goods-model--blue").addEventListener("click", pressShopBlue);
document.querySelector(".shop__goods-model--brown").addEventListener("click", pressShopBrown);
document.querySelector(".shop__goods-model--black").addEventListener("click", pressShopBlack);
let shopDesName = document.querySelector(".shop__des-name b");
let shopDesContent = document.querySelector(".shop__des-content");
let shopButtonBuy = document.querySelector(".shop__button--buy");
document.querySelector(".shop__button-over").addEventListener("click", pressShopOver);
let selectedGoods;

function popupShop() {
    console.log("Открыт магазин");
    shopOverlay.style.display = "block";
    showPopup(shop, shopCont, 680, 710 );
    shopCapital.innerHTML = "$ " + players[3].capital;
}

function activateButtonBuy() { // делает кнопку "Купить" активной
    shopButtonBuy.addEventListener("click", pressBuy);
    shopButtonBuy.classList.remove("button__grey");
    shopButtonBuy.style.cursor = "pointer";
    shopButtonBuy.addEventListener("mouseover", function () {
        shopButtonBuy.style.background = "#ff4d00";
    });
    shopButtonBuy.addEventListener("mouseout", function () {
        shopButtonBuy.style.background = "#ffbb55";
    })
}

function pressBuy() {
    console.log("pressBuy");
    showPopup(alert, alertCont, 338, 150, true);
    alertHeading.innerHTML = "Отказано";
    alertMessage.innerHTML = "Недостаточно денег для покупки этого предмета";
}

function pressShopYellow() {
    shopDesName.innerHTML = "Фишка &#34;Цыпа&#34;"
    shopDesContent.innerHTML = "Жёлтая фишка класса «стандарт»." + "<br><br>" + "Несмотря на название, эта фишка больно щипает соперников. Причём щипает аж 3 раза! Отличный выбор для начальных трасс."
        + "<br><br>" + "<b>" + "Сила: " + "</b>" + "3" + "<br>" + "<b>" + "Мощные атаки: " + "</b>" + "нет" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ 350";
    selectedGoods = "yellow";
}

function pressShopRed() {
    shopDesName.innerHTML = "Фишка &#34;Вестник&#34;"
    shopDesContent.innerHTML = "Красная фишка класса «стандарт»." + "<br><br>" + "Данная модель создана для тех, кто ценит результативность за приемлемые деньги. Фишка призвана доносить до соперников плохие вести… и доносит она их доходчиво!"
        + "<br><br>" + "<b>" + "Сила: " + "</b>" + "4" + "<br>" + "<b>" + "Мощные атаки: " + "</b>" + "нет" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ 600";
    selectedGoods = "red";
}

function pressShopGreen() {
    shopDesName.innerHTML = "Фишка &#34;Ударник&#34;"
    shopDesContent.innerHTML = "Зелёная фишка класса «профи»." + "<br><br>" + "Это профессиональная фишка сделана профессионалами для профессионалов! В ней 2 особенности: во-первых, у неё сил на 4 атаки, во-вторых… она заставила копирайтера написать слово «профессиональный» аж 3 раза в одном предложении."
        + "<br><br>" + "<b>" + "Сила: " + "</b>" + "5" + "<br>" + "<b>" + "Мощные атаки: " + "</b>" + "нет" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ 1000";
    selectedGoods = "green";
}

function pressShopBlue() {
    shopDesName.innerHTML = "Фишка &#34;Сенат&#34;"
    shopDesContent.innerHTML = "Синяя фишка класса «профи»." + "<br><br>" + "Это первая модель в линейке, способная проводить мощные атаки. Цена может показаться высоковатой, но это до тех пор, пока не попробуете выкинуть соперника с трассы. С этим ощущением ничто не сравнится!"
        + "<br><br>" + "<b>" + "Сила: " + "</b>" + "6" + "<br>" + "<b>" + "Мощные атаки: " + "</b>" + "да" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ 1600";
    selectedGoods = "blue";
}

function pressShopBrown() {
    shopDesName.innerHTML = "Фишка &#34;Робеспьер&#34;"
    shopDesContent.innerHTML = "Коричневая фишка класса «элита»." + "<br><br>" + "Вот это другой разговор! Если Вы считаете себя мажором, перед которым все должны расступиться и поклониться в ножки, а враги обзавидоваться, то эта элитная фишка – то, что Вам нужно."
        + "<br><br>" + "<b>" + "Сила: " + "</b>" + "8" + "<br>" + "<b>" + "Мощные атаки: " + "</b>" + "да" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ 2300";
    selectedGoods = "brown";
}

function pressShopBlack() {
    shopDesName.innerHTML = "Фишка &#34;Мальдини&#34;"
    shopDesContent.innerHTML = "Чёрная фишка класса «элита»." + "<br><br>" + "Ваши соперники будут страдать!" + "<br>" + "Эта ультимативная чёрная элитная фишка порадует настоящих гуру имперских гонок! Создана для езды по особо опасным трассам с кучей красных и чёрных клеток. Ещё ею можно знатно выпиливать соперников, но… это уже Ваш личный выбор."
        + "<br><br>" + "<b>" + "Сила: " + "</b>" + "10" + "<br>" + "<b>" + "Мощные атаки: " + "</b>" + "да" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ 3000";
    selectedGoods = "black";
}

let alert = document.querySelector(".js-alert");
let alertCont = document.querySelector(".js-alert .js-popup-content");
let alertHeading = document.querySelector(".js-alert-heading");
let alertMessage = document.querySelector(".js-alert-message");
document.querySelector(".js-alert .js-popup-ok").addEventListener("click", pressOk);

function pressOk() {
    console.log("Нажат ОК");
    hidePopup(alert, alertCont, true);
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
    shopOverlay.style.display = "none";
    hidePopup(shopOver, shopOverCont, true);
    hidePopup(shop, shopCont);
    showPopup(final, finalCont, 338, 200, true);
}

function pressShopOverNo() {
    console.log("Нажато Нет");
    hidePopup(shopOver, shopOverCont, true);
}

let final = document.querySelector(".js-final");
let finalCont = document.querySelector(".js-final .js-popup-content");
