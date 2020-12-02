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