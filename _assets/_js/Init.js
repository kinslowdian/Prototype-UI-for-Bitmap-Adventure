	var trace = function(str){ console.log(str); };
	
	
	$(document).ready(function(){ init(); });
	
	var test;
	
	var deviceTest;
	
	function phoneRotate(event)
	{
		touchOffsetUpdate();
	}
	
	function init()
	{
		deviceTest = deviceTouchTest();
	
		newLevel();
	}
	
	function deviceTouchTest()
	{
		return typeof window.ontouchstart;
	}
	
	function newLevel()
	{
		controlSignal_init();
		mapPlayer_init("bot", "tween-bot", "bot-inner", "pre");	
		
		mapPlayer_spawn(2.5, 1.5, "DOWN", true);
		
		test = setTimeout(forced, 1000);
	}
	
	function forced()
	{
		trace("forced();");
		mapPlayer_entry();
	}