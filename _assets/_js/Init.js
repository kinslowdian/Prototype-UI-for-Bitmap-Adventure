	var trace = function(str){ console.log(str); };
	
	
	$(document).ready(function(){ init(); });
	
	var test;
	
	var deviceTest;
	
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
		mapPlayer_init("bot", "tween-bot", "pre");	
		
		test = setTimeout(playerMapEntryEnd, 1000);
	}
	
	function playerMapEntryEnd()
	{
		mapPlayer_ready();
	}
	
	function fire(event)
	{
		// alert("argh");
		
		touchOffsetUpdate();
	}