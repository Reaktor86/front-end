//задача 1

/*const currentYear = 2020;
let usersBirthday = prompt("В каком году вы родились?");
if (currentYear <= usersBirthday || usersBirthday < 1900) {
    alert("Некорректный год рождения");
} else {
    alert(`Ваш возраст ${currentYear - usersBirthday}`);
}*/

//задача 2

/*const fileSize = 0.82;
let cardSize = prompt("Каков объём Вашей флеш карты (Гб)?");
alert(`На флеш карте поместится ${cardSize / fileSize} файлов размером ${fileSize * 1024} Мб`)*/

//задача 3

/*const courseDollarRuble = 74.86;
const courseEuroRuble = 88.61;
const courseDollarEuro = 0.84;
let currencyType = prompt("Какую валюту Вы хотите обменять? (доллары, рубли, евро)");
let currenceTypeWord;
if (currencyType == "доллары") {
    currenceTypeWord = "долларов";
} else if (currencyType == "рубли") {
    currenceTypeWord = "рублей";
} else {
    currenceTypeWord = "евро";
}
let currencyExchangeType = prompt("Какую валюту Вы хотите получить? (доллары, рубли, евро)");
let currencyExchangeTypeWord;
if (currencyExchangeType == "доллары") {
    currencyExchangeTypeWord = "долларов";
} else if (currencyExchangeType == "рубли") {
    currencyExchangeTypeWord = "рублей";
} else {
    currencyExchangeTypeWord = "евро";
}
let cashEnter = prompt(`Сколько ${currenceTypeWord} вы хотите обменять на ${currencyExchangeType}?`);
let exchangeResult;
if (currencyType == "доллары" && currencyExchangeType == "рубли") {
    exchangeResult = cashEnter * courseDollarRuble;
} else if (currencyType == "доллары" && currencyExchangeType == "евро") {
    exchangeResult = cashEnter * courseDollarEuro;
} else if (currencyType == "рубли" && currencyExchangeType == "доллары") {
    exchangeResult = cashEnter / courseDollarRuble;
} else if (currencyType == "рубли" && currencyExchangeType == "евро") {
    exchangeResult = cashEnter / courseEuroRuble;
} else if (currencyType == "евро" && currencyExchangeType == "доллары") {
    exchangeResult = cashEnter / courseDollarEuro;
} else if (currencyType == "евро" && currencyExchangeType == "рубли") {
    exchangeResult = cashEnter * courseEuroRuble;
} else {
    exchangeResult = cashEnter;
}
alert(`Результат: ${exchangeResult} ${currencyExchangeTypeWord}`);
let exchangeConfirmation = confirm("Вы согласны провести обмен?");
if (exchangeConfirmation) {
    alert(`Мы поменяли ${cashEnter} ${currenceTypeWord} на ${exchangeResult} ${currencyExchangeTypeWord}`);
} else {
    alert("Увидимся в следующий раз");
}*/

//задача 4

/*
let coordinateX = prompt("Введите координату по оси X (любое число)");
let coordinateY = prompt("Введите координату по оси Y (любое число)");
if (coordinateX == 0 && coordinateY != 0) {
    alert("Точка принадлежит оси X");
} else if (coordinateX != 0 && coordinateY == 0) {
    alert("Точка принадлежит оси Y");
} else if (coordinateX > 0) {
    if (coordinateY > 0) {
        alert("Точка находится в I четверти");
    } else {
        alert("Точка находится в IV четверти");
    }
} else if (coordinateX < 0) {
    if (coordinateY > 0) {
        alert("Точка находится во II четверти");
    } else {
        alert("Точка находится в III четверти");
    }
} else {
    alert("Точка находится в центре координат");
}*/

//задача 5

/*let x = prompt("Введите пароль");
if (x == "Step" || x == "Web" || x == "JavaScript") {
    alert("Подтверждено");
} else {
    alert("Отменено");
}*/

/*let x = parseInt(prompt("Введите любое число"));
if (x % 2 == 0) {
    for (let i = 2; i <= x; i++) {
        if (i % 2 == 0) {
            document.write(i + "<br>");
        }
    }
} else {
    for (let i = 2; i < x; i++) {
        if (i % 2 == 0) {
            document.write(i + "<br>");
        }
    }
}*/

/*let x = parseInt(prompt("Введите любое число"));
if (x % 2 == 0) {
    for (let i = x - 1; i > 0; i--) {
        if (i % 2 != 0) {
            document.write(i + "<br>");
        }
    }
} else {
    for (let i = x; i > 0; i--) {
        if (i % 2 != 0) {
            document.write(i + "<br>");
        }
    }
}*/

/*let x = parseInt(prompt("Введите любое число"));
for (let i = x; i > 0; i--) {
    if (x % i == 0) {
        document.write(i + "<br>");
    }
}*/

/*let fund = +prompt("Введите сумму вклада");
let proc = +prompt("Введите процентную ставку");
let i = fund;
let result = 0;
while (i < (fund * 2)) {
    i += i * proc / 100;
    result++;
}
if (result == 1) {
    alert(`Вклад удвоится через 1 год и составит ${i} рублей`);
} else if (result > 1 && result < 5) {
    alert(`Вклад удвоится через ${result} года и составит ${i} рублей`);
} else {
    alert(`Вклад удвоится через ${result} лет и составит ${i} рублей`);
}*/

/*let repeat = true;
while(repeat) {
    let random = Math.round(Math.random() * 20) + 1;
    if (random % 4 != 0) {
        alert("Загадано число: " + random);
        break;
    } else {
        repeat = confirm("Число делится на четыре. Попробовать снова?");
    }
}*/

let size = +prompt("Каков объём бака с водой?");
let i = size;
let result = -1;
do {
    i -= i * 0.1;
    result++;
} while (i > 10);
alert("Воды хватит на " + result + " дней");

