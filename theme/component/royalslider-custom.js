	  jQuery(document).ready(function(){
        'use strict';
         var $ = jQuery;		
		 
		 if ($('.royalSlider').length) {
	  //Royal Slider Start
   
		  $('.royal-slider').royalSlider({
			  arrowsNav             : true,
			  loop                  : false,
			  keyboardNavEnabled    : true,
			  controlsInside        : false,
			  imageScaleMode        : 'fill',
			  arrowsNavAutoHide     : false,
			  autoScaleSlider       : true,
			  autoScaleSliderWidth  : 1920,
			  autoScaleSliderHeight : 920,
			  controlNavigation     : 'bullets',
			  thumbsFitInViewport   : false,
			  navigateByClick       : true,
			  startSlideId          : 0,
			  autoPlay: {
                // autoplay options go gere
                enabled: true,
                pauseOnHover: true,
                delay: 2500,
              },
			  transitionType        :'move',
			  globalCaption         : false,
			  deeplinking           : {
				  enabled : false,
				  change : false,
				  prefix : 'image-'
			  },
			  imgWidth              : 1920,
			  imgHeight             : 920
		  }).parents('.slider').removeClass('load');
	     }
	  //Royal Slider End  	
	  });