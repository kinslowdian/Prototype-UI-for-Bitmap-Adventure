	var trace = function(str){ console.log(str); };
	
	
	$(document).ready(function(){ init(); });
	
	var test;
	
	var deviceTest;
	
	var ROM = {};
	
	function phoneRotate(event)
	{
		touchOffsetUpdate();
	}
	
	function init()
	{
		deviceTest = deviceTouchTest();
		
		ROM.level = 0;
		
		display_init();
		
		portalHack();
	
		newLevel();
	}
	
	function portalHack()
	{
		var p;
		
		p = new portal();
		
		// portal_num, portal_exist, x, y, w, h, portal_level, portal_exit, portal_direction
		p.portal_open(0, 0, 3, 4, 1, 1, 0, 2, "UP");
		
		portals_ARR.push(p);
		
		p = new portal();
		
		p.portal_open(1, 0, 1, 16, 1, 1, 0, 0, "LEFT");
		
		portals_ARR.push(p);	
		
		p = new portal();
		
		p.portal_open(2, 0, 0, 0, 1, 1, 0, 1, "DOWN");
		
		portals_ARR.push(p);		
		
		trace(portals_ARR);
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