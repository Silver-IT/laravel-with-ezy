/*
Name: 			Countdown - Examples
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	1.1.0
*/
(function($) {

	'use strict';

	/*
	Countdown
	*/
	if( $('#countdown1').get(0) ) {
		var countdown_date  = $('#countdown1').data('countdown-date'),
			countdown_title = $('#countdown1').data('countdown-title');

		$('#countdown1').countdown(countdown_date).on('update.countdown', function(event) {
			var $this = $(this).html(event.strftime(
				'<span class="days custom-secondary-font"><span class="text-color-primary">%D</span> DAY%!D</span> ' +
				'<span class="hours custom-secondary-font"><span class="text-color-primary">%H</span> HOURS</span> ' +
				'<span class="minutes custom-secondary-font"><span class="text-color-primary">%M</span> MINUTES</span> ' +
				'<span class="seconds custom-secondary-font"><span class="text-color-primary">%S</span> SECONDS</span> '
			));
		});
	}

}).apply(this, [jQuery]);