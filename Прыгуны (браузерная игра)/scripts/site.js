// МЕНЮ

document.querySelectorAll('.header__button').forEach(function (item) {

    item.addEventListener('mouseover', function () {
        item.style.height = "52px";
        item.querySelector('button').style.height = "52px";
        item.querySelector('button').style.color = "white";
    });

    item.addEventListener('mouseout', function () {
        item.style.height = "40px";
        item.querySelector('button').style.height = "40px";
        item.querySelector('button').style.color = "#6E6E6E";
    });

});

document.querySelector(".header__button--community").addEventListener('click', function () {
    window.open("https://vk.com/topic-83053553_47091141");
});

document.querySelector(".header__button--gallery").addEventListener("click", function () {
    location.href = "#gallery";
});

document.querySelector(".header__button--top").addEventListener("click", function () {
    location.href = "#top";
});

document.querySelector(".header__button--stat").addEventListener("click", function () {
    location.href = "#stat";
    setTimeout(function () {
        showStatistics();
    }, 200)
});

document.querySelector(".header__button--about").addEventListener("click", function () {
    location.href = "#author";
});

// кнопка - показать статистику

let showStat = 0;
document.querySelector(".stat__btn").addEventListener("click", function () {
    if (showStat == 0) {
        showStatistics();
    } else {
        showStat = 0;
        document.querySelector(".stat__cont").style.height = "0";
        this.querySelector("span").innerHTML = "Показать статистику";
        this.querySelector("img").style.transform = "rotate(0deg)";
    }
});

function showStatistics() {
    showStat = 1;
    document.querySelector(".stat__cont").style.height = "507px";
    document.querySelector(".stat__btn span").innerHTML = "Скрыть статистику";
    document.querySelector(".stat__btn img").style.transform = "rotate(90deg)";
}

