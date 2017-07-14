$(function () {
    $(window).on('load resize', function () {
        equalHeights('.news-item');
        equalHeights('.community-item');
        equalHeights('.form-adv__item');
        equalHeights('.company__img-box');
    });
});

/**
 * Provides equal height to all elements with selector specified
 * @string elementsClass - selector for blocks to be "equaled", for example '.my-class'
 */
function equalHeights(elementsClass) {
    var tabletWidthStart = 768;

    if (elementsClass) {
        var height = 0,
            elements = document.querySelectorAll(elementsClass);
        for (var k = 0; k < elements.length; k++) {
            elements[k].style.height = '';
        }
        if (window.innerWidth >= tabletWidthStart) {
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].clientHeight > height) {
                    height = elements[i].clientHeight;
                }
            }
            for (var j = 0; j < elements.length; j++) {
                elements[j].style.height = height + 'px';
            }
            window.onresize = function () {
                equalHeights(elementsClass);
            };
        }
    }
}

// Для включения JQuery UI Slider (on Catalog-filtr page)
$( function() {
  $( "#slider" ).slider({
    range: "min"
  });
} );


//MAP on contact page

// ymaps.ready(function () {
//     var myMap = new ymaps.Map('contact-map', {
//             center: [55.751574, 37.573856],
//             zoom: 9
//         }, {
//             searchControlProvider: 'yandex#search'
//         }),

//         myPlacemark = new ymaps.Placemark(myMap.getCenter(), 
//         // {
//             // hintContent: 'Собственный значок метки',
//             // balloonContent: 'Это красивая метка'
//         // }, 
//         {
//             // Опции.
//             // Необходимо указать данный тип макета.
//             // iconLayout: 'default#image',
//             // Своё изображение иконки метки.
//             iconImageHref: './img/',
//             // Размеры метки.
//             iconImageSize: [30, 42],
//             // Смещение левого верхнего угла иконки относительно
//             // её "ножки" (точки привязки).
//             iconImageOffset: [-5, -38]
//         }),

//     myMap.geoObjects
//         .add(myPlacemark);
// });

