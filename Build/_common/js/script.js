/* --------------------------------------------------

	ui
	
-------------------------------------------------- */
var UI = (function ($) {
    var jk = {};
    jk.config = {
    	winW: $(window).outerWidth(),
    	winH: $(window).outerHeight(),
    	scrolling: false,
    	$viewport: $(".viewport"),
    	$nvpMenu_toggle: $(".menu"),
    };
    jk.init = function () {
    	jk.window();
    	jk.viewport();
    	jk.ui.nvpMenu();
    	jk.ui.position();
    	jk.ui.elevator();
    	//jk.ui.loop();

    };
    jk.viewport = function () {
    	var h = jk.config.winH;    	
    	//$(".hero, .slides").css({"height" : h + "px"});
    };
    jk.window = function () {
    	var $window = $(window);
    	
    	$window.resize(function () {
    		jk.config.winH = $window.outerHeight();
    		jk.viewport();
    	});
    	$window.scroll(function() {
    		setInterval(
    			function(){
    				jk.config.scrolling = true;
    			}
    		, 1000);
    		
		});
    }
  	jk.ui = {
  		nvpMenu : function () {
	  		var _viewport = jk.config.$viewport,
	  			_toggle = jk.config.$nvpMenu_toggle;	  		
	  		_toggle.on("click", this, function(e) {
	  			e.preventDefault();
	  			_viewport.toggleClass("shift");
	  		});
	  		
  		},
  		elevator : function () {
  			var _nav = $("#menu a, .adv");
  			
  			_nav.on("click", this, function (e) {
  				e.preventDefault();
  				var _hero = $(this).attr("data-attack");
  				jk.scrollPage($(".hero")[_hero], 0, 360);
  			});
  			
  		},
  		position : function () {
  			var _pos = $(".hero ul li");
  			_pos.on("click", $("a"), function (e) {
  				e.preventDefault();
	  			var _parent = $(this).parents().find(".hero");
	  			jk.scrollPage(_parent, 0, 360);
  			});
  		},
  		loop : function () {
    		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    		
    	    if (jk.config.scrolling) {
    	    	var chk = $(".hero");
    			chk.each(function(index) {
	    			if(jk.inView(this, 40)){
	    				jk.scrollPage(this, 0, 360);
					}
				});
        		jk.config.scrolling = false;
        		
        	}
        	requestAnimationFrame(jk.ui.loop);
    	}

  	};
  	jk.scrollPage = function (i, o, d) {
		var y = $(i).offset().top - o;
  		$('html, body').animate({
			scrollTop: y
		}, {duration: d, queue: false});
  	};
  	jk.inView = function (elem, percentage) {
        var docViewTop = $(window).scrollTop(),
            docViewBottom = docViewTop + $(window).height(),
            elemTop = $(elem).offset().top,
            elemBottom = elemTop + ($(elem).height() / 100 * percentage);
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop) || (docViewTop - elemTop >= 0));
    };
    return jk;
})(jQuery);

/*
	start it up
*/
// ################################################################################
$(function () {

	UI.init();

	// flexsliders
	$(".slider").flexslider({
		selector: ".slides .pane",
    	animation: "slide",
    	useCSS: true,
    	easing: "cubic-bezier(.94,.06,.32,1)",
    	slideshow: false,
    	animationLoop: false,
    	animationSpeed: 360,
    	before: function(slider){
	    	UI.scrollPage(slider, 0, 360);
	    	$(".viewport").removeClass("shift");
    	}, 
  	});
});