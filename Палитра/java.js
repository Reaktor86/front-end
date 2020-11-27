
/*

исправить баг - кодировщик учитывает запятые внутри цвета

 */

$("form button").on("click", setColor);
const Name = $(".form__name");
const Type = $(".form__type");
const Code = $(".form__code");
const Palette = $(".palette__wrap");
const errorName = $(".error--name");
const errorCode = $(".error--code");
let myPalette = {}; // для куки
let sampleCount = 0; // кол-во цветов в палитре, которое сейчас загружено

// скрываем сообщения об ошибках
Name.on("focus", errorsHide);
Code.on("focus", errorsHide);

function errorsHide() {
    errorName.css("visibility", "hidden");
    errorCode.css("visibility", "hidden");
}

// загружаем куки, если есть

if (getCookie("myPalette") !== undefined) {

    // дешифруем куки в объект
    let unconvert = getCookie("myPalette");
    unconvert = unconvert.split(",");
    let property;
    let value;
    for (let i = 0; i < unconvert.length; i++) {

        if (i % 2 == 0) {
            property = unconvert[i];
            myPalette[property] = 0;
        } else {
            value = unconvert[i];
            myPalette[property] = value;
        }
    }
    console.log(myPalette);
    sampleCount = myPalette.samples;

    // добавляем все цвета в DOM
    for (let i = 0; i < sampleCount; i++) {
        let k = i + 1
        let name = "name" + k;
        let type = "type" + k;
        let code = "code" + k;
        console.log("Добавлен цвет " + myPalette[name]);
        addColorToDOM(myPalette[name], myPalette[type], myPalette[code]);
    }
}

if (sampleCount == 0) Palette.css("display", "none");

function setColor(e) {
    e.preventDefault();

    // название: не должно быть цифр, не менее 2 символов, не более 16 символов
    /*обязательное поле;
     нерегистрозависимое уникальное значение (то есть в спи-
    ске уже существующих цветов не должно быть такого же
    названия);*/

    console.log(Name.val() + " " + Type.val() + " " + Code.val());

    if (/[0-9]/.test(Name.val())) {
        errorName.html("не должно содержать цифр");
        errorName.css("visibility", "visible");
        return;
    }

    if (Name.val().length < 2 || Name.val().length > 16) {
        errorName.html("не менее 2 символов и не более 16");
        errorName.css("visibility", "visible");
        return;
    }

    let inputName = Name.val().toUpperCase();
    let inputType = Type.val();
    let inputCode = Code.val().toUpperCase();

    // проверка на дубликаты
    let names = [];
    $('.pName').each(function(){
        names.push($(this).html());
    });
    console.log(names);
    for (let i = 0; i < names.length; i++) {
        if (names[i] === inputName) {
            errorName.html("названия не должны совпадать");
            errorName.css("visibility", "visible");
            return;
        }
    }

    // код: если RGB, то формат rgb(0-255, 0-255, 0-255) если RGBA, то rgba(0-255, 0-255, 0-255, 0-1), если HEX, то #000000 ( числа 0-9, буквы a,b,c,d,e,f)

    switch (inputType) {
        case "RGB":
            let rgb = /^[0-9]{1,3}[,]{1}[0-9]{1,3}[,]{1}[0-9]{1,3}$/;
            if (!rgb.test(inputCode)) {
                errorCode.html("формат: 0-255,0-255,0-255");
                errorCode.css("visibility", "visible");
                return;
            }
            break;
        case "RGBA":
            let rgba = /^[0-9]{1,3}[,]{1}[0-9]{1,3}[,]{1}[0-9]{1,3}[,]{1}[0]{1}[.]{1,5}[0-9]$/;
            if (!rgba.test(inputCode)) {
                errorCode.html("формат: 0-255,0-255,0-255,0-1");
                errorCode.css("visibility", "visible");
                return;
            }
            break;
        case "HEX":
            let hex = /^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
            if (!hex.test(inputCode)) {
                errorCode.html("формат: #000 или #000000");
                errorCode.css("visibility", "visible");
                return;
            }
            break;
    }


    // добавляем образец в DOM
    addColorToDOM(inputName, inputType, inputCode);
    sampleCount++;

    // куки
    let propertyName = "name" + sampleCount;
    let propertyType = "type" + sampleCount;
    let propertyCode = "code" + sampleCount;

    myPalette.samples = sampleCount;
    myPalette[propertyName] = inputName;
    myPalette[propertyType] = inputType;
    myPalette[propertyCode] = inputCode;

    // шифруем объект
    let myPaletteStr = [];
    for (let key in myPalette) {
        myPaletteStr.push(key);
        myPaletteStr.push(myPalette[key]);
    }
    myPaletteStr = myPaletteStr.join();

    // время жизни 3 часа

    let date = new Date();
    let dateStr = date.toString();
    console.log(dateStr);
    let hours = +dateStr.substr(16,2);
    hours += 3;
    if (hours > 23) {
        hours -= 24;
    }
    date.setHours(hours);
    console.log(date);

    setCookie("myPalette", myPaletteStr, {expires: date});
}

function addColorToDOM(inputName, inputType, inputCode) {

    Palette.css("display", "flex");
    let div1 = document.createElement("div");
    if (inputType === "RGB") {
        div1.style.background = "RGB(" + inputCode + ")";
    }
    if (inputType === "RGBA") {
        div1.style.background = "RGBA(" + inputCode + ")";
    }
    if (inputType === "HEX") {
        div1.style.background = inputCode;
    }
    div1.style.border = "1px solid black";
    $(".palette__wrap").append(div1);
    let div2 = document.createElement("div");
    let pathDiv1 = $(".palette__wrap > div:last-child");
    pathDiv1.append(div2);
    let pName = document.createElement("p");
    pName.classList.add("pName");
    pName.innerHTML = inputName;
    let pType = document.createElement("p");
    pType.innerHTML = inputType;
    let pCode = document.createElement("p");
    pCode.innerHTML = inputCode;
    let pathDiv2 = $(".palette__wrap > div:last-child > div");
    pathDiv2.append(pName);
    pathDiv2.append(pType);
    pathDiv2.append(pCode);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}
