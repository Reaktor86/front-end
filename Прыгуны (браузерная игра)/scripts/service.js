// СЛУЖЕБНЫЕ ФУНКЦИИ

// достать дату в формате 00:00:00 (часы, минуты, секунды)

function getNewTimeString() {
    let date = new Date();
    let dateStr = date.toString();
    return dateStr.substr(16,2) + ":" + dateStr.substr(19,2) + ":" + dateStr.substr(22,2);
}

// считалка времени в игре

function startGameTime() {
    console.log("Начался отсчёт времени");
    setInterval(function () {
        gameTime++;
        if (gamePaused) {
            document.querySelector(".settings__timer").innerHTML = getGameTime(gameTime);
        }
    }, 1000);
}

// конвертация секунд в формат часы:минуты:секунды

function getGameTime(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor(time / 60) - (hours * 60);
    let seconds = time % 60;
    return [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
    ].join(':');
}

// телепортация текущего игрока

function executeTeleport(goalId) {

    // сброс margin
    players[current].name.style.marginTop = "-12px";
    players[current].name.style.marginLeft = "-2px";
    players[current].shiftPos = 1;

    // если игрок не на старте и не на особом условии трассы 14
    if (players[current].currentCell != 0 && !(curMap === Map14 && players[current].currentCell == 221) ) {
        players[current].name.style.transition = gameSpeed * 0.5 + "s";
    }

    // особое условие на трассе 13
    if (goalId === "var") {
        if (players[current].entity === "none") {
            players[current].name.style.left = curMap[3].coorX + "px";
            players[current].name.style.top = curMap[3].coorY + "px";
        } else {
            players[current].name.style.left = curMap[0].coorX + "px";
            players[current].name.style.top = curMap[0].coorY + "px";
        }
        players[current].currentCell = 0;
        console.log("Телепорт на старт");
        return;
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

    let finIndex;

    // телепортация с нескольких стартов
    if (curMapParam.multipleStarts && ( players[current].currentCell == 0 || (curMap === Map14 && players[current].currentCell == 221) ) ) {
        let x = window.getComputedStyle(players[current].name).left;
        let y = window.getComputedStyle(players[current].name).top;
        for (let i = 0; i < curMap.length; i++) {
            if (curMap[i].coorX + "px" === x && curMap[i].coorY + "px" === y) {
                goalId = curMap[i].teleportTo;
                finIndex = getCellIndexById(goalId);
                players[current].currentCell = curMap[i].teleportTo;
                break;
            }
        }
    } else {
        // телепортация с обычного старта
        finIndex = getCellIndexById(goalId);
        players[current].currentCell = curMap[finIndex].cellid;
    }

    players[current].name.style.left = curMap[finIndex].coorX + "px";
    players[current].name.style.top = curMap[finIndex].coorY + "px";

    console.log("Телепорт на клетку № " + curMap[finIndex].cellid);
}

// восстановить margin у всех фишек

function resetMargin() {
    players.forEach(function (item) {
        item.name.style.marginTop = "-12px";
        item.name.style.marginLeft = "-2px";
    })
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

function getRivalsArray(player) {

    let rivalsArray = [];
    for (let i = 0; i < players.length; i++) {
        if (players[i].currentCell == player.currentCell && players[i].letter !== player.letter) {
            rivalsArray.push(players[i]);
        }
    }
    return rivalsArray;
}

// вернуть currentCell для каждого соперника

function getRivalsIds() {

    let rivalsArray = [];
    for (let i = 0; i < players.length; i++) {
        if (players[i].letter !== players[current].letter && players[i].finished === false) {
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
        if (players[i].letter !== players[current].letter) {
            if (players[i].finished === false) {
                let index = getCellIndexById(players[i].currentCell);
                stepsToFin.push(curMap[index].stepsToFin); // добавляем в массив число: сколько сопернику идти до финиша
            } else {
                stepsToFin.push(-5);
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
        if ( (mySteps - average) > 10 ) {
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

// применять ли правило бонуса за отставание?

function getCatchBonus() {

    if (curMapParam.bone && curMap !== Map15) return;

    // если текущий игрок не вставал на молнию, то удалить молнию Catch Bonus
    let path = players[current].name.querySelector(".player__speed");
    if (players[current].speed < 0) {
        path.style.display = "none";
    }

    if (players[current].speed >= 0 || players[current].skipMoves > 0) {
        return;
    }

    let zoneCount = 0; // кол-во игроков в зоне
    let zoneCurrent = false; // текущий игрок в зоне

    for (let i = 0; i < players.length; i++) {
        if (players[i].finished) continue;
        let index;
        if (players[i].letter === players[current].letter) {
            index = cellIndex;
        } else {
            index = getCellIndexById(players[i].currentCell);
        }
        if (players[i].currentCell == 0 || curMap[index].zone) {
            zoneCount++;
            if (players[i].letter === players[current].letter) {
                zoneCurrent = true;
            }
        }
    }

    console.log("zoneCurrent = " + zoneCurrent + ", zoneCount = " + zoneCount);

    if (zoneCount == 0) {
        // удалить молнии Catch Bonus у всех игроков, исключяя тех, которые вставали на молнию
        for (let i = 0; i < players.length; i++) {
            let path = players[i].name.querySelector(".player__speed");
            if (players[i].speed < 0) {
                path.style.display = "none";
            }
        }
    }

    if (zoneCount == 1 && zoneCurrent) {
        if ( howFarBehind() ) {
            players[current].catchUp = true;
            if (players[current].speed == -1) {
                messageCatch();
                players[current].name.querySelector(".player__speed p").innerHTML = "";
                players[current].name.querySelector(".player__speed").style.display = "flex";

                // подсказка - зона
                if (showedHintZone === false) {
                    nextScript.showed = function () {
                        showedHintZone = true;
                    }
                    hintLine.push("hintZone");
                    startHintLine();
                }
            }
            return;
        } else {
            console.log ("Условия бонуса за отставание сработали, но игрок отстал не сильно");
        }
    }
    document.querySelector(".cubic__icon--x2").style.display = "none";
    players[current].catchUp = false;
}

// узнать статус педестала

function getPedestalStatus(place) {
    let coorX = curMapParam.pedestalCoords[place - 1].coorX;
    let coorY = curMapParam.pedestalCoords[place - 1].coorY;

    for (let i = 0; i < players.length; i++) {
        let playerX = window.getComputedStyle(players[i].name).left;
        let playerY = window.getComputedStyle(players[i].name).top;
        if (coorX + "px" === playerX && coorY + "px" === playerY) {
            console.log("Педестал место " + place + " занято");
            return true;
        }
    }
    console.log("Педестал место " + place + " не занято");
    return false;
}

// заблокировать у человека инвентарь

function blockHumanInv(blockShields) {
    console.log("Блокировка инвентаря на поле");
    let human = findHuman();
    if (human.magnets + human.smagnets > 0) {
        invMagnetsBlock();
    }
    if (human.imp > 0) {
        document.querySelector(".overlay__invblock--imp").style.display = "block";
    }
    if (human.mop) {
        document.querySelector(".overlay__invblock--mop").style.display = "block";
    }
    if (human.trap) {
        document.querySelector(".overlay__invblock--trap").style.display = "block";
    }
    if (blockShields && (human.shields + human.ishields) > 0) {
        invShieldsBlock();
    }
}

// нарисовать клетку

function drawCell(type, num, bonus, joker) {
    
    let cell = document.createElement("div");
    if (type === "finish") {
        cell.classList.add("cell-finish");
        cell.style.backgroundImage = "url(\"img/finish.bmp\")";
        cell.setAttribute("title", "Финиш");
    } else if (type === "deadend") {
        cell.classList.add("cell-deadend");
        cell.style.backgroundImage = "url(\"img/dead-end.bmp\")";
        cell.setAttribute("title", "Тупик");
    } else if (type === "arrowNode") {
        cell.classList.add("cell-arrow-node");
    } else if (type === "jail") {
        cell.classList.add("cell-jail");
        let img = document.createElement("img");
        img.setAttribute("src", "img/jail-cell.png");
        img.style.transition = "2s";
        cell.append(img);
        cell.setAttribute("title", "Тюрьма");
    } else if (type === "chest") {
        cell.classList.add("cell-chest");
        cell.setAttribute("title", "Загадочный сундук");

        let img = document.createElement("img");
        img.classList.add("chest__bottom");
        img.setAttribute("src", "img/chest/chest-bottom.png");
        img.style.zIndex = "10";
        cell.append(img);

        img = document.createElement("img");
        img.classList.add("chest__bomb");
        img.setAttribute("src", "img/chest/chest-bomb.png");
        img.style.zIndex = "9";
        cell.append(img);

        img = document.createElement("img");
        img.classList.add("chest__cap");
        img.setAttribute("src", "img/chest/chest-cap.png");
        img.style.zIndex = "8";
        cell.append(img);

        img = document.createElement("p");
        img.style.zIndex = "11";
        img.innerHTML = "??";
        cell.append(img);

    } else {
        cell.classList.add("cell");
        let img = document.createElement("img");
        if (!joker) {
            cell.innerHTML = "<p>" + num + "</p>";
        }

        switch (type) {
            case "start":
                cell.classList.add("cell-start");
                break;
            case "arrow":
                cell.classList.add("cell-arrow");
                break;
            case "yellow":
                cell.classList.add("cell-yellow");
                cell.setAttribute("title", "+1 ход");
                break;
            case "orange":
                cell.classList.add("cell-orange");
                cell.setAttribute("title", "+2 хода");
                break;
            case "green":
                cell.classList.add("cell-green");
                cell.setAttribute("title", "Пропуск хода");
                break;
            case "red":
                cell.classList.add("cell-red");
                cell.setAttribute("title", "Возврат на чекпойнт, -1 ед.силы");
                break;
            case "checkpoint":
                cell.innerHTML = "<div>" + "<p>" + num + "</p>" + "</div>";
                cell.classList.add("cell-checkpoint");
                cell.setAttribute("title", "Чекпойнт");
                break;
            case "black":
                cell.classList.add("cell-black");
                cell.setAttribute("title", "-1 ед.силы");
                break;
            case "starOrange":
                cell.innerHTML = "";
                img.setAttribute("src", "img/star-orange.svg");
                img.style.position = "absolute";
                cell.setAttribute("title", "+1 ед.силы");
                cell.append(img);
                break;
            case "starRed":
                cell.innerHTML = "";
                img.setAttribute("src", "img/star-red.svg");
                img.style.position = "absolute";
                cell.append(img);
                cell.setAttribute("title", "+2 ед.силы");
                break;
            case "speed":
                cell.innerHTML = "";
                img.setAttribute("src", "img/speed.png");
                img.style.width = "32px";
                img.style.position = "absolute";
                cell.setAttribute("title", "Ускорение");
                cell.append(img);
                break;
            case "moneybag":
                cell.innerHTML = "";
                img.setAttribute("src", "img/moneybag.png");
                img.style.width = "38px";
                img.style.position = "absolute";
                cell.setAttribute("title", "Копилка");
                cell.append(img);
                cell.style.transform = "scale(1.2)";
                cell.style.zIndex = "1";
                mbPanel.style.display = "block";
                break;
            case "hatched":
                cell.classList.add("cell-hatched");
                cell.setAttribute("title", "Зона захвата");
                break;
            case "joker":
                cell.innerHTML = "<p>?</p>";
                cell.classList.add("cell-joker");
                cell.setAttribute("title", "Случайное условие");
                break;
        }
    }

    if (bonus) {
        let p = document.createElement("p");
        p.classList.add("cell__bonus");
        if (bonus > 0) {
            p.innerHTML = "+" + bonus;
            p.style.color = "#00BB07";
        } else {
            p.innerHTML = bonus;
            p.style.color = "#9e0000";
        }
        if (joker) {
            p.style.bottom = "10px";
            p.style.fontSize = "14px";
        }
        cell.append(p);
    }

    if (joker) {
        cell.style.position = "relative";
        cell.style.marginRight = "45px";
        cell.classList.add("joker-img");
    }

    return cell;
}

// сгенерировать условие-сюрприз

function generateSurprise() {

    let condArray = ["yellow", "orange", "green", "red", "black", "star", "speed", "bonus", "penalty", "item", "item"];
    //let condArray = ["item"];
    let index = Math.floor(Math.random() * condArray.length);
    console.log(condArray[index]);
    let type = condArray[index];

    if (type === "star") {
        let starType = Math.ceil(Math.random() * 2);
        if (starType == 2) {
            type = "starOrange";
        } else {
            type = "starRed";
        }
    }

    if (type === "bonus" || type === "penalty") {
        let line = [20,30,40,50,60,70,80,90];
        if (curMap !== Map01 && curMap !== Map02 && curMap !== Map03 && curMap !== Map04) {
            line.push(100,150,200);
        }
        console.log(line);
        let numIndex = Math.floor(Math.random() * line.length);
        let num = line[numIndex];
        if (type === "penalty") {
            num *= -1;
        }
        type = num;
    }

    if (type === "item") {
        let line = ["magnet", "magnet", "shield", "shield", "smagnet", "ishield", "vampire"];
        if (curMap !== Map01 && curMap !== Map02 && curMap !== Map03 && curMap !== Map04) {
            line.push("trap");
        }
        console.log(line);
        //let line = ["trap"];
        let itemIndex = Math.floor(Math.random() * line.length);
        type = line[itemIndex];
    }

    return type;
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

// наведение мышки на кнопки

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

function addCellMouseover() {
    this.style.boxShadow = "inset 0 0 7px 4px rgba(158, 155, 70, 0.6), 0 0 3px 3px white";
    this.style.cursor = "pointer";
    this.style.transform = "scale(1.1)";
    this.style.zIndex = "1";
}

function addCellMouseout() {
    this.style.boxShadow = "inset 0 0 7px 4px rgba(158, 155, 70, 0.6)";
    this.style.cursor = "default";
    this.style.transform = "none";
    this.style.zIndex = "0";
}

function addHardAttackMouseover() {
    this.style.boxShadow = "rgb(255 115 115) 0px 0px 4px 2px inset";
    this.style.cursor = "pointer";
}

function addHardAttackMouseout() {
    this.style.boxShadow = "none";
    this.style.cursor = "default";
}

function addSurMouseover() {
    this.style.color = "white";
    this.style.borderColor = "white";
}

function addSurMouseout() {
    this.style.color = "#b6b6b6";
    this.style.borderColor = "#b6b6b6";
}

// подготовить стандартный оверлей для выбора клетки

function overlayPrepare() {
    overlay.style.height = "124px";
    overlay.style.bottom = "0";
    overlay.style.top = "auto";
}

function overlayReset() {
    overlay.style.height = "100%";
    overlay.style.bottom = "auto";
    overlay.style.top = "0";
}

// анимация красной стрелки

function animateArrow(rot) {
    charArrow.style.transition = "0s";
    charArrow.style.transform = rot + " scale(1.1)";
    setTimeout(function () {
        charArrow.style.transition = ".5s";
        charArrow.style.transform = rot + " scale(1)";
    }, 17);
}

function animateUseArrow(rot) {
    invHintArrow.style.transition = "0s";
    invHintArrow.style.transform = rot + " scale(1.1)";
    setTimeout(function () {
        invHintArrow.style.transition = ".5s";
        invHintArrow.style.transform = rot + " scale(1)";
    }, 17);
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

function hideSomeElems() {
    pedestal.style.display = "none";
    divScore.innerHTML = "";
    let tokens = document.querySelectorAll(".player");
    tokens.forEach(function (item) {
        item.style.visibility = "hidden";
    });
    document.querySelector(".map-name").innerHTML = "";
    document.querySelector(".prize").style.display = "none";
    document.querySelector(".info__cont").style.display = "none";
}

// найти человеческого игрока в массиве

function findHuman() {
    for (let i = 0; i < players.length; i++) {
        if (players[i].letter === "D" ) {
            return players[i];
        }
    }
}

// узнать ветку игрока // !!! возвращает число в формате string !!!

function getPlayersBranch(player) {
    let id = player.currentCell.toString();
    let branch;
    if (id.length < 3) {
        branch = 0;
    } else {
        branch = id.substr(0, id.length - 2);
    }
    console.log("Ветка " + player.label + " = " + branch);
    return branch;
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
        if ( player.imp > 0) imp = 1;
    }

    return player.magnets + player.smagnets + player.shields + player.ishields + trap + vampire + mop + imp;
}

// клавиатурные сокращения

// бросок кубика
function kbThrowCubicOn() {
    document.addEventListener("keydown", kbThrowCubic);
}
function kbThrowCubicOff() {
    document.removeEventListener("keydown", kbThrowCubic);
}
function kbThrowCubic(event) {
    if (event.code === "Space") throwCubic();
}

// пауза

function kbPauseOn() {
    document.addEventListener("keydown", kbPause);
}
function kbPauseOff() {
    document.removeEventListener("keydown", kbPause);
}
function kbPause(event) {
    if (event.code === "Enter") {
        if (gamePaused) {
            pressPauseOff();
        } else {
            pressPauseOn();
        }
    }
}

// ДИАГНОСТИКА И ЧИТЫ

function showGlobals() {
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
        console.log(players[i].label + " MOVES = " + players[i].moves);
        console.log(players[i].label + " CURRENT-CELL = " + players[i].currentCell);
        console.log(players[i].label + " PROTECTION = " + players[i].protection);
        console.log(players[i].label + " ARMOR = " + players[i].armor);
        console.log(players[i].label + " IRON = " + players[i].iron);
        console.log(players[i].label + " CIRCLE = " + players[i].circle);
        console.log(players[i].label + " FINISHED = " + players[i].finished);
        console.log(players[i].label + " SHIFT = " + players[i].shiftPos);
        console.log(players[i].label + " DREAM = " + players[i].dream);
        console.log(players[i].label + " BUYCOUNT = " + players[i].buyCount);
        console.log(players[i].label + " SPEED = " + players[i].speed);
        console.log(players[i].label + " CATCHUP = " + players[i].catchUp);
        console.log(players[i].label + " REVERSE = " + players[i].reverse);
        console.log(players[i].label + " NEXTCOND = " + players[i].nextCond);
        console.log(players[i].label + " ENTITY = " + players[i].entity);
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
        console.log(players[i].label + " MOPCHECK = " + players[i].mopCheck);
        console.log(players[i].label + " IMP = " + players[i].imp);
        console.log(players[i].label + " IMPUSED = " + players[i].impUsed);
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
    let arrows = document.querySelectorAll(".cell-arrow");
    arrows.forEach(function (value) {
        value.style.backgroundColor = "#526582";
    });
    let cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
        for (let k = 0; k < curMap.length; k++) {
            if (curMap[k].type === "arrowEnd") {
                let x = window.getComputedStyle(cells[i]).left;
                let y = window.getComputedStyle(cells[i]).top;
                if (curMap[k].coorX + "px" === x && curMap[k].coorY + "px" === y) {
                    cells[i].style.backgroundColor = "grey";
                }
            }
        }
    }
}

// сбросить параметры попапа с персонажами до умолчания

function resetPopupCharacters() {
    charCloud.setAttribute("src", "img/chars/char-emperor.png");
    charCloud.style.width = "120px";
    charCloud.style.margin = "-48px 0 0 -53px";
    charH2.innerHTML = "ИМПЕРАТОР:";
    charMessage1.style.display = "none";
    charMessage2.style.marginLeft = "83px";
    charMessage3.style.display = "none";
    charMessage3.innerHTML = "<b>Совет:</b><br><br>Всегда слушайте Императора.<br>Император ерунды не посоветует!";
    charArrow.style.display = "block";
    charCancel.style.display = "none";
    charImg.style.display = "none";
    charItem.style.display = "none";
    char.style.background = "#D6FFD2";
    char.classList.remove("zindex-hard");
    charOK.innerHTML = "OK";
}

// вставить в персонажное окно генерала

function addCharGeneral(first) {
    charCloud.setAttribute("src", "img/chars/char-general.png");
    if (first) {
        charH2.innerHTML = "ЗНАКОМЬТЕСЬ";
    } else {
        charH2.innerHTML = "ГЕНЕРАЛ ПЕСЕЦ:";
    }
    charArrow.style.display = "none";
    charImg.style.display = "none";
    char.style.left = "0";
    char.style.top = "0";
    charOK.innerHTML = "OK";
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
    cubicArgs.num = num;
    throwCubic();
}

// удалить фишку с поля с анимацией кручения (только трасса 15)

function animRemoveToken(player) {
    player.name.style.transition = "1s";
    player.name.style.left = "850px";
    player.name.style.top = "400px";
    player.name.style.transform = "rotate(1000deg) scale(0.1)";
    document.querySelector(".player-" + player.letter + " .player__label").style.display = "none";
    setNail(player.name, 0);
    setTimeout(function () {
        player.name.style.display = "none";
    }, 1000);
}

// добавить финишный флажок в инфо

function setFinishFlag(player) {
    let info = document.querySelectorAll(".info__cont .info__token p");
    info.forEach(function (item) {
        if (item.innerHTML === player.letter) {
            let path = item.closest(".info__player");
            path.querySelector(".info__finish").style.display = "block";
            path.querySelector(".info__place").style.display = "none";
        }
    });
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
    curMapParam.branchD1X += x;
    curMapParam.branchD1Y += y;
    curMapParam.branchD2X += x;
    curMapParam.branchD2Y += y;
    curMapParam.branchD3X += x;
    curMapParam.branchD3Y += y;
    curMapParam.branchE1X += x;
    curMapParam.branchE1Y += y;
    curMapParam.branchE2X += x;
    curMapParam.branchE2Y += y;
    curMapParam.branchE3X += x;
    curMapParam.branchE3Y += y;
    curMapParam.branchF1X += x;
    curMapParam.branchF1Y += y;
    curMapParam.branchF2X += x;
    curMapParam.branchF2Y += y;
    curMapParam.branchF3X += x;
    curMapParam.branchF3Y += y;
    curMapParam.branchG1X += x;
    curMapParam.branchG1Y += y;
    curMapParam.branchG2X += x;
    curMapParam.branchG2Y += y;
    curMapParam.branchH1X += x;
    curMapParam.branchH1Y += y;
    curMapParam.branchH2X += x;
    curMapParam.branchH2Y += y;
}

// начать игру с определённой карты

function startMap(x) {
    resetPopupCharacters();
    setNames(userName);
    createPlayers(name1, name2, name3, userName);
    setUpField();
    destroyMap();
    curMap = mapList[x - 1];
    curMapParam = mapParamList[x - 1];
    setTimeout(function () {
        loadMap(curMap, curMapParam, "start");
        startGameTime();
    }, 500);
}

// появить все блоки инвентаря

function showInvblocks() {
    let x = document.querySelectorAll(".overlay__invblock, .overlay__shield");
    x.forEach(function (item) {
        item.style.display = "block";
    });
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
            } else if (saved.status === "restart") {
                td5.innerHTML = "рестарт";
            } else {
                td5.innerHTML = "пройдено";
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

    let save = {
        year: dateStr.substr(11,4),
        month: dateStr.substr(4,3),
        day: dateStr.substr(8,2),
        hour: dateStr.substr(16,2),
        min: dateStr.substr(19,2),
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
        knowJoker: knowJoker,
        knowBone: knowBone,
        showedHintLegend: showedHintLegend,
        showedHintRed: showedHintRed,
        showedHintAttack: showedHintAttack,
        showedHintLog: showedHintLog,
        showedHintZone: showedHintZone,
        showedHintUseMagnet: showedHintUseMagnet,
        showedHintUseSMagnet: showedHintUseSMagnet,
        showedHintUseShield: showedHintUseShield,
        showedHintUseIShield: showedHintUseIShield,
        showedHintUseTrap: showedHintUseTrap,
        showedHintUseHatched: showedHintUseHatched,
        showedHintUseVampire: showedHintUseVampire,
        showedHintUseIMP: showedHintUseIMP,
        showedHintUseMop: showedHintUseMop,
        level: mapList.indexOf(curMap),
        status: status,
        slot: currentSlot,
        reputation: reputation,
        firstBite: firstBite,
        secondBite: secondBite,
        gameTime: gameTime,
        winner: winner,
        impGiven: impGiven,
    };

    let name = "jumpers-slot" + currentSlot;
    localStorage.setItem(name, JSON.stringify(save));
    console.log("ИГРА СОХРАНЕНА, слот: " + currentSlot);
    setTimeout(messageGameSaved, 200);
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
    knowJoker = saved.knowJoker;
    knowBone = saved.knowBone;
    showedHintLegend = saved.showedHintLegend;
    showedHintRed = saved.showedHintRed;
    showedHintAttack = saved.showedHintAttack;
    showedHintLog = saved.showedHintLog;
    showedHintZone = saved.showedHintZone;
    showedHintUseMagnet = saved.showedHintUseMagnet;
    showedHintUseSMagnet = saved.showedHintUseSMagnet;
    showedHintUseShield = saved.showedHintUseShield;
    showedHintUseIShield = saved.showedHintUseIShield;
    showedHintUseTrap = saved.showedHintUseTrap;
    showedHintUseHatched = saved.showedHintUseHatched;
    showedHintUseVampire = saved.showedHintUseVampire;
    showedHintUseIMP = saved.showedHintUseIMP;
    showedHintUseMop = saved.showedHintUseMop;
    reputation = saved.reputation;
    firstBite = saved.firstBite;
    secondBite = saved.secondBite;
    gameTime = saved.gameTime;
    winner = saved.winner;
    impGiven = saved.impGiven;
        
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
    startGameTime();
    console.log("ИГРА ЗАГРУЖЕНА, текущий слот: " + currentSlot);
    messageGameLoaded();
}

// подготовиться к сохранению в новый слот: после активации обзательно сохраниться gameSave!!!

function prepareToSaveNewSlot() {
    console.log("prepareToSaveNewSlot сохранение в новый слот");

    // на всякий случай: сосчитать, сколько на самом деле занятых слотов
    let count = 0;
    for (let i = 1; i < 11; i++) {
        let slot = "slot" + i;
        if (slotParams[slot] === "busy") {
            count++;
        }
    }

    // выяснить, какой слот свободный, установить currentSlot в соответствии со свободным, установить в объекте слот как busy, сохранить параметры
    for (let i = 1; i < 11; i++) {
        let slot = "slot" + i;
        if (slotParams[slot] === "free") {
            currentSlot = i;
            slotParams[slot] = "busy";
            let countBusy = count + 1;
            if (countBusy > 10) countBusy = 10;
            slotParams.busy = countBusy;
            localStorage.setItem("jumpers-slotStatus", JSON.stringify(slotParams));
            break;
        }
    }
}
