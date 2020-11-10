/* принцип работы AI:
По условию срабатывает makeDecision.
Аргумент передаёт тип принимаемого решения.
В зависимости от типа запускается case.
Функции внутри case имеют доступ к глобальным переменным.
Решение высчитывается на основе переменной riskIndex. 0 - риск нулевой, 10 или больше = 100%-я опасность.
В некоторых случаях в riskIndex вкладывается понятие мотивации. Чтобы дать игроку больше мотивации, индекс риска уменьшается.
Например, близость к финишу может заставить игрока рискнуть.
Проверяется тип AI игрока:
    balanced (сбалансированный) - для положит. решения требует индекс риска не более 5
    risky (азартный) - для положит. решения требует индекс риска не более 8
    careful (осторожный) - для положит. решения требует индекс риска не более 3
    stupid (тупой) - риски не считает, выбирает случайный вариант
Вычисляется решение.
Вычисляется вероятность ошибки (еще не готово)
    balanced - ошибается с вероятностью 10%
    risky - ошибается с вероятностью 15%
    careful (осторожный) - ошибается с вероятностью 5%
На основе решения запускается функция, которую обычно запускает человеческий игрок нажатием кнопки.

Типы решений:

attackOrNot - атаковать или нет игрока
    зависит от: силы в запасе, сколько красных клеток впереди(еще не готово), сколько до красной клетки, близость к финишу

attackWho - кого атаковать, если игроков несколько
    случайный выбор

shopWhichToken - какую фишку купить

shopWhichMagnet - купить ли магнит

whichBranch - на какое ответвление свернуть

magnetOrNot - сделать ли ход магнитом

 */

function makeDecision(decisionType) {

    console.log(players[current].label + " думает");
    let addressThink = players[current].name.querySelector(".player__think");
    addressThink.classList.add("player__think-act");

    setTimeout( function () {

        switch (decisionType) {

            case "attackOrNot":

                if (players[current].aiType == "stupid") {
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

                let whoIndex = Math.ceil(Math.random() * playerRival.length);
                switch (whoIndex) {
                    case 1:
                        selectedRival = playerRival[0];
                        break;
                    case 2:
                        selectedRival = playerRival[1];
                        break;
                    case 3:
                        selectedRival = playerRival[2];
                        break;
                }
                console.log("Выбранный selectedRival = " + selectedRival.label);
                attackOrNot();
                break;
        }

        addressThink.classList.remove("player__think-act");

    }, 1850 * gameSpeed);
}

function attackOrNot() {
    console.log("Активировался attackOrNot");

    let riskIndex = 0;

    // сколько сил в запасе
    if (players[current].power == 1 ) {
        riskIndex += 4;
        console.log("Мало силы, риск +4");
    }
    // сколько до красной клетки?
    // НЕ ЗАБЫТЬ ПЕРЕДЕЛАТЬ !!!
    let redAhead = redId - players[current].currentCell;
    if (redAhead > 14) {
        riskIndex += 2;
        console.log("Красная далеко, риск +2");
    } else if (redAhead > 6 && redAhead <= 14) {
        riskIndex += 3;
        console.log("Красная на горизонте, риск +3");
    } else if (redAhead > 0 && redAhead <= 6) {
        riskIndex += 5;
        console.log("Можно наступить на красную, риск +5");
    } else {
        console.log("Нет красных впереди, риск -5");
        riskIndex -= 5;
    }

    // сколько до финиша?
    let stepsToGo = finId - players[current].currentCell;
    if (stepsToGo < 10 ) {
        riskIndex -= 3;
        console.log("Финиш близко, риск -3");
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