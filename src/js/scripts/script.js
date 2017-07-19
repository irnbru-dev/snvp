$(function () {
    $(window).on('load resize', function () {
        equalHeights('.news-item');
        equalHeights('.community-item');
        equalHeights('.form-adv__item');
        equalHeights('.company__img-box');
        equalHeights('.form__item');
    });

    /**
     * Main menu search field
     */
    var $mainSearch = $('#main-search'),
        $searchInput = $('#main-search-input'),
        $searchButton = $('#main-search-submit');
    $mainSearch.on('submit', function (e) {
        e.preventDefault();
        console.log($searchInput.val());
        $searchButton.hide();
        $searchInput.removeClass('focus');
    });
    $searchInput.on('focus', function () {
        $searchButton.fadeIn(400);
        $searchInput.addClass('focus');
    });
    $(document).on('click', function (e) {
        if ($searchInput.hasClass('focus')) {
            var id = e.target.id;
            if (id === 'main-search-submit') {
                return true;
            } else if (id !== 'main-search-input') {
                $searchButton.hide();
                $searchInput.removeClass('focus');
            }
        }
    });

    /**
     * Fancybox
     */
    $("[data-fancybox]").fancybox({
        loop: true,
        toolbar: false
    });

    /**
     * Main menu behaviors
     */
    $('.dropdown-toggle').on('click', function (e) {
        var $link = $(this),
            $icon = $link.find('.glyphicon-menu-down'),
            desktopWidthStart = 992;
        // If mobile menu rotate menu item bullets on dropdown open
        if (window.innerWidth < desktopWidthStart) {
            $link.parent().on('shown.bs.dropdown', function () {
                $icon.addClass('opened')
            });
            $link.parent().on('hidden.bs.dropdown', function () {
                $icon.removeClass('opened')
            });
            // Else prevent open dropdowns on click
        } else {
            if ($link.attr('href') === '#') e.preventDefault();
            e.stopPropagation();
        }
    });

    /**
     * Catalog filter slider
     */
    var handle = $('#slider-handle');
    $('#slider').slider({
        range: 'min',
        min: 1,
        max: 20,
        create: function () {
            handle.text($(this).slider('value'));
        },
        slide: function (event, ui) {
            handle.text(ui.value);
        }
    });

    /**
     * Clients gallery
     */
    var $clientsGallery = $('#owl-clients');
    if ($clientsGallery.length > 0) {
        $clientsGallery.owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            navText: ['<span class="sprite-icon icon-slider-arrow-r"></span>', '<span class="sprite-icon icon-slider-arrow-r"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                },
                1200: {
                    items: 5
                }
            }
        })
    }

    /**
     * Popular gallery
     */
    var $popularGallery = $('#owl-popular');
    if ($popularGallery.length > 0) {
        $popularGallery.owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            navText: ['<span class="sprite-icon icon-slider-arrow-r"></span>', '<span class="sprite-icon icon-slider-arrow-r"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        })
    }

    /**
     * Product gallery
     */
    var $productGallery = $('#item-gallery');
    if ($productGallery.length > 0) {
        $productGallery.royalSlider({
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
            transitionType: 'move',
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
                myPlacemark = new ymaps.Placemark([59.887137, 30.329136], {}, {
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
