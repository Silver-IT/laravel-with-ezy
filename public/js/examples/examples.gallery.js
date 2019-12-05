/*
Name: 			Gallery - Examples
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	1.1.0
*/
(function($) {

	'use strict';

	/*
	Thumb Gallery
	*/
	var $thumbGalleryDetail = $('#thumbGalleryDetail'),
		$thumbGalleryThumbs = $('#thumbGalleryThumbs'),
		flag = false,
		duration = 300;

	$thumbGalleryDetail
		.owlCarousel({
			items: 1,
			margin: 10,
			nav: true,
			dots: false,
			loop: false,
			navText: [],
			rtl: ( $('html').attr('dir') == 'rtl' ) ? true : false
		})
		.on('changed.owl.carousel', function(e) {
			if (!flag) {
				flag = true;
				$thumbGalleryThumbs.trigger('to.owl.carousel', [e.item.index-1, duration, true]);
				flag = false;
			}
		});

	$thumbGalleryThumbs
		.owlCarousel({
			margin: 15,
			items: 4,
			nav: false,
			center: false,
			dots: false,
			rtl: ( $('html').attr('dir') == 'rtl' ) ? true : false
		})
		.on('click', '.owl-item', function() {
			$thumbGalleryDetail.trigger('to.owl.carousel', [$(this).index(), duration, true]);
		})
		.on('changed.owl.carousel', function(e) {
			if (!flag) {
				flag = true;
				$thumbGalleryDetail.trigger('to.owl.carousel', [e.item.index, duration, true]);
				flag = false;
			}
		});

}).apply(this, [jQuery]);