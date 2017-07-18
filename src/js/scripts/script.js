$(function () {
    $(window).on('load resize', function () {
        equalHeights('.news-item');
        equalHeights('.community-item');
        equalHeights('.form-adv__item');
        equalHeights('.company__img-box');
        equalHeights('.form__item');
    });

    /**
     * Mobile menu bullets
     */
    $('.dropdown-toggle').on('click', function () {
        var $link = $(this),
            $icon = $link.find('.glyphicon-menu-down');
        $link.parent().on('shown.bs.dropdown', function () {
            $icon.addClass('opened')
        });
        $link.parent().on('hidden.bs.dropdown', function () {
            $icon.removeClass('opened')
        });
    });

    /**
     * Catalog filter slider
     */
    var handle = $('#slider-handle');
    $('#slider').slider({
        range: 'min',
        min: 1,
        max: 20,
        create: function() {
            handle.text($(this).slider('value'));
        },
        slide: function(event, ui) {
            handle.text(ui.value);
        }
    });

    /**
     * Product gallery
     */
    var slider = $('#item-gallery');
    if(slider.length){
        slider.royalSlider({
            fullscreen: {
                enabled: false
            },
            controlNavigation: 'thumbnails',
            thumbs: {
                spacing: 10,
                orientation: 'horizontal',
                appendSpan: false,
                firstMargin: false,
                fitInViewport: true
            },
            transitionType:'move',
            loop: true,
            usePreloader: true,
            arrowsNav: false,
            keyboardNavEnabled: true,
            numImagesToPreload: 1,
            video: {
                autoHideBlocks: true,
                autoHideArrows: false
            }
        });

        $('.rsOverflow').append('<div class="opacity"></div>');
        $('.rsNavItem').append('<div class="border"></div>');
    }

    /**
     * Yandex map init
     */
    if ($('#contact-map').length > 0) {
        ymaps.ready(function () {
            var myMap = new ymaps.Map('contact-map', {
                    center: [59.887137, 30.329136],
                    zoom: 16,
                    controls: ['zoomControl', 'fullscreenControl']
                }, {
                    searchControlProvider: 'yandex#search'
                }),
                myPlacemark = new ymaps.Placemark([59.887137, 30.329136], {
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: './img/point-map.png',
                    iconImageSize: [33, 40]
                });
            myMap.geoObjects.add(myPlacemark);
            myMap.behaviors.disable('scrollZoom');
        });
    }
    if ($('#arenda-map').length > 0) {
        ymaps.ready(function () {
            var myMap = new ymaps.Map('arenda-map', {
                    center: [60, 29],
                    zoom: 9,
                    controls: ['zoomControl', 'fullscreenControl']
                }, {
                    searchControlProvider: 'yandex#search'
                });
            myMap.behaviors.disable('scrollZoom');
        });
    }
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


$("[data-fancybox]").fancybox({
        loop: true,
        toolbar: false
    });

