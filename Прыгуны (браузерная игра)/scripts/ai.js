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
                getAttackType();
                break;

            case "attackWho":
                console.log("Активировался attackWho");
                let clean = [];

                if (curMap[cellIndex].type !== "hatched") {
                    // если обычная клетка: отсеять противников со щитом
                    for (let i = 0; i < playerRival.length; i++) {
                        if (playerRival[i].armor == 0) clean.push(playerRival[i]);
                    }
                } else {
                    // если штрих-клетка: выбрать противника без щита
                    let noShield = 0;
                    for (let i = 0; i < playerRival.length; i++) {
                        if (playerRival[i].armor == 0) noShield++;
                    }
                    if (noShield > 0) {
                        for (let i = 0; i < playerRival.length; i++) {
                            if (playerRival[i].armor == 0) clean.push(playerRival[i]);
                        }
                    } else {
                        // если нет противника без щита, то атаковать любого
                        for (let i = 0; i < playerRival.length; i++) {
                            clean.push(playerRival[i]);
                        }
                    }
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
                getAttackType();
                break;

            case "whichBranch":
                console.log("Активировался whichBranch");
                whichBranch();
                break;

            case "skipOrNot":
                console.log("Активировался skipOrNot");
                /*
                осторожный: отстает на 6 клеток
                обычный: остает на 10 клеток
                рисковый: остаёт на 15 клеток
                тупой: будет сидеть в копилке, пока она не кончится
                 */

                let decision = true;

                if (players[current].aiType !== "stupid") {
                    let steps = howFarBehind(true);
                    if (players[current].aiType === "careful") {
                        if (steps >= 6) decision = false;
                    }
                    if (players[current].aiType === "balanced") {
                        if (steps >= 10) decision = false;
                    }
                    if (players[current].aiType === "risky") {
                        if (steps >= 15) decision = false;
                    }
                }

                if (decision) {
                    pressAskMBYes();
                } else {
                    pressAskMBNo();
                }

                break;
        }

        addressThink.classList.remove("player__think-act");

    }, 1850 * gameSpeed);
}

function getAttackType() {
    console.log("Соперник выбран: " + selectedRival.label, " определяю тип атаки");
/*
    1. Обычная. Требует силу > 0, противника без щита
    2. Вампир. Требует противника без щита
    3. Кулак. Штрих-клетка, сильная модель фишки, требует противника без железного щита
    проверяется в обратном порядке
 */
    let pow;
    if (selectedRival.armor > 0 ) {
        pow = 6;
    } else {
        pow = 5;
    }

    if (!selectedRival.iron && curMap[cellIndex].type === "hatched" && players[current].power >= pow && (players[current].model === "blue" || players[current].model === "brown" || players[current].model === "black") ) {
        console.log("Тип атаки: КУЛАК");

        /*
        Определить, сколько нужно сил = pow (5 или 6)
    Сколько сил у меня?
    - pow + 1. Вер +1
    - pow + 2 или более. Вер +5
    - рисковый. вер +1
    - первая половина трассы, сила противника меньше 2. вер -5
    - на поле 2 игрока. вер +5
    вер. по умолч. 2, максимум 10, 100% = 5
    если вероятность не сработала, то попробовать следующий вид атаки
         */
        let chance = 2;

        if (players[current].power == pow + 1) {
            chance++;
        }
        if (players[current].power >= pow + 2) {
            chance += 5;
        }
        if (players[current].aiType === "risky") {
            chance++;
        }
        if ( !(curMap[cellIndex].stepsToFin < curMap[0].stepsToFin / 2) && selectedRival.power < 2 ) {
            if (selectedRival.power == 1) {
                chance -= 2;
                console.log("первая половина трассы, противник сила 1, chance -2");
            } else {
                chance -= 5;
                console.log("первая половина трассы, противник сила 0, chance -5");
            }
        }
        if (playersCount == 2) {
            chance += 5;
        }
        console.log("вер. по умолч. 2, максимум 15, 100% = 5, по факту: " + chance);

        let decision = false;
        if (chance >= 5) decision = true;
        switch (chance) {
            case 2:
                if ( getChance(40) ) decision = true;
                break;
            case 3:
                if ( getChance(60) ) decision = true;
                break;
            case 4:
                if ( getChance(80) ) decision = true;
                break;
        }

        if (decision) {
            pressHatchedYes();
            return;
        } else {
            console.log(players[current].label + " передумал бить кулаком");
        }

    } // конец атаки кулаком

    if (players[current].vampire && selectedRival.armor == 0) {
        console.log("Тип атаки: ВАМПИР");

        /*
        В алгоритм уже попадают соперники без щитов, отсеивать не нужно!
    - моя сила 0, вер +3
    - моя сила 1, вер +2
    - моя сила 2-4, вер +1
    - его сила 0, вер +10
    - его сила 1, вер +2
    - его сила 2-4, вер +1
    - середина трассы +2
    - конец трассы +3
    вер по умолч. 2, максимум 11, 100% = 10
         */
        let chance = 2;

        if (players[current].power == 0) {
            chance += 3;
        }
        if (players[current].power == 1) {
            chance += 2;
        }
        if (players[current].power > 1 && players[current].power < 5) {
            chance++;
        }
        if (selectedRival.power == 0) {
            chance += 10;
        }
        if (selectedRival.power == 1) {
            chance += 2;
        }
        if (selectedRival.power > 1 && selectedRival.power < 5) {
            chance++;
        }

        let steps2 = curMap[0].stepsToFin / 3 * 2;  // конец 1-й трети
        let steps3 = curMap[0].stepsToFin / 3; // конец 2-й трети
        let mySteps = curMap[cellIndex].stepsToFin; // где я нахожусь
        if (mySteps > steps3 && mySteps <= steps2) {
            // я нахожусь в середине трассы
            chance += 2;
            console.log("Середина трассы, +2");
        }
        if (mySteps <= steps3) {
            // я нахожусь в конце трассы
            chance += 3;
            console.log("Конец трассы, +3");
        }

        console.log("вер. по умолч. 2, максимум 11, 100% = 10, по факту: " + chance);

        let decision = false;

        if (chance >= 10) {
            decision = true;
        } else if (chance > 2) {
            chance *= 10;
            if (getChance(chance)) decision = true;
        }

        if (decision) {
            pressVampireYes();
            return;
        } else {
            console.log(players[current].label + " передумал кусать");
        }

    } // конец атаки клыками

    if (players[current].power > 0 && selectedRival.armor == 0) {
        attackSimple();
    } else {
        console.log("Не подошёл ни один тип атаки");
        messageHatchCancel(selectedRival);
        setTimeout(getCellType, 500 * gameSpeed);
    }
}

function attackSimple() {
    console.log("Активировался attackSimple");
    
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
        return;
    }

    let riskIndex = 0;

    // сколько сил в запасе
    let danger = 0; // индекс опасности трассы
    if (curMapParam.badId.length > 6 && curMapParam.badId.length < 13) danger++;
    if (curMapParam.badId.length >= 13) danger++;
    console.log("индекс опасности трассы: " + danger);

    if (players[current].power < (2 + danger) ) {
        riskIndex += 4;
        console.log("Мало силы, риск +4");
    } else if (players[current].power > (3 + danger) && players[current].power < (7 + danger) ) {
        riskIndex -= 1;
        console.log("Избыток силы, риск -1");
    } else {
        riskIndex -= 2;
        console.log("Избыток силы, риск -2");
    }

    // где я нахожусь
    let steps1 = curMap[0].stepsToFin; // начало трассы
    let steps2 = curMap[0].stepsToFin / 3 * 2;  // конец 1-й трети
    let steps3 = curMap[0].stepsToFin / 3; // конец 2-й трети
    let mySteps = curMap[cellIndex].stepsToFin; // где я нахожусь
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
        riskIndex += 2;
        console.log("Можно наступить на плохую клетку, риск +2");
    }

    // под ногами чёрная клетка
    if ( curMap[cellIndex].type === "black") {
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

    // экономить ли для сильной атаки?
    // только на 1 половине трассы, клетка не должна быть hatched
    if (curMap[cellIndex].type !== "hatched" && (curMap === Map08 || curMap === Map09 || curMap === Map10 || curMap === Map11) && (players[current].model === "blue" || players[current].model === "brown" || players[current].model === "black") && !(stepsToGo < curMap[0].stepsToFin / 2) ) {
        if (players[current].power > 4 && players[current].power < 7) {
            riskIndex += 4;
            console.log("Можно сэкономить для сильной атаки, +4");
        } else {
            console.log("Нет смысла экономить для сильной атаки");
        }
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
        unwanted - если не приспичило свернуть, то лучше туда не идти
        tasty - вкусная ветка, почти без недостатоков
    */

    let decision = 0;
    let branches = []; // индекс массива - это номер ветки (0 - первая ветка, 1 - вторая ветка, 2 - третья ветка), значение индекса - это очки привлекательности
    // сколько бранчей добавить в массив?
    if (curMap[cellIndex].hasOwnProperty("branch1Type")) {
        branches.push(0);
    }
    if (curMap[cellIndex].hasOwnProperty("branch2Type")) {
        branches.push(0);
    }
    if (curMap[cellIndex].hasOwnProperty("branch3Type")) {
        branches.push(0);
    }

    if (players[current].entity === "sup") {
        // на трассе 15 соперник всегда выбирает 2-й вариант - ближе к финишу
        branchSelect(2);
        return;
    }

    if (players[current].aiType === "stupid") {
        decision = Math.ceil(Math.random() * branches.length);
        console.log("Тип игрока stupid, выбор случайного варианта: " + decision);
        branchSelect(decision);
        return;
    }

    console.log("Тип игрока: " + players[current].aiType);

    for (let i = 1; i < branches.length + 1; i++) {
    // код в этом for применяется к КАЖДОЙ ветке!

        // анализ целевой клетки
        let targetId = players[current].currentCell + (cubicScore - stepsCounter) + i * 100;
        let targetIndex = getCellIndexById(targetId);
        branches[i - 1] = analyseGoalCell(targetId, targetIndex, i);

        // точечная перегрузка параметров целевой клетки
        // трасса 3
        if (curMap === Map03 && players[current].currentCell == 227 && targetId > 332 && targetId < 400) {
            targetId += 104;
            console.log("Ветка " + i + ": фикс джойна, targetId теперь = " + targetId);
        }

        // трасса 4
        if (curMap === Map04 && players[current].currentCell == 651 && targetId > 755 && targetId < 800) {
            targetId += 106;
            console.log("Ветка " + i + ": фикс джойна, targetId теперь = " + targetId);
        }

        // трасса 5
        if (curMap === Map05 && players[current].currentCell == 429 && targetId > 533 && targetId < 600) {
            branches[i - 1] += 3;
            console.log("Ветка " + i + ": баг-фикс трасса 5 клетка 429, +3");
        }

        if (curMap === Map05 && players[current].aiType === "risky" && players[current].currentCell == 7 && targetId == 112 && (players[current].magnets + players[current].smagnets) > 0) {
            branches[i - 1] += 4;
            console.log("Ветка " + i + ": можно совершить безумный поступок, +4");
        }

        if (curMap === Map05 && players[current].currentCell == 7 && targetId > 117 && targetId < 200) {
            branches[i - 1] += 110;
            console.log("Ветка " + i + ": можно финишировать, +110");
        }

        // трасса 6
        if (curMap === Map06 && players[current].currentCell == 24 && targetId > 128 && targetId < 200) {
            targetId += 102;
            console.log("Ветка " + i + ": фикс джойна, targetId теперь = " + targetId);
        }

        // трасса 7
        if (curMap === Map07 && players[current].currentCell == 446 && targetId > 547 && targetId < 600) {
            targetId += 110;
            console.log("Ветка " + i + ": фикс джойна, targetId теперь = " + targetId);
        }

        if (curMap === Map07 && players[current].currentCell == 446 && targetId > 663) {
            branches[i - 1] += 10;
            console.log("Ветка " + i + ": можно финишировать, +10");
        }

        if (curMap === Map07 && players[current].currentCell == 446 && targetId == 663) {
            branches[i - 1] -= 10;
            console.log("Ветка " + i + ": баг-фикс трасса 7 клетка 446, -10");
        }

        // трасса 8
        if (curMap === Map08 && players[current].currentCell == 13 && targetId > 115 && targetId < 200) {
            targetId += 106;
            console.log("Ветка " + i + ": фикс джойна, targetId теперь = " + targetId);
        }

        if (curMap === Map08 && players[current].currentCell == 1071 && targetId == 1172 && players[current].power < 1) {
            branches[i - 1] += 5;
            console.log("Ветка " + i + ": мало силы, беру красную звезду, +5");
        }

        if (curMap === Map08 && players[current].currentCell == 1071 && targetId == 1273 && players[current].power > 3) {
            branches[i - 1] += 9;
            console.log("Ветка " + i + ": силы есть, можно сэкономить 100, +9");
        }

        if (curMap === Map08 && players[current].currentCell == 231 && targetId == 432 && players[current].power > 4) {
            branches[i - 1] += 5;
            console.log("Ветка " + i + ": много сил, можно проскочить вперед, +5");
        }

        // трасса 9
        if (curMap === Map09 && players[current].currentCell == 448 && targetId > 550 && targetId < 600) {
            targetId += 104;
            console.log("Ветка " + i + ": фикс джойна, targetId теперь = " + targetId);
        }

        if (curMap === Map09 && players[current].currentCell == 229 && targetId > 331 && targetId < 400) {
            targetId += 106;
            console.log("Ветка " + i + ": фикс джойна, targetId теперь = " + targetId);
        }

        // трасса 10
        if (curMap === Map10 && players[current].currentCell == 9 && targetId > 114 && targetId < 200) {
            targetId += 104;
            console.log("Ветка " + i + ": фикс джойна, targetId теперь = " + targetId);
        }

        if (curMap === Map10 && players[current].currentCell == 9 && targetId == 114 && players[current].power > 2 ) {
            if (players[current].power > 4) {
                branches[i - 1] += 5;
                console.log("Ветка " + i + ": есть сила > 4, можно проскочить, +5");
            } else {
                if (howFarBehind()) {
                    branches[i - 1] += 5;
                    console.log("Ветка " + i + ": есть сила от 3 до 4, отстаю, можно проскочить, +5");
                }
            }
        }

        //трасса 11
        if (curMap === Map11 && players[current].currentCell == 1239 && targetId > 1341 && targetId < 1400) {
            branches[i - 1] -= 10;
            console.log("Ветка " + i + ": баг-фикс трасса 11 клетка 1239, -10");
        }
        if (curMap === Map11 && players[current].currentCell == 1239 && targetId == 1340 && players[current].power < 4) {
            branches[i - 1] -= 10;
            console.log("Ветка " + i + ": мало силы, нельзя сворачивать, -10");
        }
        if (curMap === Map11 && players[current].currentCell == 1036 && targetId > 1139 && targetId < 1200) {
            if (curMapParam.bonId.includes(1139)) {
                branches[i - 1] += 3;
                console.log("Ветка " + i + ": баг-фикс трасса 11 клетка 1036, +3");
                branches[i - 1] += checkMoneybagActuality(getCellIndexById(1139));
            }
        }
        if (curMap === Map11 && players[current].currentCell == 1442 && targetId == 1543 && players[current].power < 2) {
            branches[i - 1] += 5;
            console.log("Ветка " + i + ": мало силы, беру красную звезду, +5");
        }
        if (curMap === Map11 && players[current].currentCell == 1442 && targetId > 1544 && targetId < 1600) {
            branches[i - 1] -= 2;
            console.log("Ветка " + i + ": баг-фикс трасса 11 клетка 1442, -2");
        }
        if (curMap === Map11 && players[current].currentCell == 826 && targetId == 928 && players[current].power > 3) {
            branches[i - 1] -= 2;
            console.log("Ветка " + i + ": баг-фикс трасса 11 клетка 826, -2");
        }
        if (curMap === Map11 && players[current].aiType !== "risky" && players[current].currentCell == 826 && targetId == 930) {
            branches[i - 1] += 2;
            console.log("Ветка " + i + ": молния на этой трассе - не всегда хорошо, +2 к оранжевой");
        }

        // алазиз всей ветки
        let branchType;
        if (i == 1) {
            branchType = curMap[cellIndex].branch1Type;
        } else if (i == 2) {
            branchType = curMap[cellIndex].branch2Type;
        } else if (i == 3) {
            branchType = curMap[cellIndex].branch3Type;
        }

        console.log("branchType = " + branchType);

        if ( branchType === "rudiment" ) {
            branches[i - 1] -= 100;
            console.log("Ветка " + i + " бессмысленна, -100");
        }

        if ( branchType === "tasty" ) {
            branches[i - 1] += 1;
            console.log("Ветка " + i + " выглядит вкусной, +1");
        }

        if ( branchType === "unwanted" ) {
            branches[i - 1] -= 1;
            console.log("Ветка " + i + " нежелательна, -1");
        }

        if ( branchType === "risky" && players[current].aiType === "careful") {
            branches[i - 1] -= 1;
            console.log("Ветка " + i + " рискованная, ai careful, -1");
        }

        if ( branchType === "extreme" ) {
            if ( players[current].aiType === "risky" ) {
                branches[i - 1] -= 2;
                console.log("Ветка " + i + " экстремальная, ai risky, -2");
            } else {
                branches[i - 1] -= 100;
                console.log("Ветка " + i + " экстремальная, ai not risky, -100");
            }
        }

        if (players[current].aiType === branchType) {
            branches[i - 1] += 1;
            console.log("Ветка " + i + ": нравится фишке, +1");
            if (branchType === "risky" && players[current].power < 2) {
                if (players[current].power == 0) {
                    branches[i - 1] -= 2;
                    console.log("Нет сил для такой ветки, -2");
                } else {
                    branches[i - 1] -= 1;
                    console.log("Мало сил для такой ветки, -1");
                }
            }
        }

        if (curMap === Map02 && branchType === "risky" && howFarBehind() ) {
            branches[i - 1] += 2;
            console.log("Спец-условие трассы 2: фишка отстала, можно рискнуть, +2");
        }

        if (curMap === Map07 && branchType === "risky" && players[current].currentCell == 27 && howFarBehind() ) {
            branches[i - 1] += 2;
            console.log("Спец-условие трассы 7: фишка отстала, можно рискнуть, +2");
        }

        if (impUse && curMap === Map11) {
            if (curMapParam.deadBr.includes(i)) {
                branches[i - 1] -= 100;
                console.log("Ветка " + i + " баг-фикс трассы 11, используется imp, ветка тупиковая, -100");
            }
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

    if (!equal) {

        let greatest = -1000;
        for (let i = 0; i < branches.length; i++) {
            if (branches[i] > greatest) {
                greatest = branches[i];
            }
        }
        decision = branches.indexOf(greatest) + 1;
        console.log("Выбран лучший вариант: " + decision);

    } else { // значения одинаковы

        if (players[current].aiType === curMap[cellIndex].branch1Type) {
            decision = 1;
        }
        if (players[current].aiType === curMap[cellIndex].branch2Type) {
            decision = 2;
        }
        if (branches.length == 3) {
            if (players[current].aiType === curMap[cellIndex].branch3Type) {
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

// анализ целевой клетки бранча

function analyseGoalCell(targetId, targetIndex, i) {
    let result = 0;

    if ( curMap.find(item => item.cellid === targetId) === undefined ) {
        console.log("целевая клетка не найдена (возможно впереди ещё один бранч)");
        return result;
    }

    console.log("id целевой клетки = " + targetId);
    let stepsTargetToFin = getStepsToFin(targetId);

    if ( curMapParam.badId.includes(targetId) ) {
        // красная или чужой капкан -10, чёрная есть сила -2, чёрная нет силы -10, нет условий -2
        let myTrap = "trap" + players[current].letter;

        if (curMap[targetIndex].type === "red") {
            result -= 10;
            console.log("Ветка " + i + ": приземление на красную, -10");
        } else if (curMap[targetIndex].type === "black") {
            if (players[current].power == 0) {
                result -= 10;
                console.log("Ветка " + i + ": приземление на чёрную, нет сил -10");
            } else {
                result -= 2;
                console.log("Ветка " + i + ": приземление на чёрную, есть силы, -2");
            }
        } else if ( (curMap[targetIndex].type === "trapA" || curMap[targetIndex].type === "trapB" || curMap[targetIndex].type === "trapC" || curMap[targetIndex].type === "trapD") && curMap[targetIndex].type !== myTrap) {
            result -= 10;
            console.log("Ветка " + i + ": приземление на капкан, -10");
        } else {
            result -= 1;
            console.log("Ветка " + i + ": приземление на спец-условие, -1");
        }
    }

    if ( curMap[targetIndex].type === "black" && curMap[targetIndex].type2 !== "arrow" && stepsTargetToFin < 5 && stepsTargetToFin > 0 && players[current].power > 0) {
        result += 10;
        console.log("Ветка " + i + ": чёрная клетка позволит финишировать, +10");
    }

    if ( curMapParam.goodId.includes(targetId) ) {
        result += 1;
        console.log("Ветка " + i + ": приземление на хорошую, +1");
    }

    if ( curMapParam.unwId.includes(targetId) ) {
        result -= 1;
        console.log("Ветка " + i + ": приземление на нежелательную, -1");
    }

    if ( curMapParam.bonId.includes(targetId) ) {
        result += 3;
        console.log("Ветка " + i + ": приземление на крупный бонус, +3");
        if (curMap[targetIndex].type === "moneybag") {
            result += checkMoneybagActuality(targetIndex);
        }
    }

    for (let j = 0; j < players.length; j++) {
        let checkPower = true;
        if (curMap[targetIndex].type !== "checkpoint" && curMap[targetIndex].type !== "moneybag" && players[j].currentCell == targetId) {
            // замечен соперник
            if (players[j].armor > 0) {
                result -= 1;
                console.log("Ветка " + i + ": соперник с броней, -1");
            } else {
                if (checkPower && players[current].power > 1) {
                    result += 1;
                    checkPower = false;
                    console.log("Ветка " + i + ": замечен соперник, силы достаточно, +1");
                }
            }
        }
    }

    return result;
}

// проверка на актуальность копилки

function checkMoneybagActuality(targetIndex) {
    let result = 0;
    let confirm = true;
    let steps = howFarBehind(true);
    if (players[current].aiType === "careful") {
        if (steps >= 6) confirm = false;
    }
    if (players[current].aiType === "balanced") {
        if (steps >= 11) confirm = false;
    }
    if (players[current].aiType === "risky") {
        if (steps >= 17) confirm = false;
    }
    for (let i = 0; i < players.length; i++) {
        if (curMap[targetIndex].cellid == players[i].currentCell) {
            confirm = false;
        }
    }
    if (moneybagStep > 10) confirm = false;
    if (!confirm) {
        result = -3;
        console.log("копилка не актуальна, -3");
    } else {
        console.log("копилка актуальна");
    }
    return result;
}

// использование магнита фишкой

function aiUseMagnet() {

    if (players[current].skipMoves > 0 || players[current].currentCell == 0) {
        console.log("МАГНИТ-проверка: фишка на старте, либо пропускает ходы");
        return false;
    }
    if (players[current].magnets + players[current].smagnets == 0) {
        console.log("МАГНИТ-проверка: нет магнитов");
        return false;
    }

    console.log("Тип Ai игрока: " + players[current].aiType);
    let decision = false;
    switch ( checkMagnetPossibility() ) {

        case "blue":
            /*
            Решение зависит от типа ветки, прописанной в параметрах стрелки.
            Если dirType = "tasty", то будет использован магнит
            Вероятность:
            Рисковый 100%
            Обычный 60%
            Осторожный 30%
            Тупой не использует
            Может использоваться как обычный, так и супер-магнит с одинаковой вероятностью
             */
            if (players[current].aiType === "stupid") {
                console.log(players[current].label + " stupid, не стал ходить магнитом");
                return false;
            }

            if (curMap[cellIndex].dir1type !== "tasty" && curMap[cellIndex].dir2type !== "tasty" && curMap[cellIndex].dir3type !== "tasty") {
                console.log("нет интересных стрелок");
                return false;
            }

            if (players[current].aiType === "risky") decision = true;
            if (players[current].aiType === "balanced") {
                if ( getChance(60) ) decision = true;
            }
            if (players[current].aiType === "careful") {
                if ( getChance(30) ) decision = true;
            }

            if (decision) {
                if (players[current].magnets > 0) {
                    magName.innerHTML = "Ход магнитом";
                } else {
                    magName.innerHTML = "Ход СУПЕР-магнитом";
                }
                if (players[current].smagnets > 0) {
                    if ( getChance(50) ) {
                        magName.innerHTML = "Ход СУПЕР-магнитом";
                    }
                }
                let dir = "dir" + 1;
                if (curMap[cellIndex].dir1type === "tasty") dir = "dir" + 1;
                if (curMap[cellIndex].dir2type === "tasty") dir = "dir" + 2;
                if (curMap[cellIndex].dir3type === "tasty") dir = "dir" + 3;
                let scoreIndex = Math.floor(Math.random() * curMap[cellIndex][dir].length);
                magnetScore = curMap[cellIndex][dir][scoreIndex];
                setTimeout(pressMagnetOk, 2000);
                return true;
            } else {
                console.log(players[current].label + " не стал ходить магнитом");
                return false;
            }

        case "fin":
/*
    1. Возможность финиша.
    Алгоритм подсчёта веростнояти см. в функции getMagnetChanceFinJump
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

            if ( getMagnetChanceFinJump(true) ) {
                if (players[current].magnets > 0) {
                    magName.innerHTML = "Ход магнитом";
                } else {
                    magName.innerHTML = "Ход СУПЕР-магнитом";
                }

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
                if (curMap !== Map10 && curMap !== Map11) {
                    magnetScore = 6;
                } else {
                    let index = getCellIndexById(players[current].currentCell);
                    magnetScore = curMap[index].stepsToFin;
                    if (players[current].speed > -1) {
                        if (magnetScore % 2 != 0) {
                            console.log("Из-за молнии нельзя попасть точно на финиш");
                            return false;
                        } else {
                            magnetScore /= 2;
                        }
                    }
                }
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
                if (moveOrNot == 2) decision = true;
            } else {
                decision = getMagnetChanceFinJump();
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
                    if (curMapParam.badId.includes(cells[i])) {
                        continue; // на всякий случай, если на клетку поставили капкан
                    }
                    let index = getCellIndexById(cells[i]);
                    let length1 = Math.abs(curStepsToFin - curMap[index].stepsToFin); // расстояние от тек.клетки до целевой клетки
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

                    if (players[current].magnets > 0) {
                        magName.innerHTML = "Ход магнитом";
                    } else {
                        magName.innerHTML = "Ход СУПЕР-магнитом";
                    }

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
        case "hatch":
            // см функцию magnetHatch
            return true;
        case "bonus":
/*
    3. Впереди крупный бонус.
        а) в инвентаре 1 магнит. вер -1
        а) в инвентаре 2 магнита. вер +1
        б) в инвентаре 3 магнита. вер +2
        в) на поле 3 игрока. вер -1
        г) на поле 2 игрока. вер -2
        д) рисковый. вер +1
        е) осторожный. вер -1
    Вер по умолчанию = 2. Вер макс = 5, где 6 = 100%
    Используется только обычный магнит
 */
            if (players[current].aiType === "stupid") {
                console.log("Интеллект = stupid, выбор случайного варианта");
                let moveOrNot = Math.ceil(Math.random() * 2);
                if (moveOrNot == 2) decision = true;

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
                if (magnets == 1) {
                    chance--;
                }

                if (players[current].aiType === "risky") {
                    chance++;
                }
                if (players[current].aiType === "careful") {
                    chance--;
                }

                console.log("Шанс по умолчанию: 2, макс. 5, 100% = 6, по факту: " + chance);
                if (chance >= 6) {
                    decision = true;
                } else {

                    if (chance > 0) {
                        switch (chance) {
                            case 1:
                                if ( getChance(15) ) decision = true;
                                break;
                            case 2:
                                if ( getChance(30) ) decision = true;
                                break;
                            case 3:
                                if ( getChance(50) ) decision = true;
                                break;
                            case 4:
                                if ( getChance(65) ) decision = true;
                                break;
                            case 5:
                                if ( getChance(80) ) decision = true;
                                break;
                        }
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

                    // проверить актуальность звезды
                    if ((curMap[index].type === "starRed" || curMap[index].type === "starOrange") && players[current].power > 2) {
                        console.log("звезда не актуальна");
                        continue;
                    }

                    // проверить актуальность копилки
                    if (curMap[index].type === "moneybag") {
                        if (checkMoneybagActuality(index) < 0) {
                            continue;
                        }
                    }

                    // спец-условие трассы 9
                    if (curMap === Map09 && curMap[index].cellid == 209) {
                        let num = Math.ceil(Math.random() * 3);
                        if (num == 1) {
                            console.log("стрелка на трассе 9: отброшена с вер. 33%");
                            continue;
                        }
                    }

                    let length = Math.abs(curStepsToFin - curMap[index].stepsToFin); // расстояние от тек.клетки до целевой клетки
                    console.log(curMapParam.bonId[i] + " length = " + length);
                    if ( length > 0 && length < 7 ) {
                        goal.push(length); // забиваем число на кубике в массив
                    }
                }

                if (goal.length > 0) {
                    let select = Math.floor(Math.random() * goal.length);
                    magnetScore = goal[select];
                    magName.innerHTML = "Ход магнитом";
                    setTimeout(pressMagnetOk, 2000);
                    return true;
                } else {
                    console.log("Список целей оказался пуст");
                }
            }

            break;

        case "avoid":
/*
    4. Возможность обогнуть плохие клетки
        вторая половина трассы +1
        сил в запасе 2-5 +1, менее 2 +2
        магнитов в запасе 1 -1, 2 +1, 3 +2
        отставание +2
        Шанс по умолчанию: 1, макс. 6, 100% = 10
        Используется только обычный магнит
 */
            let chance = 1;

            if ( curMap[cellIndex].stepsToFin < curMap[0].stepsToFin / 2 ) {
                // вторая половина трассы
                chance++;
            }

            if (players[current].power < 2) {
                chance += 2;
            } else if (players[current].power < 6) {
                chance++;
            }

            let mags = players[current].magnets + players[current].smagnets;
            if (mags == 2) {
                chance++;
            }
            if (mags == 3) {
                chance += 2;
            }
            if (mags == 1) {
                chance--;
            }
            if (curMap === Map08 && (players[current].currentCell == 646 || players[current].currentCell == 645) ) {
                chance -= 10;
                console.log("баг-фикс трассы 8: на клетке 646/645 нецелесообразно, -10");
            }

            if ( howFarBehind() ) {
                chance += 2;
            }
            console.log("Шанс по умолчанию: 1, макс. 6, 100% = 10, по факту: " + chance);

            if (chance >= 10) {
                decision = true;
            } else if (chance > 1) {
                chance *= 10;
                if (getChance(chance)) decision = true;
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
                    if (curMapParam.badId.includes(goodArray[k])) {
                        continue; // на всякий случай, если на клетку поставили капкан
                    }
                    stepsToItem = Math.abs(goodArray[k] - players[current].currentCell);
                    if (stepsToItem > 50) {
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
                    if (!select) {
                        let newIndex = Math.floor(Math.random() * goal.length);
                        magnetScore = goal[newIndex];
                    }
                    magName.innerHTML = "Ход магнитом";
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
    Используется только обычный магнит
 */

            if (players[current].aiType === "stupid") {
                console.log("Интеллект = stupid, выбор случайного варианта");
                let moveOrNot = Math.ceil(Math.random() * 2);
                if (moveOrNot == 2) decision = true;
            } else {
                if (playersCount < 4 && howFarBehind() ) decision = true;
            }

            if ( decision ) {

                let goal = [];
                let curStepsToFin = getStepsToFin(players[current].currentCell);

                for (let i = 0; i < curMapParam.goodId.length; i++) {
                    if ( Math.abs(curMapParam.goodId[i] - players[current].currentCell) > 50) {
                        continue; // искомая клетка на другой ветке
                    }
                    let index = getCellIndexById(curMapParam.goodId[i]);
                    let length = Math.abs(curStepsToFin - curMap[index].stepsToFin); // расстояние от тек.клетки до целевой клетки
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

function magnetHatch() {

    let hatchPlayers = [];

    for (let i = 0; i < players.length; i++) {

        if (players[i].letter === players[current].letter || players[i].finished || players[i].iron) continue;
        if (players[i].currentCell - players[current].currentCell < 0) continue;
        if (players[i].currentCell - players[current].currentCell > 50) {
            continue; // искомая цель на другой ветке
        }
        let index = getCellIndexById(players[i].currentCell);
        if (curMap[index].type === "hatched") {
            hatchPlayers.push(players[i]);
        }
    }

    if (hatchPlayers.length == 0) {
        console.log("массив с целями пуст");
        return false;
    }

    // выбираем цель
    let goal = [];
    let curStepsToFin = curMap[cellIndex].stepsToFin;
    let speed = 1;
    if (players[current].speed > -1 || players[current].catchUp) speed = 2;

    for (let i = 0; i < hatchPlayers.length; i++) {

        let index = getCellIndexById(hatchPlayers[i].currentCell);
        let length = Math.abs(curStepsToFin - curMap[index].stepsToFin); // расстояние от тек.клетки до целевой клетки
        console.log(hatchPlayers[i].label + " length = " + length);
        if ( length > 0 && length < (7 * speed) ) {
            goal.push(length); // забиваем число на кубике в массив
        }
    }

    if (goal.length > 0) {
        let select = Math.floor(Math.random() * goal.length);
        magnetScore = goal[select];
        magName.innerHTML = "Ход магнитом";
        if (players[current].smagnets > 0) magName.innerHTML = "Ход СУПЕР-магнитом";
        setTimeout(pressMagnetOk, 2000);
        return true;
    } else {
        console.log("Список целей оказался пуст");
        return false;
    }
}

// проверка - можно ли здесь использовать магнит // возвращает вариант алгоритма (blue, fin, jump, hatch, bonus, avoid, good) либо false

function checkMagnetPossibility() {

/*
Алгоритмы расположены в порядке важности. Если подошёл какой-то вариант, следующие проверки отменяются.
1. Синяя стрелка
2. Возможность финиша. Если до финиша менее 7 и более 3 ходов.
3. Возможность прыжка до финиша. До финиша от 7 до 10 ходов, между игроком и финишем нет бранчей, игрок стоит не на бранче, не трасса 10 или 11
4. Возможность выкинуть соперника с трассы. ai не тупой и не осторожный, не реверс, сила > 5, фишка синяя, кор, или черн, есть обычный магнит, больше 2 игроков на поле
5. Впереди крупный бонус. Менее 7 ходов до [оранжевой, красной звезды, копилки, крупный бонус], есть обычный магнит
6. Возможность обогнуть плохие клетки. Менее 6 ходов до ближайшей плохой, сил меньше 5, есть обычный магнит
7. Впереди хорошая клетка (любая). Менее 7 и более 1 ходов до хорошей клетки, есть обычный магнит, больше 1 магнита всего
*/

// Синяя стрелка

    if (curMap[cellIndex].type === "arrowNode") {
        console.log("МАГНИТ-проверка: алгоритм blue");
        return "blue";
    }

    let curStepsToFin = getStepsToFin(players[current].currentCell);
    let speed = 1;
    if (players[current].speed > -1 || players[current].catchUp) speed = 2;

// Возможность финиша
    let min = 3;
    if (curMap === Map10 || curMap === Map11) {
        min = 0;
    }

    if ( curStepsToFin < (7 * speed) && curStepsToFin > (min * speed) ) {
        console.log("МАГНИТ-проверка: алгоритм fin");
        return "fin";
    }

// Возможность прыжка до финиша

    if ( curStepsToFin < 11 && curStepsToFin >= 7 && speed == 1 && curMap !== Map10 && curMap !== Map11) {
        let branch = getStepsToBranch(players[current].currentCell);
        if (curMap[cellIndex].stopCondition !== "branch" && !(branch > 0) ) {
            console.log("МАГНИТ-проверка: алгоритм jump");
            return "jump";
        } else {
            console.log("МАГНИТ-проверка: [jump] впереди бранч, проверяю дальше");
        }
    }

// Возможность выкинуть соперника с трассы // если условие не сработало, то продолжить проверку

    if (players[current].aiType !== "stupid" && players[current].aiType !== "careful" && !players[current].reverse && players[current].power > 5 && players[current].magnets > 0 && (players[current].model === "blue" || players[current].model === "brown" || players[current].model === "black") && playersCount > 2) {
        console.log("МАГНИТ-проверка: алгоритм hatch");
        if (magnetHatch()) {
            console.log("HATCH!");
            return "hatch";
        } else {
            console.log("hatch не подходит, проверяю дальше");
        }
    }

// Впереди крупный бонус

    if (players[current].magnets > 0 && speed == 1) {
        let stepsBon = getStepsToBonus(players[current].currentCell);
        if ( stepsBon != null && stepsBon > 0 && stepsBon < 7) {
            console.log("МАГНИТ-проверка: алгоритм bonus");
            return "bonus";
        }
    }

// Возможность обогнуть плохие клетки

    if (players[current].magnets > 0 && players[current].power < 5 && speed == 1) {
        let stepsBad = getStepsToBad(players[current].currentCell);
        if ( stepsBad != null && stepsBad > 0 && stepsBad < 6) {
            console.log("МАГНИТ-проверка: алгоритм avoid");
            return "avoid";
        }
    }

// Впереди хорошая клетка

    if (players[current].magnets > 0 && (players[current].magnets + players[current].smagnets > 1) && speed == 1) {
        let stepsGood = getStepsToGood(players[current].currentCell);
        if ( stepsGood != null && stepsGood > 2 && stepsGood < 7 ) {
            console.log("МАГНИТ-проверка: алгоритм good");
            return "good";
        }
    }

    console.log("МАГНИТ-проверка: нет подходящего алгоритма");
    return false;
}

// функция для алгоритмов магнита fin и jump. Если пришло из алгоритма fin, то аргумент fin будет true

function getMagnetChanceFinJump(fin) {

/*
    отстаю больше чем на 3 шага. вер +1
    1 место ещё никто не занял. вер +2
    занято 1 место, но не занято второе. вер +1
    в инвентаре 2 магнита. вер +1
    в инвентаре 3 магнита. вер +2
    рисковый. вер -1
    если трасса 6 или 11: если fin, то +2, если jump то по умолчанию
    если jump, то -1
    Вер по умолчанию = 2. Вер макс = 10, где 7 = 100%
*/

    let decision = false;
    let chance = 2;

    if ( howFarBehind(true) > 3 ) {
        chance++;
    }

    // проверить заняты ли первые места?
    let busyFirst = getPedestalStatus(1);
    let busySecond = getPedestalStatus(2);

    if (!busyFirst) {
        chance += 2;
    } else {
        if (!busySecond) {
            chance++;
        }
    }

    let magnets = players[current].magnets + players[current].smagnets;
    if (magnets == 2) {
        chance++;
    }
    if (magnets == 3) {
        chance += 2;
    }

    if (players[current].aiType === "risky") {
        chance--;
    }

    if (curMap === Map06 || curMap === Map11) {
        if (fin) {
            chance += 2;
        }
    }

    if (!fin) chance--;

    console.log("Шанс по умолчанию: 2, макс. 10, 100% = 7, по факту: " + chance);

    if (chance >= 7) {
        decision = true;
    } else {
        if (chance > 1) {
            switch (chance) {
                case 1:
                    if ( getChance(15) ) decision = true;
                    break;
                case 2:
                    if ( getChance(30) ) decision = true;
                    break;
                case 3:
                    if ( getChance(45) ) decision = true;
                    break;
                case 4:
                    if ( getChance(60) ) decision = true;
                    break;
                case 5:
                    if ( getChance(70) ) decision = true;
                    break;
                case 6:
                    if ( getChance(85) ) decision = true;
                    break;
            }
        }
    }
    return decision;
}

/*
ЩИТ
вероятность применения зависит:
1. от кол-ва игроков сзади в пределах 6 шагов.
2. местоположение на трассе
3. кол-ва щитов в инвентаре
4. наличие молнии

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
        if (players[i].letter !== player.letter && !players[i].finished) {

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

    // сколько соперников находятся сзади (всего)
    let allRivals = [];
    for (let i = 0; i < rivalsArray.length; i++) {
        let steps = player.currentCell - rivalsArray[i].currentCell;
        if (steps > 0) {
            allRivals.push(rivalsArray[i]);
        }
    }

    // не применять супер-щит, если сзади меньше 2 соперников, и если не на штрих-клетке
    if (player.aiType !== "stupid" && allRivals.length < 2 && player.ishields > 0 && player.shields == 0 && curMap[index].type !== "hatched") {
        console.log(player.label + " ЩИТ-проверка: сзади мало или нет противников, в запасе только железный");
        return;
    }

    // находится ли соперник в пределах 6 ходов сзади
    let dangerRivals = [];
    for (let i = 0; i < rivalsArray.length; i++) {
        // метод расчёта по id
        let steps = player.currentCell - rivalsArray[i].currentCell;
        if (steps < 7 && steps > 0) {
            dangerRivals.push(rivalsArray[i]);
        }
        // метод расчёта по параметру "сколько до финиша"
        steps = getStepsToFin(rivalsArray[i].currentCell) - curMap[index].stepsToFin;
        if (steps < 7 && steps > 0 && (player.currentCell - rivalsArray[i].currentCell > 0)) { // учитывать только тех соперников, который действительно находятся сзади
            if (!dangerRivals.includes(rivalsArray[i])) { // проверка на дубликат
                dangerRivals.push(rivalsArray[i]);
            }
        }
    }

    if (dangerRivals.length == 0) {
        console.log(player.label + " ЩИТ-проверка: сзади на 6 ходов нет противников");
        return;
    }

    console.log(player.label + " ЩИТ-проверка: сзади на 6 ходов " + dangerRivals.length + " противников");

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
            console.log(player.label + " Я скоро хожу, нет смысла ставить щит");
            return;
        } else {
            console.log(player.label + " После меня ходит/ходят опасные соперники, надену щит");
        }
    } // конец проверки на следующий ход

    // условие - не использовать железный
    let dontUseIron = false;
    if (dangerRivals.length == 1 && allRivals.length == 1 && player.ishields > 0 && curMap[index].type !== "hatched") {
        dontUseIron = true;
        console.log("1 соперник ВСЕГО, обычный щит вместо железного");
    }

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
        if (dangerRivals.length == 3) chance += 5;

        // применить у финиша
        let stepsToFin = curMap[index].stepsToFin;
        if (stepsToFin < 7 && stepsToFin > 0) {
            console.log("стою у финиша, +4");
            chance += 4;
        }

        // сколько щитов в запасе
        if (player.shields + player.ishields == 2) {
            chance += 2;
        }
        if (player.shields + player.ishields == 3) {
            chance += 3;
        }

        // молния с запасом не менее 2 ходов
        if (player.speed > 0) {
            chance += 2;
            console.log("есть молния, шанс +2");
        }
    }

    // принимаем решение
    console.log("Шанс по умолчанию: 0, макс. 14, 100% = 10, по факту: " + chance);
    let decision = false;
    if (chance >= 10) {
        decision = true;
    } else if (chance > 1) {
        chance *= 10;
        if (getChance(chance)) decision = true;
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

            if (player.ishields > 0 && curMap[index].type === "hatched") {
                executeShield(player, "iron");
                return;
            }

            let stepsToFin = curMap[index].stepsToFin;

            if (player.ishields > 0 && stepsToFin > 0 && stepsToFin < 7 && !dontUseIron) {
                executeShield(player, "iron");
                return;
            }

            if (player.shields > 0) {
                executeShield(player, "wood");
                return;
            }
            if (player.ishields > 0 && !dontUseIron) {
                executeShield(player, "iron");
            }
        } // конец вилки на aiType
    } else {
        console.log(player.label + " передумал надевать щит");
    } // конец активации щита
}

// ход невозможным кубиком

function aiUseIMP() {

/*
    игрок применяет кубик только 1 раз за трассу
    если трасса последняя (11), то применяет, пока он не закончится
    не применяет перед финишем до 5 ходов
    не применяет в тупиковой ветке без реверса
    если встал перед финишем (от 5 до 9 ходов), либо МОЛНИЯ, то применяет с вероятностью 100%
    если до финиша 10-14 ходов, то применяет с вероятностью 20%
    на 2-й половине трассы, если не попадает в другие условия, то применяет с вероятностью 5%
    если трасса 11, то вероятность будет умножена на 2
    если решил применить кубик, то не использует магнит
 */
    if (players[current].imp == 0 || players[current].skipMoves > 0) {
        console.log("IMP-проверка: нет кубика, либо пропуск хода");
        return;
    }

    if (players[current].impUsed && curMap !== Map11) {
        console.log("IMP-проверка: уже применял на этой трассе");
        return;
    }

    let stepsToFin = getStepsToFin(players[current].currentCell);

    //если трасса 10, 11, есть imp и магнит, и если у магнита будет проверка fin, то не использовать imp
    let checkFin = false;
    let speed = 1;
    if (players[current].speed > -1 || players[current].catchUp) speed = 2;

    if ( stepsToFin < (7 * speed) ) {
        checkFin = true;
    }

    if ( (curMap === Map10 || curMap === Map11) && players[current].magnets + players[current].smagnets > 0 && checkFin) {
        console.log("IMP-проверка: финиш между клеток, не смысла использовать");
        return;
    }

    if (stepsToFin < 5) {
        console.log("IMP-проверка: слишком близко к финишу");
        return;
    }

    if (curMapParam.deadBr) {
        let myBranch = +getPlayersBranch(players[current]);
        if (!players[current].reverse && curMapParam.deadBr.includes(myBranch)) {
            console.log("IMP-проверка: тупиковая ветка");
            return;
        }
    }

    let decision = false;
    let multiple = 1;
    if (curMap === Map11) multiple = 2;

    if ( (stepsToFin >= 5 && stepsToFin < 10) || players[current].speed > -1 || players[current].catchUp) {
        console.log("IMP-проверка: финиш в самый раз, либо есть молния");
        decision = true;
    }

    if (stepsToFin >= 10 && stepsToFin < 15) {
        if (getChance(20 * multiple)) {
            console.log("IMP-проверка: финиш близко, применяю");
            decision = true;
        } else {
            console.log("IMP-проверка: финиш близко, но передумал");
        }
    }

    if (!decision && (stepsToFin < curMap[0].stepsToFin / 2) ) {
        if (getChance(5 * multiple)) {
            console.log("IMP-проверка: вторая половина трассы, сработал шанс " + (5 * multiple));
            decision = true;
        } else {
            console.log("IMP-проверка: вторая половина трассы, но передумал");
        }
    }

    // принятие решения
    if (decision) {
        players[current].impUsed = true;
        pressAskIMPYes();
        return true;
    } else {
        console.log("IMP-проверка: нет условий");
    }
}

// швабра

function aiUseMop() {

/*
Проверка происходит один раз, если остаётся менее 10 ходов до финиша
если трасса 9, то если currentcell > 661
Вероятность применения зависит от номера трассы
7 - 10%
8 - 10%
9 - 20%
10 - 20%
11 - 100%
 */
    if (players[current].mopCheck) {
        console.log("MOP-проверка: на этой трассе уже была проверка");
        return;
    }

    if (!players[current].mop || players[current].skipMoves > 0) {
        console.log("MOP-проверка: нет mop, либо пропускаю ходы");
        return;
    }

    let checkPos = false;
    let stepsToFin = getStepsToFin(players[current].currentCell);

    if (curMap === Map09 && players[current].currentCell > 661) {
        checkPos = true;
    } else {
        if (stepsToFin < 11 && stepsToFin > 1) {
            checkPos = true;
        }
    }

    if (checkPos) {
        // ищем все красные клетки в этом диапазоне
        let bads = [];
        for (let i = 0; i < curMapParam.badId.length; i++) {

            if (curMapParam.badId[i] < players[current].currentCell) {
                continue; // клетки, которые находятся ниже, не нужны
            }

            if ( (curMap === Map10 && curMapParam.badId[i] > 236) || (curMap === Map11 && curMapParam.badId[i] > 1651)) {
                continue; // на трассах 10 и 11 исключить все клетки после финиша
            }

            let index = getCellIndexById(curMapParam.badId[i]);
            if (curMap[index].type === "red" && curMap[index].stepsToFin < stepsToFin) {
                bads.push(curMapParam.badId[i]);
            }
        }
        console.log("MOP-проверка: близко к финишу, ищу красные клетки");
        console.log(bads);

        // применяем швабру
        let decision = false;

        if (bads.length > 0) {

            players[current].mopCheck = true;
            switch (curMap) {
                case Map07:
                    decision = getChance(10);
                    break;
                case Map08:
                    decision = getChance(10);
                    break;
                case Map09:
                    decision = getChance(20);
                    break;
                case Map10:
                    decision = getChance(20);
                    break;
                default:
                    decision = true;
            }
        } else {
            console.log("MOP-проверка: нет красных клеток впереди");
            return;
        }

        if (decision) {

            let selectId = Math.floor(Math.random() * bads.length);
            selectedCell = bads[selectId];
            console.log(selectedCell);

            // ищем путь до клетки
            let reds = document.querySelectorAll(".cell-red");
            let selectedIndex = getCellIndexById(selectedCell);
            for (let i = 0; i < reds.length; i++) {
                let x = window.getComputedStyle(reds[i]).left;
                let y = window.getComputedStyle(reds[i]).top;
                if (curMap[selectedIndex].coorX + "px" === x && curMap[selectedIndex].coorY + "px" === y) {
                    selectedCellPath = reds[i];
                    break;
                }
            }
            pressAskMopYes();
            return true;

        } else {
            console.log("MOP-проверка: условия совпали, но игрок передумал");
        }
    } else {
        console.log("MOP-проверка: далеко от финиша");
    }
}

// капкан

function aiUseTrap() {

/*
алгоритм зависит от 2-х случаев:
случай 1. если на поле 3-4 игрока, то использует капкан, находясь на 2-й половине трассы
случай 2. если на поле 2 игрока, то использует капкан, находясь на 1-й половине трассы
случай 3. с вероятностью 20% установит капкан в начале заезда

если подходит алгоритм, то вычисляет кол-во соперников сзади, используя параметр stepsToFin
если до ближайшего соперника нет свободных клеток, то он не считается
случай 1.
сзади 3 игрока вер +2
сзади 2 игрока вер +1
сзади 1 игрок вер -1
сзади нет игроков вер -10
менее 7 ходов до финиша, вер +2
от 7 до 13 ходов до финиша, вер +1
трасса 11 вер +1
капкан устанавливается на ближайшую клетку позади себя
вер по умолчанию 1, макс 6, 100% = 5

случай 2.
сопернику осталось до финиша менее 12 ходов, вер 100%
капкан устанавливается на самую дальнюю клетку
 */
    if (!players[current].trap) {
        console.log("TRAP-проверка: нет капканов");
        return;
    }

    let decision = false;

    if (players[current].moves == 0 && getChance(20)) {
        console.log("TRAP-проверка: сработал случай 3");

        // вычислить id ближайшей свободной клетки от финиша
        let emptyIds = getEmptiesArray();
        selectedCell = Math.max.apply(null, emptyIds);
        let farIndex = getCellIndexById(selectedCell);
        let empty = document.querySelectorAll(".cell");
        for (let k = 0; k < empty.length; k++) {
            let x = window.getComputedStyle(empty[k]).left;
            let y = window.getComputedStyle(empty[k]).top;
            if (curMap[farIndex].coorX + "px" === x && curMap[farIndex].coorY + "px" === y) {
                selectedCellPath = empty[k];
                break;
            }
        }
        setTimeout(pressAskTrapYes, 500 * gameSpeed);
        return;
    }

    let chance = 1;

    let secondHalf = false;
    if ( curMap[cellIndex].stepsToFin < curMap[0].stepsToFin / 2 ) secondHalf = true;

    if (secondHalf && playersCount > 2) {
        console.log("TRAP-проверка: сработал случай 1");

        // вычислить id ближайшей свободной клетки сзади
        let emptyIds = getEmptiesArray();
        let closestId;
        for (let i = players[current].currentCell - 1; i > 0; i--) {
            if (emptyIds.includes(i)) {
                closestId = i;
                break;
            }
        }
        console.log("Найден ближайший id сзади: " + closestId);

        // считаем кол-во соперников сзади
        let count = 0;
        for (let i = 0; i < players.length; i++) {
            if (!players[i].finished && (players[i].currentCell < players[current].currentCell) && (players[i].currentCell < closestId) ) {
                count++;
            }
        }
        console.log("Кол-во соперников сзади: " + count);

        // считаем шансы
        if (count == 3) chance += 2;
        if (count == 2) chance++;
        if (count == 1) chance--;
        if (count == 0) chance -= 10;
        let stepsToFin = getStepsToFin(players[current].currentCell);
        if (stepsToFin < 7) chance += 2;
        if (stepsToFin > 6 && stepsToFin < 14) chance += 1;
        if (curMap === Map11) chance++;
        console.log("вер по умолчанию 1, макс 5, 100% = 5, по факту: " + chance);

        // принимаем решение
        if (chance >= 5) decision = true;
        if (chance > 0) {
            switch (chance) {
                case 1:
                    if ( getChance(20) ) decision = true;
                    break;
                case 2:
                    if ( getChance(40) ) decision = true;
                    break;
                case 3:
                    if ( getChance(60) ) decision = true;
                    break;
                case 4:
                    if ( getChance(80) ) decision = true;
                    break;
            }
        }

        if (decision) {
            selectedCell = closestId;
            let closestIndex = getCellIndexById(closestId);
            let empty = document.querySelectorAll(".cell");
            for (let k = 0; k < empty.length; k++) {
                let x = window.getComputedStyle(empty[k]).left;
                let y = window.getComputedStyle(empty[k]).top;
                if (curMap[closestIndex].coorX + "px" === x && curMap[closestIndex].coorY + "px" === y) {
                    selectedCellPath = empty[k];
                    break;
                }
            }
            pressAskTrapYes();
        } else {
            console.log(players[current].label + " передумал ставить капкан");
        }
        return;
    } // конец 1-го случая

    if (!secondHalf && playersCount == 2) {
        console.log("TRAP-проверка: сработал случай 2");
        let rival;
        for (let i = 0; i < players.length; i++) {
            if (!players[i].finished && (players[i].label !== players[current].label) ) {
                // определяем, сколько ему осталось до финиша
                let steps = getStepsToFin(players[i].currentCell);
                if (steps < 12) decision = true;
                rival = players[i];
                break;
            }
        }

        if (decision) {
            // найти самую дальнюю клетку
            let emptyIds = getEmptiesArray();
            selectedCell = Math.max.apply(null, emptyIds);
            if (rival.currentCell > selectedCell) {
                console.log("Соперник дальше, чем возможно поставить капкан, отмена");
                return;
            }
            let farIndex = getCellIndexById(selectedCell);
            let empty = document.querySelectorAll(".cell");
            for (let k = 0; k < empty.length; k++) {
                let x = window.getComputedStyle(empty[k]).left;
                let y = window.getComputedStyle(empty[k]).top;
                if (curMap[farIndex].coorX + "px" === x && curMap[farIndex].coorY + "px" === y) {
                    selectedCellPath = empty[k];
                    break;
                }
            }
            pressAskTrapYes();
        } else {
            console.log("Соперник далеко от финиша, капкан не ставлю");
        }
        return;
    } // конец 2-го случая

    console.log("TRAP-проверка: нет подходящего алгоритма");
}

// поиск пустых клеток использовать только для AI при выборе места для капкана!

function getEmptiesArray() {
    let emptyIds = [];
    let rivals = [];
    players.forEach(function (item) {
        rivals.push(item.currentCell);
    });
    loop1: for (let i = 0; i < curMap.length; i++) {

        // исключить клетки, которые идут сразу после бранча
        for (let k = 0; k < curMapParam.brId.length; k++) {
            if (curMap[i].cellid == (curMapParam.brId[k] + 101) || curMap[i].cellid == (curMapParam.brId[k] + 201) || curMap[i].cellid == (curMapParam.brId[k] + 301) ) {
                continue loop1;
            }
        }
        // исключить клетки с соперниками
        if ( rivals.includes(curMap[i].cellid) ) continue;
        if ( (!curMap[i].type || curMap[i].type === "none") && !curMap[i].bonus ) {
            emptyIds.push(curMap[i].cellid);
        }

    }
    return emptyIds;
}

// что купить в магазине

/*
МОДЕЛИ:
перед входом в магазин фишка ставит себе "цель на модель". Например, если сейчас фишка жёлтая, то ставит цель на красную.
если хватает денег, чтобы купить цель, то покупает.
если капитал превысил ожидания, может купить более крутую фишку сразу
отложенная цель - это когда фишка перескакивает сразу на одну модель вперед. Например, сейчас жёлтая, ставит цель на зеленую.
отложенная цель случается с вероятностью 20%, если игрок рисковый, 15% сбалансированный, 10% осторожный.
после покупки модели, свойство players[i].dream = "название модели" сбрасывается до false
ТУПОЙ ИНТЕЛЛЕКТ
берет поочередно каждую модель по мере возможности
!!! Алгоритм довольно сложный и часто дорабатывался, поэтому:
!!! если в коде есть расхождения с текстом выше, то верить коду
*/

function aiShopping() {

    let steps = ["white", "yellow", "red", "green", "blue", "brown", "black"];
    let tokenCost = [costWhite, costYellow, costRed, costGreen, costBlue, costBrown, costBlack];

    for (let i = 0; i < players.length; i++) { // НЕ ЗАБЫТЬ!!! Переменная i только для игроков !!!

        if (players[i].type === "human") continue;

        console.log("");
        console.log(players[i].label + " MODEL = " + players[i].model);
        console.log(players[i].label + " DREAM = " + players[i].dream);
        console.log(players[i].label + " BUYCOUNT = " + players[i].buyCount);
        console.log(players[i].label + " CAPITAL = " + players[i].capital);
        console.log(players[i].label + " MAGNETS = " + players[i].magnets);
        console.log(players[i].label + " SMAGNETS = " + players[i].smagnets);
        console.log(players[i].label + " SHIELDS = " + players[i].shields);
        console.log(players[i].label + " ISHIELDS = " + players[i].ishields);
        console.log(players[i].label + " TRAP = " + players[i].trap);
        console.log(players[i].label + " VAMPIRE = " + players[i].vampire);

        let model; // название модели мечты (индекс массива steps)
        let myStep; // какая у меня сейчас модель
        let dream; // цена модели мечты
        let buyModelFact = false; // совершил ли покупку модели
        let serious = false; // следующая трасса решающая?
        if ( (curMap === Map05 || curMap === Map10) && players[i].aiType !== "stupid") serious = true;

        if (players[i].model !== "black") {

            // если мечты ещё нет, обновить мечту
            myStep = steps.indexOf(players[i].model);

            if (players[i].dream === "none") {
                dream = tokenCost[myStep + 1];
                model = steps[myStep + 1];

                // условие отложенной цели
                if (players[i].model !== "brown" && players[i].aiType !== "stupid" && !serious) {
                    let chance;
                    if (players[i].aiType === "risky") chance = getChance(50);
                    if (players[i].aiType === "careful") chance = getChance(25);
                    if (players[i].aiType === "balanced") chance = getChance(35);
                    if (chance) {
                        // с вероятностью 30% будет генерироваться еще более далекая цель
                        if (players[i].aiType !== "careful" && players[i].model !== "brown" && players[i].model !== "blue" && players[i].model !== "green" && getChance(25)) {
                            dream = tokenCost[myStep + 3];
                            model = steps[myStep + 3];
                            console.log("Сработало правило отложенной цели + 1");
                        } else {
                            dream = tokenCost[myStep + 2];
                            model = steps[myStep + 2];
                            console.log("Сработало правило отложенной цели");
                        }
                    }
                }
                players[i].dream = model;
            } else {
                console.log("Уже есть мечта, перерасчёт не требуется");
                let dreamIndex = steps.indexOf(players[i].dream);
                model = players[i].dream;
                dream = tokenCost[dreamIndex];
            }

            // предотвращаем идиотскую ситуацию
            if (players[i].dream === "brown" && curMap === Map09 && players[i].model === "red" && players[i].capital < costBrown) {
                console.log("КРАСНАЯ ФИШКА при мечте brown на трассе 9, снижаю мечту до blue");
                players[i].dream = "blue";
                let dreamIndex = steps.indexOf(players[i].dream);
                model = players[i].dream;
                dream = tokenCost[dreamIndex];
            }

            console.log(players[i].label + " мечтает о: " + model + ", цена: " + dream);

            // проверяем, не превышает ли капитал ожидания
            let wow = tokenCost[myStep + 2];
            let wow2 = tokenCost[myStep + 3];

            // если впереди решающая трасса, а покупка съест более 50% бюджета, то ничего не делать
            // перед трассой 10 - 70%
            // не забыть: множитель 0.5 соответствует процентам (например, если захочешь изменить на 60%, то ставь 0.6)
            let wowGo = true;
            let wow2Go = true;
            let standardGo = true;
            if (players[i].aiType !== "stupid" && (curMap === Map05 || curMap === Map09 || curMap === Map10)) {

                let percent = 0.5; // стандартный процент перед решающей трассой 6 или 11
                if (players[i].aiType === "risky" || curMap === Map09) {
                    percent = 0.75; // более мягкий процент перед трассой 10, либо при рискованном AI на решающих трассах
                }
                if (players[i].aiType === "risky" && curMap === Map09) {
                    percent = 1; // перед трассой 10 рисковый не выполняет проверку
                }

                if (players[i].capital * percent < wow2) {
                    console.log("Впереди важная трасса, стоимость WOW2-заказа превысит " + (percent * 100) + "% капитала");
                    wow2Go = false;
                } else if (players[i].capital * percent < wow) {
                    console.log("Стоимость WOW-заказа превысит " + (percent * 100) + "% капитала");
                    wowGo = false;
                } else if (players[i].capital * percent < dream) {
                    console.log("Стандартный заказ также превысит превысит " + (percent * 100) + "% капитала");
                    standardGo = false;
                }
            }

            // оформляем заказ

            if (wow2 && wow2Go && players[i].capital >= wow2) {

                players[i].capital -= wow2;
                players[i].model = steps[myStep + 3];
                players[i].dream = "none";
                messageBuyModel(players[i], players[i].model);
                buyModelFact = true;
                console.log(players[i].label + " перескочил через 2 ступени и КУПИЛ: " + steps[myStep + 3] + ", остаток на счету: " + players[i].capital);

            } else if (wow && wowGo && players[i].capital >= wow) {

                players[i].capital -= wow;
                players[i].model = steps[myStep + 2];
                players[i].dream = "none";
                messageBuyModel(players[i], players[i].model);
                buyModelFact = true;
                console.log(players[i].label + " перескочил через ступень и КУПИЛ: " + steps[myStep + 2] + ", остаток на счету: " + players[i].capital);

            } else {

                // капитал не превышает ожидания, смотрим на обычную мечту
                console.log("капитал не превышает ожидания");
                if (players[i].capital >= dream && standardGo) {

                    players[i].capital -= dream;
                    players[i].model = model;
                    players[i].dream = "none";
                    messageBuyModel(players[i], players[i].model);
                    buyModelFact = true;
                    console.log(players[i].label + " КУПИЛ фишку: " + model + ", остаток на счету: " + players[i].capital);

                } else {
                    console.log(players[i].label + " не хватило денег на мечту");
                }

            } // конец вилки тройной мечты
        } else {
            console.log("У " + players[i].label + " чёрная фишка, новые модели не интересны");
        }

        /*
        если до "цели на модель" остаётся накопить не более 30% денег, то покупки не произойдёт
        если фишка покупала предметы (включая модели) последние 3 трассы подряд, и трасса не решающая, то покупки не произойдёт
        за 1 заход игрок может купить не более 2 предметов. Если открыто 1-2 предмета, то возьмёт не больше 1.
        Предметы выбираются случайным образом.
        Фишка должна определиться с кол-вом предметов (алгоритм ниже). У фишки есть лимит предметов. Если лимит будет превышен, то кол-во предметов уменьшается до приемлемого.
        Если общая стоимость закупа предметов превышает 400 $ или 50% от капитала, то покупки не произойдет. Фишка пробует это сделать 4 раза, комбинируя разные предметы.
        ТУПОЙ ИНТЕЛЛЕКТ
        Не купит, если не хватает денег.
         */
        let check2 = true; // осталось накопить немного // всегда true перед важной трассой, или когда игрок только что купил фишку
        let check3 = true; // сколько уже покупал подряд // всегда true перед важной трассой, или если элитная фишка
        let check4 = true; // денег больше, чем 99
        let buyFact = false; // совершил ли покупку предметов

        if (!buyModelFact) {
            if (players[i].capital / dream >= 0.8 && !serious) check2 = false;
        } else {
            console.log("проверка check2 (осталось немного) отменена: игрок только что купил фишку");
        }

        if (!serious && players[i].model !== "brown" && players[i].model !== "black") {

            if (players[i].buyCount > 2) {

                if (players[i].buyCount == 3 && getChance(50)) {
                    console.log("buyCount == 3, сработал шанс 50%, check3 = false");
                    check3 = false;
                    players[i].buyCount = 0;
                }

                if (players[i].buyCount > 3) {

                    // если трасса 6, то с вероятностью 50% условие не будет рассмотрено
                    if (curMap === Map06) {
                        if (getChance(50)) {
                            console.log("buyCount > 3, check3 = false");
                            check3 = false;
                            players[i].buyCount = 0;
                        } else {
                            console.log("check3 (брал подряд) должен быть false, но трасса 6, поэтому true");
                        }
                    } else {
                        console.log("buyCount > 3, check3 = false");
                        check3 = false;
                        players[i].buyCount = 0;
                    }

                }
            } else {
                console.log("buyCount < 3");
            }
        } else {
            console.log("проверка check3 (брал подряд) отменена: серьезная трасса, либо элитная фишка");
        }

        if (players[i].capital < 100) check4 = false;
        console.log("Покупка предметов, результаты теста: " + check2 + check3 + check4);

        if (check3 && check4) {
            // check2 перенесён в другое место

            let itemsArray = []; // список предметов, которые возможно купить текущим игроком
            let buyList = []; // предварительный список покупок
            let itemsCount; // сколько предметов взять

            // составляем список возможных предметов
            let mags = players[i].magnets + players[i].smagnets;
            let shi = players[i].shields + players[i].ishields;

            if (unlockMagnet && mags < 3) {
                itemsArray.push("magnet");
                if (curMap === Map08 || curMap === Map09 || curMap === Map10) {
                    // в конце игры увеличивать вероятность покупки магнита
                    itemsArray.push("magnet");
                }
            }

            if (unlockShield && shi == 0) {
                itemsArray.push("shield");
            }

            // дорогие предметы будут добавлены, если до мечты копить долго, либо впереди решающая трасса
            if (check2 || serious) {

                if (unlockSMagnet && mags < 3 && players[i].smagnets == 0) {
                    if (mags < 2) {
                        itemsArray.push("smagnet", "smagnet");
                    } else {
                        itemsArray.push("smagnet");
                    }
                }

                if (unlockIShield && shi < 2 && players[i].ishields == 0) {
                    itemsArray.push("ishield");
                }

                if (unlockTrap && !players[i].trap) {
                    itemsArray.push("trap", "trap");
                }

                if (unlockVampire && !players[i].vampire) {
                    itemsArray.push("vampire", "vampire");
                }
            }

            console.log("Сформирован список возможных предметов: " + itemsArray);

            // определяемся с количеством предметов

            if (itemsArray.length < 2) {
                itemsCount = 1;
            } else {
                itemsCount = Math.ceil(Math.random() * 2);
            }
            // по умолчанию всегда 1 или 2 предмета

            if (check2) {
                // если копить ещё долго, то разворачиваемся на полную

                if (players[i].model === "brown" || players[i].model === "black") {
                    itemsCount++;
                } else {
                    if (serious) {
                        itemsCount++;
                    }
                }
                if (players[i].aiType === "risky" && getChance(50)) {
                    console.log("AI рисковый, сработал шанс 50%, +1 предмет");
                    itemsCount++;
                }
            } else {
                // если копить недолго, то купить только 1 предмет
                console.log("беру только 1 предмет из-за check2 = false");
                itemsCount = 1;
            }

            let totalItems = getItemsCount(players[i]);
            console.log("Сейчас предметов в инвентаре: " + totalItems);
            console.log(players[i].label + " возьмёт предметов: " + itemsCount);

            // не превысит ли лимит?
            let limit = 5;
            if (players[i].aiType === "risky") limit = 5;
            if (players[i].aiType === "careful") limit = 2;
            if (players[i].aiType === "balanced") limit = 4;

            if (itemsCount + totalItems > limit) {
                itemsCount = limit - totalItems;
                console.log("Лимит предметов " + limit + " будет превышен, уменьшение, itemsCount = " + itemsCount);
            }

            if (itemsArray.length != 0 && itemsCount > 0) {
                let sum;
                let tries = 0;

                for (let x = 0; x < 5; x++) {
                    // всего 5 попыток
                    buyList = [];
                    tries++;
                    if (tries == 3) { // попробует купить на 1 предмет меньше
                        itemsCount--;
                        if (itemsCount == 0) itemsCount = 1;
                    }
                    if (tries == 4) { // на последних 2 попытках берёт 1 предмет
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
                    let maximum = 400;
                    if (itemsCount == 3) maximum = 500;
                    if (itemsCount == 4) maximum = 600;
                    if ((players[i].capital / 2 >= sum && sum <= maximum) || players[i].aiType === "stupid") break;
                }

                // вариант для тупого ai
                if (players[i].aiType === "stupid" && players[i].capital < sum) {
                    console.log("Мало денег на покупку предметов");
                    continue;
                }

                if ((players[i].capital / 2 < sum) && tries >= 5 && players[i].aiType !== "stupid") {
                    console.log("Мало денег на покупку предметов");
                } else {
                    // оформляем заказ

                    for (let d = 0; d < buyList.length; d++) {
                        switch (buyList[d]) {
                            case "magnet":
                                if (players[i].magnets + players[i].smagnets < 3) {
                                    players[i].capital -= costMagnet;
                                    players[i].magnets++;
                                    buyFact = true;
                                    console.log(players[i].label + " КУПИЛ предмет: МАГНИТ");
                                } else {
                                    console.log("ПЕРЕБОР: магнит не куплен");
                                }
                                break;
                            case "smagnet":
                                if (players[i].magnets + players[i].smagnets < 3 && players[i].smagnets == 0) {
                                    players[i].capital -= costSMagnet;
                                    players[i].smagnets++;
                                    buyFact = true;
                                    console.log(players[i].label + " КУПИЛ предмет: СУПЕР-МАГНИТ");
                                } else {
                                    console.log("ПЕРЕБОР: супер-магнит не куплен");
                                }
                                break;
                            case "shield":
                                if (players[i].shields + players[i].ishields < 3) {
                                    players[i].capital -= costShield;
                                    players[i].shields++;
                                    buyFact = true;
                                    console.log(players[i].label + " КУПИЛ предмет: ЩИТ");
                                } else {
                                    console.log("ПЕРЕБОР: щит не куплен");
                                    if (tryBuyMagnet(players[i])) {
                                        buyFact = true;
                                    }
                                }
                                break;
                            case "ishield":
                                if (players[i].shields + players[i].ishields < 3 && players[i].ishields == 0) {
                                    players[i].capital -= costIShield;
                                    players[i].ishields++;
                                    buyFact = true;
                                    console.log(players[i].label + " КУПИЛ предмет: ЖЕЛЕЗНЫЙ ЩИТ");
                                } else {
                                    console.log("ПЕРЕБОР: железный щит не куплен");
                                    if (tryBuyMagnet(players[i])) {
                                        buyFact = true;
                                    }
                                }
                                break;
                            case "trap":
                                if (!players[i].trap) {
                                    players[i].capital -= costTrap;
                                    players[i].trap = true;
                                    buyFact = true;
                                    console.log(players[i].label + " КУПИЛ предмет: КАПКАН");
                                } else {
                                    console.log("ПЕРЕБОР: капкан не куплен");
                                    if (tryBuyMagnet(players[i])) {
                                        buyFact = true;
                                    }
                                }
                                break;
                            case "vampire":
                                if (!players[i].vampire) {
                                    players[i].capital -= costVampire;
                                    players[i].vampire = true;
                                    buyFact = true;
                                    console.log(players[i].label + " КУПИЛ предмет: ВАМПИР");
                                } else {
                                    console.log("ПЕРЕБОР: вампир не куплен");
                                    if (tryBuyMagnet(players[i])) {
                                        buyFact = true;
                                    }
                                }
                                break;
                        }
                    }

                    // если в списке не было магнита или супер-магнита перед трассами 10 или 11, то попытаться купить
                    if ( (curMap === Map09 || curMap === Map10) && (players[i].magnets + players[i].smagnets == 0) ) {
                        console.log("После покупки нет магнита: пытаюсь купить");
                        if (tryBuyMagnet(players[i])) buyFact = true;
                    }
                    console.log("остаток на счету: " + players[i].capital);
                }

            } else {
                console.log("не открыт ни один предмет");
            }

        } else {
            console.log(players[i].label + " не стал покупать предметы. Не сработали условия: ");
            if (!check3) console.log("check3: слишком часто покупал предметы");
            if (!check4) console.log("check4: денег меньше, чем 100");
        }

        if (buyFact) {
            players[i].buyCount++;
        } else {
            players[i].buyCount = 0;
        }
    } // конец обработки игрока

    let human = findHuman();
    if (lastBuy) {
        messageBuyModel(human, human.model);
        lastBuy = false;
    }
}

// особое условие: если в списке покупок оказался дубликат, то попытаться купить магнит

function tryBuyMagnet(player) {
    if ( (player.magnets + player.smagnets) < 3 && player.capital >= 100) {
        player.capital -= costMagnet;
        player.magnets++;
        console.log("Куплен экстра-МАГНИТ");
        return true;
    } else {
        console.log("Пытался купить экстра-магнит, но не вышло");
        return false;
    }
}
