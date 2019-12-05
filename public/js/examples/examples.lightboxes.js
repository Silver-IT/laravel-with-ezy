/*
Name: 			Elements - Lightboxes - Examples
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	1.1.0
*/
(function( $ ) {

	'use strict';

	/*
	Popup with video or map
	*/
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		type: 'iframe',
		callbacks: {
			open: function() {
				$('html').addClass('lightbox-open');
			},
			close: function() {
				$('html').removeClass('lightbox-open');
			}
		}
	});

	/*
	Dialog with CSS animation
	*/
	$('.popup-with-zoom-anim').magnificPopup({
		type: 'inline',
		callbacks: {
			open: function() {
				$('html').addClass('lightbox-open');
			},
			close: function() {
				$('html').removeClass('lightbox-open');
			}
		},
		mainClass: 'my-mfp-zoom-in'
	});

	$('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		callbacks: {
			open: function() {
				$('html').addClass('lightbox-open');
			},
			close: function() {
				$('html').removeClass('lightbox-open');
			}
		},
		mainClass: 'my-mfp-slide-bottom'
	});

	/*
	Form
	*/
	$('.popup-with-form').magnificPopup({
		type: 'inline',
		callbacks: {
			open: function() {
				$('html').addClass('lightbox-open');
			},
			close: function() {
				$('html').removeClass('lightbox-open');
			}
		}
	});

	/*
	Ajax
	*/
	$('.simple-ajax-popup').magnificPopup({
		type: 'ajax',
		callbacks: {
			open: function() {
				$('html').addClass('lightbox-open');
			},
			close: function() {
				$('html').removeClass('lightbox-open');
			}
		}
	});

}).apply( this, [ jQuery ]);