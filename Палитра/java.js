$("form button").on("click", setColor);
let Name = $(".form__name");
let Type = $(".form__type");
let Code = $(".form__code");

function setColor(e) {
    e.preventDefault();

    // название: не должно быть цифр, не менее 2 символов, не более 16 символов

    console.log(Name.val() + " " + Type.val() + " " + Code.val());

    if (Code.patternMismatch) {
        alert("pattern")
    }

    if ( /[0-9]/.test(Name.val()) ) {
        alert("Не должно быть цифр");
        return;
    }

    if ( Name.val().length < 2 || Name.val().length > 16 ) {
        alert("Не менее 2 символов и не более 16");
        return;
    }

    let inputName = Name.val().toUpperCase();
    let inputType = Type.val();
    let inputCode = Code.val().toUpperCase();

    // код: если RGB, то формат rgb(0-255, 0-255, 0-255) если RGBA, то rgba(0-255, 0-255, 0-255, 0-1), если HEX, то #000000 ( числа 0-9, буквы a,b,c,d,e,f)

    let testCode = true;

    switch (inputType) {
        case "RGB":

            let rgb = inputCode.substr(0, 3);
            if (rgb !== "RGB") {
                testCode = false;
            }


            break;
        case "RGBA":
            break;
        case "HEX":

            break;
    }

    if (testCode === false) {
        alert("Формат должен быть: rgb(0-255, 0-255, 0-255)");
        return;
    }

    let div1 = document.createElement("div");
    div1.style.background = "blue";
    $(".palette__wrap").append(div1);
    let div2 = document.createElement("div");
    let pathDiv1 = $(".palette__wrap > div:last-child");
    pathDiv1.append(div2);
    let pName = document.createElement("p");
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