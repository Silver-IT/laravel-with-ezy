/*
Name: 			Theme Base
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	1.1.0
*/

// Theme
(function( $ ) {

	'use strict';

	window.theme = {};

	// Theme Common Functions
	window.theme.fn = {

		getOptions: function(opts) {

			if (typeof(opts) == 'object') {

				return opts;

			} else if (typeof(opts) == 'string') {

				try {
					return JSON.parse(opts.replace(/'/g,'"').replace(';',''));
				} catch(e) {
					return {};
				}

			} else {

				return {};

			}

		},

		getOptionsSemicolon: function(opts) {

			if (typeof(opts) == 'object') {

				return opts;

			} else if (typeof(opts) == 'string') {

				try {
					return JSON.parse(opts.replace(/'/g,'"'));
				} catch(e) {
					return {};
				}

			} else {

				return {};

			}

		}

	};

}).apply( this, [ jQuery ]);

// Animate
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__animate';

	var PluginAnimate = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginAnimate.defaults = {
		accX: 0,
		accY: -80,
		delay: 100,
		duration: '750ms'
	};

	PluginAnimate.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginAnimate.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			var self = this,
				$el = this.options.wrapper,
				delay = 0,
				duration = this.options.duration,
				elTopDistance = $el.offset().top + 100,
				windowTopDistance = $(window).scrollTop();

			$el.addClass('appear-animation animated');

			if (!$('html').hasClass('no-csstransitions') && $(window).width() > 767 && elTopDistance >= windowTopDistance) {

				$el.appear(function() {

					$el.one('animation:show', function(ev) {
						delay = ($el.attr('data-appear-animation-delay') ? $el.attr('data-appear-animation-delay') : self.options.delay);
						duration = ($el.attr('data-appear-animation-duration') ? $el.attr('data-appear-animation-duration') : self.options.duration);

						if (duration != '750ms') {
							$el.css('animation-duration', duration);
						}

						$el.css('animation-delay', delay + 'ms');

						$el.addClass($el.attr('data-appear-animation') + ' appear-animation-visible');
					});

					$el.trigger('animation:show');

				}, {
					accX: self.options.accX,
					accY: self.options.accY
				});

			} else {

				$el.addClass('appear-animation-visible');

			}

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginAnimate: PluginAnimate
	});

	// jquery plugin
	$.fn.themePluginAnimate = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginAnimate($this, opts);
			}

		});
	};

}).apply(this, [window.theme, jQuery]);

// Carousel
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__carousel';

	var PluginCarousel = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginCarousel.defaults = {
		loop: true,
		responsive: {
			0: {
				items: 1
			},
			575: {
				items: 1
			},
			767: {
				items: 2
			},
			991: {
				items: 3
			},
			1199: {
				items: 4
			}
		},
		navText: [],
		clonePrevNext: false,
		vertical: false,
		rewind: false
	};

	PluginCarousel.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginCarousel.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.owlCarousel))) {
				return this;
			}

			var self = this,
				$el = this.options.wrapper;

			// Add Theme Class
			$el.addClass('owl-theme');

			// Force RTL according to HTML dir attribute
			if ($('html').attr('dir') == 'rtl') {
				this.options = $.extend(true, {}, this.options, {
					rtl: true
				});
			}

			if (this.options.items == 1) {
				this.options.responsive = {}
			}

			// Auto Height Fixes
			if (this.options.autoHeight) {
				var itemsHeight = [];

				$el.find('.owl-item').each(function(){
					if( $(this).hasClass('active') ) {
						itemsHeight.push( $(this).height() );
					}
				});

				$(window).afterResize(function() {
					$el.find('.owl-stage-outer').height( Math.max.apply(null, itemsHeight) );
				});

				$(window).on('load', function() {
					$el.find('.owl-stage-outer').height( Math.max.apply(null, itemsHeight) );
				});
			}

			// Initialize OwlCarousel
			$el.owlCarousel(this.options).addClass('owl-carousel-init');

			// Carousel Corner Left Bottom Style
			if( $('.carousel-corner-left-bottom').get(0) ) {
				$('.carousel-corner-left-bottom').on('drag.owl.carousel change.owl.carousel', function(e){
					$(this).find('.owl-item').addClass('changing');
				});

				$('.carousel-corner-left-bottom').on('changed.owl.carousel', function(e){
					setTimeout(function(){
						$('.carousel-corner-left-bottom').find('.owl-item').removeClass('changing');
					}, 500);
				});
			}

			// Carousel Center Active Items Style
			if( $el.hasClass('carousel-center-active-items') ) {
				var itemsActive    = $el.find('.owl-item.active'),
					indexCenter    = Math.floor( ($el.find('.owl-item.active').length - 1) / 2 ),
					itemCenter     = itemsActive.eq(indexCenter),
					itemCenterPrev = itemCenter.prev(),
					itemCenterNext = itemCenter.next();

				itemCenter.addClass('current');
				itemCenterPrev.addClass('remove-blur');
				itemCenterNext.addClass('remove-blur');

				$el.on('change.owl.carousel', function(event) {
				  	$el.find('.owl-item').removeClass('current');
					
					setTimeout(function(){
					  	var itemsActive    = $el.find('.owl-item.active'),
					  		itemCenter     = itemsActive.eq(indexCenter);

					  	itemCenter.addClass('current');

						// Add blur effect for first and last active items
					  	itemsActive.first().removeClass('remove-blur');
						itemsActive.last().removeClass('remove-blur');

					  	// Remove blur effect for elements at right and left of current item
					  	itemCenter.prev().addClass('remove-blur');
						itemCenter.next().addClass('remove-blur');

					}, 100);
				});

				$el.on('resized.owl.carousel', function(event) {
					if( $el.find('.owl-item.active').length == 1 ) {
						$el
							.css({
								width: '100%'
							})
							.addClass('rm-degrade-now');
					} else {
						$el
							.css({
								width: ''
							})
							.removeClass('rm-degrade-now');
					}

					$el.trigger('refresh.owl.carousel');
				});

				// Refresh
				$el.trigger('refresh.owl.carousel');
			}

			// Clone Prev Next
			if (this.options.clonePrevNext) {
				$el.find('.owl-item').each(function() {
					$(this).prev().find('div:not(.clone-inside)').clone().addClass('clone-inside prev').prependTo($(this));
					$(this).next().find('div:not(.clone-inside)').clone().addClass('clone-inside next').appendTo($(this));
				});

				$el.on('change.owl.carousel', function(){
					$el.find('.owl-item.active div:not(.prev)').css('opacity', 0);
				});

				$el.on('changed.owl.carousel', function(){
					$el.find('.owl-item').one('animationend', function(){
						$el.find('.owl-item div:not(.prev)').css('opacity', 1);
						$el.find('.owl-item.cloned div:not(.prev)').css('opacity', 0);
						$el.find('.owl-item.active div:not(.prev)').css('opacity', 1);
					});
						
				});

				$el.on('drag.owl.carousel', function(){
					$el.find('.owl-item div:not(.prev)').css('opacity', 1);
				});
			}

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginCarousel: PluginCarousel
	});

	// jquery plugin
	$.fn.themePluginCarousel = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginCarousel($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Chart Circular
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__chartCircular';

	var PluginChartCircular = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginChartCircular.defaults = {
		accX: 0,
		accY: -150,
		delay: 1,
		barColor: '#2388ed',
		trackColor: '#F1F3F7',
		scaleColor: false,
		scaleLength: 5,
		lineCap: 'square',
		lineWidth: 3,
		size: 150,
		rotate: 0,
		animate: ({
			duration: 2500,
			enabled: true
		})
	};

	PluginChartCircular.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginChartCircular.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.appear)) || !($.isFunction($.fn.easyPieChart))) {
				return this;
			}

			var self = this,
				$el = this.options.wrapper,
				value = ($el.attr('data-percent') ? $el.attr('data-percent') : 0),
				percentEl = $el.find('.percent');

			$.extend(true, self.options, {
				onStep: function(from, to, currentValue) {
					percentEl.html(parseInt(currentValue));
				}
			});

			$el.attr('data-percent', 0);

			$el.appear(function() {

				$el.easyPieChart(self.options);

				setTimeout(function() {

					$el.data('easyPieChart').update(value);
					$el.attr('data-percent', value);

				}, self.options.delay);

			}, {
				accX: self.options.accX,
				accY: self.options.accY
			});

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginChartCircular: PluginChartCircular
	});

	// jquery plugin
	$.fn.themePluginChartCircular = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginChartCircular($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Counter
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__counter';

	var PluginCounter = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginCounter.defaults = {
		accX: 0,
		accY: 0,
		speed: 3000,
		refreshInterval: 100,
		decimals: 0,
		onUpdate: null,
		onComplete: null
	};

	PluginCounter.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginCounter.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.countTo))) {
				return this;
			}

			var self = this,
				$el = this.options.wrapper;

			$.extend(self.options, {
				onComplete: function() {
					if ($el.data('append')) {
						$el.html($el.html() + $el.data('append'));
					}

					if ($el.data('prepend')) {
						$el.html($el.data('prepend') + $el.html());
					}
				}
			});

			$el.appear(function() {

				$el.countTo(self.options);

			}, {
				accX: self.options.accX,
				accY: self.options.accY
			});

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginCounter: PluginCounter
	});

	// jquery plugin
	$.fn.themePluginCounter = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginCounter($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Double Carousel
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__doubleCarousel';

	var PluginDoubleCarousel = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginDoubleCarousel.defaults = {
		loop: true,
		responsive: {
			0: {
				items: 1
			},
			479: {
				items: 1
			},
			768: {
				items: 1
			},
			979: {
				items: 2
			},
			1199: {
				items: 3
			}
		},
		margin: 20,
		mouseDrag: false,
		navText: [],
		autoplay: true,
		autoplayTimeout: 5000,
		rewind: false
	};

	PluginDoubleCarousel.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;
			this.$carousels = $el.find('.owl-carousel');
			this.$mainCarousel = $el.find('.wrapper-right .owl-carousel');
			this.$mirrorCarousel = $el.find('.wrapper-left .owl-carousel');

			this
				.setData()
				.setOptions(opts)
				.build()
				.navigation();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginDoubleCarousel.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.owlCarousel))) {
				return this;
			}

			var self 	  = this,
				$el 	  = this.options.wrapper,
				firstLoad = true;

			// Add Theme Class
			self.$carousels.addClass('owl-theme');

			if (this.options.items == 1) {
				this.options.responsive = {}
			}

			// Auto Height Fixes
			if (this.options.autoHeight) {
				var itemsHeight = [];

				self.$carousels.find('.owl-item').each(function(){
					if( $(this).hasClass('active') ) {
						itemsHeight.push( $(this).height() );
					}
				});

				$(window).afterResize(function() {
					self.$carousels.find('.owl-stage-outer').height( Math.max.apply(null, itemsHeight) );
				});

				$(window).on('load', function() {
					self.$carousels.find('.owl-stage-outer').height( Math.max.apply(null, itemsHeight) );
				});
			}

			// If Mobile
			if ($.browser.mobile) {
				this.options = $.extend(true, {}, this.options, {
					mouseDrag: true,
					margin: 0
				});
			}

			// Initialize Main Carousel
			self.$mainCarousel.owlCarousel(this.options).addClass('owl-carousel-init mirrored');

			// Remove autoplay from Mirror Carousel
			if( this.options.autoplay ) {
				this.options = $.extend(true, {}, this.options, {
					autoplay: false
				});
			}

			// Initialize Mirror Carousel
			self.$mirrorCarousel.owlCarousel(this.options).addClass('owl-carousel-init mirrored');			

			// Set the first item position of Mirror Carousel
			for( var i=1; i <= self.$mirrorCarousel.find('.owl-item.active').length - 1; i++ ) {
				self.$mirrorCarousel.trigger('prev.owl.carousel');
			}
			
			self.events();
			self.recalcCarouselsWidth();

			if( firstLoad == true ) {
				firstLoad = false;
				self.recalcCarouselsWidth();

				setTimeout(function(){
	        		self.$mirrorCarousel.addClass('show-carousel');
	        		self.$mainCarousel.addClass('show-carousel');

	        		self.refreshOnResize();
        		}, 500);
    		}

    		if( firstLoad == false ) {
    			self.setCurrentItem();
    		}

			return this;
		},

		setCurrentItem: function() {
			var self = this,
				flag = false;

			self.$mainCarousel.on('change.owl.carousel', function(event) {
			  	if (event.namespace && event.property.name === 'position' && flag == false) {
				    var target = event.relatedTarget.relative(event.property.value, true);
				    flag = true;

				    self.$mirrorCarousel.owlCarousel('to', target - (self.$mirrorCarousel.find('.owl-item.active').length - 1), 300, true);
				    self.$mirrorCarousel.find('.owl-item').removeClass('current');
			        self.$mainCarousel.find('.owl-item').removeClass('current');
			        
			        setTimeout(function(){
			        	self.$mirrorCarousel.find('.owl-item.active').eq( self.$mirrorCarousel.find('.owl-item.active').length - 1 ).addClass('current');
			        	self.$mainCarousel.find('.owl-item.active').eq(0).addClass('current');
			        }, 10);

			        flag = false;
			  	}
			});

			if( $.browser.mobile ) {
				self.$mirrorCarousel.on('change.owl.carousel', function(event) {
				  	if (event.namespace && event.property.name === 'position' && flag == false) {
					    var target = event.relatedTarget.relative(event.property.value, true);
					    flag = true;

					    self.$mainCarousel.owlCarousel('to', target - (self.$mainCarousel.find('.owl-item.active').length - 1), 300, true);
					    self.$mainCarousel.find('.owl-item').removeClass('current');
				        self.$mirrorCarousel.find('.owl-item').removeClass('current');
				        
				        setTimeout(function(){
				        	self.$mainCarousel.find('.owl-item.active').eq( self.$mainCarousel.find('.owl-item.active').length - 1 ).addClass('current');
				        	self.$mirrorCarousel.find('.owl-item.active').eq(0).addClass('current');
				        }, 10);

				     	flag = false;
				  	}
				});
			}
		},
		
		recalcCarouselsWidth: function() {
			var self 		     = this,
				$el 		     = this.options.wrapper,
				itemSize         = self.$mirrorCarousel.find('.owl-item').outerWidth(true),
				dividedItemSize  = itemSize / 2,
				totalActiveItems = self.$mirrorCarousel.find('.owl-item.active').length;

			if( totalActiveItems > 1 ) {
				
				self.$mirrorCarousel.width( $el.find('.wrapper-left').width() + dividedItemSize );
				setTimeout(function(){
					self.$mirrorCarousel.css({
						right: dividedItemSize
					});
				}, 500);
				
				self.$mainCarousel.width( $el.find('.wrapper-right').width() + dividedItemSize );

			} else {
				
				self.$mirrorCarousel.width( $el.find('.wrapper-left').width() );
				setTimeout(function(){
					self.$mirrorCarousel.css({
						right: 0
					});
				}, 500);
				
				self.$mainCarousel.width( $el.find('.wrapper-right').width() );

			}

			$(document).trigger('double.carousel.recalc.width');
		},

		refreshOnResize: function() {
			var self = this;

			$(document).ready(function(){
				$(window).afterResize(function(){
					
					// First - Refresh both carousels to set new sizes
					self.$mirrorCarousel.trigger('refresh.owl.carousel');
					self.$mainCarousel.trigger('refresh.owl.carousel');

					// Second - Recalc Carousels width based on new sizes
					setTimeout(function(){
						self.recalcCarouselsWidth();
					}, 600);

				}, false, 300);
			});
		},

		navigation: function() {
			var self       = this,
				$el        = this.options.wrapper,
				$leftArrow  = $el.find('.arrow-left'),
				$rightArrow = $el.find('.arrow-right');

			$leftArrow.on('click', function(e){
				self.$mainCarousel.trigger('prev.owl.carousel');
			});

			$rightArrow.on('click', function(e){
				self.$mainCarousel.trigger('next.owl.carousel');
			});
		},

		events: function() {
			var self = this;

			$(window).on('double.carousel.recalc.width', function(e){
					
				// Refresh carousels to set new sizes
				self.$mirrorCarousel.trigger('refresh.owl.carousel');
				self.$mainCarousel.trigger('refresh.owl.carousel');
				
				// Set current item
				self.$mirrorCarousel.find('.owl-item.active').eq( self.$mirrorCarousel.find('.owl-item.active').length - 1 ).addClass('current');
	        	self.$mainCarousel.find('.owl-item.active').eq(0).addClass('current');

				// Position the first item
				self.$mainCarousel.trigger('prev.owl.carousel').trigger('next.owl.carousel');
        		
			});
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginDoubleCarousel: PluginDoubleCarousel
	});

	// jquery plugin
	$.fn.themePluginDoubleCarousel = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginDoubleCarousel($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Float Element
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__floatElement';

	var PluginFloatElement = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginFloatElement.defaults = {
		startPos: 'top',
		speed: 3,
		horizontal: false,
		transition: false
	};

	PluginFloatElement.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginFloatElement.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			var self = this,
				$el = this.options.wrapper,
				$window = $(window),
				minus;

			if( self.options.style ) {
				console.log(self.options.style);
				$el.attr('style', self.options.style);
			}

			if( $window.width() > 767 ) {

				// Set Start Position
				if( self.options.startPos == 'none' ) {
					minus = '';
				} else if( self.options.startPos == 'top' ) {
					$el.css({
						top: 0
					});
					minus = '';
				} else {
					$el.css({
						bottom: 0
					});
					minus = '-';
				}

				// Set Transition
				if( self.options.transition ) {
					$el.css({
						transition: 'ease transform 500ms'
					});
				}

				// First Load
				self.movement(minus);	

				// Scroll
				$window.on('scroll', function(){
					self.movement(minus);				   
				});

			}

			return this;
		},

		movement: function(minus) {
			var self = this,
				$el = this.options.wrapper,
				$window = $(window),
				scrollTop = $window.scrollTop(),
		    	elementOffset = $el.offset().top,
		     	currentElementOffset = (elementOffset - scrollTop);

		   	var scrollPercent = 100 * currentElementOffset / ($window.height());

		   	if( $el.visible( true ) ) {

		   		if( !self.options.horizontal ) {

		   			$el.css({
			   			transform: 'translate3d(0, '+ minus + scrollPercent / self.options.speed +'%, 0)'
			   		});

		   		} else {

		   			$el.css({
			   			transform: 'translate3d('+ minus + scrollPercent / self.options.speed +'%, '+ minus + scrollPercent / self.options.speed +'%, 0)'
			   		});

		   		}
		   		
		   	}
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginFloatElement: PluginFloatElement
	});

	// jquery plugin
	$.fn.themePluginFloatElement = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginFloatElement($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Icon
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__icon';

	var PluginIcon = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginIcon.defaults = {
		color: '#2388ED',
		animated: false,
		delay: 300
	};

	PluginIcon.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginIcon.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			var self  	 = this,
				$el   	 = this.options.wrapper,
				color 	 = self.options.color,
				elTopDistance = $el.offset().top,
				windowTopDistance = $(window).scrollTop(),
				duration = ( self.options.animated && !self.options.strokeBased ) ? 200 : 100;

			// Check origin
			if( window.location.origin === 'file://' ) {
				$el.css('opacity', 1);
				return;
			}

			// Duration
			if( self.options.duration ) {
				duration = self.options.duration;
			}

			// Icon Wrapper
			var iconWrapper = $('<object class="animated-icon" type="image/svg+xml" data="'+ $el.attr('src') +'"></object>');

			if( $el.attr('style') ) {
				iconWrapper.attr('style', $el.attr('style'));
			}

			if( $el.attr('width') ) {
				iconWrapper.attr('width', $el.attr('width'));
			}

			iconWrapper.css('height', $el.height());

			$el.replaceWith(iconWrapper);

			$el = iconWrapper;

			var icon = new Vivus($($el)[0], {start: 'manual', type: 'sync', selfDestroy: true, duration: duration, onReady: function(obj){
				var styleElement = document.createElementNS("http://www.w3.org/2000/svg", "style"),
					animateStyle = '';

				// SVG Fill Based
				if( self.options.animated && !self.options.strokeBased || !self.options.animated && color && !self.options.strokeBased ) {
					animateStyle = 'stroke-width: 0.1px; fill-opacity: 0; transition: ease fill-opacity 300ms;';
					
					// Set Style on SVG inside object
					styleElement.textContent = 'path, line, rect, circle, line, polyline { fill: '+ color +'; stroke: '+ color +'; '+ animateStyle + (self.options.svgStyle ? self.options.svgStyle : "") + ' } .finished path { fill-opacity: 1; }';
					obj.el.appendChild(styleElement);
				}

				// SVG Stroke Based
				if( self.options.animated && self.options.strokeBased || !self.options.animated && color && self.options.strokeBased ) {

					// Set Style on SVG inside object
					styleElement.textContent = 'path, line, rect, circle, line, polyline { stroke: '+ color +'; ' + (self.options.svgStyle ? self.options.svgStyle : "") + '}';
					obj.el.appendChild(styleElement);
				}

				// devcode: !production
				$(window).on('styleSwitcher.modifyVars', function(e){
					if( self.options.color.toUpperCase() != '#FFF' ) {
						if( e.options.colorPrimary.toUpperCase() != self.options.color.toUpperCase() ) {
							
							var	styleElement = document.createElementNS("http://www.w3.org/2000/svg", "style"),
								svg          = obj.el;

							if( self.options.strokeBased ) {
								styleElement.textContent = 'path, line, rect, circle, line, polyline { stroke: '+ e.options.colorPrimary +'; }';
							} else {
								styleElement.textContent = 'path, line, rect, circle, line, polyline { fill: '+ e.options.colorPrimary +'; stroke: '+ e.options.colorPrimary +'; }';
							}
							svg.appendChild(styleElement);
						
						}
					}
				});
				// endcode

				$.event.trigger('theme.plugin.icon.svg.ready');
			}});

			// Isn't animated
			if( !self.options.animated ) {
				setTimeout(function(){
					icon.finish();
				}, 10);
				$el.css({ opacity: 1 });
			}

			// Animated
			if( self.options.animated && $(window).width() > 767 ) {
				
				// First Load
				if( $el.visible( true ) ) {
					self.startIconAnimation( icon, $el );
				} else if( elTopDistance < windowTopDistance ) {
					self.startIconAnimation( icon, $el );
				}

				// On Scroll
				$(window).on('scroll', function(){
					if( $el.visible( true ) ) {
						self.startIconAnimation( icon, $el );
					}
				});

			} else {
				
				$el.css({ opacity: 1 });

				$(window).on('theme.plugin.icon.svg.ready', function(){
					setTimeout(function(){
						icon.el.setAttribute('class', 'finished');
					}, 300);
				});
				
			}

			return this;
		},
		startIconAnimation: function(icon, $el) {
			var self = this;

			// Animate for better performance
			$({to:0}).animate({to:1}, ((self.options.strokeBased) ? self.options.delay : self.options.delay + 300 ), function() {
				$el.css({ opacity: 1 });
			});

			$({to:0}).animate({to:1}, self.options.delay, function() {
				icon.play(1);

				setTimeout(function(){
					icon.el.setAttribute('class', 'finished');
				}, icon.duration * 5 );
			});
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginIcon: PluginIcon
	});

	// jquery plugin
	$.fn.themePluginIcon = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginIcon($this, opts);
			}

		});
	};

}).apply(this, [window.theme, jQuery]);

// Image Background
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__imageBackground';

	var PluginImageBackground = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginImageBackground.defaults = {
		bgSize: 'cover',
		bgPosition: 'center'
	};

	PluginImageBackground.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginImageBackground.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			var self = this,
				$el = self.options.wrapper,
				important;

			if( !self.options.imageUrl ) {
				return;
			}

			$el.css({
				'background-image': 'url(' + self.options.imageUrl + ')',
				'background-size' : self.options.bgSize,
				'background-position': self.options.bgPosition,
				'background-repeat': 'no-repeat'
			});

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginImageBackground: PluginImageBackground
	});

	// jquery plugin
	$.fn.themePluginImageBackground = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginImageBackground($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Lazy Load
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__lazyload';

	var PluginLazyLoad = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginLazyLoad.defaults = {
		effect: 'show',
		appearEffect: '',
		appear: function(elements_left, settings) {
			
		},
		load: function(elements_left, settings) {
			$(this).addClass($.trim('lazy-load-loaded ' + settings.appearEffect));
		}
	};

	PluginLazyLoad.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginLazyLoad.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.lazyload))) {
				return this;
			}

			var self = this;

			self.options.wrapper.lazyload(this.options);

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginLazyLoad: PluginLazyLoad
	});

	// jquery plugin
	$.fn.themePluginLazyLoad = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginLazyLoad($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Lightbox
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__lightbox';

	var PluginLightbox = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginLightbox.defaults = {
		tClose: 'Close (Esc)', // Alt text on close button
		tLoading: 'Loading...', // Text that is displayed during loading. Can contain %curr% and %total% keys
		gallery: {
			tPrev: 'Previous (Left arrow key)', // Alt text on left arrow
			tNext: 'Next (Right arrow key)', // Alt text on right arrow
			tCounter: '%curr% of %total%' // Markup for "1 of 7" counter
		},
		image: {
			tError: '<a href="%url%">The image</a> could not be loaded.' // Error message when image could not be loaded
		},
		ajax: {
			tError: '<a href="%url%">The content</a> could not be loaded.' // Error message when ajax request failed
		},
		callbacks: {
			open: function() {
				$('html').addClass('lightbox-open');
			},
			close: function() {
				$('html').removeClass('lightbox-open');
			}
		}
	};

	PluginLightbox.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginLightbox.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.magnificPopup))) {
				return this;
			}

			this.options.wrapper.magnificPopup(this.options);

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginLightbox: PluginLightbox
	});

	// jquery plugin
	$.fn.themePluginLightbox = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginLightbox($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Loading Overlay
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var loadingOverlayTemplate = [
		'<div class="loading-overlay">',
			'<div class="bounce-loader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>',
		'</div>'
	].join('');

	var LoadingOverlay = function( $wrapper, options ) {
		return this.initialize( $wrapper, options );
	};

	LoadingOverlay.prototype = {

		options: {
			css: {}
		},

		initialize: function( $wrapper, options ) {
			this.$wrapper = $wrapper;

			this
				.setVars()
				.setOptions( options )
				.build()
				.events();

			this.$wrapper.data( 'loadingOverlay', this );
		},

		setVars: function() {
			this.$overlay = this.$wrapper.find('.loading-overlay');

			return this;
		},

		setOptions: function( options ) {
			if ( !this.$overlay.get(0) ) {
				this.matchProperties();
			}
			this.options     = $.extend( true, {}, this.options, options );
			this.loaderClass = this.getLoaderClass( this.options.css.backgroundColor );

			return this;
		},

		build: function() {
			if ( !this.$overlay.closest(document.documentElement).get(0) ) {
				if ( !this.$cachedOverlay ) {
					this.$overlay = $( loadingOverlayTemplate ).clone();

					if ( this.options.css ) {
						this.$overlay.css( this.options.css );
						this.$overlay.find( '.loader' ).addClass( this.loaderClass );
					}
				} else {
					this.$overlay = this.$cachedOverlay.clone();
				}

				this.$wrapper.append( this.$overlay );
			}

			if ( !this.$cachedOverlay ) {
				this.$cachedOverlay = this.$overlay.clone();
			}

			return this;
		},

		events: function() {
			var _self = this;

			if ( this.options.startShowing ) {
				_self.show();
			}

			if ( this.$wrapper.is('body') || this.options.hideOnWindowLoad ) {
				$( window ).on( 'load error', function() {
					_self.hide();
				});
			}

			if ( this.options.listenOn ) {
				$( this.options.listenOn )
					.on( 'loading-overlay:show beforeSend.ic', function( e ) {
						e.stopPropagation();
						_self.show();
					})
					.on( 'loading-overlay:hide complete.ic', function( e ) {
						e.stopPropagation();
						_self.hide();
					});
			}

			this.$wrapper
				.on( 'loading-overlay:show beforeSend.ic', function( e ) {
					if ( e.target === _self.$wrapper.get(0) ) {
						e.stopPropagation();
						_self.show();
						return true;
					}
					return false;
				})
				.on( 'loading-overlay:hide complete.ic', function( e ) {
					if ( e.target === _self.$wrapper.get(0) ) {
						e.stopPropagation();
						_self.hide();
						return true;
					}
					return false;
				});

			return this;
		},

		show: function() {
			this.build();

			this.position = this.$wrapper.css( 'position' ).toLowerCase();
			if ( this.position != 'relative' || this.position != 'absolute' || this.position != 'fixed' ) {
				this.$wrapper.css({
					position: 'relative'
				});
			}
			this.$wrapper.addClass( 'loading-overlay-showing' );
		},

		hide: function() {
			var _self = this;

			this.$wrapper.removeClass( 'loading-overlay-showing' );
			setTimeout(function() {
				if ( this.position != 'relative' || this.position != 'absolute' || this.position != 'fixed' ) {
					_self.$wrapper.css({ position: '' });
				}
			}, 500);
		},

		matchProperties: function() {
			var i,
				l,
				properties;

			properties = [
				'backgroundColor',
				'borderRadius'
			];

			l = properties.length;

			for( i = 0; i < l; i++ ) {
				var obj = {};
				obj[ properties[ i ] ] = this.$wrapper.css( properties[ i ] );

				$.extend( this.options.css, obj );
			}
		},

		getLoaderClass: function( backgroundColor ) {
			if ( !backgroundColor || backgroundColor === 'transparent' || backgroundColor === 'inherit' ) {
				return 'black';
			}

			var hexColor,
				r,
				g,
				b,
				yiq;

			var colorToHex = function( color ){
				var hex,
					rgb;

				if( color.indexOf('#') >- 1 ){
					hex = color.replace('#', '');
				} else {
					rgb = color.match(/\d+/g);
					hex = ('0' + parseInt(rgb[0], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2);
				}

				if ( hex.length === 3 ) {
					hex = hex + hex;
				}

				return hex;
			};

			hexColor = colorToHex( backgroundColor );

			r = parseInt( hexColor.substr( 0, 2), 16 );
			g = parseInt( hexColor.substr( 2, 2), 16 );
			b = parseInt( hexColor.substr( 4, 2), 16 );
			yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

			return ( yiq >= 128 ) ? 'black' : 'white';
		}

	};

	// expose to scope
	$.extend(theme, {
		LoadingOverlay: LoadingOverlay
	});

	// expose as a jquery plugin
	$.fn.loadingOverlay = function( opts ) {
		return this.each(function() {
			var $this = $( this );

			var loadingOverlay = $this.data( 'loadingOverlay' );
			if ( loadingOverlay ) {
				return loadingOverlay;
			} else {
				var options = opts || $this.data( 'loading-overlay-options' ) || {};
				return new LoadingOverlay( $this, options );
			}
		});
	}

	// auto init
	$('[data-loading-overlay]').loadingOverlay();

}).apply(this, [window.theme, jQuery]);

// Masonry
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__masonry';

	var PluginMasonry = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginMasonry.defaults = {
		itemSelector: '.isotope-item'
	};

	PluginMasonry.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginMasonry.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.isotope))) {
				return this;
			}

			var self = this,
				$window = $(window);

			self.$loader = false;

			if (self.options.wrapper.closest('.masonry-loader').get(0)) {
				self.$loader = self.options.wrapper.closest('.masonry-loader');
				self.createLoader();
			}

			self.options.wrapper.one('layoutComplete', function(event, laidOutItems) {
				self.removeLoader();
			});

			self.options.wrapper.waitForImages(function() {
				self.options.wrapper.isotope(self.options);
			});

			setTimeout(function() {
				self.removeLoader();
			}, 3000);

			$window.afterResize(function(){
				self.options.wrapper.isotope('layout');
			});

			return this;
		},

		createLoader: function() {
			var self = this;

			var loaderTemplate = [
				'<div class="bounce-loader">',
					'<div class="bounce1"></div>',
					'<div class="bounce2"></div>',
					'<div class="bounce3"></div>',
				'</div>'
			].join('');

			self.$loader.append(loaderTemplate);

			return this;
		},

		removeLoader: function() {

			var self = this;

			if (self.$loader) {

				self.$loader.removeClass('masonry-loader-showing');

				setTimeout(function() {
					self.$loader.addClass('masonry-loader-loaded');
				}, 300);

			}

		}
	};

	// expose to scope
	$.extend(theme, {
		PluginMasonry: PluginMasonry
	});

	// jquery plugin
	$.fn.themePluginMasonry = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginMasonry($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Match Height
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__matchHeight';

	var PluginMatchHeight = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginMatchHeight.defaults = {
		byRow: true,
		property: 'height',
		target: null,
		remove: false
	};

	PluginMatchHeight.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginMatchHeight.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.matchHeight))) {
				return this;
			}

			var self = this;

			self.options.wrapper.matchHeight(self.options);

			return this;
		}

	};

	// expose to scope
	$.extend(theme, {
		PluginMatchHeight: PluginMatchHeight
	});

	// jquery plugin
	$.fn.themePluginMatchHeight = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginMatchHeight($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Parallax
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__parallax';

	var PluginParallax = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginParallax.defaults = {
		speed: 1.5,
		horizontalPosition: '50%',
		offset: 0,
		responsiveOffset: false,
		parallaxHeight: '180%'
	};

	PluginParallax.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginParallax.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			var self = this,
				$window = $(window),
				offset,
				optOffset,
				yPos,
				plxPos,
				bgpos,
				background;

			// Create Parallax Element
			background = $('<div class="parallax-background"></div>');

			// Set Style for Parallax Element
			background.css({
				'background-image' : 'url(' + self.options.wrapper.data('image-src') + ')',
				'background-size' : 'cover',
				'background-position' : 'center',
				'position' : 'absolute',
				'top' : 0,
				'left' : 0,
				'width' : '100%',
				'height' : (!$.browser.mobile) ? self.options.parallaxHeight : '100%'
			});

			// Add Parallax Element on DOM
			self.options.wrapper.prepend(background);

			// Set Overlfow Hidden / Position Relative / Min height to Parallax Wrapper
			self.options.wrapper.css({
				'position' : 'relative',
				'overflow' : 'hidden',
				'min-height': (self.options.minHeight) ? self.options.minHeight : ''
			});

			// Parallax Effect on Scroll & Resize
			var parallaxEffectOnScrolResize = function() {
				// Offset
				optOffset = self.options.offset;

				$window.on('scroll resize', function() {
					
					// Responsive Offset
					if( self.options.responsiveOffset ) {
						var window_w = $window.width(),
							responsiveOffset = self.options.responsiveOffset;

						if( responsiveOffset.constructor === Array ) {
							if( window_w > 1199 ) {
								optOffset = responsiveOffset[2];
							} else if( window_w > 991 ) {
								optOffset = responsiveOffset[1];
							} else if( window_w > 767 ) {
								optOffset = responsiveOffset[0];
							}
						}
					}

					offset  = self.options.wrapper.offset();
					yPos    = -($window.scrollTop() - (offset.top - 100)) / ((self.options.speed + 2 ));
					plxPos  = (yPos < 0) ? Math.abs(yPos) : -Math.abs(yPos);
					background.css({
						'transform' : 'translate3d(0, '+ ( (plxPos - 50) + (optOffset) ) +'px, 0)',
						'background-position-x' : self.options.horizontalPosition
					});
					
				});

				$window.trigger('scroll');
			}

			if (!$.browser.mobile) {
				parallaxEffectOnScrolResize();
			} else {
				if( self.options.enableOnMobile == true ) {
					parallaxEffectOnScrolResize();
				} else {
					self.options.wrapper.addClass('parallax-disabled');
				}
			}

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginParallax: PluginParallax
	});

	// jquery plugin
	$.fn.themePluginParallax = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginParallax($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Progress Bar
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__progressBar';

	var PluginProgressBar = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginProgressBar.defaults = {
		accX: 0,
		accY: -50,
		delay: 1
	};

	PluginProgressBar.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginProgressBar.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.appear))) {
				return this;
			}

			var self = this,
				$el = this.options.wrapper,
				delay = 1;

			$el.appear(function() {

				delay = ($el.attr('data-appear-animation-delay') ? $el.attr('data-appear-animation-delay') : self.options.delay);

				$el.addClass($el.attr('data-appear-animation'));

				setTimeout(function() {

					$el.animate({
						width: $el.attr('data-appear-progress-animation')
					}, 1500, 'easeOutQuad', function() {
						$el.find('.progress-bar-tooltip').animate({
							opacity: 1
						}, 500, 'easeOutQuad');
					});

				}, delay);

			}, {
				accX: self.options.accX,
				accY: self.options.accY
			});

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginProgressBar: PluginProgressBar
	});

	// jquery plugin
	$.fn.themePluginProgressBar = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginProgressBar($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Rmove Min Height Adter Load
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__removeMinHeight';

	var PluginRemoveMinHeight = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginRemoveMinHeight.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		build: function() {
			var self = this;

			$(window).on('load', function(){
				self.$el.css('min-height', 0);
			});

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginRemoveMinHeight: PluginRemoveMinHeight
	});

	// jquery plugin
	$.fn.themePluginRemoveMinHeight = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginRemoveMinHeight($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Revolution Slider
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__revolution';

	var PluginRevolutionSlider = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginRevolutionSlider.defaults = {
		sliderType: 'standard',
		sliderLayout: 'fullwidth',
		delay: 9000,
		gridwidth: 1170,
		gridheight: 500,
		spinner: 'spinner3',
		disableProgressBar: 'on',
		parallax: {
			type: 'off',
			bgparallax: 'off'
		},
		navigation: {
			keyboardNavigation: 'off',
			keyboard_direction: 'horizontal',
			mouseScrollNavigation: 'off',
			onHoverStop: 'off',
			touch: {
				touchenabled: 'on',
				swipe_threshold: 75,
				swipe_min_touches: 1,
				swipe_direction: 'horizontal',
				drag_block_vertical: false
			},
			arrows: {
				enable: true,
				hide_onmobile: false,
				hide_under: 0,
				hide_onleave: true,
				hide_delay: 200,
				hide_delay_mobile: 1200,
				left: {
					h_align: 'left',
					v_align: 'center',
					h_offset: 30,
					v_offset: 0
				},
				right: {
					h_align: 'right',
					v_align: 'center',
					h_offset: 30,
					v_offset: 0
				}
			}
		}
	};

	PluginRevolutionSlider.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build()
				.events();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginRevolutionSlider.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.revolution))) {
				return this;
			}

			// Single Slider Class
			if(this.options.wrapper.find('> ul > li').length == 1) {
				this.options.wrapper.addClass('slider-single-slide');
			}

			this.options.wrapper.revolution(this.options);

			return this;
		},

		events: function() {

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginRevolutionSlider: PluginRevolutionSlider
	});

	// jquery plugin
	$.fn.themePluginRevolutionSlider = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginRevolutionSlider($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Scroll to Top
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var initialized = false;

	$.extend(theme, {

		PluginScrollToTop: {

			defaults: {
				wrapper: $('body'),
				offset: 150,
				buttonClass: 'scroll-to-top',
				iconClass: 'fas fa-chevron-up',
				delay: 1000,
				visibleMobile: false,
				label: false,
				easing: 'easeOutBack'
			},

			initialize: function(opts) {
				initialized = true;

				this
					.setOptions(opts)
					.build()
					.events();

				return this;
			},

			setOptions: function(opts) {
				this.options = $.extend(true, {}, this.defaults, opts);

				return this;
			},

			build: function() {
				var self = this,
					$el;

				// Base HTML Markup
				$el = $('<a />')
					.addClass(self.options.buttonClass)
					.attr({
						'href': '#',
					})
					.append(
						$('<i />')
						.addClass(self.options.iconClass)
				);

				// Visible Mobile
				if (!self.options.visibleMobile) {
					$el.addClass('hidden-mobile');
				}

				// Label
				if (self.options.label) {
					$el.append(
						$('<span />').html(self.options.label)
					);
				}

				this.options.wrapper.append($el);

				this.$el = $el;

				return this;
			},

			events: function() {
				var self = this,
					_isScrolling = false;

				// Click Element Action
				self.$el.on('click', function(e) {
					e.preventDefault();
					$('body, html').animate({
						scrollTop: 0
					}, self.options.delay, self.options.easing);
					return false;
				});

				// Show/Hide Button on Window Scroll event.
				$(window).scroll(function() {

					if (!_isScrolling) {

						_isScrolling = true;

						if ($(window).scrollTop() > self.options.offset) {

							self.$el.stop(true, true).addClass('visible');
							_isScrolling = false;

						} else {

							self.$el.stop(true, true).removeClass('visible');
							_isScrolling = false;

						}

					}

				});

				return this;
			}

		}

	});

}).apply(this, [window.theme, jQuery]);

// Counter
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__sliderRange';

	var PluginSliderRange = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginSliderRange.defaults = {
		start: [ 50, 250 ],
		connect: true,
		step: 1,
		range: {
			min: 0,
			max: 300
		}
	};

	PluginSliderRange.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginSliderRange.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.countTo))) {
				return this;
			}

			var self = this,
				$el = this.options.wrapper,
				priceLow = $('.price-range-low'),
				priceHigh = $('.price-range-high'),
				hiddenPriceLow = $('.hidden-price-range-low'),
				hiddenPriceHigh = $('.hidden-price-range-high');

			// Create Slider
			noUiSlider.create($el[0], {
				start: [ 50, 250 ],
				connect: true,
				step: 1,
				range: {
					'min': 0,
					'max': 300
				}
			});

			// Update Input values
			$el[0].noUiSlider.on('update', function( values, handle ) {
				var value = values[handle];

				if ( handle ) {
					priceHigh.text(Math.round(value));
					hiddenPriceHigh.val(Math.round(value));
				} else {
					priceLow.text(Math.round(value));
					hiddenPriceLow.val(Math.round(value));
				}
			});

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginSliderRange: PluginSliderRange
	});

	// jquery plugin
	$.fn.themePluginSliderRange = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginSliderRange($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Sort
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__sort';

	var PluginSort = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginSort.defaults = {
		useHash: true,
		itemSelector: '.isotope-item',
		layoutMode: 'masonry',
		filter: '*',
		hiddenStyle: {
			opacity: 0
		},
		visibleStyle: {
			opacity: 1
		},
		stagger: 30,
		isOriginLeft: ($('html').attr('dir') == 'rtl' ? false : true)
	};

	PluginSort.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginSort.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.isotope))) {
				return this;
			}

			var self = this,
				$source = this.options.wrapper,
				$destination = $('.sort-destination[data-sort-id="' + $source.attr('data-sort-id') + '"]'),
				$window = $(window);

			if ($destination.get(0)) {

				self.$source = $source;
				self.$destination = $destination;
				self.$loader = false;

				self.setParagraphHeight($destination);

				if (self.$destination.parents('.sort-destination-loader').get(0)) {
					self.$loader = self.$destination.parents('.sort-destination-loader');
					self.createLoader();
				}

				$destination.attr('data-filter', '*');

				$destination.one('layoutComplete', function(event, laidOutItems) {
					self.removeLoader();
				});

				$destination.waitForImages(function() {
					$destination.isotope(self.options);
					self.events();
				});

				setTimeout(function() {
					self.removeLoader();
				}, 3000);

			}

			return this;
		},

		events: function() {
			var self = this,
				filter = null,
				$window = $(window);

			self.$source.find('a').on('click', function(e) {
				e.preventDefault();

				filter = $(this).parent().data('option-value');

				self.setFilter(filter);

				if (e.originalEvent) {
					self.$source.trigger('filtered');
				}

				return this;
			});

			self.$destination.trigger('filtered');
			self.$source.trigger('filtered');

			if (self.options.useHash) {
				self.hashEvents();
			}

			$window.on('resize', function() {
				setTimeout(function() {
					self.$destination.isotope('layout');
				}, 300);
			});

			setTimeout(function() {
				$window.trigger('resize');
			}, 300);

			return this;
		},

		setFilter: function(filter) {
			var self = this,
				page = false,
				currentFilter = filter;

			self.$source.find('.nav-link.active').removeClass('active');
			self.$source.find('li[data-option-value="' + filter + '"] .nav-link').addClass('active');

			self.options.filter = currentFilter;

			if (self.$destination.attr('data-current-page')) {
				currentFilter = currentFilter + '[data-page-rel=' + self.$destination.attr('data-current-page') + ']';
			}

			self.$destination.attr('data-filter', filter).isotope({
				filter: currentFilter
			}).one('arrangeComplete', function( event, filteredItems ) {
				
				if (self.options.useHash) {
					if (window.location.hash != '' || self.options.filter.replace('.', '') != '*') {
						window.location.hash = self.options.filter.replace('.', '');
					}
				}
				
				$(window).trigger('scroll');

			}).trigger('filtered');

			return this;
		},

		hashEvents: function() {
			var self = this,
				hash = null,
				hashFilter = null,
				initHashFilter = '.' + location.hash.replace('#', '');

			if (initHashFilter != '.' && initHashFilter != '.*') {
				self.setFilter(initHashFilter);
			}

			$(window).on('hashchange', function(e) {

				hashFilter = '.' + location.hash.replace('#', '');
				hash = (hashFilter == '.' || hashFilter == '.*' ? '*' : hashFilter);

				self.setFilter(hash);

			});

			return this;
		},

		setParagraphHeight: function() {
			var self = this,
				minParagraphHeight = 0,
				paragraphs = $('span.image-frame-caption p', self.$destination);

			paragraphs.each(function() {
				if ($(this).height() > minParagraphHeight) {
					minParagraphHeight = ($(this).height() + 10);
				}
			});

			paragraphs.height(minParagraphHeight);

			return this;
		},

		createLoader: function() {
			var self = this;

			var loaderTemplate = [
				'<div class="bounce-loader">',
					'<div class="bounce1"></div>',
					'<div class="bounce2"></div>',
					'<div class="bounce3"></div>',
				'</div>'
			].join('');

			self.$loader.append(loaderTemplate);

			return this;
		},

		removeLoader: function() {

			var self = this;

			if (self.$loader) {

				self.$loader.removeClass('sort-destination-loader-showing');

				setTimeout(function() {
					self.$loader.addClass('sort-destination-loader-loaded');
				}, 300);

			}

		}

	};

	// expose to scope
	$.extend(theme, {
		PluginSort: PluginSort
	});

	// jquery plugin
	$.fn.themePluginSort = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginSort($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Steps
(function(theme, $) {
	
	'use strict';
	
	theme = theme || {};
	
	var instanceName = '__steps';

	var PluginSteps = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginSteps.defaults = {
		delay: 7000,
		animDelay: 300,
		hideDotsOnBack: true
	};

	PluginSteps.prototype = {
		initialize: function($el, opts) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginSteps.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			var self = this,
				$el = this.options.wrapper,
				$item = $el.find('.item'),
				$window = $(window);

			// Set first item active class on page load
			if( !$el.find('.item.active').get(0) ) {
				$el.find('.item').eq(0).addClass('active');
			}

			var start = function(firstTime) {				
				var activeItem = $el.find('.item.active'),
					firstItem  = $el.find('.item').eq(0),
					nextItem   = ( activeItem.next().length == 0 ) ? firstItem : activeItem.next(),
					nextItem2  = ( nextItem.next().length == 0 ) ? firstItem : nextItem.next(),
					isLastItem = $el.find('.item').length - 1 == activeItem.index(),
					darkDots   = $el.find('.dots-color-dark'),
					darkDotsLeft = ( !firstTime ) ? parseFloat( nextItem2.css('left') ) / nextItem2.parent().width() * 100 : parseFloat( nextItem.css('left') ) / nextItem.parent().width() * 100,
					darkDotsWidth = 140,
					darkDotsTransitionDuration = self.options.delay - 1000;

				// If mobile
				if( $window.width() < 992 ) {
					darkDotsLeft = ( !firstTime ) ? parseFloat( nextItem2.css('top') ) / nextItem2.parent().height() * 100 : parseFloat( nextItem.css('top') ) / nextItem.parent().height() * 100;
				}

				// If not is the first time
				if( !firstTime ) {
					$('.item').removeClass('active');
					nextItem.addClass('active');
				}

				// Set dark dots transition duration
				darkDots.css({
					transition: 'linear left '+ darkDotsTransitionDuration +'ms'
				});

				// Check and set the value of left position for dark dots
				if( darkDotsLeft == 50 ) {
					darkDotsLeft = 50+'%';
				} else if( darkDotsLeft > 50 ) {
					darkDotsLeft = (darkDotsLeft + 20)+'%';
				} else {
					darkDotsLeft = (darkDotsLeft - 20)+'%';
				}

				// Set width and left position for dark dots
				darkDots.css({
					width: darkDotsWidth,
					left: darkDotsLeft,
					opacity: 1
				});

				// Hide dots when back
				if( isLastItem && self.options.hideDotsOnBack ) {
					darkDots.css({
						opacity: 0
					});
				}

				// Remove active border color from current item
				setTimeout(function(){
					nextItem.css({
						'border-color': $el.find('.dots-color').css('background-color')
					});
				}, (isLastItem) ? self.options.delay : self.options.delay );

				// Check if is first time
				if( !firstTime ) {
					
					// Set active border color for next item
					setTimeout(function(){
						nextItem2.css({
							'border-color': $el.find('.dots-color-dark').css('background-color')
						});
					}, self.options.delay);

					// Link Elements
					if( nextItem.data('link-to') ) {
						var link_to = nextItem.data('link-to');

						$('[data-link-id]').addClass('steps-shadow active');
						$('[data-link-id="'+ link_to +'"]').removeClass('active');
					}

				} else {
					
					// Remove active border color from first item
					setTimeout(function(){
						firstItem.css({
							'border-color': $el.find('.dots-color').css('background-color')
						});
					}, self.options.delay );

					// Set active border color for next item
					setTimeout(function(){
						nextItem.css({
							'border-color': $el.find('.dots-color-dark').css('background-color')
						});
					}, self.options.delay);

					// Link Elements
					if( firstItem.data('link-to') ) {
						var link_to = firstItem.data('link-to');

						$('[data-link-id]').addClass('steps-shadow active');
						$('[data-link-id="'+ link_to +'"]').removeClass('active');
					}
				
				}

							
			}

			var initialized = false;
			$window.on('scroll', function(){
				if( $el.visible( true ) && initialized == false ) {
					// Pevent to initialize again
					initialized = true;

					// Execute start() only one time (first time)
					start(true);

					// Execute start() every defined delay time
					setInterval(function(){
						start();
					}, self.options.delay);
				}
			});
			
			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginSteps: PluginSteps
	});

	// jquery plugin
	$.fn.themePluginSteps = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginSteps($this, opts);
			}
			
		});
	}

}).apply(this, [ window.theme, jQuery ]);

// Sticky
(function(theme, $) {
	
	'use strict';
	
	theme = theme || {};
	
	var instanceName = '__sticky';

	var PluginSticky = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginSticky.defaults = {
		
	};

	PluginSticky.prototype = {
		initialize: function($el, opts) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build()
				.events();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginSticky.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			var self = this,
				$window = $(window),
				$html = $('html');
			
			if( !$.browser.mobile && !self.options.stickyStartAt ) {
				self.options.wrapper.stick_in_parent(self.options);
			}

			if( self.options.stickyStartAt ) {
				var $stickyWrapper = self.options.wrapper,
					$stickyBody     = self.options.wrapper.find('.sticky-body');

				// Set Sticky Wrapper Height
				$stickyWrapper.css({
					height: $stickyWrapper.outerHeight()
				});

				// Change Logo Src
				if( $stickyWrapper.find('img').attr('data-change-src') ) {
					var $logo      = $stickyWrapper.find('img'),
						logoSrc    = $logo.attr('src'),
						logoNewSrc = $logo.attr('data-change-src');

					self.changeLogoSrc = function(activate) {
						if(activate) {
							$logo.attr('src', logoNewSrc);
						} else {
							$logo.attr('src', logoSrc);
						}
					}
				}
			}
			
			return this;
		},
		events: function() {
			var self = this,
				$window = $(window),
				$html = $('html'),
				$logo = self.options.wrapper.find('img');

			$window.on('scroll', function(){

				if( self.options.stickyStartAt < $window.scrollTop() ) {
					$html.addClass('sticky-wrapper-active');
					
					if( $logo.attr('data-change-src') ) {
						self.changeLogoSrc(true);
					}
				} else {
					$html.removeClass('sticky-wrapper-active');
					
					if( $logo.attr('data-change-src') ) {
						self.changeLogoSrc(false);
					}
				}

			});
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginSticky: PluginSticky
	});

	// jquery plugin
	$.fn.themePluginSticky = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginSticky($this, opts);
			}
			
		});
	}

}).apply(this, [ window.theme, jQuery ]);

// Toggle
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__toggle';

	var PluginToggle = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginToggle.defaults = {
		duration: 350,
		isAccordion: false
	};

	PluginToggle.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginToggle.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			var self = this,
				$wrapper = this.options.wrapper,
				$items = $wrapper.find('.toggle'),
				$el = null;

			$items.each(function() {
				$el = $(this);

				if ($el.hasClass('active')) {
					$el.find('> p').addClass('preview-active');
					$el.find('> .toggle-content').slideDown(self.options.duration);
				}

				self.events($el);
			});

			if (self.options.isAccordion) {
				self.options.duration = self.options.duration / 2;
			}

			return this;
		},

		events: function($el) {
			var self = this,
				previewParCurrentHeight = 0,
				previewParAnimateHeight = 0,
				toggleContent = null;

			$el.find('> label').on('click', function(e) {

				var $this = $(this),
					parentSection = $this.parent(),
					parentWrapper = $this.parents('.toggle'),
					previewPar = null,
					closeElement = null;

				if (self.options.isAccordion && typeof(e.originalEvent) != 'undefined') {
					closeElement = parentWrapper.find('.toggle.active > label');

					if (closeElement[0] == $this[0]) {
						return;
					}
				}

				parentSection.toggleClass('active');

				// Preview Paragraph
				if (parentSection.find('> p').get(0)) {

					previewPar = parentSection.find('> p');
					previewParCurrentHeight = previewPar.css('height');
					previewPar.css('height', 'auto');
					previewParAnimateHeight = previewPar.css('height');
					previewPar.css('height', previewParCurrentHeight);

				}

				// Content
				toggleContent = parentSection.find('> .toggle-content');

				if (parentSection.hasClass('active')) {

					$(previewPar).animate({
						height: previewParAnimateHeight
					}, self.options.duration, function() {
						$(this).addClass('preview-active');
					});

					toggleContent.slideDown(self.options.duration, function() {
						if (closeElement) {
							closeElement.trigger('click');
						}
					});

				} else {

					$(previewPar).animate({
						height: 0
					}, self.options.duration, function() {
						$(this).removeClass('preview-active');
					});

					toggleContent.slideUp(self.options.duration);

				}

			});
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginToggle: PluginToggle
	});

	// jquery plugin
	$.fn.themePluginToggle = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginToggle($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Tweets
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__tweets';

	var PluginTweets = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginTweets.defaults = {
		username: null,
		count: 2,
		URL: 'php/twitter-feed.php'
	};

	PluginTweets.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginTweets.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			if (this.options.username == null || this.options.username == '') {
				return this;
			}

			var self = this,
				$wrapper = this.options.wrapper;

			$.ajax({
				type: 'GET',
				data: {
					twitter_screen_name: self.options.username,
					tweets_to_display: self.options.count
				},
				url: self.options.URL,
			}).done(function(html) {
				$wrapper.html(html).find('a').attr('target','_blank');
			});

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginTweets: PluginTweets
	});

	// jquery plugin
	$.fn.themePluginTweets = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginTweets($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Validation
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var initialized = false;

	$.extend(theme, {

		PluginValidation: {

			defaults: {
				validator: {
					highlight: function(element) {
						$(element)
							.parent()
							.removeClass('has-success')
							.addClass('has-error');
					},
					success: function(element) {
						$(element)
							.parent()
							.removeClass('has-error')
							.addClass('has-success')
							.find('label.error')
							.remove();
					},
					errorPlacement: function(error, element) {
						if (element.attr('type') == 'radio' || element.attr('type') == 'checkbox') {
							error.appendTo(element.parent().parent());
						} else {
							error.insertAfter(element);
						}
					}
				},
				validateCaptchaURL: 'php/contact-form-verify-captcha.php',
				refreshCaptchaURL: 'php/contact-form-refresh-captcha.php'
			},

			initialize: function(opts) {
				initialized = true;

				this
					.setOptions(opts)
					.build();

				return this;
			},

			setOptions: function(opts) {
				this.options = $.extend(true, {}, this.defaults, opts);

				return this;
			},

			build: function() {
				var self = this;

				if (!($.isFunction($.validator))) {
					return this;
				}

				self.addMethods();
				self.setMessageGroups();

				$.validator.setDefaults(self.options.validator);

				return this;
			},

			addMethods: function() {
				var self = this;

				$.validator.addMethod('captcha', function(value, element, params) {
					var captchaValid = false;

					$.ajax({
						url: self.options.validateCaptchaURL,
						type: 'POST',
						async: false,
						dataType: 'json',
						data: {
							captcha: $.trim(value)
						},
						success: function(data) {
							if (data.response == 'success') {
								captchaValid = true;
							}
						}
					});

					if (captchaValid) {
						return true;
					}

				}, '');

				// Refresh Captcha
				$('#refreshCaptcha').on('click', function(e) {
					e.preventDefault();
					$.get(self.options.refreshCaptchaURL, function(url) {
						$('#captcha-image').attr('src', url);
					});					
				});

			},

			setMessageGroups: function() {

				$('.checkbox-group[data-msg-required], .radio-group[data-msg-required]').each(function() {
					var message = $(this).data('msg-required');
					$(this).find('input').attr('data-msg-required', message);
				});

			}

		}

	});

}).apply(this, [window.theme, jQuery]);

// Video Background
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__videobackground';

	var PluginVideoBackground = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginVideoBackground.defaults = {
		overlay: true,
		volume: 1,
		playbackRate: 1,
		muted: true,
		loop: true,
		autoplay: true,
		position: '50% 50%',
		posterType: 'detect',
		className: 'z-index-0'
	};

	PluginVideoBackground.prototype = {
		initialize: function($el, opts) {
			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginVideoBackground.defaults, opts, {
				path: this.$el.data('video-path'),
				wrapper: this.$el
			});

			return this;
		},

		build: function() {

			if (!($.isFunction($.fn.vide)) || (!this.options.path)) {
				return this;
			}

			if (this.options.overlay) {
				this.options.wrapper.prepend(
					$('<div />').addClass('video-overlay')
				);
			}

			this.options.wrapper.vide(this.options.path, this.options);

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginVideoBackground: PluginVideoBackground
	});

	// jquery plugin
	$.fn.themePluginVideoBackground = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginVideoBackground($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Account
(function(theme, $) {

	theme = theme || {};

	var initialized = false;

	$.extend(theme, {

		Account: {

			defaults: {
				wrapper: $('#headerAccount')
			},

			initialize: function($wrapper, opts) {
				if (initialized) {
					return this;
				}

				initialized = true;
				this.$wrapper = ($wrapper || this.defaults.wrapper);

				this
					.setOptions(opts)
					.events();

				return this;
			},

			setOptions: function(opts) {
				this.options = $.extend(true, {}, this.defaults, opts, theme.fn.getOptions(this.$wrapper.data('plugin-options')));

				return this;
			},

			events: function() {
				var self = this;

				self.$wrapper.find('input').on('focus', function() {
					self.$wrapper.addClass('open');

					$(document).mouseup(function(e) {
						if (!self.$wrapper.is(e.target) && self.$wrapper.has(e.target).length === 0) {
							self.$wrapper.removeClass('open');
						}
					});
				});

				$('#headerSignUp').on('click', function(e) {
					e.preventDefault();
					self.$wrapper.addClass('signup').removeClass('signin').removeClass('recover');
					self.$wrapper.find('.signup-form input:first').focus();
				});

				$('#headerSignIn').on('click', function(e) {
					e.preventDefault();
					self.$wrapper.addClass('signin').removeClass('signup').removeClass('recover');
					self.$wrapper.find('.signin-form input:first').focus();
				});

				$('#headerRecover').on('click', function(e) {
					e.preventDefault();
					self.$wrapper.addClass('recover').removeClass('signup').removeClass('signin');
					self.$wrapper.find('.recover-form input:first').focus();
				});

				$('#headerRecoverCancel').on('click', function(e) {
					e.preventDefault();
					self.$wrapper.addClass('signin').removeClass('signup').removeClass('recover');
					self.$wrapper.find('.signin-form input:first').focus();
				});
			}

		}

	});

}).apply(this, [window.theme, jQuery]);

// Nav
(function(theme, $) {

	theme = theme || {};

	var initialized = false;

	$.extend(theme, {

		Nav: {

			defaults: {
				wrapper: $('#mainNav'),
				scrollDelay: 600,
				scrollAnimation: 'easeOutQuad'
			},

			initialize: function($wrapper, opts) {
				if (initialized) {
					return this;
				}

				initialized = true;
				this.$wrapper = ($wrapper || this.defaults.wrapper);

				this
					.setOptions(opts)
					.build()
					.events();

				return this;
			},

			setOptions: function(opts) {
				this.options = $.extend(true, {}, this.defaults, opts, theme.fn.getOptions(this.$wrapper.data('plugin-options')));

				return this;
			},

			build: function() {
				var self = this,
					$html = $('html'),
					$header = $('#header'),
					thumbInfoPreview;

				// Add Arrows
				$header.find('.dropdown-toggle, .dropdown-submenu > a').append($('<i />').addClass('menu-arrow'));

				// Side Header
				if( $html.hasClass('side-header') || $html.hasClass('side-header-overlay-full-screen') ) {
					
					// Nano Scroll
					$('.nano').nanoScroller({
						alwaysVisible: true
					});
				}

				// Reverse
				self.checkReverse = function() {

					self.$wrapper.find('.dropdown-submenu').removeClass('dropdown-reverse');

					self.$wrapper.find('.dropdown-submenu:not(.manual)').each(function() {
						if(!$(this).find('.dropdown-menu').visible( false, true, 'horizontal' )  ) {
							$(this).addClass('dropdown-reverse');
						}
					});
				}

				if( !$html.hasClass('side-header') && !$html.hasClass('side-header-overlay-full-screen') ) {
					self.checkReverse();

	 				$(window).on('resize', function() {
						self.checkReverse();
	 				});
				}

				return this;
			},

			events: function() {
				var self    = this,
					$html   = $('html'),
					$header = $('#header'),
					$window = $(window),
					headerBodyHeight = $('.header-body').outerHeight();

				$header.find('a[href="#"]').on('click', function(e) {
					e.preventDefault();
				});

				// Mobile Arrows
				$header.find('.dropdown-toggle[href="#"], .dropdown-submenu a[href="#"], .dropdown-toggle[href!="#"] .menu-arrow, .dropdown-submenu a[href!="#"] .menu-arrow').on('click', function(e) {
					e.preventDefault();
					if ($window.width() < 992 || $html.hasClass('side-header') || $html.hasClass('side-header-overlay-full-screen')) {
						if( $(this).closest('li').hasClass('opened') ) {
							$(this).closest('li').find('> .dropdown-menu').slideUp(600, function(){
								$(this).closest('li').removeClass('opened');

								// Refresh Nano Scroll
								if( $html.hasClass('side-header') || $html.hasClass('side-header-overlay-full-screen') ) {
									$('.nano').nanoScroller();
								}
								
							});
						} else {
							$(this).closest('li').addClass('opened');
							$(this).closest('li').find('> .dropdown-menu').slideDown(600, function(){
								
								// Refresh Nano Scroll
								if( $html.hasClass('side-header') || $html.hasClass('side-header-overlay-full-screen') ) {
									$('.nano').nanoScroller();
								}
								
							});
						}
					}
				});

				// Touch Devices with normal resolutions
				if('ontouchstart' in document.documentElement) {
					$header.find('.dropdown-toggle:not([href="#"]), .dropdown-submenu > a:not([href="#"])')
						.on('touchstart click', function(e) {
							if($window.width() > 991) {

								e.stopPropagation();
								e.preventDefault();

								if(e.handled !== true) {

									var li = $(this).closest('li');

									if(li.hasClass('tapped')) {
										location.href = $(this).attr('href');
									}

									li.addClass('tapped');

									e.handled = true;
								} else {
									return false;
								}

								return false;

							}
						})
						.on('blur', function(e) {
							$(this).closest('li').removeClass('tapped');
						});

				}

				// Collapse Nav
				$header.find('[data-collapse-nav]').on('click', function(e) {
					$(this).parents('.collapse').removeClass('in');
				});

				// Mobile Menu Button
				var mobileMenuBtn = $('.header-btn-collapse-nav'),
					flagMenu = true;
				
				mobileMenuBtn.on('click', function(){
					if( flagMenu ) {
						$(this).toggleClass('active');
						$html.addClass('mobile-menu-opened');
					}
					flagMenu = false;
				});

				$('.header-nav-main nav').on('show.bs.collapse hide.bs.collapse', function (e) {
				    if( e.type == 'hide' ) {
					    $html.removeClass('mobile-menu-opened');
					    $(this).addClass('closed');
				    }
				    if( e.type == 'show' ) {
					    $(this).removeClass('closed');
				    }
				    flagMenu = true;
				});

				// Anchors Position
				$('[data-hash]').each(function() {

					var target    = ($(this).attr('href') != '#') ? $(this).attr('href') : '',
						offset    = ($(this).is("[data-hash-offset]") ? $(this).data('hash-offset') : 0),
						highlight = ($(this).is("[data-hash-highlight]") ? true : false);

					if($(target).get(0)) {
						$(this).on('click', function(e) {
							e.preventDefault();

							if( $window.width() < 992 ) {
								if( !$(e.target).is('i') ) {

									// Close Collapse if Opened
									$(this).parents('.collapse.show').collapse('hide');

									// Change state of mobile menu button
									$('.header-btn-collapse-nav').removeClass('active')

									// Scroll to target
									self.scrollToTarget(target, offset, highlight);
									
								}
							} else {
								// Scroll to target
								self.scrollToTarget(target, offset, highlight);
							}

							return;
						});
					}

				});

				// Side Header Nano Scroll On Resize
				if( $html.hasClass('side-header') ) {
					$window.on('resize', function(){
						if( $window.width() < 992 ) {
							$('.nano').nanoScroller({ destroy: true });
							$header.find('.header-nav').removeClass('nano');
						} else {
							$header.find('.header-nav').addClass('nano');
							$('.nano').nanoScroller();
						}
					});
				}

				// Side Header Toggle
				if( $html.hasClass('side-header-from-out') || $html.hasClass('side-header-overlay-full-screen') ) {
					$('.side-header-btn-toggle').on('click', function(){
						$header.toggleClass('side-header-show');
						
						if( $html.hasClass('side-header-overlay-full-screen') ) {
							$html.find('body').addClass('no-vertical-scroll');
						}
						return false;
					});

					$('.side-header-btn-close').on('click', function(){
						$header.removeClass('side-header-show');
						
						if( $html.hasClass('side-header-overlay-full-screen') ) {
							$html.find('body').removeClass('no-vertical-scroll');
						}
						return false;
					});
				}

				// Header Search Expanded
				var searchBtn  = $header.find('.header-search-button'),
					searchExpanded = $header.find('.header-search-expanded');
				
				if( searchExpanded ) {
					searchBtn.on('click', function(){
						$html.toggleClass('header-search-expanded-active');
					});
					
					$(document).mouseup(function(e) {
						if (!searchExpanded.is(e.target) && searchExpanded.has(e.target).length === 0) {
							$html.removeClass('header-search-expanded-active');
						}
					});
				}

				return this;
			},

			scrollToTarget: function(target, offset, highlight) {
				var self = this;

				$('body').addClass('scrolling');

				$('html, body').animate({
					scrollTop: $(target).offset().top - offset
				}, self.options.scrollDelay, self.options.scrollAnimation, function() {
					
					if( highlight ) {
						$(target).addClass('highlight-anim');

						setTimeout(function(){
							$(target).removeClass('highlight-anim');
						}, 1200);
					}

					$('body').removeClass('scrolling');
				});

				return this;

			}

		}

	});

}).apply(this, [window.theme, jQuery]);


// Newsletter
(function(theme, $) {

	theme = theme || {};

	var initialized = false;

	$.extend(theme, {

		Newsletter: {

			defaults: {
				wrapper: $('.newsletter-form')
			},

			initialize: function($wrapper, opts) {
				if (initialized) {
					return this;
				}

				initialized = true;
				this.$wrapper = ($wrapper || this.defaults.wrapper);

				this
					.setOptions(opts)
					.build();

				return this;
			},

			setOptions: function(opts) {
				this.options = $.extend(true, {}, this.defaults, opts, theme.fn.getOptions(this.$wrapper.data('plugin-options')));

				return this;
			},

			build: function() {
				if (!($.isFunction($.fn.validate))) {
					return this;
				}

				var self = this;

				self.$wrapper.each(function(){

					var $wrapper = $(this),
					    $email = $wrapper.find('.newsletter-email'),
						$success = $wrapper.find('.newsletter-form-success'),
						$error = $wrapper.find('.newsletter-form-error');

					$wrapper.validate({
						submitHandler: function(form) {

							$.ajax({
								type: 'POST',
								url: $wrapper.attr('action'),
								data: {
									'email': $email.val()
								},
								dataType: 'json'
							}).always(function(data, textStatus, jqXHR) {

								if (data.response == 'success') {
									$success.removeClass('d-none');
									$error.addClass('d-none');

									$email
										.val('')
										.blur();

									$wrapper.find('label.error').remove();

									// Uncomment the code below if want hide the Success message after a time
									// setTimeout(function(){
									// 	$success.addClass('d-none');
									// }, 5000);

									return;

								} else {
									$error.html(data.message);
									$error.removeClass('d-none');
									$success.addClass('d-none');

									$email
										.blur();

									$wrapper.find('label.error').remove();

									return;
								}

								$error.removeClass('d-none');
								$success.addClass('d-none');

								$wrapper.find('.has-success')
									.removeClass('has-success');
									
							});

						},
						rules: {
							newsletterEmail: {
								required: true,
								email: true
							}
						},
						errorPlacement: function(error, element) {
							if( !element.next().hasClass('input-group') ) {
								element.closest('.newsletter-form').append(error);
							} else {
								error.insertAfter(element.parent());
							}
						}
					});

				});

				return this;
			}

		}

	});

}).apply(this, [window.theme, jQuery]);

// Search
(function(theme, $) {

	theme = theme || {};

	var initialized = false;

	$.extend(theme, {

		Search: {

			defaults: {
				wrapper: $('#searchForm')
			},

			initialize: function($wrapper, opts) {
				if (initialized) {
					return this;
				}

				initialized = true;
				this.$wrapper = ($wrapper || this.defaults.wrapper);

				this
					.setOptions(opts)
					.build();

				return this;
			},

			setOptions: function(opts) {
				this.options = $.extend(true, {}, this.defaults, opts, theme.fn.getOptions(this.$wrapper.data('plugin-options')));

				return this;
			},

			build: function() {
				if (!($.isFunction($.fn.validate))) {
					return this;
				}

				this.$wrapper.validate({
					errorPlacement: function(error, element) {}
				});

				return this;
			}

		}

	});

}).apply(this, [window.theme, jQuery]);

// Sticky Header
(function(theme, $) {

	theme = theme || {};

	var initialized = false;

	$.extend(theme, {

		StickyHeader: {

			defaults: {
				wrapper: $('#header'),
				headerBody: $('#header .header-body'),
				stickyEnabled: true,
				stickyEnableOnBoxed: true,
				stickyEnableOnMobile: true,
				stickyStartAt: 0,
				stickyStartAtElement: false,
				stickySetTop: 0,
				stickyHeaderContainerHeight: false,
				stickyChangeLogo: false
			},

			initialize: function($wrapper, opts) {
				if (initialized) {
					return this;
				}

				initialized = true;
				this.$wrapper = ($wrapper || this.defaults.wrapper);

				this
					.setOptions(opts)
					.build()
					.events();

				return this;
			},

			setOptions: function(opts) {
				this.options = $.extend(true, {}, this.defaults, opts, theme.fn.getOptions(this.$wrapper.data('plugin-options')));

				return this;
			},

			build: function() {
				if (!this.options.stickyEnableOnBoxed && $('html').hasClass('boxed') || !this.options.stickyEnabled) {
					return this;
				}

				var self = this,
					$html = $('html'),
					$window = $(window),
					sideHeader = $html.hasClass('side-header'),
					initialHeaderTopHeight = self.options.wrapper.find('.header-top').outerHeight(),
					initialHeaderContainerHeight = self.options.wrapper.find('.header-container').outerHeight(),
					minHeight;

				// HTML Classes
				$html.addClass('sticky-header-enabled');

				if (parseInt(self.options.stickySetTop) < 0) {
					$html.addClass('sticky-header-negative');
				}

				// Set Start At
				if(self.options.stickyStartAtElement) {

					var $stickyStartAtElement = $(self.options.stickyStartAtElement);

					$(window).on('scroll resize', function() {
						self.options.stickyStartAt = $stickyStartAtElement.offset().top;
					});

					$(window).trigger('resize');
				}

				// Boxed
				if($html.hasClass('boxed') && (parseInt(self.options.stickyStartAt) == 0) && $window.width() > 991) {
					self.options.stickyStartAt = 30;
				}

				// Define Min Height value
				if( self.options.wrapper.find('.header-top').get(0) ) {
					minHeight = ( initialHeaderTopHeight + initialHeaderContainerHeight );
				} else {
					minHeight = initialHeaderContainerHeight;
				}

				// Set header Body Position When Always Sticky
				if( self.options.stickyStartAt == 0 ) {
					self.options.headerBody.css('position','fixed');
				}

				// Two Logos Effect
				if( self.options.wrapper.find('.header-logo img').length > 1 ) {
					self.options.wrapper.find('.header-logo .logo-2').removeClass('d-none');
				}

				// Set Wrapper Min Height
				$window.on('stickyHeader.activate stickyHeader.deactivate', function(){
					self.options.wrapper.css('min-height', minHeight);
				});

				// Sticky Header Container Height
				if( self.options.stickyHeaderContainerHeight ) {
					self.options.wrapper.find('.header-container').css('height', self.options.wrapper.find('.header-container').outerHeight());
				}

				// Check Sticky Header
				self.checkStickyHeader = function() {
					if ($window.scrollTop() >= parseInt(self.options.stickyStartAt)) {
						self.activateStickyHeader();
					} else {
						self.deactivateStickyHeader();
					}
				};
				
				// Activate Sticky Header
				self.activateStickyHeader = function() {

					if ($window.width() < 992) {
						if (!self.options.stickyEnableOnMobile) {
							self.deactivateStickyHeader();
							return;
						}
					} else {
						if (sideHeader) {
							self.deactivateStickyHeader();
							return;
						}
					}

					$html.addClass('sticky-header-active');

					// Set Header Body Position Fixed and top value
					if( self.options.stickyStartAt ) {
						self.options.headerBody.css('position','fixed');
						self.options.headerBody.css('top', self.options.stickySetTop);	
					}

					// Sticky Effect - Shrink
					if( self.options.wrapper.hasClass('header-effect-shrink') ) {

						// If Header Top
						if( self.options.wrapper.find('.header-top').get(0) ) {
							self.options.wrapper.find('.header-top').css({
								height: 0,
								'min-height': 0,
								overflow: 'hidden'
							});
						}

						// Header Container
						if( self.options.stickyHeaderContainerHeight ) {
							self.options.wrapper.find('.header-container').css({
								height: self.options.stickyHeaderContainerHeight,
								'min-height': 0
							});
						} else {
							self.options.wrapper.find('.header-container').css({
								height: (initialHeaderContainerHeight / 3) * 2, // one third of container height
								'min-height': 0
							});
						}

					}

					// Two Logos Effect
					if( self.options.wrapper.find('.header-logo img').length > 1 ) {
						var logo1 = $('#header .header-logo .logo-1'),
							logo2 = $('#header .header-logo .logo-2');

						// First Logo
						logo1.parent().css('pointer-events','none');
						logo1.removeClass('active');

						// Second Logo
						logo2.addClass('active');

					}

					// Set Logo Size and Position
					if (self.options.stickyChangeLogo) {
						self.changeLogo(true);
					}

					// Change Logo Src
					if( self.options.wrapper.find('.header-logo img').attr('data-change-src') ) {
						self.changeLogoSrc(true);
					}

					$.event.trigger({
						type: 'stickyHeader.activate'
					});
				};

				// Deactivate Sticky Header
				self.deactivateStickyHeader = function() {

					$html.removeClass('sticky-header-active');

					self.options.headerBody.css('top', 0);

					// Set Logo Size and Position
					if (self.options.stickyChangeLogo) {
						self.changeLogo(false);
					}

					// Change Logo Src
					if( self.options.wrapper.find('.header-logo img').attr('data-change-src') ) {
						self.changeLogoSrc(false);
					}

					// Reset Header Body Position
					self.options.headerBody.css('position', 'static');

					// Sticky Effect - Shrink
					if( self.options.wrapper.hasClass('header-effect-shrink') ) {

						// Boxed Layout
						if( $html.hasClass('boxed') ) {

							// Set Header Body Position Absolute
							self.options.headerBody.css('position','absolute');

							if( $window.scrollTop() > $('.body').offset().top ) {
								// Set Header Body Position Fixed
								self.options.headerBody.css('position','fixed');								
							}

						} else {
							// Set Header Body Position Fixed
							self.options.headerBody.css('position','fixed');
						}

						// If Header Top
						if( self.options.wrapper.find('.header-top').get(0) ) {
							self.options.wrapper.find('.header-top').css({
								height: initialHeaderTopHeight,
								overflow: 'visible'
							});
						}

						// Header Container
						self.options.wrapper.find('.header-container').css({
							height: initialHeaderContainerHeight
						});

					}

					// Two Logos Effect
					if( self.options.wrapper.find('.header-logo img').length > 1 ) {
						var logo1 = $('#header .header-logo .logo-1'),
							logo2 = $('#header .header-logo .logo-2');

						// First Logo
						logo1.parent().css('pointer-events','auto');
						logo1.addClass('active');

						// Second Logo
						logo2.removeClass('active');

					}

					$.event.trigger({
						type: 'stickyHeader.deactivate'
					});
				};

				// Always Sticky
				if (parseInt(self.options.stickyStartAt) <= 0) {
					self.activateStickyHeader();
				}

				// Set Logo Size and Position
				if (self.options.stickyChangeLogo) {

					var $logoWrapper = self.options.wrapper.find('.header-logo'),
						$logo = $logoWrapper.find('img'),
						logoWidth = $logo.attr('width'),
						logoHeight = $logo.attr('height'),
						logoSmallTop = parseInt($logo.attr('data-sticky-top') ? $logo.attr('data-sticky-top') : 0),
						logoSmallWidth = parseInt($logo.attr('data-sticky-width') ? $logo.attr('data-sticky-width') : 'auto'),
						logoSmallHeight = parseInt($logo.attr('data-sticky-height') ? $logo.attr('data-sticky-height') : 'auto');

					self.changeLogo = function(activate) {
						if(activate) {
							
							$logo.css({
								'top': logoSmallTop,
								'width': logoSmallWidth,
								'height': logoSmallHeight
							});

						} else {
							
							$logo.css({
								'top': 0,
								'width': logoWidth,
								'height': logoHeight
							});

						}
					}

				}

				// Change Logo Src
				if( self.options.wrapper.find('.header-logo img').attr('data-change-src') ) {
					var $logo = self.options.wrapper.find('.header-logo img'),
						logoSrc = $logo.attr('src'),
						logoNewSrc = $logo.attr('data-change-src');

					self.changeLogoSrc = function(activate) {
						if(activate) {
							$logo.attr('src', logoNewSrc);
						} else {
							$logo.attr('src', logoSrc);
						}
					}
				}

				return this;
			},

			events: function() {
				var self = this;

				if (!this.options.stickyEnableOnBoxed && $('body').hasClass('boxed') || !this.options.stickyEnabled) {
					return this;
				}

				if (!self.options.alwaysStickyEnabled) {
					$(window).on('scroll resize', function() {
						self.checkStickyHeader();
					});
				} else {
					self.activateStickyHeader();
				}

				return this;
			}

		}

	});

}).apply(this, [window.theme, jQuery]);