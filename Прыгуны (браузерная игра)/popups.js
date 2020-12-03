const overlay = document.querySelector(".overlay__popup");
const overlayHard = document.querySelector(".overlay__popup-hard");
const overlaySettings = document.querySelector(".overlay__cover-settings");

// универсальная функция для открытия любого попапа
function showPopup(main, content, width, height, hard, wait) {
    if (hard === true) {
        overlayHard.style.display = "block";
    } else {
        overlay.style.display = "block";
    }
    main.style.display = "block";
    let time = 400;
    if (wait) {
        time = 1000;
    }
    setTimeout(function () {
        main.style.width = width + "px";
        main.style.height = height + "px";
        setTimeout(function () {
            content.style.display = "block";
            main.style.transition = "0s";
        }, time);
    }, 5);
}

// универсальная функция для закрытия любого попапа
function hidePopup(main, content, hard, wait) {
    content.style.display = "none";
    main.style.transition = ".4s";
    main.style.display = "none";
    main.style.width = "1px";
    main.style.height = "1px";
    if (hard === true) {
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

// атаковать игрока ценой 1 ед силы?

let AttackOnce = document.querySelector(".js-attack-once");
let AttackOnceCont = document.querySelector(".js-attack-once .popup__content");
let AttackOnceRival = document.querySelector(".js-attack-once .span__imp"); // Игрок Х
let AttackOnceNow = document.querySelector(".js-attack-once .js-popup-now b"); // численное
let AttackOnceAfter = document.querySelector(".js-attack-once .js-popup-after b"); // численное
let AttackOnceYes = document.querySelector(".js-attack-once .js-popup-confirm"); // ДА
let AttackOnceNo = document.querySelector(".js-attack-once .js-popup-decline"); // НЕТ
let AttackOnceOther = document.querySelector(".js-attack-once .js-popup-other"); // Выбрать другого
AttackOnceYes.addEventListener("click", pressAttackYes);
AttackOnceNo.addEventListener("click", pressAttackNo);
AttackOnceOther.addEventListener("click", pressOtherRival);

function popupAttackOnce(selectedRival) {
    console.log("атака на игрока " + selectedRival.label);
    showPopup(AttackOnce, AttackOnceCont, 350, 245);
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
AttackDoubleCancel.addEventListener("click", pressAttackCancel);

function popupAttackDouble() {
    console.log("popupAttackDouble");
    if (playerRival[0].armor > 0) {
        deactivateButtonRival(AttackDoubleR1);
        document.querySelector(".popup__button-img-r1").style.visibility = "visible";
        AttackDoubleR1.removeEventListener("click", pressAttackOne);
    } else {
        activateButtonRival(AttackDoubleR1);
        document.querySelector(".popup__button-img-r1").style.visibility = "hidden";
        AttackDoubleR1.addEventListener("click", pressAttackOne);
    }
    if (playerRival[1].armor > 0) {
        deactivateButtonRival(AttackDoubleR2);
        document.querySelector(".popup__button-img-r2").style.visibility = "visible";
        AttackDoubleR2.removeEventListener("click", pressAttackTwo);
    } else {
        activateButtonRival(AttackDoubleR2);
        document.querySelector(".popup__button-img-r2").style.visibility = "hidden";
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
    if (playerRival[0].armor > 0) {
        deactivateButtonRival(AttackTripleR1);
        document.querySelector(".popup__button-img-r1").style.visibility = "visible";
        AttackTripleR1.removeEventListener("click", pressAttackOne);
    } else {
        activateButtonRival(AttackTripleR1);
        document.querySelector(".popup__button-img-r1").style.visibility = "hidden";
        AttackTripleR1.addEventListener("click", pressAttackOne);
    }
    if (playerRival[1].armor > 0) {
        deactivateButtonRival(AttackTripleR2);
        document.querySelector(".popup__button-img-r2").style.visibility = "visible";
        AttackTripleR2.removeEventListener("click", pressAttackTwo);
    } else {
        activateButtonRival(AttackTripleR2);
        document.querySelector(".popup__button-img-r2").style.visibility = "hidden";
        AttackTripleR2.addEventListener("click", pressAttackTwo);
    }
    if (playerRival[2].armor > 0) {
        deactivateButtonRival(AttackTripleR3);
        document.querySelector(".popup__button-img-r3").style.visibility = "visible";
        AttackTripleR3.removeEventListener("click", pressAttackThree);
    } else {
        activateButtonRival(AttackTripleR3);
        document.querySelector(".popup__button-img-r3").style.visibility = "hidden";
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
    AttackImpMess.innerHTML = "Нет силы! Нельзя атаковать соперников";
}

// атака невозможна - противник одет в броню

function popupAttackArmor() {
    console.log("popupAttackArmor");
    showPopup(AttackImp, AttackImpCont, 338, 150);
    AttackImpHead.innerHTML = "Атака невозможна!";
    AttackImpMess.innerHTML = "Противник одет в броню";
}

// предупреждение о низкой энергии

function popupLowEnergy() {
    console.log("popupLowEnergy");
    showPopup(AttackImp, AttackImpCont, 338, 165);
    AttackImpHead.innerHTML = "Предупреждение!";
    AttackImpMess.innerHTML = "Силы кончились. Красная или чёрная клетка приведут к поражению!";
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
    showPopup(Lose, LoseCont, 340, 217);
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
    } else {
        showPopup(help, helpCont, 750, 660, true);
    }
}

function popupHelpClose() {
    console.log("Помощь закрыта");
    gameResume();
    hidePopup(help, helpCont, true);
}

// настройки

document.querySelector(".start-menu__set").addEventListener("click", popupSettings);
let setButton = document.querySelector(".settings__options");
let settings = document.querySelector(".js-settings");
let settingsCont = document.querySelector(".js-settings .popup__content");
let settingsOk = document.querySelector(".js-settings .js-popup-ok");
setButton.addEventListener("click", popupSettings);
settingsOk.addEventListener("click", popupSettingsClose);

function popupSettings() {
    console.log("Настройки открыты");
    gamePause();
    showPopup(settings, settingsCont, 447, 327, true);
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
    gameSpeed = 1.5;
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
document.querySelector(".pause button").addEventListener("click", function () {
    //снять с паузы
    overlayHard.style.display = "none";
    pausePopup.style.display = "none";
    gameResume();
});
document.querySelector(".settings__pause").addEventListener("click", function () {
    // игру на паузу
    gamePause();
    overlayHard.style.display = "block";
    pausePopup.style.display = "flex";
});

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

finalOK.addEventListener("click", function () {
    console.log("Нажат FinalOK");
    hidePopup(final, finalCont, true);
    gameResume();
});

document.querySelector(".settings__info").addEventListener("click", function () {
    console.log("Нажат Info");
    showPopup(final, finalCont, 385, 320, true);
    finalOK.style.display = "block";
    finalH2.innerHTML = "ПРЫГУНЫ, build alpha (первые 6 трасс)";
    gamePause();
})

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
    showPopup(enterName, enterNameCont, 300, 223, true);
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
        createPlayers(enterNameInput.value);
        tableName4.innerHTML = enterNameInput.value;
        document.querySelector(".js-welcome .span-name").innerHTML = enterNameInput.value;
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
    showPopup(setAi, setAiCont, 424, 383, true);
    console.log("Вызвалось окно изменения AI соперников");
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

    showPopup(Ranktable, RanktableCont, 440, 470);
    console.log("Результаты заезда: ");
    Ranktable1Bonus.style.display = "none";
    Ranktable2Bonus.style.display = "none";
    Ranktable3Bonus.style.display = "none";
    Ranktable4Bonus.style.display = "none";

    // расписываем 1 место
    for (let i = 0; i < players.length; i++) {
        if (players[i].place == 1) {
            console.log(players[i].label + " занял 1 место");
            Ranktable1Token.setAttribute("src", getTokenImg(players[i].name) );
            Ranktable1Name.innerHTML = "" + players[i].label;
            Ranktable1Money.innerHTML = curMapParam.prize1 + " $";
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
            players[i].capital += curMapParam.prize1 + players[i].bonusMoney;
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
            players[i].capital += curMapParam.prize2 + players[i].bonusMoney;
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
            players[i].capital += curMapParam.prize3 + players[i].bonusMoney;
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
            players[i].capital += curMapParam.prize4 + players[i].bonusMoney;
            Ranktable4Capital.innerHTML = players[i].capital + " $";
            break;
        }
    }

    // выделяем себя
    let places = document.querySelectorAll(".rank__item");
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

    if (curMap === Map01 && showedHintShop === false) {
        hintShop();
        showedHintShop = true;
    }

    if (curMap === Map04 && knowAction === false) {
        hintAction();
    }

    destroyMap();

    setTimeout(function () {
        deactivateButtonBuy();
        unselectItemShop();
        unselectModel();
        shopDesName.innerHTML = "";
        shopDesContent.innerHTML = "";
        shopOverlay.style.display = "block";
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
    let check = true;
    let player = findHuman();
    if (selectedGoods === "magnet" || selectedGoods === "smagnet") {
        if (player.magnets + player.smagnets == 3) {
            popupMaximum(3, " магнитов");
            check = false;
        }
    }
    if (selectedGoods === "shield" || selectedGoods === "ishield") {
        if (player.shields + player.ishields == 3) {
            popupMaximum(3, " щитов");
            check = false;
        }
    }
    if (selectedGoods === "trap") {
        if (player.trap) {
            popupMaximum(1, " капкана");
            check = false;
        }
    }
    if (selectedGoods === "vampire") {
        if (player.vampire) {
            popupMaximum(1, " вамирских клыков");
            check = false;
        }
    }
    if (selectedGoods === "imp") {
        if (player.imp) {
            popupMaximum(1, " невозможного кубика");
            check = false;
        }
    }
    if (player.capital < selectedCost) {
        popupLowMoney();
        check = false;
    }
    if (selectedGoods === "manipulator") {
        popupManipulator();
        check = false;
    }
    if (check) {
        popupBuyConfirm();
    }
}

function popupLowMoney() {
    showPopup(alarm, alarmCont, 338, 200, true);
    let player = findHuman();
    alarmHeading.innerHTML = "Отказано";
    alarmMessage.innerHTML = "Недостаточно денег для покупки этого предмета." + "<br><br>" + "Требуется: " + "<b>" + "$ " + selectedCost + "</b>" + "<br>У Вас: " + "<span>" + "$ " + player.capital + "</span>";
    alarmMessage.querySelector("span").classList.add("span__red");
}

function popupMaximum(max, item) {
    showPopup(alarm, alarmCont, 338, 150, true);
    alarmHeading.innerHTML = "Отказано";
    alarmMessage.innerHTML = "Нельзя нести с собой больше " + max + item;
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
    showPopup(buyConfirm, buyConfirmCont, 360, 200, true);
    let itemText;
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
    let player = findHuman();
    buyConfirmP.innerHTML = "Купить " + "<b>" + itemText + "</b><br>" + "за " + "<b>" + "$ " + selectedCost + "</b>" + "?" +
        "<br><br>" + "Остаток: $ " + (player.capital - selectedCost);
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
                player.imp = true;
                break;
        }
    }
    unselectItemInv();
    unselectItemShop();
    shopDesName.innerHTML = "";
    shopDesContent.innerHTML = "";
    loadShopParameters();
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
    selectedCost = 350;
}

function pressShopRed() {
    shopDesName.innerHTML = "Фишка &#34;Вестник&#34;"
    shopDesContent.innerHTML = "Красная фишка класса «стандарт»." + "<br><br>" + "Данная модель создана для тех, кто ценит результативность за приемлемые деньги. Фишка призвана доносить до соперников плохие вести… и доносит она их доходчиво!"
        + "<br><br>" + "<b>" + "Сила: " + "</b>" + "4" + "<br>" + "<b>" + "Мощные атаки: " + "</b>" + "нет" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costRed;
    selectedGoods = "red";
    selectedCost = 600;
}

function pressShopGreen() {
    shopDesName.innerHTML = "Фишка &#34;Ударник&#34;"
    shopDesContent.innerHTML = "Зелёная фишка класса «профи»." + "<br><br>" + "Это профессиональная фишка сделана профессионалами для профессионалов! В ней 2 особенности: во-первых, у неё сил на 4 атаки, во-вторых… она заставила копирайтера написать слово «профессиональный» аж 3 раза в одном предложении."
        + "<br><br>" + "<b>" + "Сила: " + "</b>" + "5" + "<br>" + "<b>" + "Мощные атаки: " + "</b>" + "нет" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costGreen;
    selectedGoods = "green";
    selectedCost = 1000;
}

function pressShopBlue() {
    shopDesName.innerHTML = "Фишка &#34;Сенат&#34;"
    shopDesContent.innerHTML = "Синяя фишка класса «профи»." + "<br><br>" + "Это первая модель в линейке, способная проводить мощные атаки. Цена может показаться высоковатой, но это до тех пор, пока не попробуете выкинуть соперника с трассы. С этим ощущением ничто не сравнится!"
        + "<br><br>" + "<b>" + "Сила: " + "</b>" + "6" + "<br>" + "<b>" + "Мощные атаки: " + "</b>" + "да" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costBlue;
    selectedGoods = "blue";
    selectedCost = 1600;
}

function pressShopBrown() {
    shopDesName.innerHTML = "Фишка &#34;Робеспьер&#34;"
    shopDesContent.innerHTML = "Коричневая фишка класса «элита»." + "<br><br>" + "Модель года по версии авторитетного журнала &#34;Твоя фишка&#34;. Если Вы считаете себя мажором, перед которым все должны расступиться и поклониться в ножки, а враги обзавидоваться, то эта элитная фишка – то, что Вам нужно."
        + "<br><br>" + "<b>" + "Сила: " + "</b>" + "8" + "<br>" + "<b>" + "Мощные атаки: " + "</b>" + "да" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costBrown;
    selectedGoods = "brown";
    selectedCost = 2300;
}

function pressShopBlack() {
    shopDesName.innerHTML = "Фишка &#34;Мальдини&#34;"
    shopDesContent.innerHTML = "Чёрная фишка класса «элита»." + "<br><br>" + "Ваши соперники будут страдать!" + "<br>" + "Эта ультимативная чёрная элитная фишка порадует настоящих гуру имперских гонок! Создана для езды по особо опасным трассам с кучей красных и чёрных клеток. Ещё ею можно знатно выпиливать соперников, но… это уже Ваш личный выбор."
        + "<br><br>" + "<b>" + "Сила: " + "</b>" + "10" + "<br>" + "<b>" + "Мощные атаки: " + "</b>" + "да" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costBlack;
    selectedGoods = "black";
    selectedCost = 3000;
}

function pressShopMagnet() {
    shopDesName.innerHTML = "Магнит"
    shopDesContent.innerHTML = "Управляй удачей!" + "<br><br>" + "Выбирай любое число на кубике, которое хочешь. При броске кубика вероятность его выпадения увеличится в 2 раза."
        + "<br><br>" + "<b>" + "Максимум: " + "</b>" + "3 шт." + "<br>" + "<b>" + "Использование: " + "</b>" + "перед ходом" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costMagnet;
    selectedGoods = "magnet";
    selectedCost = 50;
}

function pressShopSMagnet() {
    shopDesName.innerHTML = "Супер-магнит"
    shopDesContent.innerHTML = "Усиленный вариант магнита." + "<br><br>" + "Выбирай любое число на кубике, которое хочешь. При броске кубика вероятность его выпадения увеличится в 3 раза."
        + "<br><br>" + "<b>" + "Максимум: " + "</b>" + "3 шт." + "<br>" + "<b>" + "Использование: " + "</b>" + "перед ходом" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costSMagnet;
    selectedGoods = "smagnet";
    selectedCost = 200;
}

function pressShopShield() {
    shopDesName.innerHTML = "Щит"
    shopDesContent.innerHTML = "Прикрой свой... фишка!" + "<br><br>" + "Защищает от слабых атак соперников на 1 ход."
        + "<br><br>" + "<b>" + "Максимум: " + "</b>" + "3 шт." + "<br>" + "<b>" + "Использование: " + "</b>" + "между ходами" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costShield;
    selectedGoods = "shield";
    selectedCost = 50;
}

function pressShopIShield() {
    shopDesName.innerHTML = "Железный щит"
    shopDesContent.innerHTML = "Улучшенный вариант щита." + "<br><br>" + "Защищает от слабых атак соперников на 3 хода."
        + "<br><br>" + "<b>" + "Максимум: " + "</b>" + "3 шт." + "<br>" + "<b>" + "Использование: " + "</b>" + "между ходами" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costIShield;
    selectedGoods = "ishield";
    selectedCost = 200;
}

function pressShopTrap() {
    shopDesName.innerHTML = "Капкан"
    shopDesContent.innerHTML = "Поймай соперника за хвост!" + "<br><br>" + "Установи капкан на любую свободную клетку. Соперник, который в него попался, пропускает ход и отдаёт тебе<br>$ 500"
        + "<br><br>" + "<b>" + "Максимум: " + "</b>" + "1 шт." + "<br>" + "<b>" + "Использование: " + "</b>" + "перед ходом" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costTrap;
    selectedGoods = "trap";
    selectedCost = 250;
}

function pressShopVampire() {
    shopDesName.innerHTML = "Вампирские клыки"
    shopDesContent.innerHTML = "Почувствуй себя графом Дракулой!.. Ну, или Эдвардом - кому как нравится." + "<br><br>" + "Во время слабой атаки ты не расходуешь силу. Соперник при этом теряет 1 единицу силы."
        + "<br><br>" + "<b>" + "Максимум: " + "</b>" + "1 шт." + "<br>" + "<b>" + "Использование: " + "</b>" + "во время слабой атаки" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costVampire;
    selectedGoods = "vampire";
    selectedCost = 250;
}

function pressShopImp() {
    shopDesName.innerHTML = "Невозможный кубик"
    shopDesContent.innerHTML = "По преданию, этот артефакт был добыт три века назад воинами Империи в параллельном измерении. Кубик имеет 9 граней. Может быть использован только 3 раза."
        + "<br><br>" + "<b>" + "Максимум: " + "</b>" + "1 шт." + "<br>" + "<b>" + "Использование: " + "</b>" + "перед ходом" + "<br>" + "<b>" + "Цена: " + "</b>" + "$ " + costImp;
    selectedGoods = "imp";
    selectedCost = 990;
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
    if (imgPath === "img/inv-manipulator.png" || imgPath === "img/inv-mop.png" || imgPath === "img/inv-imp.png") {
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
            selectedSellCost = 30;
            buyConfirmImg.setAttribute("src", "img/inv-magnet.png");
            break;
        case "img/inv-smagnet.png":
            itemText = "супер-магнит";
            selectedSellCost = 100;
            buyConfirmImg.setAttribute("src", "img/inv-smagnet.png");
            break;
        case "img/inv-shield.png":
            itemText = "щит";
            selectedSellCost = 30;
            buyConfirmImg.setAttribute("src", "img/inv-shield.png");
            break;
        case "img/inv-ishield.png":
            itemText = "железный щит";
            selectedSellCost = 100;
            buyConfirmImg.setAttribute("src", "img/inv-ishield.png");
            break;
        case "img/inv-trap.png":
            itemText = "капкан";
            selectedSellCost = 130;
            buyConfirmImg.setAttribute("src", "img/inv-trap.png");
            break;
        case "img/inv-vampire.png":
            itemText = "вампирские клыки";
            selectedSellCost = 130;
            buyConfirmImg.setAttribute("src", "img/inv-vampire.png");
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
    }
    loadShopParameters();
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
    aiShopping();
    shopOverlay.style.display = "none";
    hidePopup(shopOver, shopOverCont, true);
    hidePopup(shop, shopCont);

    if (curMap === Map06) {
        showPopup(final, finalCont, 385, 280, true);
        finalOK.style.display = "none";
        finalH2.innerHTML = "Спасибо за игру!";
    } else {
        switchMaps();
        setUpField();
        setTimeout(function () {
            loadMap(curMap, curMapParam);
        }, 500 * gameSpeed);
    }
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
        setTimeout(throwCubic, 500, false, true, false);
    } else {
        console.log("Ход супер-магнитом OK");
        players[current].smagnets--;
        messageMagnet(true);
        setTimeout(throwCubic, 500, false, true, true);
    }
    hidePopup(mag, magCont);
    if (players[current].type === "human") {
        divScore.innerHTML = "";
        overlayCubic.style.display = "block";
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
    let whatinvBh2 = document.querySelector(".what__h2--B");
    let whatinvAEmpty = document.querySelector(".what__items--A p");
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
    items.forEach(function (item) {
        item.remove();
    })
    
    // загружаем данные игрока А

    for (let i = 0; i < players.length; i++) {
        if (players[i].letter === "A") {

            setInfoModelColor(players[i], whatinvAToken);
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

            setInfoModelColor(players[i], whatinvBToken);
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

            setInfoModelColor(players[i], whatinvCToken);
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
    if (player.imp) {
        let newImg = document.createElement("img");
        newImg.setAttribute("src", "img/inv-imp-secret.png");
        newImg.setAttribute("title", "Секретный предмет");
        itemsPath.append(newImg);
    }
}

// ПЕРСОНАЖИ

let char = document.querySelector(".js-character");
let charCloud = document.querySelector(".character__cloud"); // изображение персонажа
let charCont = document.querySelector(".js-character .js-popup-content");
let charMessage1 = document.querySelector(".character__message1");
let charH2 = document.querySelector(".character__h2"); // имя персонажа
let charItem = document.querySelector(".character__item");
let charItemIcon = document.querySelector(".character__item div");
let charItemName = document.querySelector(".character__item h2");
let charMessage2 = document.querySelector(".character__message2"); // текст персонажа
let charMessage3 = document.querySelector(".character__message3");
let charImg = document.querySelector(".character__img"); // дополн. изображение для диалога
let charCancel = document.querySelector(".js-character .js-button-cancel");
let charOK = document.querySelector(".js-character .js-button-ok"); // кнопка ОК
let charArrow = document.querySelector(".character__arrow"); // стрелка

function pressEmperorWelcome() {
    console.log("pressEmperorWelcome");
    hidePopup(char, charCont);
    charMessage1.style.display = "none";
    charMessage2.style.marginLeft = "83px";
    charMessage3.style.display = "none";
    charArrow.style.display = "block";
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
    charMessage2.innerHTML = "<i>" + "Добро пожаловать в магазин!<br><br>С таким капиталом ты вряд ли что-то купишь, поэтому, просто осмотрись для начала.<br><br>Важно: цены останутся без изменений до конца чемпионата! Так что, скидки выпрашивать смысла нет – торговец попался жадный." + "<i>";
    charArrow.style.display = "none";
    charOK.addEventListener("click", pressCharClose, {once: true});
}

function hintMagnet() {
    console.log("hintMagnet");
    showPopup(char, charCont, 395, 420, true, true);
    charMessage2.innerHTML = "<i>" + "Хочешь поймать удачу на крючок? Не проблема!<br>Магнитом можно увеличить шансы на выпадение нужного количества очков на кубике. Данный магнит увеличивает шансы в 2 раза. Это всё равно, что нанести сразу на две грани кубика одну и ту же цифру.<br>Используй с умом." + "<i>";
    newItem("МАГНИТ", "img/inv-magnet.png");
    charOK.addEventListener("click", pressHintItem, {once: true});
}

function hintSMagnet() {
    console.log("hintSMagnet");
    showPopup(char, charCont, 395, 345, true, true);
    charMessage2.innerHTML = "<i>" + "Обычный магнит увеличивал шансы в 2 раза. А этот увеличивает их в 3 раза!<br>Вещь – бомба. Надо быть полным лохом, чтобы проиграть с Супер-магнитом." + "<i>";
    newItem("СУПЕР-МАГНИТ", "img/inv-smagnet.png");
    charOK.addEventListener("click", pressHintItem, {once: true});
    charOK.addEventListener("click", hintTrap, {once: true});
}

function hintShield() {
    console.log("hintShield");
    showPopup(char, charCont, 395, 340, true, true);
    charMessage2.innerHTML = "<i>" + "Теперь можно защититься от атак соперника! Щит хлипкий, но, как гврица, чем богаты, тем и рады. Главное – вовремя надеть." + "<i>";
    newItem("ЩИТ", "img/inv-shield.png");
    charOK.addEventListener("click", pressHintItem, {once: true});
}

function hintIShield() {
    console.log("hintIShield");
    showPopup(char, charCont, 395, 390, true, true);
    charMessage2.innerHTML = "<i>" + "Этот щит гораздо надёжнее обычного. Хватает на 3 хода, но и стоит прилично. Зато не надо беспокоиться, что придёт в негодность раньше времени! Только вовремя надеть." + "<i>";
    newItem("ЖЕЛЕЗНЫЙ ЩИТ", "img/inv-ishield.png");
    charOK.addEventListener("click", pressHintItem, {once: true});
}

function hintTrap() {
    console.log("hintTrap");
    showPopup(char, charCont, 395, 380, true, true);
    charMessage2.innerHTML = "<i>" + "Воу-воу, что это тут у нас такое опасное?..<br>Ах, это ж капкан! Его можно установить на свободную клетку и поймать недруга. Пока он будет разбираться что к чему, его можно обокрасть.<br>Смотри, только сам не попади!" + "<i>";
    newItem("КАПКАН", "img/inv-trap.png");
    charOK.addEventListener("click", pressHintItem, {once: true});
}

function hintVampire() {
    console.log("hintVampire");
    showPopup(char, charCont, 395, 450, true, true);
    charMessage2.innerHTML = "<i>" + "На днях к нам залетал граф Дракула и оставил свои вампирские клыки. Теперь их можно купить в обычном магазине, и почувствовать власть над соперником во время гонок!..<br><br>Ладно, насчёт графа Дракулы я пошутил. Это просто крутое название нового оружия от имперских мастеров. Тактика с ним простая: наступи на врага, забери у него 1 единицу силы, а сам ходи ещё раз. Всё, как раньше… только с клыками!" + "<i>";
    newItem("ВАМПИРСКИЕ КЛЫКИ", "img/inv-vampire.png");
    charOK.addEventListener("click", pressHintItem, {once: true});
}

function newItem(itemText, imgPath) {
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
    charItemIcon.append(img);
}

// закрытие окна с подсказкой о новом предмете в магазине

function pressHintItem() {
    console.log("pressHintItem");
    charMessage1.style.display = "none";
    charItem.querySelector("img").remove();
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
let newCondImg = document.querySelector(".new-condition__flex img");
let newCondH2 = document.querySelector(".new-condition__flex h2");
let newCondText = document.querySelector(".new-condition__text");
let newCondOK = document.querySelector(".js-new-condition .js-popup-ok");

function popupNewcondBranch() {
    console.log("popupNewcondBranch");
    showPopup(newCond, newCondCont, 400, 360);
    newCondOK.addEventListener("click", pressNewcondBranch, {once: true});
    newCondImg.setAttribute("src", "img/new-con-branch.png");
    newCondH2.innerHTML = "РАЗВИЛКА";
    newCondText.innerHTML = "Внимательно изучите пути, прежде чем сделать выбор!";
}

function pressNewcondBranch() {
    console.log("pressNewcondBranch");
    hidePopup(newCond, newCondCont, false, true);

    if (curMap === Map02 && showedHintFore === false) {
        nextScript = {
            script: function () {
                showedHintFore = true;
                setTimeout(gameStart, 500 * gameSpeed);
            }
        };
        hintLine.push("hintFore");
        setTimeout(startHintLine, 99);
    }
}

function popupNewcondOrange() {
    console.log("popupNewcondOrange");
    showPopup(newCond, newCondCont, 400, 295);
    newCondOK.addEventListener("click", pressNewcondOrange, {once: true});
    newCondImg.setAttribute("src", "img/new-con-orange.png");
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
    newCondImg.setAttribute("src", "img/new-con-black.png");
    newCondH2.innerHTML = "ЧЁРНАЯ КЛЕТКА";
    newCondText.innerHTML = "Более слабый вариант красной клетки. Забирает 1 единицу силы.";
}

function popupNewcondBonus() {
    console.log("popupNewcondBonus");
    showPopup(newCond, newCondCont, 400, 315);
    newCondOK.addEventListener("click", pressNewcondBonus, {once: true});
    newCondImg.setAttribute("src", "img/new-con-bonus.png");
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
    newCondImg.setAttribute("src", "img/new-con-star-or.png");
    newCondH2.innerHTML = "ОРАНЖЕВАЯ ЗВЕЗДА";
    newCondText.innerHTML = "Плюс 1 единица силы.";
}

function popupNewcondSpeed() {
    console.log("popupNewcondSpeed");
    showPopup(newCond, newCondCont, 400, 410);
    newCondOK.addEventListener("click", pressNewcondSpeed, {once: true});
    newCondImg.setAttribute("src", "img/new-con-speed.png");
    newCondH2.innerHTML = "МОЛНИЯ";
    newCondText.innerHTML = "Следующие 3 хода очки на кубике<br><b>умножаются на 2." + "</b>" + "<br><br>Жёлтая и оранжевая клетки не добавляют ходов с молнией.<br>Зелёные клетки забирают ходы с молнией.<br>Красные клетки отменяют молнию.";
}

function pressNewcondSpeed() {
    console.log("pressNewcondOrange");
    hidePopup(newCond, newCondCont, false, true);
    setTimeout(popupNewcondDeadend, 99);
}

function popupNewcondDeadend() {
    console.log("popupNewcondDeadend");
    showPopup(newCond, newCondCont, 400, 315);
    newCondOK.addEventListener("click", pressNewcond, {once: true});
    newCondImg.setAttribute("src", "img/new-con-deadend.png");
    newCondH2.innerHTML = "ТУПИК";
    newCondText.innerHTML = "Упёрлись в стенку? Следующий раз ходите назад, пока не вернётесь на тропу.";
}

function popupNewcondBlue() {
    console.log("popupNewcondBlue");
    showPopup(newCond, newCondCont, 400, 360);
    newCondOK.addEventListener("click", pressNewcond, {once: true});
    newCondImg.setAttribute("src", "img/new-con-blue.png");
    newCondH2.innerHTML = "СИНЯЯ СТРЕЛКА";
    newCondText.innerHTML = "С пунктом назначения разберётся удача.<br>Бросьте кубик ещё раз, чтобы определить направление.";
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
    // выяснить, есть ли уже у кого-то этот кубик
    for (let i = 0; i < players.length; i++) {
        if (players[i].imp) {
            console.log("У кого-то есть IMP, попапа не будет");
            return false;
        }
    }

    // выяснить, купил ли человек элитную фишку
    let human = findHuman();
    if (human.model === "brown" || human.model === "black") {
        human.imp = true;
        console.log("Человек купил элиту первым, будет IMP");
        return "IMPtoHuman";
    }

    // выяснить, купил ли один из компьютеров элитную фишку
    for (let i = 0; i < players.length; i++) {
        if (players[i] === human) continue;
        if (players[i].model === "brown" || players[i].model === "black") {
            players[i].imp = true;
            console.log("Комп " + players[i].label + " купил элиту первым");
            return "IMPtoComp";
        }
    }
    console.log("Никто не купил элиту, IMP не будет");
    return false;
}

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
        if (players[i].imp) player = players[i];
    }
    showPopup(char, charCont, 395, 310);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "Эх! <br><b>" + player.label + "</b> первым купил элитную фишку. Теперь секретный подарок у него! Что это за подарок, он тебе не расскажет. Но его влияние ты однажды почувствуешь." + "<i>";
    charArrow.style.display = "none";
    let imgPath = getTokenImg(player.name);
    charImg.setAttribute("src", imgPath);
    charImg.style.display = "block";
    charImg.style.height = "70px";
    charOK.addEventListener("click", pressIMPGiving, {once: true});
}

// чья швабра?

function whosMOP() {
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
    player.mop = true;

    let human = findHuman();
    if (player === human) {
        popupMOPToHuman();
    } else {
        popupMOPToComp();
    }
}

function popupMOPToHuman() {
    console.log("popupMOPToHuman");
    showPopup(char, charCont, 395, 400);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "А вот и чемпион!<br><br>Ты набрал больше всех денег, поэтому, прими от нас этот ВЕЛИКОЛЕПНЫЙ подарок." + "<i>";
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
    showPopup(char, charCont, 395, 460);
    charMessage2.innerHTML = "<i>" + "Знакомься: это – <b>швабра</b>. Правда, она ВЕЛИКОЛЕПНО выглядит?..<br><br>Что? Чего приуныл? Вижу, это совсем не то, чего ты ожидал? Попробуй швабру в действии – и сам убедишься, что она - просто огонь.<br><br>Хотя, лучше не спеши пробовать. Швабра одноразовая. А если ещё неправильно используешь, то поможешь сопернику, а не себе." + "<i>";
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
    charMessage2.innerHTML = "<i>" + "Вот и чемпион!<br><b>" + player.label + "</b> набрал больше всех денег.<br><br>А для тебя у меня отличные новости: ты прошляпил ВЕЛИКОЛЕПНЫЙ подарок! Теперь он достался <b>" + player.label + "</b>. Уверен, эта штука попала в прямые руки." + "<i>";
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
    showPopup(char, charCont, 395, 470, true, true);
    char.classList.add("zindex-hard");
    char.style.left = "0";
    char.style.top = "0";
    charMessage2.innerHTML = "<i>" + "Эй, бойцы! Вы вообще собираетесь крутые фишки покупать?<br><br>Там продавец извёлся уже весь. Говорит, надо кормить десятерых детей! Он до того отчаялся, что объявил НЕВОЗМОЖНУЮ акцию!<br><br>Тому, кто первым купит коричневую или чёрную фишку, он отдаст БЕСПЛАТНО один мощнейший артефакт. По преданию, чтобы этот артефакт достать из параллельного измерения, 125 бравых бойцов старой Империи пожертвовали своими головами.<br><br>Так что … Налетай! Торопись! Покупай… шикарную продукцию от многодетного отца!" + "<i>";
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
    charMessage2.innerHTML = "<i>" + "Прыгуны!<br>Пройдена уже половина пути. Осталось всего 3 трассы, чтобы получить ВЕЛИКОЛЕПНЫЙ секретный подарок! Напомню, что для этого надо стать первым по деньгам.<br><br>За вас болеет вся Империя и мой кот Бубенчик. Не подведите!" + "<i>";
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
    charMessage2.innerHTML = "<i>" + "Тревожные новости пришли с фронта.<br>Три супер-фишки похитили белую фишку, дочь главнокомандующего нашей армии, и просят за неё выкуп…<br><br>Похоже, что вы четверо со своими навыками силы отлично подойдёте для спасательной миссии! Мы разведаем больше информации об этом дерзком похищении и разработаем план.<br><br>Держим в курсе, а вы пока продолжайте чемпионат." + "<i>";
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
    charMessage2.innerHTML = "<i>" + "Я по поводу той ситуации с похищением. В общем, так...<br><br>Белую фишку удерживают в замке супер-фишек в костяном мире под мощной охраной. Это очень опасное место, через которое будет непросто прорваться. Нельзя проникать в замок всей толпой. Лучше скрытно обойти всю их защиту, поэтому кто-то один должен прорваться внутрь. Остальные будут прикрывать снаружи.<br><br>Вы вчетвером отправляетесь в далекое путешествие в сторону костяного мира! В замок пойдёт только один, самый лучший прыгун, набравший наибольшее число призовых денег.<br><br>Вся Империя будет молиться за вас." + "<i>";
    charArrow.style.display = "none";
    charOK.addEventListener("click", pressCloseBeforeShop, {once: true});
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
    charMessage2.innerHTML = "<i>" + "Впереди последняя трасса чемпионата!<br><br>Победит игрок, набравший наибольшее число денег. При равном количестве денег будет учитываться модель фишки.<br><br>Учти это, когда будешь совершать покупки." + "<i>";
    charArrow.style.display = "none";
    charOK.addEventListener("click", pressCloseBeforeShop, {once: true});
}

