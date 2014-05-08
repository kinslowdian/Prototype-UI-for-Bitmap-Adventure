	var trace = function(str){ console.log(str); };
	
	
	$(document).ready(function(){ init(); });
	
	var test;
	
	var deviceTest;
	
	var ROM = {};
	
	var event_htmlLoaded = document.createEvent("Event");
	
	event_htmlLoaded.initEvent("EVENT_HTML_LOADED", true, true);
	
	function phoneRotate(event)
	{
		if(event != null || event != undefined)
		{
			touchOffsetUpdate();
		}
		
		var base_css;
		
		if(window.innerWidth < window.innerHeight)
		{
			trace("DISPLAY_OK");
			
			$("#displayErrorWrapper .displayError").removeClass("displayErrorShow").addClass("displayErrorHide");
		
			base_css = 	{
							"-webkit-transition-delay"	: "0.6s",
							"transition-delay" 			: "0.6s",
							"opacity"					: "0"
						};
		}
		
		else
		{
			trace("DISPLAY_FAIL");
			
			$("#displayErrorWrapper .displayError").removeClass("displayErrorHide").addClass("displayErrorShow");

			base_css = 	{
							"-webkit-transition-delay"	: "0s",
							"transition-delay" 			: "0s",
							"opacity"					: "1"
						};
		}
		
		$("#displayErrorWrapper .displayError-base").css(base_css);
		
/*
		if(window.orientation === 0)
		{
			trace("CORRECT " + window.innerWidth + " " + window.innerHeight);
		}
		
		else
		{
			trace("LANDSCAPE " + window.innerWidth + " " + window.innerHeight);
		}
*/
	}
	
	function init()
	{
		deviceTest = deviceTouchTest();
		
		ROM.mapLevel = 0;
		
		gameData_get();
	}
	
	function temp_callback_json()
	{
		trace("temp_callback_json();");
		
		html_lib_init();
	}
	
	function temp_callback_html()
	{
		trace("temp_callback_html();");
		
		display_init();
		
		mapPlayer_init("player-block", "tween-player-block", "tween-player-walkX", "tween-player-walkY", "tween-mapPlayerWalk_stop", "tween-mapPlayerWalk_loop", "map-goat", "preHitTest");
		
		level_init();
	
		newLevel();		
	}
	
	function deviceTouchTest()
	{
		return typeof window.ontouchstart;
	}
	
	function newLevel()
	{
		level_draw();
	}
	
	function level_draw()
	{
		level_drawn();
	}
	
	function level_drawn()
	{
		controlSignal_init();	
		
		// mapPlayer_spawn(2.5, 1.5, "DOWN", true);
		
		test = setTimeout(forced, 1000);
		
		screenUpdateInit(true);
	}
	
	function forced()
	{
		trace("forced();");
		mapPlayer_entry();
		
		testPortalScreenInit();
	}
	
	function testPortalScreenInit()
	{
		var t;
		
		t = setTimeout(testPortalScreen_0, 3000);
	}

	function testPortalScreen_0()
	{
		var css;
		
		css = 	{
					"-webkit-transform"	: "translateX(0%)",
					"transform"			: "translateX(0%)"
				};
				
		$("#portalScreen .portalScreen_wrapper").css(css);
		
		$(".tween-portalScreen_wrapper")[0].addEventListener("webkitTransitionEnd", testPortalScreen_1, false);
		$(".tween-portalScreen_wrapper")[0].addEventListener("transitionend", testPortalScreen_1, false);
	}
	
	function testPortalScreen_1(event)
	{
		var t;
		
		$(".tween-portalScreen_wrapper")[0].removeEventListener("webkitTransitionEnd", testPortalScreen_1, false);
		$(".tween-portalScreen_wrapper")[0].removeEventListener("transitionend", testPortalScreen_1, false);		
	
		$("#portalScreen .portalScreen_fade").css("opacity", 0);
		
		t = setTimeout(testPortalScreen_2, 2 * 1000);
		
	}
	
	function testPortalScreen_2()
	{
		var css;
		
		css = 	{
					"-webkit-transform"	: "translateY(0%)",
					"transform"			: "translateY(0%)"
				};
				
		$("#portalScreen .portalScreen_green").css(css);
	
		$(".tween-portalScreen_green")[0].addEventListener("webkitTransitionEnd", testPortalScreen_3, false);
		$(".tween-portalScreen_green")[0].addEventListener("transitionend", testPortalScreen_3, false);
	}
	
	function testPortalScreen_3(event)
	{
		$(".tween-portalScreen_green")[0].removeEventListener("webkitTransitionEnd", testPortalScreen_3, false);
		$(".tween-portalScreen_green")[0].removeEventListener("transitionend", testPortalScreen_3, false);
		
		$("#portalScreen .portalScreen_map-goat .player-sprite").removeClass("tween-player-walkX");
		$("#portalScreen .portalScreen_map-goat .map-goat-head").removeClass("mapPlayer_head_default").addClass("mapPlayer_head_fear");
		$("#portalScreen .portalScreen_map-goat .map-goat-legs").removeClass("tween-mapPlayerWalk_loop").addClass("tween-mapPlayerWalk_stop");		
		
		$("#portalScreen .portalScreen_header").css("opacity", 1);
		
	}
	