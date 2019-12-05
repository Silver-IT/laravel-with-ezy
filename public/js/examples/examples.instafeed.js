/*
Name: 			Instafeed - Examples
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	1.1.0
*/
(function($) {

	'use strict';

    var clientId    = '11111111111111111111111111111111',
        accessToken = '1111111111.1111111.11111111111111111111111111111111';

	if( $('#instafeedBasic').get(0) ) {
        // Instagram Feed Basic
    	var feed = new Instafeed({
            target: 'instafeedBasic',
            get: 'user',
            userId: 'self',
            clientId: clientId,
            accessToken: accessToken,
            resolution: 'standard_resolution',
            template:
                '<div class="col-md-4 col-lg-6 col-xl-4 mb-3">'+ 
                    '<div class="image-frame image-frame-style-1 image-frame-effect-1">' +
                        '<span class="image-frame-wrapper">' +
                            '<img src="{{image}}" class="img-fluid" alt="{{caption}}" />' +
                            '<span class="image-frame-action image-frame-action-effect-1 image-frame-action-sm">' +
                                '<a href="{{link}}" target="_blank">' +
                                    '<span class="image-frame-action-icon">' +
                                        '<i class="lnr lnr-link text-color-light"></i>' +
                                    '</span>' +
                                '</a>' +
                            '</span>' +
                        '</span>' +
                    '</div>' +
                '</div>',
             after: function(){
                var $wrapper = $('#instafeedBasic'),
                    html = $wrapper.html();

                // Build Html
                $wrapper
                    .html('')
                    .append('<div class="row"></div>')
                    .find('.row')
                    .append(html);
            }
        });

        // Init Instafeed Basic
    	feed.run();
    }

    /*
    * Instafeed Lightbox
    */
    if( $('#instafeedLightbox').get(0) ) {
        // Instagram Feed Basic
        var feed = new Instafeed({
            target: 'instafeedBasic',
            get: 'user',
            userId: 'self',
            clientId: clientId,
            accessToken: accessToken,
            resolution: 'standard_resolution',
            template:
                '<div class="col-md-4 col-lg-6 col-xl-4 mb-3">'+ 
                    '<div class="image-frame image-frame-style-1 image-frame-effect-1">' +
                        '<span class="image-frame-wrapper">' +
                            '<img src="{{image}}" class="img-fluid" alt="{{caption}}" />' +
                            '<span class="image-frame-action image-frame-action-effect-1 image-frame-action-sm">' +
                                '<a href="{{image}}">' +
                                    '<span class="image-frame-action-icon">' +
                                        '<i class="lnr lnr-magnifier text-color-light"></i>' +
                                    '</span>' +
                                '</a>' +
                            '</span>' +
                        '</span>' +
                    '</div>' +
                '</div>',
            after: function(){
                var $wrapper = $('#instafeedLightbox'),
                    html = $wrapper.html();

                // Build Html
                $wrapper
                    .wrap('<div class="lightbox"></div>')
                    .html('')
                    .append('<div class="row"></div>')
                    .find('.row')
                    .append(html);

                // Init Lightbox
                $wrapper.closest('.lightbox').magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    gallery: {
                        enabled: true
                    }
                });
            }
        });

        // Init Instafeed Basic
        feed.run();
    }

    /*
    * Instafeed Carousel
    */
    if( $('#instafeedCarousel').get(0) ) {
        // Instagram Feed Carousel
        var feed = new Instafeed({
            target: 'instafeedCarousel',
            get: 'user',
            userId: 'self',
            clientId: clientId,
            accessToken: accessToken,
            resolution: 'standard_resolution',
            template: 
                '<div>' +
                    '<a target="_blank" href="{{link}}">' +
                        '<img src="{{image}}" class="img-fluid" alt="{{caption}}" />' +
                    '</a>' +
                '</div>',
            after: function(){
                var $wrapper = $('#instafeedCarousel');

                $wrapper.addClass('owl-carousel').owlCarousel({
                    items: 1,
                    nav: false,
                    dots: false,
                    loop: true,
                    navText: [],
                    autoplay: true,
                    autoplayTimeout: 6000,
                    rtl: ( $('html').attr('dir') == 'rtl' ) ? true : false
                });
            }
        });

        // Init Instafeed Carousel
        feed.run();
    }

    /*
    * Instafeed No Margins
    */
    if( $('#instafeedNoMargins').get(0) ) {
        // Instagram Feed Basic
        var feed = new Instafeed({
            target: 'instafeedNoMargins',
            get: 'user',
            userId: 'self',
            clientId: clientId,
            accessToken: accessToken,
            resolution: 'standard_resolution',
            template:
                '<div class="col-6 col-xl-4 px-0">'+ 
                    '<a href="{{link}}" target="_blank">' +
                        '<div class="image-frame hover-effect-2">' +
                            '<span class="image-frame-wrapper">' +
                                '<img src="{{image}}" class="img-fluid" alt="{{caption}}" />' +
                            '</span>' +
                        '</div>' +
                    '</a>' +
                '</div>',
             after: function(){
                var $wrapper = $('#instafeedNoMargins'),
                    html = $wrapper.html();

                // Build Html
                $wrapper
                    .html('')
                    .append('<div class="row mx-0"></div>')
                    .find('.row')
                    .append(html);
            }
        });

        // Init Instafeed No Margins
        feed.run();
    }

}).apply(this, [jQuery]);