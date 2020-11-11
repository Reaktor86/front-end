const calc = document.querySelector(".calc");
const table = document.querySelector(".calc__screen-p");
let now; // что сейчас написано в табло
let lastOp; // последний оператор, введенный в калькулятор
let result = null; // вывод результата
let delayedReset = false; // будет ли стёрто число в табло при нажатии следующей кнопки

calc.addEventListener('mousedown', function(event) {
    if (event.target.tagName == 'BUTTON') {
        event.target.classList.add("calc__pressed");
    } else {
    }
});

calc.addEventListener('mouseup', function(event) {
    if (event.target.tagName == 'BUTTON') {
        event.target.classList.remove("calc__pressed");
    } else {
    }
});

calc.addEventListener("click", function (event) {
    let classBtn = event.target.className;

    switch(classBtn) {
        case "calc__num0":
            if (delayedReset == true) {
                reset();
            }
            now = table.innerHTML;
            table.innerHTML = now + "0";
            break;
        case "calc__num1":
            if (delayedReset == true) {
                reset();
            }
            now = table.innerHTML;
            table.innerHTML = now + "1";
            break;
        case "calc__num2":
            if (delayedReset == true) {
                reset();
            }
            now = table.innerHTML;
            table.innerHTML = now + "2";
            break;
        case "calc__num3":
            if (delayedReset == true) {
                reset();
            }
            now = table.innerHTML;
            table.innerHTML = now + "3";
            break;
        case "calc__num4":
            if (delayedReset == true) {
                reset();
            }
            now = table.innerHTML;
            table.innerHTML = now + "4";
            break;
        case "calc__num5":
            if (delayedReset == true) {
                reset();
            }
            now = table.innerHTML;
            table.innerHTML = now + "5";
            break;
        case "calc__num6":
            if (delayedReset == true) {
                reset();
            }
            now = table.innerHTML;
            table.innerHTML = now + "6";
            break;
        case "calc__num7":
            if (delayedReset == true) {
                reset();
            }
            now = table.innerHTML;
            table.innerHTML = now + "7";
            break;
        case "calc__num8":
            if (delayedReset == true) {
                reset();
            }
            now = table.innerHTML;
            table.innerHTML = now + "8";
            break;
        case "calc__num9":
            if (delayedReset == true) {
                reset();
            }
            now = table.innerHTML;
            table.innerHTML = now + "9";
            break
        case "calc__dot":
            if (delayedReset == true) {
                reset();
            }
            now = table.innerHTML;
            table.innerHTML = now + ".";
            break;

        case "calc__back":
            now = table.innerHTML;
            now = now.split("");
            now.pop();
            now = now.join("");
            table.innerHTML = now;
            break;

        case "calc__reset":
            table.innerHTML = "";
            result = null;
            break;

        case "calc__multiple":
            delayedReset = true;
            if (result == null) {
                result = +table.innerHTML;
                lastOp = "*";
            } else {
                now = +table.innerHTML;
                table.innerHTML = getResult(lastOp);
                lastOp = "*";
            }
            break;

        case "calc__plus":
            delayedReset = true;
            if (result == null) {
                result = +table.innerHTML;
                lastOp = "+";
            } else {
                now = +table.innerHTML;
                table.innerHTML = getResult(lastOp);
                lastOp = "+";
            }
            break;

        case "calc__minus":
            delayedReset = true;
            if (result == null) {
                result = +table.innerHTML;
                lastOp = "-";
            } else {
                now = +table.innerHTML;
                table.innerHTML = getResult(lastOp);
                lastOp = "-";
            }
            break;

        case "calc__divide":
            delayedReset = true;
            if (result == null) {
                result = +table.innerHTML;
                lastOp = "/";
            } else {
                now = +table.innerHTML;
                table.innerHTML = getResult(lastOp);
                lastOp = "/";
            }
            break;

        case "calc__power":
            delayedReset = true;
            if (result == null) {
                result = +table.innerHTML;
                lastOp = "pow";
            } else {
                now = +table.innerHTML;
                table.innerHTML = getResult(lastOp);
                lastOp = "pow";
            }
            break;

        case "calc__radical":
            delayedReset = true;
            result = Math.sqrt(+table.innerHTML);
            table.innerHTML = result;
            lastOp = "rad";
            break;

        case "calc__equally":
            delayedReset = true;
            now = +table.innerHTML;
            table.innerHTML = getResult(lastOp);
            break;
    }
});

function getResult(lastOp) {
    switch(lastOp) {
        case "*":
            result *= now;
            return result;
        case "+":
            result += now;
            return result;
        case "-":
            result -= now;
            return result;
        case "/":
            result /= now;
            return result;
        case "pow":
            result = result ** now;
            return result;
        case "rad":
            return +table.innerHTML;
    }
}

function reset() {
    table.innerHTML = "";
    delayedReset = false;
}