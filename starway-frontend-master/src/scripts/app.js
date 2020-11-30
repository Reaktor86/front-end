import Vue from 'vue'
//import 'owl.carousel';
//import '@fancyapps/fancybox'



$(document).ready(function () {
    $('.js-show-menu').on('click', function (e) {
        e.preventDefault();
        console.log('click');
        //$('html').toggleClass('fixed');
        $('.main-menu').slideDown();
        setTimeout(function () {

        }, 500);

    });

    $('.js-hide-menu').on('click', function (e) {
        e.preventDefault();
        console.log('hide menu');
        //$('html').toggleClass('fixed');
        $('.main-menu').slideUp();


    });

    $('.js-slide-image a span').hover(
        function (e) {
          let index = $(this).closest('a').attr('data-index');
          let aImage = $('.main-menu__images img[data-slideimg=' + index + ']');
          if (aImage.length > 0) {
            $('.main-menu__images img').each(function () {
              $(this).removeClass('is-active');
            });

            aImage.addClass('is-active');
          }
        }
    );

    /*let deg = 0;
    function rotate() {
        deg++;
        //transform: translate(0px, 0px);
        $('.top-index__images img').css('transform','translate('+deg+'deg)');
        if(deg < 105)
        {
            setTimeout(function(){rotate();}, 10);
        }
    }
    rotate();*/

    /*let boxElement = document.querySelectorAll('.top-index__images img');
    let duration = 1200;
    boxElement.forEach(function (item) {
        var animation = item.animate([

            {transform: 'translate(1500px, 0px)', opacity: 0.1, justifyContent: 'center'},
            {transform: 'translate(1000px, -0px), ', opacity: 0.5},
            {transform: 'translate(500px, -0px), ', opacity: 0.8},
            {transform: 'translate(0, 0)'}
        ], duration);

        //if ()
        //duration += duration + 5;
    });*/


});