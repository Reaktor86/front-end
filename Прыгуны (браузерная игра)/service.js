// СЛУЖЕБНЫЕ ФУНКЦИИ

// телепортация текущего игрока

function executeTeleport(goalId) {

    if (players[current].currentCell != 0) { // если игрок не на старте
        players[current].name.style.transition = gameSpeed * 0.5 + "s";
    }

    // если телепортация на старт
    if (goalId == 0) {
        if (!curMap[0].busy) {
            players[current].name.style.left = curMap[0].coorX + "px";
            players[current].name.style.top = curMap[0].coorY + "px";
            curMap[0].busy = true;
        } else if (!curMap[1].busy) {
            players[current].name.style.left = curMap[1].coorX + "px";
            players[current].name.style.top = curMap[1].coorY + "px";
            curMap[1].busy = true;
        } else if (!curMap[2].busy) {
            players[current].name.style.left = curMap[2].coorX + "px";
            players[current].name.style.top = curMap[2].coorY + "px";
            curMap[2].busy = true;
        } else {
            players[current].name.style.left = curMap[3].coorX + "px";
            players[current].name.style.top = curMap[3].coorY + "px";
            curMap[3].busy = true;
        }
        players[current].currentCell = 0;
        console.log("Телепорт на старт");
        return;
    }

    let finIndex = getCellIndexById(goalId);
    players[current].name.style.left = curMap[finIndex].coorX + "px";
    players[current].name.style.top = curMap[finIndex].coorY + "px";
    players[current].currentCell = curMap[finIndex].cellid;

    console.log("Телепорт на клетку № " + curMap[finIndex].cellid);
}

// найти индекс клетки, если известен её id

function getCellIndexById(id) {

    let index;
    for (let i = 0; i < curMap.length; i++) {
        if (id == curMap[i].cellid) {
            index = i;
            break;
        }
    }
    return index;
}

// сколько до финиша? требуется id клетки или currentCell

function getStepsToFin(currentId) {
    let index = getCellIndexById(currentId);
    return curMap[index].stepsToFin;
}

// сколько до ближайшей "плохой" клетки? требуется currentCell

function getStepsToBad(currentId) {

    let closestId = 1000;

    for (let i = 0; i < curMapParam.badId.length; i++) {
        if ( Math.abs(curMapParam.badId[i] - currentId) > 50) {
            continue; // искомая клетка на другой ветке
        }
        let steps = curMapParam.badId[i] - currentId;
        if ( steps < closestId && steps > 0) {
            closestId = steps;
        }
    }

    if (closestId == 1000) {
        closestId = null;
    }
    console.log("Расстояние до ближ. плохой клетки: " + closestId);
    return closestId;
}

// сколько до ближайшей "хорошей" клетки? требуется currentCell

function getStepsToGood(currentId) {

    let closestId = 1000;

    for (let i = 0; i < curMapParam.goodId.length; i++) {
        if ( Math.abs(curMapParam.goodId[i] - currentId) > 50) {
            continue; // искомая клетка на другой ветке
        }
        let steps = curMapParam.goodId[i] - currentId;
        if ( steps < closestId && steps > 0) {
            closestId = steps;
        }
    }

    if (closestId == 1000) {
        closestId = null;
    }
    console.log("Расстояние до ближ. хорошей клетки: " + closestId);
    return closestId;
}

// сколько до ближайшего крупного бонуса? требуется currentCell

function getStepsToBonus(currentId) {

    let closestId = 1000;

    for (let i = 0; i < curMapParam.bonId.length; i++) {
        if ( Math.abs(curMapParam.bonId[i] - currentId) > 50) {
            continue; // искомая клетка на другой ветке
        }
        let steps = curMapParam.bonId[i] - currentId;
        if ( steps < closestId && steps > 0) {
            closestId = steps;
        }
    }

    if (closestId == 1000) {
        closestId = null;
    }
    console.log("Расстояние до ближ. крупного бонуса: " + closestId);
    return closestId;
}

// сколько до ближайшего бранча? требуется currentCell

function getStepsToBranch(currentId) {

    let closestId = 1000;

    for (let i = 0; i < curMapParam.brId.length; i++) {
        if ( Math.abs(curMapParam.brId[i] - currentId) > 50) {
            continue; // искомая клетка на другой ветке
        }
        let steps = curMapParam.brId[i] - currentId;
        if ( steps < closestId && steps > 0) {
            closestId = steps;
        }
    }

    if (closestId == 1000) {
        closestId = null;
    }
    console.log("Расстояние до ближ. бранча: " + closestId);
    return closestId;
}

// посчитать соперников на клетке, где я стою

function getRivalsArray() {

    let rivalsArray = [];
    // посчитать соперников и занести их в массив
    for (let i = 0; i < players.length; i++) {
        if (players[i].currentCell == players[current].currentCell && players[i].name != players[current].name) {
            rivalsArray.push(players[i]);
        }
    }
    return rivalsArray;
}

// вернуть currentCell для каждого соперника

function getRivalsIds() {

    let rivalsArray = [];
    for (let i = 0; i < players.length; i++) {
        if (players[i].name != players[current].name && players[i].finished === false) {
            rivalsArray.push(players[i].currentCell);
        }
    }
    return rivalsArray;
}

// вернуть список id всех клеток, которые "двигают вперёд", либо позволяют обогнуть опасные клетки или безопасно приблизиться к финишу

function getCellsPushersIds() {
    // стрелка, желтая, оранжевая, молния
    let cells = [];
    for (let i = 0; i < curMapParam.goodId.length; i++) {
        let index = getCellIndexById(curMapParam.goodId[i]);
        if (curMap[index].type === "arrow" || curMap[index].type === "yellow" || curMap[index].type === "orange" || curMap[index].type === "speed") {
            cells.push(curMapParam.goodId[i]);
        }
    }
    for (let i = 0; i < curMapParam.jumpId.length; i++) {
        cells.push(curMapParam.jumpId[i]);
    }
    return cells;
}

// я сильно отстал?

function howFarBehind(getSteps) {
    let stepsToFin = [];

    for (let i = 0; i < players.length; i++) {
        if (players[i].name != players[current].name) {
            if (players[i].finished === false) {
                let index = getCellIndexById(players[i].currentCell);
                stepsToFin.push(curMap[index].stepsToFin); // добавляем в массив число: сколько сопернику идти до финиша
            } else {
                stepsToFin.push(0);
            }
        }
    }

    let mySteps = getStepsToFin(players[current].currentCell);
    let sum = 0;
    for (let k = 0; k < stepsToFin.length; k++) {
        sum += stepsToFin[k];
    }
    let average = sum / stepsToFin.length;

    let subtract;
    if (getSteps) {
        subtract = mySteps - average;
        console.log("average = " + average);
        console.log("Разница с average: " + subtract + " (если число положит., то отставание)");
        return subtract;
    } else {
        if ( (mySteps - average) > 12 ) {
            console.log(players[current].label + ", ты отстаешь от соперников");
            console.log("mySteps = " + mySteps);
            console.log("average = " + average);
            return true;
        } else {
            console.log(players[current].label + ", отставания от соперников не обнаружено");
            console.log("mySteps = " + mySteps);
            console.log("average = " + average);
            return false;
        }
    }
}

// вероятность срабатывания определенного события

function getChance(percent) {

    let per5 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let per10 = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let per15 = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let per20 = [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let per25 = [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let per30 = [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let per35 = [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let per40 = [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0];
    let per45 = [1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0];
    let per50 = [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0];
    let per55 = [1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0];
    let per60 = [1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0];
    let per65 = [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0];
    let per70 = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0];
    let per75 = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0];
    let per80 = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0];
    let per85 = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0];
    let per90 = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0];
    let per95 = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0];
    let selectedArray;
    if (percent == 5) selectedArray = per5;
    if (percent == 10) selectedArray = per10;
    if (percent == 15) selectedArray = per15;
    if (percent == 20) selectedArray = per20;
    if (percent == 25) selectedArray = per25;
    if (percent == 30) selectedArray = per30;
    if (percent == 35) selectedArray = per35;
    if (percent == 40) selectedArray = per40;
    if (percent == 45) selectedArray = per45;
    if (percent == 50) selectedArray = per50;
    if (percent == 55) selectedArray = per55;
    if (percent == 60) selectedArray = per60;
    if (percent == 65) selectedArray = per65;
    if (percent == 70) selectedArray = per70;
    if (percent == 75) selectedArray = per75;
    if (percent == 80) selectedArray = per80;
    if (percent == 85) selectedArray = per85;
    if (percent == 90) selectedArray = per90;
    if (percent == 95) selectedArray = per95;

    let gen = Math.floor(Math.random() * 20);
    console.log("Вероятность " + percent + "%, сгенерирован индекс: " + gen);
    if (selectedArray[gen] == 1) {
        return true;
    } else {
        return false;
    }
}

// наведение мышки на стандартные кнопки

function addButtonMouseover() {
    this.style.background = "#ff4d00";
}

function addButtonMouseout() {
    this.style.background = "#ffbb55";
}

function addItemMouseover() {
    this.style.boxShadow = "0 0 3px 2px #00ff00 inset";
}

function addItemMouseout() {
    this.style.boxShadow = "0 0 3px 1px #1ab31b inset";
}

// анимация красной стрелки

function animateArrow(rot) {
    charArrow.style.transition = "0s";
    charArrow.style.transform = rot + " scale(1.1)";
    setTimeout(function () {
        charArrow.style.transition = ".5s";
        charArrow.style.transform = rot + " scale(1)";
    }, 5);
}

function animateUseArrow(rot) {
    invHintArrow.style.transition = "0s";
    invHintArrow.style.transform = rot + " scale(1.1)";
    setTimeout(function () {
        invHintArrow.style.transition = ".5s";
        invHintArrow.style.transform = rot + " scale(1)";
    }, 5);
}

// блокировка инвентаря

let invm1 = document.querySelector(".overlay__invblock--m1");
let invm2 = document.querySelector(".overlay__invblock--m2");
let invm3 = document.querySelector(".overlay__invblock--m3");

function invMagnetsBlock() {
    invm1.style.display = "block";
    invm2.style.display = "block";
    invm3.style.display = "block";
}

function invMagnetsUnblock() {
    invm1.style.display = "none";
    invm2.style.display = "none";
    invm3.style.display = "none";
}

let invs1 = document.querySelector(".overlay__invblock--s1");
let invs2 = document.querySelector(".overlay__invblock--s2");
let invs3 = document.querySelector(".overlay__invblock--s3");

function invShieldsBlock() {
    invs1.style.display = "block";
    invs2.style.display = "block";
    invs3.style.display = "block";
}

function invShieldsUnblock() {
    invs1.style.display = "none";
    invs2.style.display = "none";
    invs3.style.display = "none";
}

// найти человеческого игрока в массиве

function findHuman() {
    for (let i = 0; i < players.length; i++) {
        if (players[i].letter === "D" ) {
            return players[i];
        }
    }
}

// посчитать все предметы у игрока // без манипулятора, швабра и невозм.кубик опционально // player в формате players[i]

function getItemsCount(player, mopImp) {
    let trap = 0;
    let vampire = 0;
    let mop = 0;
    let imp = 0;
    if ( player.trap ) trap = 1;
    if ( player.vampire ) vampire = 1;

    if (mopImp) {
        if ( player.mop ) mop = 1;
        if ( player.imp ) imp = 1;
    }

    return player.magnets + player.smagnets + player.shields + player.ishields + trap + vampire + mop + imp;
}

// ДИАГНОСТИКА И ЧИТЫ

function showGlobals() {
    console.log("Считалка ходов (должна быть = 0): " + stepsCounter);
    console.log(players[current].label + " на клетке №: " + players[current].currentCell);
}

function showGlobalsBeforeRace() {
    console.log("gameSpeed = " + gameSpeed);
    console.log("skipTutorial = " + skipTutorial);
    console.log("Карта = " + curMapParam.mapName);
    console.log("raceInterrupt (должно быть false) = " + raceInterrupt);
    console.log("isPedestal1Free = " + isPedestal1Free);
    console.log("isPedestal2Free = " + isPedestal2Free);
    console.log("isPedestal3Free = " + isPedestal3Free);
    console.log("isPedestal4Free = " + isPedestal4Free);
    console.log("playersCount = " + playersCount);
    console.log("current player = " + current);
    console.log("branchOver = " + branchOver);
    console.log("");

    for (let i = 0; i < players.length; i++) {
        console.log(players[i].label + " TYPE = " + players[i].type);
        console.log(players[i].label + " AI = " + players[i].aiType);
        console.log(players[i].label + " MODEL = " + players[i].model);
        console.log(players[i].label + " PLACE = " + players[i].place);
        console.log(players[i].label + " POWER = " + players[i].power);
        console.log(players[i].label + " BONUS-MOVES = " + players[i].bonusMoves);
        console.log(players[i].label + " SKIP-MOVES = " + players[i].skipMoves);
        console.log(players[i].label + " CURRENT-CELL = " + players[i].currentCell);
        console.log(players[i].label + " PROTECTION = " + players[i].protection);
        console.log(players[i].label + " ARMOR = " + players[i].armor);
        console.log(players[i].label + " CIRCLE = " + players[i].circle);
        console.log(players[i].label + " FINISHED = " + players[i].finished);
        console.log(players[i].label + " SHIFT = " + players[i].shiftPos);
        console.log(players[i].label + " FORE = " + players[i].fore);
        console.log(players[i].label + " ASIDE = " + players[i].aside);
        console.log(players[i].label + " BUYCOUNT = " + players[i].buyCount);
        console.log(players[i].label + " DREAM = " + players[i].dream);
        console.log(players[i].label + " SPEED = " + players[i].speed);
        console.log(players[i].label + " REVERSE = " + players[i].reverse);
        console.log(players[i].label + " NEXTCOND = " + players[i].nextCond);
        console.log("инвентарь:");
        console.log(players[i].label + " CAPITAL = " + players[i].capital);
        console.log(players[i].label + " BONUS-MONEY = " + players[i].bonusMoney);
        console.log(players[i].label + " MAGNETS = " + players[i].magnets);
        console.log(players[i].label + " SMAGNETS = " + players[i].smagnets);
        console.log(players[i].label + " SHIELDS = " + players[i].shields);
        console.log(players[i].label + " ISHIELDS = " + players[i].ishields);
        console.log(players[i].label + " TRAP = " + players[i].trap);
        console.log(players[i].label + " VAMPIRE = " + players[i].vampire);
        console.log(players[i].label + " MOP = " + players[i].mop);
        console.log(players[i].label + " IMP = " + players[i].imp);
        console.log("");
    }
}

// прыжок на определённую клетку

function jumpToCell(player, goalId) {
    console.log(player.label + " телепорт на клетку № " + goalId);
    let finIndex = getCellIndexById(goalId);
    player.name.style.left = curMap[finIndex].coorX + "px";
    player.name.style.top = curMap[finIndex].coorY + "px";
    player.currentCell = curMap[finIndex].cellid;
    player.protection = false;
}

// подсветить клетки-стрелки

function lightUpArrows() {
    let arrowCells = document.querySelectorAll(".cell-arrow");
    arrowCells.forEach(function (value) {
        value.style.backgroundColor = "grey";
    });
}

// сбросить параметры попапа с персонажами до умолчания

function resetPopupCharacters() {
    charMessage1.style.display = "none";
    charMessage2.style.marginLeft = "83px";
    charMessage3.style.display = "none";
    charArrow.style.display = "block";
}

// отменить правило форы

function foreOff() {
    for (let i = 0; i < players.length; i++) {
        players[i].bonusMoves = 0;
        players[i].fore = false;
    }
}

// бросок кубика на любое число

function setThrowCubic(num) {
    throwCubic(num, false, false);
}

// смещение координат всей текущей трассы // только перед загрузкой карты! // только 1 раз за сессию!

function mapShift(x, y) {

    curMap.forEach(function (item) {
        item.coorX += x;
        item.coorY += y;
    })

    curMapParam.arrowsX += x;
    curMapParam.arrowsY += y;
    curMapParam.branchA1X += x;
    curMapParam.branchA1Y += y;
    curMapParam.branchA2X += x;
    curMapParam.branchA2Y += y;
    curMapParam.branchA3X += x;
    curMapParam.branchA3Y += y;
    curMapParam.branchB1X += x;
    curMapParam.branchB1Y += y;
    curMapParam.branchB2X += x;
    curMapParam.branchB2Y += y;
    curMapParam.branchB3X += x;
    curMapParam.branchB3Y += y;
    curMapParam.branchC1X += x;
    curMapParam.branchC1Y += y;
    curMapParam.branchC2X += x;
    curMapParam.branchC2Y += y;
    curMapParam.branchC3X += x;
    curMapParam.branchC3Y += y;
}

// начать игру с определённой карты

function startMap(x) {
    resetPopupCharacters();
    setUpField();
    destroyMap();
    curMap = mapList[x - 1];
    curMapParam = mapParamList[x - 1];
    setTimeout(function () {
        loadMap(curMap, curMapParam);
    }, 500);
}

// загрузка слотов в меню "загрузка"

function loadSlots() {
    if (slotParams.busy == 0) {
        document.querySelector(".load__empty").style.display = "block";
        console.log("Нет слотов сохранения");
    } else {
        console.log("Есть слоты сохранения: " + slotParams.busy);
        document.querySelector(".load__empty").style.display = "none";
        for (let i = 1; i < 11; i++) {
            let slot = "jumpers-slot" + i;
            let saved = JSON.parse(localStorage.getItem(slot));
            if (!saved) continue;

            let tbody = document.querySelector(".popup--load tbody");
            tbody.prepend(document.createElement("tr"));
            let tr = document.querySelector(".popup--load tr");

            let td1 = document.createElement("td");
            td1.classList.add("load__time");
            td1.innerHTML = saved.year + " " + saved.month + " " + saved.day;
            tr.append(td1);
            let td2 = document.createElement("td");
            td2.classList.add("load__slot");
            td2.innerHTML = "СЛОТ " + i;
            tr.append(td2);
            let td3 = document.createElement("td");
            td3.classList.add("load__label");
            let label;
            for (let k = 0; k < saved.players.length; k++) {
                if (saved.players[k].letter === "D" ) {
                    label = saved.players[k].label;
                }
            }
            td3.innerHTML = label;
            tr.append(td3);
            let td4 = document.createElement("td");
            td4.classList.add("load__map");
            td4.innerHTML = "Трасса " + (saved.level + 1);
            tr.append(td4);
            let td5 = document.createElement("td");
            td5.classList.add("load__status");
            if (saved.status === "start") {
                td5.innerHTML = "старт";
            } else if (saved.status === "finish") {
                td5.innerHTML = "финиш";
            }
            tr.append(td5);
        }

        // добавляем обработчик для кликов по слотам в окне "загрузка"
        let loadGameTable = document.querySelector(".load__cont tbody");
        loadGameTable.addEventListener("click", function (event) {
            let tr = event.target.closest(".load__cont table tr");
            if ( !tr ) {
                console.log("Возврат на !tr");
                return;
            }
            if (!loadGameTable.contains(tr)) {
                console.log("Возврат на !loadGameTable");
                return;
            }
            activateLoad();
            loadGameRemove.style.display = "flex";

            // выделить tr
            unselectLoadTr();
            tr.classList.add("tr--select");

            // выяснить, какой слот выделен
            let slot = document.querySelector(".tr--select .load__slot").innerHTML;
            slot = slot.substr(5);
            slotSelected = slot;
            console.log("slotSelected = " + slotSelected);
        });

    }

}

// сохранение игры

function gameSave(status) {

    let date = new Date();
    let dateStr = date.toString();
    dateStr.substr(11,2);

    let save = {
        year: dateStr.substr(11,4),
        month: dateStr.substr(4,3),
        day: dateStr.substr(8,2),
        players: players,
        gameSpeed: gameSpeed,
        labelsOn: labelsOn,
        skipTutorial: skipTutorial,
        unlockMagnet: unlockMagnet,
        unlockSMagnet: unlockSMagnet,
        unlockShield: unlockShield,
        unlockIShield: unlockIShield,
        unlockTrap: unlockTrap,
        unlockVampire: unlockVampire,
        unlockImp: unlockImp,
        unlockMop: unlockMop,
        unlockManipulator: unlockManipulator,
        conditionsCount: conditionsCount,
        knowBranch: knowBranch,
        knowOrange: knowOrange,
        knowBlack: knowBlack,
        knowArrowBlue: knowArrowBlue,
        knowBonus: knowBonus,
        knowStarOr: knowStarOr,
        knowStarRed: knowStarRed,
        knowMoneybag: knowMoneybag,
        knowSpeed: knowSpeed,
        knowDeadend: knowDeadend,
        knowHatched: knowHatched,
        knowAction: knowAction,
        showedHintLegend: showedHintLegend,
        showedHintRed: showedHintRed,
        showedHintAttack: showedHintAttack,
        showedHintLog: showedHintLog,
        showedHintShop: showedHintShop,
        showedHintMagnet: showedHintMagnet,
        showedHintSMagnet: showedHintSMagnet,
        showedHintShield: showedHintShield,
        showedHintIShield: showedHintIShield,
        showedHintVampire: showedHintVampire,
        showedHintFore: showedHintFore,
        showedHintUseMagnet: showedHintUseMagnet,
        showedHintUseShield: showedHintUseShield,
        level: mapList.indexOf(curMap),
        status: status,
        slot: currentSlot,
    };

    let name = "jumpers-slot" + currentSlot;
    localStorage.setItem(name, JSON.stringify(save));
    console.log("ИГРА СОХРАНЕНА, слот: " + currentSlot);
}

// загрузка игры

function gameLoad(slotNum) {

    let slot = "jumpers-slot" + slotNum;
    let saved = JSON.parse(localStorage.getItem(slot));
    players = saved.players;
    gameSpeed = saved.gameSpeed;
    labelsOn = saved.labelsOn;
    skipTutorial = saved.skipTutorial;
    unlockMagnet = saved.unlockMagnet;
    unlockSMagnet = saved.unlockSMagnet;
    unlockShield = saved.unlockShield;
    unlockIShield = saved.unlockIShield;
    unlockTrap = saved.unlockTrap;
    unlockVampire = saved.unlockVampire;
    unlockImp = saved.unlockImp;
    unlockMop = saved.unlockMop;
    unlockManipulator = saved.unlockManipulator;
    conditionsCount = saved.conditionsCount;
    knowBranch = saved.knowBranch;
    knowOrange = saved.knowOrange;
    knowBlack = saved.knowBlack;
    knowArrowBlue = saved.knowArrowBlue;
    knowBonus = saved.knowBonus;
    knowStarOr = saved.knowStarOr;
    knowStarRed = saved.knowStarRed;
    knowMoneybag = saved.knowMoneybag;
    knowSpeed = saved.knowSpeed;
    knowDeadend = saved.knowDeadend;
    knowHatched = saved.knowHatched;
    knowAction = saved.knowAction;
    showedHintLegend = saved.showedHintLegend;
    showedHintRed = saved.showedHintRed;
    showedHintAttack = saved.showedHintAttack;
    showedHintLog = saved.showedHintLog;
    showedHintShop = saved.showedHintShop;
    showedHintMagnet = saved.showedHintMagnet;
    showedHintSMagnet = saved.showedHintSMagnet;
    showedHintShield = saved.showedHintShield;
    showedHintIShield = saved.showedHintIShield;
    showedHintVampire = saved.showedHintVampire;
    showedHintFore = saved.showedHintFore;
    showedHintUseMagnet = saved.showedHintUseMagnet;
    showedHintUseShield = saved.showedHintUseShield;
        
    // дозагрузка
    for (let i = 0; i < players.length; i++) {
        if (players[i].letter === "A") {
            players[i].name = document.querySelector(".player-A");
            players[i].name.setAttribute("title", players[i].label);
            document.querySelector(".player-A .player__label").innerHTML = players[i].label;
            playerA = players[i];
        }
        if (players[i].letter === "B") {
            players[i].name = document.querySelector(".player-B");
            players[i].name.setAttribute("title", players[i].label);
            document.querySelector(".player-B .player__label").innerHTML = players[i].label;
            playerB = players[i];
        }
        if (players[i].letter === "C") {
            players[i].name = document.querySelector(".player-C");
            players[i].name.setAttribute("title", players[i].label);
            document.querySelector(".player-C .player__label").innerHTML = players[i].label;
            playerC = players[i];
        }
        if (players[i].letter === "D") {
            players[i].name = document.querySelector(".player-D");
            players[i].name.setAttribute("title", players[i].label);
            document.querySelector(".player-D .player__label").innerHTML = players[i].label;
            playerD = players[i];
        }
    }

    if (gameSpeed == 1) {
        pressSpeedFast();
    } else {
        pressSpeedNormal();
    }
    if (skipTutorial) {
        pressTutorialSkip();
    } else {
        pressTutorialOn();
    }
    if (labelsOn) {
        pressLabelsOn();
    } else {
        pressLabelsOff();
    }

    // загрузить карту
    resetPopupCharacters();
    setUpField();
    destroyMap();
    curMap = mapList[+saved.level];
    curMapParam = mapParamList[+saved.level];
    setTimeout(function () {
        loadMap(curMap, curMapParam, saved.status);
    }, 500);
    console.log("ИГРА ЗАГРУЖЕНА, текущий слот: " + currentSlot);
    messageGameLoaded();
}
