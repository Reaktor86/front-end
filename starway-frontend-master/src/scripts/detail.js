// переключение миниатюр

$(".details__mini img").on("click", function (){
    $(".details__mini img").removeClass("details__mini--selected");
    $(this).addClass("details__mini--selected");
});

$(".details__mini img:nth-child(1)").on("click", function (){
    $(".details__slide img").attr("src", "images/stuff/bamboo-pink.png");
});

$(".details__mini img:nth-child(2)").on("click", function (){
    $(".details__slide img").attr("src", "images/stuff/bamboo-black.png");
});

$(".details__mini img:nth-child(3)").on("click", function (){
    $(".details__slide img").attr("src", "images/stuff/bamboo-white.png");
});

$(".details__mini img:nth-child(4)").on("click", function (){
    $(".details__slide img").attr("src", "images/stuff/bamboo-yellow.png");
});

// переключение цветовых кружков

$(".color__circle-out").on("click", function (){
    $(".color__circle-out").removeClass("color__circle-out--selected");
    $(this).addClass("color__circle-out--selected");
});

$(".details__color .color__circle-out:nth-child(2)").on("click", function (){
    $(".details__slide img").attr("src", "images/stuff/bamboo-pink.png");
});

$(".details__color .color__circle-out:nth-child(3)").on("click", function (){
    $(".details__slide img").attr("src", "images/stuff/bamboo-yellow.png");
});

$(".details__color .color__circle-out:nth-child(4)").on("click", function (){
    $(".details__slide img").attr("src", "images/stuff/bamboo-black.png");
});

$(".details__color .color__circle-out:nth-child(5)").on("click", function (){
    $(".details__slide img").attr("src", "images/stuff/bamboo-white.png");
});

// счётчик в корзине

$(".added .added__minus").on("click", function (){
    let num = $(".added .added_num").html();
    num--;
    if (num < 0) num = 0;
    $(".added .added_num").html(num);
});

$(".added .added__plus").on("click", function (){
    let num = $(".added .added_num").html();
    num++;
    $(".added .added_num").html(num);
});

// появление / закрытие попапа "добавлено в корзину"

$(".details__buy").on("click", function (){
    $(".added").css("display", "block");
    $(".overlay").css("display", "block");
    setTimeout(function (){
        $(".added").css("bottom", "0");
    }, 1);
    //$(".added .added_num").html(0);
});

$(".added__continue, .added__close").on("click", function (){
    setTimeout(function (){
        $(".added").css("bottom", "-150%");
    }, 1);
    setTimeout(function (){
        $(".added").css("display", "none");
    }, 400);
    $(".overlay").css("display", "none");
});
