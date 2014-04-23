	var trace = function(str){ console.log(str); };
	
	
	$(document).ready(function(){ init(); });
	
	var test;
	
	var deviceTest;
	
	var ROM = {};
	
	var event_htmlLoaded = document.createEvent("Event");
	
	event_htmlLoaded.initEvent("EVENT_HTML_LOADED", true, true);
	
	function phoneRotate(event)
	{
		touchOffsetUpdate();
	}
	
	function init()
	{
		deviceTest = deviceTouchTest();
		
		ROM.mapLevel = 0;
		
		gameData_get();
	}
	
	function temp_callback_json()
	{
		html_lib_init();
	}
	
	function temp_callback_html()
	{
		display_init();
		
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
		mapPlayer_init("player-block", "tween-player-block", "tween-player-walkX", "tween-player-walkY", "map-goat", "preHitTest");	
		
		mapPlayer_spawn(2.5, 1.5, "DOWN", true);
		
		test = setTimeout(forced, 1000);
		
		screenUpdateInit(true);
	}
	
	function forced()
	{
		trace("forced();");
		mapPlayer_entry();
	}