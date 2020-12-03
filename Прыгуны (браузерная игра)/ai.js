/* принцип работы AI:

Если не нужно имитировать процесс "думания", то запускается отдельная функция.
Если нужно сымитировать процесс "думания", то запускается aiMakeDecision.
ВСЕ функции, которые запускаются из ДРУГИХ ФАЙЛОВ JS, помечаются префиксом "ai".
В aiMakeDecision аргумент передаёт тип принимаемого решения.
В зависимости от типа запускается case.
Функции внутри case имеют доступ к глобальным переменным.
Вычисляется решение.
Вычисляется вероятность ошибки (еще не готово)
    balanced - ошибается с вероятностью 10%
    risky - ошибается с вероятностью 15%
    careful (осторожный) - ошибается с вероятностью 5%
На основе решения запускается функция, которую обычно запускает человеческий игрок нажатием кнопки.

Типы решений в aiMakeDecision:

attackOrNot - атаковать или нет игрока
    зависит от: силы в запасе, сколько плохих клеток впереди, есть ли плохие клетки в пределах 6 шагов, близость к финишу, на какой клетке стоит

attackWho - кого атаковать, если игроков несколько
    случайный выбор

whichBranch - на какое ответвление свернуть
    зависит от: условий на целевых клетках, общего уровня риска на ветках, количества силы в запасе, отстал ли от соперников

 */

function aiMakeDecision(decisionType) {

    console.log(players[current].label + " думает");
    let addressThink = players[current].name.querySelector(".player__think");
    addressThink.classList.add("player__think-act");

    setTimeout( function () {

        switch (decisionType) {

            case "attackOrNot":

                if (players[current].aiType === "stupid") {
                    console.log("Тип игрока: " + players[current].aiType + " Выбор случайного варианта");
                    let decision = Math.ceil(Math.random() * 2);
                    if (decision == 1) {
                        console.log(players[current].label + " принимает решение: pressAttackNo");
                        pressAttackNo();
                    } else {
                        console.log(players[current].label + " принимает решение: pressAttackYes");
                        pressAttackYes();
                    }
                } else {
                    attackOrNot();
                }
                break;

            case "attackWho":
                console.log("Активировался attackWho");

                // отсеиваем игроков со щитом
                let clean = [];
                for (let i = 0; i < playerRival.length; i++) {
                    if (playerRival[i].armor == 0) clean.push(playerRival[i]);
                }
                if (clean.length == 0) {
                    pressAttackImp();
                    messageAttackArmor();
                    break;
                }

                let whoIndex = Math.floor(Math.random() * clean.length);
                switch (whoIndex) {
                    case 0:
                        selectedRival = clean[0];
                        break;
                    case 1:
                        selectedRival = clean[1];
                        break;
                    case 2:
                        selectedRival = clean[2];
                        break;
                }
                console.log("Выбранный selectedRival = " + selectedRival.label);
                attackOrNot();
                break;

            case "whichBranch":
                console.log("Активировался whichBranch");
                whichBranch();
                break;
        }

        addressThink.classList.remove("player__think-act");

    }, 1850 * gameSpeed);
}

function attackOrNot() {
    console.log("Активировался attackOrNot");
    
/*
    Решение высчитывается на основе переменной riskIndex. 0 - риск нулевой, 10 или больше = 100%-я опасность.
    В некоторых случаях в riskIndex вкладывается понятие мотивации. Чтобы дать игроку больше мотивации, индекс риска уменьшается.
    Например, близость к финишу может заставить игрока рискнуть.
    Проверяется тип AI игрока:
        balanced (сбалансированный) - для положит. решения требует индекс риска не более 5
        risky (азартный) - для положит. решения требует индекс риска не более 8
        careful (осторожный) - для положит. решения требует индекс риска не более 3
        stupid (тупой) - риски не считает, выбирает случайный вариант
*/
    
    let riskIndex = 0;

    // сколько сил в запасе
    if (players[current].power == 1 ) {
        riskIndex += 4;
        console.log("Мало силы, риск +4");
    } else if (players[current].power > 3 ) {
        riskIndex -= 4;
        console.log("Избыток силы, риск -4");
    }

    // где я нахожусь

    let steps1 = curMap[0].stepsToFin; // начало трассы
    let steps2 = curMap[0].stepsToFin / 3 * 2;  // конец 1-й трети
    let steps3 = curMap[0].stepsToFin / 3; // конец 2-й трети
    let mySteps = getStepsToFin(players[current].currentCell); // где я нахожусь
    if ( mySteps > steps2 && mySteps <= steps1 ) {
        // я нахожусь в начале
        riskIndex += 2;
        console.log("Начало трассы, может быть опасно, риск +2");
    }
    if ( mySteps > steps3 && mySteps <= steps2 ) {
        // я нахожусь в середине трассы
        riskIndex += 1;
        console.log("Середина трассы, может быть опасно, риск +1");
    }

    // сколько до "плохой" клетки?
    let badAhead = getStepsToBad(players[current].currentCell);
    if (badAhead > 6 && badAhead <= 14) { // от 7 до 14
        riskIndex += 1;
        console.log("Плохая клетка на горизонте, риск +1");
    } else if (badAhead > 0 && badAhead <= 6) { // от 1 до 6
        riskIndex += 3;
        console.log("Можно наступить на плохую клетку, риск +3");
    }

    // под ногами чёрная клетка
    let curIndex = getCellIndexById(players[current].currentCell);
    if ( curMap[curIndex].type === "black") {
        if ( players[current].power < 2) {
            riskIndex += 10;
            console.log("Чёрная клетка, сила " + players[current].power + ", риск +10");
        }
        if ( players[current].power == 2) {
            riskIndex += 3;
            console.log("Чёрная клетка, сила " + players[current].power + ", риск +3");
        }
        if ( players[current].power > 2) {
            riskIndex += 1;
            console.log("Чёрная клетка, сила " + players[current].power + ", риск +1");
        }
    }

    // сколько до финиша?
    let stepsToGo = getStepsToFin(players[current].currentCell);
    if (stepsToGo < 7) {
        riskIndex -= 5;
        console.log("Финиш близко, риск -5");
    }
    if (stepsToGo > 6 && stepsToGo < 11) {
        riskIndex -= 2;
        console.log("Финиш близко, риск -2");
    }

    // есть отставание?
    if ( howFarBehind() ) {
        riskIndex -= 3;
        console.log("Отставание, можно рискнуть, -3");
    }

    // принятие решения
    console.log("Тип AI: " + players[current].aiType + ", Индекс риска = " + riskIndex);
    let patience = 0;
    switch (players[current].aiType) {
        case "balanced":
            patience = 5;
            break;
        case "risky":
            patience = 8;
            break;
        case "careful":
            patience = 3;
            break;
    }
    if (riskIndex > patience) {
        console.log(players[current].label + " принимает решение: pressAttackNo");
        pressAttackNo();
    } else {
        console.log(players[current].label + " принимает решение: pressAttackYes");
        pressAttackYes();
    }
}

// на какую ветку свернуть

function whichBranch() {

    /*
        система независима от riskIndex
        выбор основан на принципе "за" - "против". Аргументы "за" прибавляют очки ветке, аргументы "против" убавляют
        при равенстве очков запускается следующий алгоритм:
        берется значение branchXType. Игрок выберет то значение, которое соответствует его AI.
        если значения branchXType одинаковые, или не нашлось совпадения по AI игрока, то выбирается случайный вариант

        типы бранчей из параметров карты
        regular - обычный бранч, ни одна фишка на него не среагирует
        risky - идти туда рисково
        careful - вариант для осторожного игрока
        rudiment - бессмысленная ветка; фишка никогда туда не свернёт
        extreme - ещё хуже, чем risky; даже рисковый ai наврядли свернёт
    */

    let decision = 0;
    let branches = []; // индекс массива - это номер ветки (0 - первая ветка, 1 - вторая ветка, 2 - третья ветка), значение индекса - это очки привлекательности
    let curIndex = getCellIndexById(players[current].currentCell);
    // сколько бранчей добавить в массив?
    if (curMap[curIndex].hasOwnProperty("branch1Type")) {
        branches.push(0);
    }
    if (curMap[curIndex].hasOwnProperty("branch2Type")) {
        branches.push(0);
    }
    if (curMap[curIndex].hasOwnProperty("branch3Type")) {
        branches.push(0);
    }

    if (players[current].aiType === "stupid") {
        decision = Math.ceil(Math.random() * branches.length);
        console.log("Тип игрока: " + players[current].aiType + " Выбор случайного варианта: " + decision);
        branchSelect(decision);
    } else {

        console.log("Тип игрока: " + players[current].aiType);
        for (let i = 1; i < branches.length + 1; i++) {
        // код в этом for применяется к КАЖДОЙ ветке!

            let targetId = players[current].currentCell + (cubicScore - stepsCounter) + i * 100;
            if ( curMap.find(item => item.cellid === targetId) === undefined ) {
                console.log("целевая клетка не найдена (возможно впереди ещё один бранч)");
                continue;
            }
            console.log("id целевой клетки = " + targetId);

            if ( curMapParam.badId.includes(targetId) ) {
                branches[i - 1] -= 10;
                console.log("Ветка " + i + ": приземление на плохую, -10");
            }

            let stepsTargetToFin = getStepsToFin(targetId);
            let targetIndex = getCellIndexById(targetId);
            if ( curMap[targetIndex].type === "black" && stepsTargetToFin < 5 && stepsTargetToFin > 0 && players[current].power > 0) {
                branches[i - 1] += 10;
                console.log("Ветка " + i + ": чёрная клетка позволит финишировать, +10");
            }

            if ( curMapParam.goodId.includes(targetId) ) {
                branches[i - 1] += 1;
                console.log("Ветка " + i + ": приземление на хорошую, +1");
            }

            if ( curMapParam.unwId.includes(targetId) ) {
                branches[i - 1] -= 1;
                console.log("Ветка " + i + ": приземление на нежелательную, -1");
            }

            if ( curMapParam.bonId.includes(targetId) ) {
                branches[i - 1] += 3;
                console.log("Ветка " + i + ": приземление на крупный бонус, +3");
            }

            for (let j = 0; j < players.length; j++) {
                if (players[j].currentCell == targetId && players[current].power > 1) {
                    branches[i - 1] += 1;
                    console.log("Ветка " + i + ": замечен соперник, силы достаточно, +1");
                    break;
                }
            }

            let branchType;
            if (i == 1) {
                branchType = curMap[curIndex].branch1Type;
            } else if (i == 2) {
                branchType = curMap[curIndex].branch2Type;
            } else if (i == 3) {
                branchType = curMap[curIndex].branch3Type;
            }

            console.log("branchType = " + branchType);

            if ( branchType === "rudiment" ) {
                branches[i - 1] -= 100;
                console.log("Ветка " + i + " бессмысленна, -100");
            }

            if ( branchType === "extreme" ) {
                if ( players[current].aiType === "risky" ) {
                    branches[i - 1] -= 2;
                    console.log("Ветка " + i + " экстремальная, -2");
                } else {
                    branches[i - 1] -= 100;
                    console.log("Ветка " + i + " экстремальная, -100");
                }
            }

            if ( players[current].aiType === branchType) {
                branches[i - 1] += 1;
                console.log("Ветка " + i + ": нравится фишке, +1");
                if (players[current].aiType === "risky" && players[current].power < 2) {
                    if (players[current].power == 0) {
                        branches[i - 1] -= 2;
                        console.log("Нет сил для такой ветки, -2");
                    } else {
                        branches[i - 1] -= 1;
                        console.log("Мало сил для такой ветки, -1");
                    }
                }
            }

            if ( branchType === "risky" && players[current].aiType === "careful" && players[current].power < 2) {
                branches[i - 1] -= 1;
                console.log("Мало сил для такой ветки, -1");
            }

            if ( branchType === "risky" && howFarBehind() ) {
                branches[i - 1] += 2;
                console.log("Фишка отстала, можно рискнуть, +2");
            }
        } // конец цикла for для бранча

        console.log(branches);

        // сравнение полученных значений

        let equal = false;

        if (branches.length == 2) {
            if (branches[0] == branches[1]) {
                equal = true;
            }
        } else if (branches.length == 3) {
            if (branches[0] == branches[1] && branches[1] == branches[2]) {
                equal = true;
            }
        }

        // принятие решения

        if (equal === false) {

            let greatest = -1000;
            for (let i = 0; i < branches.length; i++) {
                if (branches[i] > greatest) {
                    greatest = branches[i];
                }
            }
            decision = branches.indexOf(greatest) + 1;
            console.log("Выбран лучший вариант: " + decision);

        } else { // значения одинаковы

            if (players[current].aiType === curMap[curIndex].branch1Type) {
                decision = 1;
            }
            if (players[current].aiType === curMap[curIndex].branch2Type) {
                decision = 2;
            }
            if (branches.length == 3) {
                if (players[current].aiType === curMap[curIndex].branch3Type) {
                    decision = 3;
                }
            }
            console.log("Значения равны, AI фишки выбрал свой вариант: " + decision);
        }

        // если решение не принято, то случайный выбор

        if (decision == 0) {
            decision = Math.ceil(Math.random() * branches.length);
            console.log("AI фишки поставил 0, выбор случайного варианта: " + decision);
        }
        branchSelect(decision);
    }
}

// использование магнита фишкой

function aiUseMagnet() {

    if (players[current].skipMoves > 0 || players[current].currentCell == 0) {
        console.log("МАГНИТ-проверка: фишка на старте, либо пропускает ходы");
        return false;
    }
    if (players[current].magnets == 0 && players[current].smagnets == 0) {
        console.log("МАГНИТ-проверка: нет магнитов");
        return false;
    }

    console.log("Тип Ai игрока: " + players[current].aiType);
    let decision = false;
    switch ( checkMagnetPossibility() ) {

        case "fin":
/*
    1. Возможность финиша.
    За каждый аргумент "за" вероятность использования магнита (chance) увеличивается
        а) шаговая проверка на отставание. mySteps <= average. вер +1
        б) на поле 3 игрока. вер +1
        в) на поле 2 игрока. вер +2
        г) в инвентаре 2 магнита. вер +1
        д) в инвентаре 3 магнита. вер +2
        е) рисковый. вер +1
        ж) осторожный. вер -1
    Вер по умолчанию = 2. Вер макс = 8, где 7 = 100%
    Если есть супер-магнит, с вероятностью 80% будет использован именно он (есть градация по ai)
*/
            if (players[current].aiType === "stupid") {
                console.log("Интеллект = stupid, выбор случайного варианта");
                let moveOrNot = Math.ceil(Math.random() * 2);

                if ( moveOrNot == 2) {
                    magName.innerHTML = "Ход магнитом";
                    if (players[current].smagnets > 0) {
                        if ( getChance(50) ) {
                            magName.innerHTML = "Ход СУПЕР-магнитом";
                        }
                    }
                    magnetScore = 6;
                    setTimeout(pressMagnetOk, 2000);
                    return true;
                } else {
                    console.log(players[current].label + " не стал ходить магнитом");
                    return false;
                }
            }

            if ( getMagnetFinJump() ) {
                magName.innerHTML = "Ход магнитом";

                if (players[current].smagnets > 0) {
                    let chance;
                    if (players[current].aiType === "risky") {
                        chance = getChance(80);
                    } else if (players[current].aiType === "careful") {
                        chance = getChance(40);
                    } else {
                        chance = getChance(60);
                    }
                    if ( chance ) {
                        magName.innerHTML = "Ход СУПЕР-магнитом";
                    }
                }
                magnetScore = 6;
                setTimeout(pressMagnetOk, 2000);
                return true;
            } else {
                console.log(players[current].label + " не стал ходить магнитом");
            }

            break;
        case "jump":
/*
    2. Возможность прыжка до финиша.
        Подсчёт вероятности как fin.
    Магнит будет использован, если впереди [желтая, оранжевая, соперник, молния, стрелка вперед], есть силы (если речь о сопернике)
    Желаемая клетка должна быть не дальше 6 ходов от игрока и не дальше 4 ходов от финиша
    Если есть супер-магнит, с вероятностью 20% будет использован именно он. (есть градация по ai)

 */
            if (players[current].aiType === "stupid") {
                console.log("Интеллект = stupid, выбор случайного варианта");
                let moveOrNot = Math.ceil(Math.random() * 2);
                if ( moveOrNot ) decision = true;
            } else {
                decision = getMagnetFinJump();
            }

            if ( decision ) {

                let curStepsToFin = getStepsToFin(players[current].currentCell);
                let goal = []; // здесь будут подходящие варианты очков на кубике
                let cells = []; // все клетки, попадающие под условия
                if (players[current].power > 0) {
                    let rivals = getRivalsIds();
                    if ( players[current].aiType !== "stupid" ) {
                        // убираем игроков, которые сидят на плохих клетках
                        for (let i = 0; i < rivals.length; i++) {
                            if ( !(curMapParam.badId.includes(rivals[i]) || curMapParam.unwId.includes(rivals[i])) ) {
                                cells.push(rivals[i]);
                            }
                        }
                    } else {
                        cells = rivals;
                    }
                }

                let pushers = getCellsPushersIds();
                cells = cells.concat(pushers);
                console.log("Массив из id целей: " + cells);

                // выяснить, находится ли id в подходящем месте
                for (let i = 0; i < cells.length; i++) {
                    if ( Math.abs(cells[i] - players[current].currentCell) > 50) {
                        continue; // искомая клетка на другой ветке
                    }
                    let index = getCellIndexById(cells[i]);
                    let length1 = curStepsToFin - curMap[index].stepsToFin; // расстояние от тек.клетки до целевой клетки
                    let length2 = curMap[index].stepsToFin; // расстояние от целевой клетки до финиша
                    console.log(cells[i] + " length1 = " + length1);
                    console.log(cells[i] + " length2 = " + length2);
                    if ( (length1 > 0 && length1 < 7) && ( length2 > 0 && length2 < 5 ) ) {
                        goal.push(length1); // забиваем число на кубике в массив
                    }
                }

                // выбираем цель
                if (goal.length == 0) {
                    console.log("Нет подходящих целей на прыжок");
                } else {
                    console.log("Подходящие цели на прыжок: ");
                    console.log(goal);
                    let select = Math.floor(Math.random() * goal.length);
                    magnetScore = goal[select];
                    magName.innerHTML = "Ход магнитом";

                    if (players[current].smagnets > 0) {
                        let chance;
                        if (players[current].aiType === "risky") {
                            chance = getChance(30);
                        } else if (players[current].aiType === "careful") {
                            chance = getChance(10);
                        } else {
                            chance = getChance(20);
                        }
                        if ( chance ) {
                            magName.innerHTML = "Ход СУПЕР-магнитом";
                        }
                    }

                    setTimeout(pressMagnetOk, 2000);
                    return true;
                }

            } else {
                console.log(players[current].label + " не стал ходить магнитом");
            }

            break;
        case "bonus":
/*
    3. Впереди крупный бонус.
        а) в инвентаре 2 магнита. вер +1
        б) в инвентаре 3 магнита. вер +2
        в) на поле 3 игрока. вер -1
        г) на поле 2 игрока. вер -2
        д) рисковый. вер +1
        е) осторожный. вер -1
    Вер по умолчанию = 2. Вер макс = 5, где 5 = 100%
    Используется только обычный магнит
 */
            if (players[current].aiType === "stupid") {
                console.log("Интеллект = stupid, выбор случайного варианта");
                let moveOrNot = Math.ceil(Math.random() * 2);
                if ( moveOrNot ) decision = true;

            } else { // вилка для обычного ai
                let chance = 2;

                if (playersCount == 3) {
                    chance--;
                }
                if (playersCount == 2) {
                    chance -= 2;
                }

                let magnets = players[current].magnets + players[current].smagnets;
                if (magnets == 2) {
                    chance++;
                }
                if (magnets == 3) {
                    chance += 2;
                }

                if (players[current].aiType === "risky") {
                    chance++;
                }
                if (players[current].aiType === "careful") {
                    chance--;
                }

                console.log("Шанс по умолчанию: 2, макс. 5, 100% = 5, по факту: " + chance);
                if (chance >= 5) {
                    decision = true;
                } else {

                    if (chance > 0) {
                        chance *= 10;
                        if ( getChance(chance) ) decision = true;
                    }
                }
            } // конец вилки обычного ai

            if ( decision ) {

                let goal = [];
                let curStepsToFin = getStepsToFin(players[current].currentCell);

                for (let i = 0; i < curMapParam.bonId.length; i++) {
                    if ( Math.abs(curMapParam.bonId[i] - players[current].currentCell) > 50) {
                        continue; // искомая клетка на другой ветке
                    }
                    let index = getCellIndexById(curMapParam.bonId[i]);
                    let length = curStepsToFin - curMap[index].stepsToFin; // расстояние от тек.клетки до целевой клетки
                    console.log(curMapParam.bonId[i] + " length = " + length);
                    if ( length > 0 && length < 7 ) {
                        goal.push(length); // забиваем число на кубике в массив
                    }
                }

                let select = Math.floor(Math.random() * goal.length);
                magnetScore = goal[select];
                magName.innerHTML = "Ход магнитом";
                setTimeout(pressMagnetOk, 2000);
                return true;
            }

            break;

        case "avoid":
/*
    4. Возможность обогнуть плохие клетки
        вторая половина трассы +1
        сил в запасе 2-5 +1, менее 2 +2
        магнитов в запасе 2 +1, 3 +2
        отставание +2
        Шанс по умолчанию: 2, макс. 7, 100% = 7
 */
            let chance = 2;

            let index = getCellIndexById(players[current].currentCell);
            let secondHalf = false;
            if ( curMap[index].stepsToFin < curMap[0].stepsToFin / 2 ) secondHalf = true;
            if (secondHalf) {
                chance++;
            }

            if (players[current].power > 1 && players[current].power < 6) {
                chance++;
            } else if (players[current].power < 2) {
                chance += 2;
            }

            let mags = players[current].magnets + players[current].smagnets;
            if (mags == 2) {
                chance++;
            }
            if (mags == 3) {
                chance += 2;
            }

            if ( howFarBehind(true) > 3 ) {
                chance += 2;
            }
            console.log("Шанс по умолчанию: 2, макс. 7, 100% = 7, по факту: " + chance);

            if (chance >= 7) {
                decision = true;
            } else {
                if (chance > 0) {
                    chance *= 10;
                    if ( getChance(chance) ) decision = true;
                }
            }

            // решение принято
            if ( decision ) {
                let badId = getStepsToBad(players[current].currentCell);
                badId += players[current].currentCell;
                let goal = [];
                // собираем все возможные клетки, на которые можно примагнититься
                let goodArray = [];
                goodArray = goodArray.concat(curMapParam.goodId);
                goodArray = goodArray.concat(curMapParam.jumpId);
                console.log("Массив из id целей: " + goodArray);
                // выясняем, годится ли клетка для прыжка
                let stepsToItem;
                for (let k = 0; k < goodArray.length; k++) {
                    stepsToItem = goodArray[k] - players[current].currentCell;
                    if ( Math.abs(stepsToItem) > 50) {
                        continue; // искомая клетка на другой ветке
                    }
                    if (goodArray[k] > badId && stepsToItem > 0 && stepsToItem < 7) {
                        goal.push(stepsToItem);
                    }
                }
                console.log("Подходящие цели на уворот: ");
                console.log(goal);
                if (goal.length > 0) {
                    let select;
                    // отдаётся приоритет goodId
                    for (let k = 0; k < goal.length; k++) {
                        let goalId = players[current].currentCell + goal[k];
                        if (curMapParam.goodId.includes(goalId)) {
                            select = goal[k];
                        }
                    }
                    magnetScore = select;
                    if (select === undefined) {
                        select = Math.floor(Math.random() * goal.length);
                        magnetScore = goal[select];
                    }
                    magName.innerHTML = "Ход магнитом";

                    if (players[current].smagnets > 0) {
                        let chance;
                        if (players[current].aiType === "risky") {
                            chance = getChance(30);
                        } else if (players[current].aiType === "careful") {
                            chance = getChance(10);
                        } else {
                            chance = getChance(20);
                        }
                        if ( chance ) {
                            magName.innerHTML = "Ход СУПЕР-магнитом";
                        }
                    }

                    setTimeout(pressMagnetOk, 2000);
                    return true;
                } else {
                    console.log("Нет подходящих целей на уворот");
                }
            }

            break;
        case "good":
/*
    5. Впереди хорошая клетка (любая).
    Сработает только если одновременно выполняются следующие условия:
        а) отстал
        б) игроков на поле менее 4
        в) вторая половина трассы
    Используется только обычный магнит
 */

            if (players[current].aiType === "stupid") {
                console.log("Интеллект = stupid, выбор случайного варианта");
                let moveOrNot = Math.ceil(Math.random() * 2);
                if ( moveOrNot ) decision = true;
            } else {
                let check1 = howFarBehind(); // если переменная true, то условие выполняется
                let check2 = false;
                if (playersCount < 4) check2 = true;
                let check3 = false;
                let ind = getCellIndexById(players[current].currentCell);
                if ( curMap[ind].stepsToFin < curMap[0].stepsToFin / 2 ) check3 = true;

                if ( check1 && check2 && check3 ) decision = true;
                console.log("check1 = " + check1 + ", check2 = " + check2 + ", check3 = " + check3);
            }

            if ( decision ) {

                let goal = [];
                let curStepsToFin = getStepsToFin(players[current].currentCell);

                for (let i = 0; i < curMapParam.goodId.length; i++) {
                    if ( Math.abs(curMapParam.goodId[i] - players[current].currentCell) > 50) {
                        continue; // искомая клетка на другой ветке
                    }
                    let index = getCellIndexById(curMapParam.goodId[i]);
                    let length = curStepsToFin - curMap[index].stepsToFin; // расстояние от тек.клетки до целевой клетки
                    console.log(curMapParam.goodId[i] + " length = " + length);
                    if ( length > 0 && length < 7 ) {
                        goal.push(length); // забиваем число на кубике в массив
                    }
                }

                let select = Math.floor(Math.random() * goal.length);
                magnetScore = goal[select];
                magName.innerHTML = "Ход магнитом";
                setTimeout(pressMagnetOk, 2000);
                return true;
            }

            break;
        default:
            return false;
    }



}

// проверка - можно ли здесь использовать магнит // возвращает вариант алгоритма (fin, jump, bonus, good) либо false

function checkMagnetPossibility() {

/*
1. Возможность финиша. Если до финиша менее 7 и более 3 ходов.
2. Возможность прыжка до финиша. До финиша от 7 до 10 ходов, между игроком и финишем нет бранчей, игрок стоит не на бранче
3. Впереди крупный бонус. Менее 7 ходов до [оранжевой, красной звезды, копилки], есть обычный магнит
4. Возможность обогнуть плохие клетки. Менее 6 ходов до ближайшей плохой, сил меньше 5
5. Впереди хорошая клетка (любая). Менее 7 ходов до хорошей клетки, больше 1 обычного магнита в запасе
*/

    let curStepsToFin = getStepsToFin(players[current].currentCell);

// Возможность финиша
    let speed = 1;
    if (players[current].speed > -1) speed = 2;
    if ( curStepsToFin < (7 * speed) && curStepsToFin > (3 * speed) ) {
        console.log("МАГНИТ-проверка: алгоритм fin");
        return "fin";
    }

// Возможность прыжка до финиша

    if ( curStepsToFin < 11 ) {
        let index = getCellIndexById(players[current].currentCell);
        let branch = getStepsToBranch(players[current].currentCell);
        if (curMap[index].stopCondition !== "branch" && !(branch > 0) ) {
            console.log("МАГНИТ-проверка: алгоритм jump");
            return "jump";
        } else {
            console.log("МАГНИТ-проверка: впереди бранч, проверяю bonus, avoid и good");
        }
    }

// Впереди крупный бонус

    if (players[current].magnets > 0) {
        let stepsBon = getStepsToBonus(players[current].currentCell);
        if ( stepsBon != null && stepsBon > 0 && stepsBon < 7) {
            console.log("МАГНИТ-проверка: алгоритм good");
            return "bonus";
        }
    }

// Возможность обогнуть плохие клетки

    if (players[current].power < 6) {
        let stepsBad = getStepsToBad(players[current].currentCell);
        if ( stepsBad != null && stepsBad > 0 && stepsBad < 6) {
            console.log("МАГНИТ-проверка: алгоритм avoid");
            return "avoid";
        }
    }

// Впереди хорошая клетка

    if (players[current].magnets > 1) {
        let stepsGood = getStepsToGood(players[current].currentCell);
        if ( stepsGood != null && stepsGood > 0 && stepsGood < 7 ) {
            console.log("МАГНИТ-проверка: алгоритм good");
            return "good";
        }
    }

    console.log("МАГНИТ-проверка: нет подходящего алгоритма");
    return false;
}

// функция для алгоритмов магнита fin и jump

function getMagnetFinJump() {

    let chance = 2;
    let decision = false;

    if ( howFarBehind(true) > 3 ) {
        chance++;
    }

    if (playersCount == 3) {
        chance++;
    }
    if (playersCount == 2) {
        chance += 2;
    }

    let magnets = players[current].magnets + players[current].smagnets;
    if (magnets == 2) {
        chance++;
    }
    if (magnets == 3) {
        chance += 2;
    }

    if (players[current].aiType === "risky") {
        chance++;
    }
    if (players[current].aiType === "careful") {
        chance--;
    }

    console.log("Шанс по умолчанию: 2, макс. 8, 100% = 7, по факту: " + chance);
    if (chance >= 7) {
        decision = true;
    } else {

        if (chance > 1) {
            chance *= 10;
            if ( getChance(chance) ) decision = true;
        }

    }
    return decision;
}

/*
ЩИТ
вероятность применения зависит: 1. от кол-ва игроков сзади в пределах 6 шагов. 2. местоположение на трассе 3. кол-ва щитов в инвентаре

Мин. вер -2, макс. 11, за 100% считать 10

Тупой интеллект учитывает только половины трассы:
Первая половина: +2, вторая половина +5

Перед финишем первым делом используется железный щит, если есть
Тупой интеллект не различает железный и обычный щиты

 */

function aiUseShield(player) {

    let index = getCellIndexById(player.currentCell);
    if (player.currentCell == 0 || curMap[index].type === "checkpoint" || curMap[index].type === "moneybag") {
        console.log(player.label + " ЩИТ-проверка: на старте, чекпойнте или копилке");
        return;
    }
    if (player.shields + player.ishields == 0) {
        console.log(player.label + " ЩИТ-проверка: нет щитов");
        return;
    }

    // ищем соперников
    let rivalsArray = [];
    for (let i = 0; i < players.length; i++) {
        if (players[i].name != player.name && players[i].finished === false) {

            if (player.aiType === "stupid") {
                rivalsArray.push(players[i]);
            } else {
                // если игрок не тупой, то отсеит игроков, которые пропустят ход, либо без сил.
                if (players[i].skipMoves == 0 && players[i].power > 0) {
                    rivalsArray.push(players[i]);
                }
            }
        }
    }

    // находится ли соперник в пределах 6 ходов сзади
    let dangerRivals = [];
    for (let i = 0; i < rivalsArray.length; i++) {
        let steps = player.currentCell - rivalsArray[i].currentCell;
        if (steps < 7 && steps > 0) {
            dangerRivals.push(rivalsArray[i]);
        }
    }

    if (dangerRivals.length == 0) {
        console.log(player.label + " ЩИТ-проверка: сзади нет противников");
        return;
    }

    console.log(player.label + " ЩИТ-проверка: сзади " + dangerRivals.length + " противников");

    // если ни один из противников не ходит передо мной, то отказаться от щита

    if (player.aiType !== "stupid") {

        let order = current;
        let movesNow = 0; // кол-во опасных противников, которые пойдут до того, как пойду я
        for (let n = 0; n < 4; n++) {
            if (order == 4) order = 0;
            if ( players[order] == player) break; // я иду следующим, прекратить
            if ( dangerRivals.includes(players[order]) ) { // следующим идет опасный соперник
                movesNow++;
            }
            order++;
        }

        if (movesNow == 0) {
            console.log(player.label + "Я скоро хожу, нет смысла ставить щит");
            return;
        } else {
            console.log(player.label + "После меня ходит/ходят опасные соперники, надену щит");
        }
    } // конец проверки на следующий ход

    // считаем шансы на применение
    let chance = 0;

    if (player.aiType === "stupid") {
        console.log("aiType = stupid");
        let secondHalf = false;
        if ( curMap[index].stepsToFin < curMap[0].stepsToFin / 2 ) secondHalf = true;

        if (secondHalf) {
            chance += 5;
        } else {
            chance += 2;
        }
    } else {

        // кол-во соперников
        if (dangerRivals.length == 1) chance++;
        if (dangerRivals.length == 2) chance += 2;
        if (dangerRivals.length == 3) chance += 4;

        // в какой точке трассы находится
        let stepsToFin = getStepsToFin(player.currentCell);
        if (stepsToFin < 7 && stepsToFin > 0) {
            chance += 4;
        } else {
            let secondHalf = false;
            if ( curMap[index].stepsToFin < curMap[0].stepsToFin / 2 ) secondHalf = true;

            if (secondHalf) {
                chance += 2;
            } else {
                chance++;
            }
        }

        // сколько щитов в запасе
        if (player.shields + player.ishields == 2) {
            chance += 2;
        }
        if (player.shields + player.ishields == 3) {
            chance += 3;
        }
    }

    // принимаем решение
    console.log("Шанс по умолчанию: 0, макс. 11, 100% = 10, по факту: " + chance);
    let decision = false;
    if (chance >= 10) {
        decision = true;
    } else {

        if (chance > 0) {
            chance *= 10;
            if ( getChance(chance) ) decision = true;
        }

    }

    // активируем щит
    if (decision) {

        if (player.aiType === "stupid") {

            if (player.ishields > 0 && player.shields > 0) {
                let shieldType = Math.ceil(Math.random() * 2);
                if (shieldType == 1) {
                    executeShield(player, "wood");
                } else {
                    executeShield(player, "iron");
                }
                return;
            }

            if (player.ishields > 0) {
                executeShield(player, "iron");
                return;
            }
            if (player.shields > 0) {
                executeShield(player, "wood");
            }
        } else { // вилка на aiType

            let stepsToFin = getStepsToFin(player.currentCell);

            if (player.ishields > 0 && stepsToFin > 0 && stepsToFin < 7) {
                executeShield(player, "iron");
                return;
            }

            if (player.shields > 0) {
                executeShield(player, "wood");
                return;
            }
            if (player.ishields > 0) {
                executeShield(player, "iron");
            }
        } // конец вилки на aiType
    } else {
        console.log(player.label + " передумал надевать щит");
    } // конец активации щита
}


// что купить в магазине

/*
МОДЕЛИ:
перед входом в магазин фишка ставит себе "цель на модель". Например, если сейчас фишка жёлтая, то ставит цель на красную.
если хватает денег, чтобы купить цель, то покупает.
если капитал превысил ожидания, может купить более крутую фишку сразу
отложенная цель - это когда фишка перескакивает сразу на одну модель вперед. Например, сейчас жёлтая, ставит цель на зеленую.
отложенная цель случается с вероятностью 15%, если игрок рисковый, 10% сбалансированный, 5% осторожный.
за всю игру для игрока не может случиться более 2 отложенных целей
если экономия уже превысила 1500, то 2-я отложенная цель не случится
после покупки модели, свойство players[i].dream = "название модели" сбрасывается до false
ТУПОЙ ИНТЕЛЛЕКТ
берет поочередно каждую модель по мере возможности
*/

function aiShopping() {

    let steps = ["white", "yellow", "red", "green", "blue", "brown", "black"];
    let tokenCost = [costWhite, costYellow, costRed, costGreen, costBlue, costBrown, costBlack];
    let model; // название модели мечты (индекс массива steps)
    let myStep; // какая у меня сейчас модель
    let dream; // цена модели мечты
    let buyFact = false; // сделал ли покупку
    let serious = false; // следующая трасса решающая?
    if (curMap === Map05) serious = true;

    for (let i = 0; i < players.length; i++) { // НЕ ЗАБЫТЬ!!! Переменная i только для игроков !!!
        if (players[i].type === "human") continue;
        console.log(players[i].label + " увлёкся шопингом");

        if (players[i].model !== "black") {

            // если мечты ещё нет, обновить мечту
            myStep = steps.indexOf(players[i].model);

            if (players[i].dream === "none") {
                dream = tokenCost[myStep + 1];
                model = steps[myStep + 1];

                // условие отложенной цели
                if ( players[i].model !== "brown" && players[i].aiType !== "stupid" && players[i].aside < 2 ) {
                    let chance;
                    if (players[i].aiType === "risky") chance = getChance(15);
                    if (players[i].aiType === "careful") chance = getChance(5);
                    if (players[i].aiType === "balanced") chance = getChance(10);
                    if (chance) {
                        dream = tokenCost[myStep + 2];
                        model = steps[myStep + 2];
                        players[i].aside++;
                        console.log("Сработало правило отложенной цели");
                    }
                }
                players[i].dream = model;
            } else {
                console.log("Уже есть мечта, перерасчёт не требуется");
                let dreamIndex = steps.indexOf(players[i].dream);
                model = players[i].dream;
                dream = tokenCost[dreamIndex];
            }

            console.log(players[i].label + " мечтает о: " + model + ", цена: " + dream);

            // проверяем, не превышает ли капитал ожидания
            let wow = tokenCost[myStep + 2];

            // если впереди решающая трасса, а покупка съест более 60% бюджета, то ничего не делать
            let wowGo = true;
            let standardGo = true;
            if (players[i].aiType !== "stupid" && players[i].aiType !== "risky") {
                if (serious && (players[i].capital * 0.6) < wow) {
                    console.log("Впереди важная трасса, стоимость WOW-заказа превысит 60% капитала, отмена WOW-заказа");
                    wowGo = false;
                    if (serious && (players[i].capital * 0.6) < dream) {
                        console.log("Стандартный заказ также превысит 60% капитала, отмена заказа");
                        standardGo = false;
                    }
                }
            }

            if ( wow !== undefined && players[i].capital >= wow && wowGo) {
                // оформляем заказ
                players[i].capital -= wow;
                players[i].model = steps[myStep + 2];
                players[i].dream = "none";
                messageBuyModel(players[i], players[i].model);
                buyFact = true;

                // отмена правила отложенной цели
                if ( players[i].aside == 1 && tokenCost[myStep + 2] > 1500 ) {
                    players[i].aside = 2;
                    console.log("Отмена правила отложенной цели: экономия превысила 1500 при aside = 1");
                }

                console.log(players[i].label + " КУПИЛ фишку круче, чем мечтал: " + steps[myStep + 2] + ", остаток на счету: " + players[i].capital);
            } else {

                // капитал не превышает ожидания, смотрим на обычную мечту
                console.log("капитал не превышает ожидания");
                if ( players[i].capital >= dream && standardGo) {
                    // оформляем заказ
                    players[i].capital -= dream;
                    players[i].model = model;
                    players[i].dream = "none";
                    messageBuyModel(players[i], players[i].model);
                    buyFact = true;

                    // отмена правила отложенной цели
                    if ( players[i].aside == 1 && tokenCost[myStep + 1] > 1500 ) {
                        players[i].aside = 2;
                        console.log("Отмена правила отложенной цели: экономия превысила 1500 при aside = 1");
                    }

                    console.log(players[i].label + " КУПИЛ фишку: " + model + ", остаток на счету: " + players[i].capital);
                } else {
                    console.log(players[i].label + " не хватило денег на мечту");
                }
            } // конец вилки двойной мечты
        } else {
            console.log("У " + players[i].label + " чёрная фишка, новые модели не интересны");
        }

/*
у комп-фишки не может быть больше 6 предметов одновременно (рисковый), 5(баланс), 4 (осторож)
если до "цели на модель" остаётся накопить не более 30% денег, то покупки не произойдёт
если фишка покупала предметы (включая модели) последние 3 трассы подряд, а в инвентаре > 1 предмета, то покупки не произойдёт
за 1 заход игрок может купить не более 2 предметов. Если открыто 1-2 предмета, то возьмёт не больше 1.
Предметы выбираются случайным образом.
Если общая стоимость закупа предметов превышает 400 $ или 50% от капитала, то покупки не произойдет. Фишка пробует это сделать 4 раза, комбинируя разные предметы.
ТУПОЙ ИНТЕЛЛЕКТ
Не купит, если не хватает денег.
 */
        let check1 = true; // кол-во предметов в инвентаре
        let check2 = true; // осталось накопить немного
        let check3 = true; // сколько уже покупал подряд
        let check4 = true; // денег больше, чем 49

        let limit = 5;
        if ( players[i].aiType === "risky") limit = 6;
        if ( players[i].aiType === "careful") limit = 4;
        if ( players[i].aiType === "balanced") limit = 5;

        let totalItems = getItemsCount(players[i]);
        if (totalItems >= limit) check1 = false;
        if (!buyFact) {
            if ( players[i].capital / dream >= 0.7 ) check2 = false;
        }
        if ( players[i].buyCount > 2 && totalItems > 1 ) {
            check3 = false;
            players[i].buyCount = 0;
        }
        if ( players[i].capital < 50 ) check4 = false;
        console.log("Покупка предметов, результаты теста: " + check1 + check2 + check3 + check4);

        if ( check1 && check2 && check3 && check4) {

            let itemsArray = []; // список предметов, которые возможно купить текущим игроком
            let buyList = []; // предварительный список покупок
            let itemsCount; // сколько предметов взять

            let mags = players[i].magnets + players[i].smagnets;
            let shi = players[i].shields + players[i].ishields;
            if (unlockMagnet && mags < 3 ) itemsArray.push("magnet");
            if (unlockSMagnet && mags < 3 ) itemsArray.push("smagnet", "smagnet"); // шанс выбрать больше
            if (unlockShield && shi < 3 ) itemsArray.push("shield");
            if (unlockIShield && shi < 3 ) itemsArray.push("ishield");
            if (unlockTrap && !players[i].trap) itemsArray.push("trap");
            if (unlockVampire && !players[i].vampire) itemsArray.push("vampire");
            console.log("Сформирован список возможных предметов: " + itemsArray);

            if (itemsArray.length < 3) {
                itemsCount = 1;
            } else {
                itemsCount = Math.ceil(Math.random() * 2);
            }
            console.log(players[i].label + " возьмёт предметов: " + itemsCount);

            if (itemsArray.length != 0) {
                let sum;
                let tries = 0;

                for (let x = 0; x < 4; x++) {
                    buyList = [];
                    tries++;
                    if (tries == 3) { // на последних 2-х попытках попробует купить только 1 предмет
                        itemsCount = 1;
                    }
                    let index;
                    // генерируем комбинацию предметов
                    for (let k = 0; k < itemsCount; k++) {
                        index = Math.floor(Math.random() * itemsArray.length);
                        buyList.push(itemsArray[index]);
                    }
                    // считаем сумму заказа
                    sum = 0;
                    for (let p = 0; p < buyList.length; p++) {
                        if (buyList[p] === "magnet") sum += costMagnet;
                        if (buyList[p] === "smagnet") sum += costSMagnet;
                        if (buyList[p] === "shield") sum += costShield;
                        if (buyList[p] === "ishield") sum += costIShield;
                        if (buyList[p] === "trap") sum += costTrap;
                        if (buyList[p] === "vampire") sum += costVampire;
                    }
                    console.log("Возможный список покупок: " + buyList + ", сумма: " + sum);
                    if ( (players[i].capital / 2 >= sum && sum < 401) || players[i].aiType === "stupid" ) break;
                }

                // вариант для тупого ai
                if ( players[i].aiType === "stupid" && players[i].capital < sum) {
                    console.log("Мало денег на покупку предметов");
                    if (buyFact) players[i].buyCount++;
                    continue;
                }

                if ( (players[i].capital / 2 < sum ) && tries >= 4 && players[i].aiType !== "stupid") {
                    console.log("Мало денег на покупку предметов");
                } else {
                    // оформляем заказ
                    for (let d = 0; d < buyList.length; d++) {
                        switch(buyList[d]) {
                            case "magnet":
                                players[i].capital -= costMagnet;
                                players[i].magnets++;
                                console.log(players[i].label + " КУПИЛ предмет: МАГНИТ");
                                break;
                            case "smagnet":
                                players[i].capital -= costSMagnet;
                                players[i].smagnets++;
                                console.log(players[i].label + " КУПИЛ предмет: СУПЕР-МАГНИТ");
                                break;
                            case "shield":
                                players[i].capital -= costShield;
                                players[i].shields++;
                                console.log(players[i].label + " КУПИЛ предмет: ЩИТ");
                                break;
                            case "ishield":
                                players[i].capital -= costIShield;
                                players[i].ishields++;
                                console.log(players[i].label + " КУПИЛ предмет: ЖЕЛЕЗНЫЙ ЩИТ");
                                break;
                            case "trap":
                                players[i].capital -= costTrap;
                                players[i].trap = true;
                                console.log(players[i].label + " КУПИЛ предмет: КАПКАН");
                                break;
                            case "vampire":
                                players[i].capital -= costVampire;
                                players[i].vampire = true;
                                console.log(players[i].label + " КУПИЛ предмет: ВАМПИР");
                                break;
                        }
                        buyFact = true;
                    }
                    console.log("остаток на счету: " + players[i].capital);
                }

            } else {
                console.log("не открыт ни один предмет");
            }

        } else {
            console.log(players[i].label + " не стал покупать предметы. Не сработали условия: ");
            if (!check1) console.log("check1: слишком много предметов в инвентаре");
            if (!check2) console.log("check2: до мечты осталось немного");
            if (!check3) console.log("check3: уже делал покупки 3 раза подряд, и предметов > 1");
            if (!check4) console.log("check4: денег меньше, чем 50");
        }

        if (buyFact) players[i].buyCount++;
    } // конец обработки игрока
}

