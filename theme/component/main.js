jQuery(window).load(function() {
  $("img.lazy").lazyload();
  
  $('img.lazy').load(function() {
	$(this).removeClass('load');
  });
  
  $('img:not(".logo-img"), img:not(".lazy")').each(function() {
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
	  var ieversion=new Number(RegExp.$1)
	  if (ieversion>=9)
		if (typeof this.naturalWidth === "undefined" || this.naturalWidth === 0) {
		  this.src = "/" + ($(this).attr('width') || this.width || $(this).naturalWidth()) + "x" + (this.naturalHeight || $(this).attr('height') || $(this).height()) + ".gif";
		}
	} else {
	  if (!this.complete || typeof this.naturalWidth === "undefined" || this.naturalWidth === 0) {
		this.src = "/" + ($(this).attr('width') || this.width) + "x" + ($(this).attr('height') || $(this).height()) + ".gif";
	  }
	}
  });
});

//Calculating The Browser Scrollbar Width
var parent, child, scrollWidth, bodyWidth;

if (scrollWidth === undefined) {
  parent = jQuery('<div style="width: 50px; height: 50px; overflow: auto"><div></div></div>').appendTo('body');
  child = parent.children();
  scrollWidth = child.innerWidth() - child.height(99).innerWidth();
  parent.remove();
}

//Form Stylization
function formStylization() {
  var $        = jQuery,
	  radio    = 'input[type="radio"]',
	  checkbox = 'input[type="checkbox"]';
  
  $(radio).wrap('<div class="new-radio"></div>');
  $('.new-radio').append('<span></span>');
  $(radio + ':checked').parent('.new-radio').addClass('checked');
  $(radio + ':disabled').parent().addClass('disabled');

  $(checkbox).wrap('<div class="new-checkbox"></div>');
  $('.new-checkbox').append('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><polygon fill="#1e1e1e" points="9.298,13.391 4.18,9.237 3,10.079 9.297,17 17.999,4.678 16.324,3 "></polygon></svg>');
  $(checkbox + ':checked').parent('.new-checkbox').addClass('checked');
  
  $(radio).on('click', function(){
	if(!($(this).parent().hasClass('disabled'))){
	  $(radio).parent('.new-radio').removeClass('checked');
	  $(radio + ':checked').parent('.new-radio').addClass('checked');
	  $(radio).parent().removeClass('disabled');
	  $(radio + ':disabled').parent().addClass('disabled');
	}
  });
  
  $(checkbox).on('click', function(){
	if($(this).parent().parent().parent().attr('disabled')==undefined){
	  $(checkbox).parent('.new-checkbox').removeClass('checked');
	  $(checkbox + ':checked').parent('.new-checkbox').addClass('checked');
	  $(checkbox).parent().removeClass('disabled');
	  $(checkbox + ':disabled').parent().addClass('disabled');
	}
  });  
  
  if(typeof($.fn.selectBox) !== 'undefined') {
	$('select:not(".without-styles")').selectBox();
  }
}

//Full Width Box
function fullWidthBox() {
  var $ = jQuery;
  
  if ($('.full-width-box.auto-width').length) {
	var windowWidth = $('body').outerWidth(),
		containerWidth    = $('.header .container').width();
	  
	$('.full-width-box.auto-width').each(function() {
	  $(this)
		.css({
		  left  : ( containerWidth - windowWidth) / 2,
		  width : windowWidth
		})
		.addClass('loaded');
	});
  }
}

//Animations
function animations() {
  var $ = jQuery;

  $('[data-appear-animation]').each(function() {
	var $this = $(this);

	$this.addClass('appear-animation');

	if(!$('body').hasClass('no-csstransitions') && ($('body').width() + scrollWidth) > 767) {
	  $this.appear(function() {
		var delay = ($this.attr('data-appear-animation-delay') ? $this.attr('data-appear-animation-delay') : 1);

		if(delay > 1) $this.css('animation-delay', delay + 'ms');
		$this.addClass($this.attr('data-appear-animation'));

		setTimeout(function() {
		  $this.addClass('appear-animation-visible');
		}, delay);
	  }, {accX: 0, accY: -150});
	} else {
	  $this.addClass('appear-animation-visible');
	}
  });
  
  /* Animation Progress Bars */
  $('[data-appear-progress-animation]').each(function() {
	var $this = $(this);

	$this.appear(function() {
	  var delay = ($this.attr('data-appear-animation-delay') ? $this.attr('data-appear-animation-delay') : 1);

	  if(delay > 1) $this.css('animation-delay', delay + 'ms');
	  
	  $this.find('.progress-bar').addClass($this.attr('data-appear-animation'));

	  setTimeout(function() {
		$this.find('.progress-bar').animate({
		  width: $this.attr('data-appear-progress-animation')
		}, 500, 'easeInCirc', function() {
		  $this.find('.progress-bar').animate({
			textIndent: 10
		  }, 1500, 'easeOutBounce');
		});
	  }, delay);
	}, {accX: 0, accY: -50});
  });
}

//Header Fixed
function headerCustomizer() {
  var $            = jQuery,
	  body         = $('body'),
	  topHeight    = 0,
	  headerHeight = 0,
	  scroll       = 0,
	  fixedH       = $('.fixed-header');
  
  if ($('#top-box').length) {
	topHeight = $('#top-box').outerHeight();
  }
	
  headerHeight = $('.header').outerHeight();
  
  if (!navigator.userAgent.match(/iPad|iPhone|Android/i)) {
	scroll = topHeight;
	
	if (body.hasClass('hidden-top')) {
	  scroll = 8;
	}
	
	if (body.hasClass('padding-top')) {
	  scroll = topHeight + 420;
	} else if (body.hasClass('boxed')) {
	  scroll = topHeight + 20;
	  if (body.hasClass('fixed-header') && body.hasClass('fixed-top')) {
		scroll = 20;
	  }
	}
  
	$(window).scroll(function(){
	  var $this = $(this);
	  
	  if (body.hasClass('fixed-header')) {
		if ($this.scrollTop() >= scroll) {
		  body.addClass('fixed');
		} else {
		  body.removeClass('fixed');
		}
	  }
	  
	  if ($this.scrollTop() >= headerHeight) {
		fixedH.addClass('background-opacity');
	  } else {
		fixedH.removeClass('background-opacity');
	  }
	});
  
	$('.hidden-top .header, .hidden-top #top-box').not('.boxed .header, .boxed #top-box').hover(function(){
	  $('.hidden-top').addClass('visible-top');
	}, function(){
	  $('.hidden-top').removeClass('visible-top');
	});
	
	$(window).scroll(function(){
	  var $this = $(this);
	  
	  if ((body.hasClass('visible-top')) && ($this.scrollTop() > 0)) {
		body.removeClass('visible-top');
	  }
	});
  }
  
  $(window).scroll(function(){
    if ($(this).scrollTop() >= topHeight + headerHeight) {
	  $('.top-fixed-box').addClass('fixed');
	} else {
	  $('.top-fixed-box').removeClass('fixed');
	}
  });
}

//Header Menu
function menu() {
  var $       = jQuery,
	  body    = $('body'),
	  primary = '.primary';
  
  $(primary).find('.parent > a .open-sub, .megamenu .title .open-sub').remove();
  
  if ((body.width() + scrollWidth) <= 979 || $('.header').hasClass('minimized-menu')) {
	$(primary).find('.parent > a, .megamenu .title').append('<span class="open-sub"><span></span><span></span></span>');
  } else {
	$(primary).find('ul').removeAttr('style').find('li').removeClass('active');
  }
  
  $(primary).find('.open-sub').click(function(event){
	event.preventDefault();
	
	var item = $(this).closest('li, .box');
	
	if ($(item).hasClass('active')) {
	  $(item).children().last().hide(600);
	  $(item).removeClass('active');
	} else {
	  var li = $(this).closest('li, .box').parent('ul, .sub-list').children('li, .box');
	  
	  if ($(li).is('.active')) {
		$(li).removeClass('active').children('ul').hide(600);
	  }
	  
	  $(item).children().last().show(600);
	  $(item).addClass('active');
	  
	  if (body.width() + scrollWidth >= 979) {
		var maxHeight = body.height() - ($(primary).find('.navbar-nav')).offset().top - 20;
		
		$(primary).find('.navbar-nav').css({
		  maxHeight : maxHeight,
		  overflow  : 'auto'
		});
	  }
	}
  });

  $(primary).find('.parent > a').click(function(event){
	if (((body.width() + scrollWidth) > 979) &&  (navigator.userAgent.match(/iPad|iPhone|Android/i))) {
	  var $this = $(this);
	  
	  if ($this.parent().hasClass('open')) {
		$this.parent().removeClass('open')
	  } else {
		event.preventDefault();
		
		$this.parent().addClass('open')
	  }
	}
  });

  body.on('click', function(event) {
	if (!$(event.target).is(primary + ' *')) {
	  if ($(primary + ' .collapse').hasClass('in')) {
		$(primary + ' .navbar-toggle').addClass('collapsed');
		$(primary + ' .navbar-collapse').collapse('hide');
	  }
	}
  });
  
  /* Top Menu */
  var topMenu = $('.top-navbar').find('.collapse');

  if ((body.width() + scrollWidth) < 992) {
	topMenu.css('width', body.find('#top-box .container').width());
  } else {
	topMenu.css('width', 'auto');
  }
}

//Accordion
function accordions() {
  var $ = jQuery;
  
  //Some open
  $('.multi-collapse .collapse').collapse({
	toggle: false
  });
  
  //Always open
  $('.panel a[data-toggle="collapse"]').click( function(event){
	event.preventDefault();
	
	if ($(this).closest('.panel').hasClass('active')) {
	  if ($(this).closest('.panel-group').hasClass('one-open')) {
		event.stopPropagation();
	  }
	}
  });

  $('.collapse').on('hide.bs.collapse', function (event) {
	event.stopPropagation();
	
	$(this).closest('.panel').removeClass('active');
  });
  $('.collapse').on('show.bs.collapse', function () {
	$(this).closest('.panel').addClass('active');
  });
  
  $('.collapse.in').closest('.panel').addClass('active');
}

//Tabs
function tabs() {
  var $   = jQuery,
	  tab = $('.nav-tabs');
  
  tab.find('a').click(function (e) {
	e.preventDefault();
	
	$(this).tab('show');
  });

  if (($('body').width() + scrollWidth) < 768 && (!tab.hasClass('no-responsive')))
  {
    tab.each(function(){
	  var $this = $(this);
	  
	  if (!$this.next('.tab-content').hasClass('hidden') && !$this.find('li').hasClass('dropdown')) {
		$this.addClass('accordion-tab');

		$this.find('a').each(function(){
		  var $this = $(this),
			  id = $this.attr('href');
		  
		  $this.prepend('<span class="open-sub"></span>');
		  
		  $this.closest('.nav-tabs').next('.tab-content').find(id)
			.appendTo($this.closest('li'));
		});
		
		$this.next('.tab-content').addClass('hidden');
	  }
    });
	
	$('.accordion-tab > li.active .tab-pane').slideDown();
  }
  else
  {
	tab.find('.tab-pane').removeAttr('style', 'display');
	tab.each(function(){
	  var $this = $(this);
	  
	  if ($this.next('.tab-content').hasClass('hidden')) {
		$this.removeClass('accordion-tab');
	  
		$this.find('a').each(function(){
		  var $this = $(this),
			  id = $this.attr('href');
		  
		  $($this.closest('li').find('.tab-pane'))
			.appendTo($this.closest('.nav-tabs').next('.tab-content'));
		});
		
		$this.next('.tab-content').removeClass('hidden');
	  }
    });
  }
  
  $('.accordion-tab > li > a').on('shown.bs.tab', function (e) {
	if (($('body').width() + scrollWidth) < 768) {	  
	  var $this = $(this),
		  tab = $this.closest('li');
	  
	  e.preventDefault();
	  
	  $this
		.closest('.accordion-tab')
		.find('.tab-pane').not(tab.find('.tab-pane'))
		  .removeClass('active')
		  .slideUp();
	  tab.find('.tab-pane')
		.addClass('active')
		.slideDown();

	  $('html, body').on("scroll mousedown DOMMouseScroll mousewheel keyup", function(){
		$('html, body').stop();
	  });
	  
	  setTimeout(function(){ 
		$('html, body').animate({
		  scrollTop: $this.offset().top
		}, 800);
	  }, 500 );
	}
  });
}

//Slider
function openItem( $item ) {
  var $ = jQuery;
  
  $item.addClass('active');
  $item.stop().children('.slid-content').animate({
	opacity: 1
  });
}
function progressiveSlider() {
  var $ = jQuery,
	  parameters,
	  slider = $('.progressive-slider');
  
  slider.each(function () {
	var $this = $(this);
	
	if ($this.hasClass('progressive-slider-two')) {
	  parameters = {
		responsive : true,
		auto       : true,
		pagination : $(this).closest('.slider').find('.pagination'),
		scroll     : {
		  duration : 1000,
		  pauseOnHover : true
        },
		items      : {
		  visible : 1,
		},
		swipe     : {
		  onMouse : false,
		  onTouch : true
		},
		onCreate  : function( data ) {
		  $this.find('.slider-wrapper').css('height', data.height)
		}
	  }
	} else if ($this.hasClass('progressive-slider-three')) {
	  parameters = {
		responsive : true,
		auto       : true,
		items      : {
		  visible : 1,
		},
		scroll     : {
		  fx : 'crossfade',
		  duration : 1000,
		  pauseOnHover : true
        },
		swipe      : {
		  onMouse: false,
		  onTouch: true
		}
	  }
	} else if ($this.hasClass('progressive-slider-four')) {
	  parameters = {
		responsive : true,
		auto       : true,
		items      : {
		  visible : 1,
		},
		scroll     : {
		  duration : 1000,
		  pauseOnHover : true
        },
		next       : $(this).closest('.slider').find('.next'),
		prev       : $(this).closest('.slider').find('.prev'),
		swipe      : {
		  onMouse: false,
		  onTouch: true
		}
	  }
	} else {
	  parameters = {
		responsive : true,
		scroll     : {
		  fx : 'crossfade',
		  duration : 700,
		  onBefore : function( data ) {
			data.items.old.stop().children('.slid-content').animate({
			  opacity: 0
			});
		  },
		  onAfter  : function( data ) {
			openItem( data.items.visible );
		  }
		},
		auto       : $(this).closest('.slider').data('autoplay'),
		next       : $(this).closest('.slider').find('.next'),
		prev       : $(this).closest('.slider').find('.prev'),
		pagination : $(this).closest('.slider').find('.pagination'),
		items      : {
		  visible : 1,
		},
		swipe      : {
		  onMouse: false,
		  onTouch: true
		},
		onCreate   : function( data ) {
		  openItem(data.items);
		}
	  }
	}
  });
  
  slider.find('.sliders-box').each(function () {
	$(this).carouFredSel(parameters).parents('.slider').removeClass('load');
  });
}

//Banner set
function bannerSetCarousel() {
  var $ = jQuery;
  
  $('.banner-set .banners').each(function () {
	var bannerSet = $(this).closest('.banner-set'),
		prev = bannerSet.find('.prev'),
		next = bannerSet.find('.next'),
		height;

	$(this).carouFredSel({
	  auto       : false,
	  width      : '100%',
	  responsive : false,
	  infinite   : false,
	  next       : next,
	  prev       : prev,
	  pagination : bannerSet.find('.pagination'),
	  swipe      : {
		onMouse : false,
		onTouch : true
	  },
	  scroll: 1,
	  onCreate: function () {
		height = $(this).height();
		
		$(this).find('.banner').css({
		  height : height
		});
		if (bannerSet.hasClass('banner-set-mini') && bannerSet.hasClass('banner-set-no-pagination')) {
		  $(this).closest('.banner-set').find('.prev, .next').css({
			marginTop : -((height / 2) + 7)
		  });
		}
	  }
	}).parents('.banner-set').removeClass('load');
  });
}

//Carousel
function carousel() {
  var $ = jQuery;
  
  if ($('.carousel-box .carousel').length) {
	var carouselBox = $('.carousel-box .carousel');

	carouselBox.each(function () {
	  var carousel = $(this).closest('.carousel-box'),
		  swipe,
		  autoplay,
		  prev,
		  next,
		  pagitation,
		  responsive = false;
		  
	  if (carousel.hasClass('no-swipe')) {
		swipe = false;
	  } else {
		swipe = true;
	  }
	  
	  if (carousel.attr('data-carousel-autoplay') == 'true') {
		autoplay = true;
	  } else {
		autoplay = false;
	  }
	  
	  if (carousel.attr('data-carousel-nav') == 'false') {
		next = false;
		prev = false;
		carousel.addClass('no-nav');
	  } else {
		next = carousel.find('.next');
		prev = carousel.find('.prev');
		carousel.removeClass('no-nav');
	  }
	  
	  if (carousel.attr('data-carousel-pagination') == 'true') {
		pagination = carousel.find('.pagination');
		carousel.removeClass('no-pagination');
	  } else {
		pagination = false;
		carousel.addClass('no-pagination');
	  }
	  
	  if (carousel.attr('data-carousel-one') == 'true') {
		responsive = true;
	  }
	  
	  $(this).carouFredSel({
		onCreate : function () {
		  $(window).on('resize', function(event){
			event.stopPropagation();
		  });
		},
		auto       : autoplay,
		width      : '100%',
		infinite   : false,
		next       : next,
		prev       : prev,
		pagination : pagination,
		responsive : responsive,
		swipe      : {
		  onMouse : false,
		  onTouch : swipe
		},
		scroll     : 1
	  }).parents('.carousel-box').removeClass('load');
	});
  }
}

function thumblist() {
  var $ = jQuery;
  
  if ($('#thumblist').length) {
	$('#thumblist').carouFredSel({
	  prev  : '.thumblist-box .prev',
	  next  : '.thumblist-box .next',
	  width : '100%',
	  auto  : false,
	  swipe : {
		onMouse : false,
		onTouch : true
	  }
	}).parents('.thumblist-box').removeClass('load');
  }
}

                          (function(){
                            var ttext;
                            jQuery('.navbar-nav a').hover(function(){
                              ttext = jQuery(this).attr('title');
                              jQuery(this).removeAttr('title');
                            },
                            function(){
                              jQuery(this).attr('title', ttext);
                            });
                          }());

//Modern Gallery
function modernGallery() {
  var $ = jQuery;
  
  if(typeof($.fn.imagesLoaded) !== 'undefined') {
	var $container = $('#gallery-modern'),
		bodyWidth  = $('body').width();
  
	$container.imagesLoaded( function() {
	  if ((bodyWidth + scrollWidth) >= 1200) {
		$container.masonry({
		  columnWidth: 300,
		  itemSelector: '.images-box'
		}); 
	  } else if ((bodyWidth + scrollWidth) <= 1199 && (bodyWidth + scrollWidth) ) {
		$container.masonry({
		  columnWidth: 242.5,
		  itemSelector: '.images-box'
		}); 
	  } else if ((bodyWidth + scrollWidth) <= 979 && (bodyWidth + scrollWidth) >= 768 ) {
		$container.masonry({
		  columnWidth: 187.5,
		  itemSelector: '.images-box'
		}); 
	  }
	});
  }
}

//Portfolio Filter
function isotopFilter() {
  var $ = jQuery;

  $('.portfolio, .filter-box').each(function () {
	var filterBox   = $(this),
		filterElems = filterBox.find('.filter-elements'),
		buttonBox   = filterBox.find('.filter-buttons'),
		selector    = filterBox.find('.filter-buttons .active').attr('data-filter');

	if (!filterBox.hasClass('accordions-filter')) {
	  filterElems.isotope({
		filter: selector,
		layoutMode: 'fitRows'
	  });
	  buttonBox.find('.dropdown-toggle').html(filterBox.find('.filter-buttons .active').text() + '<span class="caret"></span>')
	}

	buttonBox.find('a').on('click', function(e){
	  var selector = $(this).attr('data-filter');
	  e.preventDefault();
	  
	  if (!$(this).hasClass('active')) {
		buttonBox.find('a').removeClass('active');
		$(this).addClass('active');
		buttonBox.find('.dropdown-toggle').html($(this).text() + '<span class="caret"></span>')

		if (filterBox.hasClass('accordions-filter')) {
		  filterElems.children().not(selector)
			.animate({ height : 0 })
			.addClass('e-hidden');
		  filterElems.children(selector)
			.animate({ height : '100%' })
			.removeClass('e-hidden');
		} else {
		  filterElems.isotope({
			filter: selector,
			layoutMode: 'fitRows'
		  });
		}
	  }
	});
  });
}

$('a[href="#reviews"].add-review').click(function(){
  $('.product-tab a[href="#reviews"]').trigger('click');
  $('html, body').animate({scrollTop: $("#reviews").offset().top - 200}, 1000);
});

$('a[href="#gift"].gift').click(function(){
  $('.product-tab a[href="#gift"]').trigger('click');
  $('html, body').animate({scrollTop: $("#gift").offset().top - 200}, 1000);
});

$('a[href="#discount"].discount').click(function(){
  $('.product-tab a[href="#discount"]').trigger('click');
  $('html, body').animate({scrollTop: $("#discount").offset().top - 200}, 1000);
});

//Blur
function blur() {
  var $ = jQuery;

  $('.full-width-box .fwb-blur').each(function () {
	var blurBox = $(this),
		img     = new Image(),
		amount  = 2,
		prependBox = '<div class="blur-box"></div>';
		
	img.src = blurBox.attr('data-blur-image');
	
	if (
		blurBox.attr('data-blur-amount') !== undefined &&
		blurBox.attr('data-blur-amount') !== false
	  )
	amount = blurBox.attr('data-blur-amount');
  
	img.onload = function() {
	  Pixastic.process(img, "blurfast", {
		amount: amount
	  });
	}
	
	if (blurBox.hasClass('paralax')) {
	  prependBox = '<div class="blur-box" data-stellar-ratio="0.5"></div>';
	}

	blurBox
	  .prepend( prependBox )
	  .find('.blur-box')
		.prepend( img )
		setTimeout(function(){ 
		  $('body').addClass('blur-load');
		}, 0 );
  });
}

function blurPage() {
  var $ = jQuery;

  if ($('.blur-page').length) {
	var blurBox = $('.blur-page');
	
	blurBox.each(function () {
	  var $this = $(this),
		  img     = new Image(),
		  amount  = 2,
		  prependBox = '<div class="blur-box"></div>';
		  
	  img.src = $this.attr('data-blur-image');
	  
	  if (
		  $this.attr('data-blur-amount') !== undefined &&
		  $this.attr('data-blur-amount') !== false
		)
	  amount = $this.attr('data-blur-amount');

	  img.onload = function() {
		Pixastic.process(
		  img,
		  'blurfast',
		  {
			amount: amount
		  },
		  function(){
			$('.blur-page').addClass('blur-load')
		  }
		);
	  }

	  $this.prepend( prependBox ).find('.blur-box').prepend( img );
	});
  }
}

//Paralax
function paralax() {
  var $ = jQuery;
  
  if(typeof($.fn.stellar) !== 'undefined') {
	if(!navigator.userAgent.match(/iPad|iPhone|Android/i) && ($('body').width() + scrollWidth) >= 979) {
	  $('body').stellar({
		horizontalScrolling: false,
		verticalOffset: 0,
		horizontalOffset: 0,
		responsive: true,
		scrollProperty: 'scroll',
		parallaxElements: false,
	  });
	}
  }
}

//Video Background
function videoBg() {
  var $ = jQuery;
  
  if(typeof($.fn.tubular) !== 'undefined') {
	var id,
		options,
		poster,
		youtube = $('.fwb-youtube-video');
		
	if (
		youtube.attr('data-youtube-videoId') !== undefined &&
		youtube.attr('data-youtube-videoId') !== false) {
	  id = youtube.attr('data-youtube-videoId');
	}
	
	if (
		youtube.attr('data-youtube-poster') !== undefined &&
		youtube.attr('data-youtube-poster') !== false) {
	  poster = youtube.attr('data-youtube-poster');
	}
	
	options = {
	  videoId: id,
	  start: 0,
	  wrapperZIndex: -1,
	  mute: true,
	  width: $('body').width()
	}
  
	if( navigator.userAgent.match(/iPad|iPhone|Android/i) ) {
	  youtube.css('background-image', "url('"+poster+"')");
	} else {
	  youtube.tubular(options);
	}
  }
}

//Login/Register Page
function loginRegister() {
  var $ = jQuery;
  
  if(typeof($.fn.isotope) !== 'undefined') {
  
	var filterBox   = $('.login-register'),
		filterElems = filterBox.find('.filter-elements'),
		buttonBox   = filterBox.find('.filter-buttons'),
		selector    = filterBox.find('.filter-buttons.active-form').attr('data-filter');
	
	filterElems.removeClass('hidden');
	filterElems.isotope({
	  filter: selector,
	  layoutMode: 'fitRows'
	});
	
	$('#shopping-login').removeClass('shopping-login-loader');

	buttonBox.click(function(e){
	  var selector = $(this).attr('data-filter');
	  
	  e.preventDefault();
	  
	  if (!$(this).hasClass('active-form')) {
		buttonBox.removeClass('active-form');
		$(this).addClass('active-form');
  
		filterElems.isotope({
		  filter: selector,
		  layoutMode: 'fitRows'
		});
	  }
	});
  }
  
  var height  = 0,
	  form    = $('.form-content');
  
  form.each(function () {
	if ($(this).outerHeight() > height) {
	  height = $(this).outerHeight();
	}
  });
  
  form.css('height', height)
  
  $('.switch-form').click(function (e) {
	var button  = $(this),
		formBox = $('.form-box');

	e.preventDefault();

	if ($(this).hasClass('forgot')) {
	  $('.form-content').removeClass('hidden');
	  $('.register-form').closest('.form-content').addClass('hidden');
	} else if ($(this).hasClass('sing-up')) {
	  $('.form-content').removeClass('hidden');
	  $('.forgot-form').closest('.form-content').addClass('hidden');
	}

	$('.login-register .rotation').toggleClass('hover');
  });
}

function loadingButton() {
  var $ = jQuery;
  
  loading = function(){
	if ($('.ladda-button.progress-button').length) {
	  Ladda.bind('.ladda-button:not(.progress-button)', {
		timeout: 2000
	  });
	  
	  Ladda.bind('.ladda-button.progress-button', {
		callback: function(instance) {
		  var interval,
			  progress;
			  
		  progress = 0;
		  
		  return interval = setInterval(function() {
			progress = Math.min(progress + Math.random() * 0.1, 1);
			instance.setProgress(progress);
			if (progress === 1) {
			  instance.stop();
			  return clearInterval(interval);
			}
		  }, 200);
		}
	  });
	}
  }
  
  if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
	var ieversion = new Number(RegExp.$1);
	
	if (ieversion >= 9) {
	  loading();
	}
  } else {
	loading();
  }
}

function productLimited() {
  var $ = jQuery;
  
  if ($('.product .limit-offer').length){
	var product = $('.product .limit-offer'),
		endDateTime = '';
		
	product.each(function () {
	  var $this = $(this);
	  
	  if (
		$this.attr('data-end') !== undefined &&
		$this.attr('data-end') !== false) {
		endDateTime = $this.attr('data-end');
	  } else {
		endDateTime = '';
	  }
  
	  $this.county({
		endDateTime: new Date(endDateTime),
		animation: 'scroll',
		reflection: false
	  });
	});
  }
}

//Remove Video
if( navigator.userAgent.match(/iPad|iPhone|Android/i) ) {
  jQuery('.fwb-video').find('video').remove();
}

//Word Rotate
function wordRotate() {
  var $ = jQuery;
  
  $('.word-rotate').each(function() {
	var $this = $(this),
		wordsBox = $this.find('.words-box'),
		words = wordsBox.find('> span'),
		firstWord = words.eq(0),
		firstWordClone = firstWord.clone(),
		wordHeight,
		currentItem = 1,
		currentTop = 0;
	
	wordHeight = firstWord.height();
	
	wordsBox.append(firstWordClone);
	
	$this.height(wordHeight).addClass('loaded');
	
	setInterval(function() {
	  currentTop = (currentItem * wordHeight);
  
	  wordsBox.animate({
		top: -(currentTop) + 'px'
	  }, 300, 'easeOutQuad', function() {
		currentItem++;
  
		if(currentItem > words.length) {
		  wordsBox.css('top', 0);
		  currentItem = 1;
		}
	  });
	}, 2000);
  });
}

//Modal Window
function centerModal() {
  var $ = jQuery;
  
  $(this).css('display', 'block');
  
  var dialog = $(this).find('.modal-dialog'),
	  offset = ($(window).height() - dialog.height()) / 2;
	  
  if (offset < 10) {
	offset = 10;
  }
  dialog.css('margin-top', offset);
}

jQuery(document).ready(function(){
  'use strict';
  var $ = jQuery;

  //Replace img > IE8
  if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
	var ieversion = new Number(RegExp.$1);
	
	if (ieversion < 9) {
	  $('img[src*="svg"]').attr('src', function() {
		return $(this).attr('src').replace('.svg', '.png');
	  });
	}
  }
  
  //IE 
  if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
	$('html').addClass('ie');
  }

  //Touch device
  if( navigator.userAgent.match(/iPad|iPhone|Android/i) ) {
	$('body').addClass('touch-device');
  }
  
  //Bootstrap Elements
  $('[data-toggle="tooltip"], .tooltip-link').tooltip();
  
  $("a[data-toggle=popover]")
	.popover()
	.click(function(event) {
	  event.preventDefault();
	});
  
  $('.btn-loading').click(function () {
    var btn = $(this);
	
    btn.button('loading');
	
    setTimeout(function () {
      btn.button('reset')
    }, 3000);
  });
  
  $('.disabled, fieldset[disabled] .selectBox').click(function () {
    return false;
  });

  $('.modal-center').on('show.bs.modal', centerModal);

  if(typeof($.fn.bootstrapValidator) !== 'undefined') {
	$('.form-validator').bootstrapValidator({
	  excluded: [':disabled', ':hidden', ':not(:visible)'],
	  feedbackIcons: {
		valid: 'glyphicon glyphicon-ok',
		invalid: 'glyphicon glyphicon-remove',
		validating: 'glyphicon glyphicon-refresh'
	  },
	  message: 'Girilen deï¿½er geï¿½ersiz!..',
	  trigger: null
	}).on('success.form.bv', function(e) {
	  e.preventDefault();
	  formProcess($(e.target));
	 });
  }

  //Bootstrap Datepicker
  if(typeof($.fn.datepicker) !== 'undefined') {
	$('.datepicker-box').datepicker({
	  todayHighlight : true,
	  beforeShowDay: function (date){
		if (date.getMonth() == (new Date()).getMonth())
		  switch (date.getDate()){
			case 4:
			  return {
				tooltip: 'Example tooltip',
				classes: 'active'
			  };
			case 8:
			  return false;
			case 12:
			  return "green";
		  }
	  }
	});
  }
  
  //Revolution Slider
  if ($('.tp-banner').length) {
	var revolutionSlider = $('.tp-banner');
	
	if (revolutionSlider.closest('.rs-slider').hasClass('full-width')) {
	  var body         = $('body'),
		  width        = body.width(),
		  topHeight    = 0,
		  headerHeight = 104,
		  height;
		  
	  if ($('#top-box').length) {
		if (body.hasClass('hidden-top')) {
		  topHeight = $('#top-box').outerHeight() - 32;
		}
	  }
	  
	  if ((body.width() + scrollWidth) >= 1200) {
		height = body.height() - (topHeight + headerHeight);
	  } else {
		height = 800;
	  }
	  
	  revolutionSlider.revolution({
		delay             : 6000,
		startwidth        : 1200,
		startheight       : height,
		hideThumbs        : 10,
		navigationType    : 'bullet',
		navigationArrows  : 'solo',
		navigationHAlign  : 'center',
        navigationVAlign  : 'top',
        navigationHOffset : -545,
        navigationVOffset : 30,
		hideTimerBar      : 'on'
	  }).parents('.slider').removeClass('load');
	} else {
	  revolutionSlider.revolution({
		delay          : 6000,
		startwidth     : 1200,
		startheight    : 500,
		hideThumbs     : 10,
		navigationType : 'none',
		onHoverStop    : 'off'
	  }).parents('.slider').removeClass('load');
	}
  }
  
  //Royal Slider
  if(typeof($.fn.royalSlider) !== 'undefined') {
	$('.royal-slider').royalSlider({
	  arrowsNav             : true,
	  loop                  : true,
	  keyboardNavEnabled    : true,
	  controlsInside        : true,
	  imageScaleMode        : 'fill',
	  arrowsNavAutoHide     : true,
	  autoScaleSlider       : true, 
	  autoScaleSliderWidth  : 960,     
	  autoScaleSliderHeight : 350,
	  controlNavigation     : 'bullets',
	  thumbsFitInViewport   : true,
	  navigateByClick       : true,
	  startSlideId          : 0,
	  autoPlay              : true,
	  transitionType        :'move',
	  globalCaption         : false,
	  deeplinking           : {
		enabled : true,
		change : true,
		prefix : 'image-'
	  },
	  imgWidth              : 1880,
	  imgHeight             : 500
	}).parents('.slider').removeClass('load');
  }
  
  //Layer Slider
  if ($('.layerslider-box').length) {
	$('.layerslider-box').layerSlider({
	  skinsPath        : 'css/layerslider/skins/',
	  tnContainerWidth : '100%'
	});
  }
  
  //Functions
  fullWidthBox();
  menu();
  tabs();
  accordions();
  headerCustomizer();
  modernGallery();
  animations();
  formStylization();
  //addReview();
  paralax();
  videoBg();
  loginRegister();
  loadingButton();
  productLimited();
  blurPage();
  wordRotate();
  carousel();
  bannerSetCarousel();
  
  //Carousel load
  $(window).on({
    load : function() {
	  blur();
      progressiveSlider();
      thumblist();
	  isotopFilter();
    }
  });
	
  //Language-Currency
  if( !navigator.userAgent.match(/iPad|iPhone|Android/i) ) {
	$('.language, .currency, .sort-by, .show-by').click(function(){
	  if(!($(this).hasClass('open'))){
		$(this).removeClass('open');
	  }else{
		$(this).addClass('open');
	  }
	});
  }
  
  //Header Phone & Search
  $('.phone-header > a').click(function(event){
	event.preventDefault();
    $('.btn-group').removeClass('open');
    $('.phone-active').fadeIn().addClass('open');
  });
  $('.search-header > a').click(function(event){
	event.preventDefault();
    $('.btn-group').removeClass('open');
    $('.search-active').fadeIn().addClass('open');
  });
  
  $('.phone-active .close, .search-active .close').click(function(event){
	event.preventDefault();
    $(this).parent().fadeOut().removeClass('open');
  });
  
  $('#main').on('click', function(event) {
	var phone  = '.phone-active',
		search = '.search-active';
	
	if ((!$(event.target).is(phone + ' *')) && (!$(event.target).is('.phone-header *'))) {
	  if ($(phone).hasClass('open')) {
		$(phone).fadeOut().removeClass('open');
	  }
	}
	if ((!$(event.target).is(search + ' *')) && (!$(event.target).is('.search-header *'))) {
	  if ($(search).hasClass('open')) {
		$(search).fadeOut().removeClass('open');
	  }
	}
  });
  
  //Cart
  $('.cart-header').hover(function(){
    if (($('body').width() + scrollWidth) >= 979 ) {
      $(this).addClass('open');
    }
  }, function(){
    if (($('body').width() + scrollWidth) >= 979 ) {
      $(this).removeClass('open');
    }
  });
  
  //Product
  if(!navigator.userAgent.match(/iPad|iPhone|Android/i)) {
	$('.product, .employee')
	  .hover(function(event) {
		event.preventDefault();
		
		$(this).addClass('hover');
	  }, function(event) {
		event.preventDefault();
		
		$(this).removeClass('hover');
	  });
  }
  
  $('body').on('touchstart', function (event) {
	event.stopPropagation();
	
	if ($(event.target).parents('.product, .employee').length==0) {
      $('.product, .employee').removeClass('hover');
    }
  });

  $('.product, .employee').on('touchend', function(event){
	if ($(this).hasClass('hover')) {
	  $(this).removeClass('hover');
	} else {
	  $('.product, .employee').removeClass('hover');
	  $(this).addClass('hover');
	}
  });

  //Menu > Sidebar
  $('.menu .parent:not(".active") a').next('.sub').css('display', 'none');
  $('.menu .parent a .open-sub').click(function(event){
	event.preventDefault();

    if ($(this).closest('.parent').hasClass('active')) {
      $(this).parent().next('.sub').slideUp(600, function(){if(typeof scrollMenu == 'function')scrollMenu()});
      $(this).closest('.parent').removeClass('active');
	  
	  $(this).find('.fa').addClass('fa-angle-down').removeClass('fa-angle-up');
    } else {
      $(this).parent().next('.sub').slideDown(600, function(){if(typeof scrollMenu == 'function')scrollMenu()});
      $(this).closest('.parent').addClass('active');
	  
	  $(this).find('.fa').addClass('fa-angle-up').removeClass('fa-angle-down');
    }
  });
  
  //Price Regulator
  if(typeof($.fn.slider) !== 'undefined') {
	$('#Slider2').slider({
	  from          : 5000,
	  to            : 150000,
	  limits        : false,
	  heterogeneity : ['50/50000'],
	  step          : 1000,
	  dimension     : 'Â $'
	});
  }
  
  if(typeof($.fn.slider) !== 'undefined') {
	$('#filter').slider({
	  from      : 2000,
	  to        : 2013,
	  limits    : false,
	  step      : 1,
	  dimension : '',
	  calculate : function( value ){
		return ( value );
	  }
	});
  }
  
  if(typeof($.fn.slider) !== 'undefined') {
	jQuery('#priceLimit').slider({
	  from          : 0,
	  to            : 5000,
	  limits        : true,
	  //heterogeneity : ['50/5000'],
	  //scale: [0, '|', 50, '|' , 10000, '|', 25000, '|', 50000],
	  step          : 500,
	  dimension     : '',
	  round: 0,
	  format: { format: "#,##0.##" },
	  callback: function(value){
		jQuery(".layout-slider a").attr("data-value", value).click();
	  }
	});
  }
  
  $('.jslider-pointer').html('\n\
	<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 8 12" enable-background="new 0 0 8 12" xml:space="preserve">\n\
	  <path fill-rule="evenodd" clip-rule="evenodd" fill="#1e1e1e" d="M2,0h4c1.1,0,2,0.9,2,2l-2,8c-0.4,1.1-0.9,2-2,2l0,0c-1.1,0-1.6-0.9-2-2L0,2C0,0.9,0.9,0,2,0z"></path>\n\
	</svg>\n\
  ');

  //Emergence Price
  $('.emergence-price').click(function(){
    $(this).animate({opacity: "0"}, 0);
    $(this).prev('.price').fadeIn(1000);
    return false;
  });
  
  //Gallery
  if ($.fn.fancybox){
	$('.gallery-images, .lightbox').fancybox({
	  nextEffect  : 'fade',
	  prevEffect  : 'fade',
	  openEffect  : 'fade',
	  closeEffect : 'fade',
	  helpers     : {
		overlay : {
		  locked : false
		}
	  },
	  tpl         : {
		closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;">ï¿½</a>',
		next : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;">\n\
				  <span><i class="fa fa-angle-right"></i></span>\n\
				</a>',
		prev : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;">\n\
				  <span><i class="fa fa-angle-left"></i></span>\n\
				</a>'
	  }
	});
  }
  
  //Country
  if ($.fn.county){
    $('#count-down').county({
	  endDateTime: new Date('2014/12/29 10:00:00'),
	  reflection: false
	}).addClass('count-loaded');
  }
  
  // Scroll to Top
  $('#footer .up').click(function() {
    $('html, body').animate({
      scrollTop: $('body').offset().top
    }, 500);
    return false;
  });

  //JS loaded
  $('body').addClass('loaded');
  
  //Scrollbar
  if ($.fn.scrollbar){
	$('.minimized-menu .primary .navbar-nav').scrollbar();
  }
});

//Window Resize
(function() {
  var $ = jQuery;
  var delay = ( function() {
	var timeout = { };
	
	return function( callback, id, time ) {
	  if( id !== null ) {
		time = ( time !== null ) ? time : 100;
		clearTimeout( timeout[ id ] );
		timeout[ id ] = setTimeout( callback, time );
	  }
	};
  })();
  
  function resizeFunctions() {
	//Functions
	fullWidthBox();
	menu();
	tabs();
	modernGallery();
	animations();
	isotopFilter();
	paralax();
	loginRegister();
	$('.modal-center:visible').each(centerModal);
	
	progressiveSlider();
	bannerSetCarousel();
	thumblist();
	carousel();
  }

  if(navigator.userAgent.match(/iPad|iPhone|Android/i)) {
	$(window).bind('orientationchange', function() {
	  setTimeout(function() {
		resizeFunctions();
	  }, 150);
	});
  } else {
	$(window).on('resize', function() {
	  delay( function() {
		
		resizeFunctions();
		  
	  }, 'resize');
	});
  }

}());