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

let coordinateX = prompt("Введите координату по оси X (любое число)");
let coordinateY = prompt("Введите координату по оси Y (любое число)");
if (coordinateX == 0 && coordinateY == 0) {
    alert("Точка находится в центре координат");
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
    alert("Точка находится на линии координат");
}













